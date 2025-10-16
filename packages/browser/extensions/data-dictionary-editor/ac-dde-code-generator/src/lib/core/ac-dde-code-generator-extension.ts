/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcDDEExtension, IAcDDEExtension, IAcDDEMenuGroup } from "@autocode-ts/ac-data-dictionary-editor";
import { AcDataDictionaryDartCodeGenerator } from "./ac-data-dictionary-dart-code-generator";
import { AcBrowser } from "@autocode-ts/ac-browser";
import { AcDataDictionaryTypescriptCodeGenerator } from "./ac-data-dictionary-typescript-code-generator";

export class AcDDECodeGeneratorExtension extends AcDDEExtension {
  override init(): void {
    const menuGroup:IAcDDEMenuGroup = {
      label:'Code Generator',
      iconClass:'aci-code-tag',
      menuItems:[
        {
          label:'Dart Data Dictionary',
          iconClass:'aci-dart-lang',
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
          iconClass:'aci-typescript',
          callback:()=>{
            if(this.editorApi.activeDataDictionary){
              const codeGenerator:AcDataDictionaryTypescriptCodeGenerator = new AcDataDictionaryTypescriptCodeGenerator();
              codeGenerator.dataDictionaryJson = this.editorApi.getDataDictionaryJson({dataDictionaryId:this.editorApi.activeDataDictionary.dataDictionaryId!});
              AcBrowser.downloadFile({content:codeGenerator.getDataDictionaryString(),filename:'data_dictionary.ts'});
            }
          }
        },
        {
          label:'Dart Keys',
          iconClass:'aci-dart-lang',
          callback:()=>{
            if(this.editorApi.activeDataDictionary){
              const codeGenerator:AcDataDictionaryDartCodeGenerator = new AcDataDictionaryDartCodeGenerator();
              codeGenerator.dataDictionaryJson = this.editorApi.getDataDictionaryJson({dataDictionaryId:this.editorApi.activeDataDictionary.dataDictionaryId!});
              AcBrowser.downloadFile({content:codeGenerator.getDDKeysString(),filename:'data_dictionary_keys.dart'});
            }
          }
        },
        {
          label:'Typescript Keys',
          iconClass:'aci-typescript',
          callback:()=>{
            if(this.editorApi.activeDataDictionary){
              const codeGenerator:AcDataDictionaryDartCodeGenerator = new AcDataDictionaryDartCodeGenerator();
              codeGenerator.dataDictionaryJson = this.editorApi.getDataDictionaryJson({dataDictionaryId:this.editorApi.activeDataDictionary.dataDictionaryId!});
              AcBrowser.downloadFile({content:codeGenerator.getDDKeysString(),filename:'data_dictionary_keys.ts'});
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
