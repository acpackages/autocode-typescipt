import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { AcInputsModule } from '@autocode-ts/ac-angular';


@NgModule({
  declarations: [
  ],
  exports: [
  ],
  imports: [
    AcInputsModule,
    AgGridAngular,
    CommonModule
  ]
})
export class AcDDEDatagridEditorModule { }
