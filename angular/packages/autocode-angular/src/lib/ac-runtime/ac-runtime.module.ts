import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcRuntimeComponent } from './ac-runtime-component/ac-runtime-component.component';

@NgModule({
  declarations: [
    AcRuntimeComponent
  ],
  exports: [
    AcRuntimeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AcRuntimeModule { }
