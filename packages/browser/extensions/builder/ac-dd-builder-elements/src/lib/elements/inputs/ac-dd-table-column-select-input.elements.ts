import { acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AcBuilderApi, AcBuilderPropertySelectInput, AcEnumBuilderHook, IAcBuilderElementPropertyChangeHookArgs } from "@autocode-ts/ac-builder";
import { AcDataDictionary, AcDDTable } from "@autocode-ts/ac-data-dictionary";

export class AcDDTableColumnSelectInput extends AcBuilderPropertySelectInput{
  override set builderApi(value: AcBuilderApi) {
    super.value = value;
    value.hooks.subscribe({hook:AcEnumBuilderHook.ElementPropertyChange,callback:(args:IAcBuilderElementPropertyChangeHookArgs)=>{
      if(this.componentElement?.instanceName == args.componentElement.instanceName && args.propertyName == 'tableName'){
        this.setTableColumns();
      }
    }})
  }

  constructor() {
    super();
    this.setTableColumns();
  }

  setTableColumns(){
    const options = [];
    if(this.componentElement && this.componentElement.properties){
      if(this.componentElement.properties['tableName']){
        const tableName = this.componentElement.properties['tableName'].value;
        if(tableName){
          const table:AcDDTable|null = AcDataDictionary.getTable({tableName});
          if(table){
            for(const column of Object.values(table.tableColumns)){
              options.push({'label':column.columnName,'value':column.columnName});
            }
          }
        }
      }
    }
    this.selectOptions = options;
  }
}

acRegisterCustomElement({tag:'ac-dd-table-column-select-input',type:AcDDTableColumnSelectInput});
