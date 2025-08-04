import { acAddClassToElement } from "../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcEnumDatagridEvent } from "../enums/ac-enum-datagrid-event.enum";
import { AcEnumDatagridHook } from "../enums/ac-enum-datagrid-hooks.enum";
import { IAcDatagridHeaderHookArgs } from "../interfaces/hook-args/ac-datagrid-header-hook-args.interface";
import { AcDatagridHeaderCellElement } from "./ac-datagrid-header-cell.element";


export class AcDatagridHeaderElement {
  public element:HTMLElement = document.createElement('div');
  private datagridApi:AcDatagridApi;
  headerRowElement:HTMLElement = document.createElement('div');
  private rowDragCellElement:HTMLElement = document.createElement('div');
  private rowNumberCellElement:HTMLElement = document.createElement('div');
  private rowSelectCellElement:HTMLElement = document.createElement('div');
  datagridHeaderCells:AcDatagridHeaderCellElement[] = [];

  constructor({datagridApi}:{datagridApi:AcDatagridApi}){
    this.datagridApi = datagridApi;
    this.datagridApi.on({eventName:AcEnumDatagridEvent.ColDefsSet,callback:()=>{
      this.setColumns();
    }});
    this.initElement();
  }

  initElement(){
    acAddClassToElement({cssClass:AcDatagridCssClassName.acDatagridHeader,element:this.element});
    acAddClassToElement({cssClass:AcDatagridCssClassName.acDatagridHeaderRow,element:this.headerRowElement});
    this.element.append(this.headerRowElement);
  }

  setColumns(){
    this.headerRowElement.innerHTML = "";
    const hookArgs:IAcDatagridHeaderHookArgs = {
      datagridHeader:this,
      datagridApi:this.datagridApi
    };
    this.datagridApi.hooks.execute({hookName:AcEnumDatagridHook.BeforeHeaderColumnCellsCreated,args:hookArgs});
    this.datagridHeaderCells = [];
    for(const column of this.datagridApi.datagridColumns){
      const headerCell = new AcDatagridHeaderCellElement({datagridApi:this.datagridApi,datagridColumn:column});
      this.headerRowElement.append(headerCell.element);
      this.datagridHeaderCells.push(headerCell);
    }
    this.datagridApi.hooks.execute({hookName:AcEnumDatagridHook.HeaderColumnCellsCreated,args:hookArgs});
    console.log(this);
  }
}
