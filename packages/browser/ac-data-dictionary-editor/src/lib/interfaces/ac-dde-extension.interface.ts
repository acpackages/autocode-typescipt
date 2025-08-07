import { AcDDEExtension } from "../core/ac-dde-extension";

export interface IAcDDEExtension<T extends AcDDEExtension = AcDDEExtension> {
  extensionName: string;
  extensionClass: new (...args: any[]) => T;
}
