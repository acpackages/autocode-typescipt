/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AcBaseInput } from '../../_base/ac-base-input.component';

@Component({
    selector: 'ac-textarea',
    templateUrl: './ac-textarea.component.html',
    styleUrl: './ac-textarea.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AcTextareaComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AcTextareaComponent),
            multi: true
        }
    ],
    standalone: false
})
export class AcTextareaComponent extends AcBaseInput{
  @Input() rows:number = 3;
}
