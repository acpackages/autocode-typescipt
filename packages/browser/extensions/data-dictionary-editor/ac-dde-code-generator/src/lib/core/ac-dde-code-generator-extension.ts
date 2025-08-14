/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcDDEExtension, IAcDDEExtension, IAcDDEMenuGroup } from "@autocode-ts/ac-data-dictionary-editor";
import { AcDataDictionaryDartCodeGenerator } from "./ac-data-dictionary-dart-code-generator";

export class AcDDECodeGeneratorExtension extends AcDDEExtension {
  override init(): void {
    const menuGroup:IAcDDEMenuGroup = {
      label:'Code Generator',
      menuItems:[
        {
          label:'Dart Data Dictionary File',
          callback:()=>{
            if(this.editorApi.activeDataDictionary){
              const codeGenerator:AcDataDictionaryDartCodeGenerator = new AcDataDictionaryDartCodeGenerator();
              codeGenerator.dataDictionaryJson = this.editorApi.getDataDictionaryJson({dataDictionaryId:this.editorApi.activeDataDictionary.data_dictionary_id});
              console.log(codeGenerator);
              console.log(codeGenerator.getDataDictionaryString());
            }
          }
        },
        {
          label:'Typescript Data Dictionary File',
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
