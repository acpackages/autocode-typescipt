/* eslint-disable @typescript-eslint/no-inferrable-types */

import { acNullifyInstanceProperties } from "@autocode-ts/autocode";

interface ObservationCallbacks {
  onMutation?: (mutations: MutationRecord[]) => void;
  onResize?: (entries: ResizeObserverEntry[]) => void;
  onIntersection?: (entries: IntersectionObserverEntry[]) => void;
}

export class AcElementObserver {
  // Shared MutationObserver
  private mutationObserver: MutationObserver | null = null;
  private mutationCallbacks: WeakMap<Element, Set<(mutations: MutationRecord[]) => void>> = new WeakMap();
  private mutationConfigs: Map<Element, MutationObserverInit> = new Map();  // Strong ref for iteration/re-observe
  private defaultMutationConfig: MutationObserverInit = {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  };

  // Shared ResizeObserver
  private resizeObserver: ResizeObserver | null = null;
  private resizeCallbacks: WeakMap<Element, Set<(entries: ResizeObserverEntry[]) => void>> = new WeakMap();
  private observedResizeElements: WeakSet<Element> = new WeakSet();
  private observedResizeCount: number = 0;

  // Shared IntersectionObserver
  private intersectionObserver: IntersectionObserver | null = null;
  private intersectionCallbacks: WeakMap<Element, Set<(entries: IntersectionObserverEntry[]) => void>> = new WeakMap();
  private observedIntersectionElements: WeakSet<Element> = new WeakSet();
  private observedIntersectionCount: number = 0;

  destroy(){
    acNullifyInstanceProperties({instance:this});
  }

  /**
   * Observes an element with the provided callbacks.
   * Automatically cleans up observation when the element is removed from the DOM.
   * @returns Unsubscribe function for these specific callbacks.
   */
  public observe({ element, onMutation, onResize, onIntersection, mutationConfig = this.defaultMutationConfig }: {
    element: Element,
    onMutation?: (mutations: MutationRecord[]) => void,
    onResize?: (entries: ResizeObserverEntry[]) => void,
    onIntersection?: (entries: IntersectionObserverEntry[]) => void,
    mutationConfig?: MutationObserverInit
  }): () => void {
    if (!(element instanceof Element)) {
      throw new Error('Invalid element provided. Must be a DOM Element.');
    }

    const unsubscribeFuncs: Array<() => void> = [];

    // Handle SHARED MutationObserver
    if (typeof onMutation === 'function') {
      const unsubMutation = this._registerMutation(element, onMutation, mutationConfig);
      unsubscribeFuncs.push(unsubMutation);
    }

    // Handle SHARED ResizeObserver
    if (typeof onResize === 'function') {
      const unsubResize = this._registerResize(element, onResize);
      unsubscribeFuncs.push(unsubResize);
    }

    // Handle SHARED IntersectionObserver
    if (typeof onIntersection === 'function') {
      const unsubIntersection = this._registerIntersection(element, onIntersection);
      unsubscribeFuncs.push(unsubIntersection);
    }

    // Auto-cleanup when element is removed from DOM
    // We use a shared MutationObserver that watches ancestors/document for childList changes
    this._setupDomRemovalDetection(element, () => {
      // Element was removed from DOM → clean up all observations for it
      this._cleanupElementCompletely(element);
    });

    // Return composite unsubscribe
    return () => {
      unsubscribeFuncs.forEach(unsub => unsub());
    };
  }

  /**
   * Completely removes an element from mutation observation (all callbacks and stops observing it).
   * Useful for manual cleanup.
   */
  public unobserve(element: Element): void {
    if (!(element instanceof Element)) {
      throw new Error('Invalid element provided. Must be a DOM Element.');
    }
    this._removeMutationElement(element);
  }

  /**
   * Internal: Full cleanup of an element across all observer types
   * @private
   */
  private _cleanupElementCompletely(element: Element): void {
    // Remove from mutation
    this._removeMutationElement(element);

    // Remove from resize (if any callbacks remain)
    const resizeCbs = this.resizeCallbacks.get(element);
    if (resizeCbs && resizeCbs.size > 0) {
      resizeCbs.clear();
      this.resizeCallbacks.delete(element);
      if (this.resizeObserver && this.observedResizeElements.has(element)) {
        this.resizeObserver.unobserve(element);
        this.observedResizeElements.delete(element);
        this.observedResizeCount--;
        if (this.observedResizeCount === 0) {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
        }
      }
    }

    // Remove from intersection
    const intersectionCbs = this.intersectionCallbacks.get(element);
    if (intersectionCbs && intersectionCbs.size > 0) {
      intersectionCbs.clear();
      this.intersectionCallbacks.delete(element);
      if (this.intersectionObserver && this.observedIntersectionElements.has(element)) {
        this.intersectionObserver.unobserve(element);
        this.observedIntersectionElements.delete(element);
        this.observedIntersectionCount--;
        if (this.observedIntersectionCount === 0) {
          this.intersectionObserver.disconnect();
          this.intersectionObserver = null;
        }
      }
    }
  }

  /**
   * Internal: Sets up detection for when an element is removed from the DOM
   * Uses a shared MutationObserver on document with childList + subtree
   * @private
   */
  private _setupDomRemovalDetection(element: Element, onRemoved: () => void): void {
    // Lazy-create a shared DOM removal detector
    if (!this.mutationObserver && 'MutationObserver' in window) {
      // We'll reuse the existing mutationObserver if possible, but ensure it watches the document
      this.mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
        // First: handle normal per-element mutation callbacks
        const grouped = new Map<Element, MutationRecord[]>();
        mutations.forEach((mutation) => {
          const target = mutation.target;
          if (target instanceof Element) {
            if (!grouped.has(target)) {
              grouped.set(target, []);
            }
            grouped.get(target)!.push(mutation);
          }
        });

        grouped.forEach((muts, target) => {
          const cbs = this.mutationCallbacks.get(target);
          if (cbs) {
            cbs.forEach((cb) => cb(muts));
          }
        });

        // Second: check for removed nodes that we are tracking
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            mutation.removedNodes.forEach((node) => {
              if (node instanceof Element) {
                // Check if this exact element or any of its descendants were removed
                if (node === element || node.contains(element)) {
                  onRemoved();
                  return;
                }
              }
            });
          }
        }
      });

      // Observe the entire document for childList changes (subtree)
      this.mutationObserver.observe(document, {
        childList: true,
        subtree: true
      });
    } else if (this.mutationObserver) {
      // Already exists — we assume it's already observing document
      // (we set it up once)
    }
  }

  /**
   * Internal: Completely remove element from mutation observing
   * @private
   */
  private _removeMutationElement(element: Element): void {
    this.mutationCallbacks.delete(element);
    this.mutationConfigs.delete(element);

    if (this.mutationConfigs.size === 0) {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
        this.mutationObserver = null;
      }
    } else if (this.mutationObserver) {
      // Reconnect only remaining elements
      this.mutationObserver.disconnect();
      this.mutationConfigs.forEach((cfg, el) => {
        this.mutationObserver!.observe(el, cfg);
      });
      // Also re-observe document for removal detection if anything is still registered
      if (this.mutationConfigs.size > 0) {
        this.mutationObserver.observe(document, { childList: true, subtree: true });
      }
    }
  }

  /**
   * Internal: Register mutation callback for element.
   * @private
   */
  private _registerMutation(
    element: Element,
    callback: (mutations: MutationRecord[]) => void,
    config: MutationObserverInit
  ): () => void {
    // Ensure shared observer exists
    if (!this.mutationObserver) {
      this._setupDomRemovalDetection(element, () => {
        //
      }); // dummy call to init
    }

    // Add callback
    let cbs = this.mutationCallbacks.get(element);
    if (!cbs) {
      cbs = new Set();
      this.mutationCallbacks.set(element, cbs);
    }
    cbs.add(callback);

    // Observe element if not already
    if (!this.mutationConfigs.has(element)) {
      this.mutationConfigs.set(element, config);
      if (this.mutationObserver) {
        this.mutationObserver.observe(element, config);
      }
    }

    return () => this._unsubscribeMutation(element, callback);
  }

  private _unsubscribeMutation(
    element: Element,
    callback: (mutations: MutationRecord[]) => void
  ): void {
    const cbs = this.mutationCallbacks.get(element);
    if (!cbs) return;

    cbs.delete(callback);
    if (cbs.size === 0) {
      this._removeMutationElement(element);
    }
  }

  // Resize and Intersection registration remain unchanged
  private _registerResize(
    element: Element,
    callback: (entries: ResizeObserverEntry[]) => void
  ): () => void {
    if (!this.resizeObserver && 'ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver((entries) => {
        const grouped = new Map<Element, ResizeObserverEntry[]>();
        entries.forEach((entry) => {
          const target = entry.target as Element;
          if (!grouped.has(target)) grouped.set(target, []);
          grouped.get(target)!.push(entry);
        });
        grouped.forEach((targetEntries, target) => {
          const cbs = this.resizeCallbacks.get(target);
          if (cbs) cbs.forEach((cb) => cb(targetEntries));
        });
      });
    }

    if (!this.observedResizeElements.has(element)) {
      this.resizeObserver?.observe(element);
      this.observedResizeElements.add(element);
      this.observedResizeCount++;
    }

    const cbs = this.resizeCallbacks.get(element) ?? new Set();
    cbs.add(callback);
    this.resizeCallbacks.set(element, cbs);

    return () => this._unsubscribeResize(element, callback);
  }

  private _unsubscribeResize(
    element: Element,
    callback: (entries: ResizeObserverEntry[]) => void
  ): void {
    const cbs = this.resizeCallbacks.get(element);
    if (!cbs) return;
    cbs.delete(callback);
    if (cbs.size === 0) {
      this.resizeCallbacks.delete(element);
      if (this.resizeObserver && this.observedResizeElements.has(element)) {
        this.resizeObserver.unobserve(element);
        this.observedResizeElements.delete(element);
        this.observedResizeCount--;
        if (this.observedResizeCount === 0) {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
        }
      }
    }
  }

  private _registerIntersection(
    element: Element,
    callback: (entries: IntersectionObserverEntry[]) => void
  ): () => void {
    if (!this.intersectionObserver && 'IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        const grouped = new Map<Element, IntersectionObserverEntry[]>();
        entries.forEach((entry) => {
          const target = entry.target as Element;
          if (!grouped.has(target)) grouped.set(target, []);
          grouped.get(target)!.push(entry);
        });
        grouped.forEach((targetEntries, target) => {
          const cbs = this.intersectionCallbacks.get(target);
          if (cbs) cbs.forEach((cb) => cb(targetEntries));
        });
      });
    }

    if (!this.observedIntersectionElements.has(element)) {
      this.intersectionObserver?.observe(element);
      this.observedIntersectionElements.add(element);
      this.observedIntersectionCount++;
    }

    const cbs = this.intersectionCallbacks.get(element) ?? new Set();
    cbs.add(callback);
    this.intersectionCallbacks.set(element, cbs);

    return () => this._unsubscribeIntersection(element, callback);
  }

  private _unsubscribeIntersection(
    element: Element,
    callback: (entries: IntersectionObserverEntry[]) => void
  ): void {
    const cbs = this.intersectionCallbacks.get(element);
    if (!cbs) return;
    cbs.delete(callback);
    if (cbs.size === 0) {
      this.intersectionCallbacks.delete(element);
      if (this.intersectionObserver && this.observedIntersectionElements.has(element)) {
        this.intersectionObserver.unobserve(element);
        this.observedIntersectionElements.delete(element);
        this.observedIntersectionCount--;
        if (this.observedIntersectionCount === 0) {
          this.intersectionObserver.disconnect();
          this.intersectionObserver = null;
        }
      }
    }
  }

  public disconnectAll(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    this.mutationCallbacks = new WeakMap();
    this.mutationConfigs.clear();

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.resizeCallbacks = new WeakMap();
    this.observedResizeElements = new WeakSet();
    this.observedResizeCount = 0;

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    this.intersectionCallbacks = new WeakMap();
    this.observedIntersectionElements = new WeakSet();
    this.observedIntersectionCount = 0;
  }

  protected initCustomObservers(): void {
    //
  }
}

export const acElementObserver = new AcElementObserver();
const _window: any = window;
_window["acElementObserver"] = acElementObserver;
