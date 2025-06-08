import { AcJsonUtils } from "@autocode-ts/autocode";

export class AcApiDocMediaType {
  static readonly KEY_SCHEMA = 'schema';
  static readonly KEY_EXAMPLES = 'examples';

  schema?: any[];   // nullable list
  examples?: any[]; // nullable list

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocMediaType {
    const instance = new AcApiDocMediaType();
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
