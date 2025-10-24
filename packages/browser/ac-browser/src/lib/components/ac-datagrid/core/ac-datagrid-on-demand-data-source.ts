import { AcFilterGroup, AcSortOrder } from "@autocode-ts/autocode";
import { AcDatagridRow, AcEnumDatagridHook, IAcDatagridDataChangeHookArgs, IAcDatagridGetOnDemandDataSuccessCallbackHookArgs, IAcDatagridRowHookArgs } from "../_ac-datagrid.export";
import { AcDatagridDataSource } from "./ac-datagrid-data-source";
import { IAcDatagridBeforeGetOnDemandDataHookArgs } from "../interfaces/hook-args/ac-datagrid-before-get-on-demand-data-hook-args.interface";
import { IAcOnDemandRequestArgs, IAcOnDemandResponseArgs } from "../../../data-source/interfaces/_interfaces.export";

export class AcDatagridOnDemandDataSource extends AcDatagridDataSource {
  onDemandFunction?: (args: IAcOnDemandRequestArgs) => void;

  override getData({ startIndex = 0, rowsCount = 100 }: { startIndex?: number; rowsCount?: number; } = {}): void {
    if (this.onDemandFunction) {
      const successCallback: Function = (response: IAcOnDemandResponseArgs) => {
        const hookArgs: IAcDatagridGetOnDemandDataSuccessCallbackHookArgs = {
          datagridApi: this.datagridApi,
          requestArgs: requestArgs,
          responseArgs: response,
        }
        this.setData({ data: response.data, totalCount: response.totalCount, startIndex: startIndex });
        this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.GetOnDemandDataSuccessCallback, args: hookArgs });
      }
      const requestArgs: IAcOnDemandRequestArgs = {
        filterGroup: new AcFilterGroup(),
        rowsCount: rowsCount,
        startIndex: startIndex,
        successCallback: successCallback,
        sortOrder: new AcSortOrder()
      };
      const hookArgs: IAcDatagridBeforeGetOnDemandDataHookArgs = {
        datagridApi: this.datagridApi,
        requestArgs: requestArgs
      }
      this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.BeforeGetOnDemandData, args: hookArgs });
      this.onDemandFunction(requestArgs);
    }
  }

  override setData({ data, startIndex, totalCount }: { data: any[]; startIndex?: number; totalCount?: number; }): void {
    if (totalCount == undefined) {
      totalCount = data.length;
    }
    if (this.data.length < totalCount) {
      this.data = new Array(totalCount).fill(undefined);
    }
    const hookArgs: IAcDatagridDataChangeHookArgs = {
      data: data,
      datagridApi: this.datagridApi,
      oldData: this.data
    }
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.BeforeDataChange, args: hookArgs });
    this.datagridRows = [];
    if (startIndex == undefined) {
      startIndex = 0;
    }
    let index: number = startIndex;
    for (const row of data) {
      this.data[index] = row;
      const datagridRow: AcDatagridRow = new AcDatagridRow({
        data: row,
        index: index,
        datagridApi: this.datagridApi
      });
      this.datagridRows.push(datagridRow);
      const hookArgs: IAcDatagridRowHookArgs = {
        datagridApi: this.datagridApi,
        datagridRow: datagridRow,
      };
      this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.DatagridRowCreate, args: hookArgs });
      index++;
    }
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.DataChange, args: hookArgs });
    this.allDataAvailable = this.data.filter((item) => { return item == undefined }).length == 0;
    this.totalRows = totalCount;
    this.processData();
  }
}
