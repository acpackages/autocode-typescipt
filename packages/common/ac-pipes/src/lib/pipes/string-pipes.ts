/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcPipeRegistry } from "../core/ac-pipe";

AcPipeRegistry.register({
  name:'lowercase',
  transform:(value: any)=>{
    return value != null ? String(value).toLowerCase() : value;
  }
});

AcPipeRegistry.register({
  name:'prefix',
  transform:(v: any, prefix: string = '') => `${prefix}${v ?? ''}`
});

AcPipeRegistry.register({
  name:'suffix',
  transform:(v: any, suffix: string = '')=> `${v ?? ''}${suffix}`
});

AcPipeRegistry.register({
  name:'trim',
  transform:(v: any) => (v ?? '').toString().trim()
});

AcPipeRegistry.register({
  name:'uppercase',
  transform:(value: any)=>{
    return value != null ? String(value).toUpperCase() : value;
  }
});


