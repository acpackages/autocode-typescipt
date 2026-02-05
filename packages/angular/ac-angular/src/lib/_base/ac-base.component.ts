/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { AcDelayedCallback, AcEvents, AcLogger } from '@autocode-ts/autocode';
import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AutocodeService } from '../services/autocode.service';
@Directive()
export class AcBase implements AfterViewInit,OnDestroy,OnInit {
  @Output() onDestroy: EventEmitter<any> = new EventEmitter();
  @Output() onInit: EventEmitter<any> = new EventEmitter();
  @Output() onViewInit: EventEmitter<any> = new EventEmitter();

  commentElementTag:boolean = false;
  elementChildren:HTMLElement[] = [];
  events:AcEvents = new AcEvents();
  logger:AcLogger = new AcLogger();
  instanceInitialized:boolean = false;
  instanceViewInitialized:boolean = false;
  delayedCallback:AcDelayedCallback = new AcDelayedCallback();

  constructor(protected elementRef:ElementRef,protected autocodeService:AutocodeService){
  }

  ngAfterViewInit(){
    if(this.commentElementTag){
      this.commentTag();
    }
    const event:any = {
      instance:this
    };
    this.onViewInit.emit(event);
    this.events.execute({event:"viewInit",args:event});
    this.instanceViewInitialized = true;
  }

  ngOnDestroy(){
    for(const element of this.elementChildren){
      element.remove();
    }
    const event:any = {
      instance:this
    };
    this.onDestroy.emit(event);
    this.events.execute({event:"destroy",args:event});
  }

  ngOnInit(){
    const event:any = {
      instance:this
    };
    this.onInit.emit(event);
    this.events.execute({event:"init",args:event});
    this.instanceInitialized = true;
  }

  commentTag(){
    if(this.elementRef){
      for(const element of this.elementRef.nativeElement.children){
        this.elementChildren.push(element);
      }
      this.autocodeService.commentElementTag(this.elementRef);
      this.events.execute({event:"elementTagCommented"});
    }
    else{
      this.delayedCallback.add({callback:() => {
        this.commentTag();
      }, duration:100,key:'commentTag'});
    }
  }

  on({event,callback}:{event:string,callback:Function}):string{
    return this.events.subscribe({event:event,callback:callback});
  }

}
