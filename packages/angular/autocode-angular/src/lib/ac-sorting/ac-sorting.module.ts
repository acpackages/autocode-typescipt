import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcSortButtonComponent } from './components/ac-sort-button/ac-sort-button.component';

@NgModule({
  declarations: [
    AcSortButtonComponent
  ],
  exports: [
    AcSortButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AcSortingModule { }
