/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcInputBase } from "../core/ac-input-base";

export class AcSelectInput extends AcInputBase{
  private _labelKey:string = 'label';
  get labelKey():string{
    return this._labelKey;
  }
  set labelKey(value:string){
    this._labelKey = value;
  }

  private _selectOptions:any[] = [];
  get selectOptions():any[]{
    return this._selectOptions;
  }
  set selectOptions(value:any[]){
    this._selectOptions = value;
    this.setSelectOptionElements();
  }

  private _valueKey:string = 'value';
  get valueKey():string{
    return this._valueKey;
  }
  set valueKey(value:string){
    this._valueKey = value;
  }

  override element: HTMLSelectElement = document.createElement('select');

  setSelectOptionElements(){
    this.element.innerHTML = '';
    for(const option of this.selectOptions){
      const optionElement:HTMLElement = document.createElement('option');
      if(typeof option == 'object'){
        optionElement.innerHTML = option[this.labelKey];
        optionElement.setAttribute('value',option[this.valueKey]);
      }
      else{
        optionElement.innerHTML = option;
        optionElement.setAttribute('value',option);
      }
      this.element.appendChild(optionElement);
    }
  }
}
