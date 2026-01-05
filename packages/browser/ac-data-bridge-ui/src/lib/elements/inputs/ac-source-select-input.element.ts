
import { AcElementBase, acRegisterCustomElement } from '@autocode-ts/ac-browser';
export class AcSourceSelectInput extends AcElementBase{

  override init(): void {
    super.init();
  }
}

acRegisterCustomElement({tag:'ac-source-select-input',type:AcSourceSelectInput});
