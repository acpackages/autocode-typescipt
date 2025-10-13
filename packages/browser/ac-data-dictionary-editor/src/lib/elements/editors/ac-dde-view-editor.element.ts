/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { acAddClassToElement, AcEnumDatagridEvent, AcResizableAttributeName, AcResizablePanels, IAcDatagridActiveRowChangeEvent, IAcDatagridRowEvent, IAcDatagridStateChangeEvent, IAcResizablePanelResizeEvent } from '@autocode-ts/ac-browser';
import { IAcDDETable } from '../../interfaces/ac-dde-table.inteface';
import { AcDDEApi } from '../../core/ac-dde-api';
import { AcEnumDDEHook } from '../../enums/ac-enum-dde-hooks.enum';
import { IAcDDETableColumn } from '../../interfaces/ac-dde-table-column.inteface';
import { AcEnumDDETableColumn } from '../../enums/ac-enum-dde-storage-keys.enum';
import { AcEnumDDEEvent } from '../../enums/ac-enum-dde-event.enum';
import { AcDDECssClassName } from '../../consts/ac-dde-css-class-name.const';
import { AcDDEViewColumnsDatagrid, AcDDEViewsDatagrid, IAcDDEView, IAcDDEViewEditorState } from '../../_ac-data-dictionary-editor.export';
import { AcDDEViewMaster } from '../masters/ac-dde-view-master.element';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class AcDDEViewEditor {
  activeView?: IAcDDEView;
  editorApi!: AcDDEApi;

  columnsContainer: HTMLElement = document.createElement('div');
  columnPropertiesContainer: HTMLElement = document.createElement('div');
  headerElement: HTMLElement = document.createElement('div');
  element: HTMLElement = document.createElement('div');
  viewsWrapper: HTMLElement = document.createElement('div');
  viewDetailsWrapper: HTMLElement = document.createElement('div');
  viewDetailsContainer: HTMLElement = document.createElement('div');
  viewsContainer: HTMLElement = document.createElement('div');
  viewPropertiesContainer: HTMLElement = document.createElement('div');

  viewColumnsDatagrid!: AcDDEViewColumnsDatagrid;
  viewsDatagrid!: AcDDEViewsDatagrid;
  viewMaster: AcDDEViewMaster;

  editorPanels: AcResizablePanels = new AcResizablePanels();
  detailPanels: AcResizablePanels = new AcResizablePanels();

  state: IAcDDEViewEditorState = {};

  editorInitialized: boolean = false;


  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;

    this.viewsDatagrid = new AcDDEViewsDatagrid({ editorApi: this.editorApi });
    this.viewsDatagrid.datagridApi.on({
      event: AcEnumDatagridEvent.ActiveRowChange, callback: (args: IAcDatagridActiveRowChangeEvent) => {
        setTimeout(() => {
          this.editorApi.hooks.execute({ hook: AcEnumDDEHook.TableEditorActiveTableChange });
          this.activeView = this.viewsDatagrid.datagridApi!.activeDatagridRow!.data;
          this.viewColumnsDatagrid.applyFilter();
        }, 10);
      }
    });
    this.viewsDatagrid.datagridApi.on({
      event: AcEnumDatagridEvent.StateChange, callback: (args: IAcDatagridStateChangeEvent) => {
        this.updateEditorState();
      }
    });

    this.viewMaster = new AcDDEViewMaster({editorApi});

    this.viewColumnsDatagrid = new AcDDEViewColumnsDatagrid({ editorApi: this.editorApi });
    this.viewColumnsDatagrid.filterFunction = (row: IAcDDETableColumn) => {
      let tableId: any = undefined;
      if (this.viewsDatagrid && this.viewsDatagrid.datagridApi && this.viewsDatagrid.datagridApi.activeDatagridRow) {
        const activeRow: IAcDDETable = this.viewsDatagrid.datagridApi.activeDatagridRow.data;
        tableId = activeRow.tableId;
      }
      return row.tableId == tableId;
    };
    this.viewColumnsDatagrid.datagridApi.on({
      event: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
        args.datagridRow.data[AcEnumDDETableColumn.TableId] = this.activeView!.viewId;
      }
    });
    this.viewColumnsDatagrid.datagridApi.on({
      event: AcEnumDatagridEvent.StateChange, callback: (args: IAcDatagridStateChangeEvent) => {
        this.updateEditorState();
      }
    });

    this.viewColumnsDatagrid.applyFilter();

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

    this.element.append(this.viewsWrapper);
    this.viewsWrapper.setAttribute(AcResizableAttributeName.acResizablePanel, '');
    acAddClassToElement({ class_: AcDDECssClassName.acDDETablesWrapper, element: this.viewsWrapper });

    this.element.append(this.viewDetailsWrapper);
    this.viewDetailsWrapper.setAttribute(AcResizableAttributeName.acResizablePanel, '');
    acAddClassToElement({ class_: AcDDECssClassName.acDDETableDetailsWrapper, element: this.viewDetailsWrapper });

    acAddClassToElement({ class_: AcDDECssClassName.acDDETableDetailsContainer, element: this.viewDetailsContainer });
    this.viewDetailsContainer.setAttribute(AcResizableAttributeName.acResizablePanels, '');


    this.viewsWrapper.append(this.viewsContainer);
    acAddClassToElement({ class_: AcDDECssClassName.acDDETablesContainer, element: this.viewsContainer });
    this.viewsContainer.append(this.viewsDatagrid.element);

    this.viewDetailsWrapper.append(this.viewDetailsContainer);
    this.viewDetailsContainer.append(this.viewMaster.element);
    this.viewDetailsContainer.append(this.columnsContainer);
    this.columnsContainer.setAttribute(AcResizableAttributeName.acResizablePanel, '');
    acAddClassToElement({ class_: AcDDECssClassName.acDDETableColumnsContainer, element: this.columnsContainer });
    this.columnsContainer.append(this.viewColumnsDatagrid.element);

    // this.detailPanels = new AcResizablePanels({ element: this.viewDetailsContainer, direction: AcEnumResizePanelDirection.Vertical });
    // this.detailPanels.setPanelSizes({
    //   panelSizes: [
    //     { size: 60, index: 0 },
    //     { size: 20, index: 1 },
    //     { size: 20, index: 1 }
    //   ]
    // });
    // this.detailPanels.on({
    //   event: AcEnumResizableEvent.resize, callback: (args: IAcResizablePanelResizeEvent) => {
    //     this.updateEditorState();
    //   }
    // });

    // this.editorPanels = new AcResizablePanels({ element: this.element, direction: AcEnumResizePanelDirection.Horizontal });
    // this.editorPanels.setPanelSizes({
    //   panelSizes: [
    //     { size: 20, index: 0 },
    //     { size: 80, index: 1 }
    //   ]
    // });
    // this.editorPanels.on({
    //   event: AcEnumResizableEvent.resize, callback: (args: IAcResizablePanelResizeEvent) => {
    //     this.updateEditorState();
    //   }
    // });
    this.refreshEditorState();
    setTimeout(() => {
      this.editorInitialized = true;
    }, 500);
  }

  refreshEditorState() {
    const state = this.editorApi.editorState.viewEditorState;
    if (state) {
      if (state.detailPanels) {
        this.detailPanels.setPanelSizes({ panelSizes: state.detailPanels });
      }
      if (state.editorPanels) {
        this.editorPanels.setPanelSizes({ panelSizes: state.editorPanels });
      }
      if (state.viewsDatagrid) {
        this.viewsDatagrid.datagridApi.setState({ state: state.viewsDatagrid });
      }
      if (state.viewColumnsDatagrid) {
        this.viewColumnsDatagrid.datagridApi.setState({ state: state.viewColumnsDatagrid });
      }
    }
  }

  updateEditorState() {
    if (this.editorInitialized) {
      this.state.viewsDatagrid = this.viewsDatagrid.datagridApi.getState();
      this.state.viewColumnsDatagrid = this.viewColumnsDatagrid.datagridApi.getState();
      this.state.detailPanels = this.detailPanels.getPanelSizes();
      this.state.editorPanels = this.editorPanels.getPanelSizes();
      this.editorApi.editorState.tableEditorState = { ...this.state };
    }
  }
}
