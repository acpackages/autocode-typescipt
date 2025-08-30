/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acAddClassToElement, AcEnumInputEvent, AcFilterableElementsAttributeName, AcInput } from "@autocode-ts/ac-browser";
import { stringToCamelCase } from "@autocode-ts/ac-extensions";
import { AcBuilderApi } from "../core/ac-builder-api";
import { IAcBuilderElementEvent } from "../interfaces/ac-builder-element-event.interface";
import { IAcPageElement } from "../interfaces/ac-page-element.interface";
import { AcEventSelectInput } from "./inputs/ac-event-select-input.element";

export class AcElementEventInput {
  builderApi: AcBuilderApi;
  element: HTMLElement = document.createElement('div');
  event: IAcBuilderElementEvent;
  pageElement: IAcPageElement;
  input!: AcEventSelectInput;
  constructor({ builderApi, event, pageElement }: { builderApi: AcBuilderApi, pageElement: IAcPageElement, event: IAcBuilderElementEvent }) {
    this.builderApi = builderApi;
    this.event = event;
    this.pageElement = pageElement;
    this.element.setAttribute(AcFilterableElementsAttributeName.acFilterValue, this.event.title);
    acAddClassToElement({ element: this.element, cssClass: 'gjs-sm-property gjs-sm-color gjs-sm-property__color gjs-sm-property--full' })
    this.element.innerHTML = `
        <div class="gjs-sm-label">
        <span class="gjs-sm-icon ">
          ${event.title}
        </span>
      </div>
        <div class="gjs-fields" data-sm-fields="">
          <div class="gjs-field">
            <span class="gjs-input-holder">
            </span>
            <span class="gjs-field-arrows px-0" style="min-width:max-content;padding-top:0px">
            <button type="button" class="btn py-0 px-1 btn-add-event" style="height:100%;margin-top:-3px"><i class="fa fa-plus text-secondary"></i></button>
            </span>
          </div>
      </div>`;
    this.setInput();
  }

  private setInput() {
    this.input = new AcEventSelectInput({ builderApi: this.builderApi });
    this.input.init();
    (this.element.querySelector('.gjs-input-holder') as HTMLInputElement).append(this.input.element);
    if (this.pageElement && this.pageElement.events) {
      if (this.pageElement.events[this.event.name]) {
        this.input.value = this.pageElement.events[this.event.name].functionName;
      }
    }
    this.input.on({event: AcEnumInputEvent.ValueChange, callback: () => {
        this.pageElement.events[this.event.name] = {
          name: this.event.name,
          functionName:this.input.value
        };
      }
    });
    (this.element.querySelector('.btn-add-event') as HTMLInputElement).addEventListener('click', async () => {
      const functionName = stringToCamelCase(`handle_${this.pageElement.id}_${this.event.name}`);
      await this.builderApi.scriptEditor?.addCodeInsideClass({ className: this.builderApi.page.scriptClassName!, code: `${functionName}() {\n\t}\n` });
      await this.builderApi.scriptEditor.gotoFunction({className:this.builderApi.page.scriptClassName!,functionName:functionName});
      this.input.value = functionName;
      this.builderApi.toggleScriptEditor();
    });
    this.input.on({event:AcEnumInputEvent.DoubleClick,callback:async ()=>{
      this.input.selectInput.closeDropdown();
      this.builderApi.toggleScriptEditor();
      if (this.pageElement && this.pageElement.events && this.pageElement.events[this.event.name] && this.pageElement.events[this.event.name].functionName){
        await this.builderApi.scriptEditor.gotoFunction({className:this.builderApi.page.scriptClassName!,functionName:this.pageElement.events[this.event.name].functionName!});
      }
    }});
  }
}
