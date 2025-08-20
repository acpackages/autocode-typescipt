/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcHooks, AcJsonUtils, Autocode } from "@autocode-ts/autocode";
import { AcDDEApi, AcEnumDDEEntity, boolColumnProperties, IAcDDEDataDictionaryRow, IAcDDEFunctionRow, IAcDDERelationshipRow, IAcDDEStoredProcedureRow, IAcDDETableColumnRow, IAcDDETableRow, IAcDDETriggerRow, IAcDDEViewColumnRow, IAcDDEViewRow } from "../_ac-data-dictionary-editor.export";
import { AcDDTableColumnProperty, AcDDTableProperty, AcEnumDDColumnProperty } from "@autocode-ts/ac-data-dictionary";
import { AcReactiveValueProxy } from "@autocode-ts/ac-template-engine";

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
  @AcBindJsonProperty({ skipInFromJson:true,skipInToJson:true })
  editorApi!: AcDDEApi;
  @AcBindJsonProperty({ skipInFromJson:true,skipInToJson:true })
  hooks:AcHooks = new AcHooks();

  private _dataDictionariesReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyDataDictionaries })
  private dataDictionaries: Record<string, IAcDDEDataDictionaryRow> = this._dataDictionariesReactiveProxy.valueProxy as any;

  private _functionsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyFunctions })
  private functions: Record<string, IAcDDEFunctionRow> = this._functionsReactiveProxy.valueProxy as any;

  private _relationshipsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyRelationships })
  private relationships: Record<string, IAcDDERelationshipRow> = this._relationshipsReactiveProxy.valueProxy as any;

  private _storedProceduresReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyStoredProcedures })
  private storedProcedures: Record<string, IAcDDEStoredProcedureRow> = this._storedProceduresReactiveProxy.valueProxy as any;

  private _tableColumnsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTableColumns })
  private tableColumns: Record<string, IAcDDETableColumnRow> = this._tableColumnsReactiveProxy.valueProxy as any;

  private _tablesReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTables })
  private tables: Record<string, IAcDDETableRow> = this._tablesReactiveProxy.valueProxy as any;

  private _triggersReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTriggers })
  private triggers: Record<string, IAcDDETriggerRow> = this._triggersReactiveProxy.valueProxy as any;

  private _viewColumnsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViewColumns })
  private viewColumns: Record<string, IAcDDEViewColumnRow> = this._viewColumnsReactiveProxy.valueProxy as any;

  private _viewsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViews })
  private views: Record<string, IAcDDEViewRow> = this._viewsReactiveProxy.valueProxy as any;

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

  getDataDictionaries({ dataDictionaryId, dataDictionaryName,filter }: { dataDictionaryId?: string, dataDictionaryName?: string,filter?:Function } = {}): IAcDDEDataDictionaryRow[] {
    let result: IAcDDEDataDictionaryRow[] = Object.values(this.dataDictionaries);
    if(dataDictionaryId || dataDictionaryName || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(dataDictionaryName && isValid){
          isValid = isValid && item.data_dictionary_name == dataDictionaryName;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getFunctions({ dataDictionaryId,functionId,filter }: { dataDictionaryId?: string,functionId?: string,filter?:Function } = {}): IAcDDEFunctionRow[] {
    let result: IAcDDEFunctionRow[] = Object.values(this.functions);
    if(dataDictionaryId || functionId || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(functionId && isValid){
          isValid = isValid && item.function_id == functionId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getRelationships({ dataDictionaryId,relationshipId,filter }: { dataDictionaryId?: string ,relationshipId?: string,filter?:Function } = {}): IAcDDERelationshipRow[] {
    let result: IAcDDERelationshipRow[] = Object.values(this.relationships);
    if(dataDictionaryId || relationshipId || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(relationshipId && isValid){
          isValid = isValid && item.relationship_id == relationshipId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getStoredProcedures({ dataDictionaryId, storedProcedureId,filter }: { dataDictionaryId?: string ,storedProcedureId?: string,filter?:Function } = {}): IAcDDEStoredProcedureRow[] {
    let result: IAcDDEStoredProcedureRow[] = Object.values(this.storedProcedures);
    if(dataDictionaryId || storedProcedureId || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(storedProcedureId && isValid){
          isValid = isValid && item.stored_procedure_id == storedProcedureId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getTables({ tableId, tableName, dataDictionaryId,filter }: { tableId?:string, tableName?: string, dataDictionaryId?: string,filter?:Function } = {}): IAcDDETableRow[] {
    let result: IAcDDETableRow[] = Object.values(this.tables);
    if(tableName || dataDictionaryId || tableId || filter){
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
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getTableColumns({ tableId, columnId ,columnName, dataDictionaryId,filter }: { tableId?: string, columnId?: string, columnName?: string, dataDictionaryId?: string,filter?:Function } = {}): IAcDDETableColumnRow[] {
    let result: IAcDDETableColumnRow[] = Object.values(this.tableColumns);
    if(tableId || columnName || dataDictionaryId || columnId || filter){
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
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getTriggers({ dataDictionaryId, triggerId,filter }: { dataDictionaryId?: string,triggerId?: string,filter?:Function } = {}): IAcDDETriggerRow[] {
    let result: IAcDDETriggerRow[] = Object.values(this.triggers);
    if(dataDictionaryId || triggerId || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(triggerId && isValid){
          isValid = isValid && item.trigger_id == triggerId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getViews({ dataDictionaryId,viewId,filter }: { dataDictionaryId?: string,viewId?:string,filter?:Function } = {}): IAcDDEViewRow[] {
    let result: IAcDDEViewRow[] = Object.values(this.views);
    if(dataDictionaryId || viewId || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.data_dictionary_id;
        }
        if(viewId && isValid){
          isValid = isValid && item.view_id == viewId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getViewColumns({ columnId,dataDictionaryId,viewId,filter }: { columnId?: string,dataDictionaryId?: string,viewId?:string,filter?:Function  } = {}): IAcDDEViewColumnRow[] {
    let result: IAcDDEViewColumnRow[] = Object.values(this.viewColumns);
    if(dataDictionaryId || viewId || filter){
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
        if(filter && isValid){
          isValid = filter(item);
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

  saveDataDictionary(data: Partial<IAcDDEDataDictionaryRow>): IAcDDEDataDictionaryRow {
    if(data.data_dictionary_id == undefined){
      data.data_dictionary_id = Autocode.uuid();
    }
    const row:any = data;
    this.dataDictionaries[data.data_dictionary_id] = row;
    return row;
  }

  saveFunction(data: Partial<IAcDDEFunctionRow>): IAcDDEFunctionRow {
    if(data.function_id == undefined){
      data.function_id = Autocode.uuid();
    }
    const row:any = data;
    this.functions[data.function_id] = row;
    return row;
  }

  saveRelationship(data: Partial<IAcDDERelationshipRow>): IAcDDERelationshipRow {
    if(data.relationship_id == undefined){
      data.relationship_id = Autocode.uuid();
    }
    const row:any = data;
    this.relationships[data.relationship_id] = row;
    return row;
  }

  saveStoredProcedure(data: Partial<IAcDDEStoredProcedureRow>): IAcDDEStoredProcedureRow {
    if(data.stored_procedure_id == undefined){
      data.stored_procedure_id = Autocode.uuid();
    }
    const row:any = data;
    this.storedProcedures[data.stored_procedure_id] = row;
    return row;
  }

  saveTableColumn(data: Partial<IAcDDETableColumnRow>): IAcDDETableColumnRow {
    if(data.column_id == undefined){
      data.column_id = Autocode.uuid();
    }
    const row:any = data;
    if (data.column_properties) {
      const properties = data.column_properties;
      for (const propertyKey of Object.keys(properties)) {
        row[propertyKey] = properties[propertyKey][AcDDTableColumnProperty.KeyPropertyValue];
      }
    }
    this.tableColumns[data.column_id] = row;
    return row;
  }

  saveTable(data: Partial<IAcDDETableRow>): IAcDDETableRow {
    if(data.table_id == undefined){
      data.table_id = Autocode.uuid();
    }
    const row:any = data;
    if (data.table_properties) {
      const properties = data.table_properties;
      for (const propertyKey of Object.keys(properties)) {
        row[propertyKey] = properties[propertyKey][AcDDTableProperty.KeyPropertyValue];
      }
    }
    this.tables[data.table_id] = row;
    return row;
  }

  saveTrigger(data: Partial<IAcDDETriggerRow>): IAcDDETriggerRow {
    if(data.trigger_id == undefined){
      data.trigger_id = Autocode.uuid();
    }
    const row:any = data;
    this.triggers[data.trigger_id] = row;
    return row;
  }

  saveViewColumn(data: Partial<IAcDDEViewColumnRow>): IAcDDEViewColumnRow {
    if(data.column_id == undefined){
      data.column_id = Autocode.uuid();
    }
    const row:any = data;
    this.viewColumns[data.column_id] = row;
    return row;
  }

  saveView(data: Partial<IAcDDEViewRow>): IAcDDEViewRow {
    if(data.view_id == undefined){
      data.view_id = Autocode.uuid();
    }
    const row:any = data;
    this.views[data.view_id] = row;
    return row;
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
}
