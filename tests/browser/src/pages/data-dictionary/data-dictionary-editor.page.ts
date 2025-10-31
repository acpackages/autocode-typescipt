/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-data-dictionary-editor/src/lib/css/ac-data-dictionary-editor.css';
import './../../../../../packages/browser/extensions/datagrid/ac-datagrid-on-ag-grid/src/lib/css/ac-datagrid-on-ag-grid.css';
import { AcDataDictionaryEditor, AcDDEApi, AcDDEExtensionManager, AcEnumDDEExtension, AcEnumDDEHook, AcRelationshipsDetectorDDEExtension, AcSqlAnalyzerDDEExtension } from '@autocode-ts/ac-data-dictionary-editor';
import { AcCodeGeneratorDDEExtension, AcDDECodeGeneratorDefaultConfig } from '@autocode-ts/ac-dde-code-generator'
import { AcBrowserStorageDDEExtension } from '@autocode-ts/ac-dde-browser-storage';
import { PageHeader } from '../../components/page-header/page-header.component';
import { dataDictionaryJson as actDataDictionary } from './../../../../data/act-data-dictionary-v1';
import { dataDictionaryJson as unifiDataDictionary } from './../../../../data/unifi-data-dictionary';
import { dataDictionaryJson as ddeDataDictionary } from './../../../../data/dde-data-dictionary';

export class DDEEditorDatagridPage  extends HTMLElement {
  dataDictionaryEditor!: AcDataDictionaryEditor;
  editorApi!: AcDDEApi;
  pageHeader: PageHeader = new PageHeader();
  async connectedCallback() {
    const html = `
      <div id="editorContainer" class="editor-container" style="height:calc(100vh);"></div>
    `;
    this.innerHTML = html;
    this.style.height = '100vh;'
    // this.prepend(this.pageHeader.element);
    this.pageHeader.pageTitle = 'Data Dictionary Editor';
    this.initDatagrid();
  }

  async initDatagrid() {
    const gridDiv = document.querySelector<HTMLElement>('#editorContainer');
    if (gridDiv) {
      AcDDECodeGeneratorDefaultConfig.viewNameColumnClassPrefix = "";
      AcDDEExtensionManager.register(AcBrowserStorageDDEExtension);
      AcDDEExtensionManager.register(AcCodeGeneratorDDEExtension);
      this.dataDictionaryEditor = new AcDataDictionaryEditor();
      this.editorApi = this.dataDictionaryEditor.editorApi;
      this.editorApi.hooks.subscribeAllHooks({callback:(hookName:string,hookArgs:any)=>{
        // console.log(`Found hook : ${hookName}`,hookArgs);
      }});
      this.editorApi.enableExtension({extensionName:AcEnumDDEExtension.ImportExport});
      // this.editorApi.enableExtension({extensionName:AcBrowserStorageDDEExtension.extensionName});
      this.editorApi.enableExtension({extensionName:AcCodeGeneratorDDEExtension.extensionName});
      this.editorApi.enableExtension({extensionName:AcRelationshipsDetectorDDEExtension.extensionName});
      this.editorApi.enableExtension({extensionName:AcSqlAnalyzerDDEExtension.extensionName});

      this.editorApi.setDataDictionaryJson({dataDictionaryJson:actDataDictionary});
      // this.editorApi.setDataDictionaryJson({dataDictionaryJson:unifiDataDictionary});
      // this.editorApi.setDataDictionaryJson({dataDictionaryJson:ddeDataDictionary});
      console.log(this.editorApi);
      gridDiv.append(this.dataDictionaryEditor);
      // this.editorApi.setDataDictionaryJson({dataDictionaryJson:dataDictionaryJson,dataDictionaryName:'accountea'});



    }
  }
}
