import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcNgDatagridSelectComponent, AcNgValueAccessorDirective } from './_ac-ng-inputs.export';


@NgModule({
  declarations: [
    AcNgDatagridSelectComponent,
  ],
  exports: [
    AcNgDatagridSelectComponent,
    AcNgValueAccessorDirective
  ],
  imports: [
    CommonModule,
    AcNgValueAccessorDirective
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AcNgInputsModule { }
