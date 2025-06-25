/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, forwardRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AcBaseInput } from '../../_base/ac-base-input.component';
import { AcEnumOptionInputType } from '../enums/ac-input-types.enum';
import { Autocode } from '@autocode-ts/autocode';
import { arrayRemove } from '@autocode-ts/ac-extensions';

@Component({
  selector: 'ac-option',
  templateUrl: './ac-option.component.html',
  styleUrl: './ac-option.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcOptionComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AcOptionComponent),
      multi: true
    }
  ],
  standalone: false
})
export class AcOptionComponent extends AcBaseInput implements OnChanges {
  @ViewChild("input") input!: ElementRef;
  @Input() checked: boolean = false;
  @Input() labelElement: Element | undefined;
  @Input() optionValue: any;
  @Input() optionValueUnchecked: any;
  @Input() type: AcEnumOptionInputType | any = AcEnumOptionInputType.checkbox;
  @Input() isArray: boolean | undefined;
  AcEnumOptionInputType = AcEnumOptionInputType;

  override ngOnInit(): void {
    if (this.isArray == undefined || this.isArray == null) {
      if (this.type == AcEnumOptionInputType.checkbox) {
        this.isArray = true;
      }
      else {
        this.isArray = false;
      }
    }
    if (this.isArray == undefined) {
      this.isArray = false;
    }
    super.ngOnInit();
    this.setIsChecked();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    if (this.labelElement) {
      this.labelElement.addEventListener("click", () => {
        this.input.nativeElement.click();
      })
    }
    this.setIsChecked();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  override handleChange(event: any) {
    const object = this;
    this.updateCheckedValue(event.target.checked);
    super.handleChange(event);
  }


  updateCheckedValue(isChecked: boolean, triggerEvent: boolean = true) {
    const object = this;
    if (object.isArray) {
      if (!Array.isArray(object.value)) {
        this._value = [];
      }
      if (isChecked) {
        arrayRemove(this._value,object.optionValueUnchecked);
        if (!object._value.includes(object.optionValue)) {
          object._value.push(object.optionValue);
        }
      }
      else {
        arrayRemove(this._value,object.optionValue);
        console.log("Object value unchecked : " + this.optionValueUnchecked);
        if (Autocode.validValue(object.optionValueUnchecked)) {
          console.log("Object value when unchecked : " + this.optionValueUnchecked);
          if (!object._value.includes(object.optionValueUnchecked)) {
            object._value.push(object.optionValueUnchecked);
          }
        }
      }
    }
    else {
      if (isChecked) {
        object._value = object.optionValue;
      }
      else {
        object._value = object.optionValueUnchecked;
      }
    }
    if (triggerEvent) {
      this.value = this._value;
    }
  }

  override setValue(value: any): void {
    const object = this;
    super.setValue(value);
    object.setIsChecked();
    if(this.instanceViewInitialized){
      this.updateCheckedValue(this.checked, false);
    }
    console.log(this);
  }

  setIsChecked(): void {
    const object = this;
    if (object.isArray) {
      if (Array.isArray(object.value) && object.value.includes(object.optionValue)) {
        object.checked = true;
      }
      else {
        object.checked = false;
      }
    }
    else {
      if (object.value == object.optionValue) {
        object.checked = true;
      }
      else {
        object.checked = false;
      }
    }
  }
}
