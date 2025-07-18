import type { AgColumn, IAcDataGridEvent, AgInputTextField, ComponentSelector, ElementParams } from 'ag-grid-community';
import {
    AgInputTextFieldSelector,
    Component,
    RefPlaceholder,
    _createIconNoSpan,
    _debounce,
    _setDisplayed,
} from 'ag-grid-community';

import type { ToolPanelFiltersCompParams } from './filtersToolPanel';

export enum EXPAND_STATE {
    EXPANDED,
    COLLAPSED,
    INDETERMINATE,
}
export type AgFiltersToolPanelHeaderEvent = 'collapseAll' | 'expandAll' | 'searchChanged';

const AgFiltersToolPanelHeaderElement: ElementParams = {
    tag: 'div',
    cls: 'ag-filter-toolpanel-search',
    role: 'presentation',
    children: [
        {
            tag: 'div',
            ref: 'eExpand',
            cls: 'ag-filter-toolpanel-expand',
        },
        {
            tag: 'ag-input-text-field',
            ref: 'eFilterTextField',
            cls: 'ag-filter-toolpanel-search-input',
        },
    ],
};
export class AcDataGridFiltersToolPanelHeader extends Component<AgFiltersToolPanelHeaderEvent> {
    private readonly eExpand: Element = RefPlaceholder;
    private readonly eFilterTextField: AgInputTextField = RefPlaceholder;

    private eExpandChecked: Element;
    private eExpandUnchecked: Element;
    private eExpandIndeterminate: Element;

    private onSearchTextChangedDebounced: () => void;

    private currentExpandState: EXPAND_STATE;

    private params: ToolPanelFiltersCompParams;

    public postConstruct(): void {
        this.setTemplate(AgFiltersToolPanelHeaderElement, [AgInputTextFieldSelector]);

        const translate = this.getLocaleTextFunc();

        this.eFilterTextField
            .setAutoComplete(false)
            .setInputAriaLabel(translate('ariaFilterColumnsInput', 'Filter Columns Input'))
            .onValueChange(this.onSearchTextChanged.bind(this));

        this.createExpandIcons();
        this.setExpandState(EXPAND_STATE.EXPANDED);
        this.addManagedElementListeners(this.eExpand, { click: this.onExpandClicked.bind(this) });
        this.addManagedEventListeners({ newColumnsLoaded: this.showOrHideOptions.bind(this) });
    }

    public init(params: ToolPanelFiltersCompParams): void {
        this.params = params;

        if (this.beans.colModel.ready) {
            this.showOrHideOptions();
        }
    }

    private createExpandIcons() {
        const { eExpand, beans } = this;
        eExpand.appendChild((this.eExpandChecked = _createIconNoSpan('accordionOpen', beans)!));
        eExpand.appendChild((this.eExpandUnchecked = _createIconNoSpan('accordionClosed', beans)!));
        eExpand.appendChild((this.eExpandIndeterminate = _createIconNoSpan('accordionIndeterminate', beans)!));
    }

    // we only show expand / collapse if we are showing filters
    private showOrHideOptions(): void {
        const { params, eFilterTextField } = this;
        const showFilterSearch = !params.suppressFilterSearch;
        const showExpand = !params.suppressExpandAll;
        const translate = this.getLocaleTextFunc();

        eFilterTextField.setInputPlaceholder(translate('searchOoo', 'Search...'));

        const isFilterGroupPresent = (col: AgColumn) => col.getOriginalParent() && col.isFilterAllowed();
        const filterGroupsPresent = this.beans.colModel.getCols().some(isFilterGroupPresent);

        _setDisplayed(eFilterTextField.getGui(), showFilterSearch);
        _setDisplayed(this.eExpand, showExpand && filterGroupsPresent);
    }

    private onSearchTextChanged(): void {
        if (!this.onSearchTextChangedDebounced) {
            this.onSearchTextChangedDebounced = _debounce(
                this,
                () => this.dispatchLocalEvent({ type: 'searchChanged', searchText: this.eFilterTextField.getValue() }),
                300
            );
        }

        this.onSearchTextChangedDebounced();
    }

    private onExpandClicked(): void {
        const event: IAcDataGridEvent<AgFiltersToolPanelHeaderEvent> =
            this.currentExpandState === EXPAND_STATE.EXPANDED ? { type: 'collapseAll' } : { type: 'expandAll' };
        this.dispatchLocalEvent(event);
    }

    public setExpandState(state: EXPAND_STATE): void {
        this.currentExpandState = state;

        _setDisplayed(this.eExpandChecked, state === EXPAND_STATE.EXPANDED);
        _setDisplayed(this.eExpandUnchecked, state === EXPAND_STATE.COLLAPSED);
        _setDisplayed(this.eExpandIndeterminate, state === EXPAND_STATE.INDETERMINATE);
    }
}

export const AgFiltersToolPanelHeaderSelector: ComponentSelector = {
    selector: 'AG-FILTERS-TOOL-PANEL-HEADER',
    component: AgFiltersToolPanelHeader,
};
