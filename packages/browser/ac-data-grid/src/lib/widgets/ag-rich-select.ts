import type {
    AgInputTextField,
    AgPromise,
    AriaAnnouncementService,
    BeanCollection,
    ElementParams,
    FieldPickerValueSelectedEvent,
    ICellRendererComp,
    IRichCellEditorRendererParams,
    ITooltipCtrl,
    Registry,
    RichSelectListRowSelectedEvent,
    RichSelectParams,
    TooltipFeature,
    UserCompDetails,
    UserComponentFactory,
    WithoutGridCommon,
} from 'ag-grid-community';
import {
    AgInputTextFieldSelector,
    AgPickerField,
    KeyCode,
    RefPlaceholder,
    _addGridCommonParams,
    _clearElement,
    _createIconNoSpan,
    _debounce,
    _exists,
    _fuzzySuggestions,
    _getActiveDomElement,
    _getEditorRendererDetails,
    _isEventFromPrintableCharacter,
    _isVisible,
    _setAriaActiveDescendant,
    _shouldDisplayTooltip,
    _stopPropagationForAgGrid,
} from 'ag-grid-community';

import { AgPillContainer } from './AgPillContainer';
import { agRichSelectCSS } from './agRichSelect.css-GENERATED';
import type { AgRichSelectListEvent } from './agRichSelectList';
import { AgRichSelectList } from './agRichSelectList';

export type AgRichSelectEvent = AgRichSelectListEvent;

const AgRichSelectElement: ElementParams = {
    tag: 'div',
    cls: 'ag-picker-field',
    role: 'presentation',
    children: [
        { tag: 'div', ref: 'eLabel' },
        {
            tag: 'div',
            ref: 'eWrapper',
            cls: 'ag-wrapper ag-picker-field-wrapper ag-rich-select-value ag-picker-collapsed',
            children: [
                { tag: 'span', ref: 'eDisplayField', cls: 'ag-picker-field-display' },
                { tag: 'ag-input-text-field', ref: 'eInput', cls: 'ag-rich-select-field-input' },
                {
                    tag: 'span',
                    ref: 'eDeselect',
                    cls: 'ag-rich-select-deselect-button ag-picker-field-icon',
                    role: 'presentation',
                },
                { tag: 'span', ref: 'eIcon', cls: 'ag-picker-field-icon', attrs: { 'aria-hidden': 'true' } },
            ],
        },
    ],
};
export class AcDataGridRichSelect<TValue = any> extends AgPickerField<
    TValue[] | TValue,
    RichSelectParams<TValue>,
    AgRichSelectEvent,
    AgRichSelectList<TValue, AgRichSelectEvent>
> {
    private userCompFactory: UserComponentFactory;
    private ariaAnnounce?: AriaAnnouncementService;
    private registry: Registry;

    public wireBeans(beans: BeanCollection) {
        this.userCompFactory = beans.userCompFactory;
        this.ariaAnnounce = beans.ariaAnnounce;
        this.registry = beans.registry;
    }

    private searchStrings?: string[];
    private searchString = '';
    private listComponent: AgRichSelectList<TValue> | undefined;
    private pillContainer: AgPillContainer<TValue> | null;
    protected values: TValue[];

    private searchStringCreator: ((values: TValue[]) => string[]) | null = null;
    private readonly eInput: AgInputTextField = RefPlaceholder;
    private readonly eDeselect: HTMLSpanElement = RefPlaceholder;

    private ariaToggleSelection: string;
    private ariaDeselectAllItems: string;
    private ariaDeleteSelection: string;
    private skipWrapperAnnouncement?: boolean = false;
    private tooltipFeature?: TooltipFeature;
    private shouldDisplayTooltip?: () => boolean;

    constructor(config?: RichSelectParams<TValue>) {
        super({
            pickerAriaLabelKey: 'ariaLabelRichSelectField',
            pickerAriaLabelValue: 'Rich Select Field',
            pickerType: 'ag-list',
            className: 'ag-rich-select',
            pickerIcon: 'richSelectOpen',
            ariaRole: 'combobox',
            template: config?.template ?? AgRichSelectElement,
            agComponents: [AgInputTextFieldSelector],
            modalPicker: false,
            ...config,
            // maxPickerHeight needs to be set after expanding `config`
            maxPickerHeight: config?.maxPickerHeight ?? 'calc(var(--ag-row-height) * 6.5)',
        });

        const { value, valueList, searchStringCreator } = config || {};

        if (value !== undefined) {
            this.value = value;
        }

        if (searchStringCreator) {
            this.searchStringCreator = searchStringCreator;
        }

        if (valueList != null) {
            this.setValues(valueList);
        }

        this.registerCSS(agRichSelectCSS);
    }

    public override postConstruct(): void {
        this.tooltipFeature = this.createOptionalManagedBean(
            this.registry.createDynamicBean<TooltipFeature>('tooltipFeature', false, {
                getGui: () => this.getGui(),
                shouldDisplayTooltip: () => this.shouldDisplayTooltip?.() ?? true,
            } as ITooltipCtrl)
        );
        super.postConstruct();
        this.createListComponent();
        this.eDeselect.appendChild(_createIconNoSpan('richSelectRemove', this.beans)!);

        const { allowTyping, placeholder, suppressDeselectAll } = this.config;

        this.eDeselect.classList.add('ag-hidden');

        if (allowTyping) {
            this.eInput.setAutoComplete(false).setInputPlaceholder(placeholder);
            this.eDisplayField.classList.add('ag-hidden');
        } else {
            this.eInput.setDisplayed(false);
        }

        this.setupAriaProperties();

        const { searchDebounceDelay = 300 } = this.config;
        this.clearSearchString = _debounce(this, this.clearSearchString.bind(this), searchDebounceDelay);

        this.renderSelectedValue();

        if (allowTyping) {
            this.eInput.onValueChange((value) => this.searchTextFromString(value));
        }

        this.addManagedElementListeners(this.eWrapper, { focus: this.onWrapperFocus.bind(this) });
        this.addManagedElementListeners(this.eWrapper, { focusout: this.onWrapperFocusOut.bind(this) });

        if (!suppressDeselectAll) {
            this.addManagedElementListeners(this.eDeselect, {
                mousedown: this.onDeselectAllMouseDown.bind(this),
                click: this.onDeselectAllClick.bind(this),
            });
        }
    }

    private setupAriaProperties(): void {
        const { eWrapper, gos } = this;

        eWrapper.tabIndex = gos.get('tabIndex');

        const translate = this.getLocaleTextFunc();
        this.ariaDeleteSelection = translate('ariaLabelRichSelectDeleteSelection', 'Press DELETE to deselect item');
        this.ariaDeselectAllItems = translate(
            'ariaLabelRichSelectDeselectAllItems',
            'Press DELETE to deselect all items'
        );
        this.ariaToggleSelection = translate('ariaLabelRichSelectToggleSelection', 'Press SPACE to toggle selection');
    }

    private createListComponent(): void {
        this.listComponent = this.createBean(new AgRichSelectList(this.config, this.eWrapper, () => this.searchString));
        this.listComponent.setParentComponent(this);

        this.addManagedListeners(this.listComponent, {
            richSelectListRowSelected: (e: RichSelectListRowSelectedEvent) => {
                this.onListValueSelected(e.value, e.fromEnterKey);
            },
        });
    }

    private renderSelectedValue(): void {
        const { value, eDisplayField, config, gos } = this;
        const {
            allowTyping,
            cellRenderer,
            initialInputValue,
            multiSelect,
            suppressDeselectAll,
            suppressMultiSelectPillRenderer,
        } = config;

        const valueFormatted = config.valueFormatter?.(value) ?? String(value);

        if (allowTyping) {
            this.eInput.setValue(initialInputValue ?? valueFormatted);
            return;
        }

        if (multiSelect && !suppressDeselectAll) {
            const isEmpty = value == null || (Array.isArray(value) && value.length === 0);
            this.eDeselect.classList.toggle('ag-hidden', isEmpty);
        }

        let userCompDetails: UserCompDetails | undefined;

        if (multiSelect && !suppressMultiSelectPillRenderer) {
            this.createOrUpdatePillContainer(eDisplayField);
            return;
        }

        if (cellRenderer) {
            userCompDetails = _getEditorRendererDetails<RichSelectParams, IRichCellEditorRendererParams<TValue>>(
                this.userCompFactory,
                config,
                _addGridCommonParams(this.gos, {
                    value,
                    valueFormatted,
                    getValue: () => this.getValue(),
                    setValue: (value: TValue[] | TValue | null) => {
                        this.setValue(value, true);
                    },
                    setTooltip: (value: string, shouldDisplayTooltip: () => boolean) => {
                        gos.assertModuleRegistered('Tooltip', 3);
                        this.shouldDisplayTooltip = shouldDisplayTooltip;
                        this.tooltipFeature?.setTooltipAndRefresh(value);
                    },
                })
            );
        }

        let userCompDetailsPromise: AgPromise<any> | undefined;

        if (userCompDetails) {
            userCompDetailsPromise = userCompDetails.newAgStackInstance();
        }

        if (userCompDetailsPromise) {
            _clearElement(eDisplayField);
            _bindCellRendererToHtmlElement(userCompDetailsPromise, eDisplayField);
            userCompDetailsPromise.then((renderer) => {
                this.addDestroyFunc(() => this.destroyBean(renderer));
            });
        } else {
            if (_exists(this.value)) {
                // eslint-disable-next-line no-restricted-properties -- Could swap to textContent, but could be a breaking change
                eDisplayField.innerText = valueFormatted;
                eDisplayField.classList.remove('ag-display-as-placeholder');
            } else {
                const { placeholder } = config;
                if (_exists(placeholder)) {
                    eDisplayField.textContent = placeholder;
                    eDisplayField.classList.add('ag-display-as-placeholder');
                } else {
                    _clearElement(eDisplayField);
                }
            }

            this.shouldDisplayTooltip = _shouldDisplayTooltip(() => this.eDisplayField);
            this.tooltipFeature?.setTooltipAndRefresh(valueFormatted ?? null);
        }
    }

    protected createPickerComponent() {
        const { values } = this;

        if (values) {
            this.setValueList({ valueList: values });
        }

        // do not create the picker every time to save state
        return this.listComponent!;
    }

    public setSearchStringCreator(searchStringFn: (values: TValue[]) => string[]): void {
        this.searchStringCreator = searchStringFn;
    }

    public setValueList(params: { valueList: TValue[]; refresh?: boolean }): void {
        const { valueList, refresh } = params;

        if (!this.listComponent || this.listComponent.getCurrentList() === valueList) {
            return;
        }

        this.listComponent.setCurrentList(valueList);

        if (refresh) {
            // if `values` is not present, it means the valuesList was set asynchronously
            if (!this.values) {
                this.setValues(valueList);
                if (this.isPickerDisplayed) {
                    const hasRefreshed = this.listComponent.selectValue(this.value);
                    if (!hasRefreshed) {
                        this.listComponent.refresh();
                    }
                }
            } else {
                this.listComponent.refresh(true);
            }

            this.alignPickerToComponent();
        }
    }

    /**
     * This method updates the list of values
     */
    private setValues(values: TValue[]): void {
        this.values = values;
        this.searchStrings = this.getSearchStringsFromValues(values);
    }

    public override showPicker() {
        super.showPicker();
        const { listComponent, value } = this;

        if (!listComponent) {
            return;
        }

        let idx = null;
        listComponent.selectValue(this.value);
        if (this.value != null) {
            idx = listComponent.getIndicesForValues(Array.isArray(value) ? value : [value])[0];
        }

        if (idx != null) {
            listComponent.highlightIndex(idx);
        } else {
            listComponent.refresh();
        }

        this.displayOrHidePicker();
    }

    protected override beforeHidePicker(): void {
        super.beforeHidePicker();
    }

    private createOrUpdatePillContainer(container: HTMLElement): void {
        if (!this.pillContainer) {
            const pillContainer = (this.pillContainer = this.createBean(new AgPillContainer<TValue>()));
            this.addDestroyFunc(() => {
                this.destroyBean(this.pillContainer);
                this.pillContainer = null;
            });

            _clearElement(container);
            container.appendChild(pillContainer.getGui());

            const { config, eWrapper, ariaDeleteSelection } = this;
            const { valueFormatter } = config;

            pillContainer.init({
                eWrapper,
                valueFormatter,
                onPillMouseDown: (e: MouseEvent) => {
                    e.stopImmediatePropagation();
                },
                announceItemFocus: () => {
                    this.announceAriaValue(ariaDeleteSelection);
                },
                getValue: () => this.getValue() as TValue[] | null,
                setValue: (value: TValue[] | null) => this.setValue(value, true),
            });
        }

        this.doWhileBlockingAnnouncement(() => this.pillContainer?.refresh());
    }

    private doWhileBlockingAnnouncement(func: () => void): void {
        this.skipWrapperAnnouncement = true;
        func();
        this.skipWrapperAnnouncement = false;
    }

    private onWrapperFocus(): void {
        const { eInput, config } = this;
        const { allowTyping, multiSelect, suppressDeselectAll } = config;

        if (allowTyping) {
            const focusableEl = eInput.getFocusableElement() as HTMLInputElement;
            focusableEl.focus();
            focusableEl.select();
        } else if (multiSelect && !suppressDeselectAll && !this.skipWrapperAnnouncement) {
            this.announceAriaValue(this.ariaDeselectAllItems);
        }
    }

    private onWrapperFocusOut(e: FocusEvent): void {
        if (!this.eWrapper.contains(e.relatedTarget as Element)) {
            this.hidePicker();
        }
    }

    private onDeselectAllMouseDown(e: MouseEvent): void {
        // don't expand or collapse picker when clicking on deselect all
        e.stopImmediatePropagation();
    }

    private onDeselectAllClick(): void {
        this.setValue([], true);
    }

    private buildSearchStringFromKeyboardEvent(searchKey: KeyboardEvent) {
        let { key } = searchKey;

        if (key === KeyCode.BACKSPACE) {
            this.searchString = this.searchString.slice(0, -1);
            key = '';
        } else if (!_isEventFromPrintableCharacter(searchKey)) {
            return;
        }

        searchKey.preventDefault();

        this.searchTextFromCharacter(key);
    }

    private searchTextFromCharacter(char: string): void {
        this.searchString += char;
        this.runSearch();
        this.clearSearchString();
    }

    public searchTextFromString(str: string | null | undefined): void {
        if (str == null) {
            str = '';
        }
        this.searchString = str;
        this.runSearch();
    }

    private getSearchStringsFromValues(values: TValue[]): string[] | undefined {
        const { config } = this;
        const { valueFormatter = (value) => String(value) } = config;

        if (typeof values[0] === 'object' && this.searchStringCreator) {
            return this.searchStringCreator(values);
        }

        return values.map((v) => valueFormatter(v) as string);
    }

    private filterListModel(filteredValues: TValue[]): void {
        const { filterList } = this.config;

        if (!filterList) {
            return;
        }

        this.setValueList({ valueList: filteredValues, refresh: true });
    }

    private runSearch() {
        if (!this.listComponent) {
            return;
        }

        const { values } = this;
        const searchStrings = this.searchStrings;

        if (!searchStrings) {
            this.listComponent.highlightIndex(-1);
            return;
        }

        const { suggestions, filteredValues } = this.getSuggestionsAndFilteredValues(this.searchString, searchStrings);
        const { filterList, highlightMatch, searchType = 'fuzzy' } = this.config;
        const shouldFilter = !!(filterList && this.searchString !== '');

        this.filterListModel(shouldFilter ? filteredValues : values);

        if (!this.highlightEmptyValue()) {
            this.highlightListValue(suggestions, filteredValues, shouldFilter);
        }

        if (highlightMatch && searchType !== 'fuzzy') {
            this.listComponent?.highlightFilterMatch(this.searchString);
        }

        this.displayOrHidePicker();
    }

    private highlightEmptyValue(): boolean {
        if (this.searchString === '') {
            const emptyIdx = this.searchStrings?.indexOf('');
            if (emptyIdx !== undefined && emptyIdx !== -1) {
                this.listComponent?.highlightIndex(emptyIdx);
                return true;
            }
        }
        return false;
    }

    private highlightListValue(suggestions: string[], filteredValues: TValue[], shouldFilter: boolean): void {
        if (suggestions.length) {
            const topSuggestionIndex = shouldFilter ? 0 : this.searchStrings?.indexOf(suggestions[0]);
            if (topSuggestionIndex !== undefined) {
                this.listComponent?.highlightIndex(topSuggestionIndex);
            }
        } else {
            this.listComponent?.highlightIndex(-1);

            if (!shouldFilter || filteredValues.length) {
                this.listComponent?.ensureIndexVisible(0);
            } else if (shouldFilter) {
                this.getAriaElement().removeAttribute('data-active-option');
                const eListAriaEl = this.listComponent?.getAriaElement();
                if (eListAriaEl) {
                    _setAriaActiveDescendant(eListAriaEl, null);
                }
            }
        }
    }

    private getSuggestionsAndFilteredValues(
        searchValue: string,
        valueList: string[]
    ): { suggestions: string[]; filteredValues: TValue[] } {
        let suggestions: string[] = [];
        const filteredValues: TValue[] = [];

        if (!searchValue.length) {
            return { suggestions, filteredValues };
        }

        const { searchType = 'fuzzy', filterList } = this.config;

        if (searchType === 'fuzzy') {
            const fuzzySearchResult = _fuzzySuggestions({
                inputValue: searchValue,
                allSuggestions: valueList,
                hideIrrelevant: true,
            });
            suggestions = fuzzySearchResult.values;

            const indices = fuzzySearchResult.indices;
            if (filterList && indices.length) {
                for (let i = 0; i < indices.length; i++) {
                    filteredValues.push(this.values[indices[i]]);
                }
            }
        } else {
            suggestions = valueList.filter((val, idx) => {
                const currentValue = val.toLocaleLowerCase();
                const valueToMatch = this.searchString.toLocaleLowerCase();

                const isMatch =
                    searchType === 'match'
                        ? currentValue.startsWith(valueToMatch)
                        : currentValue.indexOf(valueToMatch) !== -1;
                if (filterList && isMatch) {
                    filteredValues.push(this.values[idx]);
                }
                return isMatch;
            });
        }

        return { suggestions, filteredValues };
    }

    private displayOrHidePicker(): void {
        if (!this.listComponent) {
            return;
        }

        const eListGui = this.listComponent.getGui();
        const list = this.listComponent.getCurrentList();
        const toggleValue = list ? list.length === 0 : false;

        eListGui.classList.toggle('ag-hidden', toggleValue);
    }

    private clearSearchString(): void {
        this.searchString = '';
    }

    public override setValue(
        value: TValue[] | TValue | null,
        silent?: boolean,
        fromPicker?: boolean,
        skipRendering?: boolean
    ): this {
        if (this.value === value) {
            return this;
        }

        const isArray = Array.isArray(value);

        if (value != null) {
            if (!isArray) {
                const list = this.listComponent?.getCurrentList();
                const index = list ? list.indexOf(value) : -1;

                if (index === -1) {
                    return this;
                }
            }

            if (!fromPicker) {
                this.listComponent?.selectValue(value);
            }
        }

        super.setValue(value, silent);

        if (!skipRendering) {
            this.renderSelectedValue();
        }

        return this;
    }

    private onNavigationKeyDown(event: any, key: string, announceItem: () => void): void {
        // if we don't preventDefault the page body and/or grid scroll will move.
        event.preventDefault();

        const isDown = key === KeyCode.DOWN;

        if (!this.isPickerDisplayed && isDown) {
            this.showPicker();
            return;
        }

        this.listComponent?.onNavigationKeyDown(key, announceItem);
    }

    protected onEnterKeyDown(e: KeyboardEvent): void {
        if (!this.isPickerDisplayed) {
            return;
        }

        e.preventDefault();

        if (this.listComponent?.getCurrentList()) {
            const lastRowHovered = this.listComponent.getLastItemHovered();
            if (this.config.multiSelect || lastRowHovered == null) {
                this.dispatchPickerEventAndHidePicker(this.value, true);
            } else {
                this.onListValueSelected(new Set<TValue>([lastRowHovered]), true);
            }
        }
    }

    private onDeleteKeyDown(e: KeyboardEvent): void {
        const { eWrapper, beans } = this;
        const activeEl = _getActiveDomElement(beans);

        if (activeEl === eWrapper) {
            e.preventDefault();
            this.setValue([], true);
        }
    }

    private onTabKeyDown(): void {
        const { config, isPickerDisplayed, listComponent } = this;
        const { multiSelect } = config;

        if (!isPickerDisplayed || !listComponent) {
            return;
        }

        if (multiSelect) {
            const values = this.getValueFromSet(listComponent.getSelectedItems());

            if (values) {
                this.setValue(values, false, true, true);
            }
        } else {
            const lastItemHovered = listComponent.getLastItemHovered();
            if (lastItemHovered) {
                this.setValue(lastItemHovered, false, true);
            }
        }
        this.hidePicker();
    }

    private getValueFromSet(valueSet: Set<TValue>): TValue[] | TValue | null {
        const { multiSelect } = this.config;
        let newValue: TValue[] | TValue | null = null;

        for (const value of valueSet) {
            if (valueSet.size === 1 && !multiSelect) {
                newValue = value;
                break;
            }
            if (!newValue) {
                newValue = [];
            }
            (newValue as TValue[]).push(value);
        }

        if (Array.isArray(newValue)) {
            newValue.sort();
        }

        return newValue;
    }

    private onListValueSelected(valueSet: Set<TValue>, fromEnterKey: boolean): void {
        const newValue = this.getValueFromSet(valueSet);

        this.setValue(newValue, false, true);

        if (!this.config.multiSelect) {
            this.dispatchPickerEventAndHidePicker(newValue, fromEnterKey);
        }
    }

    private dispatchPickerEventAndHidePicker(value: TValue[] | TValue | null, fromEnterKey: boolean): void {
        const event: WithoutGridCommon<FieldPickerValueSelectedEvent> = {
            type: 'fieldPickerValueSelected',
            fromEnterKey,
            value,
        };

        this.dispatchLocalEvent(event);
        this.hidePicker();
    }

    public override getFocusableElement(): HTMLElement {
        const { allowTyping } = this.config;

        if (allowTyping) {
            return this.eInput.getFocusableElement();
        }

        return super.getFocusableElement();
    }

    protected override onKeyDown(e: KeyboardEvent): void {
        const { key, isComposing } = e;

        const { isPickerDisplayed, config, listComponent, pickerComponent } = this;
        const { allowTyping, multiSelect, suppressDeselectAll } = config;

        switch (key) {
            case KeyCode.LEFT:
            case KeyCode.RIGHT:
                if (!allowTyping || this.pillContainer) {
                    e.preventDefault();
                    if (this.pillContainer) {
                        this.listComponent?.highlightIndex(-1);
                        this.pillContainer.onNavigationKeyDown(e);
                    }
                }
                break;
            case KeyCode.PAGE_HOME:
            case KeyCode.PAGE_END:
                if (allowTyping) {
                    e.preventDefault();
                    const inputEl = this.eInput.getInputElement();
                    const target = key === KeyCode.PAGE_HOME ? 0 : inputEl.value.length;
                    inputEl.setSelectionRange(target, target);
                    break;
                }
            // Only break here for allowTyping, otherwise use the same logic as PageUp/PageDown
            // eslint-disable-next-line
            case KeyCode.PAGE_UP:
            case KeyCode.PAGE_DOWN:
                e.preventDefault();
                if (pickerComponent) {
                    listComponent?.navigateToPage(key);
                }
                break;
            case KeyCode.DOWN:
            case KeyCode.UP:
                if (!isComposing) {
                    this.onNavigationKeyDown(e, key, () => {
                        if (multiSelect) {
                            this.doWhileBlockingAnnouncement(() => this.eWrapper.focus());
                            this.announceAriaValue(this.ariaToggleSelection);
                        }
                    });
                }

                break;
            case KeyCode.ESCAPE:
                if (isPickerDisplayed) {
                    if (_isVisible(this.listComponent!.getGui())) {
                        e.preventDefault();
                        _stopPropagationForAgGrid(e);
                    }
                    this.hidePicker();
                }
                break;
            case KeyCode.ENTER:
                if (isComposing) {
                    e.preventDefault();
                } else {
                    this.onEnterKeyDown(e);
                }

                break;
            case KeyCode.SPACE:
                e.preventDefault();

                if (!isComposing && isPickerDisplayed && multiSelect && listComponent) {
                    const lastItemHovered = listComponent.getLastItemHovered();

                    if (lastItemHovered) {
                        listComponent.toggleListItemSelection(lastItemHovered);
                    }
                }
                break;
            case KeyCode.TAB:
                this.onTabKeyDown();
                break;
            case KeyCode.DELETE:
                if (multiSelect && !suppressDeselectAll) {
                    this.onDeleteKeyDown(e);
                }
                break;
            default:
                if (!allowTyping) {
                    this.buildSearchStringFromKeyboardEvent(e);
                }
        }
    }

    private announceAriaValue(value: string): void {
        this.ariaAnnounce?.announceValue(value, 'richSelect');
    }

    public override destroy(): void {
        if (this.listComponent) {
            this.listComponent = this.destroyBean(this.listComponent);
        }

        this.searchStrings = undefined;

        super.destroy();
    }
}

/**
 * cell renderers are used in a few places. they bind to dom slightly differently to other cell renders as they
 * can return back strings (instead of html element) in the getGui() method. common code placed here to handle that.
 * @param {AgPromise<ICellRendererComp>} cellRendererPromise
 * @param {HTMLElement} eTarget
 */
export function _bindCellRendererToHtmlElement(
    cellRendererPromise: AgPromise<ICellRendererComp>,
    eTarget: HTMLElement
) {
    cellRendererPromise.then((cellRenderer) => {
        const gui = cellRenderer!.getGui();

        if (gui != null) {
            eTarget.appendChild(gui);
        }
    });
}
