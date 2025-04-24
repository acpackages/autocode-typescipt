import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcDatagridDataDictionaryDesignerComponent } from './components/ac-datagrid-data-dictionary-designer/ac-datagrid-data-dictionary-designer.component';
import { AcDatagridModule } from '../../../autocode-angular/src/lib/ac-datagrid/ac-datagrid.module';
import { AcInputsModule } from '../../../autocode-angular/src/lib/ac-inputs/ac-inputs.module';
import { AcPropertyInputComponent } from './components/inputs/ac-property-input/ac-property-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcSelectTableInputComponent } from './components/inputs/ac-select-table-input/ac-select-table-input.component';
import { AcSelectTableFieldInputComponent } from './components/inputs/ac-select-table-field-input/ac-select-table-field-input.component';
import { AcBooleanInputComponent } from './components/inputs/ac-boolean-input/ac-boolean-input.component';

@NgModule({
  declarations: [
    AcBooleanInputComponent,
    AcDatagridDataDictionaryDesignerComponent,
    AcPropertyInputComponent,
    AcSelectTableInputComponent,
    AcSelectTableFieldInputComponent
  ],
  exports: [
    AcDatagridDataDictionaryDesignerComponent,
  ],
  imports: [
    AcDatagridModule,
    AcInputsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AcDataDictionaryDesignerModule { }
