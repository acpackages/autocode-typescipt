export interface IAcScriptPropertyChangeEventArgs{
  className:string;
  newName?:string;
  oldName?:string;
  change:'add'|'remove'|'rename'
}
