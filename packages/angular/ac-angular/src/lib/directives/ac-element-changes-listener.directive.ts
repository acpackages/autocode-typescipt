/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
import { AcBase } from '../_base/ac-base.component';

@Directive({
  selector: '[acElementChangesListener]'
})
export class AcElementChangesListenerDirective extends AcBase {
  @Output() override onViewInit: EventEmitter<IViewInitEvent> = new EventEmitter<IViewInitEvent>();


  override ngAfterViewInit() {
    const object = this;
    const event:IViewInitEvent = {
      elementRef:this.elementRef,
      nativeElement:this.elementRef.nativeElement,
    }
    this.onViewInit.emit(event);
    this.events.execute({eventName:"viewInit",args:event});
  }

}

export interface IViewInitEvent{
  elementRef:ElementRef,
  nativeElement:any,
}
