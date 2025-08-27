import { AcSqlParser } from "@autocode-ts/ac-sql-parser";
import { AcDDESqlAnalyzerExtension } from "./ac-dde-sql-analyzer-extension";
import { AcDDEApi, AcDDEDataStorage } from "../../../_ac-data-dictionary-editor.export";

export class AcDDESqlAnalyzer {
  dataStorage:AcDDEDataStorage;
  editorApi:AcDDEApi;
  extension: AcDDESqlAnalyzerExtension;
  parser: AcSqlParser;

  constructor({ extension }: { extension: AcDDESqlAnalyzerExtension }) {
    this.extension = extension;
    this.editorApi = extension.editorApi;
    this.dataStorage = this.editorApi.dataStorage;
    this.parser = new AcSqlParser();
  }

  clearViewColumns({viewName,dataDictionaryId}:{viewName:string,dataDictionaryId?:string}){
    if(dataDictionaryId == undefined){
      if(this.editorApi.activeDataDictionary){
        dataDictionaryId = this.editorApi.activeDataDictionary.dataDictionaryId;
      }
    }
    const viewRows = this.dataStorage.getViews({viewName:viewName,dataDictionaryId:dataDictionaryId});
    if(viewRows.length > 0){
      const view = viewRows[0];
      const viewColumns = this.dataStorage.getViewColumns({viewId:view.viewId});
      for(const column of viewColumns){
        this.dataStorage.deleteViewColumn({columnId:column.columnId})
      }
    }
  }
}
