/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcRepeaterAttributeName } from "../consts/ac-repeater-attribute-name.const";
import { AcRepeaterCssClassName } from "../consts/ac-repeater-css-class-name.const";
import { AcRepeaterApi } from "../core/ac-repeater-api";
import { AcRepeaterRow } from "../models/ac-repeater-row.model";

export class AcRepeaterRowElement {
  private repeaterApi: AcRepeaterApi;
  private repeaterRow!: AcRepeaterRow;
  element: HTMLElement = document.createElement('div');
  rowWrapper: HTMLElement = document.createElement('div');
  swappingRowPosition: boolean = false;

  constructor({ repeaterApi, repeaterRow }: { repeaterApi: AcRepeaterApi, repeaterRow: AcRepeaterRow }) {
    this.repeaterRow = repeaterRow;
    this.repeaterRow.instance = this;
    this.repeaterApi = repeaterApi;
    // this.repeaterApi.on({
    //   event: AcEnumRepeaterEvent.RowPositionChange, callback: (event: IAcRepeaterRowPositionChangeEvent) => {
    //     if (event.repeaterRow.rowId == this.repeaterRow.rowId && !this.swappingRowPosition) {
    //       if (event.repeaterRow.instance && event.oldRepeaterRow.instance) {
    //         this.swappingRowPosition = true;
    //         acSwapElementsWithAnimation({ element1: event.repeaterRow.instance.rowWrapper, element2: event.oldRepeaterRow.instance.rowWrapper, duration: 300 });
    //         setTimeout(() => {
    //           this.swappingRowPosition = false;
    //         }, 500);
    //       }
    //     }
    //   }
    // });
    this.initElement();
  }

  initElement() {
    this.element.setAttribute(AcRepeaterAttributeName.acRepeaterRowId, this.repeaterRow.rowId);
    acAddClassToElement({ class_: AcRepeaterCssClassName.acRepeaterRowWrapper, element: this.rowWrapper });
    this.rowWrapper.appendChild(this.element);
    acAddClassToElement({ class_: AcRepeaterCssClassName.acRepeaterRow, element: this.element });
    if (this.repeaterRow.index == 0 || this.repeaterRow.index % 2 == 0) {
      acAddClassToElement({ class_: AcRepeaterCssClassName.acRepeaterRowEven, element: this.element });
    }
    else {
      acAddClassToElement({ class_: AcRepeaterCssClassName.acRepeaterRowOdd, element: this.element });
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
    this.element.innerHTML = "Repeater Row";
  }
}
