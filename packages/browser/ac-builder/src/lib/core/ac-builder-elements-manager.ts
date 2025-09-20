/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AC_BUILDER_AUDIO_ELEMENT } from "../builder-elements/ac-audio-element.element";
import { AC_BUILDER_BUTTON_ELEMENT } from "../builder-elements/ac-button-element.element";
import { AC_BUILDER_CANVAS_ELEMENT } from "../builder-elements/ac-canvas-element.element";
import { AC_BUILDER_CHECKBOX_ELEMENT } from "../builder-elements/ac-checkbox-element.element";
import { AC_BUILDER_CONTAINER_ELEMENT } from "../builder-elements/ac-container-element.element";
import { AC_BUILDER_FORM_ELEMENT } from "../builder-elements/ac-form-element.element";
import { AC_BUILDER_IMAGE_ELEMENT } from "../builder-elements/ac-image-element.element";
import { AC_BUILDER_INPUT_ELEMENT } from "../builder-elements/ac-input-element.element";
import { AC_BUILDER_LABEL_ELEMENT } from "../builder-elements/ac-label-element.element";
import { AC_BUILDER_LINK_ELEMENT } from "../builder-elements/ac-link-element.element";
import { AC_BUILDER_ORDERED_LIST_ELEMENT } from "../builder-elements/ac-ordered-list-element.element";
import { AC_BUILDER_PARAGRAPH_ELEMENT } from "../builder-elements/ac-paragraph-element.element";
import { AC_BUILDER_RADIO_ELEMENT } from "../builder-elements/ac-radio-element.element";
import { AC_BUILDER_SELECT_ELEMENT } from "../builder-elements/ac-select-element.element";
import { AC_BUILDER_TABLE_ELEMENT } from "../builder-elements/ac-table-element.element";
import { AC_BUILDER_TEXTAREA_ELEMENT } from "../builder-elements/ac-textarea-element.element";
import { AC_BUILDER_UNORDERED_LIST_ELEMENT } from "../builder-elements/ac-unordered-list-element.element";
import { AC_BUILDER_VIDEO_ELEMENT } from "../builder-elements/ac-video-element.element";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";
import { AcBuilderElement } from "./ac-builder-element";
import { AcBuilderExtension } from "./ac-builder-extension";
import { AcBuilderPropertyInputsManager } from "./ac-builder-property-inputs-manager";

export class AcBuilderElementsManager {
  private static builtInElementsRegistered:boolean = false;
  private static elements: Record<string, IAcBuilderElement<any>> = {};

  static getElement({name}:{name:string}):IAcBuilderElement|undefined {
    return this.elements[name];
  }

  static getElements():IAcBuilderElement[] {
    return Object.values(this.elements);
  }

  static hasElement({name}:{name:string}):boolean {
    return this.elements[name] != undefined;
  }

  static init(){
    this.registerBuiltInExtensions();
  }

  static register<T extends AcBuilderElement>({element}:{element: IAcBuilderElement<T>}): void {
    if (this.elements[element.name]) {
      console.warn(`Element ${element.name} is already registered. Overwriting.`);
    }
    this.elements[element.name] = element;
  }

  static createInstance<T extends AcBuilderExtension = AcBuilderExtension>({extensionName}:{extensionName:string}): T | null {
    const entry = this.elements[extensionName];
    if (!entry) return null;
    return new entry.instanceClass();
  }

  static registerBuiltInExtensions(){
    if(!this.builtInElementsRegistered){
      AcBuilderPropertyInputsManager.init();
      this.register({element:AC_BUILDER_AUDIO_ELEMENT});
      this.register({element:AC_BUILDER_BUTTON_ELEMENT});
      this.register({element:AC_BUILDER_CANVAS_ELEMENT});
      this.register({element:AC_BUILDER_CHECKBOX_ELEMENT});
      this.register({element:AC_BUILDER_CONTAINER_ELEMENT});
      this.register({element:AC_BUILDER_FORM_ELEMENT});
      this.register({element:AC_BUILDER_IMAGE_ELEMENT});
      this.register({element:AC_BUILDER_INPUT_ELEMENT});
      this.register({element:AC_BUILDER_LABEL_ELEMENT});
      this.register({element:AC_BUILDER_LINK_ELEMENT});
      this.register({element:AC_BUILDER_ORDERED_LIST_ELEMENT});
      this.register({element:AC_BUILDER_PARAGRAPH_ELEMENT});
      this.register({element:AC_BUILDER_RADIO_ELEMENT});
      this.register({element:AC_BUILDER_SELECT_ELEMENT});
      this.register({element:AC_BUILDER_TABLE_ELEMENT});
      this.register({element:AC_BUILDER_TEXTAREA_ELEMENT});
      this.register({element:AC_BUILDER_UNORDERED_LIST_ELEMENT});
      this.register({element:AC_BUILDER_VIDEO_ELEMENT});
      this.builtInElementsRegistered = true;
    }
  }
}
