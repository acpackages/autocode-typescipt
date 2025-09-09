/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-data-dictionary-editor/src/lib/css/ac-data-dictionary-editor.css';
import './../../../../../packages/browser/extensions/datagrid/ac-datagrid-on-ag-grid/src/lib/css/ac-datagrid-on-ag-grid.css';
import { AcDataDictionaryEditor, AcDDEApi } from '@autocode-ts/ac-data-dictionary-editor';
import { AcCodeGeneratorDDEExtension } from '@autocode-ts/ac-dde-code-generator'
import { AcBrowserStorageDDEExtension } from '@autocode-ts/ac-dde-browser-storage';
import { PageHeader } from '../../components/page-header/page-header.component';
import { dataDictionaryJson as actDataDictionary } from './../../../../data/act-data-dictionary-v1';
import { dataDictionaryJson as unifiDataDictionary } from './../../../../data/unifi-data-data-dictionary';
import { dataDictionaryJson as ddeDataDictionary } from './../../../../data/dde-data-dictionary';
import { AcDataDictionary } from '@autocode-ts/ac-data-dictionary';

export class DataDictionaryComponentsPage  extends HTMLElement {
  dataDictionaryEditor!: AcDataDictionaryEditor;
  editorApi!: AcDDEApi;
  pageHeader: PageHeader = new PageHeader();
  async connectedCallback() {
    const html = `
    `;
    this.innerHTML = html;
    this.style.height = '100vh;'
    this.prepend(this.pageHeader.element);
    this.pageHeader.pageTitle = 'Data Dictionary Components';
    AcDataDictionary.registerDataDictionary({jsonData:actDataDictionary});
    // new Ac
  }


}
