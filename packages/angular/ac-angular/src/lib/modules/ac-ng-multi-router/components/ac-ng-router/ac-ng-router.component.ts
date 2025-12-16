/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, ComponentRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Autocode } from '@autocode-ts/autocode';

@Component({
  selector: 'ac-ng-router',
  standalone: false,
  template: `<div [style]="visible?'display:contents;':'display:none;'">
  <ng-container #renderingContainer></ng-container>
  </div>`,
  styles: [``]
})
export class AcNgRouterComponent {
  @ViewChild('renderingContainer', { read: ViewContainerRef }) renderingContainer!: ViewContainerRef;
  @Input() id: string = Autocode.uuid();
  @Input() visible: boolean = true;
  componentRef?:ComponentRef<any>;
  componentInstance?:any;

  createComponent(type: any) {
    if (this.visible) {
      if (this.renderingContainer) {
        this.renderingContainer.clear();
        this.componentRef = this.renderingContainer.createComponent(type);
        this.componentInstance = this.componentRef.instance;
      }
      else {
        setTimeout(() => {
          this.createComponent(type);
        }, 1);
      }
    }
  }
}
