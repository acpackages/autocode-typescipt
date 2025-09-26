/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcRuntime } from "@autocode-ts/ac-browser";
import { AcBuilderElementsManager } from "../core/ac-builder-elements-manager";
import { AcBuilderElement } from "../core/ac-builder-element";
import ts from "typescript";
import { IAcBuilderComponent } from "../interfaces/ac-component.interface";
import { AcBuilderComponent } from "../core/ac-builder-component";
import { IAcComponentElement } from "../interfaces/ac-component-element.interface";
import { Autocode } from "@autocode-ts/autocode";
import { IAcComponentElementPropertyValue } from "../interfaces/ac-component-element-property-value.interface";

export class AcBuilderRuntimeComponent {
  component: IAcBuilderComponent;
  componentInstance?: AcBuilderComponent | any;
  scriptScope:any ={'AcBuilderComponent':AcBuilderComponent,'HTMLElement':HTMLElement} ;
  private componentElement?:HTMLElement;
  constructor({ component }: { component: IAcBuilderComponent }) {
    this.component = component;
  }

  createElementInstances() {
    if (this.componentInstance && this.component.elements) {
      for (const element of Object.values(this.component.elements)) {
        this.setElementInstance({ element });
        if (this.componentInstance[element.instanceName] == undefined && element.instance) {
          this.componentInstance[element.instanceName] = element.instance;
        }
      }
    }
  }

  createInstanceFromScript() {
    if (this.component && this.component.script) {
      let className = this.component.className;
      if(!className){
        className = `_`+Autocode.uuid().replaceAll("-","");
      }
      const jsScript = ts.transpile(this.component.script, {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext
      });
      const result = AcRuntime.createClass({ name: className, script: jsScript,scope:this.scriptScope});
      this.componentInstance = AcRuntime.createInstance({ name: className });
    }
  }

  render() {
    this.createInstanceFromScript();
    if(this.componentInstance && this.componentInstance.element){
      this.componentInstance.element.innerHTML = this.component.html;
      this.componentInstance.init({});
      this.componentElement = this.componentInstance.element;
      if(this.component.elementAttributes){
        for(const key of Object.keys(this.component.elementAttributes)){
          this.componentElement!.setAttribute(key,this.component.elementAttributes[key]);
        }
      }
      this.createElementInstances();
    }
  }

  setElementInstance({ element }: { element: IAcComponentElement }): any | undefined {
    if (element.instance == undefined) {
      const builderElement = AcBuilderElementsManager.getElement({ name: element.name });
      if (builderElement) {
        element.instance = new builderElement.instanceClass();
        if(this.componentElement){
          const el = this.componentElement.querySelector(`[ac-builder-element-instance-name=${element.instanceName}]`) as HTMLElement|undefined|null;
          if(el){
            element.instance.element = el;
          }
        }
      }
    }
    if (element.instance) {
      element.instance.init({});

      this.setElementInstanceProperties({ element });
      this.setElementInstanceEventListeners({ element });
    }
    return element.instance;
  }

  setElementInstanceProperties({ element }: { element: IAcComponentElement }) {
    if (element.instance && element.properties) {
      const propertyNames:string[] = Object.keys(element.properties)
      for (const propertyName of propertyNames) {
        const property:IAcComponentElementPropertyValue = element.properties[propertyName];
        if(property.valueType == 'CLASS_PROPERTY_REFERENCE'){
          console.log(property.value);
          element.instance[propertyName] = this.componentInstance[property.value];
        }
        else{
          element.instance[propertyName] = property.value;
        }
      }
    }
  }

  setElementInstanceEventListeners({ element }: { element: IAcComponentElement }) {
    if (element.instance && element.events) {
      for (const event of Object.values(element.events)) {
        if (event.functionName != undefined) {
          const instance = element.instance as AcBuilderElement;
          instance.events.clearSubscriptions();
          element.instance.on({
            event: event.name, callback: (args: any) => {
              this.componentInstance[event.functionName!](args)
            }
          });
        }
      }
    }
  }

}
