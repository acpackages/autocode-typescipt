import { AcJsonUtils } from "@autocode-ts/autocode";
import { AcApiDocSchema } from "./ac-api-doc-schema.model";

export class AcApiDocComponents {
  static readonly KEY_SCHEMAS = 'schemas';

  schemas: Record<string, AcApiDocSchema> = {};

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocComponents {
    const instance = new AcApiDocComponents();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData = {} }: { jsonData?: Record<string, any> }): this {
    const json = { ...jsonData };
    if (AcApiDocComponents.KEY_SCHEMAS in json) {
      const schemaData = json[AcApiDocComponents.KEY_SCHEMAS];
      if (schemaData && typeof schemaData === 'object') {
        for (const key in schemaData) {
          if (Object.prototype.hasOwnProperty.call(schemaData, key)) {
            this.schemas[key] = AcApiDocSchema.instanceFromJson({ jsonData: schemaData[key] });
          }
        }
      }
      delete json[AcApiDocComponents.KEY_SCHEMAS];
    }
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: json });
    return this;
  }

  toJson(): Record<string, any> {
    const result: Record<string, any> = {};

    if (Object.keys(this.schemas).length > 0) {
      const schemaJson: Record<string, any> = {};
      for (const key in this.schemas) {
        if (Object.prototype.hasOwnProperty.call(this.schemas, key)) {
          const json = this.schemas[key].toJson();
          if (Object.keys(json).length > 0) {
            schemaJson[key] = json;
          }
        }
      }
      if (Object.keys(schemaJson).length > 0) {
        result[AcApiDocComponents.KEY_SCHEMAS] = schemaJson;
      }
    }

    return result;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
