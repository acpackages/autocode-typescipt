import { AcDDESqlAnalyzerExtension } from "./ac-dde-sql-analyzer-extension";
import { Parser } from 'node-sql-parser';

export type ColumnSourceType = 'table' | 'alias' | 'function' | 'expression';

export interface ColumnDetail {
  columnName: string;            // Final output column name
  sourceType: ColumnSourceType;  // Where the column originates from
  sourceName?: string;           // Table name, alias, or function name
  expression?: string;           // Raw SQL expression if not direct column
  dataType?: string;             // Inferred type (best effort, optional)
}

export interface QueryAnalysisResult {
  columns: ColumnDetail[];
  tables: string[];
}

export class AcDDESqlAnalyzer{
  extension:AcDDESqlAnalyzerExtension;
   private parser: Parser = new Parser();;
  constructor({extension}:{extension:AcDDESqlAnalyzerExtension}){
    this.extension = extension;
  }

  analyze(sql: string): QueryAnalysisResult {
    const ast = this.parser.astify(sql);

    const result: QueryAnalysisResult = {
      columns: [],
      tables: [],
    };

    if (Array.isArray(ast)) {
      throw new Error('Multiple statements not supported in this example.');
    }

    if (ast.type !== 'select') {
      throw new Error('Only SELECT statements are supported.');
    }

    // Collect tables
    if (ast.from) {
      for (const tbl of ast.from as any) {
        if (tbl.db) {
          result.tables.push(`${tbl.db}.${tbl.table}`);
        } else {
          result.tables.push(tbl.table);
        }
      }
    }

    // Collect columns
    for (const col of ast.columns) {
      if (col.expr.type === 'column_ref') {
        result.columns.push({
          columnName: col.as || col.expr.column,
          sourceType: 'table',
          sourceName: col.expr.table || undefined,
          expression: col.expr.column,
        });
      } else if (col.expr.type === 'aggr_func') {
        result.columns.push({
          columnName: col.as || `${col.expr.name}(${col.expr.args.expr.column || '*'})`,
          sourceType: 'function',
          sourceName: col.expr.name,
          expression: this.parser.sqlify(col.expr),
        });
      } else if (col.expr.type === 'binary_expr') {
        result.columns.push({
          columnName: col.as || this.parser.sqlify(col.expr),
          sourceType: 'expression',
          expression: this.parser.sqlify(col.expr),
        });
      } else {
        result.columns.push({
          columnName: col.as || this.parser.sqlify(col.expr),
          sourceType: 'expression',
          expression: this.parser.sqlify(col.expr),
        });
      }
    }

    return result;
  }
}
