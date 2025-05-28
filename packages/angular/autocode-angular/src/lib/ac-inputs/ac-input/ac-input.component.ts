/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AcBaseInput } from '../../_base/ac-base-input.component';

@Component({
  selector: 'ac-input',
  templateUrl: './ac-input.component.html',
  styleUrl: './ac-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AcInputComponent),
      multi: true
    }
  ],
  standalone: false
})
export class AcInputComponent extends AcBaseInput {
  @ViewChild("input") input!: ElementRef;
  @Input() type: string = "text";
}
