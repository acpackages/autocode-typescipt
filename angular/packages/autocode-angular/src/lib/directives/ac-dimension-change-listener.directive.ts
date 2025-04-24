import { Directive, ElementRef, NgZone, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AcBase } from '../_base/ac-base.component';
import { AutocodeService } from '../services/autocode.service';

@Directive({
  selector: '[acDimensionChangeListener]'
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

  constructor(private element: ElementRef,autocodeAngular:AutocodeService, private ngZone: NgZone) {
    super(element,autocodeAngular);
    this.observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        let dimension = entry.target.getBoundingClientRect();
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

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
