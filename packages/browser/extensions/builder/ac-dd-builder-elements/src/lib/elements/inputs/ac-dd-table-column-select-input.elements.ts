/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AcBuilderApi, AcBuilderPropertySelectInput, AcEnumBuilderHook, IAcBuilderElementPropertyChangeHookArgs } from "@autocode-ts/ac-builder";
import { AcDataDictionary, AcDDTable } from "@autocode-ts/ac-data-dictionary";

export class AcDDTableColumnSelectInput extends AcBuilderPropertySelectInput{
  override set builderApi(value: AcBuilderApi) {
    super.builderApi = value;
    value.hooks.subscribe({hook:AcEnumBuilderHook.ElementPropertyChange,callback:(args:IAcBuilderElementPropertyChangeHookArgs)=>{
      if(this.componentElement?.instanceName == args.componentElement.instanceName && args.propertyName == 'tableName'){
        this.setTableColumns();
      }
    }})
  }

  private fetchedColumns:boolean = false;

  constructor() {
    super();
    this.setTableColumns();
  }

  setTableColumns(retry:boolean = false){
    if(this.componentElement && this.componentElement.properties){
      const options = [];
      if(this.componentElement.properties['tableName']){
        const tableName = this.componentElement.properties['tableName'].value;
        if(tableName){
          const table:AcDDTable|null = AcDataDictionary.getTable({tableName});
          if(table){
            for(const column of Object.values(table.tableColumns)){
              options.push({'label':column.columnName,'value':column.columnName});
            }
            this.fetchedColumns = true;
          }
        }
      }
      this.options = options;
    }
    else if(retry){
      setTimeout(() => {
        this.setTableColumns(true);
      }, 150);
    }
  }

  override setValue(value:any){
    super.setValue(value);
    if(!this.fetchedColumns){
      this.setTableColumns();
    }
  }

}

acRegisterCustomElement({tag:'ac-dd-table-column-select-input',type:AcDDTableColumnSelectInput});
