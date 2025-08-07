import { AcDDEApi } from "../../core/ac-dde-api";

export class AcDDETableColumnPropertiesDatagrid {
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
    this.initElement();
  }

  initElement() {
    this.element.innerHTML = 'Table Column Properties panel';
  }
}
