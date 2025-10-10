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

  get context(): any {
    return this.ddInputFiled.acContext;
  }
  set context(value: any) {
    this.ddInputFiled.acContext = value;
  }

  get contextKey(): string|null {
    return this.ddInputFiled.acContextKey;
  }
  set contextKey(value: string) {
    this.ddInputFiled.acContextKey = value;
  }

  get inputName(): string {
    return this.ddInputFiled.inputName;
  }
  set inputName(value: string) {
    this.ddInputFiled.inputName = value;
    this.setInputDisplay();
  }

  get inputProperties(): any {
    return this.ddInputFiled.inputProperties;
  }
  set inputProperties(value: any) {
    this.ddInputFiled.inputProperties = value;
    this.setInputDisplay();
  }

  get label(): string {
    return this.ddInputFiled.label;
  }
  set label(value: string) {
    this.ddInputFiled.label = value;
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

  override initBuilder({ args }: { args?: IAcBuilderElementInitArgs; }): void {
    //
  }

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
    if((this.tableName && this.columnName) || this.inputName){
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
  keepHtml:false,
  mediaSvg: ACI_SVG_SOLID.inputPipe,
  instanceClass: AcDDInputFieldBuilderElement,
  properties:[
    {name:'tableName','category':'Data Dictionary',title:'Table',type:'ddTable'},
    {name:'columnName','category':'Data Dictionary',title:'Column',type:'ddTableColumn'},
    {name:'label','category':'Data Dictionary',title:'Label',type:'text'},
    {name:'inputName','category':'Data Dictionary',title:'Input Name',type:'ddSelectInputName'},
    {name:'inputProperties','category':'Data Dictionary',title:'Input Properties',type:'keyValue'},
    {name:'context','category':'Autocode',title:'Context',type:'text'},
    {name:'contextKey','category':'Autocode',title:'Context Key',type:'text'},
  ]
};
