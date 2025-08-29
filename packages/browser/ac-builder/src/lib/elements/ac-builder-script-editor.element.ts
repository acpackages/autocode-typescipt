/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement } from "@autocode-ts/ac-browser";
import { AcEvents } from "@autocode-ts/autocode";
import { AcBuilderApi } from "../core/ac-builder-api";
import * as modacoEditor from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

export class AcBuilderScriptEditor {
  builderApi: AcBuilderApi;
  editor!: modacoEditor.editor.IStandaloneCodeEditor;
  element: HTMLElement = document.createElement('div');
  events:AcEvents = new AcEvents();
  private _title:string = 'Script Editor';
  get title():string{
    return this._title;
  }

  set title(value:string){
    this._title = value;
    this.element.querySelector('.ac-builder-script-editor-header-title')!.innerHTML = value;
  }
  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
    acAddClassToElement({element:this.element,cssClass:'ac-builder-script-editor'});
    this.element.innerHTML = `<div class="ac-builder-script-editor-header">
      <div class="ac-builder-script-editor-header-title">

      </div>
      <div class="ac-builder-script-editor-header-actions">
        <div class="ac-builder-script-editor-header-actions-container">
          <button type="button" class="btn btn-action btn-close-action" data-bs-toggle="tooltip" data-bs-title="Redo">
                <i class="fa fa-times text-secondary"></i>
              </button>
        </div>
      </div>
    </div>
    <div class="ac-builder-script-editor-body"></div>`;

    this.title = "Events Script";
    ; (self as any).MonacoEnvironment = {
      getWorker(_: string, label: string) {
        switch (label) {
          case "typescript":
          case "javascript":
            return new tsWorker();
          default:
            return new editorWorker();
        }
      },
    };
    this.editor = modacoEditor.editor.create(this.element.querySelector('.ac-builder-script-editor-body') as HTMLElement, {
      value: ``,
      language: 'typescript',
      theme: 'vs-dark',
      automaticLayout: true, // auto-resize with window
    });
    const closeButton = this.element.querySelector(".btn-close-action") as HTMLElement;
    closeButton.addEventListener('click',()=>{
      this.events.execute({'event':'close'});
    })
  }

  on({event,callback}:{event:string,callback:Function}):string{
    return this.events.subscribe({event,callback});
  }
}
