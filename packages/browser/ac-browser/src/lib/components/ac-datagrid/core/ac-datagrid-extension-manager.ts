/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcAfterRowsFooterDatagridExtension, AcAutoAddNewRowDatagridExtension, AcColumnDraggingDatagridExtension, AcColumnsCustomizerDatagridExtension, AcDataExportXlsxDatagridExtension } from "../_ac-datagrid.export";
import { AcKeyboardActionsDatagridExtension } from "../extensions/keyboard-actions/core/ac-datagrid-keyboard-actions-extension";
import { AcRowDraggingDatagridExtension } from "../extensions/row-dragging/core/ac-datagrid-row-dragging-extension";
import { AcRowNumberDatagridExtension } from "../extensions/row-numbers/core/ac-datagrid-row-numbers-extension";
import { AcRowSelectionDatagridExtension } from "../extensions/row-selection/core/ac-datagrid-row-selection-extension";
import { AcTreeTableDatagridExtension } from "../extensions/tree-table/core/ac-datagrid-tree-table-extension";
import { IAcDatagridExtension } from "../interfaces/ac-datagrid-extension.interface";
import { AcDatagridExtension } from "./ac-datagrid-extension";

export class AcDatagridExtensionManager {
  private static builtInExtensionsRegistered:boolean = false;
  private static extensions: Record<string, IAcDatagridExtension<any>> = {};

  static hasExtension({extensionName}:{extensionName:string}):boolean {
    return this.extensions[extensionName] != undefined;
  }

  static register<T extends AcDatagridExtension>(ext: IAcDatagridExtension<T>): void {
    if (this.extensions[ext.extensionName]) {
      console.warn(`Extension ${ext.extensionName} is already registered. Overwriting.`);
    }
    this.extensions[ext.extensionName] = ext;
  }

  static createInstance<T extends AcDatagridExtension = AcDatagridExtension>({extensionName}:{extensionName:string}): T | null {
    const entry = this.extensions[extensionName];
    if (!entry) return null;
    return new entry.extensionClass();
  }

  static registerBuiltInExtensions(){
    if(!this.builtInExtensionsRegistered){
      AcDatagridExtensionManager.register(AcAfterRowsFooterDatagridExtension);
      AcDatagridExtensionManager.register(AcAutoAddNewRowDatagridExtension);
      AcDatagridExtensionManager.register(AcColumnsCustomizerDatagridExtension);
      AcDatagridExtensionManager.register(AcColumnDraggingDatagridExtension);
      AcDatagridExtensionManager.register(AcDataExportXlsxDatagridExtension);
      AcDatagridExtensionManager.register(AcKeyboardActionsDatagridExtension);
      AcDatagridExtensionManager.register(AcRowDraggingDatagridExtension);
      AcDatagridExtensionManager.register(AcRowNumberDatagridExtension);
      AcDatagridExtensionManager.register(AcRowSelectionDatagridExtension);
      AcDatagridExtensionManager.register(AcTreeTableDatagridExtension);
      this.builtInExtensionsRegistered = true;
    }
  }
}
