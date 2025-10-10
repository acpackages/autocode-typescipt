import { AcBuilderElementsManager, AcBuilderPropertyInputsManager, AcClassPropertySelectInput } from "@autocode-ts/ac-builder"
import { AcDDTableSelectInput } from "../elements/inputs/ac-dd-table-select-input.elements";
import { AcDDTableColumnSelectInput } from "../elements/inputs/ac-dd-table-column-select-input.elements";
import { AC_BUILDER_DD_DATAGRID_ELEMENT, AC_BUILDER_DD_INPUT_ELEMENT, AC_BUILDER_DD_INPUT_FIELD_ELEMENT } from "../elements/_elements.export";
import { AcDDSelectDatagridSourceValueInput } from "../elements/inputs/ac-dd-select-datagrid-source-value-input.elements";
import { AcDDDatagridColumnsInput } from "../elements/inputs/ac-dd-datagrid-columns-input.elements";
import { AcDDInputSelectInput } from "../elements/inputs/ac-dd-input-select-input.elements";

export function acRegisterDataDictionaryBuilderElements(){
  AcBuilderPropertyInputsManager.register({input:{type:'ddDatagridColumns',inputElement:AcDDDatagridColumnsInput}});
  AcBuilderPropertyInputsManager.register({input:{type:'ddTable',inputElement:AcDDTableSelectInput}});
  AcBuilderPropertyInputsManager.register({input:{type:'ddTableColumn',inputElement:AcDDTableColumnSelectInput}});
  AcBuilderPropertyInputsManager.register({input:{type:'ddSelectInputName',inputElement:AcDDInputSelectInput}});
  AcBuilderPropertyInputsManager.register({input:{type:'ddSelectDatagridSourceValueInput',inputElement:AcDDSelectDatagridSourceValueInput}});
  AcBuilderPropertyInputsManager.register({input:{type:'selectClassProperty',inputElement:AcClassPropertySelectInput}});
  AcBuilderElementsManager.register({element:AC_BUILDER_DD_DATAGRID_ELEMENT});
  AcBuilderElementsManager.register({element:AC_BUILDER_DD_INPUT_ELEMENT});
  AcBuilderElementsManager.register({element:AC_BUILDER_DD_INPUT_FIELD_ELEMENT});
}
