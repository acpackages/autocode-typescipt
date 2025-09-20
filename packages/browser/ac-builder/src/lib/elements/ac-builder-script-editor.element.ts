/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement, AcEnumResizePanelDirection, AcResizableAttributeName, AcResizablePanels } from "@autocode-ts/ac-browser";
import { AcEvents } from "@autocode-ts/autocode";
import { AcBuilderApi } from "../core/ac-builder-api";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import { AcTypescriptEditorHelper } from "../helpers/ac-typescript-editor-helper.helper";
import { AC_BUILDER_SVGS } from "../consts/ac-builder-svgs.consts";
import { AcHtmlEditorHelper } from "../helpers/ac-html-editor-helper.helper";

export class AcBuilderScriptEditor {
  builderApi: AcBuilderApi;
  htmlEditor!: monaco.editor.IStandaloneCodeEditor;
  tsEditor!: monaco.editor.IStandaloneCodeEditor;
  element: HTMLElement = document.createElement('div');
  events: AcEvents = new AcEvents();
  helper: AcTypescriptEditorHelper;
  htmlHelper: AcHtmlEditorHelper;
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
    acAddClassToElement({ element: this.element, class_: 'ac-builder-script-editor' });
    this.element.innerHTML = `<div class="ac-builder-script-editor-header">
      <div class="ac-builder-script-editor-header-title">
        <div class="ac-script-editor-title"></div>
      </div>
      <div class="ac-builder-script-editor-header-actions">
        <div class="ac-builder-script-editor-header-actions-container">
          <button type="button" class="btn btn-action btn-close-action p-0 text-secondary me-1" style="width:28px;height:100%;padding-top:5px;" ac-tooltip="Close Editor">
                <ac-svg-icon class="p-1">${AC_BUILDER_SVGS.xMark}</ac-svg-icon>
              </button>
        </div>
      </div>
    </div>
    <div class="ac-builder-script-editor-body">
      <div class="ac-html-editor-container ac-script-editor-container" ${AcResizableAttributeName.acResizablePanel}></div>
      <div class="ac-typescript-editor-container ac-script-editor-container" ${AcResizableAttributeName.acResizablePanel}></div>
    </div>`;

    this.title = "Component Code";
    ; (self as any).MonacoEnvironment = {
      getWorker(_: string, label: string) {
        switch (label) {
          case "typescript":
          case "javascript":
            return new tsWorker();
          case "html":
          case "handlebars":
          case "razor":
            return new htmlWorker();
          default:
            return new editorWorker();
        }
      },
    };
    this.tsEditor = monaco.editor.create(this.element.querySelector('.ac-typescript-editor-container') as HTMLElement, {
      value: ``,
      language: 'typescript',
      theme: 'vs-dark',
      automaticLayout: true,
      wordWrap: "on", // ✅ enable word wrap
  wrappingIndent: "same",
    });
     this.htmlEditor = monaco.editor.create(this.element.querySelector('.ac-html-editor-container') as HTMLElement, {
      value: ``,
      language: 'html',
      theme: 'vs-dark',
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: "on", // ✅ enable word wrap
      wrappingIndent: "same",
    });
    this.helper = new AcTypescriptEditorHelper({ editor: this.tsEditor,builderApi:this.builderApi });
    this.htmlHelper = new AcHtmlEditorHelper({ editor: this.htmlEditor,builderApi:this.builderApi });
    const closeButton = this.element.querySelector(".btn-close-action") as HTMLElement;
    closeButton.addEventListener('click', () => {
      this.events.execute({ 'event': 'close' });
    });
    const panels = new AcResizablePanels({ element: this.element.querySelector('.ac-builder-script-editor-body') as HTMLElement, direction: AcEnumResizePanelDirection.Horizontal });
    panels.setPanelSizes({
      panelSizes: [
        { size: 30, index: 0 },
        { size: 70, index: 1 },
      ]
    });
  }

  async addCodeInsideClass({ className, code }: { className: string, code: string }) {
    await this.helper.addCodeInsideClass({ className, code });
  }

  async gotoFunction({ className, functionName }: { className: string, functionName: string }) {
    await this.helper.gotoFunction({ className, functionName });
  }

  async formatCode() {
    this.helper.formatCode();

  }

  getCode(): string {
    return this.helper.getCode();
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

  registerType({ type }: { type: any }) {
    this.helper.registerTypeToEditor({ type });
  }

  async renamePropertyInClass({
    className,
    oldName,
    newName,
    autoFormat = true
  }: { className: string; oldName: string; newName: string; autoFormat?: boolean }): Promise<void> {
    await this.helper.renameFunctionInClass({ className, oldName, newName, autoFormat });
  }

  async renameFunctionInClass({
    className,
    oldName,
    newName,
    autoFormat = true
  }: { className: string; oldName: string; newName: string; autoFormat?: boolean }): Promise<void> {
    await this.helper.renameFunctionInClass({ className, oldName, newName, autoFormat });
  }

  async setTsCode({ code }: { code: string }) {
    await this.helper.setCode({ code });
  }

  getCleanHtml() {
  const container = document.createElement("div");


  const builderIframe = this.builderApi.grapesJSApi.Canvas.getFrameEl();
    if(builderIframe){
      const iframeDocument = builderIframe.contentDocument || builderIframe.contentWindow?.document;
      if (iframeDocument) {
        const iframeBody = (iframeDocument.querySelector('body') as HTMLElement).cloneNode(true) as HTMLElement;
        for(const styleEl of Array.from(iframeBody.querySelectorAll('style'))){
          styleEl.remove();
        }
        for(const scriptEl of Array.from(iframeBody.querySelectorAll('script'))){
          scriptEl.remove();
        }
        container.innerHTML = iframeBody.innerHTML; // raw GrapesJS HTML
      }

      const el = container.querySelector('.gjs-css-rules') as HTMLElement|undefined;
    if(el){
      el.remove();
    }
     const el1 = container.querySelector('.gjs-js-cont') as HTMLElement|undefined;
    if(el1){
      el1.remove();
    }
    }


  // recursively remove GrapesJS internal attributes
  function clean(node:any) {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const element = node as HTMLElement;
    // list of GrapesJS internal attributes
    const gjsAttrs = ["gjs-id", "gjs-type", "gjs-name", "data-gjs-type", "data-gjs-name","data-gjs-highlightable","draggable","contenteditable"];
    gjsAttrs.forEach(attr => node.removeAttribute(attr));

    for(const className of Array.from(element.classList)){
      console.log(className);
      if(className.startsWith("gjs-")){
        (node as HTMLElement).classList.remove(className);
      }
    }

    // clean children recursively
    node.childNodes.forEach(clean);
  }

  container.childNodes.forEach(clean);
  return container.innerHTML;
}

  async refreshHtmlCode(){

        // await this.htmlHelper.setCode({code:iframeBody.innerHTML});
        // this.builderApi.component.html = this.htmlHelper.getCode();
        await this.htmlHelper.setCode({code:this.getCleanHtml()});
  }
}
