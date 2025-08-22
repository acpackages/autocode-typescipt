/* eslint-disable @typescript-eslint/no-inferrable-types */

import { IAcRepeaterExtension } from "../interfaces/ac-repeater-extension.interface";
import { AcRepeaterExtension } from "./ac-repeater-extension";

export class AcRepeaterExtensionManager {
  private static builtInExtensionsRegistered:boolean = false;
  private static extensions: Record<string, IAcRepeaterExtension<any>> = {};

  static hasExtension({extensionName}:{extensionName:string}):boolean {
    return this.extensions[extensionName] != undefined;
  }

  static register<T extends AcRepeaterExtension>(ext: IAcRepeaterExtension<T>): void {
    if (this.extensions[ext.extensionName]) {
      console.warn(`Extension ${ext.extensionName} is already registered. Overwriting.`);
    }
    this.extensions[ext.extensionName] = ext;
  }

  static createInstance<T extends AcRepeaterExtension = AcRepeaterExtension>({extensionName}:{extensionName:string}): T | null {
    const entry = this.extensions[extensionName];
    if (!entry) return null;
    return new entry.extensionClass();
  }

  static registerBuiltInExtensions(){
    if(!this.builtInExtensionsRegistered){
      this.builtInExtensionsRegistered = true;
    }
  }
}
