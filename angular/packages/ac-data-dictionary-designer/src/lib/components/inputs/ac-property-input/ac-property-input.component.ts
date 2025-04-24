import { Component, forwardRef, Input } from '@angular/core';
import { AcBaseInput } from '../../../../../../autocode-angular/src/lib/_base/ac-base-input.component';
import { AcDDTableField, AcDDTableFieldProperty, AcEnumDDFieldProperty } from '@ac_packages/autocode-data-dictionary';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ac-property-input',
  templateUrl: './ac-property-input.component.html',
  styleUrl: './ac-property-input.component.css',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcPropertyInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AcPropertyInputComponent),
      multi: true
    }
  ],
})
export class AcPropertyInputComponent extends AcBaseInput {
  @Input() fieldRecord: any;
  @Input() fieldProperty!: AcEnumDDFieldProperty;
  _propertyValue: any;
  get propertyValue(): any {
    let result: any;
    if (this.fieldRecord) {
      if (this.fieldRecord[AcDDTableField.keyFieldProperties]) {
        if (this.fieldRecord[AcDDTableField.keyFieldProperties][this.fieldProperty] != undefined) {
          result = this.fieldRecord[AcDDTableField.keyFieldProperties][this.fieldProperty][AcDDTableFieldProperty.keyPropertyValue];
        }
      }
    }
    return result;
  }
  set propertyValue(value: any) {
    if (this.fieldRecord) {
      if (this.fieldRecord[AcDDTableField.keyFieldProperties]) {
        if (this.fieldRecord[AcDDTableField.keyFieldProperties][this.fieldProperty] == undefined) {
          this.fieldRecord[AcDDTableField.keyFieldProperties][this.fieldProperty] = {
            [AcDDTableFieldProperty.keyPropertyName]: this.fieldProperty
          };
        }
        this.fieldRecord[AcDDTableField.keyFieldProperties][this.fieldProperty][AcDDTableFieldProperty.keyPropertyValue] = value;
      }
    }
  }

  AcEnumDDFieldProperty = AcEnumDDFieldProperty;

  listBooleanProperties: AcEnumDDFieldProperty[] = [AcEnumDDFieldProperty.autoIncrement, AcEnumDDFieldProperty.checkInAutoNumber, AcEnumDDFieldProperty.checkInModify, AcEnumDDFieldProperty.checkInSave, AcEnumDDFieldProperty.inSearchQuery, AcEnumDDFieldProperty.isSelectDistinct, AcEnumDDFieldProperty.notNull, AcEnumDDFieldProperty.primaryKey, AcEnumDDFieldProperty.required, AcEnumDDFieldProperty.setNullBeforeDelete, AcEnumDDFieldProperty.uniqueKey];


  ngOnInit(): void {
    super.ngOnInit();
    // console.log(this);
  }

  handlePropertyValueChange() {
    console.log(this);
  }
}
