/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocode } from "@autocode-ts/autocode";
import { arrayRemoveByIndex } from "@autocode-ts/ac-extensions";
import { AcInputBase } from "../core/ac-input-base";
import { AcArrayValuesItemsElement } from "./ac-array-values-item-element.element";

interface IAcArrayValueItem {
  id: string,
  index: number,
  item: any,
  element?: HTMLElement,
}

export class AcArrayValuesInputElement extends AcInputBase {
  override reflectValueAttribute: boolean = false;
  itemsElement?: HTMLElement;
  itemClone?: HTMLElement;
  private items: IAcArrayValueItem[] = [];

  protected override _value: any[] = [];
  override get value(): any[] {
    return this._value;
  }
  override set value(value: any[]) {
    if (value == undefined || value == null) {
      value = [];
    }
    if (value != this._value) {
      this.setValue(value);
    }
  }

  constructor() {
    super();
    this.value = [];
  }

  override connectedCallback(): void {
    const itemsElement = this.querySelector('[ac-array-values-items]');
    if (itemsElement) {
      this.itemsElement = itemsElement as AcArrayValuesItemsElement;
      if (itemsElement.childElementCount > 0) {
        this.itemClone = itemsElement.children[0].cloneNode(true) as HTMLElement;
      }
      this.itemsElement.innerHTML = '';
    }
    const addItemElements = this.querySelectorAll('[ac-array-values-item-add]');
    if (addItemElements) {
      for (const element of Array.from(addItemElements) as HTMLElement[]) {
        element.addEventListener('click', () => {
          this.addItem();
        });
      }
    }
    this.refreshItems();
  }

  addItem({ data = {} }: { data?: any } = {}) {
    if (this.itemsElement && this.itemClone) {
      const arrayValueItem: IAcArrayValueItem = {
        id: Autocode.uniqueId(),
        item: data,
        index: this.value.length
      };
      this.value.push(data);
      this.items.push(arrayValueItem);
      this.renderArrayValueItem({ arrayValueItem });
    }
  }

  private registerValueInputListeners({ arrayValueItem }: { arrayValueItem: IAcArrayValueItem }) {
    if (arrayValueItem.element) {
      for (const inputElement of Array.from(arrayValueItem.element.querySelectorAll('[ac-array-values-item-input]')) as HTMLInputElement[]) {
        const itemKey = inputElement!.getAttribute('ac-array-value-item-key');
        const setValue = () => {
          if (itemKey) {
            arrayValueItem.item[itemKey] = inputElement.value;
          }
          else {
            arrayValueItem.item = inputElement.value;
          }
          this.value[arrayValueItem.index] = arrayValueItem.item;
        }
        if (arrayValueItem.item) {
          if (itemKey) {
            if(arrayValueItem.item[itemKey]){
              inputElement.value = arrayValueItem.item[itemKey];
            }
          }
          else {
            inputElement.value = arrayValueItem.item;
          }
        }

        inputElement.addEventListener('input', () => {
          setValue();
        });
        inputElement.addEventListener('change', () => {
          setValue();
        });
      }
    }
  }

  private refreshItems() {
    if (this.itemsElement && this.itemClone) {
      this.items = [];
      for (const item of this.value) {
        const arrayValueItem: IAcArrayValueItem = {
          id: Autocode.uniqueId(),
          item: item,
          index: this.value.length
        };
        this.items.push(arrayValueItem);
        this.renderArrayValueItem({ arrayValueItem });
      }
    }
  }

  removeItem({ index }: { index: number }) {
    if (this.items[index].element) {
      this.items[index].element.remove();
    }
    arrayRemoveByIndex(this.value, index);
    arrayRemoveByIndex(this.items, index);
    let newIndex: number = 0;
    for (const item of this.items) {
      item.index = newIndex;
      newIndex++;
    }
  }


  private renderArrayValueItem({ arrayValueItem }: { arrayValueItem: IAcArrayValueItem }) {
    if (this.itemsElement && this.itemClone) {
      const itemId: string = arrayValueItem.id;
      if (this.itemsElement.querySelector(`[ac-array-values-item-id=${itemId}]`) == null) {
        const itemElement = this.itemClone.cloneNode(true) as HTMLElement;
        itemElement.setAttribute('ac-array-values-item-id', itemId);
        arrayValueItem.element = itemElement;
        this.itemsElement?.append(itemElement);
        this.registerValueInputListeners({ arrayValueItem });
        const removeItemElements = itemElement.querySelectorAll('[ac-array-values-item-remove]');
        if (removeItemElements) {
          for (const element of Array.from(removeItemElements) as HTMLElement[]) {
            element.addEventListener('click', () => {
              this.removeItem({ index: arrayValueItem.index });
            });
          }
        }
      }
    }
  }

  override setValue(value: any): void {
    if (value != this._value) {
      super.setValue(value);
      this._value = value;
      this.refreshItems();
    }
  }
}

customElements.define('ac-array-values-input', AcArrayValuesInputElement);
