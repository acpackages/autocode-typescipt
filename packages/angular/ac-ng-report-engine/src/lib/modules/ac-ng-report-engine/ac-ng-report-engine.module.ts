import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcNgReportComponent } from './_ac-ng-report-engine.export';
@NgModule({
  declarations: [
    AcNgReportComponent
  ],
  exports: [
    AcNgReportComponent
  ],
  imports: [
    CommonModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AcNgReportEngineModule { }
