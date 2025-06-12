/* eslint-disable @nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcInputsModule } from 'packages/angular/ac-angular/src/lib/ac-inputs/ac-inputs.module';
import { AcDatagridOnAgGridModule } from 'packages/angular/ac-ng-data-grid-on-aggrid/src/lib/ac-data-grid-on-ag-grid.module';
import { AcDatagridModule } from 'packages/angular/ac-angular/src/lib/ac-data-grid/ac-data-grid.module';
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
