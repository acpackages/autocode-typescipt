import { AcDDRelationship } from "./ac-dd-relationship";
import { AcDDTable } from "./ac-dd-table";
import { AcDDTrigger } from "./ac-dd-trigger";

export class AcDataDictionary {
    static readonly keyFunctions = "functions";
    static readonly keyRelationships = "relationships";
    static readonly keyStoredProcedures = "stored_procedures";
    static readonly keyTables = "tables";
    static readonly keyTriggers = "triggers";
    static readonly keyVersion = "version";
    static readonly keyViews = "views";

    static dataDictionaries: any = {};
    functions: any = {};
    relationships: any = {};
    storedProcedures: any = {};
    tables: any = {};
    triggers: any = {};
    version: number = 0;
    views: any = {};

    static fromJson(jsonData: { [key: string]: any }): AcDataDictionary {
        const instance = new AcDataDictionary();
        instance.setValuesFromJson(jsonData);
        return instance;
    }

    static getInstance({ dataDictionaryName = "default" }: { dataDictionaryName?: string; } = {}): AcDataDictionary {
        let result: AcDataDictionary = new AcDataDictionary();
        if (this.dataDictionaries[dataDictionaryName]) {
            result.setValuesFromJson(this.dataDictionaries[dataDictionaryName]);
        }
        return result;
    }

    static getTables({ dataDictionaryName = "default" }: { dataDictionaryName?: string; } = {}): { [key: string]: AcDDTable } {
        let result: any = {};
        let acDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName: dataDictionaryName });
        if (acDataDictionary.tables) {
            for (let tableName of Object.keys(acDataDictionary.tables)) {
                result[tableName] = AcDDTable.fromJson(acDataDictionary.tables[tableName]);
            }
        }
        return result;
    }

    static registerDataDictionary({ dataDictionaryJson, dataDictionaryName = "default" }: { dataDictionaryJson: any; dataDictionaryName?: string; }) {
        AcDataDictionary.dataDictionaries[dataDictionaryName] = dataDictionaryJson;
    }

    getTablesList(): any[] {
        let result: any[] = Object.values(this.tables);
        return result;
    }

    getTableFieldsList({ tableName }: { tableName: string; }): any[] {
        let result: any[] = [];
        if (this.tables[tableName]) {
            result = Object.values(this.tables[tableName][AcDDTable.keyTableFields]);
        }
        return result;
    }

    getTableRelationshipsList({ tableName, asDestination = true }: { tableName: string; asDestination: boolean }): any[] {
        let result: any[] = [];
        for (let destinationTableName of Object.keys(this.relationships)) {
            let destinationTableDetails: any = this.relationships[destinationTableName];
            for (let destinationFieldName of Object.keys(destinationTableDetails)) {
                let destinationFieldDetails: any = destinationTableDetails[destinationFieldName];
                for (let sourceTableName of Object.keys(destinationFieldDetails)) {
                    let sourceTableDetails: any = destinationFieldDetails[sourceTableName];
                    for (let sourceFieldName of Object.keys(sourceTableDetails)) {
                        let relationshipDetails: any = sourceTableDetails[sourceFieldName];
                        let checkField: string = AcDDRelationship.keyDestinationTable;
                        if (!asDestination) {
                            checkField = AcDDRelationship.keySourceTable;
                        }
                        if (relationshipDetails[checkField] == tableName) {
                            result.push(relationshipDetails);
                        }
                    }
                }
            }
        }
        return result;
    }

    getTableTriggersList({ tableName }: { tableName: string; }): any[] {
        let result: any[] = [];
        let triggerValues: any[] = Object.values(this.triggers);
        for (let triggerDetails of triggerValues) {
            if (triggerDetails[AcDDTrigger.keyTriggerTableName] == tableName) {
                result.push(triggerDetails);
            }
        }
        return result;
    }

    setValuesFromJson(jsonData: { [key: string]: any } = {}): void {
        if (jsonData.hasOwnProperty(AcDataDictionary.keyFunctions)) {
            this.functions = jsonData[AcDataDictionary.keyFunctions];
        }
        if (jsonData.hasOwnProperty(AcDataDictionary.keyRelationships)) {
            this.relationships = jsonData[AcDataDictionary.keyRelationships];
        }
        if (jsonData.hasOwnProperty(AcDataDictionary.keyStoredProcedures)) {
            this.storedProcedures = jsonData[AcDataDictionary.keyStoredProcedures];
        }
        if (jsonData.hasOwnProperty(AcDataDictionary.keyTables)) {
            this.tables = jsonData[AcDataDictionary.keyTables];
        }
        if (jsonData.hasOwnProperty(AcDataDictionary.keyTriggers)) {
            this.triggers = jsonData[AcDataDictionary.keyTriggers];
        }
        if (jsonData.hasOwnProperty(AcDataDictionary.keyVersion)) {
            this.version = jsonData[AcDataDictionary.keyVersion];
        }
        if (jsonData.hasOwnProperty(AcDataDictionary.keyViews)) {
            this.views = jsonData[AcDataDictionary.keyViews];
        }
    }

    toJson(): { [key: string]: any } {
        return {
            [AcDataDictionary.keyFunctions]: this.functions,
            [AcDataDictionary.keyRelationships]: this.relationships,
            [AcDataDictionary.keyStoredProcedures]: this.storedProcedures,
            [AcDataDictionary.keyTables]: this.tables,
            [AcDataDictionary.keyVersion]: this.version,
            [AcDataDictionary.keyViews]: this.views,
        };
    }

    toString(): string {
        return JSON.stringify(this.toJson());
    }
}