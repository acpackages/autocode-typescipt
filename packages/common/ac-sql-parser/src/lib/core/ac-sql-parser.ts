import { AcEvents } from '@autocode-ts/autocode';
import { extractAlias, findMatchingParen, findTopLevelKeyword, normalizeSpaces, parseFunctionRecursive, splitCommaTopLevel, splitSpacesTopLevel, stripComments } from '../utils/ac-sql-parser-util-functions.util';
import { AcEnumSqlParserEvent } from '../enums/ac-enum-sql-parser-event.enum';
import { IAcFunctionInfo } from '../interfaces/ac-function-info.interface';
import { IAcColumnReference } from '../interfaces/ac-column-reference.interface';
import { IAcTableReference } from '../interfaces/ac-table-reference.interface';
import { IAcCteDefinition } from '../interfaces/ac-cte-definition.interface';
import { IAcSqlParseResult } from '../interfaces/ac-sql-parse-result.interface';
import { IAcJoinInfo } from '../interfaces/ac-join-info.interface';
import { IAcOutputColumn } from '../interfaces/ac-output-column.interface';

export class AcSqlParser {
  events: AcEvents = new AcEvents();
  columnsGetterFun: Function = ({entityName}:{entityName: string}) => {
    return [];
  }

  constructor() {
    //
  }

  private collectIAcColumnReferencesFromExpr(expr: string, columnsUsed: IAcColumnReference[], ctes: IAcCteDefinition[], tablesUsed: IAcTableReference[]) {
    if (!expr || !expr.trim()) return;
    // qualified references
    const qualRegex = /([A-Za-z_][\w$]*)\s*\.\s*([A-Za-z_][\w$]*|\*)/g;
    let m;
    while ((m = qualRegex.exec(expr)) !== null) {
      const left = m[1], right = m[2];
      const isStar = right === '*';
      columnsUsed.push({
        source: 'table', tableAlias: left, originalTable: null, tableFieldName: isStar ? null : right,
        queryFieldName: isStar ? `${left}.*` : right, raw: `${left}.${right}`, isStar
      });
      if (!tablesUsed.some(t => (t.alias === left) || (t.originalName === left))) {
        tablesUsed.push({ originalName: left, alias: left, isSubquery: false, raw: left });
        this.events.execute({ event: AcEnumSqlParserEvent.FoundTable, args: { originalName: left, alias: left, isSubquery: false, raw: left } })
      }
    }

    // bare tokens (avoid keywords)
    const bareRegex = /\b([A-Za-z_][\w$]*)\b/g;
    const keywords = new Set(['SELECT', 'FROM', 'WHERE', 'JOIN', 'ON', 'AS', 'AND', 'OR', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'IN', 'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'DISTINCT', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL', 'CROSS', 'JOIN']);
    while ((m = bareRegex.exec(expr)) !== null) {
      const tok = m[1];
      if (keywords.has(tok.toUpperCase())) continue;
      const afterIdx = m.index + tok.length;
      if (expr[afterIdx] === '(') continue; // function name
      columnsUsed.push({
        source: 'unknown',
        tableAlias: null,
        originalTable: null,
        tableFieldName: tok,
        queryFieldName: tok,
        raw: tok
      });
    }
  }

  // collect column tokens from a IAcFunctionInfo recursively into columnsUsed array
  private collectFunctionColumnParams(fn: IAcFunctionInfo, columnsUsed: IAcColumnReference[]) {
    for (const p of fn.params) {
      if (p.kind === 'column') {
        // p.value may be qualified
        const m = p.value.match(/^([A-Za-z_][\w$]*)\.([A-Za-z_][\w$]*)$/);
        if (m) {
          columnsUsed.push({
            source: 'table',
            tableAlias: m[1],
            originalTable: null,
            tableFieldName: m[2],
            queryFieldName: m[2],
            raw: `${m[1]}.${m[2]}`
          });
        } else {
          columnsUsed.push({
            source: 'unknown',
            tableAlias: null,
            originalTable: null,
            tableFieldName: p.value,
            queryFieldName: p.value,
            raw: p.value
          });
        }
      } else if (p.kind === 'function' && p.function) {
        // recursively collect nested
        this.collectFunctionColumnParams(p.function, columnsUsed);
      }
    }
  }

  private finalize(res: IAcSqlParseResult): IAcSqlParseResult {
    // dedupe tables by (alias||originalName||isSubquery)
    const tmap = new Map<string, IAcTableReference>();
    for (const t of res.tablesUsed) {
      const k = `${t.alias ?? ''}||${t.originalName ?? ''}||${t.isSubquery ? 'sub' : ''}`;
      if (!tmap.has(k)) tmap.set(k, t);
    }
    res.tablesUsed = Array.from(tmap.values());

    // dedupe functions by raw
    const fset = new Map<string, IAcFunctionInfo>();
    for (const f of res.functions) if (!fset.has(f.raw)) fset.set(f.raw, f);
    res.functions = Array.from(fset.values());

    // dedupe columnsUsed by raw
    const cset = new Map<string, IAcColumnReference>();
    for (const c of res.columnsUsed) if (!cset.has(c.raw)) cset.set(c.raw, c);
    res.columnsUsed = Array.from(cset.values());

    // normalize columnIndex ordering (ensure unique incremental indices)
    let idx = 0;
    for (const c of res.columns) { c.columnIndex = idx++; }

    return res;
  }

  // Extract all nested functions present anywhere in an expression (non-overlapping, top-left to right)
  private findAllFunctionsInExpr(expr: string): IAcFunctionInfo[] {
    const out: IAcFunctionInfo[] = [];
    const re = /([A-Za-z_][\w$]*)\s*\(/g;
    let m;
    while ((m = re.exec(expr)) !== null) {
      const name = m[1];
      const start = m.index + m[0].length - 1;
      const close = findMatchingParen(expr, start);
      if (close === -1) continue;
      const raw = expr.slice(m.index, close + 1);
      const parsed = parseFunctionRecursive(raw);
      if (parsed) {
        out.push(parsed);
        re.lastIndex = close + 1;
      } else {
        re.lastIndex = m.index + 1;
      }
    }
    return out;
  }

  private findSetOperator(sql: string): string | null {
    const candidates = ['UNION ALL', 'UNION', 'INTERSECT', 'EXCEPT'];
    for (const c of candidates) if (findTopLevelKeyword(sql, c) !== -1) return c;
    return null;
  }

  // returns schema-provided columns or derived projectedColumns or undefined
  private getColumnsForIAcTableReference(t: IAcTableReference): string[] | undefined {
    if (!t) return undefined;
    if (t.projectedColumns && t.projectedColumns.length > 0) return t.projectedColumns;
    if (t.originalName) {
      return this.columnsGetterFun({entityName:t.originalName});
    }
    if (t.alias) {
      return this.columnsGetterFun({entityName:t.alias});
    }
    return undefined;
  }

  private parseFromItem(item: string, ctes: IAcCteDefinition[], columnsUsed: IAcColumnReference[], tablesUsed: IAcTableReference[], subQueries: string[]): IAcTableReference {
    const s = item.trim();
    // subquery
    if (s.startsWith('(')) {
      const close = findMatchingParen(s, 0);
      if (close !== -1) {
        const inner = s.slice(1, close).trim();
        if (/^\s*SELECT\b/i.test(inner)) {
          const rest = s.slice(close + 1).trim();
          const am = rest.match(/^(?:AS\s+)?([`"']?[\w$]+[`"']?)\s*$/i);
          const alias = am ? am[1].replace(/^["'`]|["'`]$/g, '') : (rest ? rest.split(/\s+/)[0] : null);
          const tr: IAcTableReference = { originalName: null, alias, isSubquery: true, subquerySql: inner, raw: item };
          subQueries.push(inner);
          const innerRes = this.parseSelect(inner, ctes);
          tr.projectedColumns = innerRes.columns.map(c => c.queryFieldName || c.tableFieldName).filter(Boolean) as string[];
          // also merge inner tablesUsed into columnsUsed? not necessary here
          return tr;
        }
      }
    }

    // plain table reference with optional alias
    const parts = splitSpacesTopLevel(s);
    let alias: string | null = null;
    let tblName: string | null = null;
    if (parts.length === 1) tblName = parts[0].replace(/^["'`]|["'`]$/g, '');
    else if (parts.length === 2) { tblName = parts[0].replace(/^["'`]|["'`]$/g, ''); alias = parts[1].replace(/^["'`]|["'`]$/g, ''); }
    else {
      if (/^AS$/i.test(parts[1])) { tblName = parts[0].replace(/^["'`]|["'`]$/g, ''); alias = parts[2].replace(/^["'`]|["'`]$/g, ''); }
      else { tblName = parts[0].replace(/^["'`]|["'`]$/g, ''); alias = parts[1].replace(/^["'`]|["'`]$/g, ''); }
    }
    const tr: IAcTableReference = { originalName: tblName, alias, isSubquery: false, raw: item };
    return tr;
  }

  parse({ sql }: { sql: string }): IAcSqlParseResult {
    const raw = sql;
    const cleaned = stripComments(sql);
    const normalized = normalizeSpaces(cleaned);

    const { ctes, rest } = this.parseCtes(normalized);
    const finalStatement = rest.trim();

    const result: IAcSqlParseResult = {
      sql: raw, ctes, finalStatement,
      tablesUsed: [], joins: [], columns: [], columnsUsed: [], functions: [], subQueries: [], setOperators: []
    };

    const setOp = this.findSetOperator(finalStatement);
    if (setOp) {
      const idx = findTopLevelKeyword(finalStatement, setOp);
      if (idx > -1) {
        const left = finalStatement.slice(0, idx).trim();
        const right = finalStatement.slice(idx + setOp.length).trim();
        result.setOperators.push({ op: setOp, leftSql: left, rightSql: right });
        const leftRes = this.parseSelect(left, ctes);
        const rightRes = this.parseSelect(right, ctes);
        result.columns = rightRes.columns.length ? rightRes.columns : leftRes.columns;
        result.tablesUsed = [...leftRes.tablesUsed, ...rightRes.tablesUsed];
        result.columnsUsed = [...leftRes.columnsUsed, ...rightRes.columnsUsed];
        result.functions = [...leftRes.functions, ...rightRes.functions];
        result.joins = [...leftRes.joins, ...rightRes.joins];
        result.subQueries = [...leftRes.subQueries, ...rightRes.subQueries];
        return this.finalize(result);
      }
    }

    const selRes = this.parseSelect(finalStatement, ctes);
    result.tablesUsed = selRes.tablesUsed;
    result.joins = selRes.joins;
    result.columns = selRes.columns;
    result.columnsUsed = selRes.columnsUsed;
    result.functions = selRes.functions;
    result.subQueries = selRes.subQueries;

    this.resolveColumnOwners(result);

    return this.finalize(result);
  }

  private parseCtes(sql: string): { ctes: IAcCteDefinition[]; rest: string } {
    const out: IAcCteDefinition[] = [];
    let s = sql.trim();
    if (!s.toUpperCase().startsWith('WITH ')) return { ctes: out, rest: s };
    s = s.slice(4).trim();
    let i = 0;
    while (i < s.length) {
      const m = s.slice(i).match(/^\s*([A-Za-z_][\w$]*)\s*/);
      if (!m) break;
      const name = m[1]; i += m[0].length;
      if (s[i] === '(') { const e = findMatchingParen(s, i); if (e === -1) break; i = e + 1; }
      const asM = s.slice(i).match(/^\s*AS\s*/i); if (!asM) break; i += asM[0].length;
      if (s[i] !== '(') break;
      const st = i; const end = findMatchingParen(s, st); if (end === -1) break;
      const block = s.slice(st + 1, end).trim();
      out.push({ name, sql: block });
      i = end + 1;
      while (s[i] && /\s/.test(s[i])) i++;
      if (s[i] === ',') { i++; continue; }
      const rest = s.slice(i).trim();
      return { ctes: out, rest };
    }
    return { ctes: out, rest: sql };
  }

  private parseSelect(sql: string, ctes: IAcCteDefinition[]): {
    tablesUsed: IAcTableReference[], joins: IAcJoinInfo[], columns: IAcOutputColumn[], columnsUsed: IAcColumnReference[], functions: IAcFunctionInfo[], subQueries: string[]
  } {
    const tablesUsed: IAcTableReference[] = [];
    const joins: IAcJoinInfo[] = [];
    const columns: IAcOutputColumn[] = [];
    const columnsUsed: IAcColumnReference[] = [];
    const functions: IAcFunctionInfo[] = [];
    const subQueries: string[] = [];

    const selectPos = findTopLevelKeyword(sql, 'SELECT', 0);
    if (selectPos === -1) return { tablesUsed, joins, columns, columnsUsed, functions, subQueries };

    const fromPos = findTopLevelKeyword(sql, 'FROM', selectPos + 6);
    let selectList = '';
    let afterFrom = '';
    if (fromPos === -1) {
      selectList = sql.slice(selectPos + 6).trim();
      afterFrom = '';
    } else {
      selectList = sql.slice(selectPos + 6, fromPos).trim();
      afterFrom = sql.slice(fromPos + 4).trim();
    }

    // detect clause boundaries
    const clauseCandidates = ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'UNION', 'EXCEPT', 'INTERSECT'];
    let nextClausePos = -1;
    for (const kw of clauseCandidates) {
      const p = findTopLevelKeyword(afterFrom, kw, 0);
      if (p !== -1) {
        if (nextClausePos === -1 || p < nextClausePos) nextClausePos = p;
      }
    }
    const fromClause = nextClausePos === -1 ? afterFrom : afterFrom.slice(0, nextClausePos).trim();
    const remainderClauses = nextClausePos === -1 ? '' : afterFrom.slice(nextClausePos).trim();

    // parse FROM first (so we have tablesUsed / derived projections available for star expansion)
    if (fromClause) {
      // detect first top-level join position
      const firstJoinPos = (() => {
        const joinKinds = [' JOIN ', ' LEFT JOIN ', ' RIGHT JOIN ', ' INNER JOIN ', ' FULL JOIN ', ' CROSS JOIN ', ' LEFT OUTER JOIN ', ' RIGHT OUTER JOIN ', ' FULL OUTER JOIN '];
        let earliest = -1;
        for (const k of joinKinds) {
          const p = findTopLevelKeyword(fromClause, k);
          if (p !== -1 && (earliest === -1 || p < earliest)) earliest = p;
        }
        return earliest;
      })();

      let basePart = fromClause;
      let restPart = '';
      if (firstJoinPos !== -1) {
        basePart = fromClause.slice(0, firstJoinPos).trim();
        restPart = fromClause.slice(firstJoinPos).trim();
      }

      // base items
      const baseItems = basePart ? splitCommaTopLevel(basePart) : [];
      for (const b of baseItems) {
        const tr = this.parseFromItem(b.trim(), ctes, columnsUsed, tablesUsed, subQueries);
        tablesUsed.push(tr);
        this.events.execute({ event: AcEnumSqlParserEvent.FoundTable, args: tr });
      }

      // parse joins
      let r = restPart;
      while (r && r.length) {
        const match = r.match(/^\s*(LEFT\s+OUTER|RIGHT\s+OUTER|FULL\s+OUTER|LEFT|RIGHT|FULL|INNER|CROSS|NATURAL)?\s*JOIN\s+/i);
        if (!match) break;
        const kind = (match[1] ? match[1] + ' JOIN' : 'JOIN').toUpperCase();
        r = r.slice(match[0].length);
        const onIdx = findTopLevelKeyword(r, [' ON ', ' USING ', ' JOIN ', ' LEFT JOIN ', ' RIGHT JOIN ', ' INNER JOIN ', ' FULL JOIN '], 0);
        let rightTerm = '';
        let remainder = '';
        if (onIdx === -1) { rightTerm = r.trim(); remainder = ''; }
        else { rightTerm = r.slice(0, onIdx).trim(); remainder = r.slice(onIdx).trim(); }

        const rightRef = this.parseFromItem(rightTerm, ctes, columnsUsed, tablesUsed, subQueries);

        // ON/USING parse
        let onExpr: string | null = null;
        let usingCols: string[] | null = null;
        if (remainder.toUpperCase().startsWith('ON')) {
          const rem = remainder.slice(2).trim();
          const nextJoin = findTopLevelKeyword(rem, [' JOIN ', ' LEFT JOIN ', ' RIGHT JOIN ', ' INNER JOIN ', ' FULL JOIN '], 0);
          const endIdx = nextJoin === -1 ? rem.length : nextJoin;
          onExpr = rem.slice(0, endIdx).trim();
          remainder = rem.slice(endIdx).trim();
        } else if (remainder.toUpperCase().startsWith('USING')) {
          const rem = remainder.slice(5).trim();
          const parenStart = rem.indexOf('(');
          if (parenStart !== -1) {
            const parenClose = findMatchingParen(rem, parenStart);
            if (parenClose !== -1) {
              const inside = rem.slice(parenStart + 1, parenClose);
              usingCols = splitCommaTopLevel(inside).map(x => x.trim().replace(/^["'`]|["'`]$/g, ''));
              remainder = rem.slice(parenClose + 1).trim();
            }
          }
        }

        const ji: IAcJoinInfo = { type: kind, right: rightRef, on: onExpr, using: usingCols, raw: rightTerm };
        joins.push(ji);
        this.events.execute({ event: AcEnumSqlParserEvent.FoundJoin, args: ji });
        this.events.execute({ event: AcEnumSqlParserEvent.FoundTable, args: rightRef });
        tablesUsed.push(rightRef);
        r = remainder.trim();
      }
    }

    // parse select list AFTER collecting tablesUsed (so stars can be expanded)
    const items = selectList ? splitCommaTopLevel(selectList) : [];
    let outIndex = 0;
    for (let idx = 0; idx < items.length; idx++) {
      const rawItem = items[idx].trim();
      const { exprText, alias } = extractAlias(rawItem);
      const trimmedExpr = exprText.trim();

      // star: expand
      if (trimmedExpr === '*') {
        // expand across all tables in FROM order (derived first if alias present)
        for (const t of tablesUsed) {
          const colsFor = this.getColumnsForIAcTableReference(t);
          if (!colsFor || colsFor.length === 0) {
            // unknown schema: keep star as placeholder
            const placeholder: IAcOutputColumn = {
              columnIndex: outIndex++,
              queryFieldName: alias || '*',
              source: 'table',
              tableAlias: t.alias || t.originalName,
              originalTable: t.originalName,
              tableFieldName: '*',
              raw: `${t.alias || t.originalName}.*`,
              isStar: true
            };
            columns.push(placeholder);
            columnsUsed.push({ ...placeholder });
            this.events.execute({ event: AcEnumSqlParserEvent.FoundColumn, args: placeholder });
          } else {
            for (const cn of colsFor) {
              const oc: IAcOutputColumn = {
                columnIndex: outIndex++,
                queryFieldName: alias ? `${cn} /*as ${alias}*/` : cn,
                source: 'table',
                tableAlias: t.alias || t.originalName,
                originalTable: t.originalName,
                tableFieldName: cn,
                raw: `${t.alias || t.originalName}.${cn}`,
                isStar: true
              };
              columns.push(oc);
              columnsUsed.push({
                source: 'table',
                tableAlias: oc.tableAlias,
                originalTable: oc.originalTable,
                tableFieldName: cn,
                queryFieldName: oc.queryFieldName,
                raw: oc.raw
              });
              this.events.execute({ event: AcEnumSqlParserEvent.FoundColumn, args: oc });
            }
          }
        }
        continue;
      }

      // table.* expansion
      const tStar = trimmedExpr.match(/^([A-Za-z_][\w$]*)\s*\.\s*\*$/);
      if (tStar) {
        const tableAlias = tStar[1];
        // find matching tableRef by alias or originalName
        const tref = tablesUsed.find(t => (t.alias === tableAlias) || (t.originalName === tableAlias));
        const colsFor = tref ? this.getColumnsForIAcTableReference(tref) : this.columnsGetterFun({entityName:tableAlias});
        if (!colsFor || colsFor.length === 0) {
          const placeholder: IAcOutputColumn = {
            columnIndex: outIndex++,
            queryFieldName: alias || `${tableAlias}.*`,
            source: 'table',
            tableAlias: tableAlias,
            originalTable: tref ? tref.originalName : tableAlias,
            tableFieldName: '*',
            raw: `${tableAlias}.*`,
            isStar: true
          };
          columns.push(placeholder);
          columnsUsed.push({ ...placeholder });
          this.events.execute({ event: AcEnumSqlParserEvent.FoundColumn, args: placeholder });
        } else {
          for (const cn of colsFor) {
            const oc: IAcOutputColumn = {
              columnIndex: outIndex++,
              queryFieldName: alias ? `${cn} /*as ${alias}*/` : cn,
              source: 'table',
              tableAlias: tableAlias,
              originalTable: tref ? tref.originalName : tableAlias,
              tableFieldName: cn,
              raw: `${tableAlias}.${cn}`,
              isStar: true
            };
            columns.push(oc);
            columnsUsed.push({
              source: 'table',
              tableAlias: oc.tableAlias,
              originalTable: oc.originalTable,
              tableFieldName: cn,
              queryFieldName: oc.queryFieldName,
              raw: oc.raw
            });
            this.events.execute({ event: AcEnumSqlParserEvent.FoundColumn, args: oc });
          }
        }
        continue;
      }

      // full function (single function covering whole expression) -> capture nested structure
      const fnTop = parseFunctionRecursive(trimmedExpr);
      if (fnTop && fnTop.raw.trim() === trimmedExpr) {
        const f: IAcFunctionInfo = { ...fnTop, location: 'SELECT' };
        functions.push(f);
        this.events.execute({ event: AcEnumSqlParserEvent.FoundFunction, args: f });
        // create IAcOutputColumn with functionUsed and also map any column params to columnsUsed
        const oc: IAcOutputColumn = {
          columnIndex: outIndex++,
          queryFieldName: alias || trimmedExpr,
          source: 'function',
          tableAlias: null,
          originalTable: null,
          tableFieldName: null,
          raw: rawItem,
          functionUsed: f
        };
        columns.push(oc);
        // collect column params from function recursively
        this.collectFunctionColumnParams(f, columnsUsed);
        this.events.execute({ event: AcEnumSqlParserEvent.FoundColumn, args: oc });
        continue;
      }

      // simple column ref
      const colRef = trimmedExpr.match(/^(?:(["`]?[\w$]+["`]?)\.)?(["`]?[\w$]+["`]?)$/);
      if (colRef) {
        const tableAlias = colRef[1] ? colRef[1].replace(/^["'`]|["'`]$/g, '') : null;
        const colName = colRef[2].replace(/^["'`]|["'`]$/g, '');
        const oc: IAcOutputColumn = {
          columnIndex: outIndex++,
          queryFieldName: alias || colName,
          source: 'table',
          tableAlias,
          originalTable: null,
          tableFieldName: colName,
          raw: rawItem
        };
        columns.push(oc);
        columnsUsed.push({
          source: 'table',
          tableAlias,
          originalTable: null,
          tableFieldName: colName,
          queryFieldName: oc.queryFieldName,
          raw: tableAlias ? `${tableAlias}.${colName}` : colName
        });
        this.events.execute({ event: AcEnumSqlParserEvent.FoundColumn, args: oc });
        continue;
      }

      // fallback expression: may contain nested functions and column refs
      const oc: IAcOutputColumn = {
        columnIndex: outIndex++,
        queryFieldName: alias || trimmedExpr,
        source: 'expression',
        tableAlias: null,
        originalTable: null,
        tableFieldName: null,
        raw: rawItem
      };
      columns.push(oc);
      // find nested functions and gather their metadata & column params
      const nestedFns = this.findAllFunctionsInExpr(trimmedExpr);
      for (const nf of nestedFns) {
        const fi = nf;
        fi.location = 'SELECT';
        functions.push(fi);
        this.events.execute({ event: AcEnumSqlParserEvent.FoundFunction, args: fi });
        this.collectFunctionColumnParams(fi, columnsUsed);
      }
      // collect generic column refs in expression
      this.collectIAcColumnReferencesFromExpr(trimmedExpr, columnsUsed, ctes, tablesUsed);
      this.events.execute({ event: AcEnumSqlParserEvent.FoundColumn, args: oc });
    }

    // collect join ON expressions columns
    for (const j of joins) {
      if (j.on) this.collectIAcColumnReferencesFromExpr(j.on, columnsUsed, ctes, tablesUsed);
    }

    return { tablesUsed, joins, columns, columnsUsed, functions, subQueries };
  }

  // After parse: map table alias -> original table, resolve originalTable for columns & columnsUsed
  private resolveColumnOwners(res: IAcSqlParseResult) {
    const aliasMap = new Map<string, IAcTableReference>();
    const baseTables: IAcTableReference[] = [];
    for (const t of res.tablesUsed) {
      const key = t.alias || t.originalName;
      if (key) aliasMap.set(key, t);
      if (!t.isSubquery) baseTables.push(t);
    }

    const resolveName = (colName: string): string | null => {
      for (const [alias, t] of aliasMap.entries()) {
        if (t.isSubquery && t.projectedColumns && t.projectedColumns.includes(colName)) return alias;
      }
      if (baseTables.length === 1) {
        const b = baseTables[0]; return b.alias || b.originalName || null;
      }
      return null;
    };

    for (const c of res.columnsUsed) {
      if (!c.tableAlias && c.tableFieldName) {
        const resolved = resolveName(c.tableFieldName);
        if (resolved) c.tableAlias = resolved;
      }
      if (c.tableAlias) {
        const t = aliasMap.get(c.tableAlias);
        if (t && !c.originalTable) c.originalTable = t.originalName;
      }
    }

    for (const out of res.columns) {
      if (out.tableAlias) {
        const t = aliasMap.get(out.tableAlias);
        if (t) out.originalTable = t.originalName;
      } else if (out.tableFieldName) {
        const resolved = resolveName(out.tableFieldName);
        if (resolved) {
          out.tableAlias = resolved;
          const t = aliasMap.get(resolved);
          if (t) out.originalTable = t.originalName;
        }
      } else if (out.source === 'expression' && out.raw) {
        const bare = out.raw.match(/\b([A-Za-z_][\w$]*)\b/);
        if (bare) {
          const resolved = resolveName(bare[1]);
          if (resolved) {
            out.tableAlias = resolved;
            const t = aliasMap.get(resolved);
            if (t) out.originalTable = t.originalName;
          }
        }
      }
    }

    // update raw in columnsUsed to include table alias if resolved and raw doesn't already have dot
    for (const c of res.columnsUsed) {
      if (c.tableAlias && c.tableFieldName && !c.raw.includes('.')) c.raw = `${c.tableAlias}.${c.tableFieldName}`;
    }

    // attach functionUsed.originalTable resolution where possible: if function param references table, set originalTable on function param? (we keep param raw)
  }
}
