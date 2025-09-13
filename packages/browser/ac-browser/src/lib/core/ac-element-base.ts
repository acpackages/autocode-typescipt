import { AcEvents } from "@autocode-ts/autocode";

export class AcElementBase extends HTMLElement {
  static get observedAttributes() {
    return ['ac-context','ac-context-key','class', 'value', 'placeholder', 'disabled', 'readonly', 'name', 'style'];
  }

  get inputReflectedAttributes(){
    return ['class', 'value', 'placeholder', 'disabled', 'readonly','name'];
  }


  events: AcEvents = new AcEvents();

}
