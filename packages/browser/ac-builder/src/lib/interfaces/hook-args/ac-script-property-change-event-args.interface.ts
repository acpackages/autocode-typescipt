export interface IAcScriptPropertyChangeHookArgs{
  className:string;
  newName?:string;
  oldName?:string;
  change:'add'|'remove'|'rename'
}
