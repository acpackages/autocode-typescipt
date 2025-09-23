/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
import { AcDropdownAttributeName } from "../consts/ac-dropdown-attribute-name.const";
import { AcEnumDropdownEvent } from "../enums/ac-enum-dropdown-event.enum";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_DROPDOWN_TAG } from "../consts/ac-dropdown-tag.const";
import { AcElementBase } from "../../../core/ac-element-base";

export class AcDropdown extends AcElementBase {
  get autoClose(): string {
    return this.getAttribute("auto-close") ?? "both";
  }
  set autoClose(value: "inside" | "outside" | "both" | "manual") {
    this.setAttribute("auto-close", `${value}`);
  }

  get alignment(): string {
    return this.getAttribute("alignment") ?? "start";
  }
  set alignment(value: "start" | "end") {
    this.setAttribute("alignment", `${value}`);
  }

  get offset(): number {
    return parseInt(this.getAttribute("offset") ?? "4");
  }
  set offset(value: number) {
    this.setAttribute("offset", `${value}`);
  }

  get position(): string {
    return this.getAttribute("position") ?? "auto";
  }
  set position(value: "auto" | "bottom" | "left" | "right" | "top") {
    this.setAttribute("position", value);
  }

  get trigger(): string {
    return this.getAttribute("trigger") ?? "click";
  }
  set trigger(value: "click" | "hover") {
    this.setAttribute("trigger", value);
  }

  private keydownHandler: (e: KeyboardEvent) => void;
  private isOpen = false;
  private observer?: IntersectionObserver;
  private outsideClickHandler: (e: MouseEvent) => void;

  private positionAnimationFrameId?: number;
  private resizeHandler: () => void;
  private scrollHandler: () => void;
  private targetElement!: HTMLElement;
  private triggerElement!: HTMLElement;

  private triggerClickHandler?: (e: Event) => void;
  private triggerEnterHandler?: () => void;
  private triggerLeaveHandler?: () => void;
  private targetEnterHandler?: () => void;
  private targetLeaveHandler?: () => void;

  constructor() {
    super();
    this.style.display = "contents";
    this.setAttribute(AcDropdownAttributeName.acDropdownId, this.id);
    this.setAttribute(AcDropdownAttributeName.acDropdown, "");

    this.keydownHandler = (e) => this.handleKeydown(e);
    this.outsideClickHandler = (e) => this.handleOutsideClick(e);
    this.scrollHandler = () => this.updatePosition();
    this.resizeHandler = () => this.updatePosition();

    window.addEventListener("scroll", this.scrollHandler, true);
    window.addEventListener("resize", this.resizeHandler);

    // Initialize elements if already present
    this.initElements();
  }

  private initElements() {
    this.querySelectorAll(`[${AcDropdownAttributeName.acDropdownTarget}]`).forEach((el) => {
      this.setTargetElement({ element: el as HTMLElement });
    });
    this.querySelectorAll(`[${AcDropdownAttributeName.acDropdownTrigger}]`).forEach((el) => {
      this.setTriggerElement({ element: el as HTMLElement });
    });
    this.querySelectorAll(`[${AcDropdownAttributeName.acDropdownItem}]`).forEach((el) => {
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

    const firstItem = this.targetElement.querySelector(
      `[${AcDropdownAttributeName.acDropdownItem}]`
    ) as HTMLElement;
    if (firstItem) {
      firstItem.tabIndex = 0;
      firstItem.focus();
    }

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
    this.isOpen ? this.close() : this.open();
  }

  destroy(): void {
    this.stopAutoPosition();
    window.removeEventListener("scroll", this.scrollHandler, true);
    window.removeEventListener("resize", this.resizeHandler);

    this.triggerElement?.removeEventListener("keydown", this.keydownHandler);
    this.targetElement?.removeEventListener("keydown", this.keydownHandler);
    if (this.triggerClickHandler) this.triggerElement?.removeEventListener("click", this.triggerClickHandler);
    if (this.triggerEnterHandler) this.triggerElement?.removeEventListener("mouseenter", this.triggerEnterHandler);
    if (this.triggerLeaveHandler) this.triggerElement?.removeEventListener("mouseleave", this.triggerLeaveHandler);
    if (this.targetEnterHandler) this.targetElement?.removeEventListener("mouseenter", this.targetEnterHandler);
    if (this.targetLeaveHandler) this.targetElement?.removeEventListener("mouseleave", this.targetLeaveHandler);

    if (this.observer) {
      this.observer.disconnect();
    }
    document.removeEventListener("click", this.outsideClickHandler);
  }

  setDropdownItemElement({ element }: { element: HTMLElement }): void {
    element.setAttribute("role", "menuitem");
    element.setAttribute(AcDropdownAttributeName.acDropdownItem, "");
    element.tabIndex = 0; // make focusable
  }

  setTargetElement({ element }: { element: HTMLElement }): void {
    this.targetElement = element;
    if (!this.targetElement.id) {
      this.targetElement.id = `${this.id}-menu`;
    }
    element.setAttribute(AcDropdownAttributeName.acDropdownTarget, "");
    element.setAttribute("role", "menu");
    element.style.position = "fixed";
    element.style.display = "none";
    element.style.zIndex = "9999";
    element.addEventListener("keydown", this.keydownHandler);

    if (this.trigger === "hover") {
      this.targetEnterHandler = () => this.open();
      this.targetLeaveHandler = () => this.close();
      element.addEventListener("mouseenter", this.targetEnterHandler);
      element.addEventListener("mouseleave", this.targetLeaveHandler);
    }
  }

  setTriggerElement({ element }: { element: HTMLElement }): void {
    this.triggerElement = element;
    element.setAttribute(AcDropdownAttributeName.acDropdownTrigger, "");
    this.triggerElement.setAttribute("aria-haspopup", "true");
    this.triggerElement.setAttribute("aria-expanded", "false");
    this.triggerElement.setAttribute("aria-controls", this.targetElement?.id ?? `${this.id}-menu`);
    this.triggerElement.addEventListener("keydown", this.keydownHandler);

    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting && this.isOpen) this.close();
      }
    });
    this.observer.observe(this.triggerElement);

    if (this.trigger === "click") {
      this.triggerClickHandler = (e) => {
        e.preventDefault();
        this.toggle();
      };
      this.triggerElement.addEventListener("click", this.triggerClickHandler);
    } else if (this.trigger === "hover") {
      this.triggerEnterHandler = () => this.open();
      this.triggerLeaveHandler = () => this.close();
      this.triggerElement.addEventListener("mouseenter", this.triggerEnterHandler);
      this.triggerElement.addEventListener("mouseleave", this.triggerLeaveHandler);
    }
  }

  private handleKeydown(e: KeyboardEvent): void {
    const items = Array.from(
      this.targetElement.querySelectorAll(`[${AcDropdownAttributeName.acDropdownItem}]`)
    ) as HTMLElement[];
    let index = items.indexOf(document.activeElement as HTMLElement);

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

    if (
      (this.autoClose === "both" && !isInsideTarget && !isInsideTrigger) ||
      (this.autoClose === "outside" && !isInsideTarget && !isInsideTrigger) ||
      (this.autoClose === "inside" && isInsideTarget)
    ) {
      this.close();
    }
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
    let top = 0,
      left = 0;

    switch (this.position) {
      case "bottom":
        top = rect.bottom + this.offset;
        left = rect.left;
        break;
      case "top":
        top = rect.top - this.targetElement.offsetHeight - this.offset;
        left = rect.left;
        break;
      case "left":
        top = rect.top;
        left = rect.left - this.targetElement.offsetWidth - this.offset;
        break;
      case "right":
        top = rect.top;
        left = rect.right + this.offset;
        break;
      case "auto":
      default:
        // Default auto places below, unless overflow
        top = rect.bottom + this.offset;
        left = rect.left;
        break;
    }

    // Flip if overflow
    const menuRect = this.targetElement.getBoundingClientRect();
    if (menuRect.bottom > window.innerHeight) {
      top = rect.top - this.targetElement.offsetHeight - this.offset;
    }
    if (menuRect.top < 0) {
      top = rect.bottom + this.offset;
    }
    if (menuRect.right > window.innerWidth) {
      left = rect.right - this.targetElement.offsetWidth;
    }
    if (menuRect.left < 0) {
      left = rect.left;
    }

    // Alignment
    if (this.alignment === "end") {
      left = rect.right - this.targetElement.offsetWidth;
    }

    this.targetElement.style.top = `${top}px`;
    this.targetElement.style.left = `${left}px`;
  }
}

acRegisterCustomElement({ tag: AC_DROPDOWN_TAG.dropdown, type: AcDropdown });
