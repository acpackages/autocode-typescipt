/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IAcBuilderExtension } from "../interfaces/ac-builder-extension.interface";
import { AcBuilderExtension } from "./ac-builder-extension";

export class AcBuilderExtensionManager {
  private static builtInExtensionsRegistered:boolean = false;
  private static extensions: Record<string, IAcBuilderExtension<any>> = {};

  static hasExtension({extensionName}:{extensionName:string}):boolean {
    return this.extensions[extensionName] != undefined;
  }

  static register<T extends AcBuilderExtension>(ext: IAcBuilderExtension<T>): void {
    if (this.extensions[ext.extensionName]) {
      console.warn(`Extension ${ext.extensionName} is already registered. Overwriting.`);
    }
    this.extensions[ext.extensionName] = ext;
  }

  static createInstance<T extends AcBuilderExtension = AcBuilderExtension>({extensionName}:{extensionName:string}): T | null {
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
