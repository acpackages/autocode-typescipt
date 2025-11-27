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
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ChangeDetectorRef,
  Renderer2,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TrackByFunction } from '@angular/core';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

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
  selector: 'ac-ng-scrollable',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  templateUrl: `./ac-ng-scrollable.component.html`,
  styles: [`
    .top-spacer, .bottom-spacer {
      flex-shrink: 0;
      pointer-events: none;
    }
    .viewport {
      height: 100%;
      width: 100%;
    }
  `],
})
export class AcNgScrollableComponent<T> implements AfterViewInit, OnChanges, OnDestroy {
  @Input() items: T[] = [];
  @Input() options?: IAcNgScrollableOptions;
  @Input() trackBy: TrackByFunction<T> = (index: number, item: T) => index;
  @Input() itemHeightFallback: number = 50;

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<{ $implicit: T; index: number }>;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;
  @ViewChild('measurer', { read: ViewContainerRef, static: true }) measurerVc!: ViewContainerRef;

  @Output() onScroll = new EventEmitter<ScrollEvent>();

  private scrollTop = 0;
  private elementHeight = 0;
  private heights: number[] = [];
  private heightCache = new Map<string, number>();
  private startIndex = 0;
  private endIndex = 0;
  topSpacerHeight = 0;
  bottomSpacerHeight = 0;
  visibleIndices: number[] = [];
  private resizeObserver?: ResizeObserver;
  private rafId?: number;

  get useCdk(): boolean {
    return !!this.options?.enableCdk && !!this.options?.itemSize;
  }

  get itemSizeForCdk(): number {
    return this.options?.itemSize ?? this.fallbackHeight;
  }

  get bufferPx(): number {
    return (this.options?.bufferCount ?? 2) * this.itemSizeForCdk;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.elementHeight = this.scrollContainer?.nativeElement.clientHeight || 0;
      this.initResizeObserver();
      this.onItemsChange(); // Initial setup
      this.cdr.markForCheck();
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

  handleScroll() {
    if (this.useCdk || !this.scrollContainer) return;
    this.scrollTop = this.scrollContainer.nativeElement.scrollTop;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => {
      this.updateVisibleRange();
      this.onScroll.emit({
        scrollTop: this.scrollTop,
        visibleRange: { startIndex: this.startIndex, endIndex: this.endIndex }
      });
      this.cdr.markForCheck();
    });
  }

  handleCdkScroll(event: { start: number; end: number }|any) {
    this.startIndex = event.start;
    this.endIndex = event.end;
    if (this.viewport) {
      this.scrollTop = this.viewport.getElementRef().nativeElement.scrollTop;
    }
    this.onScroll.emit({
      scrollTop: this.scrollTop,
      visibleRange: { startIndex: this.startIndex, endIndex: this.endIndex }
    });
    // No markForCheck needed; CDK manages rendering
  }

  scrollTo({ index }: { index: number }) {
    if (index < 0 || index >= this.items.length) return;
    if (this.useCdk && this.viewport) {
      this.viewport.scrollToIndex(index, 'auto');
      return;
    }
    if (!this.scrollContainer) return;
    const scrollY = this.heights.slice(0, index).reduce((sum, h) => sum + h, 0);
    this.scrollContainer.nativeElement.scrollTop = scrollY;
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

  replaceElementAt({ index, newItem }: { index: number; newItem: T }) {
    if (index < 0 || index >= this.items.length) return;
    const oldItem = this.items[index];
    const oldKey = this.getTrackByKey(index, oldItem);
    this.items[index] = newItem;
    if (!this.useCdk) {
      this.heightCache.delete(oldKey);
    }
    this.onItemsChange();
  }

  private onItemsChange() {
    if (this.useCdk) {
      this.cdr.markForCheck();
      return;
    }
    if (isPlatformBrowser(this.platformId) && this.itemTemplate && this.scrollContainer) {
      this.updateHeights();
    } else {
      this.heights = new Array(this.items.length).fill(this.fallbackHeight);
    }
    this.updateVisibleRange();
    this.cdr.markForCheck();
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
    if (!this.scrollContainer?.nativeElement) return;
    const target = this.useCdk && this.viewport ? this.viewport.getElementRef().nativeElement : this.scrollContainer.nativeElement;
    this.resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const newHeight = entry.contentRect.height;
      if (Math.abs(newHeight - this.elementHeight) > 1) {
        this.elementHeight = newHeight;
        if (!this.useCdk) {
          this.updateVisibleRange();
          this.cdr.markForCheck();
        }
      }
    });
    this.resizeObserver.observe(target);
  }

  private updateHeights() {
    if (this.useCdk) return;
    if (this.useFixedHeight && this.options?.itemSize) {
      this.heights = new Array(this.items.length).fill(this.options.itemSize);
      return;
    }
    this.heights = this.items.map((item, index) => this.getItemHeight(item, index));
  }

  private getItemHeight(item: T, index: number): number {
    const key = this.getTrackByKey(index, item);
    if (this.heightCache.has(key)) {
      return this.heightCache.get(key)!;
    }
    const height = this.measureItemHeight(item, index);
    this.heightCache.set(key, height);
    return height;
  }

  private getTrackByKey(index: number, item: T): string {
    const trackByValue = this.trackBy(index, item);
    return typeof trackByValue === 'string' ? trackByValue : `${index}-${JSON.stringify(item)}`;
  }

  private measureItemHeight(item: T, index: number): number {
    if (!this.itemTemplate || !this.scrollContainer || !isPlatformBrowser(this.platformId)) {
      return this.fallbackHeight;
    }

    const context = { $implicit: item, index };
    const viewRef = this.measurerVc.createEmbeddedView(this.itemTemplate, context);

    const tempDiv = this.renderer.createElement('div');
    this.renderer.setStyle(tempDiv, 'position', 'absolute');
    this.renderer.setStyle(tempDiv, 'top', '-10000px');
    this.renderer.setStyle(tempDiv, 'left', '-10000px');
    this.renderer.setStyle(tempDiv, 'width', `${this.scrollContainer.nativeElement.clientWidth}px`);
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
    if (this.useCdk || this.heights.length === 0 || this.elementHeight === 0) {
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
    if (!this.useCdk) {
      this.heights = [];
      this.heightCache.clear();
      this.updateVisibleRange();
    }
    this.cdr.markForCheck();
  }

  pause() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.style.overflowY = 'hidden';
    }
  }

  resume() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.style.overflowY = this.useCdk ? 'hidden' : 'auto';
    }
    if (this.scrollContainer && isPlatformBrowser(this.platformId)) {
      this.initResizeObserver();
    }
  }
}
