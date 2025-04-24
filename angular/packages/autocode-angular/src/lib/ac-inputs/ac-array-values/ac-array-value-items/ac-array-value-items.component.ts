import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { AcArrayValuesComponent } from '../ac-array-values.component';
import { AcBase } from '../../../_base/ac-base.component';
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
  arrayValuesComponent!: AcArrayValuesComponent;

}
