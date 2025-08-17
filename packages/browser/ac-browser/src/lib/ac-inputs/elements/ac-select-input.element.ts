/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcScrollable } from "../../ac-scrollable/_ac-scrollable.export";
import { acAddClassToElement } from "../../utils/ac-element-functions";
import { AcInputCssClassName } from "../consts/ac-input-css-class-name.const";
import { AcInputBase } from "../core/ac-input-base";

export class AcSelectInput extends AcInputBase {
  private _labelKey: string = 'label';
  get labelKey(): string { return this._labelKey; }
  set labelKey(value: string) { this._labelKey = value; }

  private _valueKey: string = 'value';
  get valueKey(): string { return this._valueKey; }
  set valueKey(value: string) { this._valueKey = value; }

  private _selectOptions: any[] = [];
  get selectOptions(): any[] { return this._selectOptions; }
  set selectOptions(value: any[]) {
    this._selectOptions = value;
    this._filteredOptions = [...value];
    if (this.isDropdownOpen) this.renderVirtualList();
  }

  override get value() { return super.value; }
  override set value(val: any) {
    super.value = val;
    const match = this._selectOptions.find(option => {
      const optVal = typeof option === "object" ? option[this.valueKey] : option;
      return optVal == val;
    });
    if (match) {
      this.inputElement.value = typeof match === "object" ? match[this.labelKey] : match;
    }
  }

  private _filteredOptions: any[] = [];

  private dropdownContainer!: HTMLDivElement;
  override element: HTMLDivElement = document.createElement('div');
  private highlightingIndex = -1;
  private inputElement!: HTMLInputElement;
  private isDropdownOpen = false;
  private listEl!: HTMLDivElement;
  private maxDropdownHeight = 300;
  private optionHeight = 32;
  private scrollable!: AcScrollable;

  constructor() {
    super();
    acAddClassToElement({ cssClass: AcInputCssClassName.acSelectInput, element: this.element });
    this.element.style.position = "relative";

    // Input
    this.inputElement = document.createElement("input");
    this.inputElement.type = "text";
    this.inputElement.autocomplete = "off";
    Object.assign(this.inputElement.style, {
      width: "100%",
      height: "100%",
      border: "none",
      outline: "none",
      boxSizing: "border-box",
      background:'transparent'
    });
    this.element.appendChild(this.inputElement);

    // Floating dropdown container
    this.dropdownContainer = document.createElement("div");
    Object.assign(this.dropdownContainer.style, {
      position: "fixed",
      display: "none",
      zIndex: "9999",
      minWidth: "max-content",
      border: "1px solid #ccc",
      background: "#fff",
      boxSizing: "border-box",
    });

    // Inner list element (virtualized)
    this.listEl = document.createElement("div");
    // AcScrollable will set overflow + handle virtualization
    this.dropdownContainer.appendChild(this.listEl);
    document.body.appendChild(this.dropdownContainer);
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
    this.inputElement.addEventListener("input", () => {
      const term = this.inputElement.value.toLowerCase();
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

    this.inputElement.addEventListener("focus", () => {
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
    this.inputElement.addEventListener("blur", () => {
      setTimeout(() => this.closeDropdown(), 150);
    });

    // Keyboard navigation
    this.inputElement.addEventListener("keydown", (e) => {
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

  private closeDropdown() {
    this.isDropdownOpen = false;
    this.dropdownContainer.style.display = "none";
  }

  private ensureHighlightInView() {
    if (this.highlightingIndex < 0) return;
    this.scrollToIndex(this.highlightingIndex);
    setTimeout(() => this.applyHighlightStyles(), 0);
  }

  override focus(): void {
    this.inputElement.focus();
  }

  private indexOfValueInFiltered(val: any): number {
    if (val == null) return -1;
    return this._filteredOptions.findIndex(o => {
      const v = (typeof o === "object") ? o[this.valueKey] : o;
      return v == val;
    });
  }

  private openDropdown() {
    if (!this.isDropdownOpen) {
      this.isDropdownOpen = true;
      this.dropdownContainer.style.display = "block";
    }
    this.positionDropdown();
  }

  private positionDropdown() {
    const rect = this.inputElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const desiredHeight = Math.min(this.maxDropdownHeight, Math.max(spaceBelow, 180));
    const showAbove = spaceBelow < 180 && spaceAbove > spaceBelow;
    this.dropdownContainer.style.width = rect.width + "px";
    this.dropdownContainer.style.left = rect.left + "px";
    if (showAbove) {
      this.dropdownContainer.style.top = (rect.top - desiredHeight) + "px";
      this.dropdownContainer.style.maxHeight = spaceAbove + "px";
    } else {
      this.dropdownContainer.style.top = rect.bottom + "px";
      this.dropdownContainer.style.maxHeight = spaceBelow + "px";
    }
    this.listEl.style.height = Math.min(desiredHeight, showAbove ? spaceAbove : spaceBelow) + "px";
  }

  private renderVirtualList() {
    this.listEl.innerHTML = "";
    for (let i = 0; i < this._filteredOptions.length; i++) {
      const row = this.buildOptionElement(this._filteredOptions[i], i);
      this.listEl.appendChild(row);
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

    this.inputElement.value = String(label);
    this.value = value;

    this.closeDropdown();
    this.inputElement.dispatchEvent(new Event("change"));
  }
}
