/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AcBuilderPropertySelectInput } from "@autocode-ts/ac-builder";
import { AcDataDictionary } from "@autocode-ts/ac-data-dictionary";

export class AcDDTableSelectInput extends AcBuilderPropertySelectInput{

  constructor() {
    super();
    this.setTables();
  }

  setTables(){
    const tables = AcDataDictionary.getTables();
    const options = [];
    for(const table of Object.values(tables)){
      options.push({'label':table.tableName,'value':table.tableName});
    }
    this.options = options;
  }

}

acRegisterCustomElement({tag:'ac-dd-table-select-input',type:AcDDTableSelectInput});
