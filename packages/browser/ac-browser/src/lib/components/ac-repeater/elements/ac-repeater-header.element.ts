import { AcElementBase } from "../../../core/_core.export";
import { acGetParentElementWithTag, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_REPEATER_TAG } from "../consts/ac-repeater-tag.const";
import { AcRepeaterApi } from "../core/ac-repeater-api";
import { AcRepeaterElement } from "./ac-repeater.element";


export class AcRepeaterHeaderElement extends AcElementBase {

  private repeaterApi: AcRepeaterApi;

  private autoBindRepeater() {
    if (this.isConnected) {
      const repeater: AcRepeaterElement = acGetParentElementWithTag({ element: this, tag: AC_REPEATER_TAG.repeater }) as any;
      if (repeater) {
        this.repeaterApi = repeater.repeaterApi;
      }
    }
    else {
      this.delayedCallback.add({
        callback: () => {
          this.autoBindRepeater();
        }, duration: 50, key: 'autoInit'
      });
    }
  }

  override init(): void {
    super.init();
    this.autoBindRepeater();
  }
}
acRegisterCustomElement({ tag: AC_REPEATER_TAG.repeaterHeader, type: AcRepeaterHeaderElement });
