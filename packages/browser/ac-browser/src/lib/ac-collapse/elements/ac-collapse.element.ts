/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents } from "@autocode-ts/autocode";
import { acAddClassToElement } from "../../utils/ac-element-functions";
import { AcCollapseAttributeName } from "../consts/ac-collapse-attribute-name.const";
import { AcCollapseCssClassName } from "../consts/ac-collapse-css-class-name.const";
import { AcEnumCollapseDirection, AcEnumCollapseEvent, IAcCollapseCloseEvent, IAcCollapseOpenEvent, IAcCollapseToggleEvent } from "../_ac-collapse.export";

export class AcCollapse {
  contentElement: HTMLElement | undefined;
  toggleElement: HTMLElement | undefined;
  element: HTMLElement;
  isOpen: boolean = false;
  isAnimating: boolean = false;
  events: AcEvents = new AcEvents();
  direction: AcEnumCollapseDirection = AcEnumCollapseDirection.TopToBottom;
  initRect!:DOMRect;

  constructor({ element }: { element: HTMLElement }) {
    this.element = element;
    const directionAttr = element.getAttribute(AcCollapseAttributeName.acCollapseDirection);
    if (directionAttr && Object.values(AcEnumCollapseDirection).includes(directionAttr as AcEnumCollapseDirection)) {
      this.direction = directionAttr as AcEnumCollapseDirection;
    }
    if (element.querySelector(`[${AcCollapseAttributeName.acCollapseToggle}]`)) {
      this.setToggleElement({ element: element.querySelector(`[${AcCollapseAttributeName.acCollapseToggle}]`)! });
    }
    if (element.querySelector(`[${AcCollapseAttributeName.acCollapseContent}]`)) {
      this.setContentElement({ element: element.querySelector(`[${AcCollapseAttributeName.acCollapseContent}]`)! });
    }
    this.initElement();
  }

  close(skipAnimation = false) {
    if(skipAnimation){
      this.isAnimating = false;
      this.isOpen = false;
      this.element.classList.remove(AcCollapseCssClassName.acCollapseOpen);
    this.element.removeAttribute(AcCollapseAttributeName.acCollapseOpen);
     if(this.contentElement){
          this.contentElement.style.display = 'none';
        }
    }
    else{
      if (!this.isOpen || this.isAnimating) return;
    this.isOpen = false;
    this.isAnimating = true;

    this.element.classList.remove(AcCollapseCssClassName.acCollapseOpen);
    this.element.removeAttribute(AcCollapseAttributeName.acCollapseOpen);

    if (this.contentElement) {
      const fullWidth = this.contentElement.scrollWidth + 'px';
      const fullHeight = this.contentElement.scrollHeight + 'px';

      const keyframes = this.getKeyframes(false, fullWidth, fullHeight);

      const animation = this.contentElement.animate(keyframes, {
        duration: 300,
        easing: 'ease-in-out'
      });

      animation.onfinish = () => {
        if(this.contentElement){
          this.contentElement.style.display = 'none';
        }
        this.isAnimating = false;
      };

      const eventParams: IAcCollapseCloseEvent = {
        collapse: this
      };
      this.events.execute({ eventName: AcEnumCollapseEvent.Close, args: eventParams });
    }
    }

  }

  initElement() {
    acAddClassToElement({ element: this.element, cssClass: AcCollapseCssClassName.acCollapse });
    if (this.element.querySelector(`[${AcCollapseAttributeName.acCollapseToggle}]`)) {
      this.setToggleElement({ element: this.element.querySelector(`[${AcCollapseAttributeName.acCollapseToggle}]`)! });
    }
    if (this.element.querySelector(`[${AcCollapseAttributeName.acCollapseContent}]`)) {
      this.setContentElement({ element: this.element.querySelector(`[${AcCollapseAttributeName.acCollapseContent}]`)! });
    }
    else {
      this.setContentElement({ element: this.element });
    }
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === AcCollapseAttributeName.acCollapseOpen) {
          const shouldBeOpen = this.element.hasAttribute(AcCollapseAttributeName.acCollapseOpen);
          if (shouldBeOpen && !this.isOpen) this.open();
          else if (!shouldBeOpen && this.isOpen) this.close();
        }
      }
    });

    observer.observe(this.element, { attributes: true });
  }

  on({ eventName, callback }: { eventName: string, callback: Function }): string {
    return this.events.subscribe({ eventName: eventName, callback: callback });
  }

  open(skipAnimation = false) {
    if (this.isOpen || this.isAnimating) return;
    this.isOpen = true;
    this.isAnimating = true;

    this.element.classList.add(AcCollapseCssClassName.acCollapseOpen);
    this.element.setAttribute(AcCollapseAttributeName.acCollapseOpen, '');

    if (this.contentElement) {
      this.contentElement.style.display = 'block';
      const fullWidth = this.initRect.width + 'px';
      const fullHeight = this.initRect.height + 'px';

      if (skipAnimation) {
        this.contentElement!.style.width = fullWidth;
        this.contentElement!.style.height = fullHeight;
        this.isAnimating = false;
      } else {
        const keyframes = this.getKeyframes(true, fullWidth, fullHeight);
        const animation = this.contentElement.animate(keyframes, {
          duration: 300,
          easing: 'ease-in-out'
        });
        animation.onfinish = () => {
          // this.contentElement!.style.width = 'auto';
          // this.contentElement!.style.height = 'auto';
          this.isAnimating = false;
        };
      }

      const eventParams: IAcCollapseOpenEvent = {
        collapse: this
      };
      this.events.execute({ eventName: AcEnumCollapseEvent.Open, args: eventParams });
    }
  }

  getKeyframes(open: boolean, fullWidth: string, fullHeight: string): Keyframe[] {
  const isVertical = [
    AcEnumCollapseDirection.TopToBottom,
    AcEnumCollapseDirection.BottomToTop
  ].includes(this.direction);
  const isHorizontal = [
    AcEnumCollapseDirection.LeftToRight,
    AcEnumCollapseDirection.RightToLeft
  ].includes(this.direction);
  const isDiagonal = !isVertical && !isHorizontal;

  if (isDiagonal) {
    // Diagonal collapse uses scale transform with origin
    let origin = 'center';
    switch (this.direction) {
      case AcEnumCollapseDirection.TopLeftToBottomRight:
        origin = 'top left';
        break;
      case AcEnumCollapseDirection.TopRightToBottomLeft:
        origin = 'top right';
        break;
      case AcEnumCollapseDirection.BottomLeftToTopRight:
        origin = 'bottom left';
        break;
      case AcEnumCollapseDirection.BottomRightToTopLeft:
        origin = 'bottom right';
        break;
    }

    const from: Keyframe = open
      ? { transform: 'scale(0)', transformOrigin: origin, opacity: 0 }
      : { transform: 'scale(1)', transformOrigin: origin, opacity: 1 };
    const to: Keyframe = open
      ? { transform: 'scale(1)', transformOrigin: origin, opacity: 1 }
      : { transform: 'scale(0)', transformOrigin: origin, opacity: 0 };

    return [from, to];
  }

  if (isHorizontal) {
    // Left-Right collapse with scaleX to avoid text reflow
    const origin =
      this.direction === AcEnumCollapseDirection.LeftToRight
        ? 'left'
        : 'right';

    const from: Keyframe = open
      ? { transform: 'scaleX(0)', transformOrigin: origin, opacity: 0 }
      : { transform: 'scaleX(1)', transformOrigin: origin, opacity: 1 };
    const to: Keyframe = open
      ? { transform: 'scaleX(1)', transformOrigin: origin, opacity: 1 }
      : { transform: 'scaleX(0)', transformOrigin: origin, opacity: 0 };

    return [from, to];
  }

  if (isVertical) {
    // Top-Bottom collapse with scaleY to avoid content shifting
    const origin =
      this.direction === AcEnumCollapseDirection.TopToBottom
        ? 'top'
        : 'bottom';

    const from: Keyframe = open
      ? { transform: 'scaleY(0)', transformOrigin: origin, opacity: 0 }
      : { transform: 'scaleY(1)', transformOrigin: origin, opacity: 1 };
    const to: Keyframe = open
      ? { transform: 'scaleY(1)', transformOrigin: origin, opacity: 1 }
      : { transform: 'scaleY(0)', transformOrigin: origin, opacity: 0 };

    return [from, to];
  }

  return []; // Fallback, should never reach here
}



  setContentElement({ element }: { element: HTMLElement }) {
    this.contentElement = element;
    acAddClassToElement({ cssClass: AcCollapseCssClassName.acCollapseContent, element: element });
    this.contentElement.style.overflow = 'hidden';
    this.contentElement.style.opacity = '0';
    this.initRect = this.contentElement.getBoundingClientRect();
    setTimeout(() => {
      if(this.contentElement){

      this.contentElement.style.opacity = '1';
      }
      if (this.element.hasAttribute(AcCollapseAttributeName.acCollapseOpen)) {
      this.open(true);
    }
    else{
      this.close(true);
    }
    }, 100);



    // this.contentElement.style.opacity = '0';
  }

  setToggleElement({ element }: { element: HTMLElement }) {
    this.toggleElement = element;
    acAddClassToElement({ cssClass: AcCollapseCssClassName.acCollapseToggle, element: element });
    this.toggleElement.addEventListener('click', () => this.toggle());
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    }
    else {
      this.open();
    }
    const eventParams: IAcCollapseToggleEvent = {
      collapse: this
    };
    this.events.execute({ eventName: AcEnumCollapseEvent.Toggle, args: eventParams });
  }
}
