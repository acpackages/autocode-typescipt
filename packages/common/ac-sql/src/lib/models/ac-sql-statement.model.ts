/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

export class AcSqlStatement {
  static readonly KeySql: string = 'sql';
  static readonly KeyParameters: string = 'parameters';

  @AcBindJsonProperty({ key: AcSqlStatement.KeySql })
  sql: string = '';

  @AcBindJsonProperty({ key: AcSqlStatement.KeyParameters })
  parameters: Record<string, any> = {};

  constructor() {}

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcSqlStatement {
    const instance = new AcSqlStatement();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData = {} }: { jsonData: Record<string, any> }): AcSqlStatement {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
