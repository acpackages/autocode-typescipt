/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';

@Component({
  selector: '[ac-ng-scrollable-bottom-spacer],[acNgScrollableBottomSpacer]',
  standalone: false,
  templateUrl: `./ac-ng-scrollable-bottom-spacer.component.html`,
  styles: [``],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AcNgScrollableBottomSpacerComponent {
  @Input() height: number = 0;

   @HostBinding('style.height')
  get hostHeight(): string {
    return `${this.height}px`;
  }
    constructor() {
      //
    }
}
