import { AcElementBase } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDataDictionaryEditor } from "./ac-data-dictionary-editor.element";
import { AC_DDE_TAG } from "../../_ac-data-dictionary-editor.export";

export class AcDDEBase extends AcElementBase{
  editorApi!: AcDDEApi;
  editor!:AcDataDictionaryEditor;

  override connectedCallback(): void {
    super.connectedCallback();
    this.autoSetEditor();
  }

  private autoSetEditor(){
    const editor = this.closest(AC_DDE_TAG.dataDictionaryEditor);
    if(editor){
      this.editor = editor as AcDataDictionaryEditor;
      this.editorApi = this.editor.editorApi;
      this.init();
    }
    else{
      setTimeout(() => {
        this.autoSetEditor();
      }, 10);
    }
  }

  protected init(){
    //
  }
}
