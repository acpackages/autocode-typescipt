import { IAcFunctionInfo } from "./ac-function-info.interface";

export interface IAcColumnReference {
  source: 'table' | 'function' | 'expression' | 'literal' | 'unknown';
  tableAlias: string | null;       // alias that column belongs to (may be null)
  originalTable: string | null;    // resolved base table (if known)
  tableFieldName: string | null;
  queryFieldName: string;          // alias or visible name
  column_index?: number;
  raw: string;
  isStar?: boolean;
  functionUsed?: IAcFunctionInfo | null;
}
