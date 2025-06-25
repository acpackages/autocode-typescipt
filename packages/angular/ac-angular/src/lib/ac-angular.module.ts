import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcAutoFocusElementDirective } from './directives/ac-auto-focus-element.directive';
import { AcCommentElementTagDirective } from './directives/ac-comment-element-tag.directive';
import { AcDimensionChangeListenerDirective } from './directives/ac-dimension-change-listener.directive';
import { AcElementChangesListenerDirective } from './directives/ac-element-changes-listener.directive';
import { AcElementViewportListenerDirective } from './directives/ac-element-viewport-listener.directive';
import { AcResizableElementDirective } from './directives/ac-resizable-element.directive';

@NgModule({
  declarations: [
    AcAutoFocusElementDirective,
    AcCommentElementTagDirective,
    AcDimensionChangeListenerDirective,
    AcElementChangesListenerDirective,
    AcElementViewportListenerDirective,
    AcResizableElementDirective
  ],
  exports:[
    AcAutoFocusElementDirective,
    AcCommentElementTagDirective,
    AcDimensionChangeListenerDirective,
    AcElementChangesListenerDirective,
    AcElementViewportListenerDirective,
    AcResizableElementDirective
  ],
  imports: [
    CommonModule
  ]
})
export class AcAngularModule { }
