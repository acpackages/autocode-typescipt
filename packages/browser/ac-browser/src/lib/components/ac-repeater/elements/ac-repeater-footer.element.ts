import { acAddClassToElement, acGetParentElementWithTag, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcRepeaterCssClassName } from "../consts/ac-repeater-css-class-name.const";
import { AcRepeaterApi } from "../core/ac-repeater-api";
import { AcEnumPaginationEvent } from "../../ac-pagination/_ac-pagination.export";
import { IAcPaginationPageChangeEvent } from "../../ac-pagination/interfaces/_interfaces.export";
import { AcElementBase } from "../../../core/_core.export";
import { AcRepeaterElement } from "./ac-repeater.element";
import { AC_REPEATER_TAG } from "../consts/ac-repeater-tag.const";
import { AcEnumRepeaterHook } from "../_ac-repeater.export";


export class AcRepeaterFooterElement extends AcElementBase {
  private repeaterApi: AcRepeaterApi;

  private autoBindRepeater() {
    if (this.isConnected) {
      const repeater: AcRepeaterElement = acGetParentElementWithTag({ element: this, tag: AC_REPEATER_TAG.repeater }) as any;
      if (repeater) {
        this.repeaterApi = repeater.repeaterApi;
        this.setPagination();
        this.repeaterApi.hooks.subscribe({
          hook: AcEnumRepeaterHook.UsePaginationChange, callback: () => {
            console.log("Use Pagination Change Hook");
            this.setPagination();
          }
        });
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

  setPagination() {
    console.log("Setting pagination", this.repeaterApi);
    if (this.repeaterApi) {
       console.log("Repeater API set",this.repeaterApi.usePagination,this.repeaterApi.pagination);
      if (this.repeaterApi.usePagination && this.repeaterApi.pagination) {
        console.log("Setting pagination");
        this.append(this.repeaterApi.pagination);
        console.log("Added pagination");
      } else if (!this.repeaterApi.usePagination && this.repeaterApi?.pagination) {
        this.repeaterApi.pagination.remove();
      }
    }

  }
}

acRegisterCustomElement({ tag: AC_REPEATER_TAG.repeaterFooter, type: AcRepeaterFooterElement });
