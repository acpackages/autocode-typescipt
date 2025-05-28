/* eslint-disable @nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestAgGridBasicComponent } from './test-ag-grid-basic/test-ag-grid-basic.component';
import { RouterModule, Routes } from '@angular/router';
import { AcDatagridModule } from 'packages/angular/autocode-angular/src/lib/ac-datagrid/ac-datagrid.module';
import { AcInputsModule } from 'packages/angular/autocode-angular/src/lib/ac-inputs/ac-inputs.module';

export const routes: Routes = [
  { path: '', component: TestAgGridBasicComponent },
  // { path: 'on-demand', component: TestAgGridOnDemandDataComponent },
];

@NgModule({
  declarations: [
    TestAgGridBasicComponent,
    // TestAgGridOnDemandDataComponent
  ],
  imports: [
    CommonModule,
    // AcDatagridOnAgGridModule,
    AcDatagridModule,
    // AcAngularModule,
    AcInputsModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class TestAgGridModule { }
