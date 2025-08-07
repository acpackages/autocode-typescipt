/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-data-dictionary-editor/src/lib/css/ac-data-dictionary-editor.css';
import { AcDataDictionaryEditor, AcDDEApi } from '@autocode-ts/ac-data-dictionary-editor';
import { PageHeader } from '../../components/page-header/page-header.component';
import {dataDictionaryJson} from './../../../../data/data_dictionary';

export class DDEEditorDatagridPage  extends HTMLElement {
  dataDictionaryEditor!: AcDataDictionaryEditor;
  editorApi!: AcDDEApi;
  pageHeader: PageHeader = new PageHeader();
  async connectedCallback() {
    const html = `
      <div id="editorContainer" class="editor-container" style="height:calc(100vh - 60px);"></div>
    `;
    this.innerHTML = html;
    this.style.height = '100vh;'
    this.prepend(this.pageHeader.element);
    this.pageHeader.pageTitle = 'Data Dictionary Editor';
    this.initDatagrid();
  }

  async initDatagrid() {
    const gridDiv = document.querySelector<HTMLElement>('#editorContainer');
    if (gridDiv) {
      this.dataDictionaryEditor = new AcDataDictionaryEditor();
      this.editorApi = this.dataDictionaryEditor.editorApi;
      this.editorApi.loadDataDictionaryJson({dataDictionaryJson:dataDictionaryJson,dataDictionaryName:'Test'});
      gridDiv.append(this.dataDictionaryEditor.element);
      // this.getElementsByClassName("aggrid-container")[0].append(this.datagrid.element);

      // this.pageHeader.addMenuItem({
      //   label: 'Row Numbers',
      //   children: [
      //     {
      //       label: 'Show Row Numbers',
      //       callback: () => {
      //         this.rowNumbersExtension.showRowNumbers = true;
      //       }
      //     },
      //     {
      //       label: 'Hide Row Numbers',
      //       callback: () => {
      //         this.rowNumbersExtension.showRowNumbers = false;
      //         console.log(this.datagridApi);
      //       }
      //     },
      //   ]
      // });
      // this.pageHeader.addMenuItem({
      //   label: 'Customize & Export',
      //   children: [
      //     {
      //       label: 'Toggle Columns Customizer',
      //       callback: () => {
      //         this.columnsCustomizerExtension.toggleColumnsCustomizer();
      //       }
      //     },
      //     {
      //       label: 'Export XLSX',
      //       callback: () => {
      //         this.dataExportXlsxExtension.exportData({fileName:'Customer Data.xlsx'});
      //       }
      //     },
      //   ]
      // });
      // this.pageHeader.addMenuItem({
      //   label: 'Data & Selection',
      //   children: [
      //     {
      //       label: 'Goto First Row',
      //       callback: () => {
      //         this.datagridApi.focusFirstRow({highlightCells:true});
      //       }
      //     },
      //     {
      //       label: 'Goto Last Row',
      //       callback: () => {
      //         this.datagridApi.focusLastRow({highlightCells:true});
      //       }
      //     },
      //     {
      //       label: 'Clear Selection',
      //       callback: () => {
      //         this.rowSelectionExtension.clearSelection();
      //       }
      //     },
      //     {
      //       label: 'Select All Rows',
      //       callback: () => {
      //         this.rowSelectionExtension.setAllRowsSelection({ isSelected: true });
      //       }
      //     },
      //     {
      //       label: 'Get Selected Rows',
      //       callback: () => {
      //         console.log(this.rowSelectionExtension.getSelectedRows());
      //       }
      //     },
      //     {
      //       label: 'Get Selected Rows Data',
      //       callback: () => {
      //         console.log(this.rowSelectionExtension.getSelectedRowsData());
      //       }
      //     },

      //   ]
      // });

      // this.datagridApi.on({eventName:AcEnumDatagridEvent.CellRendererElementInit,callback:(args:IAcDatagridCellRendererElementInitEvent)=>{
      //   const instance = args.cellRendererElementInstance;
      //   if(instance instanceof ActionsDatagridColumn){
      //     instance.editButton.addEventListener('click',(event:any)=>{
      //       const updatedData:any = {...instance.datagridCell.datagridRow.data};
      //       updatedData['first_name'] = `Modified - ${updatedData['first_name']}`;
      //       this.datagridApi.updateRow({data:updatedData,rowId:instance.datagridCell.acRowId});
      //       // this.datagridApi.addRow({data:updatedData});
      //     });
      //   }
      // }});
      // this.datagridApi.events.subscribeAllEvents({callback:(eventName:string,args:any)=>{
      //   // console.log(`Detected event : ${eventName}`,args);
      //   const identifiedEvents:any[] = [
      //     AcEnumDatagridEvent.CellClick,
      //     AcEnumDatagridEvent.CellDoubleClick,
      //     AcEnumDatagridEvent.CellEditingStart,
      //     AcEnumDatagridEvent.CellEditingStop,
      //     AcEnumDatagridEvent.CellFocus,
      //     AcEnumDatagridEvent.CellKeyDown,
      //     AcEnumDatagridEvent.CellMouseDown,
      //     AcEnumDatagridEvent.CellMouseLeave,
      //     AcEnumDatagridEvent.CellMouseOver,
      //     AcEnumDatagridEvent.CellRendererElementInit,
      //     AcEnumDatagridEvent.CellValueChange,

      //     AcEnumDatagridEvent.ColumnHeaderClick,

      //     AcEnumDatagridEvent.PaginationChange,

      //     AcEnumDatagridEvent.RowClick,
      //     AcEnumDatagridEvent.RowDoubleClick,

      //     AcEnumDatagridEvent.SortOrderChange
      //   ];
      //   if(!identifiedEvents.includes(eventName)){
      //     console.log(`Found event : ${eventName}`,args);
      //   }
      // }});

    }
  }
}
