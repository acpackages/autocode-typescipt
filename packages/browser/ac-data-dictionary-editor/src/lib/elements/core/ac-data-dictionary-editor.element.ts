/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcDDEApi, AcDDECssClassName, AcEnumDDETab, AcDDETableColumnsDatagrid, AcDDETablesDatagrid, AcDDETriggersDatagrid, AcEnumDDEHook, IAcDDEDataDictionaryRow, IAcDDEHookArgs, IAcDDEMenuGroupAddHookArgs, AcDDEDatagridEditor } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagridExtensionManager, acSetElementAttributes } from '@autocode-ts/ac-browser';
import { AgGridOnAcDatagrid } from "@autocode-ts/ac-datagrid-on-ag-grid";
import { AcDataDictionaryEditorHeader } from "./ac-data-dictionary-editor-header.element";
import { AcDDERelationshipsDatagrid } from "../datagrid/ac-dde-relationships-datagrid.element";
import { AcDDEFunctionsDatagrid } from "../datagrid/ac-dde-functions-datagrid.element";
import { AcDDEStoredProceduresDatagrid } from "../datagrid/ac-dde-stored-procedures-datagrid.element";
import { AcDDEViewsDatagrid } from "../datagrid/ac-dde-views-datagrid.element";
import { AcDDEViewColumnsDatagrid } from "../datagrid/ac-dde-view-columns-datagrid.element";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class AcDataDictionaryEditor {
  activeDataDictionary?: IAcDDEDataDictionaryRow;
  editorApi!: AcDDEApi;

  bodyElement: HTMLElement = document.createElement('div');
  tabsContainer:HTMLElement = document.createElement('div');
  element: HTMLElement = document.createElement('div');

  datagridEditor?: AcDDEDatagridEditor;
  header!: AcDataDictionaryEditorHeader;
  functionsDatagrid?: AcDDEFunctionsDatagrid;
  relationshipsDatagrid?: AcDDERelationshipsDatagrid;
  storedProceduresDatagrid?: AcDDEStoredProceduresDatagrid;
  tablesDatagrid?: AcDDETablesDatagrid;
  tableColumnsDatagrid?: AcDDETableColumnsDatagrid;
  triggersDatagrid?: AcDDETriggersDatagrid;
  viewsDatagrid?: AcDDEViewsDatagrid;
  viewColumnsDatagrid?: AcDDEViewColumnsDatagrid;

  constructor() {
    this.editorApi = new AcDDEApi({editor:this});

    AcDatagridExtensionManager.register(AgGridOnAcDatagrid);

    this.header = new AcDataDictionaryEditorHeader({ editorApi: this.editorApi });

    const hookArgs: IAcDDEHookArgs = {
      editorApi: this.editorApi,
    };

    this.initElement();

    this.editorApi.hooks.execute({ hookName: AcEnumDDEHook.EditorInit, args: hookArgs });
    this.editorApi.hooks.subscribe({hookName:AcEnumDDEHook.EditorTabChange,callback:(hookArgs:IAcDDEHookArgs)=>{
      this.setActiveTab({tab:hookArgs.value});
    }});

    this.setActiveTab({tab:this.editorApi.activeEditorTab});
  }

  private initElement() {
    acAddClassToElement({ cssClass: AcDDECssClassName.acDataDictionaryEditor, element: this.element });
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEDatagridWrapper, element: this.element });

    this.element.append(this.header.element);
    // acAddClassToElement({cssClass:AcDDECssClassName.acDDEHeader,element:this.header});

    this.element.append(this.bodyElement);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEBody, element: this.bodyElement });

    // acAddClassToElement({ cssClass: `tab-content`, element: this.tabsContainer });
    // this.bodyElement.append(this.tabsContainer);
  }

  setActiveTab({tab}:{tab:AcEnumDDETab}){
    const getElementTab = (tabName:string,element:HTMLElement)=>{
      const tabElement:HTMLElement = document.createElement('div');
      const toggleButton:HTMLElement = document.createElement('button');
      acSetElementAttributes({attributes:{
        'class':`nav-link toggle-tab-${tab}`,
        'data-bs-toggle':'tab',
        'data-bs-target':`#${tab}`,
        'type':'button',
        'role':'tab',
        'aria-controls':tab,
        'aria-selected':"true",
        'style':'visibility:hidden;'
      },element:toggleButton});
      toggleButton.innerHTML = tab;
      // this.bodyElement.appendChild(toggleButton);
      acSetElementAttributes({attributes:{
        'class':'tab-pane fade',
        'id':`${tab}`,
        'role':'tabpanel',
        'aria-labelledby':`${tab}-tab`
      },element:tabElement});

      acAddClassToElement({cssClass:`.ac-dde-tab-${tab} ac-dde-tab`,element:element});
      tabElement.appendChild(element);
      return element;
    }
    if(tab == AcEnumDDETab.DataDictionaryEditor){
      if(this.datagridEditor == undefined){
        this.datagridEditor = new AcDDEDatagridEditor({editorApi:this.editorApi});
        const tabContent = getElementTab(tab,this.datagridEditor.element);
        this.bodyElement.appendChild(tabContent);
      }
    }
    else if(tab == AcEnumDDETab.Functions){
      if(this.functionsDatagrid == undefined){
        this.functionsDatagrid = new AcDDEFunctionsDatagrid({editorApi:this.editorApi});
        const tabContent = getElementTab(tab,this.functionsDatagrid.element);
        this.bodyElement.appendChild(tabContent);
      }
    }
    else if(tab == AcEnumDDETab.Relationships){
      if(this.relationshipsDatagrid == undefined){
        this.relationshipsDatagrid = new AcDDERelationshipsDatagrid({editorApi:this.editorApi});
        const tabContent = getElementTab(tab,this.relationshipsDatagrid.element);
        this.bodyElement.appendChild(tabContent);
      }
    }
    else if(tab == AcEnumDDETab.StoredProcedures){
      if(this.storedProceduresDatagrid == undefined){
        this.storedProceduresDatagrid = new AcDDEStoredProceduresDatagrid({editorApi:this.editorApi});
        const tabContent = getElementTab(tab,this.storedProceduresDatagrid.element);
        this.bodyElement.appendChild(tabContent);
      }
    }
    else if(tab == AcEnumDDETab.TableColumns){
      if(this.tableColumnsDatagrid == undefined){
        this.tableColumnsDatagrid = new AcDDETableColumnsDatagrid({editorApi:this.editorApi});
        const tabContent = getElementTab(tab,this.tableColumnsDatagrid.element);
        this.bodyElement.appendChild(tabContent);
      }
    }
    else if(tab == AcEnumDDETab.Tables){
      if(this.tablesDatagrid == undefined){
        this.tablesDatagrid = new AcDDETablesDatagrid({editorApi:this.editorApi});
        const tabContent = getElementTab(tab,this.tablesDatagrid.element);
        this.bodyElement.appendChild(tabContent);
      }
    }
    else if(tab == AcEnumDDETab.Triggers){
      if(this.triggersDatagrid == undefined){
        this.triggersDatagrid = new AcDDETriggersDatagrid({editorApi:this.editorApi});
        const tabContent = getElementTab(tab,this.triggersDatagrid.element);
        this.bodyElement.appendChild(tabContent);
      }
    }
    else if(tab == AcEnumDDETab.ViewColumns){
      if(this.viewColumnsDatagrid == undefined){
        this.viewColumnsDatagrid = new AcDDEViewColumnsDatagrid({editorApi:this.editorApi});
        const tabContent = getElementTab(tab,this.viewColumnsDatagrid.element);
        this.bodyElement.appendChild(tabContent);
      }
    }
    else if(tab == AcEnumDDETab.Views){
      if(this.viewsDatagrid == undefined){
        this.viewsDatagrid = new AcDDEViewsDatagrid({editorApi:this.editorApi});
        const tabContent = getElementTab(tab,this.viewsDatagrid.element);
        this.bodyElement.appendChild(tabContent);
      }
    }
    this.bodyElement.querySelectorAll(`.ac-dde-tab`).forEach((el)=>{
      const element = el as HTMLElement;
      element.style.display = 'none';
    });
    const tabElement:HTMLElement= this.bodyElement.getElementsByClassName(`.ac-dde-tab-${tab}`)![0] as HTMLElement;
    tabElement.style.display = '';
  }

}
