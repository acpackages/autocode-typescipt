/* eslint-disable @nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestAgGridBasicComponent } from './test-ag-grid-basic/test-ag-grid-basic.component';
import { RouterModule, Routes } from '@angular/router';
import { TestAgGridOnDemandDataComponent } from './test-ag-grid-on-demand-data/test-ag-grid-on-demand-data.component';
import { AcInputsModule } from 'packages/angular/ac-angular/src/lib/ac-inputs/ac-inputs.module';
import { AcDatagridOnAgGridModule } from 'packages/angular/ac-ng-datagrid-on-aggrid/src/lib/ac-datagrid-on-aggrid.module';
import { AcDatagridModule } from 'packages/angular/ac-angular/src/lib/ac-datagrid/ac-datagrid.module';
import { ComponentsModule } from '../../components/components.module';
import { TestAgGridTreeComponent } from './test-ag-grid-tree/test-ag-grid-tree.component';

export const routes: Routes = [
  { path: '', component: TestAgGridBasicComponent },
  { path: 'on-demand', component: TestAgGridOnDemandDataComponent },
  { path: 'tree', component: TestAgGridTreeComponent },
];

@NgModule({
  declarations: [
    TestAgGridBasicComponent,
    TestAgGridTreeComponent,
    TestAgGridOnDemandDataComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AcDatagridOnAgGridModule,
    AcDatagridModule,
    AcInputsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class TestAgGridModule { }
