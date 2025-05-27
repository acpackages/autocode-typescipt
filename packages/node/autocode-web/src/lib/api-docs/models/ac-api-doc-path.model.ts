/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcJsonUtils } from "@autocode-typescript/autocode";
import { AcApiDocRoute } from "./ac-api-doc-route.model";

export class AcApiDocPath {
  static readonly KEY_URL = "url";
  static readonly KEY_CONNECT = "connect";
  static readonly KEY_GET = "get";
  static readonly KEY_PUT = "put";
  static readonly KEY_POST = "post";
  static readonly KEY_DELETE = "delete";
  static readonly KEY_OPTIONS = "options";
  static readonly KEY_HEAD = "head";
  static readonly KEY_PATCH = "patch";
  static readonly KEY_TRACE = "trace";

  url: string = "";

  connect?: AcApiDocRoute;
  get?: AcApiDocRoute;
  put?: AcApiDocRoute;
  post?: AcApiDocRoute;
  delete?: AcApiDocRoute;
  options?: AcApiDocRoute;
  head?: AcApiDocRoute;
  patch?: AcApiDocRoute;
  trace?: AcApiDocRoute;

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocPath {
    const instance = new AcApiDocPath();
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
