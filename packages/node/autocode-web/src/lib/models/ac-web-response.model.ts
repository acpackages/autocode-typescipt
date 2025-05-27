/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumHttpResponseCode, AcJsonUtils } from "@autocode-typescript/autocode";
import { AcEnumWebResponseType } from "../enums/ac-enum-web-response-type.enum";


export class AcWebResponse {
  static readonly KEY_COOKIES = 'cookies';
  static readonly KEY_CONTENT = 'content';
  static readonly KEY_HEADERS = 'headers';
  static readonly KEY_RESPONSE_CODE = 'response_code';
  static readonly KEY_RESPONSE_TYPE = 'response_type';
  static readonly KEY_SESSION = 'session';

  cookies: Record<string, any> = {};
  content: any;

  headers: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcWebResponse.KEY_RESPONSE_CODE })
  responseCode: number = 0;

  @AcBindJsonProperty({ key: AcWebResponse.KEY_RESPONSE_TYPE })
  responseType: string = AcEnumWebResponseType.TEXT;

  session: Record<string, any> = {};

  static json(params: { data: any; responseCode?: number }): AcWebResponse {
    const response = new AcWebResponse();
    response.responseCode = params.responseCode ?? AcEnumHttpResponseCode.OK;
    response.responseType = AcEnumWebResponseType.JSON;
    response.content = params.data;
    response.headers['Content-Type'] = 'application/json';
    return response;
  }

  static notFound(): AcWebResponse {
    const response = new AcWebResponse();
    response.responseCode = AcEnumHttpResponseCode.NOT_FOUND;
    return response;
  }

  static raw(params: { content: any; responseCode?: number; headers?: Record<string, any> }): AcWebResponse {
    const response = new AcWebResponse();
    response.responseCode = params.responseCode ?? AcEnumHttpResponseCode.OK;
    response.responseType = AcEnumWebResponseType.RAW;
    response.content = params.content;
    response.headers = params.headers ?? {};
    return response;
  }

  static redirect(params: { url: string; responseCode?: number }): AcWebResponse {
    const response = new AcWebResponse();
    response.responseCode = params.responseCode ?? AcEnumHttpResponseCode.TEMPORARY_REDIRECT;
    response.responseType = AcEnumWebResponseType.REDIRECT;
    response.content = params.url;
    return response;
  }

  static view(params: { template: string; responseCode?: number }): AcWebResponse {
    // Placeholder for view rendering logic
    // In TS/Node, actual rendering depends on your framework
    return new AcWebResponse();
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
