import { Parser } from "node-sql-parser";
import { AcDDESqlAnalyzerExtension } from "./ac-dde-sql-analyzer-extension";

export interface ColumnSource {
  column: string;
  alias?: string;
  type?: string; // e.g. string, number, function, expr
  sourceType: "table" | "function" | "expression" | "unknown";
  sourceName?: string; // table name, function name, or expr
}

export interface QueryAnalysis {
  sql: string;
  isFinal: boolean;
  tables: string[];
  joins: string[];
  columns: ColumnSource[];
  subQueries: QueryAnalysis[];
  withQueries: Record<string, QueryAnalysis>;
}

export class AcDDESqlAnalyzer {
  private parser: Parser;
  extension:AcDDESqlAnalyzerExtension;

  constructor({extension}:{extension:AcDDESqlAnalyzerExtension}){
      this.extension = extension;
       this.parser = new Parser();
    }


  analyze(sql: string): QueryAnalysis[] {
    const ast = this.parser.astify(sql, { database: "generic", columnOld: true });
    const statements = Array.isArray(ast) ? ast : [ast];

    return statements.map((stmt, idx) =>
      this.analyzeStatement(stmt, sql, idx === statements.length - 1)
    );
  }

  private analyzeStatement(stmt: any, sql: string, isFinal: boolean): QueryAnalysis {
    const tables: string[] = [];
    const joins: string[] = [];
    const columns: ColumnSource[] = [];
    const subQueries: QueryAnalysis[] = [];
    const withQueries: Record<string, QueryAnalysis> = {};

    // WITH queries
    if (stmt.with && stmt.with.expressions) {
      for (const expr of stmt.with.expressions) {
        withQueries[expr.name.value] = this.analyzeStatement(expr.stmt, sql, false);
      }
    }

    // FROM tables and JOINs
    if (stmt.from) {
      for (const f of stmt.from) {
        if (f.table) {
          tables.push(f.table);
        }
        if (f.join) {
          joins.push(f.join.table);
        }
        if (f.expr && f.expr.ast) {
          subQueries.push(this.analyzeStatement(f.expr.ast, sql, false));
        }
      }
    }

    // Columns
    if (stmt.columns) {
      for (const col of stmt.columns) {
        columns.push(this.extractColumnSource(col));
      }
    } else if (stmt.select) {
      for (const col of stmt.select) {
        columns.push(this.extractColumnSource(col));
      }
    }

    return {
      sql,
      isFinal,
      tables,
      joins,
      columns,
      subQueries,
      withQueries,
    };
  }

  private extractColumnSource(col: any): ColumnSource {
    if (!col) return { column: "*", sourceType: "unknown" };

    if (col.expr?.type === "column_ref") {
      return {
        column: col.as || col.expr.column,
        alias: col.as,
        sourceType: "table",
        sourceName: col.expr.table || "unknown",
      };
    }

    if (col.expr?.type === "aggr_func" || col.expr?.type === "function") {
      return {
        column: col.as || `${col.expr.name}()`,
        alias: col.as,
        sourceType: "function",
        sourceName: col.expr.name,
      };
    }

    if (col.expr?.type === "binary_expr") {
      return {
        column: col.as || this.stringifyExpr(col.expr),
        alias: col.as,
        sourceType: "expression",
        sourceName: "binary_expr",
      };
    }

    return {
      column: col.as || "unknown",
      alias: col.as,
      sourceType: "unknown",
    };
  }

  private stringifyExpr(expr: any): string {
    if (!expr) return "";
    if (expr.type === "column_ref") return expr.column;
    if (expr.type === "binary_expr")
      return `${this.stringifyExpr(expr.left)} ${expr.operator} ${this.stringifyExpr(expr.right)}`;
    if (expr.type === "number" || expr.type === "string") return expr.value;
    return expr.type;
  }
}
