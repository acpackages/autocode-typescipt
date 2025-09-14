import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcBuilderRuntimeComponent } from './ac-builder-runtime-component/ac-builder-runtime-component.component';

@NgModule({
  declarations: [
    AcBuilderRuntimeComponent
  ],
  exports: [
    AcBuilderRuntimeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AcRuntimeModule { }
