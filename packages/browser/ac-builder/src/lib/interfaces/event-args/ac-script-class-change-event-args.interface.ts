export interface IAcScriptClassChangeEventArgs{
  newName?:string;
  oldName?:string;
  change:'add'|'remove'|'rename'
}
