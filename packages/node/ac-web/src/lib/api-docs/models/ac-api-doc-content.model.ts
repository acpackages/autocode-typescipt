/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcJsonUtils } from "@autocode-ts/autocode";

export class AcApiDocContent {
  static readonly KEY_SCHEMA = 'schema';
  static readonly KEY_EXAMPLES = 'examples';
  static readonly KEY_ENCODING = 'encoding';

  schema: Record<string, any> = {};
  examples: Record<string, any> = {};
  encoding: string = "";

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocContent {
    const instance = new AcApiDocContent();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData = {} }: { jsonData?: Record<string, any> }): this {
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
