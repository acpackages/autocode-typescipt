/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, forwardRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AcBaseInput } from '../../_base/ac-base-input.component';
import { AcEnumOptionInputType } from '../enums/ac-input-types.enum';
import { Autocode } from '@autocode-typescript/autocode';

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
export class AcOptionComponent extends AcBaseInput implements OnChanges{
  @ViewChild("input") input!: ElementRef;
  @Input() checked:boolean = false;
  @Input() labelElement:Element|undefined;
  @Input() optionValue:any;
  @Input() optionValueUnchecked:any;
  @Input() type:AcEnumOptionInputType|any = AcEnumOptionInputType.checkbox;
  @Input() isArray:boolean|undefined;
  AcEnumOptionInputType = AcEnumOptionInputType;

  override ngOnChanges(changes:SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  override ngOnInit(): void {
    if (this.isArray == undefined || this.isArray == null) {
      if (this.type == AcEnumOptionInputType.checkbox) {
        this.isArray = true;
      }
      else {
        this.isArray = false;
      }
    }
    super.ngOnInit();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    if(this.labelElement){
      this.labelElement.addEventListener("click",()=>{
        this.input.nativeElement.click();
      })
    }
  }

  override handleChange(event: any) {
    const object = this;
    object.checked = event.target.checked;
    this.setValueToRecord();
    super.handleChange(event);
  }


  setValueToRecord() {
    const object = this;
    if (Autocode.validValue(object.field)) {
      if (object.field != "") {
        if (!Autocode.validValue(object.record[object.field])) {
          if (object.isArray) {
            object.record[object.field] = [];
          }
        }
        if (object.isArray) {
          if (!Array.isArray(object.record[object.field])) {
            object.record[object.field] = [];
          }
          if (object.checked) {
            object.record[object.field] = object.record[object.field].remove(object.optionValueUnchecked);
            if (!object.record[object.field].includes(object.optionValue)) {
              object.record[object.field].push(object.optionValue);
            }
          }
          else {
            console.log(object.record[object.field]);
            object.record[object.field] = object.record[object.field].remove(object.optionValue);
            if (Autocode.validValue(object.optionValueUnchecked)) {
              if (!object.record[object.field].includes(object.optionValueUnchecked)) {
                object.record[object.field].push(object.optionValueUnchecked);
              }
            }
          }
        }
        else {
          if (object.checked) {
            object.record[object.field] = object.optionValue;
          }
          else {
            object.record[object.field] = object.optionValueUnchecked;
          }
        }
      }
    }
  }

  override setValue(value: any): void {
    this.setValueFromRecord();
  }

  override setValueFromRecord(): void {
    const object = this;
    if ( Autocode.validValue(object.optionValue) && Autocode.validValue(object.record) && Autocode.validValue(object.field) && object.field != '' ) {
      if (object.isArray) {
        if (Array.isArray(object.record[object.field]) && object.record[object.field].includes(object.optionValue)) {
          object.checked = true;
        }
        else {
          object.checked = false;
        }
      }
      else {
        if (object.record[object.field] == object.optionValue) {
          object.checked = true;
        }
        else {
          object.checked = false;
        }
      }
    }
    setTimeout(() => {
      this.setValueFromRecord();
    }, 100);
  }

}
