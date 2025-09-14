import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcBuilderRuntimeComponent } from './components/ac-runtime/ac-runtime.component';
import { AcIframeContentComponent } from './components/ac-iframe-content/ac-iframe-content.component';


@NgModule({
  declarations: [
    AcIframeContentComponent,
    AcBuilderRuntimeComponent
  ],
  exports: [
    AcIframeContentComponent,
    AcBuilderRuntimeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AcDatagridOnAgGridModule { }
