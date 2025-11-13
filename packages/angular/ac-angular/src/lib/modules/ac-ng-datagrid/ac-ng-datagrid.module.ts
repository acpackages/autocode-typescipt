import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcNgDatagridComponent } from './components/ac-ng-datagrid/ac-ng-datagrid.component';

@NgModule({
  declarations: [
    AcNgDatagridComponent
  ],
  exports: [
    AcNgDatagridComponent
  ],
  imports: [
    CommonModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AcNgDatagridModule { }
