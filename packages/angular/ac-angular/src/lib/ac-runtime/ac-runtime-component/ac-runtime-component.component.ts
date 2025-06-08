/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { AcBase } from '../../_base/ac-base.component';

@Component({
    selector: 'ac-runtime-component',
    templateUrl: './ac-runtime-component.component.html',
    styleUrl: './ac-runtime-component.component.css',
    standalone: false
})
export class AcRuntimeComponent extends AcBase{
  @ViewChild('runtimeComponentContainer', { read: ViewContainerRef, static: true })
  runtimeComponentContainer!: ViewContainerRef;
  @Input() component?:Type<any>;
  @Input() componentProperties:any = {};
  @Output() onComponentCreated: EventEmitter<any> = new EventEmitter<any>();

  componentInstance:any;
  componentRef:any;

  override ngOnInit() {
    super.ngOnInit();
    this.runtimeComponentContainer.clear();
    this.componentRef = this.runtimeComponentContainer.createComponent(this.component!);
    if(this.componentRef){
      this.componentInstance = this.componentRef.instance;
      if (this.componentProperties) {
        Object.keys(this.componentProperties).forEach((key) => {
          if(this.componentInstance[key]!=undefined){
            this.componentInstance[key] = this.componentProperties[key];
          }
        });
      }
    }
    this.onComponentCreated.emit({"instance":this.componentInstance});
  }
}
