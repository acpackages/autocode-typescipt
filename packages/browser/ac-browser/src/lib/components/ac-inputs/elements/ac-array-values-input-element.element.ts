import { AC_INPUT_ATTRIBUTE_NAME } from "../_ac-inputs.export";
import { AcInputBase } from "../core/ac-input-base";
import { AC_TEMPLATE_ENGINE_ATTRIBUTE, AcTemplateEngine } from "@autocode-ts/ac-template-engine";

export class AcArrayValuesInputElement extends AcInputBase{
  override element: HTMLElement = document.createElement('div');
  context:any = {values:[
    {id:1},
    {id:2},
    {id:3}
  ]};

  constructor() {
    super();
  }

  initArrayValues({element}:{element:HTMLElement}){
    this.element = element;
    const rowElement = this.element.querySelector(`[${AC_INPUT_ATTRIBUTE_NAME.acArrayValuesRow}]`);
    this.init();
    if(rowElement && rowElement.hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.Let)){
      const rowsContainer = rowElement.parentElement as HTMLElement;
      rowsContainer.setAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.For,'let item of values');
      const templateEngine = new AcTemplateEngine({element:this.element,context:this.context});
      templateEngine.render();
    }
  }
}
