/* eslint-disable @nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcInputsModule } from 'packages/angular/autocode-angular/src/lib/ac-inputs/ac-inputs.module';
import { AcDatagridOnAgGridModule } from 'packages/angular/ac-datagrid-on-aggrid-angular/src/lib/ac-datagrid-on-ag-grid.module';
import { AcDatagridModule } from 'packages/angular/autocode-angular/src/lib/ac-datagrid/ac-datagrid.module';
import { ActionColumnComponent } from './action-column/action-column.component';

@NgModule({
  declarations: [
    ActionColumnComponent
  ],
  exports:[
    ActionColumnComponent
  ],
  imports: [
    CommonModule,
    AcDatagridOnAgGridModule,
    AcDatagridModule,
    AcInputsModule,
  ]
})
export class ComponentsModule { }
