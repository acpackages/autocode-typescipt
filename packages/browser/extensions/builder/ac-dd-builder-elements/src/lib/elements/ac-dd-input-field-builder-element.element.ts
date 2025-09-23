import { AcBuilderElement, IAcBuilderElement, IAcBuilderElementInitArgs } from "@autocode-ts/ac-builder";
import { AcDDInputFieldElement } from "@autocode-ts/ac-data-dictionary-components";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";


export class AcDDInputFieldBuilderElement extends AcBuilderElement {
  get columnName(): string {
    return this.ddInputFiled.columnName;
  }
  set columnName(value: string) {
    this.ddInputFiled.columnName = value;
    this.setInputDisplay();
  }

  get tableName(): string {
    return this.ddInputFiled.tableName;
  }
  set tableName(value: string) {
    this.ddInputFiled.tableName = value;
    this.setInputDisplay();
  }

  constructor(){
    super();
    this.element.style.display = "contents";
  }

  ddInputFiled = new AcDDInputFieldElement();
  override element = document.createElement('div');
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    this.registerDomEvents();
    this.setInputDisplay();
  }

  private registerDomEvents(): void {
    this.element.addEventListener('click', (event: MouseEvent) => {
      this.events.execute({ event: 'click', args: event });
    });
  }

  private setInputDisplay(){
    if(this.tableName && this.columnName){
       this.element.innerHTML = '';
       this.element.appendChild(this.ddInputFiled);
    }
    else{
      this.element.innerHTML = "Data Dictionary Input Field";
    }
  }

}

export const AC_BUILDER_DD_INPUT_FIELD_ELEMENT: IAcBuilderElement = {
  category: "Data Dictionary",
  name: "ddInputField",
  tag: "div",
  title: "Input Field",
  mediaSvg: ACI_SVG_SOLID.inputPipe,
  instanceClass: AcDDInputFieldBuilderElement,
  properties:[
    {name:'tableName','category':'Data Dictionary',title:'Table',type:'ddTable'},
    {name:'columnName','category':'Data Dictionary',title:'Column',type:'ddTableColumn'}
  ]
};
