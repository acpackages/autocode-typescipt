/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement } from "@autocode-ts/ac-browser";
import { AcEvents } from "@autocode-ts/autocode";
import { AcBuilderApi } from "../core/ac-builder-api";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { AcTypescriptEditorHelper } from "../helpers/ac-typescript-editor-helper.helper";

export class AcBuilderScriptEditor {
  builderApi: AcBuilderApi;
  editor!: monaco.editor.IStandaloneCodeEditor;
  element: HTMLElement = document.createElement('div');
  events: AcEvents = new AcEvents();
  helper:AcTypescriptEditorHelper;
  private _title: string = 'Script Editor';
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
    this.element.querySelector('.ac-script-editor-title')!.innerHTML = value;
  }

  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
    acAddClassToElement({ element: this.element, cssClass: 'ac-builder-script-editor' });
    this.element.innerHTML = `<div class="ac-builder-script-editor-header">
      <div class="ac-builder-script-editor-header-title">
        <div class="ac-script-editor-title"></div>
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
    this.editor = monaco.editor.create(this.element.querySelector('.ac-builder-script-editor-body') as HTMLElement, {
      value: ``,
      language: 'typescript',
      theme: 'vs-dark',
      automaticLayout: true, // auto-resize with window
    });
    this.helper = new AcTypescriptEditorHelper({scriptEditor:this});
    const closeButton = this.element.querySelector(".btn-close-action") as HTMLElement;
    closeButton.addEventListener('click', () => {
      this.events.execute({ 'event': 'close' });
    })
  }

  async addCodeInsideClass({ className, code }: { className: string, code: string }) {
    await this.helper.addCodeInsideClass({className,code});
  }

  async gotoFunction({className,functionName}:{className: string, functionName: string}) {
    await this.helper.gotoFunction({className,functionName});
  }

  async formatCode(){
    await this.helper.formatCode();
  }

  getCode(): string {
    return this.helper.getCode();
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

  async setCode({ code }: { code: string }) {
    await this.helper.setCode({code});
  }
}
