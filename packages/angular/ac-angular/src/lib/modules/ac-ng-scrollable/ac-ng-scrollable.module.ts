import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcNgScrollableComponent } from './components/ac-ng-scrollable/ac-ng-scrollable.component';
import { AcNgScrollableBodyComponent } from './components/ac-ng-scrollable-body/ac-ng-scrollable-body.component';
import { AcNgScrollableTopSpacerComponent } from './components/ac-ng-scrollable-top-spacer/ac-ng-scrollable-top-spacer.component';
import { AcNgScrollableBottomSpacerComponent } from './components/ac-ng-scrollable-bottom-spacer/ac-ng-scrollable-bottom-spacer.component';

@NgModule({
  declarations: [
    AcNgScrollableComponent,
    AcNgScrollableBodyComponent,
    AcNgScrollableTopSpacerComponent,
    AcNgScrollableBottomSpacerComponent
  ],
  exports: [
    AcNgScrollableComponent,
    AcNgScrollableBodyComponent,
    AcNgScrollableTopSpacerComponent,
    AcNgScrollableBottomSpacerComponent
  ],
  imports: [
    CommonModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AcNgScrollableModule { }
