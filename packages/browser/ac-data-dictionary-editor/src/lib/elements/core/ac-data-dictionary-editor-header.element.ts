/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acAddClassToElement, AcSelectInput } from "@autocode-ts/ac-browser";
import { AcDDEApi, AcDDETab, AcEnumDDEHook, IAcDDEActiveDataDictionaryChangeHookArgs, IAcDDEDataDictionaryRow, IAcDDEHookArgs, IAcDDEMenuGroup, IAcDDEMenuGroupAddHookArgs, IAcDDEMenuItem } from "../../_ac-data-dictionary-editor.export";
import { AcDDESelectDataDictionaryInput } from "../inputs/ac-dde-select-data-dictionary-input.element";

export class AcDataDictionaryEditorHeader {
  activeView: AcDDETab = AcDDETab.DataDictionaryEditor;
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  dropdown: HTMLElement = document.createElement('div');

  selectDataDictionaryInput: AcSelectInput;

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
    this.selectDataDictionaryInput = (new AcDDESelectDataDictionaryInput({ editorApi: editorApi })).selectInput;
    this.initElement();
    this.setDataDictionaryDropdown();
    this.editorApi.hooks.subscribe({hookName: AcEnumDDEHook.ActiveDataDictionaryChange, callback: (args: IAcDDEActiveDataDictionaryChangeHookArgs) => {
      this.element.querySelector('[ac-dde-data=active_data_dictionary_name]')!.innerHTML = args.activeDataDictionary.data_dictionary_name;
    }});
    this.editorApi.hooks.subscribe({hookName: AcEnumDDEHook.MenuGroupAdd, callback: (args: IAcDDEMenuGroupAddHookArgs) => {
      console.log(args);
      this.addMenuGroup({ menuGroup: args.menuGroup });
    }});
    this.editorApi.hooks.subscribe({hookName: AcEnumDDEHook.DataLoaded, callback: (args: IAcDDEHookArgs) => {
      this.setDataDictionaryDropdown();
    }});

  }

  private addMenuGroup({ menuGroup }: { menuGroup: IAcDDEMenuGroup }): void {
    console.log(menuGroup);

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
                Data Dictionary : <span ac-dde-data="active_data_dictionary_name"></span>
              </button>
              <ul class="dropdown-menu data-dictionary-select-items">
              </ul>
            </li>
            <li class="nav-item dropdown">
              <button type="button" class="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                View : Editor
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
        label: 'Editor',
        callback: () => {
          this.setActiveTab({ tab: AcDDETab.DataDictionaryEditor });
        }
      },
      {
        label: 'Tables',
        callback: () => {
          this.setActiveTab({ tab: AcDDETab.Tables });
        }
      },
      {
        label: 'Table Columns',
        callback: () => {
          this.setActiveTab({ tab: AcDDETab.TableColumns });
        }
      },
      {
        label: 'Views',
        callback: () => {
          this.setActiveTab({ tab: AcDDETab.Views });
        }
      },
      {
        label: 'View Columns',
        callback: () => {
          this.setActiveTab({ tab: AcDDETab.ViewColumns });
        }
      },
      {
        label: 'Triggers',
        callback: () => {
          this.setActiveTab({ tab: AcDDETab.Triggers });
        }
      },
      {
        label: 'Relationships',
        callback: () => {
          this.setActiveTab({ tab: AcDDETab.Relationships });
        }
      },
      {
        label: 'Stored Procedures',
        callback: () => {
          this.setActiveTab({ tab: AcDDETab.StoredProcedures });
        }
      },
      {
        label: 'Functions',
        callback: () => {
          this.setActiveTab({ tab: AcDDETab.Functions });
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
  }

  private setDataDictionaryDropdown(){
    const createMenuItem:Function = (row:IAcDDEDataDictionaryRow)=>{
      const menuItem:HTMLElement = document.createElement('li');
      menuItem.style.cursor = 'pointer';
      acAddClassToElement({ cssClass: 'dropdown-item', element: menuItem });
      menuItem.innerHTML = row.data_dictionary_name;
      menuItem.addEventListener('click', () => {
      // menuItem.callback();
      });
      return menuItem;
    };
    for(const row of Object.values(this.editorApi.dataStorage.dataDictionaries)){
      if(this.editorApi.activeDataDictionary == undefined){
        this.editorApi.activeDataDictionary = row;
      }
      console.log(row);
      this.element.querySelector('.data-dictionary-select-items')?.append(createMenuItem(row));
    }
  }

  setActiveTab({ tab }: { tab: AcDDETab }) {
    alert('active Menu ' + tab);
  }
}
