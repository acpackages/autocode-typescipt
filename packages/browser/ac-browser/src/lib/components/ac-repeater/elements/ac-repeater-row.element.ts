/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcRepeaterAttributeName } from "../consts/ac-repeater-attribute-name.const";
import { AcRepeaterCssClassName } from "../consts/ac-repeater-css-class-name.const";
import { AcRepeaterApi } from "../core/ac-repeater-api";
import { IAcRepeaterRow } from "../interfaces/ac-repeater-row.interface";
import { AcEnumRepeaterHook } from "../enums/ac-enum-repeater-hooks.enum";
import { IIAcRepeaterRowHookArgs } from "../interfaces/hook-args/ac-repeater-row-hook-args.interface";
import { AC_REPEATER_TAG } from "../consts/ac-repeater-tag.const";

export class AcRepeaterRowElement {
  private repeaterApi: AcRepeaterApi;
  private repeaterRow!: IAcRepeaterRow;
  element: HTMLElement = document.createElement('div');
  rowWrapper: HTMLElement = document.createElement('div');
  swappingRowPosition: boolean = false;

  constructor({ repeaterApi, repeaterRow }: { repeaterApi: AcRepeaterApi, repeaterRow: IAcRepeaterRow }) {
    this.repeaterRow = repeaterRow;
    this.repeaterRow.instance = this;
    this.repeaterApi = repeaterApi;
    // this.repeaterApi.on({
    //   event: AcEnumRepeaterEvent.RowPositionChange, callback: (event: IIAcRepeaterRowPositionChangeEvent) => {
    //     if (event.repeaterRow.rowId == this.repeaterRow.rowId && !this.swappingRowPosition) {
    //       if (event.repeaterRow.instance && event.oldRepeaterRow.instance) {
    //         this.swappingRowPosition = true;
    //         acSwapElementsWithAnimation({ element1: event.repeaterRow.instance.rowWrapper, element2: event.oldRepeaterRow.instance.rowWrapper, duration: 300 });
    //         this.delayedCallback.add({callback:() => {
    //           this.swappingRowPosition = false;
    //         }, duration:500});
    //       }
    //     }
    //   }
    // });
    this.initElement();
  }

  initElement() {
    this.element.setAttribute(AcRepeaterAttributeName.IAcRepeaterRowId, this.repeaterRow.rowId);
    acAddClassToElement({ class_: AcRepeaterCssClassName.IAcRepeaterRowWrapper, element: this.rowWrapper });
    this.rowWrapper.appendChild(this.element);
    acAddClassToElement({ class_: AcRepeaterCssClassName.IAcRepeaterRow, element: this.element });
    if (this.repeaterRow.index == 0 || this.repeaterRow.index % 2 == 0) {
      acAddClassToElement({ class_: AcRepeaterCssClassName.IAcRepeaterRowEven, element: this.element });
    }
    else {
      acAddClassToElement({ class_: AcRepeaterCssClassName.IAcRepeaterRowOdd, element: this.element });
    }
    this.registerListeners();
    this.render();
  }

  registerListeners() {
    this.element.addEventListener('blur', (e: FocusEvent) => {
      this.repeaterApi.eventHandler.handleRowBlur({ repeaterRow: this.repeaterRow, event: e });
    });
    this.element.addEventListener('focus', (e: FocusEvent) => {
      this.repeaterApi.eventHandler.handleRowFocus({ repeaterRow: this.repeaterRow, event: e });
    });

    this.element.addEventListener('keydown', (e: KeyboardEvent) => {
      this.repeaterApi.eventHandler.handleRowKeyDown({ repeaterRow: this.repeaterRow, event: e });
    });
    this.element.addEventListener('keypress', (e: KeyboardEvent) => {
      this.repeaterApi.eventHandler.handleRowKeyPress({ repeaterRow: this.repeaterRow, event: e });
    });
    this.element.addEventListener('keyup', (e: KeyboardEvent) => {
      this.repeaterApi.eventHandler.handleRowKeyDown({ repeaterRow: this.repeaterRow, event: e });
    });

    this.element.addEventListener('click', (e: MouseEvent) => {
      this.repeaterApi.eventHandler.handleRowClick({ repeaterRow: this.repeaterRow, event: e });
    });
    this.element.addEventListener('dblclick', (e: MouseEvent) => {
      this.repeaterApi.eventHandler.handleRowDoubleClick({ repeaterRow: this.repeaterRow, event: e });
    });
    this.element.addEventListener('mousedown', (e: MouseEvent) => {
      this.repeaterApi.eventHandler.handleRowMouseDown({ repeaterRow: this.repeaterRow, event: e });
    });
    this.element.addEventListener('mouseenter', (e: MouseEvent) => {
      this.repeaterApi.eventHandler.handleRowMouseEnter({ repeaterRow: this.repeaterRow, event: e });
    });
    this.element.addEventListener('mouseleave', (e: MouseEvent) => {
      this.repeaterApi.eventHandler.handleRowMouseLeave({ repeaterRow: this.repeaterRow, event: e });
    });
    this.element.addEventListener('mousemove', (e: MouseEvent) => {
      this.repeaterApi.eventHandler.handleRowMouseMove({ repeaterRow: this.repeaterRow, event: e });
    });
    this.element.addEventListener('mouseover', (e: MouseEvent) => {
      this.repeaterApi.eventHandler.handleRowMouseOver({ repeaterRow: this.repeaterRow, event: e });
    });
    this.element.addEventListener('mouseup', (e: MouseEvent) => {
      this.repeaterApi.eventHandler.handleRowMouseUp({ repeaterRow: this.repeaterRow, event: e });
    });

    this.element.addEventListener('touchcancel', (e: TouchEvent) => {
      this.repeaterApi.eventHandler.handleRowTouchCancel({ repeaterRow: this.repeaterRow, event: e });
    }, { passive: true });
    this.element.addEventListener('touchend', (e: TouchEvent) => {
      this.repeaterApi.eventHandler.handleRowTouchEnd({ repeaterRow: this.repeaterRow, event: e });
    }, { passive: true });
    this.element.addEventListener('touchmove', (e: TouchEvent) => {
      this.repeaterApi.eventHandler.handleRowTouchMove({ repeaterRow: this.repeaterRow, event: e });
    }, { passive: true });
    this.element.addEventListener('touchstart', (e: TouchEvent) => {
      this.repeaterApi.eventHandler.handleRowTouchStart({ repeaterRow: this.repeaterRow, event: e });
    }, { passive: true });
  }

  render() {
    const hookArgs: IIAcRepeaterRowHookArgs = {
      repeaterApi: this.repeaterApi,
      repeaterRow: this.repeaterRow
    };
    if (this.repeaterApi.hooks.hasSubscribers({ hook: AcEnumRepeaterHook.RowRender })) {
      this.repeaterApi.hooks.execute({ hook: AcEnumRepeaterHook.RowRender, args: hookArgs });
    } else {
      this.element.innerHTML = JSON.stringify(this.repeaterRow.data);
    }
  }
}


