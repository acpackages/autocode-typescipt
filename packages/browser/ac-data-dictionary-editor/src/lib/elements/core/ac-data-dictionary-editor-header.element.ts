/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acAddClassToElement, AcSelectInput } from "@autocode-ts/ac-browser";
import { AcDDESelectDataDictionaryInput } from "../inputs/ac-dde-select-data-dictionary-input.element";
import { AcEnumDDETab } from "../../enums/ac-enum-dde-tab.enum";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcEnumDDEHook } from "../../enums/ac-enum-dde-hooks.enum";
import { IAcDDEActiveDataDictionaryChangeHookArgs } from "../../interfaces/hook-args/ac-dde-active-data-dictionary-change-hook-args.interface";
import { IAcDDEMenuGroupAddHookArgs } from "../../interfaces/hook-args/ac-dde-menu-group-add-hook-args.interface";
import { IAcDDEHookArgs } from "../../interfaces/hook-args/ac-dde-hook-args.interface";
import { IAcDDEMenuGroup } from "../../interfaces/ac-dde-menu-group.interface";
import { IAcDDEMenuItem } from "../../interfaces/ac-dde-menu-item.interface";
import { IAcDDEDataDictionary } from "../../interfaces/ac-dde-data-dictionary.inteface";

export class AcDataDictionaryEditorHeader {
  activeView: AcEnumDDETab = AcEnumDDETab.TableEditor;
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  dropdown: HTMLElement = document.createElement('div');

  selectDataDictionaryInput: AcSelectInput;

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
    this.selectDataDictionaryInput = (new AcDDESelectDataDictionaryInput({ editorApi: editorApi })).selectInput;
    this.initElement();
    this.setDataDictionaryDropdown();
    this.editorApi.hooks.subscribe({hook: AcEnumDDEHook.ActiveDataDictionaryChange, callback: (args: IAcDDEActiveDataDictionaryChangeHookArgs) => {
      this.element.querySelector('[ac-dde-data=active_data_dictionary_name]')!.innerHTML = args.activeDataDictionary.dataDictionaryName!;
    }});
    this.editorApi.hooks.subscribe({hook: AcEnumDDEHook.MenuGroupAdd, callback: (args: IAcDDEMenuGroupAddHookArgs) => {
      this.addMenuGroup({ menuGroup: args.menuGroup });
    }});
    this.editorApi.hooks.subscribe({hook: AcEnumDDEHook.DataDictionarySet, callback: (args: IAcDDEHookArgs) => {
      this.setDataDictionaryDropdown();
    }});
    // console.log(this);
  }

  private addMenuGroup({ menuGroup }: { menuGroup: IAcDDEMenuGroup }): void {

    const menuGroupElement: HTMLElement = document.createElement('li');
    acAddClassToElement({ cssClass: 'nav-item dropdown', element: menuGroupElement });

    const menuButton: HTMLElement = document.createElement('button');
    menuGroupElement.append(menuButton);
    acAddClassToElement({ cssClass: 'btn btn-default dropdown-toggle me-1', element: menuButton });
    menuButton.setAttribute('type', 'button');
    menuButton.setAttribute('role', 'button');
    menuButton.setAttribute('data-bs-toggle', 'dropdown');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = menuGroup.label;

    const dropdownItems: HTMLElement = document.createElement('ul');
    menuGroupElement.append(dropdownItems);
    acAddClassToElement({ cssClass: 'dropdown-menu', element: dropdownItems });

    for(const menuItem of menuGroup.menuItems){
      dropdownItems.append(this.getMenuItemElement({menuItem:menuItem}));
    }
    this.element.querySelector('.menu-groups')?.append(menuGroupElement);
  }

  private getMenuItemElement({ menuItem }: { menuItem: IAcDDEMenuItem }): HTMLElement {
    const menuItemElement: HTMLElement = document.createElement('li');
    menuItemElement.style.cursor = 'pointer';
    acAddClassToElement({ cssClass: 'dropdown-item', element: menuItemElement });
    menuItemElement.innerHTML = menuItem.label;
    menuItemElement.addEventListener('click', () => {
      menuItem.callback();
    });
    return menuItemElement;
  }

  private initElement() {
    this.element.appendChild(this.selectDataDictionaryInput.element);
    this.selectDataDictionaryInput.element.style.minWidth = '150px';
    this.selectDataDictionaryInput.element.style.background = 'transparent';
    acAddClassToElement({ cssClass: 'form-select', element: this.selectDataDictionaryInput.element });
    this.element.append(this.dropdown);
    this.element.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav menu-groups">
            <li class="nav-item dropdown">
              <button type="button" class="btn btn-primary dropdown-toggle me-1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span ac-dde-data="active_data_dictionary_name">(No Data Dictionary Selected)</span>
              </button>
              <ul class="dropdown-menu data-dictionary-select-items">
              </ul>
            </li>
            <li class="nav-item dropdown">
              <button type="button" class="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span ac-dde-data="active_tab_name"></span>
              </button>
              <ul class="dropdown-menu tab-menu-items">
              </ul>
            </li>
          </ul>
        </div>
        <ul class="navbar-nav">
        </ul>
      </div>
    </nav>`;
    this.element.querySelector('.data-dictionary-select-input-container')?.append(this.selectDataDictionaryInput.element);
    const tabs: any = [
      {
        label: 'Table Editor',
        callback: () => {
          this.setActiveTab({ tab: AcEnumDDETab.TableEditor });
        }
      },
      {
        label: 'Tables',
        callback: () => {
          this.setActiveTab({ tab: AcEnumDDETab.Tables });
        }
      },
      {
        label: 'Table Columns',
        callback: () => {
          this.setActiveTab({ tab: AcEnumDDETab.TableColumns });
        }
      },
      {
        label: 'Views',
        callback: () => {
          this.setActiveTab({ tab: AcEnumDDETab.Views });
        }
      },
      {
        label: 'View Columns',
        callback: () => {
          this.setActiveTab({ tab: AcEnumDDETab.ViewColumns });
        }
      },
      {
        label: 'Triggers',
        callback: () => {
          this.setActiveTab({ tab: AcEnumDDETab.Triggers });
        }
      },
      {
        label: 'Relationships',
        callback: () => {
          this.setActiveTab({ tab: AcEnumDDETab.Relationships });
        }
      },
      {
        label: 'Stored Procedures',
        callback: () => {
          this.setActiveTab({ tab: AcEnumDDETab.StoredProcedures });
        }
      },
      {
        label: 'Functions',
        callback: () => {
          this.setActiveTab({ tab: AcEnumDDETab.Functions });
        }
      },
    ];
    for (const tabMenu of tabs) {
      const menuItem: HTMLElement = document.createElement('li');
      menuItem.style.cursor = 'pointer';
      acAddClassToElement({ cssClass: 'dropdown-item', element: menuItem });
      menuItem.innerHTML = tabMenu.label;
      menuItem.addEventListener('click', () => {
        tabMenu.callback();
      });
      this.element.querySelector('.tab-menu-items')?.append(menuItem);
    }
    this.setActiveTab({tab:AcEnumDDETab.TableEditor});
  }

  private setDataDictionaryDropdown(){
    const createMenuItem:Function = (row:IAcDDEDataDictionary)=>{
      const menuItem:HTMLElement = document.createElement('li');
      menuItem.style.cursor = 'pointer';
      acAddClassToElement({ cssClass: 'dropdown-item', element: menuItem });
      menuItem.innerHTML = row.dataDictionaryName!;
      menuItem.addEventListener('click', () => {
      // menuItem.callback();
      });
      return menuItem;
    };
    for(const row of this.editorApi.dataStorage.getDataDictionaries()){
      if(this.editorApi.activeDataDictionary == undefined){
        this.editorApi.activeDataDictionary = row;
      }
      this.element.querySelector('.data-dictionary-select-items')?.append(createMenuItem(row));
    }
  }

  setActiveTab({ tab }: { tab: AcEnumDDETab }) {
    let label:string = '(No Tab)';
    switch(tab){
      case AcEnumDDETab.TableEditor:
        label = 'Table Editor';
        break;
      case AcEnumDDETab.Functions:
        label = 'Functions';
        break;
      case AcEnumDDETab.Relationships:
        label = 'Relationships';
        break;
      case AcEnumDDETab.StoredProcedures:
        label = 'Stored Procedures';
        break;
      case AcEnumDDETab.TableColumns:
        label = 'Table Columns';
        break;
      case AcEnumDDETab.Tables:
        label = 'Tables';
        break;
      case AcEnumDDETab.Triggers:
        label = 'Triggers';
        break;
      case AcEnumDDETab.ViewColumns:
        label = 'View Columns';
        break;
      case AcEnumDDETab.Views:
        label = 'Views';
        break;
    }
    this.element.querySelector('[ac-dde-data=active_tab_name]')!.innerHTML = label;
    this.editorApi.activeEditorTab = tab;
  }
}
