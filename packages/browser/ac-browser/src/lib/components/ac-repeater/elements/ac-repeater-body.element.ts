/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AcScrollable } from "../../ac-scrollable/_ac-scrollable.export";
import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcRepeaterCssClassName } from "../consts/ac-repeater-css-class-name.const";
import { AcRepeaterApi } from "../core/ac-repeater-api";
import { AcEnumRepeaterHook } from "../enums/ac-enum-repeater-hooks.enum";
import { IAcRepeaterDisplayedRowsChangeEvent } from "../interfaces/event-args/ac-repeater-displayed-rows-change-event.interface";
import { IAcRepeaterBodyHookArgs } from "../interfaces/hook-args/ac-repeater-body-hook-args.interface";
import { AcRepeaterRowElement } from "./ac-repeater-row.element";

export class AcRepeaterBodyElement {
  public element: HTMLElement = document.createElement('div');
  public rowsContainer: HTMLElement = document.createElement('div');
  private repeaterApi: AcRepeaterApi;
  private timeoutScrollUpdate: any;
  private scrollable!: AcScrollable;

  constructor({ repeaterApi }: { repeaterApi: AcRepeaterApi }) {
    this.repeaterApi = repeaterApi;
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
    this.repeaterApi.hooks.execute({ hook: AcEnumRepeaterHook.BodyCreated, args: hookArgs });
    this.initElement();
  }

  handleElementScroll(event: any) {
    event.preventDefault();
    if (event.target && this.repeaterApi && this.repeaterApi.repeater && this.repeaterApi.repeater.repeaterHeader && this.repeaterApi.repeater.repeaterHeader.element) {
      this.repeaterApi.repeater.repeaterHeader.element.scrollLeft = event.target.scrollLeft;
    }
  }

  initElement() {
    acAddClassToElement({ class_: AcRepeaterCssClassName.acRepeaterBody, element: this.element });
    acAddClassToElement({ class_: AcRepeaterCssClassName.acRepeaterRowsContainer, element: this.rowsContainer });
    this.element.append(this.rowsContainer);
    // this.floatingScrollbar = new AcFloatingScrollbar({element:this.element,parentElement:this.repeaterApi.repeater.containerElement});
    this.registerListeners();
    this.setDisplayRows();
  }


  registerListeners() {
    this.element.addEventListener('scroll', (e: any) => {
      this.handleElementScroll(e);
    })
  }

  setDisplayRows() {
    this.rowsContainer.innerHTML = "";
    for (const row of this.repeaterApi.displayedRepeaterRows) {
      const repeaterRow = new AcRepeaterRowElement({ repeaterApi: this.repeaterApi, repeaterRow: row });
      this.rowsContainer.append(repeaterRow.rowWrapper);
    }
  }
}
