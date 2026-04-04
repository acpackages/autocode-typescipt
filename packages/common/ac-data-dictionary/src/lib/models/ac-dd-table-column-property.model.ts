/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

export class AcDDTableColumnProperty {
  static readonly KeyPropertyName = "propertyName";
  static readonly KeyPropertyValue = "propertyValue";

  @AcBindJsonProperty({ key: AcDDTableColumnProperty.KeyPropertyName })
  propertyName: string = "";

  @AcBindJsonProperty({ key: AcDDTableColumnProperty.KeyPropertyValue })
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
    return AcJsonUtils.prettyEncode({ object: this.toJson() });
  }
}

