/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcPipeRegistry } from "../core/ac-pipe";

AcPipeRegistry.register({
  name:'keys',
  pure:true,
  transform:(v: any) => (v && typeof v === 'object' ? Object.keys(v) : [])
});

AcPipeRegistry.register({
  name:'entries',
  pure:true,
  transform:(v: any) => (v && typeof v === 'object' ? Object.entries(v) : [])
});

AcPipeRegistry.register({
  name:'values',
  pure:true,
  transform:(v: any) => (v && typeof v === 'object' ? Object.values(v) : [])
});
