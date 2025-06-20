import type {
    BeanCollection,
    ElementParams,
    FilterManager,
    ITooltipCtrl,
    Registry,
    TooltipFeature,
} from 'ag-grid-community';
import { Component, RefPlaceholder, _createIconNoSpan, _makeNull, _setDisabled } from 'ag-grid-community';

import type { AdvancedFilterExpressionService } from './advancedFilterExpressionService';
import type { AdvancedFilterService } from './advancedFilterService';
import type {
    AgAutocomplete,
    AutocompleteOptionSelectedEvent,
    AutocompleteValidChangedEvent,
    AutocompleteValueChangedEvent,
    AutocompleteValueConfirmedEvent,
} from './autocomplete/agAutocomplete';
import { AgAutocompleteSelector } from './autocomplete/agAutocomplete';
import type { AutocompleteEntry, AutocompleteListParams } from './autocomplete/autocompleteParams';
import type { FilterExpressionParser } from './filterExpressionParser';
import type { AutocompleteUpdate } from './filterExpressionUtils';

const AdvancedFilterElement: ElementParams = {
    tag: 'div',
    cls: 'ag-advanced-filter',
    role: 'presentation',
    attrs: { tabindex: '-1' },
    children: [
        { tag: 'ag-autocomplete', ref: 'eAutocomplete' },
        {
            tag: 'button',
            ref: 'eApplyFilterButton',
            cls: 'ag-button ag-standard-button ag-advanced-filter-apply-button',
        },
        {
            tag: 'button',
            ref: 'eBuilderFilterButton',
            cls: 'ag-button ag-advanced-filter-builder-button',
            children: [
                { tag: 'span', ref: 'eBuilderFilterButtonIcon', attrs: { 'aria-hidden': 'true' } },
                { tag: 'span', ref: 'eBuilderFilterButtonLabel', cls: 'ag-advanced-filter-builder-button-label' },
            ],
        },
    ],
};
export class AcDGAdvancedFilterComp extends Component {
    private advancedFilter: AdvancedFilterService;
    private advFilterExpSvc: AdvancedFilterExpressionService;
    private filterManager?: FilterManager;
    private registry: Registry;

    public wireBeans(beans: BeanCollection): void {
        this.advFilterExpSvc = beans.advFilterExpSvc as AdvancedFilterExpressionService;
        this.advancedFilter = beans.advancedFilter as AdvancedFilterService;
        this.filterManager = beans.filterManager;
        this.registry = beans.registry;
    }

    private readonly eAutocomplete: AgAutocomplete = RefPlaceholder;
    private readonly eApplyFilterButton: HTMLElement = RefPlaceholder;
    private readonly eBuilderFilterButton: HTMLElement = RefPlaceholder;
    private readonly eBuilderFilterButtonIcon: HTMLElement = RefPlaceholder;
    private readonly eBuilderFilterButtonLabel: HTMLElement = RefPlaceholder;

    private expressionParser: FilterExpressionParser | null = null;
    private isApplyDisabled = true;
    private builderOpen = false;
    private tooltipFeature?: TooltipFeature;

    constructor() {
        super(AdvancedFilterElement, [AgAutocompleteSelector]);
    }

    public postConstruct(): void {
        this.tooltipFeature = this.createOptionalManagedBean(
            this.registry.createDynamicBean<TooltipFeature>('tooltipFeature', false, {
                getGui: () => this.getGui(),
                getTooltipShowDelayOverride: () => 1000,
                getLocation: () => 'advancedFilter',
            } as ITooltipCtrl)
        );
        this.eAutocomplete
            .setListGenerator((_value, position) => this.generateAutocompleteListParams(position))
            .setValidator(() => this.validateValue())
            .setForceLastSelection((lastSelection, searchString) =>
                this.forceLastSelection(lastSelection, searchString)
            )
            .setInputAriaLabel(this.advFilterExpSvc.translate('ariaAdvancedFilterInput'))
            .setListAriaLabel(this.advFilterExpSvc.translate('ariaLabelAdvancedFilterAutocomplete'));

        this.refresh();

        this.addManagedListeners(this.eAutocomplete, {
            eventValueChanged: ({ value }: AutocompleteValueChangedEvent) => this.onValueChanged(value),
            eventValueConfirmed: ({ isValid }: AutocompleteValueConfirmedEvent) => this.onValueConfirmed(isValid),
            eventOptionSelected: ({ position, updateEntry, autocompleteType }: AutocompleteOptionSelectedEvent) =>
                this.onOptionSelected(position, updateEntry, autocompleteType),
            eventValidChanged: ({ isValid, validationMessage }: AutocompleteValidChangedEvent) =>
                this.onValidChanged(isValid, validationMessage),
        });

        this.setupApplyButton();
        this.setupBuilderButton();
    }

    public refresh(): void {
        const expression = this.advancedFilter.getExpressionDisplayValue();
        this.eAutocomplete.setValue({
            value: expression ?? '',
            position: expression?.length,
            updateListOnlyIfOpen: true,
        });
    }

    public setInputDisabled(disabled: boolean): void {
        this.eAutocomplete.setInputDisabled(disabled);
        _setDisabled(this.eApplyFilterButton, disabled || this.isApplyDisabled);
    }

    private setupApplyButton(): void {
        this.eApplyFilterButton.textContent = this.advFilterExpSvc.translate('advancedFilterApply');
        this.activateTabIndex([this.eApplyFilterButton]);
        this.addManagedElementListeners(this.eApplyFilterButton, {
            click: () => this.onValueConfirmed(this.eAutocomplete.isValid()),
        });
        _setDisabled(this.eApplyFilterButton, this.isApplyDisabled);
    }

    private setupBuilderButton(): void {
        this.eBuilderFilterButtonIcon.appendChild(_createIconNoSpan('advancedFilterBuilder', this.beans)!);
        this.eBuilderFilterButtonLabel.textContent = this.advFilterExpSvc.translate('advancedFilterBuilder');
        this.activateTabIndex([this.eBuilderFilterButton]);
        this.addManagedElementListeners(this.eBuilderFilterButton, { click: () => this.openBuilder() });
        this.addManagedListeners(this.advancedFilter.getCtrl(), {
            advancedFilterBuilderClosed: () => this.closeBuilder(),
        });
    }

    private onValueChanged(value: string | null): void {
        value = _makeNull(value);
        this.advancedFilter.setExpressionDisplayValue(value);
        this.expressionParser = this.advancedFilter.createExpressionParser(value);
        const updatedExpression = this.expressionParser?.parseExpression();
        if (updatedExpression && updatedExpression !== value) {
            this.eAutocomplete.setValue({ value: updatedExpression, silent: true, restoreFocus: true });
        }
    }

    private onValueConfirmed(isValid: boolean): void {
        if (!isValid || this.isApplyDisabled) {
            return;
        }
        _setDisabled(this.eApplyFilterButton, true);
        this.advancedFilter.applyExpression();
        this.filterManager?.onFilterChanged({ source: 'advancedFilter' });
    }

    private onOptionSelected(position: number, updateEntry: AutocompleteEntry, type?: string): void {
        const { updatedValue, updatedPosition, hideAutocomplete } = this.updateExpression(position, updateEntry, type);
        this.eAutocomplete.setValue({
            value: updatedValue,
            position: updatedPosition,
            updateListOnlyIfOpen: hideAutocomplete,
            restoreFocus: true,
        });
    }

    private validateValue(): string | null {
        return this.expressionParser?.isValid() ? null : this.expressionParser?.getValidationMessage() ?? null;
    }

    private onValidChanged(isValid: boolean, validationMessage: string | null): void {
        this.isApplyDisabled = !isValid || this.advancedFilter.isCurrentExpressionApplied();
        _setDisabled(this.eApplyFilterButton, this.isApplyDisabled);
        this.tooltipFeature?.setTooltipAndRefresh(validationMessage);
    }

    private generateAutocompleteListParams(position: number): AutocompleteListParams {
        return this.expressionParser
            ? this.expressionParser.getAutocompleteListParams(position)
            : this.advFilterExpSvc.getDefaultAutocompleteListParams('');
    }

    private updateExpression(position: number, updateEntry: AutocompleteEntry, type?: string): AutocompleteUpdate {
        this.advFilterExpSvc.updateAutocompleteCache(updateEntry, type);
        return (
            this.expressionParser?.updateExpression(position, updateEntry, type) ??
            this.advancedFilter.getDefaultExpression(updateEntry)
        );
    }

    private forceLastSelection({ key, displayValue }: AutocompleteEntry, searchString: string): boolean {
        return !!searchString.toLocaleLowerCase().match(`^${(displayValue ?? key).toLocaleLowerCase()}\\s*$`);
    }

    private openBuilder(): void {
        if (this.builderOpen) {
            return;
        }
        this.builderOpen = true;
        _setDisabled(this.eBuilderFilterButton, true);
        this.advancedFilter.getCtrl().toggleFilterBuilder({ source: 'ui', eventSource: this.eBuilderFilterButton });
    }

    private closeBuilder(): void {
        if (!this.builderOpen) {
            return;
        }
        this.builderOpen = false;
        _setDisabled(this.eBuilderFilterButton, false);
        this.eBuilderFilterButton.focus();
    }
}
