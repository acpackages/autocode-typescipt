export class AcDDTableProperty {
  static readonly keyPropertyName = "property_name";
  static readonly keyPropertyValue = "property_value";

  propertyName: string = "";
  propertyValue: any = null;

  static fromJson(jsonData: { [key: string]: any }): AcDDTableProperty {
    const instance = new AcDDTableProperty();
    instance.setValuesFromJson(jsonData);
    return instance;
  }

  setValuesFromJson(jsonData: { [key: string]: any } = {}): void {
    if (jsonData.hasOwnProperty(AcDDTableProperty.keyPropertyName)) {
      this.propertyName = String(jsonData[AcDDTableProperty.keyPropertyName]);
    }
    if (jsonData.hasOwnProperty(AcDDTableProperty.keyPropertyValue)) {
      this.propertyValue = jsonData[AcDDTableProperty.keyPropertyValue];
    }
  }

  toJson(): { [key: string]: any } {
    return {
      [AcDDTableProperty.keyPropertyName]: this.propertyName,
      [AcDDTableProperty.keyPropertyValue]: this.propertyValue
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}