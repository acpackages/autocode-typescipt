/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcBrowser } from "@autocode-ts/ac-browser";
import { IAcDDEMenuGroup } from "../../../_ac-data-dictionary-editor.export";
import { AcDDEExtension } from "../../../core/ac-dde-extension";
import { AcEnumDDEExtension } from "../../../enums/ac-enum-dde-extension.enum";
import { IAcDDEExtension } from "../../../interfaces/ac-dde-extension.interface";

export class AcDDEImportExportExtension extends AcDDEExtension {
  override init(): void {
    const menuGroup:IAcDDEMenuGroup = {
      label:'Import/Export',
      menuItems:[
        {label:'Download JSON',callback:()=>{
          if(this.editorApi.activeDataDictionary){
            AcBrowser.downloadJsonObjectAsFile({data:this.editorApi.getDataDictionaryJson({dataDictionaryId:this.editorApi.activeDataDictionary.data_dictionary_id}),filename:'data_dictionary.json'});
          }
        }}
      ]
    }
    this.editorApi.addMenuGroup({menuGroup:menuGroup});
  }
}

export const AcImportExportDDEExtension: IAcDDEExtension = {
  extensionName: AcEnumDDEExtension.ImportExport,
  extensionClass: AcDDEImportExportExtension
}
