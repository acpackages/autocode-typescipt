/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as monaco from "monaco-editor";
import { AcBuilderApi } from "../core/ac-builder-api";

export class AcHtmlEditorHelper {
  private editor: monaco.editor.IStandaloneCodeEditor;
  private builderApi: AcBuilderApi;

  constructor({ editor,builderApi }: { editor: monaco.editor.IStandaloneCodeEditor,builderApi:AcBuilderApi }) {
    this.editor = editor;
    this.builderApi = builderApi;
    this.editor.handleInitialized = () => {
      //
    };
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

  async setCode({ code, autoFormat = true }: { code: string, autoFormat?: boolean }): Promise<void> {
    const model = this.editor.getModel();
    this.editor.updateOptions({readOnly:false});
    if (model) {
      model.setValue(code);
    }
    if (autoFormat) {
      await this.formatCode();
    }
    this.editor.updateOptions({readOnly:true});
  }

  private trackChanges<T>(
    snapshot: () => Promise<T>,
    compare: (prev: T, curr: T) => void
  ) {
    let prevState: T;
    snapshot().then(s => (prevState = s));
    this.editor.onDidChangeModelContent(async () => {
      const currState = await snapshot();
      if (prevState) compare(prevState, currState);
      prevState = currState;
    });
  }

}
