/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcFilterableElementsAttributeName } from "@autocode-ts/ac-browser";
import { stringToCamelCase } from "@autocode-ts/ac-extensions";
import { AcEvents, AcHooks } from "@autocode-ts/autocode";
import { Editor } from "grapesjs";
import { AcBuilder } from "../elements/ac-builder.element";
import { AcBuilderAttributeName } from "../consts/ac-builder-attribute-name.const";
import { AcBuilderEventsHandler } from "./ac-builder-events-handler";
import { AcBuilderState } from "../models/ac-builder-state.model";
import { IAcBuilderState } from "../interfaces/ac-builder-state.interface";
import { AcBuilderScriptEditor } from "../elements/ac-builder-script-editor.element";
import { AcBuilderElementsManager } from "./ac-builder-elements-manager";
import { AcBuilderDevelopmentRuntime } from "../runtime/ac-builder-development-runtime";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";
import { IAcBuilderComponent } from "../interfaces/ac-component.interface";
import { IAcComponentElement } from "../interfaces/ac-component-element.interface";
import { AcBuilderComponent } from "./ac-builder-component";

export class AcBuilderApi {
  private _component!: IAcBuilderComponent;
  set component(value:IAcBuilderComponent){
    this._component = value;
    this.hooks.execute({hook:AcEnumBuilderHook.ActiveComponentChange,args:{component:value}});
  }
  get component():IAcBuilderComponent{
    return this._component;
  }

  builder: AcBuilder;
  builderState: AcBuilderState;
  eventHandler: AcBuilderEventsHandler;
  events: AcEvents = new AcEvents();
  extensions: any = {};
  grapesJSApi: Editor;
  hooks: AcHooks = new AcHooks();
  components: IAcBuilderComponent[] = [];
  scriptEditor!: AcBuilderScriptEditor;
  selectedElement?: IAcComponentElement;
  runtime?:AcBuilderDevelopmentRuntime;

  constructor({ builder }: { builder: AcBuilder }) {
    this.builder = builder;
    this.runtime = new AcBuilderDevelopmentRuntime({builderApi:this});
    this.builderState = new AcBuilderState({ builderApi: this });
    this.eventHandler = new AcBuilderEventsHandler({ builderApi: this });
    this.grapesJSApi = builder.grapesJSApi;
    this.initScriptEditor();
    AcBuilderElementsManager.registerBuiltInExtensions();
    this.addElementsFromRegister();
    this.component = { name: 'default', elements: {} };
    console.log(AcBuilderElementsManager.getElements());
  }

  private addElementsFromRegister() {
    for(const element of AcBuilderElementsManager.getElements()){
      if (element.properties == undefined) {
      element.properties = [];
    }
    element.properties = [{
      category: 'General',
      name: 'instanceName',
      title: 'Instance Name',
      type: 'string'
    }, ...element.properties];
    const domc = this.grapesJSApi.DomComponents;
    const instance = this;
    domc.addType(element.name, {
      model: {
        defaults: {
          tagName: element.tag,
        },
      },
      view: {
        init(args: any) {
          let currentCount: number = 0;
          if (instance.component && instance.component.elements) {
            currentCount = Object.values(instance.component.elements).filter((el) => { return el.name == element.name }).length;
          }
          currentCount++;
          const elementId: string = stringToCamelCase(`${element.name.replaceAll(" ", "_")}_${currentCount}`);
          const componentElement: IAcComponentElement = {
            id: elementId,
            name: element.name,
            events: {},
            properties: {
              instanceName: { name: 'instanceName', value: elementId }
            }
          }
          instance.component.elements![elementId] = componentElement;
          //   const callbackArgs: IAcBuilderElementInitArgs = {
          //     element: this.el as HTMLElement
          //   }
            setTimeout(() => {
              this.el.setAttribute(AcBuilderAttributeName.acBuilderElementId, elementId);
              // elInstance.init({args:callbackArgs});
              // instance.hooks.execute({ hook: AcEnumBuilderHook.ElementInit, args: args });
            }, 1);
          // }
        }
      },
    });
    this.grapesJSApi.BlockManager.add(element.name, {
      label: element.title,
      attributes: { [AcFilterableElementsAttributeName.acFilterValue]: element.title.toLowerCase() },
      content: { type: element.name },
      category: element.category,
      media: element.mediaSvg
    });
    this.scriptEditor.registerType({type:element.instanceClass});
    }

  }

  fromJson(json: IAcBuilderState) {
    this.builderState.fromJson(json);
  }

  initScriptEditor() {
    if (this.scriptEditor == undefined) {
      this.scriptEditor = new AcBuilderScriptEditor({ builderApi: this });
      this.scriptEditor.registerType({type:AcBuilderComponent});
      if (this.component && this.component.script) {
        this.scriptEditor.setCode({ code: this.component.script });
      }
      (this.builder.element.querySelector('.ac-builder-script-container') as HTMLElement).append(this.scriptEditor.element);
      this.scriptEditor.on({
        event: 'close', callback: () => {
          this.builder.scriptEditorDrawer.close();
        }
      });
    }
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

  setActiveComponent({ component }: { component: IAcBuilderComponent }) {
    console.log(this);
    this.component = component;
    if (this.component.html) {
      this.grapesJSApi.setComponents(this.component.html);
    }
    if (this.component.script) {
      this.scriptEditor.setCode({ code: this.component.script });
    }
  }

  toggleScriptEditor() {
    this.initScriptEditor();
    this.builder.scriptEditorDrawer.toggle();
  }

  toJson(): IAcBuilderState {
    return this.builderState.toJson();
  }
}
