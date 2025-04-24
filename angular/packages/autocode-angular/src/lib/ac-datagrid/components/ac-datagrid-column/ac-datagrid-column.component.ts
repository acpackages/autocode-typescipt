import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { AcBase } from '../../../_base/ac-base.component';

@Component({
    selector: 'ac-datagrid-column',
    templateUrl: './ac-datagrid-column.component.html',
    styleUrl: './ac-datagrid-column.component.css',
    standalone: false
})
export class AcDatagridColumnComponent extends AcBase{
  @ContentChild(TemplateRef) template?: TemplateRef<any>;
  @Input() title:string = "";
  @Input() field:string = "";
  @Input() fieldForEdit:string = "";
  @Input() allowSort:boolean = true;
  @Input() allowFilter:boolean = true;
  @Input() width?:number;
  @Input() style?:string;
  @Input() class?:string;
}
