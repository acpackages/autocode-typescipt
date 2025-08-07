/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcDDEApi, AcDDECssClassName, IAcDDETableRow } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagridExtensionManager } from '@autocode-ts/ac-browser';
import { AcDDETableColumnPropertiesDatagrid } from "./ac-dde-table-column-properties-datagrid.element";
import { AcDDETableColumnsDatagrid } from "./ac-dde-table-columns-datagrid.element";
import { AcDDETablePropertiesDatagrid } from "./ac-dde-table-properties-datagrid.element";
import { AcDDETableRelationshipsDatagrid } from "./ac-dde-table-relationships-datagrid.element";
import { AcDDETablesDatagrid } from "./ac-dde-tables-datagrid.element";
import { AgGridOnAcDatagrid } from "@autocode-ts/ac-datagrid-on-ag-grid";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class AcDataDictionaryEditor {
  editorApi!:AcDDEApi;

  activeTable?:IAcDDETableRow;

  tablesWrapper:HTMLElement = document.createElement('div');
  tableDetailsWrapper:HTMLElement = document.createElement('div');
  element:HTMLElement = document.createElement('div');
  tablesContainer:HTMLElement = document.createElement('div');
  columnsContainer:HTMLElement = document.createElement('div');
  columnPropertiesContainer:HTMLElement = document.createElement('div');
  tablePropertiesContainer:HTMLElement = document.createElement('div');
  tableRelationshipsContainer:HTMLElement = document.createElement('div');


  tableColumnPropertiesDatagrid!:AcDDETableColumnPropertiesDatagrid;
  tableColumnsDatagrid!:AcDDETableColumnsDatagrid;
  tablePropertiesDatagrid!:AcDDETablePropertiesDatagrid;
  tableRelationshipsDatagrid!:AcDDETableRelationshipsDatagrid;
  tablesDatagrid!:AcDDETablesDatagrid;


  constructor(){
    this.editorApi = new AcDDEApi();
    console.log(AgGridOnAcDatagrid);
    AcDatagridExtensionManager.register(AgGridOnAcDatagrid);
    this.tableColumnPropertiesDatagrid = new AcDDETableColumnPropertiesDatagrid({editorApi:this.editorApi});
    this.tableColumnsDatagrid = new AcDDETableColumnsDatagrid({editorApi:this.editorApi});
    this.tablePropertiesDatagrid = new AcDDETablePropertiesDatagrid({editorApi:this.editorApi});
    this.tableRelationshipsDatagrid = new AcDDETableRelationshipsDatagrid({editorApi:this.editorApi});
    this.tablesDatagrid = new AcDDETablesDatagrid({editorApi:this.editorApi});

    this.initElement();
  }

  init(){
    // this.datagridApi.dataSource.getData();
  }

  private initElement(){
    acAddClassToElement({cssClass:AcDDECssClassName.acDataDictionaryEditor,element:this.element});
    acAddClassToElement({cssClass:AcDDECssClassName.acDDEDatagridWrapper,element:this.element});

    this.element.append(this.tablesWrapper);
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETablesWrapper,element:this.tablesWrapper});

    this.element.append(this.tableDetailsWrapper);
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETableDetailsWrapper,element:this.tableDetailsWrapper});

    this.tablesWrapper.append(this.tablesContainer);
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETablesContainer,element:this.tablesContainer});
    this.tablesContainer.append(this.tablesDatagrid.element);

    this.tableDetailsWrapper.append(this.columnsContainer);
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETableColumnsContainer,element:this.columnsContainer});
    this.columnsContainer.append(this.tableColumnsDatagrid.element);

    // this.element.append(this.columnPropertiesContainer);
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETableColumnPropertiesContainer,element:this.columnPropertiesContainer});
    this.columnPropertiesContainer.append(this.tableColumnPropertiesDatagrid.element);

    // this.element.append(this.tablePropertiesContainer);
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETablePropertiesContainer,element:this.tablePropertiesContainer});
    this.tablePropertiesContainer.append(this.tablePropertiesDatagrid.element);

    this.tableDetailsWrapper.append(this.tableRelationshipsContainer);
    acAddClassToElement({cssClass:AcDDECssClassName.acDDETableRelationshipsContainer,element:this.tableRelationshipsContainer});
    this.tableRelationshipsContainer.append(this.tableRelationshipsDatagrid.element);


    // this.element.innerHTML = 'Data Dictionary Editor';
    // this.containerElement.append(this.datagridHeader.element);
    // this.containerElement.append(this.datagridBody.element);
    // this.element.append(this.datagridFooter.element);
  }
}
