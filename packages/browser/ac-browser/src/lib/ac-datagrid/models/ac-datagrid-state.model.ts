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

  @AcBindJsonProperty({ key: AcDatagridState.KeyColumns })
  columns:any[] = [];

  @AcBindJsonProperty({ key: AcDatagridState.KeyExtensionStates })
  extensionStates: Record<string,any> = {};

  @AcBindJsonProperty({ key: AcDatagridState.KeyPagination })
  pagination:any = {};

  @AcBindJsonProperty({ key: AcDatagridState.KeySortOrder })
  sortOrder:any = {};

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

  refresh(){
    this.setColumnsState();
    this.setExtensionsState();
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }

  private setColumnsState(){
    const columns:any[] = [];
    for(const datagridColumn of this.datagridApi.datagridColumns){
      const columnState:any = {
        field:datagridColumn.columnDefinition.field,
        width:datagridColumn.width,
        index:datagridColumn.index,
      };
      columns.push(columnState)
    }
    this.columns = columns;
  }

  private setExtensionsState(){
    const extensions:any = {};
    for(const extensionName of Object.keys(this.datagridApi.extensions)){
      const extensionInstance = this.datagridApi.extensions[extensionName];
      const extensionState = extensionInstance.getState();
      if(extensionState != undefined){
        extensions[extensionName] = extensionState;
      }
    }
    this.extensionStates = extensions;
  }

}
