/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acScrollIntoViewIfHidden } from "../../../../../utils/ac-element-functions";
import { IAcDatagridCell, IAcDatagridColumn, IAcDatagridRow } from "../../../_ac-datagrid.export";
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";

export class AcDatagridKeyboardActionsExtension extends AcDatagridExtension {
  private navigate: boolean = false;

  private handleCellKeyDown(event:KeyboardEvent) {
    if (event && this.datagridApi.activeCell) {
      if (this.navigate && event && event.key) {
        const datagridCell: IAcDatagridCell = this.datagridApi.activeCell;
        const datagridRow: IAcDatagridRow = datagridCell.datagridRow;
        const datagridColumn: IAcDatagridColumn = datagridCell.datagridColumn;
        let newColumnIndex = datagridCell.columnIndex;
        let newRowIndex = datagridCell.rowIndex;
        // switch (event.key) {
        //   case 'ArrowUp':
        //     if (datagridCell.rowIndex > 0) {
        //       newRowIndex--;
        //     }
        //     break;
        //   case 'ArrowDown':
        //     if (!datagridRow.isLast) {
        //       newRowIndex++;
        //     }
        //     break;
        //   case 'ArrowLeft':
        //     if (datagridColumn.isFirst) {
        //       if (!datagridRow.isFirst) {
        //         // newColumnIndex = datagridRow.getLastColumn()!.index;
        //         newRowIndex--;
        //       }
        //     }
        //     else {
        //       // newColumnIndex = datagridColumn.getPreviousColumn()!.index
        //     }
        //     break;
        //   case 'ArrowRight':
        //   case 'Tab':
        //     if (datagridColumn.isLast) {
        //       if (!datagridRow.isLast) {
        //         // newColumnIndex = datagridRow.getFirstColumn()!.index;
        //         newRowIndex++;
        //       }
        //     }
        //     else {
        //       // newColumnIndex = datagridColumn.getNextColumn()!.index
        //     }
        //     break;
        //   default:
        //     return; // Allow other keys (e.g., typing in editable cells)
        // }
        if(newColumnIndex != datagridCell.columnIndex || newRowIndex != datagridCell.rowIndex){
          event.preventDefault();
          this.datagridApi.setActiveCell({rowIndex:newRowIndex,columnIndex:newColumnIndex});
          if(this.datagridApi.activeCell.element){
            acScrollIntoViewIfHidden({element:this.datagridApi.activeCell.element});
          }
        }
      }
    }
  }

  // override handleHook({ hook, args }: { hook: string; args: any; }): void {
  //   if (stringEqualsIgnoreCase(hook, AcEnumDatagridHook.CellKeyDown)) {
  //     this.handleCellKeyUp(args);
  //   }
  //   else if (hook == AcEnumDatagridHook.CellFocus) {
  //     this.navigate = true;
  //   }
  // }

  override init(): void {
    this.datagridApi.datagrid.datagridBody.addEventListener('mouseover',(event:MouseEvent)=>{
      this.navigate = true;
    });
    this.datagridApi.datagrid.datagridBody.addEventListener('mouseenter',(event:MouseEvent)=>{
      this.navigate = true;
    });
    this.datagridApi.datagrid.datagridBody.addEventListener('mouseleave',(event:MouseEvent)=>{
      this.navigate = false;
    });
    this.datagridApi.datagrid.ownerDocument.addEventListener('keydown',(event:KeyboardEvent)=>{
      this.handleCellKeyDown(event);
    });
  }

}

export const AcKeyboardActionsDatagridExtension: IAcDatagridExtension = {
  extensionName: AcEnumDatagridExtension.KeyboardActions,
  extensionClass: AcDatagridKeyboardActionsExtension
}
