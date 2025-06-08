import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

export class AcApiDocSchema {
  static readonly KEY_TYPE = 'type';
  static readonly KEY_FORMAT = 'format';
  static readonly KEY_TITLE = 'title';
  static readonly KEY_DESCRIPTION = 'description';
  static readonly KEY_PROPERTIES = 'properties';
  static readonly KEY_REQUIRED = 'required';
  static readonly KEY_ITEMS = 'items';
  static readonly KEY_ENUM = 'enum';

  @AcBindJsonProperty({ key: AcApiDocSchema.KEY_TYPE })
  type?: string;

  @AcBindJsonProperty({ key: AcApiDocSchema.KEY_FORMAT })
  format?: string;

  @AcBindJsonProperty({ key: AcApiDocSchema.KEY_TITLE })
  title?: string;

  @AcBindJsonProperty({ key: AcApiDocSchema.KEY_DESCRIPTION })
  description?: string;

  // properties can be a map of schemas or other data
  @AcBindJsonProperty({ key: AcApiDocSchema.KEY_PROPERTIES })
  properties?: Record<string, any>;

  @AcBindJsonProperty({ key: AcApiDocSchema.KEY_REQUIRED })
  required?: string[];

  // items can be any schema or list of schemas, so keep as any
  @AcBindJsonProperty({ key: AcApiDocSchema.KEY_ITEMS })
  items?: any;

  @AcBindJsonProperty({ key: AcApiDocSchema.KEY_ENUM })
  enumValues?: any[];

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcApiDocSchema {
    const instance = new AcApiDocSchema();
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
