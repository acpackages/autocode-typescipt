import { IAcColumnReference } from "./ac-column-reference.interface";
import { IAcCteDefinition } from "./ac-cte-definition.interface";
import { IAcFunctionInfo } from "./ac-function-info.interface";
import { IAcJoinInfo } from "./ac-join-info.interface";
import { IAcOutputColumn } from "./ac-output-column.interface";
import { IAcTableReference } from "./ac-table-reference.interface";

export interface IAcSqlParseResult {
  sql: string;
  ctes: IAcCteDefinition[];
  finalStatement: string;
  tablesUsed: IAcTableReference[];
  joins: IAcJoinInfo[];
  columns: IAcOutputColumn[];
  columnsUsed: IAcColumnReference[];
  functions: IAcFunctionInfo[];
  subQueries: string[];
  setOperators: { op: string; leftSql: string; rightSql: string }[];
}
