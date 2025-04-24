import { AcEnumDDTableRowEvent } from "../enums/ac-dd-table-row-event.enum";

export class AcDDTableRowEvent {
    static readonly keyAbort = "abort";
    static readonly keyCondition = "condition";
    static readonly keyEventType = "event_type";
    static readonly keyNewRecords = "new_records";
    static readonly keyOldRecords = "old_records";
    static readonly keyOperation = "operation";
    static readonly keyOriginalCondition = "original_condition";
    static readonly keyResult = "result";
    static readonly keyTableName = "table_name";
    static readonly keyUniqueCondition = "unique_condition";
    static readonly keyValues = "values";

    abortOperation: boolean = false;
    condition: string = "";
    eventType: AcEnumDDTableRowEvent = AcEnumDDTableRowEvent.unknown;
    newRecords: any[] = [];
    oldRecords: any[] = [];
    operation: string = "";
    originalCondition: string = ""
    result: any = {};
    tableName: string = "";
    uniqueCondition: string = "";
    values: any = {};

    static fromJson(jsonData: { [key: string]: any }): AcDDTableRowEvent {
        const instance = new AcDDTableRowEvent();
        instance.setValuesFromJson(jsonData);
        return instance;
    }

    setValuesFromJson(jsonData: { [key: string]: any }): void {
        if (jsonData.hasOwnProperty(AcDDTableRowEvent.keyAbort)) {
            this.abortOperation = jsonData[AcDDTableRowEvent.keyAbort];
        }
        if (jsonData.hasOwnProperty(AcDDTableRowEvent.keyCondition)) {
            this.condition = jsonData[AcDDTableRowEvent.keyCondition];
        }
        if (jsonData.hasOwnProperty(AcDDTableRowEvent.keyEventType)) {
            this.eventType = jsonData[AcDDTableRowEvent.keyEventType];
        }
        if (jsonData.hasOwnProperty(AcDDTableRowEvent.keyNewRecords)) {
            this.newRecords = jsonData[AcDDTableRowEvent.keyNewRecords];
        }
        if (jsonData.hasOwnProperty(AcDDTableRowEvent.keyOldRecords)) {
            this.oldRecords = jsonData[AcDDTableRowEvent.keyOldRecords];
        }
        if (jsonData.hasOwnProperty(AcDDTableRowEvent.keyOperation)) {
            this.operation = jsonData[AcDDTableRowEvent.keyOperation];
        }
        if (jsonData.hasOwnProperty(AcDDTableRowEvent.keyOriginalCondition)) {
            this.originalCondition = jsonData[AcDDTableRowEvent.keyOriginalCondition];
        }
        if (jsonData.hasOwnProperty(AcDDTableRowEvent.keyResult)) {
            this.result = jsonData[AcDDTableRowEvent.keyResult];
        }
        if (jsonData.hasOwnProperty(AcDDTableRowEvent.keyTableName)) {
            this.tableName = jsonData[AcDDTableRowEvent.keyTableName];
        }
        if (jsonData.hasOwnProperty(AcDDTableRowEvent.keyUniqueCondition)) {
            this.uniqueCondition = jsonData[AcDDTableRowEvent.keyUniqueCondition];
        }
        if (jsonData.hasOwnProperty(AcDDTableRowEvent.keyValues)) {
            this.values = jsonData[AcDDTableRowEvent.keyValues];
        }
    }

    toJson(): { [key: string]: any } {
        return {
            [AcDDTableRowEvent.keyAbort]: this.abortOperation,
            [AcDDTableRowEvent.keyCondition]: this.condition,
            [AcDDTableRowEvent.keyEventType]: this.eventType,
            [AcDDTableRowEvent.keyNewRecords]: this.newRecords,
            [AcDDTableRowEvent.keyOldRecords]: this.oldRecords,
            [AcDDTableRowEvent.keyOperation]: this.operation,
            [AcDDTableRowEvent.keyOriginalCondition]: this.originalCondition,
            [AcDDTableRowEvent.keyResult]: this.result,
            [AcDDTableRowEvent.keyTableName]: this.tableName,
            [AcDDTableRowEvent.keyUniqueCondition]: this.uniqueCondition,
            [AcDDTableRowEvent.keyValues]: this.values,
        };
    }

    toString(): string {
        return JSON.stringify(this.toJson());
    }
}