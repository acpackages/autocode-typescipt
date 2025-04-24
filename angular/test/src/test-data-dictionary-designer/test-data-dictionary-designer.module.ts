import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TestDatagridComponent } from './test-datagrid/test-datagrid.component';
import { AcDataDictionaryDesignerModule } from '../../../packages/ac-data-dictionary-designer/src/lib/ac-data-dictionary-designer.module';

export const routes: Routes = [
  { path: '', component: TestDatagridComponent },
];

@NgModule({
  declarations: [
    TestDatagridComponent
  ],
  imports: [
    CommonModule,
    AcDataDictionaryDesignerModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class TestDataDictionaryDesignerModule { }
