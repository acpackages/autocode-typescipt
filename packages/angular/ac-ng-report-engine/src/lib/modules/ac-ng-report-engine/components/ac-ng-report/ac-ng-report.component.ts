/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import { AcReport } from '@autocode-ts/ac-report-engine';
import { AcDelayedCallback, acNullifyInstanceProperties } from '@autocode-ts/autocode';


@Component({
  selector: 'ac-ng-report,[ac-ng-report]',
  standalone: false,
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcNgReportComponent implements OnInit, OnDestroy {
  @Input() data: any = {};
  delayedCallback:AcDelayedCallback = new AcDelayedCallback();

  constructor(private elementRef: ElementRef) {
    //
  }

  ngOnDestroy(): void {
    this.delayedCallback.destroy();
    acNullifyInstanceProperties({instance:this});
  }

  ngOnInit() {
    //
    this.setReportContent();
    console.log(this);
  }

  private setReportContent() {
    if (this.elementRef && this.elementRef.nativeElement) {
      const host = this.elementRef.nativeElement;

      const report = new AcReport({
        element: host   // or assignedElements[0]
      });

      console.log(report,this.data);

      report.generate({
        data: this.data
      });
    }
    else {
      this.delayedCallback.add({callback:() => {
        this.setReportContent();
      }, duration:10});
    }
  }
}
