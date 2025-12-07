/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component,Input } from '@angular/core';
import { Autocode } from '@autocode-ts/autocode';

@Component({
  selector: 'ac-ng-router',
  standalone: false,
  template: `<div [style]="visible?'display:contents;':'display:none;'"><router-outlet [attr.name]="id" ></router-outlet></div>`,
  styles: [``]
})
export class AcNgRouterComponent{
  @Input() id:string=Autocode.uuid();
  @Input() visible:boolean=true;
}
