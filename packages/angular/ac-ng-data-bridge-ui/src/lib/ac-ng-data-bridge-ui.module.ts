/* eslint-disable @nx/enforce-module-boundaries */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcNgDataBridgeUiComponent } from './components/ac-ng-data-bridge-ui/ac-ng-data-bridge-ui.component';
import { DataProccesingComponent } from './components/data-processing/data-processing.component';
import { SourceDestinationMappingComponent } from './components/source-destination-mapping/source-destination-mapping.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

@NgModule({
  declarations: [
    AcNgDataBridgeUiComponent,
    DataProccesingComponent,
    SourceDestinationMappingComponent,
    UploadFileComponent
  ],
  exports: [
    AcNgDataBridgeUiComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AcNgDataBridgeUiModule { }
