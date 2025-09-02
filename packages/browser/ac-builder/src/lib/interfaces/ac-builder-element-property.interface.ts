export interface IAcBuilderElementProperty{
  name:string;
  type:'string'|'number'|'boolean'|'select';
  inputProperties?:any;
  title:string;
  category:string;
  htmlAttributeName?:string;
}
