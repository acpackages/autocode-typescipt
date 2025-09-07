export interface IAcDDInputDefinition{
  inputClass:new (...args: any[]) => any,
  defaultProperties?:any
}
