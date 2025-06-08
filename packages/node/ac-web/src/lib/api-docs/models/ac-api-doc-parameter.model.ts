/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

export class AcApiDocParameter {
  static readonly KEY_DESCRIPTION = "description";
  static readonly KEY_EXPLODE = "explode";
  static readonly KEY_IN = "in";
  static readonly KEY_NAME = "name";
  static readonly KEY_REQUIRED = "required";
  static readonly KEY_SCHEMA = "schema";

  description?: string;

  @AcBindJsonProperty({ key: AcApiDocParameter.KEY_IN })
  inValue?: string;

  name?: string;
  required: boolean = false;
  explode: boolean = true;
  schema?: Record<string, any>;

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocParameter {
    const instance = new AcApiDocParameter();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData }: { jsonData: Record<string, any> }): this {
    const json = { ...jsonData };

    if (AcApiDocParameter.KEY_IN in json) {
      this.inValue = json[AcApiDocParameter.KEY_IN] as string | undefined;
      delete json[AcApiDocParameter.KEY_IN];
    }

    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: json });

    return this;
  }

  toJson(): Record<string, any> {
    const json = AcJsonUtils.getJsonDataFromInstance({ instance: this });

    if (this.inValue !== undefined) {
      json[AcApiDocParameter.KEY_IN] = this.inValue;
    }

    return json;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
