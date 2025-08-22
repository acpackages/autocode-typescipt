import { IAcFunctionInfo } from "./ac-function-info.interface";

export interface IAcFunctionParameter {
  kind: 'column' | 'literal' | 'function' | 'unknown';
  value: string;                // raw token (for column/literal)
  function?: IAcFunctionInfo;            // for nested function
}
