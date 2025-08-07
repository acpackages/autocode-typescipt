/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { AcDDTableColumnProperty } from "../..";
// import { AcDDTableColumnProperty } from "./ac-dd-table-column-property.model";

export class AcDDViewColumn {
  static readonly KeyColumnName = "column_name";
  static readonly KeyColumnProperties = "column_properties";
  static readonly KeyColumnType = "column_type";
  static readonly KeyColumnValue = "column_value";
  static readonly KeyColumnSource = "column_source";
  static readonly KeyColumnSourceName = "column_source_name";

  @AcBindJsonProperty({ key: AcDDViewColumn.KeyColumnName })
  columnName: string = "";

  @AcBindJsonProperty({ key: AcDDViewColumn.KeyColumnProperties })
  columnProperties: Record<string, AcDDTableColumnProperty> = {};

  @AcBindJsonProperty({ key: AcDDViewColumn.KeyColumnType })
  columnType: string = "text";

  @AcBindJsonProperty({ key: AcDDViewColumn.KeyColumnValue })
  columnValue: any;

  @AcBindJsonProperty({ key: AcDDViewColumn.KeyColumnSource })
  columnSource: string = "";

  @AcBindJsonProperty({ key: AcDDViewColumn.KeyColumnSourceName })
  columnSourceName: string = "";

  static instanceFromJson({jsonData}: { jsonData: Record<string, any> }): AcDDViewColumn {
    const instance = new AcDDViewColumn();
    instance.fromJson({ jsonData: jsonData });
    return instance;
  }

  fromJson({jsonData}: { jsonData: Record<string, any> }): AcDDViewColumn {
    const json = { ...jsonData };

    if (json.hasOwnProperty(AcDDViewColumn.KeyColumnProperties)) {
      const props = json[AcDDViewColumn.KeyColumnProperties] as Record<string, any>;
      for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
          this.columnProperties[key] = AcDDTableColumnProperty.instanceFromJson({ jsonData: props[key] });
        }
      }
      delete json[AcDDViewColumn.KeyColumnProperties];
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
