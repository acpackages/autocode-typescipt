import { AcElementBase } from "../../../core/_core.export";
import "../css/ac-repeater-header.css";
import { acGetParentElementWithTag, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_REPEATER_TAG } from "../consts/ac-repeater-tag.const";
import { AcRepeaterApi } from "../core/ac-repeater-api";
import { AcRepeaterElement } from "./ac-repeater.element";
import { AcEnumConditionOperator, AcEnumSortOrder, AcFilter, AcSort } from "@autocode-ts/autocode";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";


export class AcRepeaterHeaderElement extends AcElementBase {

  private repeaterApi: AcRepeaterApi;
  private resizeObserver?: ResizeObserver;

  private autoBindRepeater() {
    if (this.isConnected) {
      const repeater: AcRepeaterElement = acGetParentElementWithTag({ element: this, tag: AC_REPEATER_TAG.repeater }) as any;
      if (repeater) {
        this.repeaterApi = repeater.repeaterApi;
        this.render();
        this.setupResizeObserver();
      }
    }
    else {
      this.delayedCallback.add({
        callback: () => {
          this.autoBindRepeater();
        }, duration: 50, key: 'autoInit'
      });
    }
  }

  override init(): void {
    super.init();
    this.style.position = 'relative';
    this.autoBindRepeater();
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const headerEl = this.querySelector('.ac-repeater-header') as HTMLElement;
        if (headerEl) {
          headerEl.classList.toggle('compact', width < 500);
          headerEl.classList.toggle('narrow', width < 350);
        }
      }
    });
    this.resizeObserver.observe(this);
  }

  override destroy(): void {
    this.resizeObserver?.disconnect();
    super.destroy();
  }

  private render() {
    this.innerHTML = `
      <div class="ac-repeater-header">
        <div class="ac-repeater-search-container">
          <ac-svg-icon size="16px" style="color:#888">${ACI_SVG_SOLID.magnifyingGlass}</ac-svg-icon>
          <input type="text" class="ac-repeater-search-input" placeholder="Search..." id="repeater-search-input">
          <button id="clear-search-btn" class="ac-repeater-clear-search-btn" style="display:none">&times;</button>
        </div>
        <button class="ac-repeater-header-button" id="filter-btn">
          <ac-svg-icon size="18px">${ACI_SVG_SOLID.filter}</ac-svg-icon>
          <span class="ac-repeater-badge" id="filter-count" style="display:none">0</span>
        </button>
        <button class="ac-repeater-header-button" id="sort-btn">
          <ac-svg-icon size="18px">${ACI_SVG_SOLID.sort}</ac-svg-icon>
          <span class="ac-repeater-badge" id="sort-count" style="display:none">0</span>
        </button>

        <div class="ac-repeater-header-popup" id="filters-popup">
          <div class="ac-repeater-popup-header">
            <span>Advanced Filters</span>
            <button class="ac-repeater-popup-close" id="close-filters-btn">&times;</button>
          </div>
          <div id="filter-rows-container" style="max-height: 300px; overflow-y: auto;"></div>
          <div class="ac-repeater-filter-actions">
            <button id="add-filter-btn" class="ac-repeater-header-button">Add</button>
            <button id="clear-filters-btn" class="ac-repeater-header-button">Clear</button>
            <button id="apply-filters-btn" class="ac-repeater-header-button" style="background:#007bff; color:#fff; border-color:#007bff;">Apply</button>
          </div>
        </div>

        <div class="ac-repeater-header-popup" id="sort-popup">
          <div class="ac-repeater-popup-header">
            <span>Sort Order</span>
            <button class="ac-repeater-popup-close" id="close-sort-btn">&times;</button>
          </div>
          <div id="sort-rows-container" style="max-height: 300px; overflow-y: auto;"></div>
          <div class="ac-repeater-filter-actions">
            <button id="add-sort-btn" class="ac-repeater-header-button">Add</button>
            <button id="clear-sorts-btn" class="ac-repeater-header-button">Clear</button>
            <button id="apply-sort-btn" class="ac-repeater-header-button" style="background:#007bff; color:#fff; border-color:#007bff;">Apply</button>
          </div>
        </div>
      </div>
    `;

    this.registerHeaderListeners();
  }

  private registerHeaderListeners() {
    const searchInput = this.querySelector('#repeater-search-input') as HTMLInputElement;
    const clearSearchBtn = this.querySelector('#clear-search-btn') as HTMLElement;
    searchInput.addEventListener('input', () => {
      this.repeaterApi.dataManager.searchQuery = searchInput.value;
      this.repeaterApi.dataManager.refreshRows();
      clearSearchBtn.style.display = searchInput.value ? 'block' : 'none';
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      this.repeaterApi.dataManager.searchQuery = '';
      this.repeaterApi.dataManager.refreshRows();
      clearSearchBtn.style.display = 'none';
      searchInput.focus();
    });

    const filterBtn = this.querySelector('#filter-btn') as HTMLElement;
    const sortBtn = this.querySelector('#sort-btn') as HTMLElement;
    const filtersPopup = this.querySelector('#filters-popup') as HTMLElement;
    const sortPopup = this.querySelector('#sort-popup') as HTMLElement;

    filterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sortPopup.classList.remove('open');
      filtersPopup.classList.toggle('open');
      if (filtersPopup.classList.contains('open')) this.refreshFilterRows();
    });

    sortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      filtersPopup.classList.remove('open');
      sortPopup.classList.toggle('open');
      if (sortPopup.classList.contains('open')) this.refreshSortRows();
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target as Node)) {
        filtersPopup.classList.remove('open');
        sortPopup.classList.remove('open');
      }
    });

    this.querySelector('#close-filters-btn')?.addEventListener('click', () => {
      filtersPopup.classList.remove('open');
    });

    this.querySelector('#close-sort-btn')?.addEventListener('click', () => {
      sortPopup.classList.remove('open');
    });

    this.querySelector('#add-filter-btn')?.addEventListener('click', () => this.addFilterRow());
    this.querySelector('#clear-filters-btn')?.addEventListener('click', () => {
      this.repeaterApi.dataManager.filterGroup.clear();
      this.updateBadges();
      this.repeaterApi.dataManager.refreshRows();
      this.refreshFilterRows();
    });
    this.querySelector('#apply-filters-btn')?.addEventListener('click', () => {
      this.applyFilters();
      filtersPopup.classList.remove('open');
    });

    this.querySelector('#add-sort-btn')?.addEventListener('click', () => this.addSortRow());
    this.querySelector('#clear-sorts-btn')?.addEventListener('click', () => {
      this.repeaterApi.dataManager.sortOrder.sortOrders = [];
      this.updateBadges();
      this.repeaterApi.dataManager.refreshRows();
      this.refreshSortRows();
    });
    this.querySelector('#apply-sort-btn')?.addEventListener('click', () => {
      this.applySort();
      sortPopup.classList.remove('open');
    });
  }

  private refreshFilterRows() {
    const container = this.querySelector('#filter-rows-container') as HTMLElement;
    container.innerHTML = '';
    const filters = this.repeaterApi.dataManager.filterGroup.filters;
    if (filters.length === 0) {
      this.addFilterRow();
    } else {
      filters.forEach(filter => this.addFilterRow(filter));
    }
  }

  private addFilterRow(filter?: AcFilter) {
    const container = this.querySelector('#filter-rows-container') as HTMLElement;
    const row = document.createElement('div');
    row.className = 'ac-repeater-filter-row';
    row.style.marginBottom = '8px';

    const filterableFields = this.repeaterApi.fields.filter(f => f.allowFilter !== false);
    const fieldsOptions = `<option value="">Select Field...</option>` + filterableFields.map(f => `<option value="${f.key}" ${filter?.key === f.key ? 'selected' : ''}>${f.label}</option>`).join('');

    const opLabels: Record<string, string> = {
      [AcEnumConditionOperator.EqualTo]: "Equal To",
      [AcEnumConditionOperator.NotEqualTo]: "Not Equal To",
      [AcEnumConditionOperator.GreaterThan]: "Greater Than",
      [AcEnumConditionOperator.GreaterThanEqualTo]: "Greater Than or Equal To",
      [AcEnumConditionOperator.LessThan]: "Less Than",
      [AcEnumConditionOperator.LessThanEqualTo]: "Less Than or Equal To",
      [AcEnumConditionOperator.Contains]: "Contains",
      [AcEnumConditionOperator.NotContains]: "Not Contains",
      [AcEnumConditionOperator.StartsWith]: "Starts With",
      [AcEnumConditionOperator.EndsWith]: "Ends With",
      [AcEnumConditionOperator.IsNull]: "Is Null",
      [AcEnumConditionOperator.IsNotNull]: "Is Not Null",
      [AcEnumConditionOperator.IsEmpty]: "Is Empty",
      [AcEnumConditionOperator.IsNotEmpty]: "Is Not Empty",
    };

    const noValueOps = [
      AcEnumConditionOperator.IsNull,
      AcEnumConditionOperator.IsNotNull,
      AcEnumConditionOperator.IsEmpty,
      AcEnumConditionOperator.IsNotEmpty,
    ];

    const opOptions = Object.keys(opLabels).map(op => `<option value="${op}" ${filter?.operator === op ? 'selected' : ''}>${opLabels[op]}</option>`).join('');

    const showValue = !filter || !noValueOps.includes(filter.operator);

    row.innerHTML = `
      <select class="filter-key" style="flex:1">${fieldsOptions}</select>
      <select class="filter-op">${opOptions}</select>
      <input type="text" class="filter-val" style="flex:1; display: ${showValue ? 'block' : 'none'}" value="${filter?.value ?? ''}">
      <button class="remove-filter-row" style="background:none; border:none; cursor:pointer; color:red;">&times;</button>
    `;

    const opSelect = row.querySelector('.filter-op') as HTMLSelectElement;
    const valInput = row.querySelector('.filter-val') as HTMLInputElement;

    opSelect.addEventListener('change', () => {
      valInput.style.display = noValueOps.includes(opSelect.value as any) ? 'none' : 'block';
    });

    row.querySelector('.remove-filter-row')?.addEventListener('click', () => {
      row.remove();
    });

    container.appendChild(row);
  }

  private applyFilters() {
    const container = this.querySelector('#filter-rows-container') as HTMLElement;
    const rowEls = container.querySelectorAll('.ac-repeater-filter-row');
    this.repeaterApi.dataManager.filterGroup.clear();
    
    rowEls.forEach(row => {
      const key = (row.querySelector('.filter-key') as HTMLSelectElement).value;
      const op = (row.querySelector('.filter-op') as HTMLSelectElement).value as AcEnumConditionOperator;
      const val = (row.querySelector('.filter-val') as HTMLInputElement).value;
      
      if (key) {
        this.repeaterApi.dataManager.filterGroup.addFilter({ key, operator: op, value: val });
      }
    });

    this.updateBadges();
    this.repeaterApi.dataManager.refreshRows();
  }

  private updateBadges() {
    const filterCountEl = this.querySelector('#filter-count') as HTMLElement;
    const sortCountEl = this.querySelector('#sort-count') as HTMLElement;

    const filterCount = this.repeaterApi.dataManager.filterGroup.filters.length;
    filterCountEl.innerText = filterCount.toString();
    filterCountEl.style.display = filterCount > 0 ? 'block' : 'none';

    const sortCount = this.repeaterApi.dataManager.sortOrder.sortOrders.length;
    sortCountEl.innerText = sortCount.toString();
    sortCountEl.style.display = sortCount > 0 ? 'block' : 'none';
  }

  private refreshSortRows() {
    const container = this.querySelector('#sort-rows-container') as HTMLElement;
    container.innerHTML = '';
    const sorts = this.repeaterApi.dataManager.sortOrder.sortOrders;
    if (sorts.length === 0) {
      this.addSortRow();
    } else {
      sorts.forEach(sort => this.addSortRow(sort));
    }
  }

  private addSortRow(sort?: AcSort) {
    const container = this.querySelector('#sort-rows-container') as HTMLElement;
    const row = document.createElement('div');
    row.className = 'ac-repeater-filter-row';
    row.style.marginBottom = '8px';

    const sortableFields = this.repeaterApi.fields.filter(f => f.allowSort !== false);
    const fieldsOptions = `<option value="">Select Field...</option>` + sortableFields.map(f => `<option value="${f.key}" ${sort?.key === f.key ? 'selected' : ''}>${f.label}</option>`).join('');

    row.innerHTML = `
      <select class="sort-key" style="flex:1">${fieldsOptions}</select>
      <select class="sort-order">
        <option value="${AcEnumSortOrder.Ascending}" ${sort?.order === AcEnumSortOrder.Ascending ? 'selected' : ''}>Asc</option>
        <option value="${AcEnumSortOrder.Descending}" ${sort?.order === AcEnumSortOrder.Descending ? 'selected' : ''}>Desc</option>
      </select>
      <button class="remove-sort-row" style="background:none; border:none; cursor:pointer; color:red;">&times;</button>
    `;

    row.querySelector('.remove-sort-row')?.addEventListener('click', () => {
      row.remove();
    });

    container.appendChild(row);
  }

  private applySort() {
    const container = this.querySelector('#sort-rows-container') as HTMLElement;
    const rowEls = container.querySelectorAll('.ac-repeater-filter-row');
    this.repeaterApi.dataManager.sortOrder.sortOrders = [];

    rowEls.forEach(row => {
      const key = (row.querySelector('.sort-key') as HTMLSelectElement).value;
      const order = (row.querySelector('.sort-order') as HTMLSelectElement).value as AcEnumSortOrder;

      if (key) {
        this.repeaterApi.dataManager.sortOrder.addSort({ key, order });
      }
    });

    this.updateBadges();
    this.repeaterApi.dataManager.refreshRows();
  }
}
acRegisterCustomElement({ tag: AC_REPEATER_TAG.repeaterHeader, type: AcRepeaterHeaderElement });
