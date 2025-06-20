import type { GridApi } from './api/gridApi';
import type { NamedBean } from './context/bean';
import { BeanStub } from './context/beanStub';
import type { BeanCollection } from './context/context';
import type { ColDef, ColGroupDef } from './entities/colDef';
import type { GridOptions } from './entities/gridOptions';
import type { AgEventType } from './eventTypes';
import type { IAcDataGridEvent } from './events';
import { ALWAYS_SYNC_GLOBAL_EVENTS } from './events';
import type { GridOptionOrDefault } from './gridOptionsDefault';
import { GRID_OPTION_DEFAULTS } from './gridOptionsDefault';
import { _getCallbackForEvent } from './gridOptionsUtils';
import type { AgGridCommon, WithoutGridCommon } from './interfaces/iCommon';
import type { ModuleName, ValidationModuleName } from './interfaces/iModule';
import type { RowModelType } from './interfaces/iRowModel';
import { LocalEventService } from './localEventService';
import { _areModulesGridScoped, _isModuleRegistered, _isUmd } from './modules/moduleRegistry';
import type { AnyGridOptions } from './propertyKeys';
import { _logIfDebug } from './utils/function';
import { _exists } from './utils/generic';
import type { MissingModuleErrors } from './validation/errorMessages/errorText';
import { _error } from './validation/logging';
import { COLUMN_DEFINITION_MOD_VALIDATIONS } from './validation/rules/colDefValidations';
import { GRID_OPTIONS_MODULES } from './validation/rules/gridOptionsValidations';
import type { ValidationService } from './validation/validationService';
import type { ModuleValidation, RequiredModule } from './validation/validationTypes';

type GetKeys<T, U> = {
    [K in keyof T]: T[K] extends U | undefined ? K : never;
}[keyof T];

/**
 * Get all the GridOption properties that strictly contain the provided type.
 * Does not include `any` properties.
 */
type KeysOfType<U> = Exclude<GetKeys<GridOptions, U>, AnyGridOptions>;

type BooleanProps = Exclude<KeysOfType<boolean>, AnyGridOptions>;
type NoArgFuncs = KeysOfType<() => any>;
type AnyArgFuncs = KeysOfType<(arg: 'NO_MATCH') => any>;
type CallbackProps = Exclude<KeysOfType<(params: AgGridCommon<any, any>) => any>, NoArgFuncs | AnyArgFuncs>;

export type ExtractParamsFromCallback<TCallback> = TCallback extends (params: infer PA) => any ? PA : never;
export type ExtractReturnTypeFromCallback<TCallback> = TCallback extends (params: AgGridCommon<any, any>) => infer RT
    ? RT
    : never;
type WrappedCallback<K extends CallbackProps, OriginalCallback extends GridOptions[K]> =
    | undefined
    | ((
          params: WithoutGridCommon<ExtractParamsFromCallback<OriginalCallback>>
      ) => ExtractReturnTypeFromCallback<OriginalCallback>);
export interface IAcDGPropertyChangeSet {
    /** Unique id which can be used to link changes of multiple properties that were updated together.
     * i.e a user updated multiple properties at the same time.
     */
    id: number;
    /** All the properties that have been updated in this change set */
    properties: (keyof GridOptions)[];
}
export type PropertyChangedSource = 'api' | 'gridOptionsUpdated';
export interface IAcDGPropertyChangedEvent extends IAcDataGridEvent {
    type: 'gridPropertyChanged';
    changeSet: PropertyChangeSet | undefined;
    source: PropertyChangedSource;
}

/**
 * For boolean properties the changed value will have been coerced to a boolean, so we do not want the type to include the undefined value.
 */
type GridOptionsOrBooleanCoercedValue<K extends keyof GridOptions> = K extends BooleanProps ? boolean : GridOptions[K];

export interface IAcDGPropertyValueChangedEvent<K extends keyof GridOptions> extends IAcDataGridEvent {
    type: K;
    changeSet: PropertyChangeSet | undefined;
    currentValue: GridOptionsOrBooleanCoercedValue<K>;
    previousValue: GridOptionsOrBooleanCoercedValue<K>;
    source: PropertyChangedSource;
}

export type PropertyChangedListener = (event: PropertyChangedEvent) => void;
export type PropertyValueChangedListener<K extends keyof GridOptions> = (event: PropertyValueChangedEvent<K>) => void;

let changeSetId = 0;

// this is added to the main DOM element
let gridInstanceSequence = 0;

export class AcDGGridOptionsService extends BeanStub implements NamedBean {
    beanName = 'gos' as const;

    private gridOptions: GridOptions;
    private validation?: ValidationService;
    private api: GridApi;
    private gridId: string;

    public wireBeans(beans: BeanCollection): void {
        this.gridOptions = beans.gridOptions;
        this.validation = beans.validation;
        this.api = beans.gridApi;
        this.gridId = beans.context.getGridId();
    }
    private domDataKey = '__AG_' + Math.random().toString();

    /** This is only used for the main DOM element */
    public readonly gridInstanceId = gridInstanceSequence++;

    // Used to hold user events until the grid is ready
    // Required to support React 19 StrictMode. See IFrameworkOverrides.runWhenReadyAsync but also is likely a good idea that onGridReady is the first event fired.
    private gridReadyFired = false;
    private queueEvents: { eventName: AgEventType; event: any }[] = [];

    // This is quicker then having code call gridOptionsService.get('context')
    private get gridOptionsContext() {
        return this.gridOptions['context'];
    }

    private propEventSvc: LocalEventService<keyof GridOptions> = new LocalEventService();

    public postConstruct(): void {
        this.validateGridOptions(this.gridOptions);

        this.eventSvc.addGlobalListener(this.globalEventHandlerFactory().bind(this), true);
        this.eventSvc.addGlobalListener(this.globalEventHandlerFactory(true).bind(this), false);

        // Ensure the propertyEventService has framework overrides set so that it can fire events outside of angular
        this.propEventSvc.setFrameworkOverrides(this.beans.frameworkOverrides);

        this.addManagedEventListeners({
            gridOptionsChanged: ({ options }) => {
                this.updateGridOptions({ options, force: true, source: 'gridOptionsUpdated' });
            },
        });
    }

    public override destroy(): void {
        super.destroy();
        this.queueEvents = [];
    }

    /**
     * Get the raw value of the GridOptions property provided.
     * @param property
     */
    public get<K extends keyof GridOptions>(property: K): GridOptionOrDefault<K> {
        return (
            this.gridOptions[property] ??
            (GRID_OPTION_DEFAULTS[property as keyof typeof GRID_OPTION_DEFAULTS] as GridOptionOrDefault<K>)
        );
    }

    /**
     * Get the GridOption callback but wrapped so that the common params of api and context are automatically applied to the params.
     * @param property GridOption callback properties based on the fact that this property has a callback with params extending AgGridCommon
     */
    public getCallback<K extends CallbackProps>(property: K): WrappedCallback<K, GridOptions[K]> {
        return this.mergeGridCommonParams(this.gridOptions[property]);
    }

    /**
     * Returns `true` if a value has been specified for this GridOption.
     * @param property GridOption property
     */
    public exists(property: keyof GridOptions): boolean {
        return _exists(this.gridOptions[property]);
    }

    /**
     * Wrap the user callback and attach the api and context to the params object on the way through.
     * @param callback User provided callback
     * @returns Wrapped callback where the params object not require api and context
     */
    private mergeGridCommonParams<P extends AgGridCommon<any, any>, T>(
        callback: ((params: P) => T) | undefined
    ): ((params: WithoutGridCommon<P>) => T) | undefined {
        if (callback) {
            const wrapped = (callbackParams: WithoutGridCommon<P>): T => {
                return callback(this.addGridCommonParams(callbackParams));
            };
            return wrapped;
        }
        return callback;
    }

    public updateGridOptions({
        options,
        force,
        source = 'api',
    }: {
        options: Partial<GridOptions>;
        force?: boolean;
        source?: PropertyChangedSource;
    }): void {
        const changeSet: PropertyChangeSet = { id: changeSetId++, properties: [] };
        // all events are fired after grid options has finished updating.
        const events: PropertyValueChangedEvent<keyof GridOptions>[] = [];
        const { gridOptions, validation } = this;

        for (const key of Object.keys(options)) {
            const value = options[key as keyof GridOptions];
            validation?.warnOnInitialPropertyUpdate(source, key);

            const shouldForce = force || (typeof value === 'object' && source === 'api'); // force objects as they could have been mutated.

            const previousValue = gridOptions[key as keyof GridOptions];
            if (shouldForce || previousValue !== value) {
                gridOptions[key as keyof GridOptions] = value;
                const event: PropertyValueChangedEvent<keyof GridOptions> = {
                    type: key as keyof GridOptions,
                    currentValue: value,
                    previousValue,
                    changeSet,
                    source,
                };
                events.push(event);
            }
        }

        this.validateGridOptions(this.gridOptions);

        // changeSet should just include the properties that have changed.
        changeSet.properties = events.map((event) => event.type);

        events.forEach((event) => {
            _logIfDebug(this, `Updated property ${event.type} from`, event.previousValue, ` to `, event.currentValue);
            this.propEventSvc.dispatchEvent(event);
        });
    }

    addPropertyEventListener<K extends keyof GridOptions>(key: K, listener: PropertyValueChangedListener<K>): void {
        this.propEventSvc.addEventListener(key, listener as any);
    }
    removePropertyEventListener<K extends keyof GridOptions>(key: K, listener: PropertyValueChangedListener<K>): void {
        this.propEventSvc.removeEventListener(key, listener as any);
    }

    // responsible for calling the onXXX functions on gridOptions
    // It forces events defined in GridOptionsService.alwaysSyncGlobalEvents to be fired synchronously.
    // This is required for events such as GridPreDestroyed.
    // Other events can be fired asynchronously or synchronously depending on config.
    globalEventHandlerFactory = (restrictToSyncOnly?: boolean) => {
        return (eventName: AgEventType, event?: any) => {
            // prevent events from being fired _after_ the grid has been destroyed
            if (!this.isAlive()) {
                return;
            }

            const alwaysSync = ALWAYS_SYNC_GLOBAL_EVENTS.has(eventName);
            if ((alwaysSync && !restrictToSyncOnly) || (!alwaysSync && restrictToSyncOnly)) {
                return;
            }

            const fireEvent = (name: AgEventType, e: any) => {
                const eventHandler = (this.gridOptions as any)[_getCallbackForEvent(name)];
                if (typeof eventHandler === 'function') {
                    this.beans.frameworkOverrides.wrapOutgoing(() => eventHandler(e));
                }
            };

            if (this.gridReadyFired) {
                fireEvent(eventName, event);
            } else {
                if (eventName === 'gridReady') {
                    fireEvent(eventName, event);
                    this.gridReadyFired = true;
                    for (const q of this.queueEvents) {
                        fireEvent(q.eventName, q.event);
                    }
                    this.queueEvents = [];
                } else {
                    this.queueEvents.push({ eventName, event });
                }
            }
        };
    };

    public getDomDataKey(): string {
        return this.domDataKey;
    }

    /** Prefer _addGridCommonParams from gridOptionsUtils for bundle size savings */
    public addGridCommonParams<T extends AgGridCommon<TData, TContext>, TData = any, TContext = any>(
        params: WithoutGridCommon<T>
    ): T {
        (params as T).api = this.api;
        (params as T).context = this.gridOptionsContext;
        return params as T;
    }

    private validateOptions<T extends object>(options: T, modValidations: ModuleValidation<T>): void {
        for (const key of Object.keys(options)) {
            const value = options[key as keyof T];
            if (value == null || value === false) {
                // false implies feature is disabled, don't validate.
                continue;
            }

            let moduleToCheck: RequiredModule<T> | undefined | null = modValidations[key as keyof T];
            if (typeof moduleToCheck === 'function') {
                moduleToCheck = moduleToCheck(options, this.gridOptions, this.beans);
            }
            if (moduleToCheck) {
                this.assertModuleRegistered(moduleToCheck, key);
            }
        }
    }

    private validateGridOptions(gridOptions: GridOptions): void {
        this.validateOptions(gridOptions, GRID_OPTIONS_MODULES);
        this.validation?.processGridOptions(gridOptions);
    }

    public validateColDef(colDef: ColDef | ColGroupDef, colId: string, skipInferenceCheck?: boolean): void {
        if (skipInferenceCheck || !this.beans.dataTypeSvc?.isColPendingInference(colId)) {
            this.validateOptions(colDef, COLUMN_DEFINITION_MOD_VALIDATIONS);
            this.validation?.validateColDef(colDef);
        }
    }

    public assertModuleRegistered<
        TId extends keyof MissingModuleErrors,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        TShowMessageAtCallLocation = MissingModuleErrors[TId],
    >(moduleName: ValidationModuleName | ValidationModuleName[], reasonOrId: string | TId): boolean {
        const registered = Array.isArray(moduleName)
            ? moduleName.some((modName) => this.isModuleRegistered(modName))
            : this.isModuleRegistered(moduleName);
        if (!registered) {
            _error(200, {
                ...this.getModuleErrorParams(),
                moduleName,
                reasonOrId,
            });
        }
        return registered;
    }

    public getModuleErrorParams(): {
        gridScoped: boolean;
        gridId: string;
        rowModelType: RowModelType;
        isUmd: boolean;
    } {
        return {
            gridId: this.gridId,
            gridScoped: _areModulesGridScoped(),
            rowModelType: this.get('rowModelType'),
            isUmd: _isUmd(),
        };
    }

    public isModuleRegistered(moduleName: ModuleName): boolean {
        return _isModuleRegistered(moduleName, this.gridId, this.get('rowModelType'));
    }
}
