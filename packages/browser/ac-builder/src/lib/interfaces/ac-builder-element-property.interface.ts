export interface IAcBuilderElementProperty{
  name:string;
  type:'string'|'number'|'boolean'|'select'|any;
  inputProperties?:any;
  title:string;
  category:string;
  htmlAttributeName?:string;
}
