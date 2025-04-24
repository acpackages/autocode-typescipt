import { AfterViewInit, Directive } from '@angular/core';
import { AcBase } from '../_base/ac-base.component';

@Directive({
  selector: '[acCommentElementTag]'
})
export class AcCommentElementTagDirective extends AcBase implements AfterViewInit{
  commentElementTag = true;
}
