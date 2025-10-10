/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AcBuilderPropertySelectInput } from "@autocode-ts/ac-builder";
import { AcDDInputManager } from "@autocode-ts/ac-data-dictionary-components";

export class AcDDInputSelectInput extends AcBuilderPropertySelectInput{

  constructor() {
    super();
    this.setInputOptions();
  }

  setInputOptions(){
    const options = [];
    for(const name of AcDDInputManager.getInputNames()){
      options.push({'label':name,'value':name});
    }
    this.selectOptions = options;
  }

}

acRegisterCustomElement({tag:'ac-dd-input-select-input',type:AcDDInputSelectInput});
