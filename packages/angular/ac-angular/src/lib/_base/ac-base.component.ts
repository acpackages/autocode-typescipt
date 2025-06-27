/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { AcEvents, AcLogger } from '@autocode-ts/autocode';
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
    this.events.execute({eventName:"viewInit",args:event});
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
    this.events.execute({eventName:"destroy",args:event});
  }

  ngOnInit(){
    const event:any = {
      instance:this
    };
    this.onInit.emit(event);
    this.events.execute({eventName:"init",args:event});
    this.instanceInitialized = true;
  }

  commentTag(){
    if(this.elementRef){
      for(const element of this.elementRef.nativeElement.children){
        this.elementChildren.push(element);
      }
      this.autocodeService.commentElementTag(this.elementRef);
      this.events.execute({eventName:"elementTagCommented"});
    }
    else{
      setTimeout(() => {
        this.commentTag();
      }, 100);
    }
  }

  on(event:string,callback:Function){
    return this.events.subscribe({eventName:event,callback:callback});
  }







}
