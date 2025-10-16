import { AcSelectInput } from '@autocode-ts/ac-browser';
import { AcEnumDDEHook } from '../../enums/ac-enum-dde-hooks.enum';
import { AcDDEApi } from '../../core/ac-dde-api';
export class AcDDESelectDataDictionaryInput{
  selectInput:AcSelectInput = new AcSelectInput();
  editorApi!:AcDDEApi;;
  filter:Function|undefined;

  constructor({editorApi}:{editorApi:AcDDEApi}){
    this.editorApi = editorApi;
    this.setOptions();
    this.editorApi.hooks.subscribe({hook:AcEnumDDEHook.DataDictionarySet,callback:()=>{
      this.setOptions();
    }})
  }

  setOptions({filter}:{filter?:Function}={}){
    const options:any[] = [];
    for(const row of Object.values(this.editorApi.dataStorage.getDataDictionaries({filter:filter}))){
      options.push({'label':row.dataDictionaryName,'value':row.dataDictionaryId});
    }
    this.selectInput.selectOptions = options;
  }

}
