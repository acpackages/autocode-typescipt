/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcDDEExtension, IAcDDEExtension, IAcDDEMenuGroup } from "@autocode-ts/ac-data-dictionary-editor";

export class AcDDECodeGeneratorExtension extends AcDDEExtension {
  override init(): void {
    const menuGroup:IAcDDEMenuGroup = {
      label:'Code Generator',
      menuItems:[
        {
          label:'Dart File',
          callback:()=>{
            if(this.editorApi.activeDataDictionary){
              console.log(this.editorApi.getDataDictionaryJson({dataDictionaryId:this.editorApi.activeDataDictionary.data_dictionary_id}));
            }
          }
        },
        {
          label:'Typescript File',
          callback:()=>{
            if(this.editorApi.activeDataDictionary){
              console.log(this.editorApi.getDataDictionaryJson({dataDictionaryId:this.editorApi.activeDataDictionary.data_dictionary_id}));
            }
          }
        },
      ]
    }
    this.editorApi.addMenuGroup({menuGroup:menuGroup});
  }

}

export const AcCodeGeneratorDDEExtension: IAcDDEExtension = {
  extensionName: 'codeGeneratorExtension',
  extensionClass: AcDDECodeGeneratorExtension
}
