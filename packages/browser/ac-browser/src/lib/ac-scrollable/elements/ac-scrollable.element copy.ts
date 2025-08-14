/**
 * ac-virtual-scroller.ts (renamed: ac-scrollable)
 *
 * Feature-complete AcScrollable
 * - Pass an existing container element to constructor
 * - Auto-detects items (add/remove/move) via MutationObserver
 * - Variable height support via ResizeObserver (per item)
 * - Incremental height recalculation: only changed items are adjusted
 * - Virtualization: only visible items + buffer exist in DOM
 * - Container resize handling via ResizeObserver
 * - Smooth insert/remove animations using CSS transitions
 * - Public API: refresh(), scrollToIndex(), addItem(), removeItem(), destroy()
 *
 * Notes:
 * - This implementation assumes each logical "item" is represented by a DOM element
 *   that is a direct child of the container (not including the internal content wrapper).
 * - Items are positioned absolutely inside an internal content wrapper which has
 *   the total height to drive the native scrollbar.
 */

export interface AcScrollableItem {
  index: number; // logical index (0..n-1)
  element: HTMLElement; // original element provided by user
  height: number; // last measured height
  width: number; // last measured width
  top: number; // cumulative offset from top
  visible?: boolean; // whether currently attached to DOM
}

export interface AcScrollableOptions {
  buffer?: number;        // items to render above/below visible window
  animationDuration?: number; // ms for insert/remove animations
  useTransforms?: boolean; // use translateY for smoother animations
}

export class AcScrollable {
  private container: HTMLElement;
  private content: HTMLElement; // absolute-positioned content wrapper
  private spacer: HTMLElement;  // invisible spacer to provide total height (optional)
  private items: AcScrollableItem[] = [];
  private itemMap = new Map<HTMLElement, AcScrollableItem>();
  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private containerResizeObserver: ResizeObserver | null = null;
  private ticking = false;
  private renderedRange: { start: number; end: number } | null = null;
  private totalHeight = 0;
  private options: Required<AcScrollableOptions>;
  private refreshScheduled = false;

  constructor(container: HTMLElement, options: AcScrollableOptions = {}) {
    this.container = container;
    this.options = {
      buffer: 5,
      animationDuration: options.animationDuration ?? 220,
      useTransforms: options.useTransforms ?? true,
      ...(options || {})
    };

    // prepare container and content wrapper
    this.container.style.position = this.container.style.position || 'relative';
    this.container.style.overflowY = 'auto';

    // content wrapper holds absolutely positioned item wrappers
    this.content = document.createElement('div');
    this.content.className = 'ac-scrollable-content';
    this.content.style.position = 'relative';
    this.content.style.width = '100%';
    this.content.style.willChange = 'transform';

    // spacer provides total scroll height for native scrollbar
    this.spacer = document.createElement('div');
    this.spacer.className = 'ac-scrollable-spacer';
    this.spacer.style.width = '1px';
    this.spacer.style.opacity = '0';

    // Move existing direct children into a temporary list; we'll reattach visible ones
    const children = Array.from(this.container.querySelectorAll(':scope > *'))
      .filter(el => el !== this.content && el !== this.spacer) as HTMLElement[];

    // Clear container and append content+spacer
    this.container.innerHTML = '';
    this.container.appendChild(this.content);
    this.container.appendChild(this.spacer);

    // MutationObserver to auto-detect add/remove/move
    this.mutationObserver = new MutationObserver((mutations) => this.onMutations(mutations));
    this.mutationObserver.observe(this.container, { childList: true });

    // ResizeObservers
    this.resizeObserver = new ResizeObserver((entries) => this.onItemResizes(entries));
    this.containerResizeObserver = new ResizeObserver(() => this.scheduleRender(true));
    this.containerResizeObserver.observe(this.container);

    // Initialize items from the children snapshot
    for (const el of children) this.registerItemElement(el);

    // initial measurement & render
    this.recalculateAllHeights();
    this.scheduleRender(true);

    // scroll listener
    this.container.addEventListener('scroll', this.onScroll, { passive: true });

    // add a minimal style for animations (scoped to elements we create)
    this.injectStyles();
  }

  // ---------------- public API ----------------

  /** Force full refresh (re-measure, re-layout) */
  public refresh() {
    this.recalculateAllHeights();
    this.scheduleRender(true);
  }

  /** Add an element at the end (or call registerItemElement with an existing element) */
  public addItem(element: HTMLElement) {
    // If element already in map, ignore
    if (this.itemMap.has(element)) return;
    this.registerItemElement(element);
    // measure just the new element and adjust following tops
    const last = this.items[this.items.length - 1];
    this.measureSingleItem(last);
    this.updateTopsFromIndex(last.index + 1);
    this.updateTotalHeight();
    // animate insertion by temporarily setting height to 0 then to measured
    this.animateInsert(last);
    this.scheduleRender(true);
  }

  /** Remove an element (by reference). Returns true if removed. */
  public removeItem(element: HTMLElement) {
    const item = this.itemMap.get(element);
    if (!item) return false;

    const idx = item.index;
    // animate removal then remove from arrays on transition end
    this.animateRemove(item).then(() => {
      // splice item
      this.items.splice(idx, 1);
      this.itemMap.delete(element);
      // reindex items and update tops
      for (let i = idx; i < this.items.length; i++) this.items[i].index = i;
      this.updateTopsFromIndex(idx);
      this.updateTotalHeight();
      this.scheduleRender(true);
    });

    return true;
  }

  /** Scroll to the given item index (align top) */
  public scrollToIndex(index: number, behavior: ScrollBehavior = 'auto') {
    index = Math.max(0, Math.min(index, this.items.length - 1));
    const top = this.items[index]?.top || 0;
    this.container.scrollTo({ top, behavior });
  }

  /** Destroy observers and listeners */
  public destroy() {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.containerResizeObserver?.disconnect();
    this.container.removeEventListener('scroll', this.onScroll as EventListener);
    this.items = [];
    this.itemMap.clear();
  }

  // ---------------- internals ----------------

  private injectStyles() {
    // Only once
    if (document.getElementById('ac-scrollable-styles')) return;
    const style = document.createElement('style');
    style.id = 'ac-scrollable-styles';
    style.textContent = `
      .ac-scrollable-item-wrapper {
        position: absolute;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        transition: transform ${this.options.animationDuration}ms ease, opacity ${this.options.animationDuration}ms ease, height ${this.options.animationDuration}ms ease;
        will-change: transform, opacity, height;
      }
      .ac-scrollable-enter {
        opacity: 0; transform: translateY(-6px);
      }
      .ac-scrollable-enter-active {
        opacity: 1; transform: translateY(0);
      }
      .ac-scrollable-leave {
        opacity: 1; transform: translateY(0);
      }
      .ac-scrollable-leave-active {
        opacity: 0; transform: translateY(6px);
      }
    `;
    document.head.appendChild(style);
  }

  private onScroll = () => {
    this.scheduleRender();
  };

  private onMutations(mutations: MutationRecord[]) {
    // We only care about direct children being added/removed/moved
    let changed = false;
    for (const m of mutations) {
      if (m.type === 'childList') {
        // additions
        for (const node of Array.from(m.addedNodes)) {
          if (!(node instanceof HTMLElement)) continue;
          // ignore internal content/spacer
          if (node === this.content || node === this.spacer) continue;
          this.registerItemElement(node);
          changed = true;
        }
        // removals
        for (const node of Array.from(m.removedNodes)) {
          if (!(node instanceof HTMLElement)) continue;
          if (node === this.content || node === this.spacer) continue;
          const item = this.itemMap.get(node);
          if (item) {
            // trigger remove animation and cleanup in callback
            this.animateRemove(item).then(() => {
              const idx = item.index;
              this.items.splice(idx, 1);
              this.itemMap.delete(node);
              for (let i = idx; i < this.items.length; i++) this.items[i].index = i;
              this.updateTopsFromIndex(idx);
              this.updateTotalHeight();
              this.scheduleRender(true);
            });
            changed = true;
          }
        }
      }
    }
    if (changed) this.scheduleRender(true);
  }

  private registerItemElement(el: HTMLElement) {
    // if already registered, we may be dealing with a move — update later
    if (this.itemMap.has(el)) return;

    // append to items list at the end; index will be corrected when recalculating
    const item: AcScrollableItem = {
      index: this.items.length,
      element: el,
      height: 0,
      width: 0,
      top: 0,
      visible: false
    };
    this.items.push(item);
    this.itemMap.set(el, item);
    // observe size changes for this element
    this.resizeObserver?.observe(el);
    // ensure element has no positioning/style that conflicts
    el.style.willChange = 'transform, top';
  }

  private onItemResizes(entries: ResizeObserverEntry[]) {
    // For each entry, update only that item's height and adjust subsequent tops
    let needsRender = false;
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      const item = this.itemMap.get(el);
      if (!item) continue;
      const newHeight = Math.max(0, entry.contentRect.height || el.offsetHeight || 0);
      if (newHeight !== item.height) {
        const diff = newHeight - item.height;
        item.height = newHeight;
        // advance top for following items
        for (let i = item.index + 1; i < this.items.length; i++) this.items[i].top += diff;
        needsRender = true;
      }
    }
    if (needsRender) {
      this.updateTotalHeight();
      this.scheduleRender(true);
    }
  }

  private recalculateAllHeights() {
    // Measure heights for all items and compute tops
    let top = 0;
    for (let i = 0; i < this.items.length; i++) {
      const it = this.items[i];
      const el = it.element;
      const rect = el.getBoundingClientRect();
      it.height = Math.max(0, el.offsetHeight || rect.height || 0);
      it.width = el.offsetWidth || rect.width || 0;
      it.top = top;
      it.index = i;
      top += it.height;
    }
    this.totalHeight = top;
    this.updateContentHeight();
  }

  private measureSingleItem(item: AcScrollableItem) {
    const el = item.element;
    const rect = el.getBoundingClientRect();
    const h = Math.max(0, el.offsetHeight || rect.height || 0);
    const w = el.offsetWidth || rect.width || 0;
    const oldH = item.height;
    item.height = h;
    item.width = w;
    // adjust following tops if height changed
    const diff = h - oldH;
    if (diff !== 0) {
      for (let i = item.index + 1; i < this.items.length; i++) this.items[i].top += diff;
      this.totalHeight += diff;
      this.updateContentHeight();
    }
  }

  private updateTopsFromIndex(startIndex: number) {
    let top = startIndex > 0 ? this.items[startIndex - 1].top + this.items[startIndex - 1].height : 0;
    for (let i = startIndex; i < this.items.length; i++) {
      this.items[i].top = top;
      top += this.items[i].height;
    }
    this.totalHeight = top;
    this.updateContentHeight();
  }

  private updateTotalHeight() {
    const total = this.items.reduce((s, it) => s + (it.height || 0), 0);
    this.totalHeight = total;
    this.updateContentHeight();
  }

  private updateContentHeight() {
    this.content.style.height = this.totalHeight + 'px';
    this.spacer.style.height = this.totalHeight + 'px';
  }

  private scheduleRender(force = false) {
    if (this.ticking && !force) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      this.renderViewport();
    });
  }

  private renderViewport() {
    const vh = this.container.clientHeight || 0;
    const st = this.container.scrollTop || 0;

    // determine start by skipping items whose bottom < scrollTop
    let start = 0;
    while (start < this.items.length && this.items[start].top + this.items[start].height < st) start++;

    // compute end to cover viewport height
    let end = start;
    let covered = 0;
    while (end < this.items.length && covered < vh) {
      covered += this.items[end].height;
      end++;
    }
    end = Math.min(this.items.length - 1, end + this.options.buffer);
    start = Math.max(0, start - this.options.buffer);

    // if range unchanged, no updates other than minor position updates
    if (this.renderedRange && this.renderedRange.start === start && this.renderedRange.end === end) {
      // update transforms for visible items (in case heights changed)
      for (let i = start; i <= end; i++) {
        const it = this.items[i];
        const wrapper = it.element.parentElement as HTMLElement | null;
        if (wrapper && wrapper.classList.contains('ac-scrollable-item-wrapper')) {
          this.applyPosition(wrapper, it.top);
        }
      }
      return;
    }

    // remove any old wrappers for items that will no longer be visible
    const prevStart = this.renderedRange?.start ?? -1;
    const prevEnd = this.renderedRange?.end ?? -1;

    // detach previous non-overlapping items
    for (let i = prevStart; i <= prevEnd; i++) {
      if (i < start || i > end) {
        const it = this.items[i];
        if (!it) continue;
        if (it.visible) {
          // hide with animation then detach
          this.detachItem(it);
        }
      }
    }

    // attach new items
    for (let i = start; i <= end; i++) {
      const it = this.items[i];
      if (!it) continue;
      if (!it.visible) {
        this.attachItem(it);
      } else {
        // update position
        const wrapper = it.element.parentElement as HTMLElement | null;
        if (wrapper && wrapper.classList.contains('ac-scrollable-item-wrapper')) {
          this.applyPosition(wrapper, it.top);
        }
      }
    }

    this.renderedRange = { start, end };
  }

  private attachItem(item: AcScrollableItem) {
    // create wrapper that will be appended to content
    const wrapper = document.createElement('div');
    wrapper.className = 'ac-scrollable-item-wrapper ac-scrollable-enter';
    wrapper.style.position = 'absolute';
    wrapper.style.left = '0';
    wrapper.style.width = '100%';
    wrapper.style.height = item.height + 'px';
    if (this.options.useTransforms) wrapper.style.transform = `translateY(${item.top}px)`;
    else wrapper.style.top = item.top + 'px';

    // move the element into wrapper
    wrapper.appendChild(item.element);
    this.content.appendChild(wrapper);

    // force reflow then add active class to animate in
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    wrapper.getBoundingClientRect();
    wrapper.classList.add('ac-scrollable-enter-active');

    // mark visible
    item.visible = true;

    // after animation, clean up enter classes
    setTimeout(() => {
      wrapper.classList.remove('ac-scrollable-enter', 'ac-scrollable-enter-active');
    }, this.options.animationDuration + 20);
  }

  private detachItem(item: AcScrollableItem) {
    const wrapper = item.element.parentElement as HTMLElement | null;
    if (!wrapper || !wrapper.classList.contains('ac-scrollable-item-wrapper')) {
      // item might already be detached
      item.visible = false;
      return;
    }

    // start leave animation
    wrapper.classList.add('ac-scrollable-leave');
    // trigger active state
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    wrapper.getBoundingClientRect();
    wrapper.classList.add('ac-scrollable-leave-active');

    // after animation end, remove wrapper and place element back into container at its natural place
    setTimeout(() => {
      // remove wrapper from DOM
      if (wrapper.parentElement === this.content) wrapper.parentElement!.removeChild(wrapper);
      // place element back to container (off-DOM for virtualization) — keep it detached
      // we do NOT re-append element to container; keep in memory but detached from DOM
      item.visible = false;
    }, this.options.animationDuration + 10);
  }

  private animateInsert(item: AcScrollableItem) {
    // For insert we create a wrapper with zero height then expand to measured height
    const wrapper = document.createElement('div');
    wrapper.className = 'ac-scrollable-item-wrapper ac-scrollable-enter';
    wrapper.style.position = 'absolute';
    wrapper.style.left = '0';
    wrapper.style.width = '100%';
    wrapper.style.overflow = 'hidden';
    wrapper.style.height = '0px';
    if (this.options.useTransforms) wrapper.style.transform = `translateY(${item.top}px)`;
    else wrapper.style.top = item.top + 'px';

    wrapper.appendChild(item.element);
    this.content.appendChild(wrapper);

    // force layout
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    wrapper.getBoundingClientRect();

    // expand
    wrapper.style.height = item.height + 'px';
    wrapper.classList.add('ac-scrollable-enter-active');

    setTimeout(() => {
      wrapper.classList.remove('ac-scrollable-enter', 'ac-scrollable-enter-active');
      item.visible = true;
    }, this.options.animationDuration + 20);
  }

  private animateRemove(item: AcScrollableItem): Promise<void> {
    return new Promise((resolve) => {
      const wrapper = item.element.parentElement as HTMLElement | null;
      if (!wrapper || !wrapper.classList.contains('ac-scrollable-item-wrapper')) {
        // Not attached — nothing to animate
        resolve();
        return;
      }

      wrapper.classList.add('ac-scrollable-leave');
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      wrapper.getBoundingClientRect();
      wrapper.classList.add('ac-scrollable-leave-active');

      setTimeout(() => {
        if (wrapper.parentElement === this.content) wrapper.parentElement!.removeChild(wrapper);
        item.visible = false;
        resolve();
      }, this.options.animationDuration + 10);
    });
  }

  private applyPosition(wrapper: HTMLElement, top: number) {
    if (this.options.useTransforms) wrapper.style.transform = `translateY(${top}px)`;
    else wrapper.style.top = top + 'px';
  }

}
