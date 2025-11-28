/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: '[ac-ng-scrollable-top-spacer],[acNgScrollableTopSpacer]',
  standalone: false,
  templateUrl: `./ac-ng-scrollable-top-spacer.component.html`,
  styles: [``],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AcNgScrollableTopSpacerComponent {
  @Input() height: number = 0;


  @HostBinding('style.height')
  get hostHeight(): string {
    return `${this.height}px`;
  }

  constructor() {
    console.log(this);
  }

}
