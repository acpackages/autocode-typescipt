import { AcFilterGroup, AcSortOrder } from "@autocode-ts/autocode";
import { AcRepeaterDataSource } from "./ac-repeater-data-source";
import { IAcRepeaterOnDemandRequestArgs } from "../interfaces/callback-args/ac-repeater-on-demand-request-args.interface";
import { IAcRepeaterOnDemandResponseArgs } from "../interfaces/callback-args/ac-repeater-on-demand-response-args.interface";
import { IAcRepeaterGetOnDemandDataSuccessCallbackHookArgs } from "../interfaces/hook-args/ac-repeater-get-on-demand-data-success-callback-hook-args.interface";
import { AcEnumRepeaterHook } from "../enums/ac-enum-repeater-hooks.enum";
import { IAcRepeaterBeforeGetOnDemandDataHookArgs } from "../interfaces/hook-args/ac-repeater-before-get-on-demand-data-hook-args.interface";
import { IAcRepeaterDataChangeHookArgs } from "../interfaces/hook-args/ac-repeater-data-change-hook-args.interface";
import { AcRepeaterRow } from "../models/ac-repeater-row.model";
import { IAcRepeaterRowHookArgs } from "../interfaces/hook-args/ac-repeater-row-hook-args.interface";


export class AcRepeaterOnDemandDataSource extends AcRepeaterDataSource {
  onDemandFunction?: (args: IAcRepeaterOnDemandRequestArgs) => void;

  override getData({ startIndex = 0, rowsCount = 100 }: { startIndex?: number; rowsCount?: number; } = {}): void {
    if (this.onDemandFunction) {
      const successCallback: Function = (response: IAcRepeaterOnDemandResponseArgs) => {
        const hookArgs: IAcRepeaterGetOnDemandDataSuccessCallbackHookArgs = {
          repeaterApi: this.repeaterApi,
          requestArgs: requestArgs,
          responseArgs: response,
        }
        this.setData({ data: response.data, totalCount: response.totalCount, startIndex: startIndex });
        console.log("Data Set");
        this.repeaterApi.hooks.execute({ hookName: AcEnumRepeaterHook.GetOnDemandDataSuccessCallback, args: hookArgs });
      }
      const requestArgs: IAcRepeaterOnDemandRequestArgs = {
        filterGroup: new AcFilterGroup(),
        rowsCount: rowsCount,
        startIndex: startIndex,
        successCallback: successCallback,
        sortOrder: new AcSortOrder()
      };
      const hookArgs: IAcRepeaterBeforeGetOnDemandDataHookArgs = {
        repeaterApi: this.repeaterApi,
        requestArgs: requestArgs
      }
      this.repeaterApi.hooks.execute({ hookName: AcEnumRepeaterHook.BeforeGetOnDemandData, args: hookArgs });
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
    const hookArgs: IAcRepeaterDataChangeHookArgs = {
      data: data,
      repeaterApi: this.repeaterApi,
      oldData: this.data
    }
    this.repeaterApi.hooks.execute({ hookName: AcEnumRepeaterHook.BeforeDataChange, args: hookArgs });
    this.repeaterRows = [];
    if (startIndex == undefined) {
      startIndex = 0;
    }
    let index: number = startIndex;
    for (const row of data) {
      this.data[index] = row;
      const repeaterRow: AcRepeaterRow = new AcRepeaterRow({
        data: row,
        index: index,
        repeaterApi: this.repeaterApi
      });
      this.repeaterRows.push(repeaterRow);
      const hookArgs: IAcRepeaterRowHookArgs = {
        repeaterApi: this.repeaterApi,
        repeaterRow: repeaterRow,
      };
      this.repeaterApi.hooks.execute({ hookName: AcEnumRepeaterHook.RepeaterRowCreated, args: hookArgs });
      index++;
    }
    this.repeaterApi.hooks.execute({ hookName: AcEnumRepeaterHook.DataChange, args: hookArgs });
    this.allDataAvailable = this.data.filter((item) => { return item == undefined }).length == 0;
    this.totalRows = totalCount;
    this.processData();
  }
}
