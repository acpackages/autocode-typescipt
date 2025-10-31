import { AcTextareaInput } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { IAcDDEView } from "../../_ac-data-dictionary-editor.export";
import { AcEvents } from "@autocode-ts/autocode";

export class AcDDEViewMaster{
  private _view:IAcDDEView|any;
  get view():IAcDDEView{
    return this._view;
  }
  set view(value:IAcDDEView){
    this._view = value;
    this.queryInput.value = value.viewQuery ? value.viewQuery : '';
  }

  element:HTMLElement = document.createElement('div');
  queryInput:AcTextareaInput;
  events:AcEvents = new AcEvents();

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.element.style.display = 'contents';
    this.element.innerHTML = `
    <div class="card card-body p-2">
      <div class="form-group">
        <label>View Query</label>
        <ac-textarea-input class="form-control query-input" rows="6"></ac-textarea-input>
      </div>
    </div>
    `;
    this.queryInput = this.element.querySelector('.query-input') as AcTextareaInput;
    this.queryInput.on({event:'change',callback:()=>{
      this.view.viewQuery = this.queryInput.value;
      this.events.execute({event:'change',args:{view:this.view}});
    }});
    this.queryInput.on({event:'input',callback:()=>{
      this.view.viewQuery = this.queryInput.value;
      this.events.execute({event:'change',args:{view:this.view}});
    }});
  }

  on({event,callback}:{event:string,callback:Function}){
    this.events.subscribe({event,callback});
  }
}
