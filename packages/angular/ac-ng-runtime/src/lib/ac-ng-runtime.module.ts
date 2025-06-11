import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcRuntimeComponent } from './components/ac-runtime/ac-runtime.component';
import { AcIframeContentComponent } from './components/ac-iframe-content/ac-iframe-content.component';


@NgModule({
  declarations: [
    AcIframeContentComponent,
    AcRuntimeComponent
  ],
  exports: [
    AcIframeContentComponent,
    AcRuntimeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AcDatagridOnAgGridModule { }
