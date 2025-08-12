/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcDDEApi, AcDDECssClassName, AcEnumDDEHook, IAcDDEDataDictionaryRow, IAcDDEHookArgs, IAcDDEMenuGroupAddHookArgs } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagridExtensionManager } from '@autocode-ts/ac-browser';
import { AgGridOnAcDatagrid } from "@autocode-ts/ac-datagrid-on-ag-grid";
import { AcDataDictionaryDatagrid } from "./../datagrid/ac-data-dictionary-datagrid.element";
import { AcDataDictionaryEditorHeader } from "./ac-data-dictionary-editor-header.element";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class AcDataDictionaryEditor {
  activeDataDictionary?: IAcDDEDataDictionaryRow;
  editorApi!: AcDDEApi;

  bodyElement: HTMLElement = document.createElement('div');
  element: HTMLElement = document.createElement('div');

  dataDictionaryDatagrid!: AcDataDictionaryDatagrid;
  header!: AcDataDictionaryEditorHeader;

  constructor() {
    this.editorApi = new AcDDEApi({editor:this});

    AcDatagridExtensionManager.register(AgGridOnAcDatagrid);

    this.dataDictionaryDatagrid = new AcDataDictionaryDatagrid({ editorApi: this.editorApi });
    this.header = new AcDataDictionaryEditorHeader({ editorApi: this.editorApi });

    const hookArgs: IAcDDEHookArgs = {
      editorApi: this.editorApi,
    };

    this.initElement();

    this.editorApi.hooks.execute({ hookName: AcEnumDDEHook.EditorInit, args: hookArgs });


  }

  private initElement() {
    acAddClassToElement({ cssClass: AcDDECssClassName.acDataDictionaryEditor, element: this.element });
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEDatagridWrapper, element: this.element });

    this.element.append(this.header.element);
    // acAddClassToElement({cssClass:AcDDECssClassName.acDDEHeader,element:this.header});

    this.element.append(this.bodyElement);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEBody, element: this.bodyElement });

    this.bodyElement.append(this.dataDictionaryDatagrid.element);
  }

}
