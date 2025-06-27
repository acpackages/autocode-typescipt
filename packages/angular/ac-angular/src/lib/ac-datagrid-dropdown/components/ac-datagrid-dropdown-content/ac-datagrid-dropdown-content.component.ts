/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ContentChild } from '@angular/core';
import { AcCommentElementTagDirective } from '../../../directives/ac-comment-element-tag.directive';
import { AcDatagridDropdownDatagridComponent } from '../ac-datagrid-dropdown-datagrid/ac-datagrid-dropdown-datagrid.component';

@Component({
  selector: 'ac-datagrid-dropdown-content',
  templateUrl: './ac-datagrid-dropdown-content.component.html',
  styleUrl: './ac-datagrid-dropdown-content.component.css',
  standalone: false
})
export class AcDatagridDropdownContentComponent extends AcCommentElementTagDirective {
  @ContentChild(AcDatagridDropdownDatagridComponent) datagridDropdownDatagrid?:AcDatagridDropdownDatagridComponent;

}
