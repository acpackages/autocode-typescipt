import { AcElementBase } from "../../../core/ac-element-base";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_SVG_ICON_TAG } from "../_ac-svg-icon.element";

export class AcSvgIconElement extends AcElementBase {
  constructor() {
    super();
    this.style.color = 'inherit';
    this.style.display = 'inline-block';
    this.style.width = '100%';
    this.style.height = '100%';
  }

  override connectedCallback() {
    super.connectedCallback();
    const children = Array.from(this.childNodes) as HTMLElement[];
    for(const element of children){
      this.setChildElementStyle({element});
    }
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type == "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((element) => {
            if (element instanceof HTMLElement) {
              this.setChildElementStyle({element})
            }
          });
        }
      });
    });
    observer.observe(this, {
      childList: true,
      subtree: true
    });
  }

  private setChildElementStyle({element}:{element:HTMLElement}){
    element.style.maxHeight = '100%';
    element.style.maxWidth = '100%';
  }
}

acRegisterCustomElement({tag:AC_SVG_ICON_TAG.svgIcon,type:AcSvgIconElement});
