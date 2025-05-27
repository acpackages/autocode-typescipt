import { AcBindJsonProperty, AcJsonUtils } from "@autocode-typescript/autocode";

export class AcApiDocSecurityScheme {
  static readonly KEY_TYPE = 'type';
  static readonly KEY_DESCRIPTION = 'description';
  static readonly KEY_NAME = 'name';
  static readonly KEY_IN = 'in';
  static readonly KEY_SCHEME = 'scheme';
  static readonly KEY_BEARER_FORMAT = 'bearerFormat';
  static readonly KEY_FLOWS = 'flows';
  static readonly KEY_OPENID_CONNECT_URL = 'openIdConnectUrl';

  type = '';
  description = '';
  name = '';

  @AcBindJsonProperty({ key: AcApiDocSecurityScheme.KEY_IN })
  in_ = '';  // `in` is reserved, so use `in_`

  scheme = '';
  bearerFormat = '';
  flows: any[] = [];
  openIdConnectUrl = '';

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocSecurityScheme {
    const instance = new AcApiDocSecurityScheme();
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
