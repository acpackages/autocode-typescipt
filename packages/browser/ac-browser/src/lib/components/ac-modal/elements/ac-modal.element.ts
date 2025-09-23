import { AcEvents } from "@autocode-ts/autocode";
import { AcEnumModalEvent } from "../enums/ac-enum-modal-event.enum";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_MODAL_TAG } from "../consts/ac-modal-tag.const";
import { AcElementBase } from "../../../core/ac-element-base";

/* eslint-disable @typescript-eslint/no-inferrable-types */
export class AcModal extends AcElementBase{
  private backdrop: HTMLElement | null = null;
  private isOpen: boolean = false;
  private animationDuration: number = 400; // ms
  private lastTrigger?: HTMLElement;
  private cloneEl?: HTMLElement;

  constructor() {
    super();
    Object.assign(this.style, {
      display: "none",
      position: "fixed",
      zIndex: "1050",
      background: "#fff",
      boxShadow: "0 3px 9px rgba(0,0,0,.5)",
      maxWidth: "500px",
      width: "90%",
      borderRadius: "8px",
      overflow: "hidden",
      willChange: "transform, opacity",
    } as Partial<CSSStyleDeclaration>);
  }


  private fadeOutModal() {
    this.style.transition = `opacity ${this.animationDuration}ms ease`;
    this.style.opacity = "0";
    if (this.backdrop) this.backdrop.style.opacity = "0";

    setTimeout(() => {
      this.style.display = "none";
      if (this.backdrop && this.backdrop.parentElement) {
        this.backdrop.parentElement.removeChild(this.backdrop);
        this.backdrop = null;
      }
      document.body.style.overflow = "";
      document.removeEventListener("keydown", this.handleEscape);
      this.style.transition = "";
      this.style.opacity = "";
    }, this.animationDuration);
  }

  private handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      this.hide();
    }
  };

  /**
   * Hide modal and morph back to trigger element using clone.
   */
  hide() {
    if (!this.isOpen) return;
    this.isOpen = false;

    // If no trigger or clone, just fade out modal + backdrop
    if (!this.lastTrigger) {
      this.fadeOutModal();
      return;
    }

    // Create clone from modal content for morph-back animation
    this.cloneEl = this.cloneNode(true) as HTMLElement;

    // Get modal position & size
    const modalRect = this.getBoundingClientRect();

    // Style clone to exactly overlay the modal
    Object.assign(this.cloneEl.style, {
      position: "fixed",
      left: `${modalRect.left}px`,
      top: `${modalRect.top}px`,
      width: `${modalRect.width}px`,
      height: `${modalRect.height}px`,
      margin: "0",
      zIndex: "1060",
      borderRadius: this.style.borderRadius,
      boxShadow: this.style.boxShadow,
      background: this.style.background,
      overflow: "hidden",
      pointerEvents: "none",
      transition: `all ${this.animationDuration}ms ease`,
      opacity: "1",
    });

    document.body.appendChild(this.cloneEl);

    // Hide actual modal immediately
    this.style.display = "none";

    // Animate backdrop fade out
    if (this.backdrop) {
      this.backdrop.remove();
    }

    // Animate clone back to trigger
    const triggerRect = this.lastTrigger.getBoundingClientRect();

    // Force reflow for clone before animating
    this.cloneEl.getBoundingClientRect();

    requestAnimationFrame(() => {
      Object.assign(this.cloneEl!.style, {
        left: `${triggerRect.left}px`,
        top: `${triggerRect.top}px`,
        width: `${triggerRect.width}px`,
        height: `${triggerRect.height}px`,
        borderRadius: getComputedStyle(this.lastTrigger!).borderRadius || "0",
        boxShadow: getComputedStyle(this.lastTrigger!).boxShadow || "none",
        background: getComputedStyle(this.lastTrigger!).backgroundColor || "#fff",
        opacity: "0",
      });
    });

    // Cleanup after animation ends
    const onTransitionEnd = () => {
      this.cloneEl?.removeEventListener("transitionend", onTransitionEnd);
      if (this.cloneEl && this.cloneEl.parentElement) {
        this.cloneEl.parentElement.removeChild(this.cloneEl);
        this.cloneEl = undefined;
      }
      if (this.backdrop && this.backdrop.parentElement) {
        this.backdrop.parentElement.removeChild(this.backdrop);
        this.backdrop = null;
      }
      document.body.style.overflow = "";
      document.removeEventListener("keydown", this.handleEscape);
      this.lastTrigger = undefined;
      this.events.execute({event:AcEnumModalEvent.Hide});
    };

    this.cloneEl.addEventListener("transitionend", onTransitionEnd);
  }

  /**
   * Show modal with clone morph animation from trigger element.
   */
  show({triggerElement}:{triggerElement?: HTMLElement} = {}) {
    if (this.isOpen) return;
    this.isOpen = true;
    this.lastTrigger = triggerElement;

    // Create backdrop
    this.backdrop = document.createElement("div");
    Object.assign(this.backdrop.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.5)",
      opacity: "0",
      transition: `opacity ${this.animationDuration}ms ease`,
      zIndex: "1040",
    } as Partial<CSSStyleDeclaration>);
    document.body.appendChild(this.backdrop);

    // Prevent background scroll
    document.body.style.overflow = "hidden";

    // Compute modal final size and position
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const finalWidth = Math.min(500, vw * 0.9);
    this.style.width = `${finalWidth}px`;
    this.style.display = "block";

    // Force reflow to get modal height for final position
    const finalHeight = this.offsetHeight || 300;

    const finalLeft = Math.round((vw - finalWidth) / 2);
    const finalTop = Math.round((vh - finalHeight) / 2);

    // Position modal at final place but hide it (opacity 0)
    Object.assign(this.style, {
      left: `${finalLeft}px`,
      top: `${finalTop}px`,
      opacity: "0",
      pointerEvents: "none", // Disable interactions during animation
    });

    // If no trigger, just fade in modal + backdrop
    if (!triggerElement) {
      this.style.transition = `opacity ${this.animationDuration}ms ease`;
      requestAnimationFrame(() => {
        this.style.opacity = "1";
        if (this.backdrop) this.backdrop.style.opacity = "1";
        this.style.pointerEvents = "";
      });
      // Close on backdrop click
      this.backdrop.addEventListener("click", () => this.hide(), { once: true });
      document.addEventListener("keydown", this.handleEscape);
      return;
    }

    // Clone the trigger element for animation
    this.cloneEl = triggerElement.cloneNode(true) as HTMLElement;

    // Get trigger position & size
    const triggerRect = triggerElement.getBoundingClientRect();

    // Style the clone exactly over the trigger element
    Object.assign(this.cloneEl.style, {
      position: "fixed",
      left: `${triggerRect.left}px`,
      top: `${triggerRect.top}px`,
      width: `${triggerRect.width}px`,
      height: `${triggerRect.height}px`,
      margin: "0",
      zIndex: "1060",
      borderRadius: getComputedStyle(triggerElement).borderRadius || "0",
      boxShadow: getComputedStyle(triggerElement).boxShadow || "none",
      transition: `all ${this.animationDuration}ms ease`,
      overflow: "hidden",
      background: getComputedStyle(triggerElement).backgroundColor || "#fff",
      pointerEvents: "none",
    });

    document.body.appendChild(this.cloneEl);

    // Hide the actual modal content until animation finishes
    this.style.visibility = "hidden";

    // Force reflow for clone before animating
    this.cloneEl.getBoundingClientRect();

    // Animate clone to modal final position + size
    requestAnimationFrame(() => {
      Object.assign(this.cloneEl!.style, {
        left: `${finalLeft}px`,
        top: `${finalTop}px`,
        width: `${finalWidth}px`,
        height: `${finalHeight}px`,
        borderRadius: this.style.borderRadius,
        boxShadow: this.style.boxShadow,
        background: this.style.background,
      });
      if (this.backdrop) this.backdrop.style.opacity = "1";
    });

    // When animation ends, show modal and remove clone
    const onTransitionEnd = () => {
      this.cloneEl?.removeEventListener("transitionend", onTransitionEnd);
      if (this.cloneEl && this.cloneEl.parentElement) {
        this.cloneEl.parentElement.removeChild(this.cloneEl);
        this.cloneEl = undefined;
      }
      this.style.visibility = "visible";
      this.style.opacity = "1";
      this.style.pointerEvents = "";
      this.events.execute({event:AcEnumModalEvent.Show});
    };

    this.cloneEl.addEventListener("transitionend", onTransitionEnd);

    // Close on backdrop click
    this.backdrop.addEventListener("click", () => this.hide(), { once: true });

    // Escape to close
    document.addEventListener("keydown", this.handleEscape);
  }

}

acRegisterCustomElement({tag:AC_MODAL_TAG.modal,type:AcModal});
