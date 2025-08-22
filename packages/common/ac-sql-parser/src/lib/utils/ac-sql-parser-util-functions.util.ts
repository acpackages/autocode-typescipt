import { IAcFunctionInfo } from "../interfaces/ac-function-info.interface";
import { IAcFunctionParameter } from "../interfaces/ac-function-param.interface";

export function stripComments(sql: string): string {
  sql = sql.replace(/\/\*[\s\S]*?\*\//g, ' ');
  sql = sql.replace(/--[^\n\r]*/g, ' ');
  return sql;
}
export function normalizeSpaces(sql: string): string {
  return sql.replace(/\s+/g, ' ').trim();
}

export function findMatchingParen(sql: string, startPos: number): number {
  let depth = 0;
  let i = startPos;
  const n = sql.length;
  let inSingle = false, inDouble = false, inBacktick = false;
  while (i < n) {
    const ch = sql[i];
    if (ch === "'" && !inDouble && !inBacktick) { inSingle = !inSingle; i++; continue; }
    if (ch === '"' && !inSingle && !inBacktick) { inDouble = !inDouble; i++; continue; }
    if (ch === '`' && !inSingle && !inDouble) { inBacktick = !inBacktick; i++; continue; }
    if (inSingle || inDouble || inBacktick) { i++; continue; }
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return -1;
}

// split top-level commas (not inside parentheses / quotes)
export function splitCommaTopLevel(sql: string): string[] {
  const out: string[] = [];
  let buf = '';
  let depth = 0;
  let inSingle = false, inDouble = false, inBacktick = false;
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (ch === "'" && !inDouble && !inBacktick) { inSingle = !inSingle; buf += ch; continue; }
    if (ch === '"' && !inSingle && !inBacktick) { inDouble = !inDouble; buf += ch; continue; }
    if (ch === '`' && !inSingle && !inDouble) { inBacktick = !inBacktick; buf += ch; continue; }
    if (inSingle || inDouble || inBacktick) { buf += ch; continue; }
    if (ch === '(') { depth++; buf += ch; continue; }
    if (ch === ')') { depth--; buf += ch; continue; }
    if (ch === ',' && depth === 0) { out.push(buf.trim()); buf = ''; continue; }
    buf += ch;
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

export function splitSpacesTopLevel(s: string): string[] {
  const out: string[] = [];
  let buf = '';
  let depth = 0;
  let inSingle = false, inDouble = false, inBacktick = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "'" && !inDouble && !inBacktick) { inSingle = !inSingle; buf += ch; continue; }
    if (ch === '"' && !inSingle && !inBacktick) { inDouble = !inDouble; buf += ch; continue; }
    if (ch === '`' && !inSingle && !inDouble) { inBacktick = !inBacktick; buf += ch; continue; }
    if (inSingle || inDouble || inBacktick) { buf += ch; continue; }
    if (ch === '(') { depth++; buf += ch; continue; }
    if (ch === ')') { depth = Math.max(0, depth - 1); buf += ch; continue; }
    if (depth === 0 && /\s/.test(ch)) {
      if (buf.trim()) { out.push(buf.trim()); buf = ''; }
      continue;
    }
    buf += ch;
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

export function findTopLevelKeyword(sql: string, keywords: string | string[], from = 0): number {
  const kws = Array.isArray(keywords) ? keywords : [keywords];
  const upper = sql.toUpperCase();
  let depth = 0;
  let inSingle = false, inDouble = false, inBacktick = false;
  for (let i = from; i < sql.length; i++) {
    const ch = sql[i];
    if (ch === "'" && !inDouble && !inBacktick) { inSingle = !inSingle; continue; }
    if (ch === '"' && !inSingle && !inBacktick) { inDouble = !inDouble; continue; }
    if (ch === '`' && !inSingle && !inDouble) { inBacktick = !inBacktick; continue; }
    if (inSingle || inDouble || inBacktick) continue;
    if (ch === '(') { depth++; continue; }
    if (ch === ')') { depth = Math.max(0, depth - 1); continue; }
    if (depth !== 0) continue;
    for (const kw of kws) {
      const k = kw.toUpperCase();
      if (upper.startsWith(k, i) && isWordBoundary(upper, i, k.length)) return i;
    }
  }
  return -1;
}
export function isWordBoundary(upperSql: string, pos: number, len: number) {
  const left = pos - 1;
  const right = pos + len;
  const lOk = left < 0 || /\s|\(|\)/.test(upperSql[left]);
  const rOk = right >= upperSql.length || /\s|\(|\)|,/.test(upperSql[right]);
  return lOk && rOk;
}

export function extractAlias(expr: string): { exprText: string; alias: string | null } {
  const mAs = expr.match(/\s+AS\s+([`"']?[\w$]+[`"']?)\s*$/i);
  if (mAs) return { exprText: expr.slice(0, mAs.index).trim(), alias: mAs[1].replace(/^["'`]|["'`]$/g,'') };
  const parts = splitSpacesTopLevel(expr);
  if (parts.length >= 2) {
    const last = parts[parts.length - 1];
    if (!/^[\d()]/.test(last) && !/[,]/.test(last)) {
      return { exprText: parts.slice(0, -1).join(' '), alias: last.replace(/^["'`]|["'`]$/g,'') };
    }
  }
  return { exprText: expr.trim(), alias: null };
}

/* =========================
   Function parser (nested)
   ========================= */

export function parseFunctionRecursive(expr: string): IAcFunctionInfo | null {
  // regex locate name and opening paren at start
  const m = expr.match(/^\s*([A-Za-z_][\w$]*)\s*\(/);
  if (!m) return null;
  const name = m[1];
  const start = expr.indexOf('(', m.index);
  const close = findMatchingParen(expr, start);
  if (close === -1) return null;
  const inside = expr.slice(start + 1, close).trim();
  const raw = expr.slice(m.index, close + 1);
  const parts = inside === '' ? [] : splitCommaTopLevel(inside);
  const params: IAcFunctionParameter[] = [];
  for (const p of parts) {
    const pt = p.trim();
    // nested fn?
    const nested = parseFunctionRecursive(pt);
    if (nested) {
      params.push({ kind: 'function', value: nested.raw, function: nested });
      continue;
    }
    // literal numeric or quoted
    if (/^'.*'$/.test(pt) || /^".*"$/.test(pt) || /^\d+(\.\d+)?$/.test(pt)) {
      params.push({ kind: 'literal', value: pt });
      continue;
    }
    // column-ish (qualified or bare)
    if (/^([A-Za-z_][\w$]*)(\.[A-Za-z_][\w$]*)?$/.test(pt)) {
      params.push({ kind: 'column', value: pt });
      continue;
    }
    // fallback unknown expression
    params.push({ kind: 'unknown', value: pt });
  }
  return { name, params, raw, location: 'UNKNOWN' };
}
