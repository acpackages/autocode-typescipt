/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from '@autocode-ts/autocode';

export class AcApiDocLink {
  static readonly KEY_OPERATION_ID = 'operationId';
  static readonly KEY_PARAMETERS = 'parameters';
  static readonly KEY_DESCRIPTION = 'description';

  @AcBindJsonProperty({key: AcApiDocLink.KEY_OPERATION_ID})
  operationId: string = '';
  parameters: any[] = [];
  description: string = '';

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocLink {
    const instance = new AcApiDocLink();
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
