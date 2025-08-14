/* eslint-disable @typescript-eslint/no-unused-vars */
export function acAddClassToElement({cssClass,element}:{cssClass:string,element:Element}){
  const classList:string[] = cssClass.trim().split(" ")
  for(const className of classList){
    element.classList.add(className);
  }
}

export function acCopyElementStyles({fromElement,toElement}:{fromElement: HTMLElement, toElement: HTMLElement}) {
  const computed:any = window.getComputedStyle(fromElement);
  for (const key of computed) {
    try {
      toElement.style.setProperty(key, computed.getPropertyValue(key), computed.getPropertyPriority(key));
    } catch {
      // Ignore read-only or invalid style properties
    }
  }
}

export function acRemoveClassFromElement({cssClass,element}:{cssClass:string,element:Element}){
  const classList:string[] = cssClass.trim().split(" ")
  for(const className of classList){
    element.classList.remove(className);
  }
}

export function acSetElementAttributes({attributes,element}:{attributes:any,element:Element}){
  for(const attributeName of Object.keys(attributes)){
    element.setAttribute(attributeName,attributes[attributeName]);
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
