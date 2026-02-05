export interface IAcDDEViewColumn {
  columnId:string;
  columnName?:string;
  columnProperties?:any;
  columnSource?:string;
  columnSourceName?:string;
  columnSourceOriginalColumn?:string;
  columnType?:string;
  columnTitle?: string;
  inSearchKey?: boolean;
  isSelectDistinct?: boolean;
  dataDictionaryId:string;
  viewId?:string;
  extensionsData?:any;
}
