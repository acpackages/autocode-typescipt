/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ContentChildren, forwardRef, Input, QueryList } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AcBaseInput } from '../../_base/ac-base-input.component';
import { AcSelectOptionComponent } from './ac-select-option/ac-select-option.component';
import { IAcSelectOption } from '../interfaces/ac-select-option.interface';

@Component({
  selector: 'ac-select',
  templateUrl: './ac-select.component.html',
  styleUrl: './ac-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AcSelectComponent),
      multi: true
    }
  ],
  standalone: false
})
export class AcSelectComponent extends AcBaseInput {
  @ContentChildren(AcSelectOptionComponent) optionComponents?: QueryList<AcSelectOptionComponent>;
  @Input() optionKeyLabel: string = "label";
  @Input() optionKeyValue: string = "value";
  _options: any[] = [];
  @Input() set options(value: any[]) {
    this._options = value;
    this.setSelectOptions();
  }
  get options(): any[] {
    return this._options;
  }
  selectOptions: IAcSelectOption[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.setSelectOptions();
  }

  setSelectOptions() {
    this.selectOptions = [];
    for (const option of this.options) {
      const selectOption: any = {};
      if (typeof option == "object") {
        selectOption[this.optionKeyLabel] = option[this.optionKeyLabel];
        selectOption[this.optionKeyValue] = option[this.optionKeyValue];
      }
      else if (typeof option == "string") {
        selectOption[this.optionKeyLabel] = option;
        selectOption[this.optionKeyValue] = option;
      }
      this.selectOptions.push(selectOption);
    }
  }
}
