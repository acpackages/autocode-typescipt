/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acScrollIntoViewIfHidden } from "../../../../../utils/ac-element-functions";
import { AcDatagridCell, AcDatagridColumn, AcDatagridRow } from "../../../_ac-datagrid.export";
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";

export class AcDatagridKeyboardActionsExtension extends AcDatagridExtension {
  private navigate: boolean = false;

  private handleCellKeyDown(event:KeyboardEvent) {
    if (event && this.datagridApi.activeCell) {
      // const KEY_A = "A";
      // const KEY_C = "C";
      // const KEY_V = "V";
      // const KEY_D = "D";
      // const KEY_PAGE_UP = "PageUp";
      // const KEY_PAGE_DOWN = "PageDown";
      // const KEY_TAB = "Tab";
      // const KEY_LEFT = "ArrowLeft";
      // const KEY_UP = "ArrowUp";
      // const KEY_RIGHT = "ArrowRight";
      // const KEY_DOWN = "ArrowDown";
      // const KEY_F2 = "F2";
      // const KEY_BACKSPACE = "Backspace";
      // const KEY_ESCAPE = "Escape";
      // const KEY_SPACE = " ";
      // const KEY_DELETE = "Delete";
      // const KEY_PAGE_HOME = "Home";
      // const KEY_PAGE_END = "End";
      // const key = event.key;
      // let keysToSuppress = [
      //   KEY_PAGE_UP,
      //   KEY_PAGE_DOWN,
      //   KEY_TAB,
      //   KEY_F2,
      //   KEY_ESCAPE,
      // ];

      // const editingKeys = [
      //   KEY_LEFT,
      //   KEY_RIGHT,
      //   KEY_UP,
      //   KEY_DOWN,
      //   KEY_BACKSPACE,
      //   KEY_DELETE,
      //   KEY_SPACE,
      //   KEY_PAGE_HOME,
      //   KEY_PAGE_END,
      // ];

      // if (event.ctrlKey || event.metaKey) {
      //   keysToSuppress.push(KEY_A);
      //   keysToSuppress.push(KEY_V);
      //   keysToSuppress.push(KEY_C);
      //   keysToSuppress.push(KEY_D);
      // }

      // if (this.navigate) {
      //   keysToSuppress = keysToSuppress.concat(editingKeys);
      // }

      // const isNavigationKey = keysToSuppress.some(function (suppressedKey) {
      //   return suppressedKey === key || key.toUpperCase() === suppressedKey;
      // });

      // if (this.navigate && !isNavigationKey) {
      //   this.navigate = false;
      // }
      if (this.navigate && event && event.key) {
        const datagridCell: AcDatagridCell = this.datagridApi.activeCell;
        const datagridRow: AcDatagridRow = datagridCell.datagridRow;
        const datagridColumn: AcDatagridColumn = datagridCell.datagridColumn;
        let newColumnIndex = datagridCell.columnIndex;
        let newRowIndex = datagridCell.rowIndex;
        switch (event.key) {
          case 'ArrowUp':
            if (datagridCell.rowIndex > 0) {
              newRowIndex--;
            }
            break;
          case 'ArrowDown':
            if (!datagridRow.isLast) {
              newRowIndex++;
            }
            break;
          case 'ArrowLeft':
            if (datagridColumn.isFirst) {
              if (!datagridRow.isFirst) {
                newColumnIndex = datagridRow.getLastColumn()!.index;
                newRowIndex--;
              }
            }
            else {
              newColumnIndex = datagridColumn.getPreviousColumn()!.index
            }
            break;
          case 'ArrowRight':
          case 'Tab':
            if (datagridColumn.isLast) {
              if (!datagridRow.isLast) {
                newColumnIndex = datagridRow.getFirstColumn()!.index;
                newRowIndex++;
              }
            }
            else {
              newColumnIndex = datagridColumn.getNextColumn()!.index
            }
            break;
          default:
            return; // Allow other keys (e.g., typing in editable cells)
        }
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
