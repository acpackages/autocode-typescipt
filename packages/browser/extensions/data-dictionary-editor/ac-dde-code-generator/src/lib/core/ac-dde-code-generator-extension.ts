/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcDDEExtension, IAcDDEExtension, IAcDDEMenuGroup } from "@autocode-ts/ac-data-dictionary-editor";
import { AcDataDictionaryDartCodeGenerator } from "./ac-data-dictionary-dart-code-generator";
import { AcBrowser } from "@autocode-ts/ac-browser";
import { AcDataDictionaryTypescriptCodeGenerator } from "./ac-data-dictionary-typescript-code-generator";

export class AcDDECodeGeneratorExtension extends AcDDEExtension {
  override init(): void {
    const menuGroup:IAcDDEMenuGroup = {
      label:'Code Generator',
      menuItems:[
        {
          label:'Dart Data Dictionary',
          callback:()=>{
            if(this.editorApi.activeDataDictionary){
              const codeGenerator:AcDataDictionaryDartCodeGenerator = new AcDataDictionaryDartCodeGenerator();
              codeGenerator.dataDictionaryJson = this.editorApi.getDataDictionaryJson({dataDictionaryId:this.editorApi.activeDataDictionary.dataDictionaryId!});
              AcBrowser.downloadFile({content:codeGenerator.getDataDictionaryString(),filename:'data_dictionary.dart'});
            }
          }
        },
        {
          label:'Typescript Data Dictionary',
          callback:()=>{
            if(this.editorApi.activeDataDictionary){
              const codeGenerator:AcDataDictionaryTypescriptCodeGenerator = new AcDataDictionaryTypescriptCodeGenerator();
              codeGenerator.dataDictionaryJson = this.editorApi.getDataDictionaryJson({dataDictionaryId:this.editorApi.activeDataDictionary.dataDictionaryId!});
              AcBrowser.downloadFile({content:codeGenerator.getDataDictionaryString(),filename:'data_dictionary.ts'});
            }
          }
        },
      ]
    }
    this.editorApi.addMenuGroup({menuGroup:menuGroup});
  }


}

export const AcCodeGeneratorDDEExtension: IAcDDEExtension = {
  extensionName: 'browserStorageExtension',
  extensionClass: AcDDECodeGeneratorExtension
}
