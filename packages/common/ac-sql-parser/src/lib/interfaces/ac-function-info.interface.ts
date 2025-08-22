import { IAcFunctionParameter } from "./ac-function-param.interface";

export interface IAcFunctionInfo {
  name: string;
  params: IAcFunctionParameter[];
  raw: string;
  location?: 'SELECT' | 'WHERE' | 'JOIN' | 'GROUP' | 'HAVING' | 'ORDER' | 'UNKNOWN';
}
