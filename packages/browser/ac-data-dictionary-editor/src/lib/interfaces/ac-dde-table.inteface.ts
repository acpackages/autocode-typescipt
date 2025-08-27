export interface IAcDDETable {
  additionalFilterColumns?:string,
  dataDictionaryId:string;
  index?:number,
  orderBy?:string,
  pluralName?:string,
  selectQuery?:string,
  selectQueryColumns?:string,
  selectRequestColumns?:string,
  singularName?:string,
  viewId?:string,
  tableId:string;
  tableName?:string;
  tableProperties?:any;
  extensionsData?:any;
}
