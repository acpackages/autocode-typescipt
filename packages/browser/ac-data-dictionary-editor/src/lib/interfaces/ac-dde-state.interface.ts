import { IAcDatagridState } from "@autocode-ts/ac-browser";
import { IAcDDEDatagridEditorState } from "./ac-dde-datagrid-editor-state.interface";

export interface IAcDDEState {
  datagrid_editor_state?: IAcDDEDatagridEditorState,
  data_dictionaries_datagrid?: IAcDatagridState,
  extension_states?: any,
  functions_datagrid?: IAcDatagridState,
  relationships_datagrid?: IAcDatagridState,
  stored_procedures_datagrid?: IAcDatagridState,
  tables_datagrid?: IAcDatagridState,
  table_columns_datagrid?: IAcDatagridState,
  triggers_datagrid?: IAcDatagridState,
  views_datagrid?: IAcDatagridState,
  view_columns_datagrid?: IAcDatagridState;
}
