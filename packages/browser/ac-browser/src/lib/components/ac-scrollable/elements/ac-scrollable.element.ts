/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDelayedCallback, Autocode } from "@autocode-ts/autocode";
import { IAcScrollableOptions } from "../interfaces/ac-scrollable-options.inteface";
import { IAcScrollingElement } from "../interfaces/ac-scrolling-element.interface";
import { AcScrollableAttributeName } from "../consts/ac-scrollable-attribute-name.const";

/**
 * AcScrollable - High-Performance Virtual Scrolling Engine
 * Designed for 60fps scrolling with minimal DOM churn and subpixel precision.
 * 
 * Architecture:
 * - O(log N) range detection via cumulative height mapping and binary search.
 * - Minimal DOM reconciliation: Incremental add/remove instead of innerHTML reset.
 * - Absolute positioning stabilization: Prevents layout shifts and browser scroll jitter.
 * - Frame-aligned updates via RequestAnimationFrame.
 */
export class AcScrollable {
  private element: HTMLElement;
  private options: IAcScrollableOptions;
  
  // State
  private items: any[] = [];
  private scrollingElements: IAcScrollingElement[] = [];
  private heights: number[] = [];
  private cumulativeHeights: number[] = [];
  private totalContentHeight: number = 0;
  
  // DOM Management
  private activeNodes = new Map<number, HTMLElement>(); // index -> node
  private heightSealer: HTMLElement;
  
  // Viewport
  private scrollTop: number = 0;
  private viewportHeight: number = 0;
  private lastRange: { start: number; end: number } = { start: -1, end: -1 };
  
  // Observers & Performance
  private elementResizeObserver!: ResizeObserver;
  private itemResizeObserver!: ResizeObserver;
  private mutationObserver!: MutationObserver;
  private scrollRafId: number | null = null;
  private isRendering = false;
  private isWorking = true;
  private delayedCallback = new AcDelayedCallback();
  private heightCache = new Map<any, number>();

  constructor({ element, options = {} }: { element: HTMLElement, options?: IAcScrollableOptions }) {
    this.element = element;
    this.options = {
      bufferCount: 5,
      topBufferCount: options.topBufferCount ?? options.bufferCount ?? 5,
      bottomBufferCount: options.bottomBufferCount ?? options.bufferCount ?? 5,
      bottomThreshold: options.bottomThreshold ?? 0,
      elementHeight: 50,
      ...options
    };

    // Initialize Container
    this.element.style.overflowY = "auto";
    this.element.style.position = "relative";
    this.viewportHeight = this.element.clientHeight || this.options.elementHeight || 50;

    // Create persistent height sealer
    this.heightSealer = document.createElement("div");
    this.heightSealer.setAttribute(AcScrollableAttributeName.acScrollingSpacer, '');
    this.heightSealer.style.position = "absolute";
    this.heightSealer.style.width = "1px";
    this.heightSealer.style.left = "0";
    this.heightSealer.style.top = "0";
    this.heightSealer.style.pointerEvents = "none";
    this.heightSealer.style.visibility = "hidden";
    this.element.appendChild(this.heightSealer);

    this.element.addEventListener("scroll", () => this.handleScroll(), { passive: true });
    
    this.initObservers();
    
    if (this.element.children.length > 1) { // 1 is the sealer
      this.registerExistingElements();
    }
  }

  // --- Public API ---

  public setItems(items: any[]) {
    this.items = items;
    this.scrollingElements = [];
    this.updateHeights();
    this.render(true);
  }

  public addItem(item: any) {
    if (item instanceof HTMLElement) {
      this.addElement({ element: item });
    } else {
      this.items.push(item);
      this.updateHeights();
      this.render(true);
    }
  }

  public addElement({ element }: { element: HTMLElement }) {
    const height = this.measureElement(element);
    this.registerScrollingElement({ element, height });
    this.updateHeights();
    this.render(true);
  }

  public moveElement({ fromIndex, toIndex }: { fromIndex: number, toIndex: number }) {
    const list = this.items.length > 0 ? this.items : this.scrollingElements;
    if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) return;

    const [moved] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, moved);

    if (this.items.length === 0) {
      this.reindexScrollingElements();
    }

    this.updateHeights();
    this.render(true);
  }

  public removeElement({ index, id, element }: { index?: number, id?: string, element?: HTMLElement }) {
    const isDataMode = this.items.length > 0;
    const list = isDataMode ? this.items : this.scrollingElements;

    if (index === undefined) {
      if (element) index = isDataMode ? list.indexOf(element) : list.findIndex(se => se.element === element);
      else if (id && !isDataMode) index = list.findIndex(se => se.id === id);
    }

    if (index !== undefined && index >= 0 && index < list.length) {
      const removed = list.splice(index, 1)[0];
      if (!isDataMode && removed) {
        this.itemResizeObserver.unobserve(removed.element);
        removed.element.remove();
        this.reindexScrollingElements();
      }
      this.updateHeights();
      this.render(true);
    }
  }

  public replaceElementAt({ index, newElement }: { index: number, newElement: any }) {
    if (this.items.length > 0) {
      if (index < 0 || index >= this.items.length) return;
      this.items[index] = newElement;
    } else {
      if (index < 0 || index >= this.scrollingElements.length) return;
      const old = this.scrollingElements[index];
      this.itemResizeObserver.unobserve(old.element);
      const height = this.measureElement(newElement);
      this.scrollingElements[index] = { ...old, element: newElement, height };
      this.itemResizeObserver.observe(newElement);
    }
    this.updateHeights();
    this.render(true);
  }

  public scrollTo({ index, element }: { index?: number, element?: HTMLElement }) {
    if (index === undefined && element) {
      index = this.items.length > 0 ? this.items.indexOf(element) : this.scrollingElements.findIndex(se => se.element === element);
    }

    if (index !== undefined && index >= 0 && index < this.cumulativeHeights.length - 1) {
      this.element.scrollTop = this.cumulativeHeights[index];
      this.handleScroll();
    }
  }

  public clearAll() {
    this.pause();
    this.items = [];
    this.scrollingElements = [];
    this.heightCache.clear();
    this.heights = [];
    this.cumulativeHeights = [];
    this.activeNodes.forEach(node => node.remove());
    this.activeNodes.clear();
    this.lastRange = { start: -1, end: -1 };
    this.resume();
    this.render(true);
  }

  public pause() {
    this.isWorking = false;
    this.mutationObserver?.disconnect();
    this.itemResizeObserver?.disconnect();
    this.elementResizeObserver?.disconnect();
  }

  public resume() {
    this.isWorking = true;
    this.initObservers();
  }

  // --- Core Logic ---

  private handleScroll() {
    if (!this.isWorking) return;
    
    if (this.scrollRafId) cancelAnimationFrame(this.scrollRafId);
    
    this.scrollRafId = requestAnimationFrame(() => {
      if (this.isRendering) return;
      
      const newScrollTop = this.element.scrollTop;
      if (Math.abs(this.scrollTop - newScrollTop) < 0.1) return;
      
      this.scrollTop = newScrollTop;
      this.render();
      this.scrollRafId = null;
    });
  }

  private updateHeights() {
    const count = this.items.length > 0 ? this.items.length : this.scrollingElements.length;
    this.heights = new Array(count);
    this.cumulativeHeights = new Array(count + 1);
    this.cumulativeHeights[0] = 0;

    const isFixedHeight = this.options.enableFixedHeight && this.options.itemSize;
    let total = 0;

    for (let i = 0; i < count; i++) {
      let h = this.options.itemSize || this.options.elementHeight || 50;
      
      if (!isFixedHeight) {
        if (this.items.length > 0) {
          const item = this.items[i];
          h = this.heightCache.get(item) ?? this.measureItem(item, i);
          this.heightCache.set(item, h);
        } else {
          h = this.scrollingElements[i].height;
        }
      }
      
      this.heights[i] = h;
      total += h;
      this.cumulativeHeights[i + 1] = total;
    }

    this.totalContentHeight = total + (this.options.bottomThreshold ?? 0);
    this.heightSealer.style.height = this.totalContentHeight + "px";
  }

  private findIndexAt(y: number): number {
    let low = 0;
    let high = this.cumulativeHeights.length - 2;
    
    while (low <= high) {
      const mid = (low + high) >> 1;
      if (y < this.cumulativeHeights[mid]) high = mid - 1;
      else if (y >= this.cumulativeHeights[mid + 1]) low = mid + 1;
      else return mid;
    }
    return low;
  }

  private render(force = false) {
    if (!this.isWorking) return;
    this.isRendering = true;

    const totalCount = this.heights.length;
    if (totalCount === 0) {
      this.clearDOM();
      this.finishRender();
      return;
    }

    // Binary search for range
    let start = this.findIndexAt(this.scrollTop);
    let end = this.findIndexAt(this.scrollTop + this.viewportHeight + 1); // 1px overshoot

    // Apply buffers
    const tBuf = this.options.topBufferCount ?? this.options.bufferCount ?? 2;
    const bBuf = this.options.bottomBufferCount ?? this.options.bufferCount ?? 2;
    
    start = Math.max(0, start - tBuf);
    end = Math.min(totalCount - 1, end + bBuf);

    if (!force && start === this.lastRange.start && end === this.lastRange.end) {
      this.finishRender();
      return;
    }

    // Simple Reconciliation
    const nextNodes = new Map<number, HTMLElement>();
    
    // 1. Identify and keep/create nodes for new range
    for (let i = start; i <= end; i++) {
      let node = this.activeNodes.get(i);
      if (!node) {
        node = this.createNode(i);
        this.element.appendChild(node);
      }
      
      node.style.top = this.cumulativeHeights[i] + "px";
      node.style.position = "absolute";
      node.style.width = "100%";
      node.style.left = "0";
      nextNodes.set(i, node);
      this.activeNodes.delete(i);
    }

    // 2. Clear nodes that left the range
    this.activeNodes.forEach(node => node.remove());
    this.activeNodes = nextNodes;
    this.lastRange = { start, end };

    this.finishRender();
  }

  private finishRender() {
    this.delayedCallback.add({
      callback: () => {
        this.isRendering = false;
      }, duration: 16 // One frame
    });
  }

  private clearDOM() {
    this.activeNodes.forEach(node => node.remove());
    this.activeNodes.clear();
    this.lastRange = { start: -1, end: -1 };
  }

  private createNode(index: number): HTMLElement {
    if (this.items.length > 0 && this.options.itemTemplate) {
      return this.options.itemTemplate(this.items[index], index);
    }
    return this.scrollingElements[index].element;
  }

  // --- Utilities ---

  private measureItem(item: any, index: number): number {
    if (!this.options.itemTemplate) return this.options.elementHeight || 50;
    const el = this.options.itemTemplate(item, index);
    return this.measureElement(el);
  }

  private measureElement(el: HTMLElement): number {
    el.style.visibility = "hidden";
    el.style.position = "absolute";
    el.style.top = "-10000px";
    el.style.width = this.element.clientWidth + "px";
    this.element.appendChild(el);
    const h = el.getBoundingClientRect().height;
    this.element.removeChild(el);
    return h || this.options.elementHeight || 50;
  }

  private initObservers() {
    this.itemResizeObserver = new ResizeObserver((entries) => {
      if (this.isRendering || this.items.length > 0) return;
      let changed = false;
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).getAttribute(AcScrollableAttributeName.acScrollingElementId);
        const se = this.scrollingElements.find(s => s.id === id);
        const h = entry.contentRect.height;
        if (se && Math.abs(se.height - h) > 0.5) {
          se.height = h;
          changed = true;
        }
      }
      if (changed) {
        this.updateHeights();
        this.render(true);
      }
    });

    this.elementResizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = entry.contentRect.height;
        if (Math.abs(this.viewportHeight - h) > 0.5) {
          this.viewportHeight = h;
          this.render(true);
        }
      }
    });

    this.mutationObserver = new MutationObserver((mutations) => {
      if (this.isRendering || this.items.length > 0) return;
      let needsUpdate = false;
      for (const m of mutations) {
        m.addedNodes.forEach(n => {
          if (n instanceof HTMLElement && !n.hasAttribute(AcScrollableAttributeName.acScrollingSpacer) && !n.hasAttribute(AcScrollableAttributeName.acScrollingElementId)) {
            this.registerScrollingElement({ element: n, height: this.measureElement(n) });
            needsUpdate = true;
          }
        });
      }
      if (needsUpdate) {
        this.updateHeights();
        this.render(true);
      }
    });

    this.elementResizeObserver.observe(this.element);
    this.mutationObserver.observe(this.element, { childList: true });
    this.scrollingElements.forEach(se => this.itemResizeObserver.observe(se.element));
  }

  private registerScrollingElement(data: Partial<IAcScrollingElement> & { element: HTMLElement, height: number }) {
    if (this.scrollingElements.some(se => se.element === data.element)) return;
    const id = Autocode.uuid();
    data.element.setAttribute(AcScrollableAttributeName.acScrollingElementId, id);
    const se: IAcScrollingElement = {
      element: data.element,
      id,
      index: data.index ?? this.scrollingElements.length,
      height: data.height
    };
    this.scrollingElements.push(se);
    this.itemResizeObserver?.observe(data.element);
  }

  private reindexScrollingElements() {
    this.scrollingElements.forEach((se, i) => se.index = i);
  }

  private registerExistingElements() {
    this.scrollingElements = [];
    Array.from(this.element.children).forEach((el, i) => {
      if (el instanceof HTMLElement && !el.hasAttribute(AcScrollableAttributeName.acScrollingSpacer)) {
        this.registerScrollingElement({ element: el, height: this.measureElement(el), index: i });
      }
    });
    this.element.innerHTML = "";
    this.element.appendChild(this.heightSealer);
    this.updateHeights();
    this.render(true);
  }
}
