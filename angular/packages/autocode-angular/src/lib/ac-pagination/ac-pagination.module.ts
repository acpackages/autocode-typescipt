import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcPaginationComponent } from './ac-pagination/ac-pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AcPaginationComponent
  ],
  exports: [
    AcPaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AcPaginationModule { }
