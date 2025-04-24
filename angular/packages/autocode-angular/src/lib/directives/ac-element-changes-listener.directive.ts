import { AcEvents } from '@ac_packages/autocode';
import { Directive,AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { AcBase } from '../_base/ac-base.component';

@Directive({
  selector: '[acElementChangesListener]'
})
export class AcElementChangesListenerDirective extends AcBase {
  @Output() onViewInit: EventEmitter<IViewInitEvent> = new EventEmitter<IViewInitEvent>();


  ngAfterViewInit() {
    let object = this;
    let event:IViewInitEvent = {
      elementRef:this.elementRef,
      nativeElement:this.elementRef.nativeElement,
    }
    this.onViewInit.emit(event);
    this.events.execute("viewInit",event);
  }

}

export interface IViewInitEvent{
  elementRef:ElementRef,
  nativeElement:any,
}
