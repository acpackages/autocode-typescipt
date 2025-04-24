import { AcEvents, AcLogger } from '@ac_packages/autocode';
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { AutocodeService } from '../services/autocode.service';
@Directive()
export class AcBase {
  @Output() onDestroy: EventEmitter<any> = new EventEmitter();
  @Output() onInit: EventEmitter<any> = new EventEmitter();
  @Output() onViewInit: EventEmitter<any> = new EventEmitter();

  commentElementTag:boolean = false;
  elementChildren:HTMLElement[] = [];
  events:AcEvents = new AcEvents();
  logger:AcLogger = new AcLogger();

  constructor(protected elementRef:ElementRef,protected autocodeAngular:AutocodeService){
  }

  ngAfterViewInit(){
    if(this.commentElementTag){
      this.commentTag();
    }
    let event:any = {
      instance:this
    };
    this.onViewInit.emit(event);
    this.events.execute("viewInit",event);
  }

  ngOnDestroy(){
    for(let element of this.elementChildren){
      element.remove();
    }
    let event:any = {
      instance:this
    };
    this.onDestroy.emit(event);
    this.events.execute("destroy",event);
  }

  ngOnInit(){
    let event:any = {
      instance:this
    };
    this.onInit.emit(event);
    this.events.execute("init",event);
  }

  commentTag(){
    if(this.elementRef){
      for(let element of this.elementRef.nativeElement.children){
        this.elementChildren.push(element);
      }
      this.autocodeAngular.commentElementTag(this.elementRef);
      this.events.execute("elementTagCommented");
    }
    else{
      setTimeout(() => {
        this.commentTag();
      }, 100);
    }
  }

  on(event:string,callback:Function){
    return this.events.register(event,callback);
  }







}
