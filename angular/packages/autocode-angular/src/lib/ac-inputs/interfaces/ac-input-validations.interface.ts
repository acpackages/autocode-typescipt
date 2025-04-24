export interface IAcInputValidation {
  between?:{value1:string,value2:string},
  customFunction?:Function,
  equals?:any,
  fixedLength?:number,
  greaterThan?:any,
  in?:any[]
  lessThan?:any
  maxLength?:number,
  minLength?:number,
  notEquals?:any,
  notIn?:any[]
  required?:boolean,
  regex?:string,
}
