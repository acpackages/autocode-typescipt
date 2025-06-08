/* eslint-disable @nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TestPaginationBasicComponent } from './test-pagination-basic/test-pagination-basic.component';
import { AcPaginationModule } from 'packages/angular/ac-angular/src/lib/ac-pagination/ac-pagination.module';

export const routes: Routes = [
  { path: '', component: TestPaginationBasicComponent },
];


@NgModule({
  declarations: [
    TestPaginationBasicComponent
  ],
  exports:[
    RouterModule
  ],
  imports: [
    CommonModule,
    AcPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class TestPaginationModule { }
