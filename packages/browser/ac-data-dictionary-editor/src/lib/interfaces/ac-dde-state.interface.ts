import { IAcDatagridState } from "@autocode-ts/ac-browser";
import { IAcDDETableEditorState } from "./ac-dde-table-editor-state.interface";

export interface IAcDDEState {
  tableEditorState?: IAcDDETableEditorState,
  dataDictionariesDatagrid?: IAcDatagridState,
  extensionStates?: any,
  functionsDatagrid?: IAcDatagridState,
  relationshipsDatagrid?: IAcDatagridState,
  storedProceduresDatagrid?: IAcDatagridState,
  tablesDatagrid?: IAcDatagridState,
  tableColumnsDatagrid?: IAcDatagridState,
  triggersDatagrid?: IAcDatagridState,
  viewsDatagrid?: IAcDatagridState,
  viewColumnsDatagrid?: IAcDatagridState;
}
