import { createGridApi } from './api/apiUtils';
import type { GridApi } from './api/gridApi';
import type { ApiFunctionName } from './api/iApiFunction';
import type { ContextParams, SingletonBean } from './context/context';
import { Context } from './context/context';
import { gridBeanDestroyComparator, gridBeanInitComparator } from './context/gridBeanComparator';
import type { GridOptions } from './entities/gridOptions';
import { GridComp } from './gridComp/gridComp';
import { CommunityCoreModule } from './gridCoreModule';
import type { IFrameworkOverrides } from './interfaces/iFrameworkOverrides';
import type {
    CommunityModuleName,
    EnterpriseModuleName,
    Module,
    _ModuleWithApi,
    _ModuleWithoutApi,
} from './interfaces/iModule';
import type { RowModelType } from './interfaces/iRowModel';
import {
    _areModulesGridScoped,
    _getRegisteredModules,
    _hasUserRegistered,
    _isModuleRegistered,
    _registerModule,
} from './modules/moduleRegistry';
import { _createElement } from './utils/dom';
import { _missing } from './utils/generic';
import { _mergeDeep } from './utils/object';
import { NoModulesRegisteredError, missingRowModelTypeError } from './validation/errorMessages/errorText';
import { _error, _logPreInitErr } from './validation/logging';
import { VanillaFrameworkOverrides } from './vanillaFrameworkOverrides';

export interface IAcDGGridParams {
    // INTERNAL - used by Web Components
    globalListener?: (...args: any[]) => any;
    // INTERNAL - Always sync - for events such as gridPreDestroyed
    globalSyncListener?: (...args: any[]) => any;
    // INTERNAL - this allows the base frameworks (React, Angular, etc) to provide alternative cellRenderers and cellEditors
    frameworkOverrides?: IFrameworkOverrides;
    // INTERNAL - bean instances to add to the context
    providedBeanInstances?: { [key: string]: any };
    // INTERNAL - set by frameworks if the provided grid div is safe to set a theme class on
    setThemeOnGridDiv?: boolean;

    /**
     * Modules to be registered directly with this grid instance.
     */
    modules?: Module[];
}

export interface IAcDGParams {
    /**
     * Modules to be registered directly with this grid instance.
     */
    modules?: Module[];
}

class AcDGGlobalGridOptions {
    static gridOptions: GridOptions | undefined = undefined;
    static mergeStrategy: GlobalGridOptionsMergeStrategy = 'shallow';

    /**
     * @param providedOptions
     * @returns Shallow copy of the provided options with global options merged in.
     */
    static applyGlobalGridOptions(providedOptions: GridOptions): GridOptions {
        if (!GlobalGridOptions.gridOptions) {
            // No global options provided, return a shallow copy of the provided options
            return { ...providedOptions };
        }

        let mergedGridOps: GridOptions = {};
        // Merge deep to avoid leaking changes to the global options
        _mergeDeep(mergedGridOps, GlobalGridOptions.gridOptions, true, true);
        if (GlobalGridOptions.mergeStrategy === 'deep') {
            _mergeDeep(mergedGridOps, providedOptions, true, true);
        } else {
            // Shallow copy so that provided object properties completely override global options
            mergedGridOps = { ...mergedGridOps, ...providedOptions };
        }

        if (GlobalGridOptions.gridOptions.context) {
            // Ensure context reference is maintained if it was provided
            mergedGridOps.context = GlobalGridOptions.gridOptions.context;
        }
        if (providedOptions.context) {
            if (GlobalGridOptions.mergeStrategy === 'deep' && mergedGridOps.context) {
                // Merge global context properties into the provided context whilst maintaining provided context reference
                _mergeDeep(providedOptions.context, mergedGridOps.context, true, true);
            }
            mergedGridOps.context = providedOptions.context;
        }

        return mergedGridOps;
    }
}

/**
 * When providing global grid options, specify how they should be merged with the grid options provided to individual grids.
 * - `deep` will merge the global options into the provided options deeply, with provided options taking precedence.
 * - `shallow` will merge the global options with the provided options shallowly, with provided options taking precedence.
 * @default 'shallow'
 * @param gridOptions - global grid options
 */
export type GlobalGridOptionsMergeStrategy = 'deep' | 'shallow';

/**
 * Provide gridOptions that will be shared by all grid instances.
 * Individually defined GridOptions will take precedence over global options.
 * @param gridOptions - global grid options
 */
export function provideGlobalGridOptions(
    gridOptions: GridOptions,
    mergeStrategy: GlobalGridOptionsMergeStrategy = 'shallow'
): void {
    GlobalGridOptions.gridOptions = gridOptions;
    GlobalGridOptions.mergeStrategy = mergeStrategy;
}

export function _getGlobalGridOption<K extends keyof GridOptions>(gridOption: K): GridOptions[K] {
    return GlobalGridOptions.gridOptions?.[gridOption];
}

// **NOTE** If updating this JsDoc please also update the re-exported createGrid in main-umd-shared.ts
/**
 * Creates a grid inside the provided HTML element.
 * @param eGridDiv Parent element to contain the grid.
 * @param gridOptions Configuration for the grid.
 * @param params Individually register AG Grid Modules to this grid.
 * @returns api to be used to interact with the grid.
 */
export function createGrid<TData>(
    eGridDiv: HTMLElement,
    gridOptions: GridOptions<TData>,
    params?: Params
): GridApi<TData> {
    if (!gridOptions) {
        // No gridOptions provided, abort creating the grid
        _error(11);
        return {} as GridApi;
    }
    const gridParams: GridParams | undefined = params;
    let destroyCallback: (() => void) | undefined;
    if (!gridParams?.setThemeOnGridDiv) {
        // frameworks already create an element owned by our code, so we can set
        // the theme class on it. JS users calling createGrid directly are
        // passing an element owned by their application, so we can't set a
        // class name on it and must create a wrapper.
        const newGridDiv = _createElement({ tag: 'div' });
        newGridDiv.style.height = '100%';
        eGridDiv.appendChild(newGridDiv);
        eGridDiv = newGridDiv;
        destroyCallback = () => eGridDiv.remove();
    }
    const api = new GridCoreCreator().create(
        eGridDiv,
        gridOptions,
        (context) => {
            const gridComp = new GridComp(eGridDiv);
            context.createBean(gridComp);
        },
        undefined,
        params,
        destroyCallback
    );

    return api;
}

let nextGridId = 1;

// creates services of grid only, no UI, so frameworks can use this if providing
// their own UI
export class AcDGGridCoreCreator {
    public create(
        eGridDiv: HTMLElement,
        providedOptions: GridOptions,
        createUi: (context: Context) => void,
        acceptChanges?: (context: Context) => void,
        params?: GridParams,
        destroyCallback?: () => void
    ): GridApi {
        // Returns a shallow copy of the provided options, with global options merged in
        const gridOptions = GlobalGridOptions.applyGlobalGridOptions(providedOptions);

        const gridId = gridOptions.gridId ?? String(nextGridId++);

        const registeredModules = this.getRegisteredModules(params, gridId, gridOptions.rowModelType);

        const beanClasses = this.createBeansList(gridOptions.rowModelType, registeredModules, gridId);
        const providedBeanInstances = this.createProvidedBeans(eGridDiv, gridOptions, params);

        if (!beanClasses) {
            // Detailed error message will have been printed by createBeansList
            // Break typing so that the normal return type does not have to handle undefined.
            return undefined as any;
        }

        const contextParams: ContextParams = {
            providedBeanInstances,
            beanClasses,
            gridId,
            beanInitComparator: gridBeanInitComparator,
            beanDestroyComparator: gridBeanDestroyComparator,
            derivedBeans: [createGridApi],
            destroyCallback,
        };

        const context = new Context(contextParams);
        this.registerModuleFeatures(context, registeredModules);

        createUi(context);

        context.getBean('syncSvc').start();

        if (acceptChanges) {
            acceptChanges(context);
        }

        return context.getBean('gridApi');
    }

    private getRegisteredModules(
        params: GridParams | undefined,
        gridId: string,
        rowModelType: RowModelType | undefined
    ): Module[] {
        _registerModule(CommunityCoreModule, undefined, true);

        params?.modules?.forEach((m) => _registerModule(m, gridId));

        return _getRegisteredModules(gridId, getDefaultRowModelType(rowModelType));
    }

    private registerModuleFeatures(
        context: Context,
        registeredModules: (_ModuleWithApi<any> | _ModuleWithoutApi)[]
    ): void {
        const registry = context.getBean('registry');
        const apiFunctionSvc = context.getBean('apiFunctionSvc');

        registeredModules.forEach((module) => {
            registry.registerModule(module);

            const apiFunctions = module.apiFunctions;
            if (apiFunctions) {
                const names = Object.keys(apiFunctions) as ApiFunctionName[];
                names.forEach((name) => {
                    apiFunctionSvc?.addFunction(name, apiFunctions[name]!);
                });
            }
        });
    }

    private createProvidedBeans(eGridDiv: HTMLElement, gridOptions: GridOptions, params?: GridParams): any {
        let frameworkOverrides = params ? params.frameworkOverrides : null;
        if (_missing(frameworkOverrides)) {
            frameworkOverrides = new VanillaFrameworkOverrides();
        }

        const seed = {
            gridOptions: gridOptions,
            eGridDiv: eGridDiv,
            globalListener: params ? params.globalListener : null,
            globalSyncListener: params ? params.globalSyncListener : null,
            frameworkOverrides: frameworkOverrides,
        };
        if (params && params.providedBeanInstances) {
            Object.assign(seed, params.providedBeanInstances);
        }

        return seed;
    }

    private createBeansList(
        userProvidedRowModelType: RowModelType | undefined,
        registeredModules: Module[],
        gridId: string
    ): SingletonBean[] | undefined {
        // assert that the relevant module has been loaded
        const rowModelModuleNames: Record<RowModelType, CommunityModuleName | EnterpriseModuleName> = {
            clientSide: 'ClientSideRowModel',
            infinite: 'InfiniteRowModel',
            serverSide: 'ServerSideRowModel',
            viewport: 'ViewportRowModel',
        };
        const rowModelType = getDefaultRowModelType(userProvidedRowModelType);
        const rowModuleModelName = rowModelModuleNames[rowModelType];

        if (!rowModuleModelName) {
            // can't use validation service here as hasn't been created yet
            _logPreInitErr(201, { rowModelType }, `Unknown rowModelType ${rowModelType}.`);
            return;
        }

        if (!_hasUserRegistered()) {
            _logPreInitErr(272, undefined, NoModulesRegisteredError());
            return;
        }

        if (!userProvidedRowModelType) {
            // If the user has not specified a rowModelType, but have registered one of the RowModel modules, we need to check
            // that the user has registered the correct module for the rowModelType.
            // eslint-disable-next-line no-restricted-properties
            const registeredRowModelModules = Object.entries(rowModelModuleNames).filter(([rowModelType, module]) =>
                _isModuleRegistered(module, gridId, rowModelType as RowModelType)
            );

            if (registeredRowModelModules.length == 1) {
                const [userRowModelType, moduleName] = registeredRowModelModules[0] as [
                    RowModelType,
                    CommunityModuleName | EnterpriseModuleName,
                ];
                if (userRowModelType !== rowModelType) {
                    const params = {
                        moduleName,
                        rowModelType: userRowModelType!,
                    };
                    _logPreInitErr(275, params, missingRowModelTypeError(params));
                    return;
                }
            }
        }

        if (!_isModuleRegistered(rowModuleModelName, gridId, rowModelType)) {
            _logPreInitErr(
                200,
                {
                    reasonOrId: `rowModelType = '${rowModelType}'`,
                    moduleName: rowModuleModelName,
                    gridScoped: _areModulesGridScoped(),
                    gridId,
                    rowModelType,
                },
                `Missing module ${rowModuleModelName}Module for rowModelType ${rowModelType}.`
            );
            return;
        }

        const beans: Set<SingletonBean> = new Set();

        registeredModules.forEach((module) => module.beans?.forEach((bean) => beans.add(bean)));

        return Array.from(beans);
    }
}

function getDefaultRowModelType(passedRowModelType?: RowModelType): RowModelType {
    return passedRowModelType ?? 'clientSide';
}
