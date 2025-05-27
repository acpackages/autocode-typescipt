/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcJsonUtils } from "@autocode-typescript/autocode";

export class AcApiDocHeader {
  static readonly KEY_DESCRIPTION = 'description';
  static readonly KEY_REQUIRED = 'required';
  static readonly KEY_DEPRECATED = 'deprecated';
  static readonly KEY_SCHEMA = 'schema';

  description: string = '';
  required: boolean = false;
  deprecated: boolean = false;
  schema: Record<string, any> = {};

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocHeader {
    const instance = new AcApiDocHeader();
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
