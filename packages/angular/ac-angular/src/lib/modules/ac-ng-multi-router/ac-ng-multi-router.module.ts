import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcNgMultiRouterComponent } from './_ac-ng-mutli-router.export';
import { RouterModule } from '@angular/router';
import { AcNgRouterComponent } from './components/ac-ng-router/ac-ng-router.component';

@NgModule({
  declarations: [
    AcNgMultiRouterComponent,
    AcNgRouterComponent
  ],
  exports: [
    AcNgMultiRouterComponent,
    AcNgRouterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AcNgMultiRouterModule { }
