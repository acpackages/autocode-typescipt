/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcPipe } from "../core/ac-pipe";

export const keysPipe:AcPipe = {
  name:'keys',
  pure:true,
  transform:(v: any) => (v && typeof v === 'object' ? Object.keys(v) : [])
}

export const entriesPipe:AcPipe = {
  name:'entries',
  pure:true,
  transform:(v: any) => (v && typeof v === 'object' ? Object.entries(v) : [])
}

export const valuesPipe:AcPipe = {
  name:'values',
  pure:true,
  transform:(v: any) => (v && typeof v === 'object' ? Object.values(v) : [])
}
