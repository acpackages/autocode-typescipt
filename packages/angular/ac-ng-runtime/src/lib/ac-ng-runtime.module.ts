import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcNgIframeContentComponent } from './components/ac-iframe-content/ac-iframe-content.component';


@NgModule({
  declarations: [
    AcNgIframeContentComponent
  ],
  exports: [
    AcNgIframeContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AcNgRuntimeModule { }
