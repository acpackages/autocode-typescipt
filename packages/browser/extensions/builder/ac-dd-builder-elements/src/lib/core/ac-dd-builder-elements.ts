import { AcBuilderElementsManager } from "@autocode-ts/ac-builder";
import { AC_BUILDER_DD_DATAGRID_ELEMENT } from "../elements/ac-dd-datagrid-element.element";
import { AC_BUILDER_DD_INPUT_ELEMENT } from "../elements/ac-dd-input-element.element";
import { AC_BUILDER_DD_INPUT_FIELD_ELEMENT } from "../elements/ac-dd-input-field-element.element";

export function acRegisterDataDictionaryBuilderElements(){
  AcBuilderElementsManager.register({element:AC_BUILDER_DD_DATAGRID_ELEMENT});
  AcBuilderElementsManager.register({element:AC_BUILDER_DD_INPUT_ELEMENT});
  AcBuilderElementsManager.register({element:AC_BUILDER_DD_INPUT_FIELD_ELEMENT});
}
