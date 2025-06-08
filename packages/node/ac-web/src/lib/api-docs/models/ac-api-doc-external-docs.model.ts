/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcJsonUtils } from "@autocode-ts/autocode";

export class AcApiDocExternalDocs {
  static readonly KEY_DESCRIPTION = "description";
  static readonly KEY_URL = "url";

  description: string = "";
  url: string = "";

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocExternalDocs {
    const instance = new AcApiDocExternalDocs();
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
