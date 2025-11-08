/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDatagridRowElement } from "./ac-datagrid-row.element";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { IAcDatagridDisplayedRowsChangeEvent } from "../interfaces/event-args/ac-datagrid-displayed-rows-change-event.interface";
import { AcEnumDatagridHook } from "../enums/ac-enum-datagrid-hooks.enum";
import { IAcDatagridBodyHookArgs } from "../interfaces/hook-args/ac-datagrid-body-hook-args.interface";
import { acLinkElementScroll, acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcElementBase } from "../../../core/ac-element-base";
import { AcScrollable } from "../../_components.export";

export class AcDatagridBody extends AcElementBase {
  private _datagridApi!: AcDatagridApi;
  get datagridApi(): AcDatagridApi {
    return this._datagridApi;
  }
  set datagridApi(value: AcDatagridApi) {
    this._datagridApi = value;
    this.datagridApi.hooks.subscribe({
      hook: AcEnumDatagridHook.DisplayedRowsChange,
      callback: (event: IAcDatagridDisplayedRowsChangeEvent) => {
        this.setDisplayRows();
      }
    });
  }
  scrollable: AcScrollable = new AcScrollable({ element: this, options: { bufferCount: 10 } });

  constructor() {
    super();

  }

  override init() {
    super.init();
    this.registerListeners();
    this.setDisplayRows();
    const hookArgs: IAcDatagridBodyHookArgs = {
      datagridApi: this.datagridApi,
      datagridBody: this
    };
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.BodyCreate, args: hookArgs });
  }


  registerListeners() {
    // const datagrid = this.datagridApi?.datagrid;
    // const header = datagrid?.datagridHeader;
    // acLinkElementScroll({ source: this, destination: header });
  }

  setDisplayRows() {
    if (this.datagridApi) {
      this.innerHTML = "";
      this.scrollable.pause();
      this.scrollable.clearAll();
      for (const row of this.datagridApi.displayedDatagridRows) {
        const datagridRow = new AcDatagridRowElement();
        datagridRow.datagridApi = this.datagridApi;
        datagridRow.datagridRow = row;
        this.append(datagridRow);
      }
      this.scrollable.resume();
      this.scrollable.autoRegister();
    }
  }
}

acRegisterCustomElement({ tag: 'ac-datagrid-body', type: AcDatagridBody });
