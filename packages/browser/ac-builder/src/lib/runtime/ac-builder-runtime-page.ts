/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcRuntime } from "@autocode-ts/ac-browser";
import { AcBuilderPage } from "../core/ac-builder-page";
import { IAcPage } from "../interfaces/ac-page.interface";
import { AcBuilderElementsManager } from "../core/ac-builder-elements-manager";
import { IAcPageElement } from "../interfaces/ac-page-element.interface";
import { AcBuilderElement } from "../core/ac-builder-element";
import ts from "typescript";

export class AcBuilderRuntimePage {
  page: IAcPage;
  pageInstance?: AcBuilderPage | any;
  constructor({ page }: { page: IAcPage }) {
    this.page = page;
  }

  createElementInstances() {
    if (this.pageInstance && this.page.elements) {
      for (const element of Object.values(this.page.elements)) {
        this.setElementInstance({ element });
        if (this.pageInstance[element.id] == undefined && element.instance) {
          this.pageInstance[element.id] = element.instance;
        }
      }
    }
  }

  createInstanceFromScript() {
    if (this.page && this.page.className && this.page.script) {
      const jsScript = ts.transpile(this.page.script, {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext
      });
      const result = AcRuntime.createClass({ name: this.page.className, script: jsScript });
      this.pageInstance = AcRuntime.createInstance({ name: this.page.className });
    }
  }

  render() {
    this.createInstanceFromScript();
    this.createElementInstances();
  }

  setElementInstance({ element }: { element: IAcPageElement }): any | undefined {
    if (element.instance == undefined) {
      const builderElement = AcBuilderElementsManager.getElement({ name: element.name });
      if (builderElement) {
        element.instance = new builderElement.instanceClass();
      }
    }
    if (element.instance) {
      this.setElementInstanceProperties({ element });
      this.setElementInstanceEventListeners({ element });
    }
    return element.instance;
  }

  setElementInstanceProperties({ element }: { element: IAcPageElement }) {
    if (element.instance && element.properties) {
      for (const property of Object.values(element.properties)) {
        element.instance[property.name] = property.value;
      }
    }
  }

  setElementInstanceEventListeners({ element }: { element: IAcPageElement }) {
    if (element.instance && element.events) {
      for (const event of Object.values(element.events)) {
        if (event.functionName != undefined) {
          const instance = element.instance as AcBuilderElement;
          instance.events.clearSubscriptions();
          element.instance.on({
            event: event.name, callback: (args: any) => {
              this.pageInstance[event.functionName!](args)
            }
          });
        }
      }
    }
  }
}
