/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { AcEnumDDRowOperation } from "@autocode-ts/ac-data-dictionary";

export class AcSqlOperation {
  static readonly KeyCondition: string = 'condition';
  static readonly KeyOperation: string = 'operation';
  static readonly KeyParameters: string = 'parameters';
  static readonly KeyRow: string = 'row';
  static readonly KeyTable: string = 'table';

  @AcBindJsonProperty({ key: AcSqlOperation.KeyCondition })
  condition?: string;

  @AcBindJsonProperty({ key: AcSqlOperation.KeyOperation })
  operation: string = AcEnumDDRowOperation.Unknown;

  @AcBindJsonProperty({ key: AcSqlOperation.KeyRow })
  row?: Record<string, any>;

  @AcBindJsonProperty({ key: AcSqlOperation.KeyParameters })
  parameters?: Record<string, any>;

  @AcBindJsonProperty({ key: AcSqlOperation.KeyTable })
  table: string = '';

  constructor({
    operation,
    row,
    table,
    condition,
    parameters,
  }: {
    operation?: string;
    row?: Record<string, any>;
    table?: string;
    condition?: string;
    parameters?: Record<string, any>;
  } = {}) {
    if (operation !== undefined) {
      this.operation = operation;
    }
    if (row !== undefined) {
      this.row = row;
    }
    if (table !== undefined) {
      this.table = table;
    }
    if (condition !== undefined) {
      this.condition = condition;
    }
    if (parameters !== undefined) {
      this.parameters = parameters;
    }
  }

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcSqlOperation {
    const instance = new AcSqlOperation();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData = {} }: { jsonData: Record<string, any> }): AcSqlOperation {
    if (jsonData[AcSqlOperation.KeyOperation]) {
      this.operation = jsonData[AcSqlOperation.KeyOperation];
    }
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    const result = AcJsonUtils.getJsonDataFromInstance({ instance: this });
    result[AcSqlOperation.KeyOperation] = this.operation;
    return result;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
