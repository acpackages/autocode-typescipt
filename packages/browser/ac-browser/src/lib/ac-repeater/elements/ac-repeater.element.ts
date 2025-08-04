
export class AcRepeaterElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `This is AcRepeater Web Component
      `;
  }
}
customElements.define('ac-repeater', AcRepeaterElement);
