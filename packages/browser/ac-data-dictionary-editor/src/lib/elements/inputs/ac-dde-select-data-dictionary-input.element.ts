import { AcSelectInput } from '@autocode-ts/ac-browser';
import { AcEnumDDEHook } from '../../enums/ac-enum-dde-hooks.enum';
import { AcDDEApi } from '../../core/ac-dde-api';
export class AcDDESelectDataDictionaryInput{
  selectInput:AcSelectInput = new AcSelectInput();
  editorApi!:AcDDEApi;;

  constructor({editorApi}:{editorApi:AcDDEApi}){
    this.editorApi = editorApi;
    this.selectInput.init();
    this.setOptions();
    this.editorApi.hooks.subscribe({hookName:AcEnumDDEHook.DataLoaded,callback:()=>{
      this.setOptions();
    }})
  }

  setOptions(){
    const options:any[] = [];
    for(const row of Object.values(this.editorApi.dataStorage.dataDictionaries)){
      options.push({'label':row.data_dictionary_name,'value':row.data_dictionary_id});
    }
    this.selectInput.selectOptions = options;
  }

}
