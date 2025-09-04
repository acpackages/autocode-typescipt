/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IAcDatagridCellEvent } from "../../../_ac-datagrid.export";
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { AcEnumDatagridHook } from "../../../enums/ac-enum-datagrid-hooks.enum";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";

export class AcDatagridKeyboardNavigationExtension extends AcDatagridExtension {
  private navigate: boolean = true;

  private handleCellKeyUp(args: IAcDatagridCellEvent) {
    if (args.event) {
      const event: KeyboardEvent = args.event;
      const KEY_A = "A";
      const KEY_C = "C";
      const KEY_V = "V";
      const KEY_D = "D";
      const KEY_PAGE_UP = "PageUp";
      const KEY_PAGE_DOWN = "PageDown";
      const KEY_TAB = "Tab";
      const KEY_LEFT = "ArrowLeft";
      const KEY_UP = "ArrowUp";
      const KEY_RIGHT = "ArrowRight";
      const KEY_DOWN = "ArrowDown";
      const KEY_F2 = "F2";
      const KEY_BACKSPACE = "Backspace";
      const KEY_ESCAPE = "Escape";
      const KEY_SPACE = " ";
      const KEY_DELETE = "Delete";
      const KEY_PAGE_HOME = "Home";
      const KEY_PAGE_END = "End";
      const key = event.key;
      let keysToSuppress = [
        KEY_PAGE_UP,
        KEY_PAGE_DOWN,
        KEY_TAB,
        KEY_F2,
        KEY_ESCAPE,
      ];

      const editingKeys = [
        KEY_LEFT,
        KEY_RIGHT,
        KEY_UP,
        KEY_DOWN,
        KEY_BACKSPACE,
        KEY_DELETE,
        KEY_SPACE,
        KEY_PAGE_HOME,
        KEY_PAGE_END,
      ];

      if (event.ctrlKey || event.metaKey) {
        keysToSuppress.push(KEY_A);
        keysToSuppress.push(KEY_V);
        keysToSuppress.push(KEY_C);
        keysToSuppress.push(KEY_D);
      }

      if (this.navigate) {
        keysToSuppress = keysToSuppress.concat(editingKeys);
      }

      const isNavigationKey = keysToSuppress.some(function (suppressedKey) {
        return suppressedKey === key || key.toUpperCase() === suppressedKey;
      });

      if (this.navigate && !isNavigationKey) {
        this.navigate = false;
      }
      else if(this.navigate && isNavigationKey){
        // this.datagridApi.fo
      }
    }
  }

  override handleHook({ hook, args }: { hook: string; args: any; }): void {
      if(hook == AcEnumDatagridHook.CellKeyUp) {
      this.handleCellKeyUp(args);
    }
    else if (hook == AcEnumDatagridHook.CellFocus) {
      this.navigate = true;
    }
  }

}

export const AcKeyboardNavigationDatagridExtension: IAcDatagridExtension = {
  extensionName: AcEnumDatagridExtension.KeyboardNavigation,
  extensionClass: AcDatagridKeyboardNavigationExtension
}
