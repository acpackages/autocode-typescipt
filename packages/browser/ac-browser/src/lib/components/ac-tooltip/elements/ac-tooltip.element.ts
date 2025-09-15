/* eslint-disable @typescript-eslint/no-non-null-assertion */
type AcTooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export interface AcTooltipOptions {
  position?: AcTooltipPosition;
  content?: string | HTMLElement;
  className?: string;
  delay?: number; // delay in ms before showing/hiding
}

export class AcTooltip {
  private anchor: HTMLElement;
  private tooltipEl: HTMLDivElement;
  private options: AcTooltipOptions;
  private isVisible = false;
  private showTimeout?: number;
  private hideTimeout?: number;

  constructor({ element, options = {} }: { element: HTMLElement, options?: AcTooltipOptions }) {
    this.anchor = element;
    this.options = {
      position: 'auto',
      content: '',
      className: '',
      delay: 1,
      ...options
    };
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.className = `ac-tooltip ${this.options.className || ''}`;
    this.tooltipEl.setAttribute('style', `background: rgba(23, 23, 23, 1);
          color: #fff;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 13px;
          line-height: 1.4;
          max-width: 200px;
          text-align: center;
          pointer-events: none;
          position:fixed;
          z-index:10000;
          display:none;
          `);

    // Hover behavior
    this.anchor.addEventListener('mouseenter', () => this.scheduleShow());
    this.anchor.addEventListener('mouseleave', () => this.scheduleHide());
    this.tooltipEl.addEventListener('mouseenter', () => this.cancelHide());
    this.tooltipEl.addEventListener('mouseleave', () => this.scheduleHide());

    // Handle scroll/resize → hide tooltip if element not visible
    window.addEventListener('scroll', () => this.checkVisibility(), true);
    window.addEventListener('resize', () => this.checkVisibility());
  }

  private setContent(content: string | HTMLElement) {
    this.tooltipEl.innerHTML = '';
    if (typeof content === 'string') {
      this.tooltipEl.innerHTML = content;
    } else {
      this.tooltipEl.appendChild(content);
    }
  }

  private positionTooltip() {
    const rect = this.anchor.getBoundingClientRect();

    // Hide if anchor not visible at all
    if (
      rect.bottom < 0 ||
      rect.top > window.innerHeight ||
      rect.right < 0 ||
      rect.left > window.innerWidth
    ) {
      this.hide();
      return;
    }

    this.tooltipEl.style.display = "block"; // ensure visible for measurement
    const tooltipRect = this.tooltipEl.getBoundingClientRect();

    const spaceTop = rect.top;
    const spaceBottom = window.innerHeight - rect.bottom;
    const spaceLeft = rect.left;
    const spaceRight = window.innerWidth - rect.right;

    let position = this.options.position;

    if (position === "auto") {
      // Prefer bottom → top → left → right
      if (tooltipRect.height + 6 <= spaceBottom) {
        position = "bottom";
      } else if (tooltipRect.height + 6 <= spaceTop) {
        position = "top";
      } else if (tooltipRect.width + 6 <= spaceRight) {
        position = "right";
      } else if (tooltipRect.width + 6 <= spaceLeft) {
        position = "left";
      } else {
        // fallback to bottom even if it overflows
        position = "bottom";
      }
    } else {
      // Flip if chosen position doesn't fit
      if (position === "top" && tooltipRect.height + 6 > spaceTop) position = "bottom";
      if (position === "bottom" && tooltipRect.height + 6 > spaceBottom) position = "top";
      if (position === "left" && tooltipRect.width + 6 > spaceLeft) position = "right";
      if (position === "right" && tooltipRect.width + 6 > spaceRight) position = "left";
    }

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = rect.top - tooltipRect.height - 6;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        break;
      case "bottom":
        top = rect.bottom + 6;
        left = rect.left + (rect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.left - tooltipRect.width - 6;
        break;
      case "right":
        top = rect.top + (rect.height - tooltipRect.height) / 2;
        left = rect.right + 6;
        break;
    }
    const padding = 4;
    top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));

    this.tooltipEl.style.top = `${top + window.scrollY}px`;
    this.tooltipEl.style.left = `${left + window.scrollX}px`;
  }

  public show() {
    if (this.anchor.hasAttribute("ac-tooltip")) {
      this.setContent(this.anchor.getAttribute("ac-tooltip")!);
    }
    else if (this.options.content) {
      this.setContent(this.options.content);
    }

    document.body.appendChild(this.tooltipEl);
    this.positionTooltip();
    this.isVisible = true;
  }

  public hide() {
    this.tooltipEl.remove();
    this.tooltipEl.style.display = 'none';
    this.isVisible = false;
  }

  private scheduleShow() {
    this.cancelHide();
    this.showTimeout = window.setTimeout(() => this.show(), this.options.delay);
  }

  private scheduleHide() {
    this.cancelShow();
    this.hideTimeout = window.setTimeout(() => this.hide(), this.options.delay);
  }

  private cancelShow() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }
  }

  private cancelHide() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  private checkVisibility() {
    if (!this.isVisible) return;
    const rect = this.anchor.getBoundingClientRect();
    if (
      rect.bottom < 0 ||
      rect.top > window.innerHeight ||
      rect.right < 0 ||
      rect.left > window.innerWidth
    ) {
      this.hide();
    } else {
      this.positionTooltip();
    }
  }
}
