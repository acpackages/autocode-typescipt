/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcTsRuntime } from "@autocode-ts/ac-runtime-ts";
import { AcBuilderElementsManager } from "../core/ac-builder-elements-manager";
import { AcBuilderElement } from "../core/ac-builder-element";
import ts from "typescript";
import { IAcBuilderComponent } from "../interfaces/ac-component.interface";
import { AcBuilderComponent } from "../core/ac-builder-component";
import { IAcComponentElement } from "../interfaces/ac-component-element.interface";
import { AcLogger, Autocode } from "@autocode-ts/autocode";
import { IAcComponentElementPropertyValue } from "../interfaces/ac-component-element-property-value.interface";

export class AcBuilderRuntimeComponent {
  logger:AcLogger;
  component: IAcBuilderComponent;
  componentInstance?: AcBuilderComponent | any;
  scriptScope:any ={'AcBuilderComponent':AcBuilderComponent,'HTMLElement':HTMLElement} ;
  private componentElement?:HTMLElement;
  constructor({ component,logger = new AcLogger({logMessages:false}) }: { component: IAcBuilderComponent,logger?:AcLogger }) {
    this.logger = logger;
    this.component = {...component};
    if(this.component.elements){
      for(const element of Object.values(this.component.elements)){
        element.instance = null;
      }
    }
    this.logger.log("Initialized AcBuilderRuntimeComponent with component:", component);
  }

  createElementInstances() {
    this.logger.log("🧩 [createElementInstances] Starting element instance creation...");
    if (this.componentInstance && this.component.elements) {
      this.logger.log("Found valid componentInstance and elements...");
      for (const element of [...Object.values(this.component.elements)]) {
        this.logger.log("→ Processing element:", element);
        this.setElementInstance({ element });
        if (this.componentInstance[element.instanceName] == undefined && element.instance) {
          this.logger.log(`Assigning instance '${element.instanceName}' to componentInstance.`);
          this.componentInstance[element.instanceName] = element.instance;
        }
      }
    } else {
      this.logger.log("⚠️ No componentInstance or elements found. Skipping element creation.");
    }
    this.logger.log("✅ [createElementInstances] Completed element instance creation!");
  }

  async createInstanceFromScript() {
    this.logger.log("🧠 [createInstanceFromScript] Starting script instance creation...");
    if (this.component && this.component.script) {
      let className = this.component.className;
      this.logger.log(`Found class name: ${className}`);
      if (!className) {
        className = "_" + Autocode.uuid().replaceAll("-", "");
        this.logger.log(`Generated auto class name: ${className}`);
      }

      this.logger.log(`Registering class '${className}' using AcTsRuntime...`);
      const result = await AcTsRuntime.createClass({
        name: className,
        script: this.component.script,
        scope: this.scriptScope
      });
      this.logger.log(`Class registered successfully. Result:`, result);

      this.logger.log(`Creating instance for class '${className}'...`);
      this.componentInstance = AcTsRuntime.createInstance({ name: className });
      this.logger.log(`✅ Created instance for '${className}':`, this.componentInstance);
    } else {
      this.logger.log("⚠️ No component script found. Skipping instance creation.");
    }
    this.logger.log("✅ [createInstanceFromScript] Done creating instance from script!");
  }

  async render() {
    this.logger.log("🎨 [render] Rendering component...");
    await this.createInstanceFromScript();

    if (this.componentInstance && this.componentInstance.element) {
      this.logger.log("Found valid componentInstance with element. Setting innerHTML...");
      this.componentInstance.element.innerHTML = this.component.html;
      this.logger.log("Calling init() on componentInstance...");
      this.componentInstance.init({});
      this.componentElement = this.componentInstance.element;

      if (this.component.elementAttributes) {
        this.logger.log("Applying element attributes to component element...");
        for (const key of Object.keys(this.component.elementAttributes)) {
          const value = this.component.elementAttributes[key];
          this.logger.log(`→ Setting attribute [${key}] = "${value}"`);
          this.componentElement!.setAttribute(key, value);
        }
      }

      this.logger.log("Now creating element instances...");
      this.createElementInstances();
    } else {
      this.logger.log("⚠️ No componentInstance.element found. Skipping rendering logic.");
    }

    this.logger.log("✅ [render] Render completed successfully!");
  }

  setElementInstance({ element }: { element: IAcComponentElement }): any | undefined {
    this.logger.log(`🔧 [setElementInstance] Setting instance for element '${element.instanceName}'...`);
    if (element.instance == undefined) {
      this.logger.log("Element has no existing instance. Fetching from AcBuilderElementsManager...");
      const builderElement = AcBuilderElementsManager.getElement({ name: element.name });
      if (builderElement) {
        this.logger.log("Found builderElement definition:", builderElement);
        element.instance = new builderElement.instanceClass();
        this.logger.log("Created new element instance:", element.instance);

        if (this.componentElement) {
          const el = this.componentElement.querySelector(`[ac-builder-element-instance-name=${element.instanceName}]`) as HTMLElement | undefined | null;
          if (el) {
            this.logger.log(`Linked DOM element for '${element.instanceName}'.`);
            element.instance.element = el;
          } else {
            this.logger.log(`⚠️ No DOM element found for '${element.instanceName}'.`);
          }
        }
      } else {
        this.logger.log(`⚠️ No builderElement found for '${element.name}'.`);
      }
    } else {
      this.logger.log("Element already has an instance. Skipping creation.");
    }

    if (element.instance) {
      this.logger.log(`Calling init() on element '${element.instanceName}' instance...`);
      element.instance.init({});

      this.logger.log("Setting element properties...");
      this.setElementInstanceProperties({ element });

      this.logger.log("Setting element event listeners...");
      this.setElementInstanceEventListeners({ element });
    }

    this.logger.log(`✅ [setElementInstance] Completed for '${element.instanceName}'.`);
    return element.instance;
  }

  setElementInstanceProperties({ element }: { element: IAcComponentElement }) {
    this.logger.log(`⚙️ [setElementInstanceProperties] Setting properties for '${element.instanceName}'...`);
    if (element.instance && element.properties) {
      const propertyNames: string[] = Object.keys(element.properties);
      for (const propertyName of propertyNames) {
        const property: IAcComponentElementPropertyValue = element.properties[propertyName];
        if (property.valueType == 'CLASS_PROPERTY_REFERENCE') {
          this.logger.log(`→ Property '${propertyName}' is CLASS_PROPERTY_REFERENCE. Linking to '${property.value}'.`);
          element.instance[propertyName] = this.componentInstance[property.value];
        } else {
          this.logger.log(`→ Property '${propertyName}' =`, property.value);
          element.instance[propertyName] = property.value;
        }
      }
    } else {
      this.logger.log(`⚠️ No properties found for '${element.instanceName}'.`);
    }
    this.logger.log(`✅ [setElementInstanceProperties] Done for '${element.instanceName}'.`);
  }

  setElementInstanceEventListeners({ element }: { element: IAcComponentElement }) {
    this.logger.log(`🎧 [setElementInstanceEventListeners] Setting event listeners for '${element.instanceName}'...`);
    if (element.instance && element.events) {
      for (const event of Object.values(element.events)) {
        this.logger.log(`→ Processing event '${event.name}' with function '${event.functionName}'`);
        if (event.functionName != undefined) {
          const instance = element.instance as AcBuilderElement;
          this.logger.log("Clearing existing subscriptions...");
          instance.events.clearSubscriptions();

          this.logger.log(`Registering event listener for '${event.name}'...`);
          element.instance.on({
            event: event.name,
            callback: (args: any) => {
              this.logger.log(`⚡ Event '${event.name}' triggered on '${element.instanceName}'. Executing '${event.functionName}'.`);
              this.componentInstance[event.functionName!](args);
            }
          });
        }
      }
    } else {
      this.logger.log(`⚠️ No events found for '${element.instanceName}'.`);
    }
    this.logger.log(`✅ [setElementInstanceEventListeners] Done for '${element.instanceName}'.`);
  }
}
