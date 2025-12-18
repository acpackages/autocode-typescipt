/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcInputBase } from "../core/ac-input-base";
import { AC_INPUT_TAG } from "../consts/ac-input-tags.const";
import { acCloneEvent, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_DATAGRID_EVENT, AcDatagrid, IAcDatagridCell } from "../../_components.export";
import { AcEnumConditionOperator, IAcOnDemandRequestArgs } from "@autocode-ts/autocode";
import { createPopper, Instance as PopperInstance, Placement } from '@popperjs/core';

export class AcDatagridSelectInput extends AcInputBase {
  static override get observedAttributes() {
    return [... super.observedAttributes, 'value-key'];
  }

  get columnDefinitions(): any {
    return this.datagrid.datagridApi.columnDefinitions;
  }
  set columnDefinitions(value: any) {
    this.datagrid.datagridApi.columnDefinitions = value;
  }

  get data(): any[] {
    return this.datagrid.datagridApi.data;
  }
  set data(value: any[]) {
    this.datagrid.datagridApi.data = value;
  }

  get labelKey(): string {
    return this.getAttribute('label-key')!;
  }
  set labelKey(value: string) {
    this.setAttribute('label-key', value);
    if (this._value) {
      this.value = this._value;
    }
  }

  get onDemandFunction(): any {
    if (this.data) {
      return this.datagrid.datagridApi.dataManager.onDemandFunction;
    }
    return undefined;
  };
  set onDemandFunction(value: (args: IAcOnDemandRequestArgs) => void) {
    this.datagrid.datagridApi.dataManager.onDemandFunction = value;
    this.datagrid.datagridApi.dataManager.getData();
  }

  get valueKey(): string {
    return this.getAttribute('value-key')!;
  }
  set valueKey(value: string) {
    this.setAttribute('value-key', value);
    if (this._value) {
      this.value = this._value;
    }
  }

  override get placeholder(): string | null {
    return this.textInputElement.getAttribute('placeholder');
  }
  override set placeholder(value: string) {
    if (value != '') {
      this.textInputElement.setAttribute('placeholder', value);
    }
    else {
      this.textInputElement.removeAttribute(value);
    }
  }

  override get value() { return super.value; }
  override set value(val: any) {
    super.value = val;
    this.setSelectedRowsFromValue();
  }

  private _searchQuery: string = '';
  get searchQuery(): string { return this._searchQuery; }
  set searchQuery(val: string) {
    this._searchQuery = val;
    if (this.datagrid) {
      this.datagrid.datagridApi.dataManager.searchQuery = val;
      const event:CustomEvent = new CustomEvent('searchQueryChange',{detail:{searchQuery:this.searchQuery}});
      this.dispatchEvent(event);
      setTimeout(() => {
        this.highlightRow();
      }, 100);
    }
  }

  private dropdownContainer!: HTMLDivElement;
  private isDropdownOpen = false;
  // private dropdownHeight = 400;
  // private dropdownWidth = 700;
  private popper!: PopperInstance | null;
  textInputElement: HTMLInputElement = this.ownerDocument.createElement('input');
  datagrid: AcDatagrid = new AcDatagrid();
  private clickOutsideListener?: any = (event: Event) => {
    const target = event.target as HTMLElement;

    if (
      !this.textInputElement.contains(target) &&
      !this.dropdownContainer.contains(target)
    ) {
      this.closeDropdown();
    }
  };
  private visibilityObserver?: IntersectionObserver | null;
  private resizeObserver?: ResizeObserver | null;
  selectedRows:any[] = [];
  dropdownSize: { height: number, width: number } = { height: 300, width: 600};

  override init() {
    super.init();
    if (!this.hasAttribute('label-key')) {
      this.labelKey = 'label';
    }
    if (!this.hasAttribute('value-key')) {
      this.valueKey = 'value';
    }
    this.innerHTML = '';
    this.append(this.textInputElement);
    this.textInputElement.type = "text";
    this.textInputElement.autocomplete = "off";
    this.attachEvents();

  }

  private attachEvents() {
    this.textInputElement.addEventListener("input", (event) => {
      this.dispatchEvent(acCloneEvent(event));
      const term = this.textInputElement.value.toLowerCase();
      if (term != this.searchQuery) {
        this.searchQuery = term;
      }
      this.openDropdown();
    });
    this.textInputElement.addEventListener("focus", (event:any) => {
      this.dispatchEvent(acCloneEvent(event));
      this.openDropdown();
    });
    this.textInputElement.addEventListener("click", (event) => {
      this.dispatchEvent(acCloneEvent(event));
      setTimeout(() => this.openDropdown(), 150);
    });
    this.textInputElement.addEventListener("keydown", (e: any) => {
      this.dispatchEvent(acCloneEvent(e));
      if (!this.isDropdownOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        let rowIndex: number = 0;
        const activeDatagridCell = this.datagrid.datagridApi.activeDatagridCell;
        if (activeDatagridCell) {
          rowIndex = activeDatagridCell.datagridRow.index + 1;
        }
        this.highlightRow({ rowIndex });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        let rowIndex: number = 0;
        const activeDatagridCell = this.datagrid.datagridApi.activeDatagridCell;
        if (activeDatagridCell) {
          rowIndex = activeDatagridCell.datagridRow.index - 1;
        }
        this.highlightRow({ rowIndex });
      }
      else if (e.key === "Enter") {
        e.preventDefault();
        this.setValueFromDatagridData();
        this.closeDropdown();
      } else if (e.key === "Escape") {
        this.closeDropdown();
      }
    });
    this.datagrid.datagridApi.on({event:AC_DATAGRID_EVENT.CellClick,callback:(args:any)=>{
      const datagridCell:IAcDatagridCell = args['datagridCell'];
      if(datagridCell){
        this.setSelectedRows({rows:[datagridCell.datagridRow.data]});
        this.closeDropdown();
      }
    }});
    this.datagrid.datagridApi.on({event:AC_DATAGRID_EVENT.StateChange,callback:(args:any)=>{
      if(this.isDropdownOpen){
        this.notifyState();
      }
    }});
  }

  override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    if (name == 'value-key') {
      this.valueKey = newValue;
    }
    if (name == 'class') {
      this.textInputElement.setAttribute('class', newValue);
    }
    else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }

  closeDropdown() {
    this.dropdownContainer.remove();
    this.isDropdownOpen = false;
    this.popper?.destroy();
    this.popper = null;
    if (this.resizeObserver) {
      this.resizeObserver?.disconnect();
      this.resizeObserver = null;
    }
    if (this.visibilityObserver) {
      this.visibilityObserver?.disconnect();
      this.visibilityObserver = null;
    }
    this.ownerDocument.body.removeEventListener('click', this.clickOutsideListener);
    const event:CustomEvent = new CustomEvent('dropdownClose',{});
      this.dispatchEvent(event);
  }

  override focus(): void {
    this.textInputElement.focus();
  }

  getState(){
    const state =  {
      datagridState:this.datagrid.datagridApi.getState(),
      dropdownSize:this.dropdownSize
    };
    return state;
  }

  highlightRow({ rowIndex = 0, focusInput = true }: { rowIndex?: number, focusInput?: boolean } = {}) {
    this.datagrid.datagridApi.setActiveCell({ rowIndex: rowIndex, key: this.labelKey });
    if (focusInput) {
      this.textInputElement.focus();
    }
  }

  private notifyState(){
    const event:CustomEvent = new CustomEvent('stateChange',{detail:{state:this.getState()}});
    this.dispatchEvent(event);
  }

  openDropdown() {
    if (this.isDropdownOpen) return;
    this.isDropdownOpen = true;
    this.dropdownContainer = this.ownerDocument.createElement("div");
    this.dropdownContainer.classList.add('ac-datagrid-select-dropdown');
    this.dropdownContainer.innerHTML = `
      <div class="dropdown-header" style=""></div>
      <div class="dropdown-body" style="flex-grow:1;overflow:auto"></div>
      <div class="dropdown-footer" style=""></div>
    `;
    const createEvent:CustomEvent = new CustomEvent('dropdownCreate',{detail:{dropdownContainer:this.dropdownContainer}});
    this.dispatchEvent(createEvent);
    (this.dropdownContainer.querySelector('.dropdown-body') as HTMLElement).append(this.datagrid);
    this.ownerDocument.body.append(this.dropdownContainer);
    Object.assign(this.dropdownContainer.style, {
      height: `${this.dropdownSize.height}px`,
      width: `${this.dropdownSize.width}px`,
      border: "1px solid #ccc",
      background: "#fff",
      boxSizing: "border-box",
      resize: 'both',
      display: 'flex',
      flexDirection: 'column',
      overflow:'hidden',
      zIndex:9999999999
    });
    this.popper = createPopper(this.textInputElement, this.dropdownContainer, {
      placement: 'bottom-start' as Placement,
      strategy: 'fixed',
      modifiers: [
        { name: 'offset', options: { offset: [0, 8] } },
        { name: 'flip', options: { fallbackPlacements: ['top-start', 'bottom-start'] } },
        { name: 'preventOverflow', options: { boundary: 'clippingParents' } },
      ],
    });

    setTimeout(() => this.popper?.update(), 0);

    this.resizeObserver = new ResizeObserver(entries => {
      const rect = (entries[0].target as HTMLElement).getBoundingClientRect();
      setTimeout(() => {
        this.dropdownSize.width = rect.width;
        this.dropdownSize.height = rect.height;
        const resizeEvent:CustomEvent = new CustomEvent('dropdownResize',{detail:{dropdownSize:this.dropdownSize}});
        this.dispatchEvent(resizeEvent);
        this.popper?.update();
      }, 500);
    });

    this.resizeObserver.observe(this.dropdownContainer);
    setTimeout(() => {
      this.ownerDocument.addEventListener('click', this.clickOutsideListener);
    }, 350);

    this.visibilityObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && this.isDropdownOpen) this.closeDropdown();
    });
    this.visibilityObserver.observe(this.textInputElement);
    this.popper?.update();
    this.datagrid.datagridApi.dataManager.getData();
    const event:CustomEvent = new CustomEvent('dropdownOpen',{});
    this.dispatchEvent(event);
  }

  private setSelectedRows({rows}:{rows:any[]}){
    this.selectedRows = rows;
    if(rows.length > 0){
      this.textInputElement.value = rows[0][this.labelKey];
      this.value = rows[0][this.valueKey];
    }
    else{
      if(this.value){
        this.textInputElement.value = this.value;
      }
      else{
        this.textInputElement.value = '';
      }
    }
  }

  private async setSelectedRowsFromValue(){
    if(this.value){
      let continueOperation = true;
      if(this.selectedRows.length > 0){
        if(this.selectedRows[0][this.valueKey] == this.value){
          continueOperation = false;
        }
      }
      if(continueOperation && this.datagrid){
        const valueRow = this.datagrid.datagridApi.dataManager.allRows.find((row)=>{
          return row.data[this.valueKey] == this.value;
        });
        if(valueRow){
          this.setSelectedRows({rows:[valueRow.data]});
          continueOperation = false;
        }
        else{
          this.datagrid.datagridApi.dataManager.filterGroup.addFilter({
            key:this.valueKey,
            operator:AcEnumConditionOperator.EqualTo,
            value:this.value
          });
          const values = await this.datagrid.datagridApi.dataManager.getData();
          if(values.length > 0){
            this.setSelectedRows({rows:[values[0]]});
            continueOperation = false;
          }
        }
      }
      if(continueOperation){
        this.setSelectedRows({rows:[]});
      }
      else{
        this.datagrid.datagridApi.setActiveCell({ key: this.valueKey, value: this.value });
      }
    }
  }

  setState({state}:{state:any}){
    if(state.dropdownSize){
      this.dropdownSize = state.dropdownSize;
    }
    if(state.datagridState){
      this.datagrid.datagridApi.setState({state:state.datagridState});
    }
  }

  setValueFromDatagridData() {
    const activeDatagridCell = this.datagrid.datagridApi.activeDatagridCell;
    if (activeDatagridCell) {
      this.setSelectedRows({rows:[activeDatagridCell.datagridRow.data]});
      this.value = activeDatagridCell.datagridRow.data[this.valueKey];
    }
    else {
      this.setSelectedRows({rows:[]});
      this.value = null;
    }
  }

  toggleDropdown() {
    if (this.isDropdownOpen) {
      this.closeDropdown();
    }
    else {
      this.openDropdown();
    }
  }
}

acRegisterCustomElement({ tag: AC_INPUT_TAG.datagridSelectInput, type: AcDatagridSelectInput });
