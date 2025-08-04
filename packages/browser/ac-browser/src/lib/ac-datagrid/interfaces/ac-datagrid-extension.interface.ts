import { AcDatagridExtension } from "../core/ac-datagrid-extension";

export interface IAcDatagridExtension<T extends AcDatagridExtension = AcDatagridExtension> {
  extensionName: string;
  extensionClass: new (...args: any[]) => T;
}
