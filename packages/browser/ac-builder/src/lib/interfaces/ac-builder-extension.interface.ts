import { AcBuilderExtension } from "../core/ac-builder-extension";

export interface IAcBuilderExtension<T extends AcBuilderExtension = AcBuilderExtension> {
  extensionName: string;
  extensionClass: new (...args: any[]) => T;
}
