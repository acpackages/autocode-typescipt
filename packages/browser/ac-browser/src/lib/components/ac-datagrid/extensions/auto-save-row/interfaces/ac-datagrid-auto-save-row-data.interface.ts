export interface IAcDatagridAutoSaveRowData {
  status:'not_changed'|'pending_save'|'saving'|'saved'|'error';
  lastChangeTime?:Date
}
