import { AcDelayedCallback, acNullifyInstanceProperties } from "@autocode-ts/autocode";
import { AcElementBase } from "../../../core/ac-element-base";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_POPOVER_TAG } from "../consts/ac-popover-tag.const";

type AcPopoverPosition = 'top' | 'bottom' | 'left' | 'right';

export interface AcPopoverOptions {
  trigger?: 'click' | 'hover';
  position?: AcPopoverPosition;
  content?: string | HTMLElement;
  className?: string;
}

export class AcPopover {
  private anchor: HTMLElement;
  private popoverEl: HTMLDivElement;
  private options: AcPopoverOptions;
  private isVisible = false;
  private hideTimeout?: any;
  private delayedCallback: AcDelayedCallback = new AcDelayedCallback();

  private _managedListeners: Array<{ target: EventTarget, type: string, handler: any, options?: any }> = [];

  constructor(anchor: HTMLElement, options: AcPopoverOptions = {}) {
    this.anchor = anchor;
    this.options = {
      trigger: 'click',
      position: 'bottom',
      content: '',
      className: '',
      ...options
    };

    this.popoverEl = document.createElement('div');
    this.popoverEl.className = `ac-popover ${this.options.className || ''}`;
    this.popoverEl.style.position = 'absolute';
    this.popoverEl.style.zIndex = '9999';
    this.popoverEl.style.display = 'none';

    if (this.options.trigger === 'click') {
      this.addEventListenerManaged(this.anchor, 'click', () => this.toggle());
      this.addEventListenerManaged(document, 'click', (e: MouseEvent) => {
        if (
          this.isVisible &&
          !this.popoverEl.contains(e.target as Node) &&
          !this.anchor.contains(e.target as Node)
        ) {
          this.hide();
        }
      });
    } else if (this.options.trigger === 'hover') {
      this.addEventListenerManaged(this.anchor, 'mouseenter', () => this.show());
      this.addEventListenerManaged(this.anchor, 'mouseleave', () => this.scheduleHide());
      this.addEventListenerManaged(this.popoverEl, 'mouseenter', () => this.cancelHide());
      this.addEventListenerManaged(this.popoverEl, 'mouseleave', () => this.scheduleHide());
    }

    this.addEventListenerManaged(document, 'keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });

    // Auto-destroy when anchor is removed from DOM
    this.setupAutoDestroy();
  }

  private addEventListenerManaged(target: EventTarget, type: string, handler: any, options?: any) {
    target.addEventListener(type, handler, options);
    this._managedListeners.push({ target, type, handler, options });
  }

  private setupAutoDestroy() {
    const checkInterval = setInterval(() => {
      if (!this.anchor.isConnected) {
        clearInterval(checkInterval);
        this.destroy();
      }
    }, 1000);
  }

  destroy() {
    this._managedListeners.forEach(({ target, type, handler, options }) => {
      target.removeEventListener(type, handler, options);
    });
    this._managedListeners = [];

    this.delayedCallback.destroy();
    this.popoverEl.remove();
    acNullifyInstanceProperties({ instance: this });
  }

  private setContent(content: string | HTMLElement) {
    this.popoverEl.innerHTML = '';
    if (typeof content === 'string') {
      this.popoverEl.innerHTML = content;
    } else {
      this.popoverEl.appendChild(content);
    }
  }

  private positionPopover() {
    const rect = this.anchor.getBoundingClientRect();
    const popoverRect = this.popoverEl.getBoundingClientRect();
    let top = 0;
    let left = 0;

    switch (this.options.position) {
      case 'top':
        top = rect.top - popoverRect.height - 8;
        left = rect.left + (rect.width - popoverRect.width) / 2;
        break;
      case 'bottom':
        top = rect.bottom + 8;
        left = rect.left + (rect.width - popoverRect.width) / 2;
        break;
      case 'left':
        top = rect.top + (rect.height - popoverRect.height) / 2;
        left = rect.left - popoverRect.width - 8;
        break;
      case 'right':
        top = rect.top + (rect.height - popoverRect.height) / 2;
        left = rect.right + 8;
        break;
    }

    this.popoverEl.style.top = `${top + window.scrollY}px`;
    this.popoverEl.style.left = `${left + window.scrollX}px`;
  }

  public show() {
    if (this.options.content) {
      this.setContent(this.options.content);
    }

    this.anchor.ownerDocument.body.appendChild(this.popoverEl);
    this.popoverEl.style.display = 'block';
    this.positionPopover();
    this.isVisible = true;
  }

  public hide() {
    this.popoverEl.style.display = 'none';
    this.popoverEl.remove();
    this.isVisible = false;
  }

  public toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  private scheduleHide() {
    this.hideTimeout = this.delayedCallback.add({ callback: () => this.hide(), duration: 200 });
  }

  private cancelHide() {
    if (this.hideTimeout) {
      this.delayedCallback.remove({ key: this.hideTimeout });
      this.hideTimeout = undefined;
    }
  }
}

acRegisterCustomElement({ tag: AC_POPOVER_TAG.popover, type: AcPopover });
