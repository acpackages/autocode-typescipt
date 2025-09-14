/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-data-dictionary-editor/src/lib/css/ac-data-dictionary-editor.css';
import './../../../../../packages/browser/extensions/datagrid/ac-datagrid-on-ag-grid/src/lib/css/ac-datagrid-on-ag-grid.css';
import { AcDataDictionaryEditor, AcDDEApi } from '@autocode-ts/ac-data-dictionary-editor';
import { PageHeader } from '../../components/page-header/page-header.component';
import { dataDictionaryJson as actDataDictionary } from './../../../../data/act-data-dictionary-v1';
import { AcDataDictionary } from '@autocode-ts/ac-data-dictionary';
import { AcDDInputElement, AcDDInputFieldElement, AcDDInputManager } from '@autocode-ts/ac-data-dictionary-components';

export class DataDictionaryComponentsPage  extends HTMLElement {
  dataDictionaryEditor!: AcDataDictionaryEditor;
  editorApi!: AcDDEApi;
  pageHeader: PageHeader = new PageHeader();
  ddInput?:AcDDInputElement;
  async connectedCallback() {
    // AcDDInputManager.registerColumnTypeInput({columnType:AcEnum})
    const html = `
    `;
    this.innerHTML = html;
    this.style.height = '100vh;'
    this.prepend(this.pageHeader.element);
    this.pageHeader.pageTitle = 'Data Dictionary Components';
    AcDataDictionary.registerDataDictionary({jsonData:actDataDictionary});
    console.log(AcDataDictionary.dataDictionaries);
    console.log(AcDDInputFieldElement);
    this.innerHTML = `<ac-dd-input-field table-name="act_ledger_accounts" column-name="reflecting_statement"></ac-dd-input-field>`
    // new Ac
  }


}
