export interface IAcTableReference {
  originalName: string | null;   // base table name (if not derived)
  alias: string | null;          // alias used in FROM
  isSubquery: boolean;
  subquerySql?: string;          // text of subquery (for derived tables)
  raw: string;
  projectedColumns?: string[];   // columns produced by derived-table (populated after parsing subquery)
}
