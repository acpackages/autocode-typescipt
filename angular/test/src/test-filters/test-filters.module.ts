import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestFiltersBasicComponent } from './test-filters-basic/test-filters-basic.component';
import { RouterModule, Routes } from '@angular/router';
import { AcFiltersModule } from '../../../packages/autocode-angular/src/lib/ac-filters/ac-filters.module';

export const routes: Routes = [
  { path: '', component: TestFiltersBasicComponent },
];

@NgModule({
  declarations: [
    TestFiltersBasicComponent
  ],
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    AcFiltersModule,
    RouterModule.forChild(routes)
  ]
})
export class TestFiltersModule { }
