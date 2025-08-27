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
            AcBrowser.downloadJsonObjectAsFile({data:this.editorApi.getDataDictionaryJson({dataDictionaryId:this.editorApi.activeDataDictionary.dataDictionaryId}),filename:'data_dictionary.json'});
          }
        }},
        {label:'Import JSON',callback:async ()=>{
          const files = await AcBrowser.pickFiles({accept:'.json'});
          if(files.length > 0){
            const jsonString = await files[0].text();
            try{
              const dataDictionaryJson = JSON.parse(jsonString);
              this.editorApi.setDataDictionaryJson({dataDictionaryJson:dataDictionaryJson});
            }
            catch(ex){
              alert("Error parsing json");
            }
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
