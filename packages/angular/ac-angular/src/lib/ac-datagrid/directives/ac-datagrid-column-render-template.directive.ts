/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive,  TemplateRef } from '@angular/core';

@Directive({
  selector: '[acDatagridColumnRenderTemplate]',
  standalone: false
})
export class AcDatagridColumnRenderTemplateDirective {
  constructor(public template: TemplateRef<any>){
  }
}
