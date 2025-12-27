/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable prefer-const */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, Output, EventEmitter } from '@angular/core';
import { AcBase } from '../_base/ac-base.component';
import { acNullifyInstanceProperties } from '@autocode-ts/autocode';

@Directive({
  selector: '[acElementViewportListener]',
  standalone:false
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
        this.events.execute({event:"viewChange",args:event});
      });
    });
    this.observer.observe(this.elementRef.nativeElement);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.observer!.disconnect();
    acNullifyInstanceProperties({instance:this});
  }

}

export interface IViewChangeEvent {
  isVisible?:boolean
}
