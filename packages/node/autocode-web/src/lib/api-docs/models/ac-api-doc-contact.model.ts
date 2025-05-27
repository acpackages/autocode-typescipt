/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcJsonUtils } from "@autocode-typescript/autocode";

export class AcApiDocContact {
  static readonly KEY_EMAIL = "email";
  static readonly KEY_NAME = "name";
  static readonly KEY_URL = "url";

  email: string = "";
  name: string = "";
  url: string = "";

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocContact {
    const instance = new AcApiDocContact();
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
