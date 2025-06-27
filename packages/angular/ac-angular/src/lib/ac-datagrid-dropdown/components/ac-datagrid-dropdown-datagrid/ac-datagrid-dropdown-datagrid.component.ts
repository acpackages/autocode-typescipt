/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { AcCommentElementTagDirective } from '../../../directives/ac-comment-element-tag.directive';

@Component({
  selector: 'ac-datagrid-dropdown-datagrid',
  templateUrl: './ac-datagrid-dropdown-datagrid.component.html',
  styleUrl: './ac-datagrid-dropdown-datagrid.component.css',
  standalone: false
})
export class AcDatagridDropdownDatagridComponent extends AcCommentElementTagDirective {
  @Input()
  datagridTemplate: TemplateRef<any>;

}
