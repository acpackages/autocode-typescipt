export interface IAcDDETableColumn {
  autoIncrement?: boolean;
  autoNumberLength?: number;
  autoNumberPrefix?: string;
  checkInAutoNumber?: boolean;
  checkInModify?: boolean;
  checkInSave?: boolean;
  columnId: string;
  columnName?: string;
  columnProperties?: any;
  columnTitle?: string;
  columnType?: any;
  dataDictionaryId: string;
  defaultValue?: any;
  foreignKey?: boolean;
  format?: any;
  inSearchKey?: boolean;
  isSelectDistinct?: boolean;
  notNull?: boolean;
  primaryKey?: boolean;
  remarks?: string;
  required?: boolean;
  options?: any;
  setNullBefore_delete?: boolean;
  size?: number;
  tableId?: string;
  uniqueKey?: boolean;
  extensionsData?:any;
}
