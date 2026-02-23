/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcPipeRegistry } from "../core/ac-pipe";

AcPipeRegistry.register({
  name:'join',
  pure:true,
  transform:(v: any[], separator: string = ', ') =>
        Array.isArray(v) ? v.join(separator) : v,
});

AcPipeRegistry.register({
  name:'slice',
  pure:true,
  transform:(v: any, start?: number, end?: number) =>
        Array.isArray(v) || typeof v === 'string' ? v.slice(start, end) : v,
});
