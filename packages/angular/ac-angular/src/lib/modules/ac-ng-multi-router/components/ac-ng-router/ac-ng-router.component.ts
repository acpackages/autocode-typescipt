/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Autocode } from '@autocode-ts/autocode';

@Component({
  selector: 'ac-ng-router',
  standalone: false,
  template: `<div [style]="visible?'display:contents;':'display:none;'">
  <div style="display:none">
    <ng-container *ngIf="visible">
      <router-outlet
      (activate)="handleActivate($event)"
      (attach)="handleAttach($event)"
      (deactivate)="handleDeactivate($event)"
      (detach)="handleDetach($event)"
      ></router-outlet>
    </ng-container>
  </div>
  <ng-container #renderingContainer></ng-container>
  </div>`,
  styles: [``]
})
export class AcNgRouterComponent {

  @ViewChild('renderingContainer', { read: ViewContainerRef }) renderingContainer!: ViewContainerRef;
  @ViewChild(RouterOutlet) routerOutlet!: RouterOutlet;
  @Input() id: string = Autocode.uuid();
  private _visible = true;
  @Input() get visible(): boolean { return this._visible; }
  set visible(value: boolean) {
    if(value != this._visible){
      this._visible = value;
      if(value){
        setTimeout(() => {
          this.listenChanges = true;
        }, 1);
      }
      else{
        this.listenChanges = false;
      }
    }
  }

  private listenChanges:boolean = true;

  handleActivate(event: any) {
    if (this.listenChanges) {
      if (this.renderingContainer && this.routerOutlet) {
        this.renderingContainer.clear();
        this.renderingContainer.createComponent(event.constructor);
      }
      else {
        setTimeout(() => {
          this.handleActivate(event);
        }, 1);
      }
    }
    if(this.routerOutlet){
      (this.routerOutlet as any).location.clear();
    }
  }

  handleAttach(event: any) {
    //
  }

  handleDeactivate(event: any) {
    //
  }

  handleDetach(event: any) {
    //
  }
}
