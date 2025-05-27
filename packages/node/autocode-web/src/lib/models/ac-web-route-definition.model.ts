/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcJsonUtils } from "@autocode-typescript/autocode";
import { AcApiDocRoute } from "../api-docs/models/ac-api-doc-route.model";

export class AcWebRouteDefinition {
  static readonly KEY_CONTROLLER = 'controller';
  static readonly KEY_HANDLER = 'handler';
  static readonly KEY_DOCUMENTATION = 'documentation';
  static readonly KEY_METHOD = 'method';
  static readonly KEY_URL = 'url';

  controller: any;
  handler: any;

  documentation!: AcApiDocRoute;

  method: string = "POST";
  url: string = "";

  static instanceFromJson(jsonData: Record<string, any>): AcWebRouteDefinition {
    const instance = new AcWebRouteDefinition();
    instance.fromJson(jsonData);
    return instance;
  }

  fromJson(jsonData: Record<string, any>): this {
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
