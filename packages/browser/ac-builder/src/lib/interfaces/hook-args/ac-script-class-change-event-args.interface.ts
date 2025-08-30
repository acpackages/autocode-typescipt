export interface IAcScriptClassChangeHookArgs{
  newName?:string;
  oldName?:string;
  change:'add'|'remove'|'rename'
}
