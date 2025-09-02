/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { AcEnumDatagridHook } from "../../../enums/ac-enum-datagrid-hooks.enum";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { IAcDatagridHeaderHookArgs } from "../../../interfaces/hook-args/ac-datagrid-header-hook-args.interface";
import { IAcDatagridRowHookArgs } from "../../../interfaces/hook-args/ac-datagrid-row-hook-args.interface";
import { AcDatagridInternalColumn } from "../../../models/ac-datagrid-internal-column.model";
import { AcDatagridRowNumberCell } from "../elements/ac-row-number-cell.element";
import { AcDatagridRowNumberHeaderCell } from "../elements/ac-row-number-header-cell.element";
import { AcEnumDatagridRowNumbersHook } from "../enums/ac-enum-datagrid-row-numbers-hook.enum";
import { IAcDatagridRowNumbersHookArgs } from "../interfaces/ac-datagrid-row-numbers-hook-args.interface";

export class AcDatagridRowNumbersExtension extends AcDatagridExtension {
  private _showRowNumbers:boolean = true;
  get showRowNumbers():boolean{
    return this._showRowNumbers;
  }
  set showRowNumbers(value:boolean){
    this._showRowNumbers = value;
    const hookArgs:IAcDatagridRowNumbersHookArgs = {
      datagridApi:this.datagridApi,
      datagridRowNumbersExtension:this,
      value:value
    };
    this.datagridApi.hooks.execute({hook:AcEnumDatagridRowNumbersHook.ShowRowNumbersChange,args:hookArgs});
  }

  datagridInternalColumn: AcDatagridInternalColumn = new AcDatagridInternalColumn({
    width:35,
  });

  override handleHook({ hook, args }: { hook: string; args: any; }): void {
    if (hook == AcEnumDatagridHook.BeforeRowCellsCreate) {
      this.handleBeforeRowCellsCreated(args);
    }
    else if (hook == AcEnumDatagridHook.BeforeHeaderColumnCellsCreate) {
      this.handleBeforeHeaderColumnCellsCreated(args);
    }
  }

  handleBeforeHeaderColumnCellsCreated(args: IAcDatagridHeaderHookArgs) {
    const datagridApi = args.datagridApi;
    const datagridHeader = args.datagridHeader;
    const datagriRowNumberCell = new AcDatagridRowNumberHeaderCell({ datagridApi: datagridApi,datagridInternalColumn:this.datagridInternalColumn });
    datagridHeader.headerRowElement.append(datagriRowNumberCell.element);
    // }
  }

  handleBeforeRowCellsCreated(args: IAcDatagridRowHookArgs) {
    const datagridApi = args.datagridApi;
    const datagridRow = args.datagridRow;
    if (datagridRow.instance) {
      const datagriRowNumberCell = new AcDatagridRowNumberCell({ datagridApi: datagridApi, datagridRow: datagridRow,datagridInternalColumn:this.datagridInternalColumn });
      datagridRow.instance.element.append(datagriRowNumberCell.element);
    }
  }

}

export const AcRowNumberDatagridExtension: IAcDatagridExtension = {
  extensionName: AcEnumDatagridExtension.RowNumbers,
  extensionClass: AcDatagridRowNumbersExtension
}
