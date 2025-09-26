/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AcBuilderApi, AcBuilderPropertySelectInput, AcEnumBuilderHook, IAcBuilderElementPropertyChangeHookArgs } from "@autocode-ts/ac-builder";
import { AcDataDictionary, AcDDTable, AcDDView } from "@autocode-ts/ac-data-dictionary";

export class AcDDSelectDatagridSourceValueInput extends AcBuilderPropertySelectInput {
  override set builderApi(value: AcBuilderApi) {
    super.builderApi = value;
    value.hooks.subscribe({
      hook: AcEnumBuilderHook.ElementPropertyChange, callback: (args: IAcBuilderElementPropertyChangeHookArgs) => {
        if (this.componentElement?.instanceName == args.componentElement.instanceName && args.propertyName == 'sourceType') {
          this.setSourceValueOptions();
        }
      }
    })
  }

  constructor() {
    super();
    this.setSourceValueOptions();
  }

  setSourceValueOptions() {
    const options = [];
    if (this.componentElement && this.componentElement.properties) {
      if (this.componentElement.properties['sourceType']) {
        const sourceType = this.componentElement.properties['sourceType'].value;
        if (sourceType == 'TABLE') {
          const tables: AcDDTable[] = Object.values(AcDataDictionary.getTables());
          for (const table of tables) {
            options.push({ 'label': table.tableName, 'value': table.tableName });
          }
        }
        else if (sourceType == 'VIEW') {
          const views: AcDDView[] = Object.values(AcDataDictionary.getViews());
          for (const view of views) {
            options.push({ 'label': view.viewName, 'value': view.viewName });
          }
        }
      }
    }
    this.selectOptions = options;
  }

}

acRegisterCustomElement({ tag: 'ac-dd-select-datagrid-source-value-input', type: AcDDSelectDatagridSourceValueInput });
