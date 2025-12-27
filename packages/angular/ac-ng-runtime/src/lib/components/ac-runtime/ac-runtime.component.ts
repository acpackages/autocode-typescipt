/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { AcRuntimeService } from '../../services/ac-runtime.service';
import { acNullifyInstanceProperties } from '@autocode-ts/autocode';

@Component({
    selector: 'ac-repeater',
    templateUrl: './ac-runtime.component.html',
    styleUrl: './ac-runtime.component.css',
    standalone: false
})
export class AcBuilderRuntimeComponent implements OnInit,OnDestroy{
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  @Input() component:any;
  @Input() componentProperties:any = {};
  @Output() onComponentCreated: EventEmitter<any> = new EventEmitter<any>();
  componentInstance:any;
  componentRef:any;

  constructor(
    public acRuntimeService:AcRuntimeService
  ) {
  }

  ngOnDestroy(): void {
    acNullifyInstanceProperties({instance:this});
  }

  ngOnInit() {
    this.component = this.acRuntimeService.getComponentRef(this.component);
    this.container.clear();
    this.componentRef = this.container.createComponent(this.component);
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
