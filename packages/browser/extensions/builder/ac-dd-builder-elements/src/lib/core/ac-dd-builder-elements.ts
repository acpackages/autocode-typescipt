import { AcBuilderElementsManager, AcBuilderPropertyInputsManager } from "@autocode-ts/ac-builder"
import { AcDDTableSelectInput } from "../elements/inputs/ac-dd-table-select-input.elements";
import { AcDDTableColumnSelectInput } from "../elements/inputs/ac-dd-table-column-select-input.elements";
import { AC_BUILDER_DD_DATAGRID_ELEMENT, AC_BUILDER_DD_INPUT_ELEMENT, AC_BUILDER_DD_INPUT_FIELD_ELEMENT } from "../elements/_elements.export";

export function acRegisterDataDictionaryBuilderElements(){
  AcBuilderPropertyInputsManager.register({input:{type:'dd-table',inputClass:AcDDTableSelectInput}});
  AcBuilderPropertyInputsManager.register({input:{type:'dd-table-column',inputClass:AcDDTableColumnSelectInput}});
  AcBuilderElementsManager.register({element:AC_BUILDER_DD_DATAGRID_ELEMENT});
  AcBuilderElementsManager.register({element:AC_BUILDER_DD_INPUT_ELEMENT});
  AcBuilderElementsManager.register({element:AC_BUILDER_DD_INPUT_FIELD_ELEMENT});
}
