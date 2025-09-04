/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { acAddClassToElement, AcEnumDatagridEvent, AcEnumResizableEvent, AcEnumResizePanelDirection, AcResizableAttributeName, AcResizablePanels, IAcDatagridActiveRowChangeEvent, IAcDatagridRowEvent, IAcDatagridStateChangeEvent, IAcResizablePanelResizeEvent } from '@autocode-ts/ac-browser';
import { IAcDDETable } from '../../interfaces/ac-dde-table.inteface';
import { AcDDEApi } from '../../core/ac-dde-api';
import { AcDDETableColumnsDatagrid } from '../datagrid/ac-dde-table-columns-datagrid.element';
import { AcDDERelationshipsDatagrid } from '../datagrid/ac-dde-relationships-datagrid.element';
import { AcDDETriggersDatagrid } from '../datagrid/ac-dde-triggers-datagrid.element';
import { AcDDETablesDatagrid } from '../datagrid/ac-dde-tables-datagrid.element';
import { AcEnumDDEHook } from '../../enums/ac-enum-dde-hooks.enum';
import { IAcDDETableColumn } from '../../interfaces/ac-dde-table-column.inteface';
import { AcEnumDDERelationship, AcEnumDDETableColumn, AcEnumDDETrigger } from '../../enums/ac-enum-dde-storage-keys.enum';
import { IAcDDERelationship } from '../../interfaces/ac-dde-relationship.inteface';
import { IAcDDETrigger } from '../../interfaces/ac-dde-trigger.inteface';
import { AcEnumDDEEvent } from '../../enums/ac-enum-dde-event.enum';
import { AcDDECssClassName } from '../../consts/ac-dde-css-class-name.const';
import { IAcDDETableEditorState } from '../../interfaces/ac-dde-table-editor-state.interface';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class AcDDETableEditor {
  activeTable?: IAcDDETable;
  editorApi!: AcDDEApi;

  columnsContainer: HTMLElement = document.createElement('div');
  columnPropertiesContainer: HTMLElement = document.createElement('div');
  headerElement: HTMLElement = document.createElement('div');
  element: HTMLElement = document.createElement('div');
  tablesWrapper: HTMLElement = document.createElement('div');
  tableDetailsWrapper: HTMLElement = document.createElement('div');
  tableDetailsContainer: HTMLElement = document.createElement('div');
  tablesContainer: HTMLElement = document.createElement('div');
  tablePropertiesContainer: HTMLElement = document.createElement('div');
  tableRelationshipsContainer: HTMLElement = document.createElement('div');
  tableTriggersContainer: HTMLElement = document.createElement('div');

  tableColumnsDatagrid!: AcDDETableColumnsDatagrid;
  tableRelationshipsDatagrid!: AcDDERelationshipsDatagrid;
  tablesDatagrid!: AcDDETablesDatagrid;
  tableTriggersDatagrid!: AcDDETriggersDatagrid;

  editorPanels!: AcResizablePanels;
  detailPanels!: AcResizablePanels;

  state: IAcDDETableEditorState = {};

  editorInitialized: boolean = false;


  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;

    this.tablesDatagrid = new AcDDETablesDatagrid({ editorApi: this.editorApi });
    this.tablesDatagrid.datagridApi.on({
      event: AcEnumDatagridEvent.ActiveRowChange, callback: (args: IAcDatagridActiveRowChangeEvent) => {
        setTimeout(() => {
          this.editorApi.hooks.execute({ hook: AcEnumDDEHook.TableEditorActiveTableChange });
          this.activeTable = this.tablesDatagrid.datagridApi!.activeDatagridRow!.data;
          this.tableColumnsDatagrid.applyFilter();
          this.tableRelationshipsDatagrid.applyFilter();
          this.tableTriggersDatagrid.applyFilter();
        }, 10);
      }
    });
    this.tablesDatagrid.datagridApi.on({
      event: AcEnumDatagridEvent.StateChange, callback: (args: IAcDatagridStateChangeEvent) => {
        this.updateEditorState();
      }
    });

    this.tableColumnsDatagrid = new AcDDETableColumnsDatagrid({ editorApi: this.editorApi });
    this.tableColumnsDatagrid.filterFunction = (row: IAcDDETableColumn) => {
      let tableId: any = undefined;
      if (this.tablesDatagrid && this.tablesDatagrid.datagridApi && this.tablesDatagrid.datagridApi.activeDatagridRow) {
        const activeRow: IAcDDETable = this.tablesDatagrid.datagridApi.activeDatagridRow.data;
        tableId = activeRow.tableId;
      }
      return row.tableId == tableId;
    };
    this.tableColumnsDatagrid.datagridApi.on({
      event: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
        args.datagridRow.data[AcEnumDDETableColumn.TableId] = this.activeTable!.tableId;
      }
    });
    this.tableColumnsDatagrid.datagridApi.on({
      event: AcEnumDatagridEvent.StateChange, callback: (args: IAcDatagridStateChangeEvent) => {
        this.updateEditorState();
      }
    });

    this.tableRelationshipsDatagrid = new AcDDERelationshipsDatagrid({ editorApi: this.editorApi });
    this.tableRelationshipsDatagrid.filterFunction = (row: IAcDDERelationship) => {
      let tableId: any = undefined;
      if (this.tablesDatagrid && this.tablesDatagrid.datagridApi && this.tablesDatagrid.datagridApi.activeDatagridRow) {
        const activeRow: IAcDDETable = this.tablesDatagrid.datagridApi.activeDatagridRow.data;
        tableId = activeRow.tableId;
      }
      return row.destinationTableId == tableId;
    };
    this.tableRelationshipsDatagrid.datagridApi.on({
      event: AcEnumDatagridEvent.StateChange, callback: (args: IAcDatagridStateChangeEvent) => {
        this.updateEditorState();
      }
    });
    this.tableRelationshipsDatagrid.ddeDatagrid.newRowDataFunction = () => {
      const row: any = {};
      if (this.tablesDatagrid && this.tablesDatagrid.datagridApi && this.tablesDatagrid.datagridApi.activeDatagridRow) {
        const activeRow: IAcDDETable = this.tablesDatagrid.datagridApi.activeDatagridRow.data;
        row[AcEnumDDERelationship.DestinationTableId] = activeRow.tableId;
      }
      return row;
    };

    this.tableTriggersDatagrid = new AcDDETriggersDatagrid({ editorApi: this.editorApi });
    this.tableTriggersDatagrid.ddeDatagrid.newRowDataFunction = () => {
      const row: any = {};
      if (this.tablesDatagrid && this.tablesDatagrid.datagridApi && this.tablesDatagrid.datagridApi.activeDatagridRow) {
        const activeRow: IAcDDETable = this.tablesDatagrid.datagridApi.activeDatagridRow.data;
        row[AcEnumDDETrigger.TableId] = activeRow.tableId;
      }
      return row;
    };
    this.tableTriggersDatagrid.filterFunction = (row: IAcDDETrigger) => {
      let tableId: any = undefined;
      if (this.tablesDatagrid && this.tablesDatagrid.datagridApi && this.tablesDatagrid.datagridApi.activeDatagridRow) {
        const activeRow: IAcDDETable = this.tablesDatagrid.datagridApi.activeDatagridRow.data;
        tableId = activeRow.tableId;
      }
      return row.tableId == tableId;
    };
    this.tableTriggersDatagrid.datagridApi.on({
      event: AcEnumDatagridEvent.StateChange, callback: (args: IAcDatagridStateChangeEvent) => {
        this.updateEditorState();
      }
    });

    this.tableColumnsDatagrid.applyFilter();
    this.tableRelationshipsDatagrid.applyFilter();
    this.tableTriggersDatagrid.applyFilter();

    this.initElement();

    this.editorApi.on({
      event: AcEnumDDEEvent.StateChange, callback: () => {
        this.refreshEditorState();
      }
    })
  }

  private initElement() {
    acAddClassToElement({ class_: AcDDECssClassName.acDataDictionaryEditor, element: this.element });
    acAddClassToElement({ class_: AcDDECssClassName.acDDEDatagridWrapper, element: this.element });

    this.element.append(this.tablesWrapper);
    this.tablesWrapper.setAttribute(AcResizableAttributeName.acResizablePanel, '');
    acAddClassToElement({ class_: AcDDECssClassName.acDDETablesWrapper, element: this.tablesWrapper });

    this.element.append(this.tableDetailsWrapper);
    this.tableDetailsWrapper.setAttribute(AcResizableAttributeName.acResizablePanel, '');
    acAddClassToElement({ class_: AcDDECssClassName.acDDETableDetailsWrapper, element: this.tableDetailsWrapper });

    acAddClassToElement({ class_: AcDDECssClassName.acDDETableDetailsContainer, element: this.tableDetailsContainer });
    this.tableDetailsContainer.setAttribute(AcResizableAttributeName.acResizablePanels, '');


    this.tablesWrapper.append(this.tablesContainer);
    acAddClassToElement({ class_: AcDDECssClassName.acDDETablesContainer, element: this.tablesContainer });
    this.tablesContainer.append(this.tablesDatagrid.element);

    this.tableDetailsWrapper.append(this.tableDetailsContainer);
    this.tableDetailsContainer.append(this.columnsContainer);
    this.columnsContainer.setAttribute(AcResizableAttributeName.acResizablePanel, '');
    acAddClassToElement({ class_: AcDDECssClassName.acDDETableColumnsContainer, element: this.columnsContainer });
    this.columnsContainer.append(this.tableColumnsDatagrid.element);

    this.tableDetailsContainer.append(this.tableRelationshipsContainer);
    this.tableRelationshipsContainer.setAttribute(AcResizableAttributeName.acResizablePanel, '');
    acAddClassToElement({ class_: AcDDECssClassName.acDDETableRelationshipsContainer, element: this.tableRelationshipsContainer });
    this.tableRelationshipsContainer.append(this.tableRelationshipsDatagrid.element);

    this.tableDetailsContainer.append(this.tableTriggersContainer);
    this.tableTriggersContainer.setAttribute(AcResizableAttributeName.acResizablePanel, '');
    acAddClassToElement({ class_: AcDDECssClassName.acDDETableTriggersContainer, element: this.tableTriggersContainer });
    this.tableTriggersContainer.append(this.tableTriggersDatagrid.element);

    this.detailPanels = new AcResizablePanels({ element: this.tableDetailsContainer, direction: AcEnumResizePanelDirection.Vertical });
    this.detailPanels.setPanelSizes({
      panelSizes: [
        { size: 60, index: 0 },
        { size: 20, index: 1 },
        { size: 20, index: 1 }
      ]
    });
    this.detailPanels.on({
      event: AcEnumResizableEvent.resize, callback: (args: IAcResizablePanelResizeEvent) => {
        this.updateEditorState();
      }
    });

    this.editorPanels = new AcResizablePanels({ element: this.element, direction: AcEnumResizePanelDirection.Horizontal });
    this.editorPanels.setPanelSizes({
      panelSizes: [
        { size: 20, index: 0 },
        { size: 80, index: 1 }
      ]
    });
    this.editorPanels.on({
      event: AcEnumResizableEvent.resize, callback: (args: IAcResizablePanelResizeEvent) => {
        this.updateEditorState();
      }
    });
    this.refreshEditorState();
    setTimeout(() => {
      this.editorInitialized = true;
    }, 500);
  }

  refreshEditorState() {
    const state = this.editorApi.editorState.tableEditorState;
    if (state) {
      if (state.detailPanels) {
        this.detailPanels.setPanelSizes({ panelSizes: state.detailPanels });
      }
      if (state.editorPanels) {
        this.editorPanels.setPanelSizes({ panelSizes: state.editorPanels });
      }
      if (state.tablesDatagrid) {
        this.tablesDatagrid.datagridApi.setState({ state: state.tablesDatagrid });
      }
      if (state.tableColumnsDatagrid) {
        this.tableColumnsDatagrid.datagridApi.setState({ state: state.tableColumnsDatagrid });
      }
      if (state.tableRelationshipsDatagrid) {
        this.tableRelationshipsDatagrid.datagridApi.setState({ state: state.tableRelationshipsDatagrid });
      }
      if (state.tableTriggersDatagrid) {
        this.tableTriggersDatagrid.datagridApi.setState({ state: state.tableTriggersDatagrid });
      }
    }
  }

  updateEditorState() {
    if (this.editorInitialized) {
      this.state.tablesDatagrid = this.tablesDatagrid.datagridApi.getState();
      this.state.tableColumnsDatagrid = this.tableColumnsDatagrid.datagridApi.getState();
      this.state.tableRelationshipsDatagrid = this.tableRelationshipsDatagrid.datagridApi.getState();
      this.state.tableTriggersDatagrid = this.tableTriggersDatagrid.datagridApi.getState();
      this.state.detailPanels = this.detailPanels.getPanelSizes();
      this.state.editorPanels = this.editorPanels.getPanelSizes();
      this.editorApi.editorState.tableEditorState = { ...this.state };
    }
  }
}
