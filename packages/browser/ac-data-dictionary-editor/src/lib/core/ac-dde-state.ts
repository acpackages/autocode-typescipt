/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcJsonUtils } from "@autocode-ts/autocode";
import { AcDDEApi } from "../_ac-data-dictionary-editor.export";
import { IAcDatagridState } from "@autocode-ts/ac-browser";
import { IAcDDEDatagridEditorState } from "../interfaces/ac-dde-datagrid-editor-state.interface";
import { IAcDDEState } from "../interfaces/ac-dde-state.interface";

export class AcDDEState {
  static readonly KeyDatagridEditorState = "datagrid_editor_state";
  static readonly KeyDataDictionariesDatagrid = "data_dictionaries_datagrid";
  static readonly KeyExtensionStates = "extension_states";
  static readonly KeyFunctionsDatagrid = "functions_datagrid";
  static readonly KeyRelationshipsDatagrid = "relationships_datagrid";
  static readonly KeyStoredProceduresDatagrid = "stored_procedures_datagrid";
  static readonly KeyTablesDatagrid = "tables_datagrid";
  static readonly KeyTablesColumnsDatagrid = "table_columns_datagrid";
  static readonly KeyTriggersDatagrid = "triggers_datagrid";
  static readonly KeyViewsDatagrid = "views_datagrid";
  static readonly KeyViewColumnssDatagrid = "view_columns_datagrid";

  editorApi!:AcDDEApi;
  notifyTimeout:any;

  private _datagridEditorState:IAcDDEDatagridEditorState = {};
  get datagridEditorState():IAcDDEDatagridEditorState {
    return this._datagridEditorState;
  }
  set datagridEditorState(value:IAcDDEDatagridEditorState) {
    console.log(value,this.datagridEditorState)
    if(value != this._datagridEditorState){
      this._datagridEditorState = value;
      this.notifyChange(AcDDEState.KeyDatagridEditorState);
    }
  }

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
      this.notifyChange(AcDDEState.KeyTablesColumnsDatagrid);
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

  constructor({editorApi}:{editorApi:AcDDEApi}){
    this.editorApi = editorApi;
  }

  apply(state:IAcDDEState){
    if(state){
      if(state[AcDDEState.KeyDatagridEditorState]){
        this.datagridEditorState = state[AcDDEState.KeyDatagridEditorState]!;
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
      if(state[AcDDEState.KeyTablesColumnsDatagrid]){
        this.tableColumnsDatagrid = state[AcDDEState.KeyTablesColumnsDatagrid]!;
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
      data_dictionaries_datagrid:this.dataDictionariesDatagrid,
      datagrid_editor_state:this.datagridEditorState,
      extension_states:this.extensionStates,
      functions_datagrid:this.functionsDatagrid,
      relationships_datagrid:this.relationshipsDatagrid,
      stored_procedures_datagrid:this.storedProceduresDatagrid,
      table_columns_datagrid:this.tableColumnsDatagrid,
      tables_datagrid:this.tablesDatagrid,
      triggers_datagrid:this.triggersDatagrid,
      view_columns_datagrid:this.viewColumnsDatagrid,
      views_datagrid:this.viewsDatagrid
    }
  }

  toString(){
    AcJsonUtils.prettyEncode(this.toJson());
  }

}
