/* eslint-disable prefer-const */
import { AcEvents, Autocode } from "@autocode-ts/autocode";
import { IAcDropdownOptions } from "../interfaces/ac-dropdown-options.interface";
import { AcDropdownAttributeName } from "../consts/ac-dropdown-attribute-name.const";
import { AcEnumDropdownEvent } from "../enums/ac-enum-dropdown-event.enum";

export class AcDropdown {
  private element!: HTMLElement;
  events: AcEvents = new AcEvents();
  private keydownHandler: (e: KeyboardEvent) => void;
  private id: string = Autocode.uuid();
  private isOpen = false;
  private observer!: IntersectionObserver;
  private offset: number;
  private outsideClickHandler: (e: MouseEvent) => void;
  private position: 'auto'|'bottom'|'left'|'right'|'top';
  private positionAnimationFrameId?: number;
  private resizeHandler: () => void;
  private scrollHandler: () => void;
  private targetElement!: HTMLElement;
  private triggerAction:'click'|'hover' = 'click';
  private triggerElement!: HTMLElement;
  private autoClose: "inside" | "outside" | "both" | "manual";
  private alignment: "start" | "end" = "start";

  constructor({ element, options }: { element: HTMLElement; options: IAcDropdownOptions }) {
    this.element = element;
    this.element.setAttribute(AcDropdownAttributeName.acDropdownId, this.id);
    this.element.setAttribute(AcDropdownAttributeName.acDropdown, "");

    this.position = options.position ?? 'auto';
    this.offset = options.offset ?? 4;
    this.autoClose = options.autoClose ?? "both";
    this.triggerAction = options.triggerAction ?? 'click';

    this.keydownHandler = (e) => this.handleKeydown(e);

    this.outsideClickHandler = (e) => this.handleOutsideClick(e);
    this.scrollHandler = () => this.updatePosition();
    this.resizeHandler = () => this.updatePosition();

    window.addEventListener("scroll", this.scrollHandler, true);
    window.addEventListener("resize", this.resizeHandler);

    // Initialize target, trigger, and items
    this.initElements();
  }

  private initElements() {
    this.element.querySelectorAll(`[${AcDropdownAttributeName.acDropdownTarget}]`).forEach((el) => {
      this.setTargetElement({ element: el as HTMLElement });
    });
    this.element.querySelectorAll(`[${AcDropdownAttributeName.acDropdownTrigger}]`).forEach((el) => {
      this.setTriggerElement({ element: el as HTMLElement });
    });
    this.element.querySelectorAll(`[${AcDropdownAttributeName.acDropdownItem}]`).forEach((el) => {
      this.setDropdownItemElement({ element: el as HTMLElement });
    });
  }

  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.targetElement.style.display = "block";
    this.targetElement.classList.add("fade-in");
    this.updatePosition();
    this.startAutoPosition();
    document.addEventListener("click", this.outsideClickHandler);
    this.triggerElement.setAttribute("aria-expanded", "true");

    const firstItem = this.targetElement.querySelector(`[${AcDropdownAttributeName.acDropdownItem}]`) as HTMLElement;
    if (firstItem) firstItem.tabIndex = 0; firstItem.focus();

    this.events.execute({ event: AcEnumDropdownEvent.Open, args: { dropdown: this } });
    this.events.execute({ event: AcEnumDropdownEvent.Toggle, args: { dropdown: this } });
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.targetElement.classList.remove("fade-in");
    this.targetElement.style.display = "none";
    this.stopAutoPosition();
    document.removeEventListener("click", this.outsideClickHandler);
    this.triggerElement.setAttribute("aria-expanded", "false");
    this.events.execute({ event: AcEnumDropdownEvent.Close, args: { dropdown: this } });
    this.events.execute({ event: AcEnumDropdownEvent.Toggle, args: { dropdown: this } });
  }

  toggle(): void {
    if (this.isOpen) this.close();
    else this.open();
  }

  destroy(): void {
    this.stopAutoPosition();
    window.removeEventListener("scroll", this.scrollHandler, true);
    window.removeEventListener("resize", this.resizeHandler);
    this.triggerElement.removeEventListener("keydown", this.keydownHandler);
    this.targetElement.removeEventListener("keydown", this.keydownHandler);
    this.observer.disconnect();
  }

  on({ event, callback }: { event: AcEnumDropdownEvent; callback: Function }): string {
    return this.events.subscribe({ event: event, callback: callback });
  }

  setDropdownItemElement({ element }: { element: HTMLElement }): void {
    element.setAttribute("role", "menuitem");
    element.setAttribute(AcDropdownAttributeName.acDropdownItem, "");
    element.tabIndex = 0; // make focusable
    if (this.triggerAction === 'hover') {
      element.addEventListener("mouseenter", () => this.open());
      element.addEventListener("mouseleave", () => this.close());
    }
  }

  setTargetElement({ element }: { element: HTMLElement }): void {
    this.targetElement = element;
    element.setAttribute(AcDropdownAttributeName.acDropdownTarget, "");
    element.setAttribute("role", "menu");
    element.style.position = "fixed";
    element.style.display = "none";
    element.style.zIndex = "9999";
    element.addEventListener("keydown", this.keydownHandler);
    if (this.triggerAction === 'hover') {
      element.addEventListener("mouseenter", () => this.open());
      element.addEventListener("mouseleave", () => this.close());
    }
  }

  setTriggerElement({ element }: { element: HTMLElement }): void {
    this.triggerElement = element;
    element.setAttribute(AcDropdownAttributeName.acDropdownTrigger, "");
    this.triggerElement.setAttribute("aria-haspopup", "true");
    this.triggerElement.setAttribute("aria-expanded", "false");
    this.triggerElement.addEventListener("keydown", this.keydownHandler);

    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting && this.isOpen) this.close();
      }
    });
    this.observer.observe(this.triggerElement);

    if (this.triggerAction === 'click') {
      this.triggerElement.addEventListener("click", (e) => { e.preventDefault(); this.toggle(); });
    } else if (this.triggerAction === 'hover') {
      this.triggerElement.addEventListener("mouseenter", () => this.open());
      this.triggerElement.addEventListener("mouseleave", () => this.close());
    }
  }

  private handleKeydown(e: KeyboardEvent): void {
    const items = Array.from(this.targetElement.querySelectorAll(`[${AcDropdownAttributeName.acDropdownItem}]`)) as HTMLElement[];
    let index = items.indexOf(document.activeElement as HTMLElement)
    ;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (index === -1) items[0]?.focus();
        else items[(index + 1) % items.length]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        if (index === -1) items[items.length - 1]?.focus();
        else items[(index - 1 + items.length) % items.length]?.focus();
        break;
      case "Escape":
        this.close();
        this.triggerElement.focus();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        (document.activeElement as HTMLElement).click();
        break;
    }
  }

  private handleOutsideClick(e: MouseEvent) {
    if (this.autoClose === "manual") return;
    const isInsideTarget = this.targetElement.contains(e.target as Node);
    const isInsideTrigger = this.triggerElement.contains(e.target as Node);

    if (this.autoClose === "both" && !isInsideTarget && !isInsideTrigger) this.close();
    else if (this.autoClose === "outside" && !isInsideTarget && !isInsideTrigger) this.close();
    else if (this.autoClose === "inside" && isInsideTarget) this.close();
  }

  private startAutoPosition(): void {
    const loop = () => {
      if (this.isOpen) {
        this.updatePosition();
        this.positionAnimationFrameId = requestAnimationFrame(loop);
      }
    };
    this.positionAnimationFrameId = requestAnimationFrame(loop);
  }

  private stopAutoPosition(): void {
    if (this.positionAnimationFrameId) {
      cancelAnimationFrame(this.positionAnimationFrameId);
      this.positionAnimationFrameId = undefined;
    }
  }

  private updatePosition(): void {
    if (!this.isOpen) return;

    const rect = this.triggerElement.getBoundingClientRect();
    let top = 0, left = 0;

    switch (this.position) {
      case 'bottom':
        top = rect.bottom + this.offset;
        left = rect.left;
        break;
      case 'top':
        top = rect.top - this.targetElement.offsetHeight - this.offset;
        left = rect.left;
        break;
      case 'left':
        top = rect.top;
        left = rect.left - this.targetElement.offsetWidth - this.offset;
        break;
      case 'right':
        top = rect.top;
        left = rect.right + this.offset;
        break;
    }

    // Flip if overflow
    const menuRect = this.targetElement.getBoundingClientRect();
    if (menuRect.bottom > window.innerHeight) top = rect.top - this.targetElement.offsetHeight - this.offset;
    if (menuRect.top < 0) top = rect.bottom + this.offset;
    if (menuRect.right > window.innerWidth) left = rect.right - this.targetElement.offsetWidth;
    if (menuRect.left < 0) left = rect.left;

    // Alignment
    // if (this.alignment === "end") left = rect.right - this.targetElement.offsetWidth;

    this.targetElement.style.top = `${top}px`;
    this.targetElement.style.left = `${left}px`;
  }
}
