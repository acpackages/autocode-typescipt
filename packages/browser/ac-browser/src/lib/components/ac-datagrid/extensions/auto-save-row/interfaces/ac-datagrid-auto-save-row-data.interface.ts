export interface IAcDatagridAutoSaveRowData {
  status:'NOT_CHANGED'|'CHANGED'|'SAVING'|'SAVED'|'ERROR';
  lastChangeTime?:Date
}
