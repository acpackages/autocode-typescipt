import { AcEvents, Autocode } from "@autocode-ts/autocode";
import { AcDropdownAttributeName, AcEnumDropdownEvent, AcEnumDropdownTriggerAction } from "../_ac-dropdown.export";
import { AcEnumDropdownPosition } from "../enums/ac-enum-dropdown-position.enum";
import { IAcDropdownOptions } from "../interfaces/ac-dropdown-options.interface";

export class AcDropdown {
  private element!: HTMLElement;
  events:AcEvents = new AcEvents();
  private keydownHandler: (e: KeyboardEvent) => void;
  private id:string = Autocode.uuid();
  private isOpen = false;
  private observer!: IntersectionObserver;
  private offset: number;
  private outsideClickHandler: (e: MouseEvent) => void;
  private position: AcEnumDropdownPosition;
  private positionAnimationFrameId?: number;
  private resizeHandler: () => void;
  private scrollHandler: () => void;
  private targetElement!: HTMLElement;
  private triggerAction = AcEnumDropdownTriggerAction.Click;
  private triggerElement!: HTMLElement;

  constructor({ element, options }: { element: HTMLElement, options: IAcDropdownOptions }) {
    this.element = element;
    this.element.setAttribute(AcDropdownAttributeName.acDropdownId,this.id);
    this.element.setAttribute(AcDropdownAttributeName.acDropdown,"");

    this.element.querySelectorAll(`[${AcDropdownAttributeName.acDropdownTarget}]`).forEach((el)=>{
      this.setTargetElement({element:el as HTMLElement});
    });
    this.element.querySelectorAll(`[${AcDropdownAttributeName.acDropdownTrigger}]`).forEach((el)=>{
      this.setTriggerElement({element:el as HTMLElement});
    });
    this.element.querySelectorAll(`[${AcDropdownAttributeName.acDropdownItem}]`).forEach((el)=>{
      this.setDropdownItemElement({element:el as HTMLElement});
    });


    this.position = options.position ?? AcEnumDropdownPosition.Auto;
    this.offset = options.offset ?? 4;
    this.keydownHandler = (e) => this.handleKeydown(e);

    this.outsideClickHandler = (e) => {
      if (this.triggerElement && this.targetElement) {
        if (!this.targetElement.contains(e.target as Node) && !this.triggerElement.contains(e.target as Node)) {
          this.close();
        }
      }
    };

    this.scrollHandler = () => this.updatePosition();
    this.resizeHandler = () => this.updatePosition();

    window.addEventListener("scroll", this.scrollHandler, true);
    window.addEventListener("resize", this.resizeHandler);
  }

  close():void{
    if (!this.isOpen) return;
    this.isOpen = false;
    this.targetElement.style.display = "none";
    this.stopAutoPosition();
    document.removeEventListener("click", this.outsideClickHandler);
    this.triggerElement.setAttribute("aria-expanded", "false");
    this.events.execute({eventName:AcEnumDropdownEvent.Close,args:{dropdown:this}});
    this.events.execute({eventName:AcEnumDropdownEvent.Toggle,args:{dropdown:this}});
  }

  destroy():void{
    this.stopAutoPosition();
    window.removeEventListener("scroll", this.scrollHandler, true);
    window.removeEventListener("resize", this.resizeHandler);
    this.triggerElement.removeEventListener("keydown", this.keydownHandler);
    this.targetElement.removeEventListener("keydown", this.keydownHandler);
    this.observer.disconnect();
  }

  private handleKeydown(e: KeyboardEvent):void{
    const items = Array.from(this.targetElement.querySelectorAll(`[${AcDropdownAttributeName.acDropdownItem}]`)) as HTMLElement[];
    const index = items.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        items[(index + 1) % items.length]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        items[(index - 1 + items.length) % items.length]?.focus();
        break;
      case "Escape":
        this.close();
        this.triggerElement.focus();
        break;
      case "Enter":
      case " ":
        (document.activeElement as HTMLElement).click();
        break;
    }
  }

  open():void{
    if (this.isOpen) return;
    this.isOpen = true;
    this.targetElement.style.display = "block";
    this.updatePosition();
    this.startAutoPosition();
    document.addEventListener("click", this.outsideClickHandler);
    this.triggerElement.setAttribute("aria-expanded", "true");

    const firstItem = this.targetElement.querySelector(`[${AcDropdownAttributeName.acDropdownItem}]`) as HTMLElement;
    if (firstItem) firstItem.focus();

    this.events.execute({eventName:AcEnumDropdownEvent.Open,args:{dropdown:this}});
    this.events.execute({eventName:AcEnumDropdownEvent.Toggle,args:{dropdown:this}});
  }

  on({eventName,callback}:{eventName:AcEnumDropdownEvent,callback:Function}):string{
    return this.events.subscribe({eventName:eventName,callback:callback});
  }

  setDropdownItemElement({ element }: { element: HTMLElement }):void{
    element.setAttribute('role',"menuitem");
    element.setAttribute(AcDropdownAttributeName.acDropdownItem,'');
    this.targetElement.setAttribute("role", "menu");
    this.targetElement.style.position = "fixed";
    this.targetElement.style.display = "none";
    this.targetElement.style.zIndex = "9999";
    this.targetElement.addEventListener("keydown", this.keydownHandler);
    if (this.triggerAction == AcEnumDropdownTriggerAction.Hover) {
      this.targetElement.addEventListener("mouseenter", () => this.open());
      this.targetElement.addEventListener("mouseleave", () => this.close());
    }
  }

  setTargetElement({ element }: { element: HTMLElement }):void{
    this.targetElement = element;
    element.setAttribute(AcDropdownAttributeName.acDropdownTarget,"");
    this.targetElement.setAttribute("role", "menu");
    this.targetElement.style.position = "fixed";
    this.targetElement.style.display = "none";
    this.targetElement.style.zIndex = "9999";
    this.targetElement.addEventListener("keydown", this.keydownHandler);
    if (this.triggerAction == AcEnumDropdownTriggerAction.Hover) {
      this.targetElement.addEventListener("mouseenter", () => this.open());
      this.targetElement.addEventListener("mouseleave", () => this.close());
    }
  }

  setTriggerElement({ element }: { element: HTMLElement }):void{
    this.triggerElement = element;
    element.setAttribute(AcDropdownAttributeName.acDropdownTarget,"");
    this.triggerElement.setAttribute("aria-haspopup", "true");
    this.triggerElement.setAttribute("aria-expanded", "false");
    this.triggerElement.addEventListener("keydown", this.keydownHandler);
    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting && this.isOpen) this.close();
      }
    });
    this.observer.observe(this.triggerElement);
    if (this.triggerAction == AcEnumDropdownTriggerAction.Click) {
      this.triggerElement.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggle();
      });
    }
    else if (this.triggerAction == AcEnumDropdownTriggerAction.Hover) {
      this.triggerElement.addEventListener("mouseenter", () => this.open());
      this.triggerElement.addEventListener("mouseleave", () => this.close());
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

  toggle():void{
    if (this.isOpen) {
      this.close();
    }
    else {
      this.open();
    }
  }

  private updatePosition():void{
    if (!this.isOpen) return;

    const rect = this.triggerElement.getBoundingClientRect();
    let top = 0, left = 0;

    switch (this.position) {
      case AcEnumDropdownPosition.Bottom:
        top = rect.bottom + this.offset;
        left = rect.left;
        break;
      case AcEnumDropdownPosition.Top:
        top = rect.top - this.targetElement.offsetHeight - this.offset;
        left = rect.left;
        break;
      case AcEnumDropdownPosition.Left:
        top = rect.top;
        left = rect.left - this.targetElement.offsetWidth - this.offset;
        break;
      case AcEnumDropdownPosition.Right:
        top = rect.top;
        left = rect.right + this.offset;
        break;
    }

    const menuRect = this.targetElement.getBoundingClientRect();
    if (menuRect.bottom > window.innerHeight) top = rect.top - this.targetElement.offsetHeight - this.offset;
    if (menuRect.top < 0) top = rect.bottom + this.offset;
    if (menuRect.right > window.innerWidth) left = rect.right - this.targetElement.offsetWidth;
    if (menuRect.left < 0) left = rect.left;

    this.targetElement.style.top = `${top}px`;
    this.targetElement.style.left = `${left}px`;
  }
}
