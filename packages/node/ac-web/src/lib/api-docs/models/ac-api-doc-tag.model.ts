import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { AcApiDocExternalDocs } from "./ac-api-doc-external-docs.model";

export class AcApiDocTag {
  static readonly KEY_NAME = 'name';
  static readonly KEY_DESCRIPTION = 'description';
  static readonly KEY_EXTERNAL_DOCS = 'externalDocs';

  name = '';
  description = '';

  @AcBindJsonProperty({ key: AcApiDocTag.KEY_EXTERNAL_DOCS })
  externalDocs: AcApiDocExternalDocs;

  constructor() {
    this.externalDocs = new AcApiDocExternalDocs();
  }

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocTag {
    const instance = new AcApiDocTag();
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
