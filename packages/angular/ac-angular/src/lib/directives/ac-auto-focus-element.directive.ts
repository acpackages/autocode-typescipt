/* eslint-disable @angular-eslint/directive-selector */
import { AfterViewInit, Directive } from '@angular/core';
import { AcBase } from '../_base/ac-base.component';

@Directive({
  selector: '[acAutoFocusElement]'
})
export class AcAutoFocusElementDirective extends AcBase implements AfterViewInit{

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.elementRef.nativeElement.focus();
  }

}
