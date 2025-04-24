export class AcDDTableFieldProperty {
  static readonly keyPropertyName = "property_name";
  static readonly keyPropertyValue = "property_value";

  propertyName: string = "";
  propertyValue: any = null;

  static fromJson(jsonData: { [key: string]: any }): AcDDTableFieldProperty {
    const instance = new AcDDTableFieldProperty();
    instance.setValuesFromJson(jsonData);
    return instance;
  }

  setValuesFromJson(jsonData: { [key: string]: any } = {}): void {
    if (jsonData.hasOwnProperty(AcDDTableFieldProperty.keyPropertyName)) {
      this.propertyName = String(jsonData[AcDDTableFieldProperty.keyPropertyName]);
    }
    if (jsonData.hasOwnProperty(AcDDTableFieldProperty.keyPropertyValue)) {
      this.propertyValue = jsonData[AcDDTableFieldProperty.keyPropertyValue];
    }
  }

  toJson(): { [key: string]: any } {
    return {
      [AcDDTableFieldProperty.keyPropertyName]: this.propertyName,
      [AcDDTableFieldProperty.keyPropertyValue]: this.propertyValue
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}