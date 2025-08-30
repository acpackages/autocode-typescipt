export interface IAcScriptFunctionChangeHookArgs{
  className:string;
  newName?:string;
  oldName?:string;
  change:'add'|'remove'|'rename'
}
