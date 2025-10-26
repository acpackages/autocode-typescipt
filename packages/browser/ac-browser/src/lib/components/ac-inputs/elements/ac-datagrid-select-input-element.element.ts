/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcInputBase } from "../core/ac-input-base";
import { AC_INPUT_TAG } from "../consts/ac-input-tags.const";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcDatagrid, AcDatagridOnDemandDataSource } from "../../_components.export";
import { AcEnumDataSourceType } from "../../../enums/ac-enum-data-source-type.enum";
import { IAcOnDemandRequestArgs } from "@autocode-ts/autocode";

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

  get onDemandFunction(): any {
    if (this.onDemandDataSource) {
      return this.onDemandDataSource?.onDemandFunction;
    }
    return undefined;
  };
  set onDemandFunction(value: (args: IAcOnDemandRequestArgs) => void) {
    if (this.onDemandDataSource == undefined) {
      this.datagrid.datagridApi.dataSourceType = AcEnumDataSourceType.OnDemand;
      this.onDemandDataSource = this.datagrid.datagridApi.dataSource;
    }
    this.onDemandDataSource!.onDemandFunction = value;
    this.datagrid.datagridApi.dataSource.getData();
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
    // const match = this._selectOptions.find(option => {
    //   const optVal = typeof option === "object" ? option[this.valueKey] : option;
    //   return optVal == val;
    // });
    // if (match && !this.isDropdownOpen) {
    //   this.textInputElement.value = (typeof match === "object" ? match[this.labelKey] : match)??'';
    // }

    // if(this._selectOptions.length == 0 && super.value != undefined){
    //   this.selectOptions = [{
    //     [this.labelKey]:super.value,[this.valueKey]:super.value
    //   }];
    // }
  }

  private _filteredOptions: any[] = [];

  private dropdownContainer!: HTMLDivElement;
  private onDemandDataSource?: AcDatagridOnDemandDataSource;
  override inputElement: HTMLDivElement = document.createElement('div');
  private highlightingIndex = -1;
  private textInputElement: HTMLInputElement = document.createElement("input");
  private isDropdownOpen = false;
  private dropdownHeight = 600;
  private dropdownWidth = 1200;
  datagrid: AcDatagrid = new AcDatagrid();

  override connectedCallback() {
    if (!this.hasAttribute('value-key')) {
      this.valueKey = 'value';
    }
    this.inputElement.style.position = "relative";
    this.textInputElement.type = "text";
    this.textInputElement.autocomplete = "off";
    Object.assign(this.textInputElement.style, {
      width: "100%",
      height: "100%",
      border: "none",
      outline: "none",
      boxSizing: "border-box",
      background: 'transparent'
    });
    this.inputElement.appendChild(this.textInputElement);

    // Floating dropdown container
    this.dropdownContainer = document.createElement("div");
    Object.assign(this.dropdownContainer.style, {
      position: "fixed",
      resizable:true,
      display: "none",
      zIndex: "9999",
      maxHeight: `${this.dropdownHeight}px`,
      border: "1px solid #ccc",
      background: "#fff",
      boxSizing: "border-box",
    });
    this.attachEvents();
    this.dropdownContainer.append(this.datagrid);
    super.connectedCallback();
  }

  private attachEvents() {
    // Filter on input
    this.textInputElement.addEventListener("input", () => {
      const term = this.textInputElement.value.toLowerCase();
      // this._filteredOptions = this._selectOptions.filter(option => {
      //   const label = String(typeof option === "object" ? option[this.labelKey] : option);
      //   return label.toLowerCase().includes(term);
      // });
      this.openDropdown();
      // auto-highlight first match for quick Enter
      this.highlightingIndex = this._filteredOptions.length ? 0 : -1;
      // this.ensureHighlightInView();
    });

    this.textInputElement.addEventListener("focus", () => {
      // this._filteredOptions = [...this._selectOptions];
      this.openDropdown();
      // // default to selected value
      // const idx = this.indexOfValueInFiltered(this.value);
      // this.highlightingIndex = idx >= 0 ? idx : -1;
      // this.renderVirtualList();
      // this.scrollToIndex(this.highlightingIndex);
      // this.applyHighlightStyles();
    });

    // Delay closing to allow mousedown on options
    this.textInputElement.addEventListener("blur", () => {
      setTimeout(() => this.closeDropdown(), 150);
    });

    // Keyboard navigation
    this.textInputElement.addEventListener("keydown", (e) => {
      if (!this.isDropdownOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this._filteredOptions.length === 0) return;
        this.highlightingIndex = Math.min(
          (this.highlightingIndex < 0 ? 0 : this.highlightingIndex + 1),
          this._filteredOptions.length - 1
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this._filteredOptions.length === 0) return;
        this.highlightingIndex = Math.max(
          (this.highlightingIndex < 0 ? 0 : this.highlightingIndex - 1),
          0
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (this.highlightingIndex >= 0) {
          // this.selectOption(this._filteredOptions[this.highlightingIndex]);
        }
      } else if (e.key === "Escape") {
        this.closeDropdown();
      }
    });
    window.addEventListener("scroll", () => { if (this.isDropdownOpen) this.positionDropdown(); }, true);
    window.addEventListener("resize", () => { if (this.isDropdownOpen) this.positionDropdown(); });
  }

  override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    if (name == 'value-key') {
      this.valueKey = newValue;
    }
    else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }


  closeDropdown() {
    // this.dropdownContainer.remove();
    // this.isDropdownOpen = false;
  }

  override focus(): void {
    this.textInputElement.focus();
  }

  openDropdown() {
    if (!this.isDropdownOpen) {
      this.ownerDocument.body.appendChild(this.dropdownContainer);
      this.isDropdownOpen = true;
      this.dropdownContainer.style.display = "block";
    }
    this.positionDropdown();
  }

  private positionDropdown() {
    setTimeout(() => {
      const rect = this.inputElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = this.dropdownHeight;
      const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
      this.dropdownContainer.style.height = `${this.dropdownHeight}px`;
      this.dropdownContainer.style.width = `${this.dropdownWidth}px`;
      this.dropdownContainer.style.maxWidth = `${this.dropdownWidth}px`;
      this.dropdownContainer.style.left = rect.left + "px";
      if (showAbove) {
        this.dropdownContainer.style.top = (rect.top - dropdownHeight) + "px";
      } else {
        this.dropdownContainer.style.top = rect.bottom + "px";
      }
      this.dropdownContainer.style.overflow = "hidden";
      this.dropdownContainer.style.border = "1px solid #ccc";
      this.dropdownContainer.style.background = "#fff";
    }, 10);

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
