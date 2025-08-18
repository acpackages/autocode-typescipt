/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcHooks, AcJsonUtils, Autocode } from "@autocode-ts/autocode";
import { AcDDEApi, AcEnumDDEEntity, boolColumnProperties, IAcDDEDataDictionaryRow, IAcDDEFunctionRow, IAcDDERelationshipRow, IAcDDEStoredProcedureRow, IAcDDETableColumnRow, IAcDDETableRow, IAcDDETriggerRow, IAcDDEViewColumnRow, IAcDDEViewRow } from "../_ac-data-dictionary-editor.export";
import { AcDDTableColumnProperty, AcDDTableProperty, AcEnumDDColumnProperty } from "@autocode-ts/ac-data-dictionary";
import { AcReactiveValueProxy, IAcReactiveValueProxyEvent } from "@autocode-ts/ac-template-engine";

export class AcDDEDataStorage {
  static readonly KeyDataDictionaries = "data_dictionaries";
  static readonly KeyFunctions = "functions";
  static readonly KeyRelationships = "relationships";
  static readonly KeyStoredProcedures = "stored_procedures";
  static readonly KeyTableColumns = "table_columns";
  static readonly KeyTables = "tables";
  static readonly KeyTriggers = "triggers";
  static readonly KeyViewColumns = "columns";
  static readonly KeyViews = "views";
  editorApi!: AcDDEApi;
  hooks:AcHooks = new AcHooks();

  private _dataDictionariesReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyDataDictionaries })
  private dataDictionaries: Record<string, IAcDDEDataDictionaryRow> = this._dataDictionariesReactiveProxy.valueProxy;

  private _functionsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyFunctions })
  private functions: Record<string, IAcDDEFunctionRow> = this._functionsReactiveProxy.valueProxy;

  private _relationshipsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyRelationships })
  private relationships: Record<string, IAcDDERelationshipRow> = this._relationshipsReactiveProxy.valueProxy;

  private _storedProceduresReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyStoredProcedures })
  private storedProcedures: Record<string, IAcDDEStoredProcedureRow> = this._storedProceduresReactiveProxy.valueProxy;

  private _tableColumnsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTableColumns })
  private tableColumns: Record<string, IAcDDETableColumnRow> = this._tableColumnsReactiveProxy.valueProxy;

  private _tablesReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTables })
  private tables: Record<string, IAcDDETableRow> = this._tablesReactiveProxy.valueProxy;

  private _triggersReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTriggers })
  private triggers: Record<string, IAcDDETriggerRow> = this._triggersReactiveProxy.valueProxy;

  private _viewColumnsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViewColumns })
  private viewColumns: Record<string, IAcDDEViewColumnRow> = this._viewColumnsReactiveProxy.valueProxy;

  private _viewsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViews })
  private views: Record<string, IAcDDEViewRow> = this._viewsReactiveProxy.valueProxy;

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  addDataDictionary(data: Omit<IAcDDEDataDictionaryRow, 'data_dictionary_id'>): IAcDDEDataDictionaryRow {
    const row: IAcDDEDataDictionaryRow = { data_dictionary_id: Autocode.uuid(), ...data };
    this.dataDictionaries[row.data_dictionary_id] = row;
    return row;
  }

  addFunction(data: Omit<IAcDDEFunctionRow, 'function_id'>): IAcDDEFunctionRow {
    const row: IAcDDEFunctionRow = { function_id: Autocode.uuid(), ...data };
    this.functions[row.function_id] = row;
    return row;
  }

  addRelationship(data: Omit<IAcDDERelationshipRow, 'relationship_id'>): IAcDDERelationshipRow {
    const row: IAcDDERelationshipRow = { relationship_id: Autocode.uuid(), ...data };
    this.relationships[row.relationship_id] = row;
    return row;
  }

  addStoredProcedure(data: Omit<IAcDDEStoredProcedureRow, 'stored_procedure_id'>): IAcDDEStoredProcedureRow {
    const row: IAcDDEStoredProcedureRow = { stored_procedure_id: Autocode.uuid(), ...data };
    this.storedProcedures[row.stored_procedure_id] = row;
    return row;
  }

  addTableColumn(data: Omit<IAcDDETableColumnRow, 'column_id'>): IAcDDETableColumnRow {
    const rowData = data as IAcDDETableColumnRow;
    rowData.column_id = Autocode.uuid();
    const row: IAcDDETableColumnRow | any = rowData;
    this.tableColumns[row.column_id] = row;
    if (data.column_properties) {
      const properties = data.column_properties;
      for (const propertyKey of Object.keys(properties)) {
        row[propertyKey] = properties[propertyKey][AcDDTableColumnProperty.KeyPropertyValue];
      }
    }
    return row;
  }

  addTable(data: Omit<IAcDDETableRow, 'table_id'>): IAcDDETableRow {
    const row: IAcDDETableRow|any = { table_id: Autocode.uuid(), ...data };
    this.tables[row.table_id] = row;
    if (data.table_properties) {
      const properties = data.table_properties;
      for (const propertyKey of Object.keys(properties)) {
        row[propertyKey] = properties[propertyKey][AcDDTableProperty.KeyPropertyValue];
      }
    }
    return row;
  }

  addTrigger(data: Omit<IAcDDETriggerRow, 'trigger_id'>): IAcDDETriggerRow {
    const row: IAcDDETriggerRow = { trigger_id: Autocode.uuid(), ...data };
    this.triggers[row.trigger_id] = row;
    return row;
  }

  addViewColumn(data: Omit<IAcDDEViewColumnRow, 'column_id'>): IAcDDEViewColumnRow {
    const row: IAcDDEViewColumnRow = { column_id: Autocode.uuid(), ...data };
    this.viewColumns[row.column_id] = row;
    return row;
  }

  addView(data: Omit<IAcDDEViewRow, 'view_id'>): IAcDDEViewRow {
    const row: IAcDDEViewRow = { view_id: Autocode.uuid(), ...data };
    this.views[row.view_id] = row;
    return row;
  }

  deleteDataDictionary({ data_dictionary_id }: { data_dictionary_id: string }): IAcDDEDataDictionaryRow|undefined {
    const row = this.dataDictionaries[data_dictionary_id];
    delete this.dataDictionaries[data_dictionary_id];
    return row;
  }

  deleteFunction({ function_id }: { function_id: string }): IAcDDEFunctionRow|undefined {
    const row = this.functions[function_id];
    delete this.functions[function_id];
    return row;
  }

  deleteRelationship({ relationship_id }: { relationship_id: string }): IAcDDERelationshipRow|undefined {
    const row = this.relationships[relationship_id];
    delete this.relationships[relationship_id];
    return row;
  }

  deleteStoredProcedure({ stored_procedure_id }: { stored_procedure_id: string }): IAcDDEStoredProcedureRow|undefined {
    const row = this.storedProcedures[stored_procedure_id];
    delete this.storedProcedures[stored_procedure_id];
    return row;
  }

  deleteTableColumn({ column_id }: { column_id: string }): IAcDDETableColumnRow|undefined {
    if(this.tableColumns[column_id]){
      const row = this.tableColumns[column_id];
      delete this.tableColumns[column_id];
      return row;
    }
    return undefined;
  }

  deleteTable({ table_id }: { table_id: string }): IAcDDETableRow|undefined {
    if(this.tables[table_id]){
      const row = this.tables[table_id];
      delete this.tables[table_id];
      return row;
    }
  }

  deleteTrigger({ trigger_id }: { trigger_id: string }): IAcDDETriggerRow|undefined {
    const row = this.triggers[trigger_id];
    delete this.triggers[trigger_id];
    return row;
  }

  deleteViewColumn({ view_column_id }: { view_column_id: string }): IAcDDEViewColumnRow|undefined {
    const row = this.viewColumns[view_column_id];
    delete this.viewColumns[view_column_id];
    return row;
  }

  deleteView({ view_id }: { view_id: string }): IAcDDEViewRow|undefined {
    const row = this.views[view_id];
    delete this.views[view_id];
    return row;
  }

  getDataDictionaries({ dataDictionaryId }: { dataDictionaryId?: string } = {}): IAcDDEDataDictionaryRow[] {
    let result: IAcDDEDataDictionaryRow[] = Object.values(this.dataDictionaries);
    if(dataDictionaryId){
      result = result.filter((item) => { return item.data_dictionary_id == dataDictionaryId });
    }
    return result;
  }

  getFunctions({ dataDictionaryId,functionId }: { dataDictionaryId?: string,functionId?: string } = {}): IAcDDEFunctionRow[] {
    let result: IAcDDEFunctionRow[] = Object.values(this.functions);
    if(dataDictionaryId || functionId){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(functionId && isValid){
          isValid = isValid && item.function_id == functionId;
        }
        return isValid;
      });
    }
    return result;
  }

  getRelationships({ dataDictionaryId,relationshipId }: { dataDictionaryId?: string ,relationshipId?: string } = {}): IAcDDERelationshipRow[] {
    let result: IAcDDERelationshipRow[] = Object.values(this.relationships);
    if(dataDictionaryId || relationshipId){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(relationshipId && isValid){
          isValid = isValid && item.relationship_id == relationshipId;
        }
        return isValid;
      });
    }
    return result;
  }

  getStoredProcedures({ dataDictionaryId, storedProcedureId }: { dataDictionaryId?: string ,storedProcedureId?: string } = {}): IAcDDEStoredProcedureRow[] {
    let result: IAcDDEStoredProcedureRow[] = Object.values(this.storedProcedures);
    if(dataDictionaryId || storedProcedureId){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(storedProcedureId && isValid){
          isValid = isValid && item.stored_procedure_id == storedProcedureId;
        }
        return isValid;
      });
    }
    return result;
  }

  getTables({ tableId, tableName, dataDictionaryId }: { tableId?:string, tableName?: string, dataDictionaryId?: string } = {}): IAcDDETableRow[] {
    let result: IAcDDETableRow[] = Object.values(this.tables);
    if(tableName || dataDictionaryId || tableId){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(tableName && isValid){
          isValid = isValid && item.table_name == tableName;
        }
        if(tableId && isValid){
          isValid = isValid && item.table_id == tableId;
        }
        return isValid;
      });
    }
    return result;
  }

  getTableColumns({ tableId, columnId ,columnName, dataDictionaryId }: { tableId?: string, columnId?: string, columnName?: string, dataDictionaryId?: string } = {}): IAcDDETableColumnRow[] {
    let result: IAcDDETableColumnRow[] = Object.values(this.tableColumns);
    if(tableId || columnName || dataDictionaryId || columnId){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(tableId && isValid){
          isValid = isValid && item.table_id == tableId;
        }
        if(columnName && isValid){
          isValid = isValid && item.column_name == columnName;
        }
        if(columnId && isValid){
          isValid = isValid && item.column_id == columnId;
        }
        return isValid;
      });
    }
    return result;
  }

  getTriggers({ dataDictionaryId, triggerId }: { dataDictionaryId?: string,triggerId?: string } = {}): IAcDDETriggerRow[] {
    let result: IAcDDETriggerRow[] = Object.values(this.triggers);
    if(dataDictionaryId || triggerId){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(triggerId && isValid){
          isValid = isValid && item.trigger_id == triggerId;
        }
        return isValid;
      });
    }
    return result;
  }

  getViews({ dataDictionaryId,viewId }: { dataDictionaryId?: string,viewId?:string } = {}): IAcDDEViewRow[] {
    let result: IAcDDEViewRow[] = Object.values(this.views);
    if(dataDictionaryId || viewId){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(viewId && isValid){
          isValid = isValid && item.view_id == viewId;
        }
        return isValid;
      });
    }
    return result;
  }

  getViewColumns({ columnId,dataDictionaryId,viewId }: { columnId?: string,dataDictionaryId?: string,viewId?:string  } = {}): IAcDDEViewColumnRow[] {
    let result: IAcDDEViewColumnRow[] = Object.values(this.viewColumns);
    if(dataDictionaryId || viewId){
      result = result.filter((item) => {
         let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(viewId && isValid){
          isValid = isValid && item.view_id == viewId;
        }
        if(columnId && isValid){
          isValid = isValid && item.column_id == columnId;
        }
        return isValid;
      });
    }
    return result;
  }

  hasDataDictionaryWithId(dataDictionaryId:string): boolean {
    return this.dataDictionaries[dataDictionaryId] != undefined;
  }

  hasFunctionWithId(functionId:string): boolean {
    return this.functions[functionId] != undefined;
  }

  hasRelationshipWidthId(relationshipId:string): boolean {
    return this.relationships[relationshipId] != undefined;
  }

  hasStoredProcedureWithId(storedProcedureId:string): boolean {
    return this.storedProcedures[storedProcedureId] != undefined;
  }

  hasTableWithId(tableId:string): boolean {
    return this.tables[tableId] != undefined;
  }

  hasTableColumnWithId(tableColumnId:string): boolean {
    return this.tableColumns[tableColumnId] != undefined;
  }

  hasTriggerWithId(triggerId:string): boolean {
    return this.triggers[triggerId] != undefined;
  }

  hasViewWithId(viewId:string): boolean {
    return this.views[viewId] != undefined;
  }

  hasViewColumnWithId(viewColumnId:string): boolean {
    return this.viewColumns[viewColumnId] != undefined;
  }

  on(event: 'add' | 'delete' | 'update' | 'change', entity: AcEnumDDEEntity, callback: Function): string {
    let proxy: AcReactiveValueProxy | undefined;
    switch (entity) {
      case AcEnumDDEEntity.DataDictionary:
        proxy = this._dataDictionariesReactiveProxy;
        break;
      case AcEnumDDEEntity.Function:
        proxy = this._functionsReactiveProxy;
        break;
      case AcEnumDDEEntity.Relationship:
        proxy = this._relationshipsReactiveProxy;
        break;
      case AcEnumDDEEntity.StoredProcedure:
        proxy = this._storedProceduresReactiveProxy;
        break;
      case AcEnumDDEEntity.Table:
        proxy = this._tablesReactiveProxy;
        break;
      case AcEnumDDEEntity.TableColumn:
        proxy = this._tableColumnsReactiveProxy;
        break;
      case AcEnumDDEEntity.Trigger:
        proxy = this._triggersReactiveProxy;
        break;
      case AcEnumDDEEntity.View:
        proxy = this._viewsReactiveProxy;
        break;
      case AcEnumDDEEntity.ViewColumn:
        proxy = this._viewColumnsReactiveProxy;
        break;
    }
    return proxy.on(event, callback);
  }

  setTableColumnProperties(column:IAcDDETableColumnRow){
    const properties:any = {};
    const columnRow:any =column;
    const setProperty:Function = (propertyName:any)=>{
      let propertyValue = columnRow[propertyName]
      if(propertyValue != undefined){
        let validPropertyValue = true;
        if(boolColumnProperties.includes(propertyName) && propertyValue!=true){
          validPropertyValue = false;
        }
        if(validPropertyValue){
          properties[propertyName] = {
            [AcDDTableColumnProperty.KeyPropertyName]: propertyName,
            [AcDDTableColumnProperty.KeyPropertyValue]: columnRow[propertyName]
          };
        }
      }
    };
    for(const propertyName of Object.values(AcEnumDDColumnProperty)){
      setProperty(propertyName);
    }
    column.column_properties = properties;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
