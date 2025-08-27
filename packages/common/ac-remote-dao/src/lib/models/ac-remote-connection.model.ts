/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumHttpMethod, AcJsonUtils } from "@autocode-ts/autocode";

export class AcRemoteConnection {
  static readonly KeyApiUrl = 'apiUrl';
  static readonly KeyApiMethod = 'apiMethod';

  @AcBindJsonProperty({ key: AcRemoteConnection.KeyApiUrl })
  apiUrl: string = "";

  @AcBindJsonProperty({ key: AcRemoteConnection.KeyApiMethod })
  apiMethod: AcEnumHttpMethod = AcEnumHttpMethod.Post;

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcRemoteConnection {
    const instance = new AcRemoteConnection();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData = {} }: { jsonData: Record<string, any> }): AcRemoteConnection {
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
