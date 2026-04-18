/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDelayedCallback, AcEvents, Autocode, acNullifyInstanceProperties } from "@autocode-ts/autocode";
import { acCloneEvent, acRegisterCustomElement } from "../utils/ac-element-functions";

export class AcElementBase extends HTMLElement {
  private _isInitialized: boolean = false;
  get isInitialized(): boolean {
    return this._isInitialized;
  }
  set isInitialized(value: boolean) {
    this._isInitialized = value;
  }

  events: AcEvents = new AcEvents();
  acId: string = Autocode.uuid();
  autoDestroyOnDisconnect: boolean = true;
  protected delayedCallback: AcDelayedCallback = new AcDelayedCallback();

  private _managedListeners: Array<{ target: EventTarget, type: string, handler: any, options?: any }> = [];
  private _managedTimers: any[] = [];
  private _managedObservers: Array<MutationObserver | ResizeObserver | IntersectionObserver> = [];

  constructor() {
    super();
    const originalDispatch = this.dispatchEvent;
    this.dispatchEvent = (event: Event): boolean => {
      const e = acCloneEvent(event);
      if (this.events) {
        this.events.execute({ event: event.type, args: event });
      }
      return originalDispatch.call(this, e);
    };
  }

  connectedCallback() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      this.init();
      const event: CustomEvent = new CustomEvent('init');
      this.dispatchEvent(event)
    }
  }

  /**
   * Called when element is removed from DOM.
   * Uses "Smart Destruction" to detect if it's a move or permanent removal.
   */
  disconnectedCallback() {
    if (!this.autoDestroyOnDisconnect) return;
    setTimeout(() => {
      if (!this.isConnected) {
        this.destroy();
      }
    }, 0);
  }

  destroy() {
    // 1. Clean up managed event listeners
    this._managedListeners.forEach(({ target, type, handler, options }) => {
      target.removeEventListener(type, handler, options);
    });
    this._managedListeners = [];

    // 2. Clean up managed timers
    this._managedTimers.forEach(timer => {
      clearTimeout(timer);
      clearInterval(timer);
    });
    this._managedTimers = [];

    // 3. Clean up managed observers
    this._managedObservers.forEach(observer => {
      observer.disconnect();
    });
    this._managedObservers = [];

    // 4. Destroy core objects
    this.events.destroy();
    this.delayedCallback.destroy();

    // 5. Nullify properties to break circular references
    acNullifyInstanceProperties({ instance: this });
  }

  init() {
    //
  }

  /**
   * Adds an event listener that will be automatically removed when the element is destroyed.
   */
  protected addEventListenerManaged(target: EventTarget, type: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    // Avoid double-adding to the managed list
    this.removeEventListenerManaged(target, type, handler, options);
    
    target.addEventListener(type, handler, options);
    this._managedListeners.push({ target, type, handler, options });
  }

  /**
   * Manually removes a managed event listener.
   */
  protected removeEventListenerManaged(target: EventTarget, type: string, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    target.removeEventListener(type, handler, options);
    this._managedListeners = this._managedListeners.filter(l => l.target !== target || l.type !== type || l.handler !== handler);
  }

  /**
   * Creates a setTimeout that will be automatically cleared when the element is destroyed.
   */
  protected setTimeoutManaged(handler: TimerHandler, timeout?: number, ...args: any[]): number {
    const timer = window.setTimeout(handler, timeout, ...args);
    this._managedTimers.push(timer);
    return timer;
  }

  /**
   * Creates a setInterval that will be automatically cleared when the element is destroyed.
   */
  protected setIntervalManaged(handler: TimerHandler, timeout?: number, ...args: any[]): number {
    const timer = window.setInterval(handler, timeout, ...args);
    this._managedTimers.push(timer);
    return timer;
  }

  /**
   * Registers a MutationObserver that will be automatically disconnected when the element is destroyed.
   */
  protected observeMutationManaged(target: Node, options: MutationObserverInit, callback: MutationCallback): MutationObserver {
    const observer = new MutationObserver(callback);
    observer.observe(target, options);
    this._managedObservers.push(observer);
    return observer;
  }

  /**
   * Registers a ResizeObserver that will be automatically disconnected when the element is destroyed.
   */
  protected observeResizeManaged(target: Element, callback: ResizeObserverCallback, options?: ResizeObserverOptions): ResizeObserver {
    const observer = new ResizeObserver(callback);
    observer.observe(target, options);
    this._managedObservers.push(observer);
    return observer;
  }

  /**
   * Registers an IntersectionObserver that will be automatically disconnected when the element is destroyed.
   */
  protected observeIntersectionManaged(target: Element, callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver {
    const observer = new IntersectionObserver(callback, options);
    observer.observe(target);
    this._managedObservers.push(observer);
    return observer;
  }

  off({ event, callback, subscriptionId }: { event?: string, callback?: Function, subscriptionId?: string }): void {
    this.events.unsubscribe({ event, callback, subscriptionId });
  }

  on({ event, callback }: { event: string; callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

}

acRegisterCustomElement({ tag: "ac-element-base", type: AcElementBase });
