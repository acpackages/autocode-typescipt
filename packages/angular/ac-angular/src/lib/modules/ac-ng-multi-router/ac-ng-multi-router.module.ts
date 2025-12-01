import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcNgMultiRouterComponent } from './_ac-ng-mutli-router.export';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AcNgMultiRouterComponent
  ],
  exports: [
    AcNgMultiRouterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AcNgMultiRouterModule { }
