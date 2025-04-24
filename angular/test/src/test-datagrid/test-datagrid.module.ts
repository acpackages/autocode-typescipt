import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AcDatagridModule } from "../../../packages/autocode-angular/src/lib/ac-datagrid/ac-datagrid.module";
import { TestDatagridBasicComponent } from './test-datagrid-basic/test-datagrid-basic.component';
import { AcPaginationModule } from '../../../packages/autocode-angular/src/lib/ac-pagination/ac-pagination.module';
import { AcInputsModule } from '../../../packages/autocode-angular/src/lib/ac-inputs/ac-inputs.module';
import { AcFiltersModule } from '../../../packages/autocode-angular/src/lib/ac-filters/ac-filters.module';
import { TestDatagridNoPaginationComponent } from './test-datagrid-no-pagination/test-datagrid-no-pagination.component';

export const routes: Routes = [
  { path: '', component: TestDatagridBasicComponent },
  { path: 'no-pagination',component:TestDatagridNoPaginationComponent}
];

@NgModule({
  declarations: [
    TestDatagridBasicComponent,
    TestDatagridNoPaginationComponent
  ],
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule,
    AcDatagridModule,
    AcFiltersModule,
    AcInputsModule,
    AcPaginationModule,
    RouterModule.forChild(routes)
  ],
})
export class TestDatagridModule { }
