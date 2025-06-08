/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[acDatagridColumnEditTemplate]',
  standalone: false
})
export class AcDatagridColumnEditTemplateDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
