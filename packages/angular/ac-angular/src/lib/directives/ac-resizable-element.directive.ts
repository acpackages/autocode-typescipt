/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Renderer2, NgZone, Output, EventEmitter } from '@angular/core';
import { AcBase } from '../_base/ac-base.component';
import { AutocodeService } from '../services/autocode.service';

@Directive({
  selector: '[acResizableElement]',
  standalone:false
})
export class AcResizableElementDirective extends AcBase {
  @Output() onResize = new EventEmitter<{ width: number; height: number }>();

  private resizing = false;
  private element: HTMLElement;
  private resizeHandle!: HTMLDivElement;
  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;

  constructor(elementRef: ElementRef,autocodeService:AutocodeService, private renderer: Renderer2, private ngZone: NgZone) {
    super(elementRef,autocodeService);
    this.element = this.elementRef.nativeElement;
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.createResizeHandle();
  }

  private createResizeHandle(): void {
    this.resizeHandle = this.renderer.createElement('div');
    this.renderer.setStyle(this.resizeHandle, 'width', '3px');
    this.renderer.setStyle(this.resizeHandle, 'height', '25px');
    this.renderer.setStyle(this.resizeHandle, 'float', 'right');
    this.renderer.setStyle(this.resizeHandle, 'cursor', 'col-resize');
    this.renderer.setStyle(this.resizeHandle, 'margin-right', '-2px');
    this.renderer.setStyle(this.resizeHandle, 'background', 'rgba(0, 0, 0, 0)');
    this.renderer.appendChild(this.element, this.resizeHandle);
    this.renderer.listen(this.resizeHandle, 'mousedown', (event: MouseEvent) => this.startResize(event));
  }

  private startResize(event: MouseEvent): void {
    event.preventDefault();
    this.resizing = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.startWidth = this.element.offsetWidth;
    this.startHeight = this.element.offsetHeight;

    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    });
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.resizing) return;

    const newWidth = this.startWidth + (event.clientX - this.startX);
    const newHeight = this.startHeight + (event.clientY - this.startY);

    this.renderer.setStyle(this.element, 'width', `${newWidth}px`);
    // this.renderer.setStyle(this.element, 'height', `${newHeight}px`);

    this.ngZone.run(() => this.onResize.emit({ width: newWidth, height: newHeight }));
  };

  private handleMouseUp = () => {
    this.resizing = false;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };
}
