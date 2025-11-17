/* eslint-disable @typescript-eslint/no-inferrable-types */

interface ObservationCallbacks {
  onMutation?: (mutations: MutationRecord[]) => void;
  onResize?: (entries: ResizeObserverEntry[]) => void;
  onIntersection?: (entries: IntersectionObserverEntry[]) => void;
}

class AcElementObserver {
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

  /**
   * Registers an element for observation with provided callbacks.
   * @param element - The DOM element to observe.
   * @param callbacks - Callbacks for each type.
   * @param mutationConfig - Config for mutations (defaults to all types). Uses first-provided config per element.
   * @returns Unsubscribe function for these specific callbacks.
   */
  public register({ element, onMutation, onResize, onIntersection, mutationConfig = this.defaultMutationConfig }: {
    element: Element, onMutation?: (mutations: MutationRecord[]) => void,
    onResize?: (entries: ResizeObserverEntry[]) => void,
    onIntersection?: (entries: IntersectionObserverEntry[]) => void, mutationConfig?: MutationObserverInit
  }
  ): () => void {
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

    // Return composite unsubscribe
    return () => {
      unsubscribeFuncs.forEach(unsub => unsub());
    };
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
    // Lazy init shared observer
    if (!this.mutationObserver && 'MutationObserver' in window) {
      this.mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
        // Group mutations by target element
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

        // Dispatch grouped mutations to per-element callbacks
        grouped.forEach((muts, target) => {
          const cbs = this.mutationCallbacks.get(target);
          if (cbs) {
            cbs.forEach((cb) => cb(muts));
          }
        });
      });
    }

    // Add callback
    let cbs = this.mutationCallbacks.get(element);
    if (!cbs) {
      cbs = new Set();
      this.mutationCallbacks.set(element, cbs);
    }
    if (!cbs.has(callback)) {
      cbs.add(callback);
    }

    // Observe if not already (uses first config; later registrations ignore config changes)
    if (!this.mutationConfigs.has(element)) {
      this.mutationConfigs.set(element, config);
      if (this.mutationObserver) {
        this.mutationObserver.observe(element, config);
      }
    }

    return () => this._unsubscribeMutation(element, callback);
  }

  /**
   * Internal: Unsubscribe mutation callback.
   * @private
   */
  private _unsubscribeMutation(
    element: Element,
    callback: (mutations: MutationRecord[]) => void
  ): void {
    const cbs = this.mutationCallbacks.get(element);
    if (!cbs) return;

    cbs.delete(callback);
    if (cbs.size === 0) {
      this.mutationCallbacks.delete(element);
      this.mutationConfigs.delete(element);
      if (this.mutationConfigs.size === 0) {
        if (this.mutationObserver) {
          this.mutationObserver.disconnect();
          this.mutationObserver = null;
        }
      } else {
        // Disconnect and re-observe remaining elements (no unobserve available)
        if (this.mutationObserver) {
          this.mutationObserver.disconnect();
          this.mutationConfigs.forEach((cfg, el) => {
            this.mutationObserver!.observe(el, cfg);
          });
        }
      }
    }
  }

  /**
   * Internal: Register resize callback for element.
   * @private
   */
  private _registerResize(
    element: Element,
    callback: (entries: ResizeObserverEntry[]) => void
  ): () => void {
    // Lazy init shared observer
    if (!this.resizeObserver && 'ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        // Group/filter entries by target
        const grouped = new Map<Element, ResizeObserverEntry[]>();
        entries.forEach((entry) => {
          const target = entry.target as Element;
          if (!grouped.has(target)) {
            grouped.set(target, []);
          }
          grouped.get(target)!.push(entry);
        });

        // Dispatch to per-element callbacks
        grouped.forEach((targetEntries, target) => {
          const cbs = this.resizeCallbacks.get(target);
          if (cbs) {
            cbs.forEach((cb) => cb(targetEntries));
          }
        });
      });
    }

    // Observe element if not already
    if (!this.observedResizeElements.has(element)) {
      if (this.resizeObserver) {
        this.resizeObserver.observe(element);
        this.observedResizeElements.add(element);
        this.observedResizeCount++;
      }
    }

    // Add callback
    let cbs = this.resizeCallbacks.get(element);
    if (!cbs) {
      cbs = new Set();
      this.resizeCallbacks.set(element, cbs);
    }
    if (!cbs.has(callback)) {
      cbs.add(callback);
    }

    return () => this._unsubscribeResize(element, callback);
  }

  /**
   * Internal: Unsubscribe resize callback.
   * @private
   */
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

        // Disconnect shared observer if no elements left
        if (this.observedResizeCount === 0) {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
        }
      }
    }
  }

  /**
   * Internal: Register intersection callback for element.
   * @private
   */
  private _registerIntersection(
    element: Element,
    callback: (entries: IntersectionObserverEntry[]) => void
  ): () => void {
    // Lazy init shared observer (default root/threshold)
    if (!this.intersectionObserver && 'IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        // Group/filter entries by target
        const grouped = new Map<Element, IntersectionObserverEntry[]>();
        entries.forEach((entry) => {
          const target = entry.target as Element;
          if (!grouped.has(target)) {
            grouped.set(target, []);
          }
          grouped.get(target)!.push(entry);
        });

        // Dispatch to per-element callbacks
        grouped.forEach((targetEntries, target) => {
          const cbs = this.intersectionCallbacks.get(target);
          if (cbs) {
            cbs.forEach((cb) => cb(targetEntries));
          }
        });
      });
    }

    // Observe element if not already
    if (!this.observedIntersectionElements.has(element)) {
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(element);
        this.observedIntersectionElements.add(element);
        this.observedIntersectionCount++;
      }
    }

    // Add callback
    let cbs = this.intersectionCallbacks.get(element);
    if (!cbs) {
      cbs = new Set();
      this.intersectionCallbacks.set(element, cbs);
    }
    if (!cbs.has(callback)) {
      cbs.add(callback);
    }

    return () => this._unsubscribeIntersection(element, callback);
  }

  /**
   * Internal: Unsubscribe intersection callback.
   * @private
   */
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

        // Disconnect shared observer if no elements left
        if (this.observedIntersectionCount === 0) {
          this.intersectionObserver.disconnect();
          this.intersectionObserver = null;
        }
      }
    }
  }

  /**
   * Disconnects all observers and clears all registrations.
   * Useful for global cleanup.
   */
  public disconnectAll(): void {
    // Mutations
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    this.mutationCallbacks = new WeakMap();
    this.mutationConfigs.clear();

    // Resize
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    this.resizeCallbacks = new WeakMap();
    this.observedResizeElements = new WeakSet();
    this.observedResizeCount = 0;

    // Intersection
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    this.intersectionCallbacks = new WeakMap();
    this.observedIntersectionElements = new WeakSet();
    this.observedIntersectionCount = 0;
  }

  /**
   * Hook for adding custom shared observers (e.g., for other types).
   * Override or extend as needed.
   * @protected
   */
  protected initCustomObservers(): void {
    // Example: Add shared observer for scroll events or other
    // Implement per-type registration similar to above
  }
}


export const acElementObserver = new AcElementObserver();
const _window: any = window;
_window["acElementObserver"] = acElementObserver;
