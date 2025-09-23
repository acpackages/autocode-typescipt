/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { stringIsJson } from "@autocode-ts/ac-extensions";
import { AcScrollable } from "../../ac-scrollable/_ac-scrollable.export";
import { AcInputBase } from "../core/ac-input-base";
import { AC_INPUT_TAG } from "../consts/ac-input-tags.const";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";

export class AcSelectInputElement extends AcInputBase {
  static override get observedAttributes() {
    return [... super.observedAttributes, 'label-key', 'value-key', 'select-options'];
  }

  get labelKey(): string {
    return this.getAttribute('label-key')!;
  }
  set labelKey(value: string) {
    this.setAttribute('label-key', value);
  }

  get valueKey(): string {
    return this.getAttribute('value-key')!;
  }
  set valueKey(value: string) {
    this.setAttribute('value-key', value);
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

  private _selectOptions: any[] = [];
  get selectOptions(): any[] { return this._selectOptions; }
  set selectOptions(value: any[]) {
    let valueOptions:any[] = [];
    if(value.length>0){
      if(typeof value[0] != "object"){
        for(const val of value){
          valueOptions.push({[this.labelKey]:val,[this.valueKey]:val});
        }
      }
      else{
        valueOptions = [...value];
      }
    }
    this._selectOptions = valueOptions;
    this._filteredOptions = [...valueOptions];
    if (this.isDropdownOpen){
      this.renderVirtualList()
    };
    this.value = this._value;
  }

  override get value() { return super.value; }
  override set value(val: any) {
    super.value = val;
    const match = this._selectOptions.find(option => {
      const optVal = typeof option === "object" ? option[this.valueKey] : option;
      return optVal == val;
    });
    if (match && !this.isDropdownOpen) {
      this.textInputElement.value = typeof match === "object" ? match[this.labelKey] : match;
    }

  }

  private _filteredOptions: any[] = [];

  private dropdownContainer!: HTMLDivElement;
  override inputElement: HTMLDivElement = document.createElement('div');
  private highlightingIndex = -1;
  private textInputElement: HTMLInputElement = document.createElement("input");
  private isDropdownOpen = false;
  private listEl!: HTMLDivElement;
  private maxDropdownHeight = 300;
  private optionHeight = 32;
  private scrollable!: AcScrollable;

  constructor() {
    super();
    this.labelKey = 'label';
    this.valueKey = 'value';
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
      display: "none",
      zIndex: "9999",
      minWidth: "max-content",
      maxHeight: `${this.maxDropdownHeight}px`,
      border: "1px solid #ccc",
      background: "#fff",
      boxSizing: "border-box",
    });

    // Inner list inputElement (virtualized)
    this.listEl = document.createElement("div");
    // AcScrollable will set overflow + handle virtualization
    this.dropdownContainer.appendChild(this.listEl);
    this.scrollable = new AcScrollable({
      element: this.listEl,
      options: { bufferCount: 3, elementHeight: this.optionHeight }
    });
    this.attachEvents();
  }

  private applyHighlightStyles() {
    const all = this.dropdownContainer.querySelectorAll<HTMLElement>('[data-option-index]');
    all.forEach(n => n.style.background = "");
    if (this.highlightingIndex >= 0) {
      const el = this.dropdownContainer.querySelector<HTMLElement>(`[data-option-index="${this.highlightingIndex}"]`);
      if (el) el.style.background = "#ddd";
    }
  }

  private attachEvents() {
    // Filter on input
    this.textInputElement.addEventListener("input", () => {
      const term = this.textInputElement.value.toLowerCase();
      this._filteredOptions = this._selectOptions.filter(option => {
        const label = String(typeof option === "object" ? option[this.labelKey] : option);
        return label.toLowerCase().includes(term);
      });
      this.openDropdown();
      // auto-highlight first match for quick Enter
      this.highlightingIndex = this._filteredOptions.length ? 0 : -1;
      this.renderVirtualList();
      this.ensureHighlightInView();
    });

    this.textInputElement.addEventListener("focus", () => {
      this._filteredOptions = [...this._selectOptions];
      this.openDropdown();
      // default to selected value
      const idx = this.indexOfValueInFiltered(this.value);
      this.highlightingIndex = idx >= 0 ? idx : -1;
      this.renderVirtualList();
      this.scrollToIndex(this.highlightingIndex);
      this.applyHighlightStyles();
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
        this.applyHighlightStyles();
        this.ensureHighlightInView();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this._filteredOptions.length === 0) return;
        this.highlightingIndex = Math.max(
          (this.highlightingIndex < 0 ? 0 : this.highlightingIndex - 1),
          0
        );
        this.applyHighlightStyles();
        this.ensureHighlightInView();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (this.highlightingIndex >= 0) {
          this.selectOption(this._filteredOptions[this.highlightingIndex]);
        }
      } else if (e.key === "Escape") {
        this.closeDropdown();
      }
    });

    // Reposition on page scroll/resize
    window.addEventListener("scroll", () => { if (this.isDropdownOpen) this.positionDropdown(); }, true);
    window.addEventListener("resize", () => { if (this.isDropdownOpen) this.positionDropdown(); });
  }

  override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    if (name == 'label-key') {
      this.labelKey = newValue;
    }
    else if (name == 'value-key') {
      this.valueKey = newValue;
    }
    else if (name == 'select-options') {
      if (stringIsJson(newValue)) {
        this.selectOptions = newValue;
      }
      else {
        this.selectOptions = newValue.split(",");
      }
    }
    else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }

  private buildOptionElement(option: any, index: number): HTMLElement {
    const el = document.createElement("div");
    el.dataset["optionIndex"] = String(index);
    el.style.padding = "4px 8px";
    el.style.cursor = "pointer";
    el.style.boxSizing = "border-box";
    const label = typeof option === "object" ? option[this.labelKey] : option;
    el.textContent = String(label);
    el.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.selectOption(option);
    });
    el.addEventListener("mouseenter", () => {
      this.highlightingIndex = index;
      this.applyHighlightStyles();
    });
    return el;
  }

  closeDropdown() {
    this.dropdownContainer.remove();
    this.isDropdownOpen = false;
  }

  private ensureHighlightInView() {
    if (this.highlightingIndex < 0) return;
    this.scrollToIndex(this.highlightingIndex);
    setTimeout(() => this.applyHighlightStyles(), 0);
  }

  override focus(): void {
    this.textInputElement.focus();
  }

  private indexOfValueInFiltered(val: any): number {
    if (val == null) return -1;
    return this._filteredOptions.findIndex(o => {
      const v = (typeof o === "object") ? o[this.valueKey] : o;
      return v == val;
    });
  }

  openDropdown() {
    if (!this.isDropdownOpen) {
      document.body.appendChild(this.dropdownContainer);
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
      const dropdownHeight = this.dropdownContainer.getBoundingClientRect().height;
      const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
      this.dropdownContainer.style.width = rect.width + "px";
      this.dropdownContainer.style.left = rect.left + "px";
      if (showAbove) {
        this.dropdownContainer.style.top = (rect.top - dropdownHeight) + "px";
      } else {
        this.dropdownContainer.style.top = rect.bottom + "px";
      }
      this.dropdownContainer.style.overflowY = "auto";
      this.dropdownContainer.style.border = "1px solid #ccc";
      this.dropdownContainer.style.background = "#fff";
    }, 10);

  }

  private renderVirtualList() {
    this.listEl.innerHTML = "";
    if(this._filteredOptions.length > 0){
      for (let i = 0; i < this._filteredOptions.length; i++) {
      const row = this.buildOptionElement(this._filteredOptions[i], i);
      if (this.name == 'sourceColumnId') {
        console.log(row);
      }
      this.listEl.appendChild(row);
    }
    }
    else{
      console.log(this._filteredOptions);
      console.log(this._selectOptions);
      console.dir(this);
      this.listEl.innerHTML = `<div style="text-align:center;">No matching records!</div>`;
    }

    this.scrollable.registerExistingElements();
    setTimeout(() => this.applyHighlightStyles(), 0);
  }

  private scrollToIndex(index: number) {
    if (index < 0 || index >= this._filteredOptions.length) return;
    this.scrollable.scrollTo({ index });
  }

  private selectOption(option: any) {
    const label = typeof option === "object" ? option[this.labelKey] : option;
    const value = typeof option === "object" ? option[this.valueKey] : option;

    this.textInputElement.value = String(label);
    this.value = value;

    this.closeDropdown();
    this.textInputElement.dispatchEvent(new Event("change"));
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

acRegisterCustomElement({tag:AC_INPUT_TAG.selectInput,type:AcSelectInputElement});
