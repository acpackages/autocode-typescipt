/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcPipe } from "../core/ac-pipe";

export const asyncPipe: AcPipe = {
  name: 'async',
  transform: async (v: any) => (v instanceof Promise ? await v : v),
  pure: false, // impure: must re-evaluate if promise changes
};

export const coalescePipe: AcPipe = {
  name: 'coalesce',
  pure: true,
  transform: (v: any, defaultValue: any) => (v == null || v === '' ? defaultValue : v)
}

export const defaultPipe: AcPipe = {
  name: 'default',
  pure: true,
  transform: (...values: any[]) => values.find(v => v != null && v !== '')
}

export const jsonPipe: AcPipe = {
  name: 'json',
  pure: true,
  transform: (v: any, space: number | string = 2) => JSON.stringify(v, null, space),
}

export const lengthPipe: AcPipe = {
  name: 'length',
  pure: true,
  transform: (v: any) =>
    v == null ? 0 : Array.isArray(v) || typeof v === 'string' ? v.length : Object.keys(v).length
}
