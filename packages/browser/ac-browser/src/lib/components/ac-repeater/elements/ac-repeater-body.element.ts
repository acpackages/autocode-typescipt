/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AcScrollable } from "../../ac-scrollable/_ac-scrollable.export";
import { acAddClassToElement, acGetParentElementWithTag, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcRepeaterCssClassName } from "../consts/ac-repeater-css-class-name.const";
import { AcRepeaterApi } from "../core/ac-repeater-api";
import { AcEnumRepeaterHook } from "../enums/ac-enum-repeater-hooks.enum";
import { IAcRepeaterDisplayedRowsChangeEvent } from "../interfaces/event-args/ac-repeater-displayed-rows-change-event.interface";
import { IAcRepeaterBodyHookArgs } from "../interfaces/hook-args/ac-repeater-body-hook-args.interface";
import { AcRepeaterRowElement } from "./ac-repeater-row.element";
import { IAcRepeaterRow } from "../interfaces/ac-repeater-row.interface";
import { AcElementBase } from "../../../core/_core.export";
import { AcRepeaterElement } from "./ac-repeater.element";
import { AC_REPEATER_TAG } from "../consts/ac-repeater-tag.const";

export class AcRepeaterBodyElement extends AcElementBase {
  private repeater: AcRepeaterElement;
  private repeaterApi: AcRepeaterApi;
  private scrollable!: AcScrollable;

  private autoBindRepeater() {
    if (this.isConnected) {
      const repeater = acGetParentElementWithTag({ element: this, tag: AC_REPEATER_TAG.repeater });
      if (repeater) {
        this.repeater = repeater as any;
        this.repeaterApi = this.repeater.repeaterApi;
        this.repeaterApi.hooks.subscribe({
          hook: AcEnumRepeaterHook.DisplayedRowsChange,
          callback: (event: IAcRepeaterDisplayedRowsChangeEvent) => {
            this.setDisplayRows();
          }
        });
        const hookArgs: IAcRepeaterBodyHookArgs = {
          repeaterApi: this.repeaterApi,
          datagridBody: this
        };
        this.repeaterApi.hooks.execute({ hook: AcEnumRepeaterHook.BodyCreate, args: hookArgs });
      }
    }
    else{
      this.delayedCallback.add({callback:()=>{
        this.autoBindRepeater();
      },duration:50,key:'autoInit'});
    }
  }

  handleElementScroll(event: any) {
    // event.preventDefault();
    // // if (event.target && this.repeaterApi && this.repeaterApi.repeater && this.repeaterApi.repeater.repeaterHeader && this.repeaterApi.repeater.repeaterHeader.element) {
    // //   this.repeaterApi.repeater.repeaterHeader.element.scrollLeft = event.target.scrollLeft;
    // // }
  }

  init() {
    super.init();
    acAddClassToElement({ class_: AcRepeaterCssClassName.acRepeaterBody, element: this });
    this.style.flex = '1';
    this.style.overflow = 'auto';
    this.style.position = 'relative';

    this.autoBindRepeater();
    this.scrollable = new AcScrollable({
      element: this,
      options: {
        itemTemplate: (row: IAcRepeaterRow, index: number) => {
          const repeaterRow = new AcRepeaterRowElement({
            repeaterApi: this.repeaterApi,
            repeaterRow: row
          });
          return repeaterRow.rowWrapper;
        }
      }
    });
    this.registerListeners();
    // this.setDisplayRows();
  }

  registerListeners() {
    this.addEventListener('scroll', (e: any) => {
      this.handleElementScroll(e);
    });
  }

  setDisplayRows() {
    this.scrollable.setItems(this.repeaterApi.displayedRepeaterRows);
  }
}

acRegisterCustomElement({ tag: AC_REPEATER_TAG.repeaterBody, type: AcRepeaterBodyElement });
