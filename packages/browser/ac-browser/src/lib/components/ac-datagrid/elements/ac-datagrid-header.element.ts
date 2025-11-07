import { AcElementBase } from "../../../core/ac-element-base";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcEnumDatagridEvent } from "../enums/ac-enum-datagrid-event.enum";
import { AcEnumDatagridHook } from "../enums/ac-enum-datagrid-hooks.enum";
import { IAcDatagridHeaderHookArgs } from "../interfaces/hook-args/ac-datagrid-header-hook-args.interface";
import { AcDatagridHeaderCellElement } from "./ac-datagrid-header-cell.element";


export class AcDatagridHeader extends AcElementBase{
  private _datagridApi!: AcDatagridApi;
  get datagridApi():AcDatagridApi{
    return this._datagridApi;
  }
  set datagridApi(value:AcDatagridApi){
    this._datagridApi = value;
    value.on({event:AcEnumDatagridEvent.ColumnDefinitionsSet,callback:()=>{
      this.setColumns();
    }});
  }

  datagridHeaderCells:AcDatagridHeaderCellElement[] = [];

  constructor(){
    super();
    this.style.display = "flex";
    this.style.overflowX = 'hidden';
    this.style.width = '100%';
    this.style.minHeight = 'max-content';
  }

  override connectedCallback(){
    super.connectedCallback();
  }

  setColumns(){
    this.innerHTML = "";
    const hookArgs:IAcDatagridHeaderHookArgs = {
      datagridHeader:this,
      datagridApi:this.datagridApi
    };
    this.datagridHeaderCells = [];
    this.datagridApi.hooks.execute({hook:AcEnumDatagridHook.BeforeHeaderColumnCellsCreate,args:hookArgs});
    for(const column of this.datagridApi.datagridColumns){
      const headerCell = new AcDatagridHeaderCellElement();
      headerCell.datagridApi = this.datagridApi;
      headerCell.datagridColumn = column;
      if(column.visible){
        this.append(headerCell);
      }
      this.datagridHeaderCells.push(headerCell);
    }
    this.datagridApi.hooks.execute({hook:AcEnumDatagridHook.HeaderColumnCellsCreate,args:hookArgs});
  }
}

acRegisterCustomElement({tag:'ac-datagrid-header',type:AcDatagridHeader});
