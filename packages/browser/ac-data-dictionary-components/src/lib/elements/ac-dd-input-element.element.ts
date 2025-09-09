import { AcInputBase } from "@autocode-ts/ac-browser";
import { AcDDInputManager } from "../core/ac-dd-input-manager";
import { AcDataDictionary, AcDDTableColumn } from "@autocode-ts/ac-data-dictionary";

export class AcDDInputElement{
  input?:AcInputBase;
  tableName?:string;
  columnName?:string;
  ddTableColumn?:AcDDTableColumn;

  init({tableName,columnName}:{tableName:string,columnName:string}){
    this.tableName = tableName;
    this.columnName = columnName;
    const column = AcDataDictionary.getTableColumn({tableName,columnName});
    if(column){
      this.ddTableColumn = column;
    }
    const inputDefinition = AcDDInputManager.getColumnInputDefinition({tableName,columnName});
    this.input = new inputDefinition.inputClass();
  }
}
