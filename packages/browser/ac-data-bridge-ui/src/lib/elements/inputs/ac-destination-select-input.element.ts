import { AcElementBase, acRegisterCustomElement } from "@autocode-ts/ac-browser";

export class AcDestinationSelectInput extends AcElementBase{

  override init(): void {
    super.init();
  }
}

acRegisterCustomElement({tag:'ac-destination-select-input',type:AcDestinationSelectInput});
