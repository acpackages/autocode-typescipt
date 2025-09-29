/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as monaco from "monaco-editor";
import { AcBuilderApi } from "../core/ac-builder-api";
import { IAcEditorHtmlChangeHookArgs } from "../interfaces/hook-args/ac-editor-html-change-hook-args.interface";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";
import { AcEnumBuilderEvent } from "../enums/ac-enum-builder-event.enum";

export class AcHtmlEditorHelper {
  private editor: monaco.editor.IStandaloneCodeEditor;
  private builderApi: AcBuilderApi;
  private listenForChanges: boolean = true;

  constructor({ editor, builderApi }: { editor: monaco.editor.IStandaloneCodeEditor, builderApi: AcBuilderApi }) {
    this.editor = editor;
    this.builderApi = builderApi;
    this.editor.handleInitialized = () => {
      //
    };
    this.registerListeners();
  }

  private cleanupBlankLines(): void {
    const model = this.editor.getModel()!;
    const text = model.getValue();

    // Replace 2+ newlines with a single newline
    const cleaned = text.replace(/\n{2,}/g, "\n\n");

    if (cleaned !== text) {
      model.setValue(cleaned);
    }
  }

  async formatCode(): Promise<void> {
    await this.editor.getAction("editor.action.formatDocument")?.run();
    await this.cleanupBlankLines();
  }

  getCode(): string {
    return this.editor.getValue();
  }

  registerListeners() {
    this.editor.onDidChangeModelContent(() => {
      if (this.listenForChanges) {
        const args: IAcEditorHtmlChangeHookArgs = {
          html: this.getCode()
        };
        this.builderApi.hooks.execute({ hook: AcEnumBuilderHook.EditorHtmlChange, args: args });
        this.builderApi.events.execute({ event: AcEnumBuilderEvent.EditorHtmlChange, args: args });
      }
    });
  }

  async setCode({ code, autoFormat = true }: { code: string, autoFormat?: boolean }): Promise<void> {
    this.listenForChanges = false;
    const model = this.editor.getModel();
    // this.editor.updateOptions({readOnly:false});
    if (model) {
      model.setValue(code);
    }
    if (autoFormat) {
      await this.formatCode();
    }
    this.listenForChanges = true;
    // this.editor.updateOptions({readOnly:true});
  }

}
