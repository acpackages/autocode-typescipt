/* eslint-disable @nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TestFormBasicComponent } from './test-form-basic/test-form-basic.component';
import { AcInputsModule } from 'packages/angular/ac-angular/src/lib/ac-inputs/ac-inputs.module';

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
    AcInputsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TestFormsModule { }
