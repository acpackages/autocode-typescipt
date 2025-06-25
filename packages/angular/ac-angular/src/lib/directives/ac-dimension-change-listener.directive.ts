/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { AcBase } from '../_base/ac-base.component';
import { AutocodeService } from '../services/autocode.service';

@Directive({
  selector: '[acDimensionChangeListener]',
  standalone:false
})
export class AcDimensionChangeListenerDirective extends AcBase{
  @Output() onDimensionChange = new EventEmitter<{ width: number; height: number }>();
  @Output() onHeightChange = new EventEmitter<{ height: number }>();
  @Output() onWidthChange = new EventEmitter<{ width: number; }>();
  oldHeight:number = 0;
  oldWidth:number = 0;

  height:number = 0;
  width:number = 0;

  private observer: ResizeObserver;

  constructor(private element: ElementRef,autocodeService:AutocodeService, private ngZone: NgZone) {
    super(element,autocodeService);
    this.observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const dimension = entry.target.getBoundingClientRect();
        const { width, height } = {width:dimension.width,height:dimension.height};
        // Run inside Angular zone to avoid change detection issues
        this.ngZone.run(() => this.onDimensionChange.emit({ width, height }));
        if(this.oldHeight != height){
          this.onHeightChange.emit({height});
        }
        if(this.oldWidth != width){
          this.onWidthChange.emit({width});
        }
        this.oldHeight = height;
        this.oldWidth = width;
      }
    });

    this.observer.observe(this.element.nativeElement);
  }

  override ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
