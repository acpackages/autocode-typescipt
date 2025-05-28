import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { AcFiltersComponent } from './ac-filters/ac-filters.component';
import { AcInputsModule } from '../ac-inputs/ac-inputs.module';

@NgModule({
  declarations: [
    AcFiltersComponent
  ],
  exports: [
    AcFiltersComponent
  ],
  imports: [
    AcInputsModule,
    CommonModule,
    TreeModule
  ]
})
export class AcFiltersModule { }
