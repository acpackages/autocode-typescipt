import type {
    AgCheckbox,
    AgColumn,
    IAcDataGridEvent,
    ColDef,
    ElementParams,
    ICellRendererComp,
    ISetFilterCellRendererParams,
    ITooltipCtrl,
    SetFilterParams,
    TooltipFeature,
    ValueFormatterParams,
} from 'ag-grid-community';
import {
    AgCheckboxSelector,
    Component,
    RefPlaceholder,
    _addGridCommonParams,
    _createIcon,
    _getCellRendererDetails,
    _getShouldDisplayTooltip,
    _isShowTooltipWhenTruncated,
    _setAriaChecked,
    _setAriaDescribedBy,
    _setAriaExpanded,
    _setAriaLabel,
    _setAriaLabelledBy,
    _setAriaLevel,
    _setDisplayed,
    _toStringOrNull,
    _warn,
} from 'ag-grid-community';

import type { SetFilterModelTreeItem } from './iSetDisplayValueModel';
import type { ISetFilterLocaleText } from './localeText';

export interface IAcDGSetFilterListItemSelectionChangedEvent<
    I extends SetFilterModelTreeItem | string | null = SetFilterModelTreeItem | string | null,
> extends IAcDataGridEvent<'selectionChanged'> {
    isSelected: boolean;
    item: I;
}

export interface IAcDGSetFilterListItemExpandedChangedEvent<
    I extends SetFilterModelTreeItem | string | null = SetFilterModelTreeItem | string | null,
> extends IAcDataGridEvent<'expandedChanged'> {
    isExpanded: boolean;
    item: I;
}

export interface IAcDGSetFilterListItemParams<V> {
    focusWrapper: HTMLElement;
    value: V | null | (() => string);
    params: SetFilterParams<any, V>;
    translate: (key: keyof ISetFilterLocaleText) => string;
    valueFormatter?: (params: ValueFormatterParams) => string;
    item: SetFilterModelTreeItem | string | null;
    isSelected: boolean | undefined;
    isTree?: boolean;
    depth?: number;
    groupsExist?: boolean;
    isGroup?: boolean;
    isExpanded?: boolean;
    hasIndeterminateExpandState?: boolean;
}

export type SetFilterListItemEvent = 'selectionChanged' | 'expandedChanged';
/** @param V type of value in the Set Filter */

const SetFilterGroupElement: ElementParams = {
    tag: 'div',
    cls: 'ag-set-filter-item',
    attrs: { 'aria-hidden': 'true' },
    children: [
        {
            tag: 'span',
            cls: 'ag-set-filter-group-icons',
            children: [
                { tag: 'span', ref: 'eGroupClosedIcon', cls: 'ag-set-filter-group-closed-icon' },
                { tag: 'span', ref: 'eGroupOpenedIcon', cls: 'ag-set-filter-group-opened-icon' },
                { tag: 'span', ref: 'eGroupIndeterminateIcon', cls: 'ag-set-filter-group-indeterminate-icon' },
            ],
        },
        { tag: 'ag-checkbox', ref: 'eCheckbox', cls: 'ag-set-filter-item-checkbox' },
    ],
};

const SetFilterElement: ElementParams = {
    tag: 'div',
    cls: 'ag-set-filter-item',
    children: [{ tag: 'ag-checkbox', ref: 'eCheckbox', cls: 'ag-set-filter-item-checkbox' }],
};

export class AcDGSetFilterListItem<V> extends Component<SetFilterListItemEvent> {
    private readonly eCheckbox: AgCheckbox = RefPlaceholder;

    private readonly eGroupOpenedIcon: HTMLElement = RefPlaceholder;
    private readonly eGroupClosedIcon: HTMLElement = RefPlaceholder;
    private readonly eGroupIndeterminateIcon: HTMLElement = RefPlaceholder;

    private readonly focusWrapper: HTMLElement;
    private readonly value: V | null | (() => string);
    private readonly params: SetFilterParams<any, V>;
    private readonly translate: (key: keyof ISetFilterLocaleText) => string;
    private readonly valueFormatter?: (params: ValueFormatterParams) => string;
    private readonly isTree?: boolean;
    private readonly depth: number;
    private readonly isGroup?: boolean;
    private readonly groupsExist?: boolean;
    private readonly hasIndeterminateExpandState?: boolean;

    private item: SetFilterModelTreeItem | string | null;
    private isSelected: boolean | undefined;
    private isExpanded: boolean | undefined;
    // only used for select all
    private valueFunction?: () => string;

    private cellRendererParams: ISetFilterCellRendererParams;
    private cellRendererComponent?: ICellRendererComp;
    private destroyCellRendererComponent?: () => void;
    private tooltipFeature?: TooltipFeature;
    private shouldDisplayTooltip?: () => boolean;
    private formattedValue: string | null = null;

    constructor(params: SetFilterListItemParams<V>) {
        super(params.isGroup ? SetFilterGroupElement : SetFilterElement, [AgCheckboxSelector]);
        this.focusWrapper = params.focusWrapper;
        this.value = params.value;
        this.params = params.params;
        this.translate = params.translate;
        this.valueFormatter = params.valueFormatter;
        this.item = params.item;
        this.isSelected = params.isSelected;
        this.isTree = params.isTree;
        this.depth = params.depth ?? 0;
        this.isGroup = params.isGroup;
        this.groupsExist = params.groupsExist;
        this.isExpanded = params.isExpanded;
        this.hasIndeterminateExpandState = params.hasIndeterminateExpandState;
    }

    public postConstruct(): void {
        this.tooltipFeature = this.createOptionalManagedBean(
            this.beans.registry.createDynamicBean<TooltipFeature>('tooltipFeature', false, {
                getGui: () => this.getGui(),
                getColDef: () => this.params.colDef,
                getColumn: () => this.params.column as AgColumn,
                getLocation: () => 'setFilterValue',
                shouldDisplayTooltip: () => this.shouldDisplayTooltip?.() ?? true,
                getValueFormatted: () => this.formattedValue,
                getAdditionalParams: () => (this.isTree ? { level: this.depth } : {}),
            } as ITooltipCtrl)
        );

        this.addDestroyFunc(() => this.destroyCellRendererComponent?.());

        this.render();

        this.eCheckbox
            .setLabelEllipsis(true)
            .setValue(this.isSelected, true)
            .setDisabled(!!this.params.readOnly)
            .getInputElement()
            .setAttribute('tabindex', '-1');

        this.refreshVariableAriaLabels();

        if (this.isTree) {
            if (this.depth > 0) {
                this.addCss('ag-set-filter-indent-' + this.depth);
                this.getGui().style.setProperty('--ag-indentation-level', String(this.depth));
            }
            if (this.isGroup) {
                this.setupExpansion();
            } else {
                if (this.groupsExist) {
                    this.addCss('ag-set-filter-add-group-indent');
                }
            }

            _setAriaLevel(this.getAriaElement(), this.depth + 1);
        }

        this.refreshAriaChecked();

        if (this.params.readOnly) {
            // Don't add event listeners if we're read-only.
            return;
        }

        this.eCheckbox.onValueChange((value) => this.onCheckboxChanged(!!value));
    }

    public override getFocusableElement(): HTMLElement {
        return this.focusWrapper;
    }

    private setupExpansion(): void {
        const { eGroupClosedIcon, eGroupOpenedIcon, eGroupIndeterminateIcon, hasIndeterminateExpandState, beans } =
            this;

        eGroupClosedIcon.appendChild(_createIcon('setFilterGroupClosed', beans, null));
        eGroupOpenedIcon.appendChild(_createIcon('setFilterGroupOpen', beans, null));
        const listener = this.onExpandOrContractClicked.bind(this);
        this.addManagedElementListeners(eGroupClosedIcon, { click: listener });
        this.addManagedElementListeners(eGroupOpenedIcon, { click: listener });

        if (hasIndeterminateExpandState) {
            eGroupIndeterminateIcon.appendChild(_createIcon('setFilterGroupIndeterminate', beans, null));
            this.addManagedElementListeners(eGroupIndeterminateIcon, {
                click: listener,
            });
        }

        this.setExpandedIcons();
        this.refreshAriaExpanded();
    }

    private onExpandOrContractClicked(): void {
        this.setExpanded(!this.isExpanded);
    }

    public setExpanded(isExpanded: boolean | undefined, silent?: boolean): void {
        if (this.isGroup && isExpanded !== this.isExpanded) {
            this.isExpanded = isExpanded;

            const event: SetFilterListItemExpandedChangedEvent = {
                type: 'expandedChanged',
                isExpanded: !!isExpanded,
                item: this.item,
            };

            if (!silent) {
                this.dispatchLocalEvent(event);
            }

            this.setExpandedIcons();
            this.refreshAriaExpanded();
        }
    }

    private setExpandedIcons(): void {
        const { isExpanded, hasIndeterminateExpandState, eGroupClosedIcon, eGroupOpenedIcon, eGroupIndeterminateIcon } =
            this;
        _setDisplayed(eGroupClosedIcon, hasIndeterminateExpandState ? isExpanded === false : !isExpanded);
        _setDisplayed(eGroupOpenedIcon, isExpanded === true);
        if (hasIndeterminateExpandState) {
            _setDisplayed(eGroupIndeterminateIcon, isExpanded === undefined);
        }
    }

    private onCheckboxChanged(isSelected: boolean): void {
        this.isSelected = isSelected;

        const event: SetFilterListItemSelectionChangedEvent = {
            type: 'selectionChanged',
            isSelected,
            item: this.item,
        };

        this.dispatchLocalEvent(event);
        this.refreshVariableAriaLabels();
        this.refreshAriaChecked();
    }

    public toggleSelected(): void {
        if (this.params.readOnly) {
            return;
        }

        this.setSelected(!this.isSelected);
    }

    private setSelected(isSelected: boolean | undefined, silent?: boolean) {
        this.isSelected = isSelected;
        this.eCheckbox.setValue(isSelected, silent);
        this.refreshAriaChecked();
    }

    private refreshVariableAriaLabels(): void {
        if (!this.isTree) {
            return;
        }
        const translate = this.getLocaleTextFunc();
        const checkboxValue = this.eCheckbox.getValue();
        const state =
            checkboxValue === undefined
                ? translate('ariaIndeterminate', 'indeterminate')
                : checkboxValue
                  ? translate('ariaVisible', 'visible')
                  : translate('ariaHidden', 'hidden');
        const visibilityLabel = translate('ariaToggleVisibility', 'Press SPACE to toggle visibility');
        _setAriaLabelledBy(this.eCheckbox.getInputElement(), undefined as any);
        this.eCheckbox.setInputAriaLabel(`${visibilityLabel} (${state})`);
    }

    private setupFixedAriaLabels(value: any): void {
        if (!this.isTree) {
            return;
        }
        const translate = this.getLocaleTextFunc();
        const itemLabel = translate('ariaFilterValue', 'Filter Value');
        const ariaEl = this.getAriaElement();
        _setAriaLabel(ariaEl, `${value} ${itemLabel}`);
        _setAriaDescribedBy(ariaEl, this.eCheckbox.getInputElement().id);
    }

    private refreshAriaChecked(): void {
        const ariaEl = this.getAriaElement();

        _setAriaChecked(ariaEl, this.eCheckbox.getValue());
    }

    private refreshAriaExpanded(): void {
        _setAriaExpanded(this.getAriaElement(), !!this.isExpanded);
    }

    public refresh(
        item: SetFilterModelTreeItem | string | null,
        isSelected: boolean | undefined,
        isExpanded: boolean | undefined
    ): void {
        this.item = item;
        // setExpanded checks if value has changed, setSelected does not
        if (isSelected !== this.isSelected) {
            this.setSelected(isSelected, true);
        }
        this.setExpanded(isExpanded, true);
        const { cellRendererComponent, cellRendererParams, beans, params } = this;
        if (this.valueFunction) {
            // underlying value might have changed, so call again and re-render
            const value = this.valueFunction();
            this.setTooltipAndCellRendererParams(value as any, value);
            if (!cellRendererComponent) {
                this.renderCellWithoutCellRenderer();
            }
        }
        if (cellRendererComponent) {
            // need to get correct params for refresh from comp details
            const compDetails = _getCellRendererDetails<SetFilterParams<any, V>, ISetFilterCellRendererParams>(
                beans.userCompFactory,
                params,
                cellRendererParams
            );
            const success = cellRendererComponent.refresh?.(compDetails?.params ?? cellRendererParams);
            if (!success) {
                const oldComponent = cellRendererComponent;
                this.renderCell();
                this.destroyBean(oldComponent);
            }
        }
    }

    public render(): void {
        const {
            params: { column },
        } = this;

        let { value } = this;
        let formattedValue: string | null = null;

        if (typeof value === 'function') {
            this.valueFunction = value as () => string;
            formattedValue = this.valueFunction();
            // backwards compatibility for select all in value
            value = formattedValue as any;
        } else if (this.isTree) {
            // tree values are already formatted via treeListFormatter
            formattedValue = _toStringOrNull(value);
        } else {
            formattedValue = this.getFormattedValue(column as AgColumn, value);
        }
        this.formattedValue = formattedValue;

        this.setTooltipAndCellRendererParams(value, formattedValue);

        this.renderCell();
    }

    private setTooltipAndCellRendererParams(value: V | null | (() => string), formattedValue: string | null): void {
        const gos = this.gos;
        if (this.params.showTooltips && (!_isShowTooltipWhenTruncated(gos) || !this.params.cellRenderer)) {
            const newTooltipText = formattedValue != null ? formattedValue : _toStringOrNull(value);
            this.shouldDisplayTooltip = _getShouldDisplayTooltip(
                gos,
                () => this.eCheckbox.getGui().querySelector('.ag-label') as HTMLElement | undefined
            );
            this.tooltipFeature?.setTooltipAndRefresh(newTooltipText);
        }

        this.cellRendererParams = _addGridCommonParams(gos, {
            value,
            valueFormatted: formattedValue,
            colDef: this.params.colDef,
            column: this.params.column,
            setTooltip: (value: string, shouldDisplayTooltip: () => boolean) => {
                gos.assertModuleRegistered('Tooltip', 3);
                this.shouldDisplayTooltip = shouldDisplayTooltip;
                this.tooltipFeature?.setTooltipAndRefresh(value);
            },
        });
    }

    private getFormattedValue(column: AgColumn, value: any) {
        return this.beans.valueSvc.formatValue(column, null, value, this.valueFormatter, false);
    }

    private renderCell(): void {
        const compDetails = _getCellRendererDetails<SetFilterParams<any, V>, ISetFilterCellRendererParams>(
            this.beans.userCompFactory,
            this.params,
            this.cellRendererParams
        );
        const cellRendererPromise = compDetails?.newAgStackInstance();

        if (cellRendererPromise == null) {
            this.renderCellWithoutCellRenderer();
            return;
        }

        cellRendererPromise.then((component) => {
            if (component) {
                this.cellRendererComponent = component;
                this.eCheckbox.setLabel(component.getGui());
                this.destroyCellRendererComponent = () => this.destroyBean(component);
            }
        });
    }

    private renderCellWithoutCellRenderer(): void {
        const { valueFormatted, value } = this.cellRendererParams;
        let valueToRender = (valueFormatted == null ? value : valueFormatted) ?? this.translate('blanks');
        if (typeof valueToRender !== 'string') {
            _warn(208);
            valueToRender = '';
        }

        this.eCheckbox.setLabel(valueToRender);
        this.setupFixedAriaLabels(valueToRender);
    }

    public getComponentHolder(): ColDef {
        return this.params.column.getColDef();
    }
}
