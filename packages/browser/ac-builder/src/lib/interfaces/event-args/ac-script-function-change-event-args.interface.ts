export interface IAcScriptFunctionChangeEventArgs{
  className:string;
  newName?:string;
  oldName?:string;
  change:'add'|'remove'|'rename'
}
