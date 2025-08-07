/* eslint-disable @nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TestFormBasicComponent } from './test-form-basic/test-form-basic.component';
import { AcInputsModule } from 'packages/angular/ac-angular/src/lib/ac-inputs/ac-inputs.module';
import { AcDatagridOnAgGridModule } from 'packages/angular/ac-ng-datagrid-on-aggrid/src/lib/ac-datagrid-on-ag-grid.module';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: TestFormBasicComponent },
];

@NgModule({
  declarations: [
    TestFormBasicComponent
  ],
  exports:[
    RouterModule
  ],
  imports: [
    AcDatagridOnAgGridModule,
    AcInputsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class TestFormsModule { }
