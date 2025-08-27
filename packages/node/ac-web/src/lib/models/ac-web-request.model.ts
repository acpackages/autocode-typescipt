/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

export class AcWebRequest {
  static readonly KEY_COOKIES = 'cookies';
  static readonly KEY_BODY = 'body';
  static readonly KEY_FILES = 'files';
  static readonly KEY_GET = 'get';
  static readonly KEY_HEADERS = 'headers';
  static readonly KEY_METHOD = 'method';
  static readonly KEY_PATH_PAREMETERS = 'pathParameters';
  static readonly KEY_POST = 'post';
  static readonly KEY_SESSION = 'session';
  static readonly KEY_URL = 'url';

  @AcBindJsonProperty({ key: AcWebRequest.KEY_BODY })
  body: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcWebRequest.KEY_COOKIES })
  cookies: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcWebRequest.KEY_FILES })
  files: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcWebRequest.KEY_GET })
  get: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcWebRequest.KEY_HEADERS })
  headers: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcWebRequest.KEY_METHOD })
  method: string = "";

  @AcBindJsonProperty({ key: AcWebRequest.KEY_PATH_PAREMETERS })
  pathParameters: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcWebRequest.KEY_POST })
  post: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcWebRequest.KEY_SESSION })
  session: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcWebRequest.KEY_URL })
  url: string = "";

  static instanceFromJson(jsonData: Record<string, any>): AcWebRequest {
    const instance = new AcWebRequest();
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
