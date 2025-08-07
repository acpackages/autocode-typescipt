/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { AcDatagridApi } from "../_ac-datagrid.export";

export class AcDatagridState {
  static readonly KeyColumns = "columns";
  static readonly KeyExtensionStates = "extension_states";
  static readonly KeyPagination = "pagination";
  static readonly KeySortOrder = "sort_order";

  @AcBindJsonProperty({ skipInToJson:true,skipInFromJson:true })
  datagridApi!:AcDatagridApi;

  @AcBindJsonProperty({ key: AcDatagridState.KeyExtensionStates })
  extensionStates: Record<string,any> = {};

  columns:any = {};
  pagination:any = {};
  sortOrder:any = {};
  value: any;

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDatagridState {
    const instance = new AcDatagridState();
    instance.fromJson({ jsonData });
    return instance;
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({
      instance: this,
      jsonData,
    });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }

}
