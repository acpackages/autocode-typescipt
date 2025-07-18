/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { AcCommentElementTagDirective } from '../../../directives/ac-comment-element-tag.directive';

@Component({
  selector: 'ac-array-value-items',
  templateUrl: './ac-array-value-items.component.html',
  styleUrl: './ac-array-value-items.component.css',
  standalone: false
})
export class AcArrayValueItemsComponent extends AcCommentElementTagDirective {
  @ContentChild(TemplateRef)
  template!: TemplateRef<any>;

  @Input()
  arrayValuesComponent!: any;

}
