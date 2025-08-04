/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { AcApiDocParameter } from "./ac-api-doc-parameter.model";
import { AcApiDocRequestBody } from "./ac-api-doc-request-body.model";
import { AcApiDocResponse } from "./ac-api-doc-response.model";

export class AcApiDocRoute {
  static readonly KEY_TAGS = 'tags';
  static readonly KEY_SUMMARY = 'summary';
  static readonly KEY_DESCRIPTION = 'description';
  static readonly KEY_OPERATION_ID = 'operationId';
  static readonly KeyParameters = 'parameters';
  static readonly KEY_REQUEST_BODY = 'requestBody';
  static readonly KEY_RESPONSES = 'responses';
  static readonly KEY_CONSUMES = 'consumes';
  static readonly KEY_PRODUCES = 'produces';
  static readonly KEY_DEPRECATED = 'deprecated';
  static readonly KEY_SECURITY = 'security';

  @AcBindJsonProperty({ key: AcApiDocRoute.KEY_TAGS })
  tags: string[] = [];

  @AcBindJsonProperty({ key: AcApiDocRoute.KEY_SUMMARY })
  summary: string = '';

  @AcBindJsonProperty({ key: AcApiDocRoute.KEY_DESCRIPTION })
  description: string = '';

  @AcBindJsonProperty({ key: AcApiDocRoute.KEY_OPERATION_ID })
  operationId: string = '';

  @AcBindJsonProperty({ key: AcApiDocRoute.KeyParameters, arrayType: AcApiDocParameter })
  parameters: AcApiDocParameter[] = [];

  @AcBindJsonProperty({ key: AcApiDocRoute.KEY_REQUEST_BODY })
  requestBody?: AcApiDocRequestBody;

  // Responses are not serialized by AcJsonUtils by default but included in toJson()
  responses: AcApiDocResponse[] = [];

  @AcBindJsonProperty({ key: AcApiDocRoute.KEY_CONSUMES })
  consumes: string[] = [];

  @AcBindJsonProperty({ key: AcApiDocRoute.KEY_PRODUCES })
  produces: string[] = [];

  @AcBindJsonProperty({ key: AcApiDocRoute.KEY_DEPRECATED })
  deprecated: boolean = false;

  @AcBindJsonProperty({ key: AcApiDocRoute.KEY_SECURITY })
  security: any[] = [];

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocRoute {
    const instance = new AcApiDocRoute();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData }: { jsonData: Record<string, any> }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  addParameter({ parameter }: { parameter: AcApiDocParameter }): this {
    this.parameters.push(parameter);
    return this;
  }

  addResponse({ response }: { response: AcApiDocResponse }): this {
    this.responses.push(response);
    return this;
  }

  addTag({ tag }: { tag: string }): this {
    this.tags.push(tag);
    return this;
  }

  toJson(): Record<string, any> {
    const result = AcJsonUtils.getJsonDataFromInstance({ instance: this });

    if (this.responses.length > 0) {
      result[AcApiDocRoute.KEY_RESPONSES] = {};
      for (const response of this.responses) {
        result[AcApiDocRoute.KEY_RESPONSES][response.code.toString()] = response.toJson();
      }
    }

    return result;
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
