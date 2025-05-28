/* eslint-disable prefer-const */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Output, EventEmitter } from '@angular/core';
import { AcBase } from '../_base/ac-base.component';

@Directive({
  selector: '[acElementViewportListener]',
})
export class AcElementViewportListenerDirective extends AcBase {
  @Output() onViewChange: EventEmitter<IViewChangeEvent> = new EventEmitter<IViewChangeEvent>();

  private observer: IntersectionObserver | undefined;

  override ngOnInit() {
    super.ngOnInit();
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        let event:IViewChangeEvent = {
          isVisible:entry.isIntersecting
        };
        this.onViewChange.emit(event);
        this.events.execute({eventName:"viewChange",args:event});
      });
    });
    this.observer.observe(this.elementRef.nativeElement);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.observer!.disconnect();
  }

}

export interface IViewChangeEvent {
  isVisible?:boolean
}
