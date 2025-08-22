import { AcRepeaterExtension } from "../core/ac-repeater-extension";

export interface IAcRepeaterExtension<T extends AcRepeaterExtension = AcRepeaterExtension> {
  extensionName: string;
  extensionClass: new (...args: any[]) => T;
}
