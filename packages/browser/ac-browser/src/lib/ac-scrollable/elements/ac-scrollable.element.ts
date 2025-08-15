/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Autocode } from "@autocode-ts/autocode";
import { IAcScrollableOptions } from "../interfaces/ac-scrollable-options.inteface";
import { IAcScrollingElement } from "../interfaces/ac-scrolling-element.interface";
import { AcScrollableAttributeName } from "../consts/ac-scrollable-attribute-name.const";

export class AcScrollable {
  private element: HTMLElement;
  private elementHeight: number;
  private elementHeightFallback: number;
  private elementResizeObserver!: ResizeObserver;
  private mutationObserver!: MutationObserver;
  private options?:IAcScrollableOptions;
  private resizeObserver!: ResizeObserver;
  private renderedElements: IAcScrollingElement[] = [];
  private scrollingElements: IAcScrollingElement[] = [];
  private scrollTop = 0;
  private isRendering:boolean = false;



  constructor({element,options = {}}:{element: HTMLElement, options?: IAcScrollableOptions}) {
    this.element = element;
    this.options = options;
    this.elementHeight = element.clientHeight;
    this.elementHeightFallback = options.elementHeight ?? 50;

    this.element.style.overflowY = "auto";
    this.element.addEventListener("scroll", () => this.onScroll());
    this.registerExistingElements();
    this.initObservers();
  }

  addItem(element: HTMLElement) {
    // Calculate height
    const temp = element.cloneNode(true) as HTMLElement;
    temp.style.visibility = "hidden";
    this.element.appendChild(temp);
    const height = temp.offsetHeight || this.elementHeightFallback;
    this.element.removeChild(temp);

    this.registerScrollingElement({element:element,height:height});

    this.render();
  }

  private getVisibleRange() {
    let startIndex = 0;
    let endIndex = this.scrollingElements.length - 1;
    let y = 0;

    // Find start index
    for (let i = 0; i < this.scrollingElements.length; i++) {
      if (y + this.scrollingElements[i].height >= this.scrollTop) {
        startIndex = i;
        break;
      }
      y += this.scrollingElements[i].height;
    }

    // Find end index
    y = 0;
    for (let i = startIndex; i < this.scrollingElements.length; i++) {
      y += this.scrollingElements[i].height;
      if (y >= this.elementHeight) {
        endIndex = i;
        break;
      }
    }

    let buffer:number = 2;
    if(this.options && this.options.bufferCount && this.options.bufferCount>0){
      buffer = this.options.bufferCount;
    }

    startIndex = Math.max(0, startIndex - buffer);
    endIndex = Math.min(this.scrollingElements.length - 1, endIndex + buffer);

    return { startIndex, endIndex };
  }

   private initObservers() {
    // Watch for child add/remove
    this.mutationObserver = new MutationObserver((mutations) => {
      if(!this.isRendering){
        let needsRender = false;
        for (const mutation of mutations) {
          if (mutation.type === "childList") {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                console.log('Added element');
                  if (!node.hasAttribute(AcScrollableAttributeName.acScrollingElementId)&&!node.hasAttribute(AcScrollableAttributeName.acScrollingSpacer)) {
                  const height = node.offsetHeight || this.elementHeightFallback;
                  this.registerScrollingElement({ element: node, height });
                  needsRender = true;
                }
              }
            });
            mutation.removedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                console.log('Removed element');
                const id = node.getAttribute(AcScrollableAttributeName.acScrollingElementId);
                if (id) {
                  this.scrollingElements = this.scrollingElements.filter(el => el.id !== id);
                  this.resizeObserver.unobserve(node);
                  needsRender = true;
                }
              }
            });
          }
        }
        if (needsRender) {
          this.render();
        }
      }

    });
    this.mutationObserver.observe(this.element, { childList: true });

    // Watch for size changes
    this.resizeObserver = new ResizeObserver((entries) => {
      if(!this.isRendering){
        let needsRender = false;
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          const id = target.getAttribute(AcScrollableAttributeName.acScrollingElementId);
          if (id) {
            const se = this.scrollingElements.find(el => el.id === id);
            if (se) {
              const newHeight = target.offsetHeight || this.elementHeightFallback;
              if (se.height !== newHeight) {
                se.height = newHeight;
                needsRender = true;
              }
            }
          }
        }
        if (needsRender) {
          this.render();
        }
      }
    });
    this.elementResizeObserver = new ResizeObserver(() => {
      const newHeight = this.element.clientHeight;
      const newWidth = this.element.clientWidth;
      if (this.elementHeight != newHeight) {
        this.elementHeight = newHeight;
        this.render(); // Recalculate visible range
      }
    });
    this.elementResizeObserver.observe(this.element);

    this.scrollingElements.forEach(el => {
      this.resizeObserver.observe(el.element);
    });
  }

  private registerScrollingElement(data: Partial<IAcScrollingElement> & Pick<IAcScrollingElement, 'element' | 'height'>){
    const id:string = Autocode.uuid();
    data.element.setAttribute(AcScrollableAttributeName.acScrollingElementId,id);
    if(data.index == undefined){
      data.index = this.scrollingElements.length;
    }
    const scrollingElement: IAcScrollingElement = {
      element:data.element,
      id:id,
      index: data.index,
      height:data.height
    };
    this.scrollingElements.push(scrollingElement);
    if(this.resizeObserver){
      this.resizeObserver.observe(data.element);
    }

  }

  private onScroll() {
    this.scrollTop = this.element.scrollTop;
    this.render();
  }

  registerExistingElements(){
    const children = Array.from(this.element.children) as HTMLElement[];
    this.scrollingElements = [];
    children.forEach((el, index) => {
      const height = el.offsetHeight || this.elementHeightFallback;
      this.registerScrollingElement({element:el,height:height,index:index});
    });
    this.element.innerHTML = '';
    this.render();
  }

  // removeScrollingElement

  private render() {
    this.isRendering = true;
    const { startIndex, endIndex } = this.getVisibleRange();

    // Clear DOM
    this.element.innerHTML = "";

    // Add spacer before
    const topSpacer = document.createElement("div");
    topSpacer.style.height =
      this.scrollingElements
        .slice(0, startIndex)
        .reduce((sum, el) => sum + el.height, 0) + "px";
    topSpacer.setAttribute(AcScrollableAttributeName.acScrollingSpacer,'');
    topSpacer.setAttribute(AcScrollableAttributeName.acScrollingSpacerBefore,'');
    this.element.appendChild(topSpacer);

    // Render visible items
    this.renderedElements = [];
    for (let i = startIndex; i <= endIndex; i++) {
      this.renderedElements.push(this.scrollingElements[i]);
      this.element.appendChild(this.scrollingElements[i].element);
    }

    // Add spacer after
    const bottomSpacer = document.createElement("div");
    bottomSpacer.setAttribute(AcScrollableAttributeName.acScrollingSpacer,'');
    bottomSpacer.setAttribute(AcScrollableAttributeName.acScrollingSpacerAfter,'');
    bottomSpacer.style.height =
      this.scrollingElements
        .slice(endIndex + 1)
        .reduce((sum, el) => sum + el.height, 0) + "px";
    this.element.appendChild(bottomSpacer);
    setTimeout(() => {
      this.isRendering = false;
    }, 10);
  }

  scrollToIndex(index: number) {
  if (index < 0 || index >= this.scrollingElements.length) return;

  const scrollY = this.scrollingElements
    .slice(0, index)
    .reduce((sum, el) => sum + el.height, 0);

  this.element.scrollTop = scrollY;
  this.render();
}

scrollToElement(element: HTMLElement) {
  const index = this.scrollingElements.findIndex(se => se.element === element);
  if (index !== -1) {
    this.scrollToIndex(index);
  }
}
}
