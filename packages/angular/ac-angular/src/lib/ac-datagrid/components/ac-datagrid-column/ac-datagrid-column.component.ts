/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { AcBase } from '../../../_base/ac-base.component';
import { AcDatagridColumnEditTemplateDirective } from '../../directives/ac-datagrid-column-edit-template.directive';
import { AcDatagridColumnRenderTemplateDirective } from '../../directives/ac-datagrid-column-render-template.directive';
import { IAcDataGridColumn } from '../../interfaces/ac-datagrid-column.interface';
import { AcEnumColumnDataType } from '../../enums/ac-column-data-types.enum';

@Component({
  selector: 'ac-datagrid-column',
  templateUrl: './ac-datagrid-column.component.html',
  styleUrl: './ac-datagrid-column.component.css',
  standalone: false
})
export class AcDatagridColumnComponent extends AcBase {
  @ContentChild(TemplateRef) template?: TemplateRef<any>;
  @ContentChild(AcDatagridColumnEditTemplateDirective)
  editTemplate?: AcDatagridColumnEditTemplateDirective;
  @ContentChild(AcDatagridColumnRenderTemplateDirective)
  renderTemplate?: AcDatagridColumnRenderTemplateDirective;
  @Input() title: string = "";
  @Input() dataType: any = AcEnumColumnDataType.string;
  @Input() field: string = "";
  @Input() fieldForEdit: string = "";
  @Input() allowSort: boolean = true;
  @Input() allowEdit: boolean = true;
  @Input() allowSelect: boolean = false;
  @Input() allowFilter: boolean = true;
  @Input() index?: number;
  @Input() width?: number;
  @Input() style?: string;
  @Input() class?: string;

  get columnDetails(): IAcDataGridColumn {
    const result: IAcDataGridColumn = {
      allowSort: this.allowSort,
      allowEdit: this.allowEdit,
      allowFilter: this.allowFilter,
      allowSelect: this.allowSelect,
      dataType:this.dataType,
      field: this.field,
      title: this.title == ''?this.field:this.title,
      format: undefined,
      style: this.style,
      index: this.index,
      conditionalStyle: undefined,
      state: { headWidth: 0, bodyWidth: 0 },
      template: this.template,
    };
    if (this.editTemplate) {
      result.editTemplate = this.editTemplate!.template;
    }
    if (this.renderTemplate) {
      result.renderTemplate = this.renderTemplate!.template;
    }
    return result;
  }
}
