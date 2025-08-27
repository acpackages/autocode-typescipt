// ac-popout-textarea-input.ts
// One class, all features. No frameworks, no wrapper <div>, only input + textarea.

import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcInputCssClassName } from "../consts/ac-input-css-class-name.const";
import { AcInputBase } from "../core/ac-input-base";
import { IAcPopoutTextareaOptions } from "../interfaces/input-options/ac-popout-textarea-input-options.interface";

export class AcPopoutTextareaInput extends AcInputBase {
  private textarea: HTMLTextAreaElement | null = null;

  private opts: Required<IAcPopoutTextareaOptions>;
  private isOpen = false;
  private preEditValue = "";
  private rafPending = false;
  private visibleInViewport = true;

  private io: IntersectionObserver | null = null;
  private boundRafTick: () => void;
  private boundScroll: (e: Event) => void;
  private boundResize: () => void;
  private boundDocMouseDown: (e: MouseEvent) => void;
  private boundKeydown: (e: KeyboardEvent) => void;

  constructor(options: IAcPopoutTextareaOptions = {}) {
    super();
    this.opts = {
      triggerOnFocus: options.triggerOnFocus ?? true,
      triggerOnDblClick: options.triggerOnDblClick ?? false,
      persistent: options.persistent ?? false,
      placementPreference: options.placementPreference ?? ["bottom", "top", "right", "left"],
      animationDurationMs: options.animationDurationMs ?? 180,
      animationEasing: options.animationEasing ?? "ease",
      minWidthPx: options.minWidthPx ?? 0,
      maxWidthPx: options.maxWidthPx ?? 0,
      matchInputWidth: options.matchInputWidth ?? true,
      minHeightPx: options.minHeightPx ?? 0,
      maxHeightPx: options.maxHeightPx ?? 300,
      paddingPx: options.paddingPx ?? 8,
      borderRadiusPx: options.borderRadiusPx ?? 6,
      autoGrow: options.autoGrow ?? true,
      autoTrimOnClose: options.autoTrimOnClose ?? false,
      respectMaxLength: options.respectMaxLength ?? true,
      liveSync: options.liveSync ?? true,
      styleOverrides: options.styleOverrides ?? {},
      copyInputPlaceholder: options.copyInputPlaceholder ?? true,
      copyDisabledReadonly: options.copyDisabledReadonly ?? true,
    };
    this.boundRafTick = () => this.rafUpdate();
    this.boundScroll = () => this.queueRaf();
    this.boundResize = () => this.queueRaf();
    this.boundDocMouseDown = (e) => this.handleDocMouseDown(e);
    this.boundKeydown = (e) => this.handleKeyDown(e);
    if (this.opts.triggerOnFocus) {
      this.element.addEventListener("focus", () => this.open());
    }
    if (this.opts.triggerOnDblClick) {
      this.element.addEventListener("dblclick", () => this.open());
    }
    this.setupIntersectionObserver();
  }

  private applyBaseStyles() {
    if (!this.textarea) return;
    const ta = this.textarea;
    const cs = getComputedStyle(this.element);
    const inputRect = this.element.getBoundingClientRect();
    const minWidth = this.opts.minWidthPx || inputRect.width;
    const minHeight = this.opts.minHeightPx || inputRect.height;
    ta.style.position = "fixed";
    ta.style.zIndex = "9999";
    ta.style.boxSizing = "border-box";
    ta.style.resize = "none";
    ta.style.overflow = "hidden";
    ta.style.padding = `${this.opts.paddingPx}px`;
    ta.style.border = `1px solid ${cs.borderColor || "#ccc"}`;
    ta.style.borderRadius = `${this.opts.borderRadiusPx}px`;
    ta.style.background = cs.backgroundColor || "#fff";
    ta.style.color = cs.color || "#000";
    ta.style.font = cs.font || "inherit";
    ta.style.lineHeight = cs.lineHeight || "1.4";
    ta.style.letterSpacing = cs.letterSpacing || "normal";
    ta.style.whiteSpace = "pre-wrap";
    ta.style.minWidth = `${minWidth}px`;
    ta.style.minHeight = `${minHeight}px`;
    ta.style.maxHeight = `${this.opts.maxHeightPx}px`;
    ta.style.opacity = "0";
    ta.style.transform = "scale(0.98)";
    ta.style.pointerEvents = "none";
    ta.style.transition = `transform ${this.opts.animationDurationMs}ms ${this.opts.animationEasing}, opacity ${this.opts.animationDurationMs}ms ${this.opts.animationEasing}`;
    if (this.opts.copyInputPlaceholder) ta.placeholder = this.element.placeholder || "";
    if (this.opts.respectMaxLength && this.element.maxLength > 0) {
      ta.maxLength = this.element.maxLength;
    }
    if (this.opts.copyDisabledReadonly) {
      ta.readOnly = this.element.readOnly;
      ta.disabled = this.element.disabled;
    }
    Object.assign(ta.style, this.opts.styleOverrides);
  }

  private applyPosition() {
    if (!this.textarea) return;
    const rect = this.element.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const matchWidth = this.opts.matchInputWidth;
    const desiredWidth = matchWidth ? rect.width : Math.max(rect.width, this.opts.minWidthPx || rect.width);
    const maxWidth = this.opts.maxWidthPx || (vw - 16);
    const taW = Math.min(desiredWidth, maxWidth);
    const currentHeight = this.textarea.offsetHeight || (this.opts.minHeightPx || rect.height);
    const taH = Math.min(Math.max(currentHeight, this.opts.minHeightPx || rect.height), this.opts.maxHeightPx);
    const place = this.choosePlacement(rect, taW, taH);
    let top = rect.bottom;
    let left = rect.left;
    if (place === "top") top = rect.top - taH;
    if (place === "right") { top = rect.top; left = rect.right; }
    if (place === "left") { top = rect.top; left = rect.left - taW; }
    const margin = 8;
    top = Math.max(margin, Math.min(top, vh - taH - margin));
    left = Math.max(margin, Math.min(left, vw - taW - margin));
    this.textarea.style.top = `${top}px`;
    this.textarea.style.left = `${left}px`;
    this.textarea.style.width = `${taW}px`;
  }

  private autoGrow() {
    if (!this.textarea || !this.opts.autoGrow) return;
    this.textarea.style.height = "auto";
    const target = Math.min(this.textarea.scrollHeight, this.opts.maxHeightPx);
    this.textarea.style.height = `${target}px`;
    this.textarea.style.overflowY = this.textarea.scrollHeight > this.opts.maxHeightPx ? "auto" : "hidden";
  }

  private choosePlacement(rect: DOMRect, taW: number, taH: number): any {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const fits: any = {
      bottom: rect.bottom + taH <= vh,
      top: rect.top - taH >= 0,
      right: rect.right + taW <= vw,
      left: rect.left - taW >= 0,
    };
    for (const p of this.opts.placementPreference) {
      if (fits[p]) return p;
    }
    const space: any = {
      bottom: vh - rect.bottom,
      top: rect.top,
      right: vw - rect.right,
      left: rect.left,
    };
    return (Object.keys(space) as any[]).sort((a, b) => space[b] - space[a])[0];
  }

  close(reason: "api" | "blur" | "confirm" | "cancel" | "hidden" = "api") {
    if (!this.isOpen || !this.textarea) return;
    const finalValue = this.opts.autoTrimOnClose
      ? this.textarea.value.replace(/[ \t]+$/gm, "").replace(/\s+$/g, "")
      : this.textarea.value;
    if (reason === "cancel") {
      this.element.value = this.preEditValue;
    } else {
      this.element.value = finalValue;
    }
    const rect = this.element.getBoundingClientRect();
    this.textarea.style.transition = "all 0.25s ease";
    this.textarea.style.width = rect.width + "px";
    this.textarea.style.height = rect.height + "px";
    this.textarea.style.left = rect.left + "px";
    this.textarea.style.top = rect.top + "px";
    this.textarea.style.opacity = "0";
    this.textarea.style.pointerEvents = "none";
    const duration = this.opts.animationDurationMs;
    setTimeout(() => {
      this.teardownTextarea();
      this.isOpen = false;
      window.removeEventListener("scroll", this.boundScroll, true);
      window.removeEventListener("resize", this.boundResize, true);
      document.removeEventListener("mousedown", this.boundDocMouseDown, true);
      document.removeEventListener("keydown", this.boundKeydown, true);
    }, duration);
  }

  override destroy() {
    this.close("api");
    this.io?.disconnect();
    this.element.replaceWith(this.element);
    if (this.opts.triggerOnFocus) {
      this.element.removeEventListener("focus", () => this.open());
    }
    if (this.opts.triggerOnDblClick) {
      this.element.removeEventListener("dblclick", () => this.open());
    }
  }

  private ensureTextarea() {
    if (this.textarea) return;
    const ta = document.createElement("textarea");
    this.textarea = ta;
    document.body.appendChild(ta);
    ta.addEventListener("input", () => {
      if (!this.textarea) return;
      if (this.opts.respectMaxLength && this.element.maxLength > 0) {
        if (this.textarea.value.length > this.element.maxLength) {
          this.textarea.value = this.textarea.value.slice(0, this.element.maxLength);
        }
      }
      if (this.opts.liveSync) {
        this.element.value = this.textarea.value;
        this.value = this.textarea.value;
      }
      if (this.opts.autoGrow) this.autoGrow();
    });
    ta.addEventListener("blur", () => {
      if (this.opts.persistent) return;
      this.close("blur");
    });
  }

  override focus() {
    this.element.focus();
    this.open();
  }

  private handleDocMouseDown(e: MouseEvent) {
    if (!this.isOpen || !this.textarea) return;
    const target = e.target as Node;
    if (target === this.textarea || target === this.element || this.textarea.contains(target)) return;
    if (this.opts.persistent) {
      return;
    }
    this.close("blur");
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (!this.isOpen || !this.textarea) return;
    if (e.key === "Escape") {
      e.stopPropagation();
      e.preventDefault();
      this.close("cancel");
      this.element.focus();
      return;
    }
    if ((e.key === "Enter" && (e.ctrlKey || e.metaKey))) {
      e.stopPropagation();
      e.preventDefault();
      this.close("confirm");
      this.element.focus();
      return;
    }
  }

  private isDisabledReadonly(): boolean {
    if (!this.opts.copyDisabledReadonly) return false;
    return this.element.disabled || this.element.readOnly;
  }

  override init(): void {
      super.init();
      acAddClassToElement({cssClass:AcInputCssClassName.acTextInput,element:this.element});
    }

  open() {
    if (this.isOpen || this.isDisabledReadonly()) return;
    this.preEditValue = this.value;
    this.ensureTextarea();
    this.applyBaseStyles();
    this.syncFromInputToTextarea(true);
    this.isOpen = true;
    this.queueRaf();
    window.addEventListener("scroll", this.boundScroll, true);
    window.addEventListener("resize", this.boundResize, true);
    document.addEventListener("mousedown", this.boundDocMouseDown, true);
    document.addEventListener("keydown", this.boundKeydown, true);
    requestAnimationFrame(() => {
      if (!this.textarea) return;
      const rect = this.element.getBoundingClientRect();
      this.textarea.style.width = rect.width + "px";
      this.textarea.style.height = rect.height + "px";
      this.textarea.style.left = rect.left + "px";
      this.textarea.style.top = rect.top + "px";
      this.textarea.style.resize = 'auto';
      this.textarea.getBoundingClientRect();
      this.textarea.style.transition = "all 0.25s ease";
      this.textarea.style.opacity = "1";
      this.textarea.style.transform = "scale(1)";
      this.textarea.style.pointerEvents = "auto";
      this.autoGrow();
      this.textarea.focus();
    });
  }

  private queueRaf() {
    if (!this.isOpen || this.rafPending) return;
    this.rafPending = true;
    requestAnimationFrame(this.boundRafTick);
  }

  private rafUpdate() {
    this.rafPending = false;
    if (!this.isOpen || !this.textarea) return;
    const rect = this.element.getBoundingClientRect();
    const inViewport =
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < window.innerHeight &&
      rect.left < window.innerWidth;
    if (!inViewport) {
      this.textarea.style.visibility = "hidden";
      this.visibleInViewport = false;
      if (!this.opts.persistent) {
        this.close("hidden");
        return;
      }
    } else {
      if (!this.visibleInViewport) {
        this.textarea.style.visibility = "visible";
      }
      this.visibleInViewport = true;
    }
    if (this.opts.autoGrow) this.autoGrow();
    this.applyPosition();
  }

  override setValue(value: any) {
    super.setValue(value);
    if (this.isOpen && this.textarea) {
      this.textarea.value = value;
      this.autoGrow();
      this.queueRaf();
    }
  }

  private setupIntersectionObserver() {
    if (!("IntersectionObserver" in window)) return;
    this.io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!this.isOpen) return;
        const isVisible = entry.isIntersecting;
        if (!isVisible && !this.opts.persistent) {
          this.close("hidden");
        } else if (this.textarea) {
          this.textarea.style.visibility = isVisible ? "visible" : "hidden";
        }
      }
    }, { root: null, threshold: 0 });
    this.io.observe(this.element);
  }

  private syncFromInputToTextarea(moveCaretToEnd = false) {
    if (!this.textarea) return;
    this.textarea.value = this.value;
    if (this.opts.autoGrow) this.autoGrow();
    if (moveCaretToEnd) {
      const len = this.textarea.value.length;
      this.textarea.setSelectionRange(len, len);
    }
  }

  private teardownTextarea(): void {
    if (!this.textarea) return;
    this.element.value = this.textarea.value;
    if (this.textarea.parentElement) {
      this.textarea.parentElement.removeChild(this.textarea);
    }
    this.textarea = null;
  }

}

