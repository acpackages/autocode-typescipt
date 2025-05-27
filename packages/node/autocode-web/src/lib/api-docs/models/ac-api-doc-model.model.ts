import { AcJsonUtils } from "@autocode-typescript/autocode";

/* eslint-disable @typescript-eslint/no-inferrable-types */
export class AcApiDocModel {
  static readonly KEY_NAME = 'name';
  static readonly KEY_TYPE = 'type';
  static readonly KEY_PROPERTIES = 'properties';

  name: string = '';
  type: string = 'object';
  properties: Record<string, any> = {};

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocModel {
    const instance = new AcApiDocModel();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData }: { jsonData: Record<string, any> }): this {
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
