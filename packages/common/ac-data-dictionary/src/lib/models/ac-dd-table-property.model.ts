/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

export class AcDDTableProperty {
  static readonly KeyPropertyName = "property_name";
  static readonly KeyPropertyValue = "property_value";

  @AcBindJsonProperty({ key: AcDDTableProperty.KeyPropertyName })
  propertyName: string = "";

  @AcBindJsonProperty({ key: AcDDTableProperty.KeyPropertyValue })
  propertyValue: any = null;

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDTableProperty {
    const instance = new AcDDTableProperty();
    instance.fromJson({ jsonData: jsonData });
    return instance;
  }

  fromJson({ jsonData }: { jsonData: any }): AcDDTableProperty {
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
