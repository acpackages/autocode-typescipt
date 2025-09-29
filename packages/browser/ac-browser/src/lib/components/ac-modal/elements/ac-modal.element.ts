import { AcEvents } from "@autocode-ts/autocode";
import { AcEnumModalEvent } from "../enums/ac-enum-modal-event.enum";
import { acMorphElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_MODAL_TAG } from "../consts/ac-modal-tag.const";
import { AcElementBase } from "../../../core/ac-element-base";
import { AC_MODAL_CONFIG } from "../consts/ac-modal-config.const";

/* eslint-disable @typescript-eslint/no-inferrable-types */
export class AcModal extends AcElementBase {
  private backdrop: HTMLElement | null = null;
  private isOpen: boolean = false;
  animationDuration: number = AC_MODAL_CONFIG.animationDuration; // ms
  private lastTrigger?: HTMLElement;
  private morphTriggerColor?:string;
  private morphModalColor?:string;
  private cloneEl?: HTMLElement;

  constructor() {
    super();
    Object.assign(this.style, AC_MODAL_CONFIG.closeStyle);
  }

  /**
   * Hide modal and morph back to trigger element using clone.
   */
  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    // If no trigger or clone, just fade out modal + backdrop
    if (!this.lastTrigger) {
      this.fadeOutModal();
      return;
    }
    this.cloneEl = this.cloneNode(true) as HTMLElement;

    // Get modal position & size
    const modalRect = this.getBoundingClientRect();

    acMorphElement({source:this,destination:this.lastTrigger,destinationColor:this.morphTriggerColor,sourceColor:this.morphModalColor});

    if (this.backdrop) {
      this.backdrop.remove();
    }

    this.style.display = "none";
    this.events.execute({ event: AcEnumModalEvent.Close });

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
      this.close();
    }
  };

  /**
   * Show modal with clone morph animation from trigger element.
   */
  open({ triggerElement, morphTriggerColor,morphModalColor }: { triggerElement?: HTMLElement,morphTriggerColor?:string,morphModalColor?:string } = {}) {
    if (this.isOpen) return;
    this.isOpen = true;
    this.lastTrigger = triggerElement;

    // Create backdrop
    this.backdrop = document.createElement("div");
    const style = {...AC_MODAL_CONFIG.openStyle, "transition":`opacity ${this.animationDuration}ms ease`};
    Object.assign(this.backdrop.style, style);
    document.body.appendChild(this.backdrop);

    document.body.style.overflow = "hidden";

    // Compute modal final size & position
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const finalWidth = Math.min(500, vw * 0.9);
    this.style.width = `${finalWidth}px`;
    this.style.display = "block";

    const finalHeight = this.offsetHeight || 300;
    const finalLeft = Math.round((vw - finalWidth) / 2);
    const finalTop = Math.round((vh - finalHeight) / 2);

    Object.assign(this.style, {
      left: `${finalLeft}px`,
      top: `${finalTop}px`,
      opacity: "0",
      pointerEvents: "none",
    });

    if (!triggerElement) {
      // No trigger → simple fade-in
      this.style.transition = `opacity ${this.animationDuration}ms ease`;
      requestAnimationFrame(() => {
        this.style.opacity = "1";
        if (this.backdrop) this.backdrop.style.opacity = "1";
        this.style.pointerEvents = "";
      });
      this.backdrop.addEventListener("click", () => this.close(), { once: true });
      document.addEventListener("keydown", this.handleEscape);
      return;
    }
    this.style.visibility = "hidden";

    acMorphElement({ source: triggerElement, destination: this, duration: this.animationDuration,sourceColor:morphTriggerColor,destinationColor:morphModalColor });

    setTimeout(() => {
      this.style.visibility = "visible";
      this.style.opacity = "1";
      this.style.pointerEvents = "";
      if (this.backdrop) this.backdrop.style.opacity = "1";
      this.events.execute({ event: AcEnumModalEvent.Open });
    }, this.animationDuration);

    this.backdrop.addEventListener("click", () => this.close(), { once: true });
    document.addEventListener("keydown", this.handleEscape);
  }

}

acRegisterCustomElement({ tag: AC_MODAL_TAG.modal, type: AcModal });
