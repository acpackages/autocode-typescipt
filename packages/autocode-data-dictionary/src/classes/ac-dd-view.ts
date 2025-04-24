import { AcDataDictionary } from "./ac-data-dictionary";
import { AcDDViewField } from "./ac-dd-view-field";

export class AcDDView {
  static readonly keyViewName = "view_name";
  static readonly keyViewFields = "view_fields";
  static readonly keyViewQuery = "view_query";

  viewName: string = "";
  viewQuery: string = "";
  viewFields: { [key: string]: AcDDViewField } = {}

  static fromJson(jsonData: { [key: string]: any }): AcDDView {
    const instance = new AcDDView();
    instance.setValuesFromJson(jsonData);
    return instance;
  }

  static getInstance({ viewName, dataDictionaryName = "default" }: { viewName: string; dataDictionaryName?: string; }): AcDDView {
    let result: AcDDView = new AcDDView();
    let acDataDictionary: AcDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName: dataDictionaryName });
    if (acDataDictionary.views[viewName]) {
      result.setValuesFromJson(acDataDictionary.views[viewName]);
    }
    return result;
  }

  setValuesFromJson(jsonData: { [key: string]: any } = {}): void {
    if (jsonData.hasOwnProperty(AcDDView.keyViewName)) {
      this.viewName = String(jsonData[AcDDView.keyViewName]);
    }
    if (jsonData.hasOwnProperty(AcDDView.keyViewQuery)) {
      this.viewQuery = String(jsonData[AcDDView.keyViewQuery]);
    }
  }

  toJson(): { [key: string]: any } {
    return {
      [AcDDView.keyViewName]: this.viewName,
      [AcDDView.keyViewQuery]: this.viewQuery
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}