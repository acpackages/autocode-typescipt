/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
export function acAddClassToElement({ class_, element }: { class_: string, element: Element }) {
  const classList: string[] = class_.trim().split(" ")
  for (const className of classList) {
    element.classList.add(className);
  }
}

export function acAnimateElement(
  element: HTMLElement,
  property: string,
  from: string | number,
  to: string | number,
  duration: number = 300,
  callback?: () => void
) {
  const start = performance.now();
  const fromValue = typeof from === "number" ? from : parseFloat(from);
  const toValue = typeof to === "number" ? to : parseFloat(to);
  const unit = typeof from === "string" && /[a-z%]+$/i.test(from) ? from.replace(/[0-9.\-]+/g, "") : "";

  function step(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    const currentValue = fromValue + (toValue - fromValue) * progress;
    element.style.setProperty(property, currentValue + unit);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      if (callback) callback();
    }
  }

  requestAnimationFrame(step);
}

export function acCopyElementStyles({ fromElement, toElement }: { fromElement: HTMLElement, toElement: HTMLElement }) {
  const computed: any = window.getComputedStyle(fromElement);
  for (const key of computed) {
    try {
      toElement.style.setProperty(key, computed.getPropertyValue(key), computed.getPropertyPriority(key));
    } catch {
      // Ignore read-only or invalid style properties
    }
  }
}

export function acElementHasParentTag({element,tag}:{element: HTMLElement, tag: string}): boolean {
  tag = tag.toLowerCase(); // normalize for comparison
  let parent = element.parentElement;
  while (parent) {
    if (parent.tagName.toLowerCase() == tag) {
      return true;
    }
    parent = parent.parentElement;
  }
  return false;
}

export function acMorphElement({ source, destination,sourceColor,destinationColor, duration = 300 }: { source: HTMLElement, destination: HTMLElement,sourceColor?:string;destinationColor?:string; duration?: number }): void {
  // Get bounding client rectangles
  const sourceRect = source.getBoundingClientRect();
  const destRect = destination.getBoundingClientRect();
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;

  // Clone both source and destination elements
  const sourceClone: HTMLElement = source.cloneNode(true) as HTMLElement;
  const destClone: HTMLElement = destination.cloneNode(true) as HTMLElement;

  // Style source clone to match source initially
  Object.assign(sourceClone.style, {
    position: "fixed",
    left: `${sourceRect.x + scrollX}px`,
    top: `${sourceRect.y + scrollY}px`,
    width: `${sourceRect.width}px`,
    height: `${sourceRect.height}px`,
    margin: "0",
    pointerEvents: "none",
    zIndex: "9999",
    transition: `all ${duration}ms ease-in-out`,
    opacity: "1",
  });
  if(sourceColor){
    sourceClone.innerHTML = "";
    sourceClone.style.background = `${sourceColor}!important`;
  }


  // Style destination clone to match source initially
  Object.assign(destClone.style, {
    position: "fixed",
    left: `${sourceRect.x}px`,
    top: `${sourceRect.y}px`,
    width: `${sourceRect.width}px`,
    height: `${sourceRect.height}px`,
    margin: "0",
    pointerEvents: "none",
    zIndex: "9998",
    transition: `all ${duration}ms ease-in-out`,
    opacity: "0",
  });
  if(destinationColor){
    destClone.innerHTML = "";
    destClone.style.background = `${destinationColor}!important`;
  }

  // Append clones to body
  document.body.appendChild(sourceClone);
  document.body.appendChild(destClone);

  // Force reflow to ensure transition starts
  void sourceClone.offsetHeight;
  void destClone.offsetHeight;

  // Animate source clone → fade out and move
  Object.assign(sourceClone.style, {
    left: `${destRect.x}px`,
    top: `${destRect.y}px`,
    width: `${destRect.width}px`,
    height: `${destRect.height}px`,
    opacity: "0",
  });

  // Animate destination clone → move & resize naturally, fade in
  Object.assign(destClone.style, {
    left: `${destRect.x}px`,
    top: `${destRect.y}px`,
    width: `${destRect.width}px`,
    height: `${destRect.height}px`,
    opacity: "1",
  });

  // Cleanup after animation
  setTimeout(() => {
    sourceClone.remove();
    destClone.remove();
  }, duration);
}


export function acRegisterCustomElement({ tag, type }: { tag: string, type: any }) {
  if (customElements.get(tag) == undefined) {
    customElements.define(tag, type);
  }
}

export function acRemoveClassFromElement({ class_, element }: { class_: string, element: Element }) {
  const classList: string[] = class_.trim().split(" ")
  for (const className of classList) {
    element.classList.remove(className);
  }
}

export function acSetElementAttributes({ attributes, element }: { attributes: any, element: Element }) {
  for (const attributeName of Object.keys(attributes)) {
    element.setAttribute(attributeName, attributes[attributeName]);
  }
}

export function acSwapElementsWithAnimation({
  element1,
  element2,
  duration = 300,
  suppressElement1Animation = false,
  suppressElement2Animation = false,
  onComplete
}: {
  element1: HTMLElement;
  element2: HTMLElement;
  duration?: number;
  suppressElement1Animation?: boolean;
  suppressElement2Animation?: boolean;
  onComplete?: () => void;
}) {
  if (!element1 || !element2 || element1 === element2) return;

  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  const parent1 = element1.parentElement!;
  const parent2 = element2.parentElement!;

  // Create placeholders with same size
  const placeholder1 = element1.cloneNode(true) as HTMLElement;
  const placeholder2 = element2.cloneNode(true) as HTMLElement;

  acCopyElementStyles({ fromElement: element1, toElement: placeholder1 });
  acCopyElementStyles({ fromElement: element2, toElement: placeholder2 });

  placeholder1.style.visibility = "hidden";
  placeholder2.style.visibility = "hidden";

  parent1.replaceChild(placeholder1, element1);
  parent2.replaceChild(placeholder2, element2);

  // Create absolutely positioned clones for animation
  const anim1 = element1.cloneNode(true) as HTMLElement;
  const anim2 = element2.cloneNode(true) as HTMLElement;

  acCopyElementStyles({ fromElement: element1, toElement: anim1 });
  acCopyElementStyles({ fromElement: element2, toElement: anim2 });

  document.body.appendChild(anim1);
  document.body.appendChild(anim2);

  Object.assign(anim1.style, {
    position: "fixed",
    top: `${rect1.top}px`,
    left: `${rect1.left}px`,
    width: `${rect1.width}px`,
    height: `${rect1.height}px`,
    margin: "0",
    zIndex: 9999,
    transition: suppressElement1Animation ? "none" : `transform ${duration}ms ease`,
    pointerEvents: "none"
  });

  Object.assign(anim2.style, {
    position: "fixed",
    top: `${rect2.top}px`,
    left: `${rect2.left}px`,
    width: `${rect2.width}px`,
    height: `${rect2.height}px`,
    margin: "0",
    zIndex: 9999,
    transition: suppressElement2Animation ? "none" : `transform ${duration}ms ease`,
    pointerEvents: "none"
  });

  // Start animations
  requestAnimationFrame(() => {
    if (!suppressElement1Animation)
      anim1.style.transform = `translate(${rect2.left - rect1.left}px, ${rect2.top - rect1.top}px)`;

    if (!suppressElement2Animation)
      anim2.style.transform = `translate(${rect1.left - rect2.left}px, ${rect1.top - rect2.top}px)`;
  });

  // After animation, do the real swap
  setTimeout(() => {
    placeholder1.replaceWith(element2);
    placeholder2.replaceWith(element1);
    anim1.remove();
    anim2.remove();
    onComplete?.();
  }, duration);
}

export function acShowElement({
  element,
  duration = 300,
}: {
  element: HTMLElement;
  duration?: number;
}) {
  const stored = element.getAttribute("ac-show-original-style-values");
  if (!stored) return;
  element.removeAttribute("ac-show-original-style-values");

  const originalStyles = JSON.parse(stored);
  element.style.display = originalStyles.display;

  // Animate opacity back
  acAnimateElement(element, "opacity", 0, originalStyles.opacity, duration);

  // Handle height
  if (originalStyles.height) {
    if (originalStyles.height === "auto") {
      const targetHeight = element.scrollHeight + "px";
      acAnimateElement(element, "height", "0px", targetHeight, duration, () => {
        element.style.height = ""; // reset back to auto
      });
    } else {
      acAnimateElement(element, "height", "0px", originalStyles.height, duration);
    }
  }

  // Handle width
  if (originalStyles.width) {
    if (originalStyles.width === "auto") {
      const targetWidth = element.scrollWidth + "px";
      acAnimateElement(element, "width", "0px", targetWidth, duration, () => {
        element.style.width = ""; // reset back to auto
      });
    } else {
      acAnimateElement(element, "width", "0px", originalStyles.width, duration);
    }
  }
}

export function acHideElement({
  element,
  animateHeight = false,
  animateWidth = false,
  duration = 300,
}: {
  element: HTMLElement;
  animateHeight?: boolean;
  animateWidth?: boolean;
  duration?: number;
}) {
  const computed = getComputedStyle(element);

  const originalStyles: any = {
    opacity: element.style.opacity || computed.opacity,
    display: element.style.display || computed.display,
  };

  // Handle height
  if (animateHeight) {
    originalStyles.height = element.style.height ? element.style.height : "auto";
    const currentHeight = computed.height;
    acAnimateElement(element, "height", currentHeight, 0, duration);
  }

  // Handle width
  if (animateWidth) {
    originalStyles.width = element.style.width ? element.style.width : "auto";
    const currentWidth = computed.width;
    acAnimateElement(element, "width", currentWidth, 0, duration);
  }

  element.setAttribute(
    "ac-show-original-style-values",
    JSON.stringify(originalStyles)
  );

  // Animate opacity
  acAnimateElement(
    element,
    "opacity",
    originalStyles.opacity,
    0,
    duration,
    () => {
      element.style.display = "none";
    }
  );
}

export function acWrapElementWithTag({element,wrapperTag = "div"}:{element: HTMLElement, wrapperTag:string}): HTMLElement {
  const wrapper = document.createElement(wrapperTag);
  if (element.isConnected && element.parentNode) {
    element.parentNode.insertBefore(wrapper, element);
  }
  wrapper.appendChild(element);
  return wrapper;
}
