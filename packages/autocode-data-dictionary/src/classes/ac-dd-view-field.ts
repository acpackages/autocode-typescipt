import { AcEnumDDFieldType } from "../enums/ac-dd-field-type.enum";
import { AcDDTableFieldProperty } from "./ac-dd-table-field-property";

export class AcDDViewField {
  static readonly keyFieldName = "field_name";
  static readonly keyFieldProperties = "field_properties";
  static readonly keyFieldType = "field_type";
  static readonly keyFieldValue = "field_value";
  static readonly keyFieldSource = "field_source";
  static readonly keyFieldSourceName = "field_source_name";

  fieldName: string = "";
  fieldProperties: { [key: string]: AcDDTableFieldProperty } = {};
  fieldType: string = AcEnumDDFieldType.text;
  fieldValue: any = null;
  fieldSource: string = "";
  fieldSourceName:string = "";

  static fromJson(jsonData: { [key: string]: any }): AcDDViewField {
    const instance = new AcDDViewField();
    instance.setValuesFromJson(jsonData);
    return instance;
  }

  setValuesFromJson(jsonData: { [key: string]: any } = {}): void {
    if (jsonData.hasOwnProperty(AcDDViewField.keyFieldName)) {
      this.fieldName = String(jsonData[AcDDViewField.keyFieldName]);
    }
    if (jsonData.hasOwnProperty(AcDDViewField.keyFieldType)) {
      this.fieldType = String(jsonData[AcDDViewField.keyFieldType]);
    }
    if (jsonData.hasOwnProperty(AcDDViewField.keyFieldValue)) {
      this.fieldValue = jsonData[AcDDViewField.keyFieldValue];
    }
    if (jsonData.hasOwnProperty(AcDDViewField.keyFieldSource)) {
      this.fieldSource = jsonData[AcDDViewField.keyFieldSource];
    }
    if (jsonData.hasOwnProperty(AcDDViewField.keyFieldSourceName)) {
      this.fieldSourceName = jsonData[AcDDViewField.keyFieldSourceName];
    }
    if (jsonData.hasOwnProperty(AcDDViewField.keyFieldProperties)) {
      const properties = jsonData[AcDDViewField.keyFieldProperties] as { [key: string]: any };
      for (const propertyName in properties) {
        if (properties.hasOwnProperty(propertyName)) {
          this.fieldProperties[propertyName] = AcDDTableFieldProperty.fromJson(properties[propertyName]);
        }
      }
    }
  }

  toJson(): { [key: string]: any } {
    const result: { [key: string]: any } = {
      [AcDDViewField.keyFieldName]: this.fieldName,
      [AcDDViewField.keyFieldType]: this.fieldType,
      [AcDDViewField.keyFieldValue]: this.fieldValue,
      [AcDDViewField.keyFieldSource]: this.fieldSource,
      [AcDDViewField.keyFieldSourceName]: this.fieldSourceName,
      [AcDDViewField.keyFieldProperties]: {},
    };
    for (const propertyName in this.fieldProperties) {
      if (this.fieldProperties.hasOwnProperty(propertyName)) {
        result[AcDDViewField.keyFieldProperties][propertyName] = this.fieldProperties[propertyName].toJson();
      }
    }

    return result;
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}


