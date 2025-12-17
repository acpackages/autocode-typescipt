/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcPipe } from "../core/ac-pipe";

export const lowercasePipe:AcPipe = {
  name:'lowercase',
  pure:true,
  transform:(v: any) => (v ?? '').toString().toLowerCase()
}

export const trimPipe:AcPipe = {
  name:'trim',
  pure:true,
  transform:(v: any) => (v ?? '').toString().trim()
}

export const uppercasePipe:AcPipe = {
  name:'uppercase',
  pure:true,
  transform:(v: any) => (v ?? '').toString().toUpperCase()
}

export const prefixPipe:AcPipe = {
  name:'prefix',
  pure:true,
  transform:(v: any, prefix: string = '') => `${prefix}${v ?? ''}`
}

export const suffixPipe:AcPipe = {
  name:'suffix',
  pure:true,
  transform:(v: any, suffix: string = '') => `${v ?? ''}${suffix}`
}
