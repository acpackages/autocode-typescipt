/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcEnumDDColumnRelationType } from "../enums/ac-enum-dd-column-relation-type.enum";
import { AcDDFunction } from "./ac-dd-function.model";
import { AcDDRelationship } from "./ac-dd-relationship.model";
import { AcDDStoredProcedure } from "./ac-dd-stored-procedure.model";
import { AcDDTableColumn } from "./ac-dd-table-column.model";
import { AcDDTable } from "./ac-dd-table.model";
import { AcDDTrigger } from "./ac-dd-trigger.model";
import { AcDDView } from "./ac-dd-view.model";
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-typescript/autocode";

export class AcDataDictionary {
  static readonly KEY_DATA_DICTIONARIES = "data_dictionaries";
  static readonly KEY_FUNCTIONS = "functions";
  static readonly KEY_RELATIONSHIPS = "relationships";
  static readonly KEY_STORED_PROCEDURES = "stored_procedures";
  static readonly KEY_TABLES = "tables";
  static readonly KEY_TRIGGERS = "triggers";
  static readonly KEY_VERSION = "version";
  static readonly KEY_VIEWS = "views";

  @AcBindJsonProperty({ key: AcDataDictionary.KEY_DATA_DICTIONARIES })
  static dataDictionaries: Record<string, any> = {};

  functions: Record<string, any> = {};
  relationships: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcDataDictionary.KEY_STORED_PROCEDURES })
  storedProcedures: Record<string, any> = {};

  tables: Record<string, any> = {};
  triggers: Record<string, any> = {};
  version = 0;
  views: Record<string, any> = {};

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDataDictionary {
    return new AcDataDictionary().fromJson({ jsonData });
  }

  static fromJsonString({ jsonString }: { jsonString: string }): AcDataDictionary {
    const jsonData = JSON.parse(jsonString);
    return new AcDataDictionary().fromJson({ jsonData });
  }

  static getFunctions({ dataDictionaryName = "default" }:{dataDictionaryName?:string} = {}): Record<string, AcDDFunction> {
    const result: Record<string, AcDDFunction> = {};
    const acDataDictionary = this.getInstance({ dataDictionaryName });
    for (const [functionName, functionData] of Object.entries(acDataDictionary.functions)) {
      result[functionName] = AcDDFunction.instanceFromJson({ jsonData: functionData });
    }
    return result;
  }

  static getFunction({ functionName, dataDictionaryName = "default" }: {
    functionName: string,
    dataDictionaryName?: string
  }): AcDDFunction | null {
    const acDataDictionary = this.getInstance({ dataDictionaryName });
    if (functionName in acDataDictionary.functions) {
      return AcDDFunction.instanceFromJson({
        jsonData: acDataDictionary.functions[functionName]
      });
    }
    return null;
  }

  static getInstance({ dataDictionaryName = "default" }:{dataDictionaryName?:string} = {}): AcDataDictionary {
    const instance = new AcDataDictionary();
    if (this.dataDictionaries[dataDictionaryName]) {
      instance.fromJson({ jsonData: this.dataDictionaries[dataDictionaryName] });
    }
    return instance;
  }

  static getRelationships({ dataDictionaryName = "default" }:{dataDictionaryName?:string} = {}): AcDDRelationship[] {
    const result: AcDDRelationship[] = [];
    const acDataDictionary = this.getInstance({ dataDictionaryName });

    Object.values(acDataDictionary.relationships).forEach(destinationTableDetails =>
      Object.values(destinationTableDetails).forEach((destinationColumnDetails:any) =>
        Object.values(destinationColumnDetails).forEach((sourceTableDetails:any) =>
          Object.values(sourceTableDetails).forEach(relationshipDetails => {
            result.push(AcDDRelationship.instanceFromJson({ jsonData: relationshipDetails }));
          })
        )
      )
    );

    return result;
  }

  static getStoredProcedures({ dataDictionaryName = "default" }:{dataDictionaryName?:string} = {}): Record<string, AcDDStoredProcedure> {
    const result: Record<string, AcDDStoredProcedure> = {};
    const acDataDictionary = this.getInstance({ dataDictionaryName });

    for (const [name, data] of Object.entries(acDataDictionary.storedProcedures)) {
      result[name] = AcDDStoredProcedure.instanceFromJson({ jsonData: data });
    }
    return result;
  }

  static getStoredProcedure({ storedProcedureName, dataDictionaryName = "default" }: {
    storedProcedureName: string,
    dataDictionaryName?: string
  }): AcDDStoredProcedure | null {
    const acDataDictionary = this.getInstance({ dataDictionaryName });
    if (storedProcedureName in acDataDictionary.storedProcedures) {
      return AcDDStoredProcedure.instanceFromJson({
        jsonData: acDataDictionary.storedProcedures[storedProcedureName]
      });
    }
    return null;
  }

  static getTable({ tableName, dataDictionaryName = "default" }: {
    tableName: string,
    dataDictionaryName?: string
  }): AcDDTable | null {
    const acDataDictionary = this.getInstance({ dataDictionaryName });
    if (tableName in acDataDictionary.tables) {
      return AcDDTable.instanceFromJson({ jsonData: acDataDictionary.tables[tableName] });
    }
    return null;
  }

  static getTableColumn({ tableName, columnName, dataDictionaryName = "default" }: {
    tableName: string,
    columnName: string,
    dataDictionaryName?: string
  }): AcDDTableColumn | null {
    const acDataDictionary = this.getInstance({ dataDictionaryName });
    if (tableName in acDataDictionary.tables) {
      const table = AcDDTable.instanceFromJson({ jsonData: acDataDictionary.tables[tableName] });
      return table.getColumn({columnName})!;
    }
    return null;
  }

  static getTableColumnRelationships({
    tableName,
    columnName,
    relationType = AcEnumDDColumnRelationType.ANY,
    dataDictionaryName = "default",
  }: {
    tableName: string,
    columnName: string,
    relationType?: string,
    dataDictionaryName?: string,
  }): AcDDRelationship[] {
    const result: AcDDRelationship[] = [];
    const acDataDictionary = this.getInstance({ dataDictionaryName });

    Object.values(acDataDictionary.relationships).forEach(destinationTableDetails =>
      Object.values(destinationTableDetails).forEach((destinationColumnDetails:any) =>
        Object.values(destinationColumnDetails).forEach((sourceTableDetails:any) =>
          Object.values(sourceTableDetails).forEach(relationshipDetails => {
            const r:any = relationshipDetails;
            const include =
              (relationType === AcEnumDDColumnRelationType.ANY &&
                ((tableName === r[AcDDRelationship.KEY_DESTINATION_TABLE] &&
                  columnName === r[AcDDRelationship.KEY_DESTINATION_COLUMN]) ||
                  (tableName === r[AcDDRelationship.KEY_SOURCE_TABLE] &&
                    columnName === r[AcDDRelationship.KEY_SOURCE_COLUMN]))) ||
              (relationType === AcEnumDDColumnRelationType.SOURCE &&
                tableName === r[AcDDRelationship.KEY_SOURCE_TABLE] &&
                columnName === r[AcDDRelationship.KEY_SOURCE_COLUMN]) ||
              (relationType === AcEnumDDColumnRelationType.DESTINATION &&
                tableName === r[AcDDRelationship.KEY_DESTINATION_TABLE] &&
                columnName === r[AcDDRelationship.KEY_DESTINATION_COLUMN]);
            if (include) {
              result.push(AcDDRelationship.instanceFromJson({ jsonData: r }));
            }
          })
        )
      )
    );

    return result;
  }

  static getTableRelationships({
    tableName,
    relationType = AcEnumDDColumnRelationType.ANY,
    dataDictionaryName = "default",
  }: {
    tableName: string,
    relationType?: string,
    dataDictionaryName?: string,
  }): AcDDRelationship[] {
    const result: AcDDRelationship[] = [];
    const acDataDictionary = this.getInstance({ dataDictionaryName });

    Object.values(acDataDictionary.relationships).forEach(destinationTableDetails =>
      Object.values(destinationTableDetails).forEach((destinationColumnDetails:any) =>
        Object.values(destinationColumnDetails).forEach((sourceTableDetails:any) =>
          Object.values(sourceTableDetails).forEach(relationshipDetails => {
            const r:any = relationshipDetails;
            const include =
              (relationType === AcEnumDDColumnRelationType.ANY &&
                (tableName === r[AcDDRelationship.KEY_DESTINATION_TABLE] ||
                  tableName === r[AcDDRelationship.KEY_SOURCE_TABLE])) ||
              (relationType === AcEnumDDColumnRelationType.SOURCE &&
                tableName === r[AcDDRelationship.KEY_SOURCE_TABLE]) ||
              (relationType === AcEnumDDColumnRelationType.DESTINATION &&
                tableName === r[AcDDRelationship.KEY_DESTINATION_TABLE]);
            if (include) {
              result.push(AcDDRelationship.instanceFromJson({ jsonData: r }));
            }
          })
        )
      )
    );

    return result;
  }

  static getTables({ dataDictionaryName = "default" }:{dataDictionaryName?:string} = {}): Record<string, AcDDTable> {
    const result: Record<string, AcDDTable> = {};
    const acDataDictionary = this.getInstance({ dataDictionaryName });

    for (const [name, data] of Object.entries(acDataDictionary.tables)) {
      result[name] = AcDDTable.instanceFromJson({ jsonData: data });
    }
    return result;
  }

  static getTriggers({ dataDictionaryName = "default" }:{dataDictionaryName?:string} = {}): Record<string, AcDDTrigger> {
    const result: Record<string, AcDDTrigger> = {};
    const acDataDictionary = this.getInstance({ dataDictionaryName });

    for (const [name, data] of Object.entries(acDataDictionary.triggers)) {
      result[name] = AcDDTrigger.instanceFromJson({ jsonData: data });
    }
    return result;
  }

  static getTrigger({ triggerName, dataDictionaryName = "default" }: {
    triggerName: string,
    dataDictionaryName?: string
  }): AcDDTrigger | null {
    const acDataDictionary = this.getInstance({ dataDictionaryName });
    if (triggerName in acDataDictionary.triggers) {
      return AcDDTrigger.instanceFromJson({ jsonData: acDataDictionary.triggers[triggerName] });
    }
    return null;
  }

  static getViews({ dataDictionaryName = "default" }:{dataDictionaryName?:string} = {}): Record<string, AcDDView> {
    const result: Record<string, AcDDView> = {};
    const acDataDictionary = this.getInstance({ dataDictionaryName });

    for (const [name, data] of Object.entries(acDataDictionary.views)) {
      result[name] = AcDDView.instanceFromJson({ jsonData: data });
    }
    return result;
  }

  static getView({ viewName, dataDictionaryName = "default" }: {
    viewName: string,
    dataDictionaryName?: string
  }): AcDDView | null {
    const acDataDictionary = this.getInstance({ dataDictionaryName });
    if (viewName in acDataDictionary.views) {
      return AcDDView.instanceFromJson({ jsonData: acDataDictionary.views[viewName] });
    }
    return null;
  }

  static registerDataDictionary({ jsonData, dataDictionaryName = "default" }: {
    jsonData: Record<string, any>,
    dataDictionaryName?: string
  }): void {
    this.dataDictionaries[dataDictionaryName] = jsonData;
  }

  static registerDataDictionaryJsonString({ jsonString, dataDictionaryName = "default" }: {
    jsonString: string,
    dataDictionaryName?: string
  }): void {
    const jsonData = JSON.parse(jsonString);
    this.registerDataDictionary({ jsonData, dataDictionaryName });
  }

  fromJson({ jsonData }: { jsonData: any }): AcDataDictionary {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  getTableNames(): string[] {
    return Object.keys(this.tables);
  }

  getTablesList(): any[] {
    return Object.values(this.tables);
  }

  getTableColumnNames({ tableName }: { tableName: string }): string[] {
    const result: string[] = [];
    if (tableName in this.tables) {
      const tableDetails = this.tables[tableName];
      const tableColumns = tableDetails[AcDDTable.KEY_TABLE_COLUMNS];
      if (tableColumns) result.push(...Object.keys(tableColumns));
    }
    return result;
  }

  getTableColumnsList({ tableName }: { tableName: string }): any[] {
    if (tableName in this.tables && typeof this.tables[tableName][AcDDTable.KEY_TABLE_COLUMNS] === 'object') {
      return Object.values(this.tables[tableName][AcDDTable.KEY_TABLE_COLUMNS]);
    }
    return [];
  }

  getTableRelationshipsList({ tableName, asDestination = true }: {
    tableName: string,
    asDestination?: boolean
  }): any[] {
    const result: any[] = [];
    const columnKey = asDestination
      ? AcDDRelationship.KEY_DESTINATION_TABLE
      : AcDDRelationship.KEY_SOURCE_TABLE;

    Object.values(this.relationships).forEach(destinationTableDetails =>
      Object.values(destinationTableDetails).forEach((destinationColumnDetails:any) =>
        Object.values(destinationColumnDetails).forEach((sourceTableDetails:any) =>
          Object.values(sourceTableDetails).forEach((relationshipDetails:any) => {
            if (relationshipDetails[columnKey] === tableName) {
              result.push(relationshipDetails);
            }
          })
        )
      )
    );

    return result;
  }

  getTableTriggersList({ tableName }: { tableName: string }): any[] {
    return Object.values(this.triggers).filter(
      trigger => trigger[AcDDTrigger.KEY_TABLE_NAME] === tableName
    );
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
