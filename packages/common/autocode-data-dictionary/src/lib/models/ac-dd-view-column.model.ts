/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-typescript/autocode";
import { AcDDTableColumnProperty } from "./ac-dd-table-column-property.model";

export class AcDDViewColumn {
  static readonly KEY_COLUMN_NAME = "column_name";
  static readonly KEY_COLUMN_PROPERTIES = "column_properties";
  static readonly KEY_COLUMN_TYPE = "column_type";
  static readonly KEY_COLUMN_VALUE = "column_value";
  static readonly KEY_COLUMN_SOURCE = "column_source";
  static readonly KEY_COLUMN_SOURCE_NAME = "column_source_name";

  @AcBindJsonProperty({ key: AcDDViewColumn.KEY_COLUMN_NAME })
  columnName: string = "";

  @AcBindJsonProperty({ key: AcDDViewColumn.KEY_COLUMN_PROPERTIES })
  columnProperties: Record<string, AcDDTableColumnProperty> = {};

  @AcBindJsonProperty({ key: AcDDViewColumn.KEY_COLUMN_TYPE })
  columnType: string = "text";

  @AcBindJsonProperty({ key: AcDDViewColumn.KEY_COLUMN_VALUE })
  columnValue: any;

  @AcBindJsonProperty({ key: AcDDViewColumn.KEY_COLUMN_SOURCE })
  columnSource: string = "";

  @AcBindJsonProperty({ key: AcDDViewColumn.KEY_COLUMN_SOURCE_NAME })
  columnSourceName: string = "";

  static instanceFromJson(params: { jsonData: Record<string, any> }): AcDDViewColumn {
    const instance = new AcDDViewColumn();
    instance.fromJson({ jsonData: params.jsonData });
    return instance;
  }

  fromJson(params: { jsonData: Record<string, any> }): AcDDViewColumn {
    const json = { ...params.jsonData };

    if (json.hasOwnProperty(AcDDViewColumn.KEY_COLUMN_PROPERTIES)) {
      const props = json[AcDDViewColumn.KEY_COLUMN_PROPERTIES] as Record<string, any>;
      for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
          this.columnProperties[key] = AcDDTableColumnProperty.instanceFromJson({ jsonData: props[key] });
        }
      }
      delete json[AcDDViewColumn.KEY_COLUMN_PROPERTIES];
    }

    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: json });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
