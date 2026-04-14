export interface IAcRepeaterField {
  key: string;
  label: string;
  type?:"BOOLEAN"|"CUSTOM"|"DATE"|"DATETIME"|"NUMBER"|"OBJECT"|"STRING"|"UNKNOWN";
  allowSort?:boolean;
  allowFilter?:boolean;
}
