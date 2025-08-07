/* eslint-disable @nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcInputsModule } from 'packages/angular/ac-angular/src/lib/ac-inputs/ac-inputs.module';
import { ActionColumnComponent } from './action-column/action-column.component';
import { AcDatagridOnAgGridModule } from 'packages/angular/ac-ng-datagrid-on-aggrid/src/lib/ac-datagrid-on-ag-grid.module';
import { AcDatagridModule } from 'packages/angular/ac-angular/src/lib/ac-datagrid/ac-datagrid.module';
import { SelectAccountInputComponent } from './select-account-input/select-account-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcDatagridDropdownModule } from 'packages/angular/ac-angular/src/lib/ac-datagrid-dropdown/ac-datagrid-dropdown.module';

@NgModule({
  declarations: [
    ActionColumnComponent,
    SelectAccountInputComponent
  ],
  exports:[
    ActionColumnComponent,
    SelectAccountInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    AcDatagridOnAgGridModule,
    AcDatagridModule,
    AcDatagridDropdownModule,
    AcInputsModule,
  ]
})
export class ComponentsModule { }
