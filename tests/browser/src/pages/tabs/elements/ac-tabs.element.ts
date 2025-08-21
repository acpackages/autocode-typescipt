/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents, Autocode } from "@autocode-ts/autocode";
import { IAcTabsOptions } from "../interfaces/ac-tabs-options.interface";

export enum AcEnumTabsEvent {
  Show = "show",
  Shown = "shown",
  Hide = "hide",
  Hidden = "hidden",
  Toggle = "toggle",
}

export class AcTabs {
  private element!: HTMLElement;
  events: AcEvents = new AcEvents();
  private id: string = Autocode.uuid();
  private tabHeaders: HTMLElement[] = [];
  private tabContents: HTMLElement[] = [];
  private activeIndex: number = 0;
  private keydownHandler: (e: KeyboardEvent) => void;
  private options: IAcTabsOptions;
  private animationDuration: number = 200; // milliseconds

  constructor({ element, options }: { element: HTMLElement; options?: IAcTabsOptions }) {
    this.element = element;
    this.options = options ?? {};
    this.element.setAttribute("role", "tablist");
    this.element.setAttribute("aria-orientation", this.options.orientation ?? "horizontal");

    this.keydownHandler = (e) => this.handleKeydown(e);

    // Initialize tabs
    this.initTabs();
  }

  private initTabs() {
    this.tabHeaders = Array.from(this.element.querySelectorAll("[data-ac-tab]")) as HTMLElement[];
    this.tabContents = this.tabHeaders.map((header) => {
      const targetId = header.getAttribute("data-ac-tab-target");
      return document.getElementById(targetId!) as HTMLElement;
    });

    this.tabHeaders.forEach((header, index) => {
      header.setAttribute("role", "tab");
      header.setAttribute("tabindex", index === 0 ? "0" : "-1");
      header.setAttribute("aria-selected", index === 0 ? "true" : "false");
      header.addEventListener("click", (e) => { e.preventDefault(); this.activate(index); });
      header.addEventListener("keydown", this.keydownHandler);
      if (header.hasAttribute("data-disabled")) header.setAttribute("aria-disabled", "true");
    });

    this.tabContents.forEach((content, index) => {
      content.setAttribute("role", "tabpanel");
      content.setAttribute("aria-labelledby", this.tabHeaders[index].id ?? "");
      content.style.display = index === 0 ? "block" : "none";
      content.style.opacity = index === 0 ? "1" : "0";
      content.style.transition = ""; // remove CSS dependency
    });

    this.activeIndex = 0;
  }

  private fadeIn(element: HTMLElement, callback?: Function) {
    element.style.display = "block";
    element.style.opacity = "0";
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / this.animationDuration, 1);
      element.style.opacity = String(progress);
      if (progress < 1) requestAnimationFrame(animate);
      else callback?.();
    };
    requestAnimationFrame(animate);
  }

  private fadeOut(element: HTMLElement, callback?: Function) {
    element.style.opacity = "1";
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / this.animationDuration, 1);
      element.style.opacity = String(1 - progress);
      if (progress < 1) requestAnimationFrame(animate);
      else {
        element.style.display = "none";
        callback?.();
      }
    };
    requestAnimationFrame(animate);
  }

  activate(index: number) {
    if (index === this.activeIndex || this.tabHeaders[index].getAttribute("aria-disabled") === "true") return;

    const currentHeader = this.tabHeaders[this.activeIndex];
    const currentContent = this.tabContents[this.activeIndex];
    const nextHeader = this.tabHeaders[index];
    const nextContent = this.tabContents[index];

    this.events.execute({ eventName: AcEnumTabsEvent.Hide, args: { index: this.activeIndex, tab: this } });
    this.events.execute({ eventName: AcEnumTabsEvent.Show, args: { index, tab: this } });

    currentHeader.classList.remove("active");
    currentHeader.setAttribute("tabindex", "-1");
    currentHeader.setAttribute("aria-selected", "false");

    nextHeader.classList.add("active");
    nextHeader.setAttribute("tabindex", "0");
    nextHeader.setAttribute("aria-selected", "true");
    nextHeader.focus();

    this.fadeOut(currentContent, () => {
      this.fadeIn(nextContent, () => {
        this.activeIndex = index;
        this.events.execute({ eventName: AcEnumTabsEvent.Hidden, args: { index: this.activeIndex, tab: this } });
        this.events.execute({ eventName: AcEnumTabsEvent.Shown, args: { index, tab: this } });
        this.events.execute({ eventName: AcEnumTabsEvent.Toggle, args: { index, tab: this } });
      });
    });
  }

  private handleKeydown(e: KeyboardEvent) {
    const max = this.tabHeaders.length - 1;
    let newIndex = this.activeIndex;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        do { newIndex = (newIndex + 1) % this.tabHeaders.length; }
        while (this.tabHeaders[newIndex].getAttribute("aria-disabled") === "true");
        this.activate(newIndex);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        do { newIndex = (newIndex - 1 + this.tabHeaders.length) % this.tabHeaders.length; }
        while (this.tabHeaders[newIndex].getAttribute("aria-disabled") === "true");
        this.activate(newIndex);
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        while (this.tabHeaders[newIndex].getAttribute("aria-disabled") === "true") newIndex++;
        this.activate(newIndex);
        break;
      case "End":
        e.preventDefault();
        newIndex = max;
        while (this.tabHeaders[newIndex].getAttribute("aria-disabled") === "true") newIndex--;
        this.activate(newIndex);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        this.activate(newIndex);
        break;
    }
  }

  on({ eventName, callback }: { eventName: AcEnumTabsEvent; callback: Function }): string {
    return this.events.subscribe({ eventName, callback });
  }

  destroy() {
    this.tabHeaders.forEach((header) => header.removeEventListener("keydown", this.keydownHandler));
  }
}
