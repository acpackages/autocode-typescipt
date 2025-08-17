/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils, Autocode } from "@autocode-ts/autocode";
import { AcDDEApi, IAcDDEDataDictionaryRow, IAcDDEFunctionRow, IAcDDERelationshipRow, IAcDDEStoredProcedureRow, IAcDDETableColumnRow, IAcDDETableRow, IAcDDETriggerRow, IAcDDEViewColumnRow, IAcDDEViewRow } from "../_ac-data-dictionary-editor.export";
import { AcDDTableColumnProperty } from "@autocode-ts/ac-data-dictionary";

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
  editorApi!:AcDDEApi;

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyDataDictionaries })
  dataDictionaries: Record<string,IAcDDEDataDictionaryRow> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyFunctions })
  functions: Record<string,IAcDDEFunctionRow> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyRelationships })
  relationships: Record<string,IAcDDERelationshipRow> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyStoredProcedures })
  storedProcedures: Record<string,IAcDDEStoredProcedureRow> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTableColumns })
  tableColumns: Record<string,IAcDDETableColumnRow> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTables })
  tables: Record<string,IAcDDETableRow> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTriggers })
  triggers: Record<string,IAcDDETriggerRow> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViewColumns })
  viewColumns: Record<string,IAcDDEViewColumnRow> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViews })
  views: Record<string,IAcDDEViewRow> = {};

  constructor({editorApi}:{editorApi:AcDDEApi}){
    this.editorApi = editorApi;
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  addDataDictionary(data: Omit<IAcDDEDataDictionaryRow, 'data_dictionary_id'>): IAcDDEDataDictionaryRow {
    const row: IAcDDEDataDictionaryRow = { data_dictionary_id: Autocode.uuid(), ...data };
    this.dataDictionaries[row.data_dictionary_id!]=row;
    return this.dataDictionaries[row.data_dictionary_id!];
  }

  addFunction(data: Omit<IAcDDEFunctionRow, 'function_id'>): IAcDDEFunctionRow {
    const row: IAcDDEFunctionRow = { function_id: Autocode.uuid(), ...data };
    this.functions[row.function_id!]=row;
    return row;
  }

  addRelationship(data: Omit<IAcDDERelationshipRow, 'relationship_id'>): IAcDDERelationshipRow {
    const row: IAcDDERelationshipRow = { relationship_id: Autocode.uuid(), ...data };
    this.relationships[row.relationship_id!] = row;
    return row;
  }

  addStoredProcedure(data: Omit<IAcDDEStoredProcedureRow, 'stored_procedure_id'>): IAcDDEStoredProcedureRow {
    const row: IAcDDEStoredProcedureRow = { stored_procedure_id: Autocode.uuid(), ...data };
    this.storedProcedures[row.stored_procedure_id!] = row;
    return row;
  }

  addTableColumn(data: Omit<IAcDDETableColumnRow, 'column_id'>): IAcDDETableColumnRow {
    const row: IAcDDETableColumnRow|any = { column_id: Autocode.uuid(), ...data };
    this.tableColumns[row.column_id] = row;
    if(data.column_properties){
      const properties = data.column_properties;
      for(const propertyKey of Object.keys(properties)){
        row[propertyKey] = properties[propertyKey][AcDDTableColumnProperty.KeyPropertyValue];
      }
    }
    return row;
  }

  addTable(data: Omit<IAcDDETableRow, 'table_id'>): IAcDDETableRow {
    const row: IAcDDETableRow = { table_id: Autocode.uuid(), ...data };
    this.tables[row.table_id!] = row;
    return row;
  }

  addTrigger(data: Omit<IAcDDETriggerRow, 'trigger_id'>): IAcDDETriggerRow {
    const row: IAcDDETriggerRow = { trigger_id: Autocode.uuid(), ...data };
    this.triggers[row.trigger_id!] = row;
    return row;
  }

  addViewColumn(data: Omit<IAcDDEViewColumnRow, 'column_id'>): IAcDDEViewColumnRow {
    const row: IAcDDEViewColumnRow = { column_id: Autocode.uuid(), ...data };
    this.viewColumns[row.column_id!] = row;
    return row;
  }

  addView(data: Omit<IAcDDEViewRow, 'view_id'>): IAcDDEViewRow {
    const row: IAcDDEViewRow = { view_id: Autocode.uuid(), ...data };
    this.views[row.view_id!] = row;
    return row;
  }

  deleteDataDictionary({data_dictionary_id}: {data_dictionary_id:string}): IAcDDEDataDictionaryRow {
     const row = this.dataDictionaries[data_dictionary_id];
    delete this.dataDictionaries[data_dictionary_id];
    return row;
  }

  deleteFunction({function_id}: {function_id:string}): IAcDDEFunctionRow {
    const row = this.functions[function_id];
    delete this.functions[function_id];
    return row;
  }

  deleteRelationship({relationship_id}: {relationship_id:string}): IAcDDERelationshipRow {
     const row = this.relationships[relationship_id];
    delete this.relationships[relationship_id];
    return row;
  }

  deleteStoredProcedure({stored_procedure_id}: {stored_procedure_id:string}): IAcDDEStoredProcedureRow {
     const row = this.storedProcedures[stored_procedure_id];
    delete this.storedProcedures[stored_procedure_id];
    return row;
  }

  deleteTableColumn({column_id}: {column_id:string}): IAcDDETableColumnRow {
    const row = this.tableColumns[column_id];
    delete this.tableColumns[column_id];
    return row;
  }

  deleteTable({table_id}: {table_id:string}): IAcDDETableRow {
     const row = this.tables[table_id];
    delete this.tables[table_id];
    return row;
  }

  deleteTrigger({trigger_id}: {trigger_id:string}): IAcDDETriggerRow {
     const row = this.triggers[trigger_id];
    delete this.triggers[trigger_id];
    return row;
  }

  deleteViewColumn({view_column_id}: {view_column_id:string}): IAcDDEViewColumnRow {
     const row = this.viewColumns[view_column_id];
    delete this.viewColumns[view_column_id];
    return row;
  }

  deleteView({view_id}: {view_id:string}): IAcDDEViewRow {
     const row = this.views[view_id];
    delete this.views[view_id];
    return row;
  }

  getTable({tableName,dataDictionaryId}:{tableName:string,dataDictionaryId:string}):IAcDDETableRow | undefined{
    let result:IAcDDETableRow|undefined;
    result = Object.values(this.tables).find((item)=>{return item.data_dictionary_id == dataDictionaryId && item.table_name == tableName});
    return result;
  }

  getTableColumn({tableId,columnName,dataDictionaryId}:{tableId:string,columnName:string,dataDictionaryId:string}):IAcDDETableColumnRow | undefined{
    let result:IAcDDETableColumnRow|undefined;
    result = Object.values(this.tableColumns).find((item)=>{return item.data_dictionary_id == dataDictionaryId && item.column_name == columnName && item.table_id == tableId});
    return result;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
