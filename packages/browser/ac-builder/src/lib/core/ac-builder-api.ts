/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcFilterableElementsAttributeName } from "@autocode-ts/ac-browser";
import { stringToCamelCase } from "@autocode-ts/ac-extensions";
import { AcEvents, AcHooks, Autocode } from "@autocode-ts/autocode";
import { Editor } from "grapesjs";
import { AcBuilder } from "../elements/ac-builder.element";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";
import { IAcBuilderElementCallbackArgs } from "../interfaces/callback-args/ac-builder-component-callback-args.interface";
import { IAcPage } from "../interfaces/ac-page.interface";
import { acGetHtmlComponents } from "../consts/ac-html-components.consts";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";
import { AcBuilderAttributeName } from "../consts/ac-builder-attribute-name.const";
import { IAcPageElement } from "../interfaces/ac-page-element.interface";
import { AcBuilderEventsHandler } from "./ac-builder-events-handler";
import { AcBuilderState } from "../models/ac-builder-state.model";
import { IAcBuilderState } from "../interfaces/ac-builder-state.interface";
import { AcBuilderScriptEditor } from "../elements/ac-builder-script-editor.element";

export class AcBuilderApi {
  builder: AcBuilder;
  builderState: AcBuilderState;
  elements: Record<string, IAcBuilderElement> = {};
  eventHandler: AcBuilderEventsHandler;
  events: AcEvents = new AcEvents();
  extensions: any = {};
  grapesJSApi: Editor;
  hooks: AcHooks = new AcHooks();
  pages: IAcPage[] = [];
  page: IAcPage = { name: 'default', elements: {} };
  scriptEditor?: AcBuilderScriptEditor;
  selectedElement?: IAcPageElement;

  constructor({ builder }: { builder: AcBuilder }) {
    this.builder = builder;
    this.builderState = new AcBuilderState({ builderApi: this });
    this.eventHandler = new AcBuilderEventsHandler({ builderApi: this });
    this.grapesJSApi = builder.grapesJSApi;
    const htmlComponents = acGetHtmlComponents();
    for (const component of htmlComponents) {
      this.addElement({ element: component });
    }
  }

  addElement({ element }: { element: IAcBuilderElement }) {
    if(element.properties == undefined){
      element.properties = [];
    }
    element.properties = [{
      category:'General',
      name:'instanceName',
      title:'Instance Name',
      type:'text'
    },...element.properties];
    this.elements[element.name] = element;
    const domc = this.grapesJSApi.DomComponents;
    const instance = this;
    domc.addType(element.tag, {
      model: {
        defaults: {
          tagName: element.name,
        },
      },
      view: {
        init(args: any) {
          let currentCount:number = 0;
          if(instance.page && instance.page.elements){
            currentCount = Object.values(instance.page.elements).filter((el)=>{return el.name == element.name}).length;
          }
          currentCount++;
          const elementId: string = stringToCamelCase(`${element.name.replaceAll(" ","_")}_${currentCount}`);
          const pageElement: IAcPageElement = {
            id: elementId,
            name: element.name,
            events: {},
            element:this.el,
            properties: {
              instanceName:{name:'instanceName',value:elementId}
            }
          }
          instance.page.elements![elementId] = pageElement;
          if (element.initCallback) {
            const callbackArgs: IAcBuilderElementCallbackArgs = {
              element: this.el as HTMLElement
            }
            setTimeout(() => {
              this.el.setAttribute(AcBuilderAttributeName.acBuilderElementId, elementId);
              element.initCallback!(callbackArgs);
              instance.hooks.execute({ hook: AcEnumBuilderHook.ElementInit, args: args });
            }, 1);
          }
        }
      },
    });
    this.grapesJSApi.BlockManager.add(element.tag, {
      label: element.title,
      attributes: { [AcFilterableElementsAttributeName.acFilterValue]: element.title.toLowerCase() },
      content: { type: element.tag },
      category: element.category,
      media: element.mediaSvg
    });
  }

  fromJson(json: IAcBuilderState) {
    this.builderState.fromJson(json);
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

  toggleScriptEditor() {
    if (this.scriptEditor == undefined) {
      this.scriptEditor = new AcBuilderScriptEditor({ builderApi: this });
      if(this.page.script){
        this.scriptEditor.setCode({code:this.page.script});
      }
      (this.builder.element.querySelector('.ac-builder-script-container') as HTMLElement).append(this.scriptEditor.element);
      this.scriptEditor.on({
        event: 'close', callback: () => {
          this.builder.scriptEditorDrawer.close();
        }
      });
    }
    this.builder.scriptEditorDrawer.toggle();
  }

  toJson(): IAcBuilderState {
    return this.builderState.toJson();
  }
}
