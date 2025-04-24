import { Component, forwardRef, Input } from '@angular/core';
import { AcBaseInput } from '../../../../../../autocode-angular/src/lib/_base/ac-base-input.component';
import { AcDataDictionary } from '../../../utilities/ac-data-dictionary';
import { AcDDTableField } from '@ac_packages/autocode-data-dictionary';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ac-select-table-field-input',
  templateUrl: './ac-select-table-field-input.component.html',
  styleUrl: './ac-select-table-field-input.component.css',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcSelectTableFieldInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AcSelectTableFieldInputComponent),
      multi: true
    }
  ],
})
export class AcSelectTableFieldInputComponent extends AcBaseInput {
  @Input() acDataDictionary!: AcDataDictionary;
  private _tableName: string = "";
  @Input() set tableName(value: string) {
    this._tableName = value;
    this.setFieldsList();
  };
  get tableName(): string {
    return this._tableName;
  };

  AcDDTableField = AcDDTableField;
  options: any[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.setFieldsList();
  }

  setFieldsList() {
    if (this.acDataDictionary && this.tableName) {
      this.options = this.acDataDictionary.getTableFieldsList({ tableName: this.tableName });
    }
  }
}
