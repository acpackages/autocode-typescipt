/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, Input,ChangeDetectionStrategy, ContentChild, TemplateRef} from '@angular/core';
import { AcNgScrollableComponent } from '../ac-ng-scrollable/ac-ng-scrollable.component';

@Component({
  selector: '[ac-ng-scrollable-body],[acNgScrollableBody]',
  standalone: false,
  templateUrl: `./ac-ng-scrollable-body.component.html`,
  styles: [``],
})
export class AcNgScrollableBodyComponent  {
  @Input() scrollable!: AcNgScrollableComponent;
  @Input() visibleIndices: number[] = [];
  @Input() items: any[] = [];
  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{ $implicit: any; index: number }>;

  trackByVisibleIndex = (idx: number, i: number) => i;

    constructor() {
      //
    }
}
