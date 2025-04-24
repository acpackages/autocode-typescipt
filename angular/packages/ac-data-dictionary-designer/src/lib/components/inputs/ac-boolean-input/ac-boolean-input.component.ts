import { Component, forwardRef } from '@angular/core';
import { AcBaseInput } from '../../../../../../autocode-angular/src/lib/_base/ac-base-input.component';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ac-boolean-input',
  templateUrl: './ac-boolean-input.component.html',
  styleUrl: './ac-boolean-input.component.css',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcBooleanInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AcBooleanInputComponent),
      multi: true
    }
  ],
})
export class AcBooleanInputComponent extends AcBaseInput {
  optionsTrueFalse: any = [
    { 'label': 'YES', value: true },
    { 'label': 'NO', value: false }
  ];

  ngOnInit(): void {
    super.ngOnInit();
  }

  override setValue(value: any): void {
    if(typeof value=="string"){
      value = JSON.parse(value);
    }
    super.setValue(value);
  }
}
