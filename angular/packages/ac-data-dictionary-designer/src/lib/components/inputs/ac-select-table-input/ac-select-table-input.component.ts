import { Component, forwardRef, Input } from '@angular/core';
import { AcBaseInput } from '../../../../../../autocode-angular/src/lib/_base/ac-base-input.component';
import { AcDataDictionary } from '../../../utilities/ac-data-dictionary';
import { AcDDTable } from '@ac_packages/autocode-data-dictionary';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ac-select-table-input',
  templateUrl: './ac-select-table-input.component.html',
  styleUrl: './ac-select-table-input.component.css',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcSelectTableInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AcSelectTableInputComponent),
      multi: true
    }
  ],
})
export class AcSelectTableInputComponent extends AcBaseInput {
  @Input() acDataDictionary!: AcDataDictionary;
  AcDDTable = AcDDTable;
  options: any[] = [];
  override ngOnInit(): void {
    super.ngOnInit();
    this.options = this.acDataDictionary.getTablesList();
  }
}
