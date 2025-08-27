/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents } from "@autocode-ts/autocode";
import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcCollapseAttributeName } from "../consts/ac-collapse-attribute-name.const";
import { AcCollapseCssClassName } from "../consts/ac-collapse-css-class-name.const";
import { AcEnumCollapseDirection, AcEnumCollapseEvent, IAcCollapseEvent } from "../_ac-collapse.export";

export class AcCollapse {
  contentElement: HTMLElement | undefined;
  toggleElement: HTMLElement | undefined;
  element: HTMLElement;
  isOpen: boolean = false;
  isAnimating: boolean = false;
  events: AcEvents = new AcEvents();
  direction: AcEnumCollapseDirection = AcEnumCollapseDirection.TopToBottom;
  initRect!: DOMRect;

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

  close({skipAnimation = false}:{skipAnimation?:boolean} = {}) {
    if (skipAnimation) {
      this.isAnimating = false;
      this.isOpen = false;
      this.element.classList.remove(AcCollapseCssClassName.acCollapseOpen);
      this.element.removeAttribute(AcCollapseAttributeName.acCollapseOpen);
      if (this.contentElement) {
        this.contentElement.style.display = 'none';
      }
    }
    else {
      if (!this.isOpen || this.isAnimating) return;
      this.isOpen = false;
      this.isAnimating = true;

      this.element.classList.remove(AcCollapseCssClassName.acCollapseOpen);
      this.element.removeAttribute(AcCollapseAttributeName.acCollapseOpen);

      if (this.contentElement) {
        const fullWidth = this.contentElement.scrollWidth + 'px';
        const fullHeight = this.contentElement.scrollHeight + 'px';

        const keyframes = this.getKeyFrames({open:false, fullWidth:fullWidth, fullHeight:fullHeight});

        const animation = this.contentElement.animate(keyframes, {
          duration: 300,
          easing: 'ease-in-out'
        });

        animation.onfinish = () => {
          if (this.contentElement) {
            this.contentElement.style.display = 'none';
          }
          this.isAnimating = false;
        };

        const eventParams: IAcCollapseEvent = {
          collapse: this
        };
        this.events.execute({ event: AcEnumCollapseEvent.Close, args: eventParams });
      }
    }

  }

  private initElement() {
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

  on({event,callback}:{event: string, callback: Function}): string {
    return this.events.subscribe({ event: event, callback: callback });
  }

  open({skipAnimation = false}:{skipAnimation?:boolean} = {}) {
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
        const keyframes = this.getKeyFrames({open:true, fullWidth:fullWidth, fullHeight:fullHeight});
        const animation = this.contentElement.animate(keyframes, {
          duration: 300,
          easing: 'ease-in-out'
        });
        animation.onfinish = () => {
          this.isAnimating = false;
        };
      }
      const eventParams: IAcCollapseEvent = {
        collapse: this
      };
      this.events.execute({ event: AcEnumCollapseEvent.Open, args: eventParams });
    }
  }

  private getKeyFrames({open,fullHeight,fullWidth}:{open: boolean, fullWidth: string, fullHeight: string}): Keyframe[] {
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
      // Diagonal collapse animates both width & height
      const from: Keyframe = open
        ? { width: "0px", height: "0px", opacity: 0 }
        : { width: fullWidth, height: fullHeight, opacity: 1 };

      const to: Keyframe = open
        ? { width: fullWidth, height: fullHeight, opacity: 1 }
        : { width: "0px", height: "0px", opacity: 0 };

      return [from, to];
    }

    if (isHorizontal) {
      const from: Keyframe = open
        ? { width: "0px", opacity: 0 }
        : { width: fullWidth, opacity: 1 };

      const to: Keyframe = open
        ? { width: fullWidth, opacity: 1 }
        : { width: "0px", opacity: 0 };
      return [from, to];
    }
    if (isVertical) {
      const from: Keyframe = open ? { height: "0px", opacity: 0 } : { height: fullHeight, opacity: 1 };
      const to: Keyframe = open ? { height: fullHeight, opacity: 1 } : { height: "0px", opacity: 0 };
      return [from, to];
    }
    return [];
  }

  setContentElement({ element }: { element: HTMLElement }) {
    this.contentElement = element;
    acAddClassToElement({ cssClass: AcCollapseCssClassName.acCollapseContent, element: element });
    this.contentElement.style.overflow = 'hidden';
    this.contentElement.style.opacity = '0';
    this.initRect = this.contentElement.getBoundingClientRect();
    setTimeout(() => {
      if (this.contentElement) {
        this.contentElement.style.opacity = '1';
      }
      if (this.element.hasAttribute(AcCollapseAttributeName.acCollapseOpen)) {
        this.open({skipAnimation:true});
      }
      else {
        this.close({skipAnimation:true});
      }
    }, 100);
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
    const eventParams: IAcCollapseEvent = {
      collapse: this
    };
    this.events.execute({ event: AcEnumCollapseEvent.Toggle, args: eventParams });
  }
}
