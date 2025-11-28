/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  AfterViewInit,
  AfterContentInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ChangeDetectorRef,
  Renderer2,
  Inject,
  PLATFORM_ID,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TrackByFunction } from '@angular/core';
import { AcNgScrollableBodyComponent } from '../ac-ng-scrollable-body/ac-ng-scrollable-body.component';
import { AcNgScrollableTopSpacerComponent } from '../ac-ng-scrollable-top-spacer/ac-ng-scrollable-top-spacer.component';
import { AcNgScrollableBottomSpacerComponent } from '../ac-ng-scrollable-bottom-spacer/ac-ng-scrollable-bottom-spacer.component';

export interface IAcNgScrollableOptions {
  bufferCount?: number;
  elementHeight?: number;
  itemSize?: number; // For fixed-height optimization (required for CDK mode)
  enableFixedHeight?: boolean; // Toggle for fixed vs dynamic heights in custom mode
  enableCdk?: boolean; // Enable Angular CDK virtual scrolling (assumes fixed itemSize)
}

interface ScrollEvent {
  scrollTop: number;
  visibleRange: { startIndex: number; endIndex: number };
}

@Component({
  selector: 'ac-ng-scrollable,[ac-ng-scrollable]',
  standalone: false,
  templateUrl: `./ac-ng-scrollable.component.html`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcNgScrollableComponent implements AfterViewInit, AfterContentInit, OnChanges, OnDestroy {
  @Input() items: any[] = [];
  @Input() options?: IAcNgScrollableOptions;
  @Input() trackBy: TrackByFunction<any> = (index: number, item: any) => index;
  @Input() itemHeightFallback: number = 50;
  @ContentChild(AcNgScrollableBodyComponent) bodyComponent!: AcNgScrollableBodyComponent;
  @ContentChild(AcNgScrollableTopSpacerComponent) topSpacerComponent!: AcNgScrollableTopSpacerComponent;
  @ContentChild(AcNgScrollableBottomSpacerComponent) bottomSpacerComponent!: AcNgScrollableBottomSpacerComponent;

  @ViewChild('measurer', { read: ViewContainerRef, static: true }) measurerVc!: ViewContainerRef;

  @Output() onScroll = new EventEmitter<ScrollEvent>();

  private _visibleIndices: number[] = [];
  get visibleIndices(): number[] {
    return this._visibleIndices;
  }
  set visibleIndices(value: number[]) {
    this._visibleIndices = value;
    if (this.bodyComponent) {
      this.bodyComponent.visibleIndices = this._visibleIndices;
    }
  }

  private _topSpacerHeight: number = 0;
  get topSpacerHeight(): number {
    return this._topSpacerHeight;
  }
  set topSpacerHeight(value: number) {
    this._topSpacerHeight = value;
    if (this.topSpacerComponent) {
      this.topSpacerComponent.height = this._topSpacerHeight;
    }
  }


  private _bottomSpacerHeight: number = 0;
  get bottomSpacerHeight(): number {
    return this._bottomSpacerHeight;
  }
  set bottomSpacerHeight(value: number) {
    this._bottomSpacerHeight = value;
    if (this.bottomSpacerComponent) {
      this.bottomSpacerComponent.height = this._bottomSpacerHeight;
    }
  }


  private scrollTop = 0;
  private elementHeight = 0;
  private heights: number[] = [];
  private heightCache = new Map<string, number>();
  private startIndex = 0;
  private endIndex = 0;
  hasBottomSpacerTemplate: boolean = false;
  hasTopSpacerTemplate: boolean = false;
  private resizeObserver?: ResizeObserver;
  private rafId?: number;



  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log(this);
  }

  get itemSizeForCdk(): number {
    return this.options?.itemSize ?? this.fallbackHeight;
  }

  get bufferPx(): number {
    return (this.options?.bufferCount ?? 2) * this.itemSizeForCdk;
  }

  private get scrollableElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  @HostBinding('style.overflowY')
  get hostOverflowY(): string {
    return 'auto';
  }

  private templateMap = new Map<string, TemplateRef<any>>();

  @HostListener('scroll')
  onHostScroll() {
    this.handleScroll();
  }

  ngAfterContentInit() {
    if (this.bodyComponent) {
      this.bodyComponent.scrollable = this;
      this.bodyComponent.items = this.items;
      this.bodyComponent.trackByVisibleIndex = this.trackByVisibleIndex;
      this.bodyComponent.visibleIndices = this.visibleIndices;
    }
    if (this.topSpacerComponent) {
      this.topSpacerComponent.height = this.topSpacerHeight;
    }
    if (this.bottomSpacerComponent) {
      this.bottomSpacerComponent.height = this.bottomSpacerHeight;
    }
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.elementHeight = this.scrollableElement.clientHeight || 400;
        this.initResizeObserver();
        this.onItemsChange();
        this.cdr.detectChanges(); // Force render after init
      }, 0);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] && !changes['items'].firstChange) {
      this.onItemsChange();
    }
    if (changes['options']) {
      this.onItemsChange(); // Re-eval useCdk, heights, etc.
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  getTemplate(name: string): TemplateRef<any> | null {
    return this.templateMap.get(name) ?? null;
  }

  handleScroll() {
    this.scrollTop = this.elementRef.nativeElement.scrollTop;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => {
      this.updateVisibleRange();
      this.onScroll.emit({
        scrollTop: this.scrollTop,
        visibleRange: { startIndex: this.startIndex, endIndex: this.endIndex }
      });
      this.cdr.detectChanges(); // Force update for custom mode
    });
  }

  scrollTo({ index }: { index: number }) {
    if (index < 0 || index >= this.items.length) return;
    const scrollY = this.heights.slice(0, index).reduce((sum, h) => sum + h, 0);
    this.elementRef.nativeElement.scrollTop = scrollY;
    this.handleScroll();
  }

  moveElement({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) {
    if (
      fromIndex < 0 ||
      fromIndex >= this.items.length ||
      toIndex < 0 ||
      toIndex >= this.items.length
    ) {
      return;
    }
    const [movedItem] = this.items.splice(fromIndex, 1);
    this.items.splice(toIndex, 0, movedItem);
    this.onItemsChange();
  }

  replaceElementAt({ index, newItem }: { index: number; newItem: any }) {
    if (index < 0 || index >= this.items.length) return;
    const oldItem = this.items[index];
    const oldKey = this.getTrackByKey(index, oldItem);
    this.items[index] = newItem;
    this.onItemsChange();
  }

  private onItemsChange() {
    if (isPlatformBrowser(this.platformId) && this.getTemplate('item')) {
      this.updateHeights();
    } else {
      this.heights = new Array(this.items.length || 0).fill(this.fallbackHeight);
    }
    this.updateVisibleRange();
    this.cdr.detectChanges(); // Force render for custom mode
  }

  private get bufferCount(): number {
    return this.options?.bufferCount ?? 2;
  }

  private get fallbackHeight(): number {
    return this.options?.elementHeight ?? this.itemHeightFallback;
  }

  private get useFixedHeight(): boolean {
    return this.options?.enableFixedHeight ?? false;
  }

  private initResizeObserver() {
    const target = this.scrollableElement;
    if (!target) return;
    this.resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const newHeight = entry.contentRect.height;
      if (Math.abs(newHeight - this.elementHeight) > 1) {
        this.elementHeight = newHeight;
      }
    });
    this.resizeObserver.observe(target);
  }

  private updateHeights() {
    if (this.useFixedHeight && this.options?.itemSize) {
      this.heights = new Array(this.items.length || 0).fill(this.options.itemSize);
      return;
    }
    if (!this.items || this.items.length === 0) {
      this.heights = [];
      return;
    }
    this.heights = this.items.map((item, index) => this.getItemHeight(item, index));
  }

  private getItemHeight(item: any, index: number): number {
    const key = this.getTrackByKey(index, item);
    if (this.heightCache.has(key)) {
      return this.heightCache.get(key)!;
    }
    const height = this.measureItemHeight(item, index);
    this.heightCache.set(key, height);
    return height;
  }

  private getTrackByKey(index: number, item: any): string {
    const trackByValue = this.trackBy(index, item);
    return typeof trackByValue === 'string' ? trackByValue : `${index}-${JSON.stringify(item)}`;
  }

  private measureItemHeight(item: any, index: number): number {
    if (!this.getTemplate('item') || !isPlatformBrowser(this.platformId)) {
      return this.fallbackHeight;
    }

    const context = { $implicit: item, index };
    const viewRef = this.measurerVc.createEmbeddedView(this.getTemplate('item'), context);

    const width = this.scrollableElement.clientWidth || 300; // Fallback width if 0
    const tempDiv = this.renderer.createElement('div');
    this.renderer.setStyle(tempDiv, 'position', 'absolute');
    this.renderer.setStyle(tempDiv, 'top', '-10000px');
    this.renderer.setStyle(tempDiv, 'left', '-10000px');
    this.renderer.setStyle(tempDiv, 'width', `${width}px`);
    this.renderer.setStyle(tempDiv, 'visibility', 'hidden');
    this.renderer.appendChild(document.body, tempDiv);

    viewRef.rootNodes.forEach((node: Node) => {
      this.renderer.appendChild(tempDiv, node);
    });

    this.cdr.detectChanges();

    const height = tempDiv.offsetHeight || this.fallbackHeight;

    // Cleanup
    viewRef.rootNodes.forEach((node: Node) => {
      if (tempDiv.contains(node as Node)) {
        this.renderer.removeChild(tempDiv, node);
      }
    });
    this.renderer.removeChild(document.body, tempDiv);
    viewRef.destroy();

    return height;
  }

  private updateVisibleRange() {
    if (this.heights.length === 0 || this.elementHeight === 0) {
      this.resetVisibleRange();
      return;
    }

    let start = 0;
    let y = 0;
    for (let i = 0; i < this.heights.length; i++) {
      if (y + this.heights[i] >= this.scrollTop) {
        start = i;
        break;
      }
      y += this.heights[i];
    }

    let end = this.heights.length - 1;
    y = 0;
    for (let i = start; i < this.heights.length; i++) {
      y += this.heights[i];
      if (y >= this.elementHeight) {
        end = i;
        break;
      }
    }

    const buffer = this.bufferCount;
    start = Math.max(0, start - buffer);
    end = Math.min(this.heights.length - 1, end + buffer);

    this.startIndex = start;
    this.endIndex = end;

    this.topSpacerHeight = this.heights.slice(0, start).reduce((sum, h) => sum + h, 0);
    this.bottomSpacerHeight = this.heights.slice(end + 1).reduce((sum, h) => sum + h, 0);

    this.visibleIndices = Array.from({ length: end - start + 1 }, (_, k) => start + k);
  }

  private resetVisibleRange() {
    this.startIndex = 0;
    this.endIndex = -1;
    this.topSpacerHeight = 0;
    this.bottomSpacerHeight = 0;
    this.visibleIndices = [];
  }

  trackByVisibleIndex = (idx: number, i: number) => i;

  clearAll() {
    this.items = [];
    this.cdr.detectChanges();
  }

  pause() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.elementRef.nativeElement.style.overflowY = 'hidden';
  }

  resume() {
    this.elementRef.nativeElement.style.overflowY = 'auto';
    if (isPlatformBrowser(this.platformId)) {
      this.initResizeObserver();
    }
  }
}
