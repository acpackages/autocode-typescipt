import { AcTextareaInputElement } from "@autocode-ts/ac-browser";
import { AcDDEAttributeName, AcDDECssClassName, IAcDDETrigger } from "../../_ac-data-dictionary-editor.export";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDelayedCallback, AcEvents } from "@autocode-ts/autocode";

export class AcDDETriggerMaster {
  private _trigger: IAcDDETrigger | any;
  get trigger(): IAcDDETrigger {
    return this._trigger;
  }
  set trigger(value: IAcDDETrigger) {
    this._trigger = value;
    this.queryInput.value = value.triggerCode ? value.triggerCode : '';
  }

  changeTimeout:any;
  element: HTMLElement = document.createElement('div');
  queryInput: AcTextareaInputElement;
  events: AcEvents = new AcEvents();
  delayedCallback:AcDelayedCallback = new AcDelayedCallback();

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.element.classList.add(AcDDECssClassName.acDDEMasterContainer);
    this.element.innerHTML = `
    <div class="form-group" style="height:100%">
        <label>Trigger Query</label>
        <div style="height:calc(100% - 25px);">
        <ac-textarea-input class="form-control query-input" rows="12"></ac-textarea-input>
        </div>
      </div>
    `;
    this.queryInput = this.element.querySelector('.query-input') as AcTextareaInputElement;
    this.queryInput.on({
      event: 'change', callback: () => {
        this.notifyChange();
      }
    });
    this.queryInput.on({
      event: 'input', callback: () => {
        this.notifyChange();
      }
    });
  }

  notifyChange() {
    if (this.changeTimeout) {
      clearTimeout(this.changeTimeout);
    }
    this.delayedCallback.add({callback:() => {
      this.trigger.triggerCode = this.queryInput.value;
      this.events.execute({ event: 'change', args: { trigger: this.trigger } });
    }, duration:300});
  }

  on({ event, callback }: { event: string, callback: Function }) {
    this.events.subscribe({ event, callback });
  }
}
