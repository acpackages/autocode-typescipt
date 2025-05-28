/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-typescript/autocode";

export class AcDDTableColumnProperty {
  static readonly KEY_PROPERTY_NAME = "property_name";
  static readonly KEY_PROPERTY_VALUE = "property_value";

  @AcBindJsonProperty({ key: AcDDTableColumnProperty.KEY_PROPERTY_NAME })
  propertyName: string = "";

  @AcBindJsonProperty({ key: AcDDTableColumnProperty.KEY_PROPERTY_VALUE })
  propertyValue: any;

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDTableColumnProperty {
    const instance = new AcDDTableColumnProperty();
    instance.fromJson({ jsonData: jsonData });
    return instance;
  }

  fromJson({ jsonData }: { jsonData: any }): AcDDTableColumnProperty {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
