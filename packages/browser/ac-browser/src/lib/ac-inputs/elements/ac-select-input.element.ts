/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcScrollable } from "../../ac-scrollable/_ac-scrollable.export";
import { acAddClassToElement } from "../../utils/ac-element-functions";
import { AcInputCssClassName } from "../consts/ac-input-css-class-name.const";
import { AcInputBase } from "../core/ac-input-base";

export class AcSelectInput extends AcInputBase {
  private _labelKey: string = 'label';
  get labelKey(): string {
    return this._labelKey;
  }
  set labelKey(value: string) {
    this._labelKey = value;
  }

  private _valueKey: string = 'value';
  get valueKey(): string {
    return this._valueKey;
  }
  set valueKey(value: string) {
    this._valueKey = value;
  }

  private _selectOptions: any[] = [];
   get selectOptions(): any[] {
    return this._selectOptions;
  }
  set selectOptions(value: any[]) {
    this._selectOptions = value;
    this._filteredOptions = [...value];
  }

  override get value() {
    return super.value;
  }
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
  private inputElement!: HTMLInputElement;
  private highlightingIndex: number = -1;
  private isDropdownOpen: boolean = false;
  private scrollable!:AcScrollable;


  constructor() {
    super();
    acAddClassToElement({
      cssClass: AcInputCssClassName.acSelectInput,
      element: this.element
    });
    this.element.style.position = "relative";
    this.inputElement = document.createElement("input");
    this.inputElement.type = "text";
    this.inputElement.style.width = '100%';
    this.inputElement.style.height = '100%';
    this.inputElement.style.border = 'none';
    this.inputElement.autocomplete = "off";
    this.element.appendChild(this.inputElement);
    this.dropdownContainer = document.createElement("div");
    // this.scrollable = new AcScrollable({element:this.dropdownContainer})
    this.dropdownContainer.style.position = "fixed";
    this.dropdownContainer.style.display = "none";
    this.dropdownContainer.style.zIndex = "9999";
    this.dropdownContainer.style.height = "300px";
    this.dropdownContainer.style.minWidth = 'max-content';
    document.body.appendChild(this.dropdownContainer);

    this.attachEvents();
  }

  private attachEvents() {
    this.inputElement.addEventListener("input", () => {
      const term = this.inputElement.value.toLowerCase();
      this._filteredOptions = this._selectOptions.filter(option => {
        const label = typeof option === "object" ? option[this.labelKey] : option;
        return label.toLowerCase().includes(term);
      });
      this.renderDropdown();
      this.openDropdown();
    });
    this.inputElement.addEventListener("focus", () => {
      this._filteredOptions = [...this._selectOptions];
      this.renderDropdown();
      this.openDropdown();
    });
    this.inputElement.addEventListener("blur", () => {
      setTimeout(() => this.closeDropdown(), 150);
    });
    this.inputElement.addEventListener("keydown", (e) => {
      if (!this.isDropdownOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.highlightingIndex = Math.min(this.highlightingIndex + 1, this._filteredOptions.length - 1);
        this.highlightOption();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        this.highlightingIndex = Math.max(this.highlightingIndex - 1, 0);
        this.highlightOption();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (this.highlightingIndex >= 0) {
          this.selectOption(this._filteredOptions[this.highlightingIndex]);
        }
      }
      if (e.key === "Escape") {
        this.closeDropdown();
      }
    });
    window.addEventListener("scroll", () => {
      if (this.isDropdownOpen) this.positionDropdown();
    }, true);
    window.addEventListener("resize", () => {
      if (this.isDropdownOpen) this.positionDropdown();
    });
  }

  private closeDropdown() {
    this.isDropdownOpen = false;
    this.dropdownContainer.innerHTML = "";
    this.dropdownContainer.style.display = "none";
  }

  private highlightOption() {
    Array.from(this.dropdownContainer.children).forEach((child, idx) => {
      (child as HTMLElement).style.background =
        idx === this.highlightingIndex ? "#ddd" : "";
    });
  }

  private openDropdown() {
    this.isDropdownOpen = true;
    this.dropdownContainer.style.display = "block";
    this.renderDropdown();
    this.positionDropdown();
    this.highlightingIndex = -1;
  }

  private positionDropdown() {
    const rect = this.inputElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const dropdownHeight = Math.min(200, this._filteredOptions.length * 30);
    const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
    this.dropdownContainer.style.width = rect.width + "px";
    this.dropdownContainer.style.left = rect.left + "px";
    if (showAbove) {
      this.dropdownContainer.style.top = (rect.top - dropdownHeight) + "px";
      this.dropdownContainer.style.maxHeight = spaceAbove + "px";
    } else {
      this.dropdownContainer.style.top = rect.bottom + "px";
      this.dropdownContainer.style.maxHeight = spaceBelow + "px";
    }
    this.dropdownContainer.style.overflowY = "auto";
    this.dropdownContainer.style.border = "1px solid #ccc";
    this.dropdownContainer.style.background = "#fff";
  }

  private renderDropdown() {
    this.dropdownContainer.innerHTML = "";
    for (let i = 0; i < this._filteredOptions.length; i++) {
      const option = this._filteredOptions[i];
      const optionDiv = document.createElement("div");
      optionDiv.textContent = typeof option === "object" ? option[this.labelKey] : option;
      optionDiv.style.padding = "4px 8px";
      optionDiv.style.cursor = "pointer";
      optionDiv.addEventListener("mousedown", (e) => {
        e.preventDefault();
        this.selectOption(option);
      });
      this.dropdownContainer.appendChild(optionDiv);
    }
  }

  private selectOption(option: any) {
    this.inputElement.value = typeof option === "object" ? option[this.labelKey] : option;
    this.value = typeof option === "object" ? option[this.valueKey] : option;
    this.closeDropdown();
    this.inputElement.dispatchEvent(new Event("change"));
  }








}
