import { getAcBindJsonMetadata } from "../annotations/ac-bind-json-property.annotation";

export class AcJsonUtils {
  static getJsonDataFromInstance({ instance }: { instance: any }): Record<string, any> {
    const result: Record<string, any> = {};
    const metadata = getAcBindJsonMetadata(instance);
    for (const key of Object.keys(instance)) {
      const attr = metadata.get(key) || {};
      if (attr.skipInToJson) continue;

      const jsonKey = attr.key || key;
      const value = (instance as any)[key];

      if (value !== undefined && value !== null) {
        result[jsonKey] = this._getJsonForPropertyValue(value);
      }
    }

    return result;
  }

  static _getJsonForPropertyValue(value: any): any {
    if (value === null || typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map(v => this._getJsonForPropertyValue(v));
    }

    if (value instanceof Error) {
      return value.toString();
    }

    if (typeof value === 'object') {
      if (typeof value.toJson === 'function') {
        return value.toJson();
      }
      return this.getJsonDataFromInstance({ instance: value });
    }

    return value.toString();
  }

  static instanceToJson({ instance }: { instance: any }): Record<string, any> {
    if (typeof instance.toJson === 'function') {
      return instance.toJson();
    } else {
      return this.getJsonDataFromInstance({ instance });
    }
  }

  static prettyEncode(object: any): string {
    return JSON.stringify(object, null, 2);
  }

  static setInstancePropertiesFromJsonData({
    instance,
    jsonData,
  }: {
    instance: any;
    jsonData: Record<string, any>;
  }) {
    const metadata = getAcBindJsonMetadata(instance);
    for (const key of Object.keys(instance)) {
      this._setInstancePropertyValueFromJson({
        instance,
        key,
        jsonData,
        attr: metadata.get(key),
      });
    }
  }

  static _setInstancePropertyValueFromJson({
    instance,
    key,
    jsonData,
    attr,
  }: {
    instance: any;
    key: string;
    jsonData: Record<string, any>;
    attr?: {
      key?: string;
      skipInFromJson?: boolean;
      arrayType?: () => new () => any;
    };
  }) {
    const jsonKey = attr?.key || key;
    if (attr?.skipInFromJson) return;

    if (!(jsonKey in jsonData)) return;

    let value = jsonData[jsonKey];
    if (attr?.arrayType && Array.isArray(value)) {
      const typeConstructor = attr.arrayType();
      value = value.map((item: any) => {
        const obj = new typeConstructor();
        this.setInstancePropertiesFromJsonData({
          instance: obj,
          jsonData: item,
        });
        return obj;
      });
    }
    else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const typeConstructor = instance[key]?.constructor;
      if (typeof typeConstructor === 'function' && typeConstructor.name != 'Object') {
        const obj = new typeConstructor();
        this.setInstancePropertiesFromJsonData({
          instance: obj,
          jsonData: value,
        });
        value = obj;
      }
    }
    instance[key] = value;
  }
}
