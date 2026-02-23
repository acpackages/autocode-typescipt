/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcPipeRegistry } from "../core/ac-pipe";

AcPipeRegistry.register({
  name: 'async',
  transform: async (v: any) => (v instanceof Promise ? await v : v),
  pure: false, // impure: must re-evaluate if promise changes
});;

AcPipeRegistry.register({
  name: 'coalesce',
  pure: true,
  transform: (v: any, defaultValue: any) => (v == null || v === '' ? defaultValue : v)
});

AcPipeRegistry.register({
  name: 'default',
  pure: true,
  transform: (...values: any[]) => values.find(v => v != null && v !== '')
});

AcPipeRegistry.register({
  name: 'json',
  pure: true,
  transform(value: any, space: number = 2) {
        // Handle circular references
        const seen = new WeakSet();
        return JSON.stringify(value, (_key, val) => {
            if (typeof val === 'object' && val !== null) {
                if (seen.has(val)) {
                    return '[Circular]';
                }
                seen.add(val);
            }
            return val;
        }, space);
    }
});

AcPipeRegistry.register({
  name: 'length',
  pure: true,
  transform: (v: any) =>
    v == null ? 0 : Array.isArray(v) || typeof v === 'string' ? v.length : Object.keys(v).length
});
