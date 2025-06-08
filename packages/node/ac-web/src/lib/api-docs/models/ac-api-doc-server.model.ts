import { AcJsonUtils } from "@autocode-ts/autocode";

export class AcApiDocServer {
  static readonly KEY_DESCRIPTION = 'description';
  static readonly KEY_TITLE = 'title';
  static readonly KEY_URL = 'url';

  description = '';
  title = '';
  url = '';

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocServer {
    const instance = new AcApiDocServer();
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
