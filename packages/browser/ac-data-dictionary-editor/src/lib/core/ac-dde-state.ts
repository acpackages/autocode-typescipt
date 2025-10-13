/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcJsonUtils } from "@autocode-ts/autocode";
import { IAcDatagridState } from "@autocode-ts/ac-browser";
import { IAcDDEState } from "../interfaces/ac-dde-state.interface";
import { AcDDEApi } from "./ac-dde-api";
import { IAcDDETableEditorState } from "../interfaces/ac-dde-table-editor-state.interface";
import { IAcDDEViewEditorState } from "../interfaces/ac-dde-view-editor-state.interface";

export class AcDDEState {

  static readonly KeyDataDictionariesDatagrid = "dataDictionariesDatagrid";
  static readonly KeyExtensionStates = "extensionStates";
  static readonly KeyFunctionsDatagrid = "functionsDatagrid";
  static readonly KeyRelationshipsDatagrid = "relationshipsDatagrid";
  static readonly KeyStoredProceduresDatagrid = "storedProceduresDatagrid";
  static readonly KeyTableEditorState = "tableEditorState";
  static readonly KeyViewEditorState = "viewEditorState";
  static readonly KeyTablesDatagrid = "tablesDatagrid";
  static readonly KeyTableColumnsDatagrid = "tableColumnsDatagrid";
  static readonly KeyTriggersDatagrid = "triggersDatagrid";
  static readonly KeyViewsDatagrid = "viewsDatagrid";
  static readonly KeyViewColumnssDatagrid = "viewColumnsDatagrid";

  editorApi!:AcDDEApi;
  notifyTimeout:any;

  private _dataDictionariesDatagrid:IAcDatagridState  = {};
  get dataDictionariesDatagrid():IAcDatagridState {
    return this._dataDictionariesDatagrid;
  }
  set dataDictionariesDatagrid(value:IAcDatagridState) {
    if(value != this._dataDictionariesDatagrid){
      this._dataDictionariesDatagrid = value;
      this.notifyChange(AcDDEState.KeyDataDictionariesDatagrid);
    }
  }

  private _extensionStates: Record<string,any> = {};
  get extensionStates(): Record<string,any> {
    return this._extensionStates;
  }
  set extensionStates(value:IAcDatagridState) {
    if(value != this._extensionStates){
      this._extensionStates = value;
      this.notifyChange(AcDDEState.KeyExtensionStates);
    }
  }

  private _functionsDatagrid:IAcDatagridState  = {};
  get functionsDatagrid():IAcDatagridState {
    return this._functionsDatagrid;
  }
  set functionsDatagrid(value:IAcDatagridState) {
    if(value != this._functionsDatagrid){
      this._functionsDatagrid = value;
      this.notifyChange(AcDDEState.KeyFunctionsDatagrid);
    }
  }

  private _relationshipsDatagrid:IAcDatagridState  = {};
  get relationshipsDatagrid():IAcDatagridState {
    return this._relationshipsDatagrid;
  }
  set relationshipsDatagrid(value:IAcDatagridState) {
    if(value != this._relationshipsDatagrid){
      this._relationshipsDatagrid = value;
      this.notifyChange(AcDDEState.KeyRelationshipsDatagrid);
    }
  }

  private _storedProceduresDatagrid:IAcDatagridState  = {};
  get storedProceduresDatagrid():IAcDatagridState {
    return this._storedProceduresDatagrid;
  }
  set storedProceduresDatagrid(value:IAcDatagridState) {
    if(value != this._storedProceduresDatagrid){
      this._storedProceduresDatagrid = value;
      this.notifyChange(AcDDEState.KeyStoredProceduresDatagrid);
    }
  }

  private _tableEditorState:IAcDDETableEditorState = {};
  get tableEditorState():IAcDDETableEditorState {
    return this._tableEditorState;
  }
  set tableEditorState(value:IAcDDETableEditorState) {
    if(value != this._tableEditorState){
      this._tableEditorState = value;
      this.notifyChange(AcDDEState.KeyTableEditorState);
    }
  }

  private _tablesDatagrid:IAcDatagridState  = {};
  get tablesDatagrid():IAcDatagridState {
    return this._tablesDatagrid;
  }
  set tablesDatagrid(value:IAcDatagridState) {
    if(value != this._tablesDatagrid){
      this._tablesDatagrid = value;
      this.notifyChange(AcDDEState.KeyTablesDatagrid);
    }
  }

  private _tableColumnsDatagrid:IAcDatagridState  = {};
  get tableColumnsDatagrid():IAcDatagridState {
    return this._tableColumnsDatagrid;
  }
  set tableColumnsDatagrid(value:IAcDatagridState) {
    if(value != this._tableColumnsDatagrid){
      this._tableColumnsDatagrid = value;
      this.notifyChange(AcDDEState.KeyTableColumnsDatagrid);
    }
  }

  private _triggersDatagrid:IAcDatagridState  = {};
  get triggersDatagrid():IAcDatagridState {
    return this._triggersDatagrid;
  }
  set triggersDatagrid(value:IAcDatagridState) {
    if(value != this._triggersDatagrid){
      this._triggersDatagrid = value;
      this.notifyChange(AcDDEState.KeyTriggersDatagrid);
    }
  }

  private _viewsDatagrid:IAcDatagridState  = {};
  get viewsDatagrid():IAcDatagridState {
    return this._viewsDatagrid;
  }
  set viewsDatagrid(value:IAcDatagridState) {
    if(value != this._viewsDatagrid){
      this._viewsDatagrid = value;
      this.notifyChange(AcDDEState.KeyViewsDatagrid);
    }
  }

  private _viewColumnsDatagrid:IAcDatagridState  = {};
  get viewColumnsDatagrid():IAcDatagridState {
    return this._viewColumnsDatagrid;
  }
  set viewColumnsDatagrid(value:IAcDatagridState) {
    if(value != this._viewColumnsDatagrid){
      this._viewColumnsDatagrid = value;
      this.notifyChange(AcDDEState.KeyViewColumnssDatagrid);
    }
  }

  private _viewEditorState:IAcDDEViewEditorState = {};
  get viewEditorState():IAcDDEViewEditorState {
    return this._viewEditorState;
  }
  set viewEditorState(value:IAcDDEViewEditorState) {
    if(value != this._viewEditorState){
      this._viewEditorState = value;
      this.notifyChange(AcDDEState.KeyViewEditorState);
    }
  }

  constructor({editorApi}:{editorApi:AcDDEApi}){
    this.editorApi = editorApi;
  }

  apply({state}:{state:IAcDDEState}){
    if(state){
      if(state[AcDDEState.KeyTableEditorState]){
        this.tableEditorState = state[AcDDEState.KeyTableEditorState]!;
      }
      if(state[AcDDEState.KeyDataDictionariesDatagrid]){
        this.dataDictionariesDatagrid = state[AcDDEState.KeyDataDictionariesDatagrid]!;
      }
      if(state[AcDDEState.KeyFunctionsDatagrid]){
        this.functionsDatagrid = state[AcDDEState.KeyFunctionsDatagrid]!;
      }
      if(state[AcDDEState.KeyRelationshipsDatagrid]){
        this.relationshipsDatagrid = state[AcDDEState.KeyRelationshipsDatagrid]!;
      }
      if(state[AcDDEState.KeyStoredProceduresDatagrid]){
        this.storedProceduresDatagrid = state[AcDDEState.KeyStoredProceduresDatagrid]!;
      }
      if(state[AcDDEState.KeyTablesDatagrid]){
        this.tablesDatagrid = state[AcDDEState.KeyTablesDatagrid]!;
      }
      if(state[AcDDEState.KeyTableColumnsDatagrid]){
        this.tableColumnsDatagrid = state[AcDDEState.KeyTableColumnsDatagrid]!;
      }
      if(state[AcDDEState.KeyTriggersDatagrid]){
        this.triggersDatagrid = state[AcDDEState.KeyTriggersDatagrid]!;
      }
      if(state[AcDDEState.KeyViewsDatagrid]){
        this.viewsDatagrid = state[AcDDEState.KeyViewsDatagrid]!;
      }
      if(state[AcDDEState.KeyViewColumnssDatagrid]){
        this.viewColumnsDatagrid = state[AcDDEState.KeyViewColumnssDatagrid]!;
      }
    }
  }

  notifyChange(source:string){
    if(this.notifyTimeout){
      clearTimeout(this.notifyTimeout);
    }
    this.notifyTimeout = setTimeout(() => {
      this.editorApi.eventHandler.handleStateChange();
    }, 500);
  }

  refresh(){
    this.setExtensionsState();
  }

  private setExtensionsState(){
    const extensions:any = {};
    for(const extensionName of Object.keys(this.editorApi.extensions)){
      const extensionInstance = this.editorApi.extensions[extensionName];
      const extensionState = extensionInstance.getState();
      if(extensionState != undefined){
        extensions[extensionName] = extensionState;
      }
    }
    this.extensionStates = extensions;
  }

  toJson(): IAcDDEState {
    return {
      dataDictionariesDatagrid:this.dataDictionariesDatagrid,
      tableEditorState:this.tableEditorState,
      extensionStates:this.extensionStates,
      functionsDatagrid:this.functionsDatagrid,
      relationshipsDatagrid:this.relationshipsDatagrid,
      storedProceduresDatagrid:this.storedProceduresDatagrid,
      tableColumnsDatagrid:this.tableColumnsDatagrid,
      tablesDatagrid:this.tablesDatagrid,
      triggersDatagrid:this.triggersDatagrid,
      viewColumnsDatagrid:this.viewColumnsDatagrid,
      viewsDatagrid:this.viewsDatagrid
    }
  }

  toString(){
    AcJsonUtils.prettyEncode(this.toJson());
  }

}
