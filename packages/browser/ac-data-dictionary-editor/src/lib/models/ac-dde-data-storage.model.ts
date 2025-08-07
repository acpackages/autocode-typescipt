/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils, Autocode } from "@autocode-ts/autocode";
import { IAcDDEDataDictionaryRow, IAcDDEFunctionRow, IAcDDERelationshipRow, IAcDDEStoredProcedureRow, IAcDDETableColumnRow, IAcDDETableRow, IAcDDETriggerRow, IAcDDEViewColumnRow, IAcDDEViewRow } from "../_ac-data-dictionary-editor.export";
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

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyDataDictionaries })
  dataDictionaries: IAcDDEDataDictionaryRow[] = [];

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyFunctions })
  functions: IAcDDEFunctionRow[] = [];

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyRelationships })
  relationships: IAcDDERelationshipRow[] = [];

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyStoredProcedures })
  storedProcedures: IAcDDEStoredProcedureRow[] = [];

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTableColumns })
  tableColumns: IAcDDETableColumnRow[] = [];

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTables })
  tables: IAcDDETableRow[] = [];

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTriggers })
  triggers: IAcDDETriggerRow[] = [];

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViewColumns })
  viewColumns: IAcDDEViewColumnRow[] = [];

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViews })
  views: IAcDDEViewRow[] = [];

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  addDataDictionary(data: Omit<IAcDDEDataDictionaryRow, 'data_dictionary_id'>): string {
    const row: IAcDDEDataDictionaryRow = { data_dictionary_id: Autocode.uuid(), ...data };
    this.dataDictionaries.push(row);
    return row.data_dictionary_id;
  }

  addFunction(data: Omit<IAcDDEFunctionRow, 'function_id'>): string {
    const row: IAcDDEFunctionRow = { function_id: Autocode.uuid(), ...data };
    this.functions.push(row);
    return row.function_id;
  }

  addRelationship(data: Omit<IAcDDERelationshipRow, 'relationship_id'>): string {
    const row: IAcDDERelationshipRow = { relationship_id: Autocode.uuid(), ...data };
    this.relationships.push(row);
    return row.relationship_id;
  }

  addStoredProcedure(data: Omit<IAcDDEStoredProcedureRow, 'stored_procedure_id'>): string {
    const row: IAcDDEStoredProcedureRow = { stored_procedure_id: Autocode.uuid(), ...data };
    this.storedProcedures.push(row);
    return row.stored_procedure_id;
  }

  addTableColumn(data: Omit<IAcDDETableColumnRow, 'column_id'>): string {
    const row: IAcDDETableColumnRow|any = { column_id: Autocode.uuid(), ...data };
    this.tableColumns.push(row);
    if(data.column_properties){
      const properties = data.column_properties;
      for(const propertyKey of Object.keys(properties)){
        row[propertyKey] = properties[propertyKey][AcDDTableColumnProperty.KeyPropertyValue];
      }
    }
    return row.column_id;
  }

  addTable(data: Omit<IAcDDETableRow, 'table_id'>): string {
    const row: IAcDDETableRow = { table_id: Autocode.uuid(), ...data };
    this.tables.push(row);
    return row.table_id;
  }

  addTrigger(data: Omit<IAcDDETriggerRow, 'trigger_id'>): string {
    const row: IAcDDETriggerRow = { trigger_id: Autocode.uuid(), ...data };
    this.triggers.push(row);
    return row.trigger_id;
  }

  addViewColumn(data: Omit<IAcDDEViewColumnRow, 'column_id'>): string {
    const row: IAcDDEViewColumnRow = { column_id: Autocode.uuid(), ...data };
    this.viewColumns.push(row);
    return row.column_id;
  }

  addView(data: Omit<IAcDDEViewRow, 'view_id'>): string {
    const row: IAcDDEViewRow = { view_id: Autocode.uuid(), ...data };
    this.views.push(row);
    return row.view_id;
  }

  getTable({tableName,dataDictionaryId}:{tableName:string,dataDictionaryId:string}):IAcDDETableRow | undefined{
    let result:IAcDDETableRow|undefined;
    result = this.tables.find((item)=>{return item.data_dictionary_id == dataDictionaryId && item.table_name == tableName});
    return result;
  }

  getTableColumn({tableId,columnName,dataDictionaryId}:{tableId:string,columnName:string,dataDictionaryId:string}):IAcDDETableColumnRow | undefined{
    let result:IAcDDETableColumnRow|undefined;
    result = this.tableColumns.find((item)=>{return item.data_dictionary_id == dataDictionaryId && item.column_name == columnName && item.table_id == tableId});
    return result;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}

export const acDDEDataStorage = new AcDDEDataStorage();
