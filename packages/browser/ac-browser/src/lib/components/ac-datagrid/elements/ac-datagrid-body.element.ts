/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDatagridRowElement } from "./ac-datagrid-row.element";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { IAcDatagridDisplayedRowsChangeEvent } from "../interfaces/event-args/ac-datagrid-displayed-rows-change-event.interface";
import { AcEnumDatagridHook } from "../enums/ac-enum-datagrid-hooks.enum";
import { IAcDatagridBodyHookArgs } from "../interfaces/hook-args/ac-datagrid-body-hook-args.interface";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { acAddClassToElement } from "../../../utils/ac-element-functions";

export class AcDatagridBodyElement {
  public element: HTMLElement = document.createElement('div');
  public rowsContainer: HTMLElement = document.createElement('div');
  private datagridApi: AcDatagridApi;

  constructor({ datagridApi }: { datagridApi: AcDatagridApi }) {
    this.datagridApi = datagridApi;
    this.datagridApi.hooks.subscribe({
      hook: AcEnumDatagridHook.DisplayedRowsChange,
      callback: (event: IAcDatagridDisplayedRowsChangeEvent) => {
        this.setDisplayRows();
      }
    });
    const hookArgs: IAcDatagridBodyHookArgs = {
      datagridApi: this.datagridApi,
      datagridBody: this
    };
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.BodyCreate, args: hookArgs });
    this.initElement();
  }

  handleElementScroll(event: any) {
    event.preventDefault();
    if (event.target && this.datagridApi && this.datagridApi.datagrid && this.datagridApi.datagrid.datagridHeader && this.datagridApi.datagrid.datagridHeader.element) {
      this.datagridApi.datagrid.datagridHeader.element.scrollLeft = event.target.scrollLeft;
    }
  }

  initElement() {
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridBody, element: this.element });
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridRowsContainer, element: this.rowsContainer });
    this.element.append(this.rowsContainer);
    // this.floatingScrollbar = new AcFloatingScrollbar({element:this.element,parentElement:this.datagridApi.datagrid.containerElement});
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
    for (const row of this.datagridApi.displayedDatagridRows) {
      const datagridRow = new AcDatagridRowElement({ datagridApi: this.datagridApi, datagridRow: row });
      this.rowsContainer.append(datagridRow.rowWrapper);
    }
  }
}
