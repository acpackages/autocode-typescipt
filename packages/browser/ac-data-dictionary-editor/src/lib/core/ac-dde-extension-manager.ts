/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IAcDDEExtension } from "../interfaces/ac-dde-extension.interface";
import { AcDDEExtension } from "./ac-dde-extension";


export class AcDDEExtensionManager {
  private static builtInExtensionsRegistered:boolean = false;
  private static extensions: Record<string, IAcDDEExtension<any>> = {};

  static hasExtension({extensionName}:{extensionName:string}):boolean {
    return this.extensions[extensionName] != undefined;
  }

  static register<T extends AcDDEExtension>(ext: IAcDDEExtension<T>): void {
    if (this.extensions[ext.extensionName]) {
      console.warn(`Extension ${ext.extensionName} is already registered. Overwriting.`);
    }
    this.extensions[ext.extensionName] = ext;
  }

  static createInstance<T extends AcDDEExtension = AcDDEExtension>({extensionName}:{extensionName:string}): T | null {
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
