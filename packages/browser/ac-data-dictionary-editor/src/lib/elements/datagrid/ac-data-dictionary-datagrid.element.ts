/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcDDEApi, AcDDECssClassName, AcDDETableColumnRowKey, AcEnumDDEHook, IAcDDERelationshipRow, IAcDDETableColumnRow, IAcDDETableRow, IAcDDETriggerRow } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcEnumDatagridEvent, AcEnumResizePanelDirection,AcResizableAttributeName, AcResizablePanels, IAcDatagridRowEvent } from '@autocode-ts/ac-browser';
import { AcDDETableColumnPropertiesDatagrid } from "./ac-dde-table-column-properties-datagrid.element";
import { AcDDETableColumnsDatagrid } from "./ac-dde-table-columns-datagrid.element";
import { AcDDETablePropertiesDatagrid } from "./ac-dde-table-properties-datagrid.element";
import { AcDDETablesDatagrid } from "./ac-dde-tables-datagrid.element";
import { AcDDETriggersDatagrid } from "./ac-dde-triggers-datagrid.element";
import { AcDDERelationshipsDatagrid } from "./ac-dde-relationships-datagrid.element";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class AcDataDictionaryDatagrid {
  activeTable?:IAcDDETableRow;
  editorApi!:AcDDEApi;

  columnsContainer:HTMLElement = document.createElement('div');
  columnPropertiesContainer:HTMLElement = document.createElement('div');
  headerElement:HTMLElement = document.createElement('div');
  element:HTMLElement = document.createElement('div');
  tablesWrapper:HTMLElement = document.createElement('div');
  tableDetailsWrapper:HTMLElement = document.createElement('div');
  tableDetailsContainer:HTMLElement = document.createElement('div');
  tablesContainer:HTMLElement = document.createElement('div');
  tablePropertiesContainer:HTMLElement = document.createElement('div');
  tableRelationshipsContainer:HTMLElement = document.createElement('div');
  tableTriggersContainer:HTMLElement = document.createElement('div');

  tableColumnPropertiesDatagrid!:AcDDETableColumnPropertiesDatagrid;
  tableColumnsDatagrid!:AcDDETableColumnsDatagrid;
  tablePropertiesDatagrid!:AcDDETablePropertiesDatagrid;
  tableRelationshipsDatagrid!:AcDDERelationshipsDatagrid;
  tablesDatagrid!:AcDDETablesDatagrid;
  tableTriggersDatagrid!:AcDDETriggersDatagrid;

  editorPanels!:AcResizablePanels;
  detailPanels!:AcResizablePanels;


  constructor({editorApi}:{editorApi:AcDDEApi}){
    this.editorApi = editorApi;
    this.tableColumnPropertiesDatagrid = new AcDDETableColumnPropertiesDatagrid({editorApi:this.editorApi});
    this.tablePropertiesDatagrid = new AcDDETablePropertiesDatagrid({editorApi:this.editorApi});

    this.tablesDatagrid = new AcDDETablesDatagrid({editorApi:this.editorApi});
    this.tablesDatagrid.hooks.subscribe({hookName:AcEnumDDEHook.DatagridActiveTableChange,callback:()=>{
      console.log('Active row change');
      if(this.tablesDatagrid && this.tablesDatagrid.datagridApi && this.tablesDatagrid.datagridApi.activeDatagridRow){
        this.activeTable = this.tablesDatagrid.datagridApi.activeDatagridRow.data;
        console.log('Active table change');
        this.tableColumnsDatagrid.applyFilter();
        this.tableRelationshipsDatagrid.applyFilter();
        this.tableTriggersDatagrid.applyFilter();
      }
    }});
    this.tableColumnsDatagrid = new AcDDETableColumnsDatagrid({editorApi:this.editorApi});
    this.tableColumnsDatagrid.filterFunction = (row:IAcDDETableColumnRow)=>{
      let tableId:any = undefined;
      console.log('Filtering table columns');
      if(this.tablesDatagrid && this.tablesDatagrid.datagridApi && this.tablesDatagrid.datagridApi.activeDatagridRow){
        const activeRow:IAcDDETableRow = this.tablesDatagrid.datagridApi.activeDatagridRow.data;
        tableId = activeRow.table_id;
      }
      console.log(tableId);
      return row.table_id == tableId;
    };
    this.tableColumnsDatagrid.datagridApi.on({eventName:AcEnumDatagridEvent.RowAdd,callback:(args:IAcDatagridRowEvent)=>{
      console.log(this);
      args.datagridRow.data[AcDDETableColumnRowKey.tableId] = this.activeTable!.table_id;
    }})

    this.tableRelationshipsDatagrid = new AcDDERelationshipsDatagrid({editorApi:this.editorApi});
    this.tableRelationshipsDatagrid.filterFunction = (row:IAcDDERelationshipRow)=>{
      let tableId:any = undefined;
      if(this.tablesDatagrid && this.tablesDatagrid.datagridApi && this.tablesDatagrid.datagridApi.activeDatagridRow){
        const activeRow:IAcDDETableRow = this.tablesDatagrid.datagridApi.activeDatagridRow.data;
        tableId = activeRow.table_id;
      }
      return row.destination_table_id == tableId;
    };

    this.tableTriggersDatagrid = new AcDDETriggersDatagrid({editorApi:this.editorApi});
    this.tableTriggersDatagrid.filterFunction = (row:IAcDDETriggerRow)=>{
      let tableId:any = undefined;
      if(this.tablesDatagrid && this.tablesDatagrid.datagridApi && this.tablesDatagrid.datagridApi.activeDatagridRow){
        const activeRow:IAcDDETableRow = this.tablesDatagrid.datagridApi.activeDatagridRow.data;
        tableId = activeRow.table_id;
      }
      return row.table_id == tableId;
    };

    this.tableColumnsDatagrid.applyFilter();
      this.tableRelationshipsDatagrid.applyFilter();
      this.tableTriggersDatagrid.applyFilter();

    this.initElement();
  }

  init(){
    // this.datagridApi.dataSource.getData();
  }

  private initElement(){
    acAddClassToElement({cssClass:AcDDECssClassName.acDataDictionaryEditor,element:this.element});
    acAddClassToElement({cssClass:AcDDECssClassName.acDDEDatagridWrapper,element:this.element});

    this.element.append(this.tablesWrapper);
    this.tablesWrapper.setAttribute(AcResizableAttributeName.acResizablePanel,'');
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETablesWrapper,element:this.tablesWrapper});

    this.element.append(this.tableDetailsWrapper);
    this.tableDetailsWrapper.setAttribute(AcResizableAttributeName.acResizablePanel,'');
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETableDetailsWrapper,element:this.tableDetailsWrapper});

    acAddClassToElement({cssClass:AcDDECssClassName.acDDETableDetailsContainer,element:this.tableDetailsContainer});
    this.tableDetailsContainer.setAttribute(AcResizableAttributeName.acResizablePanels,'');


    this.tablesWrapper.append(this.tablesContainer);
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETablesContainer,element:this.tablesContainer});
    this.tablesContainer.append(this.tablesDatagrid.element);


    this.tableDetailsWrapper.append(this.tableDetailsContainer);
    this.tableDetailsContainer.append(this.columnsContainer);
    this.columnsContainer.setAttribute(AcResizableAttributeName.acResizablePanel,'');
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETableColumnsContainer,element:this.columnsContainer});
    this.columnsContainer.append(this.tableColumnsDatagrid.element);

    // this.element.append(this.columnPropertiesContainer);
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETableColumnPropertiesContainer,element:this.columnPropertiesContainer});
    this.columnPropertiesContainer.append(this.tableColumnPropertiesDatagrid.element);

    // this.element.append(this.tablePropertiesContainer);
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETablePropertiesContainer,element:this.tablePropertiesContainer});
    this.tablePropertiesContainer.append(this.tablePropertiesDatagrid.element);

    this.tableDetailsContainer.append(this.tableRelationshipsContainer);
    this.tableRelationshipsContainer.setAttribute(AcResizableAttributeName.acResizablePanel,'');
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETableRelationshipsContainer,element:this.tableRelationshipsContainer});
    this.tableRelationshipsContainer.append(this.tableRelationshipsDatagrid.element);

    this.tableDetailsContainer.append(this.tableTriggersContainer);
    this.tableTriggersContainer.setAttribute(AcResizableAttributeName.acResizablePanel,'');
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETableTriggersContainer,element:this.tableTriggersContainer});
    this.tableTriggersContainer.append(this.tableTriggersDatagrid.element);

    this.detailPanels = new AcResizablePanels({element:this.tableDetailsContainer,direction:AcEnumResizePanelDirection.Vertical});
    this.detailPanels.setPanelSizes({panelSizes:[
      {size:60,index:0},
      {size:20,index:1},
      {size:20,index:1}
    ]});
    this.editorPanels = new AcResizablePanels({element:this.element,direction:AcEnumResizePanelDirection.Horizontal});
    this.editorPanels.setPanelSizes({panelSizes:[
      {size:20,index:0},
      {size:80,index:1}
    ]});
  }
}
