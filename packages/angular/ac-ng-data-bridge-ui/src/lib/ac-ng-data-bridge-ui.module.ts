/* eslint-disable @nx/enforce-module-boundaries */
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcNgScrollableModule } from '@autocode-ts/ac-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcNgDataBridgeUiComponent } from './components/ac-ng-data-bridge-ui/ac-ng-data-bridge-ui.component';
import { DataProccesingComponent } from './components/data-processing/data-processing.component';
import { SourceDestinationMappingComponent } from './components/source-destination-mapping/source-destination-mapping.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { ProgressComponent } from '@coreui/angular';
import { ConvertToDestinationComponent } from './components/convert-to-destination/convert-to-destination.component';

@NgModule({
  declarations: [
    AcNgDataBridgeUiComponent,
    ConvertToDestinationComponent,
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
    AcNgScrollableModule,
    ReactiveFormsModule,
    ProgressComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AcNgDataBridgeUiModule { }
