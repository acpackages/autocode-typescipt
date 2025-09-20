/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-builder/src/lib/css/ac-builder.css';
import { AcBuilder, AcBuilderApi } from '@autocode-ts/ac-builder';
import { acRegisterDataDictionaryBuilderElements } from '@autocode-ts/ac-dd-builder-elements';
import { PageHeader } from '../../components/page-header/page-header.component';
import { dataDictionaryJson as actDataDictionary } from './../../../../data/act-data-dictionary-v1';
import { AcDataDictionary } from '@autocode-ts/ac-data-dictionary';

export class BasicBuilderPage extends HTMLElement {
  builder!: AcBuilder;
  builderApi!: AcBuilderApi;
  pageHeader: PageHeader = new PageHeader();
  async connectedCallback() {
    const html = `
      <div id="builderContainer" class="builder-container" style="height:calc(100vh);"></div>
    `;
    this.innerHTML = html;
    this.style.height = '100vh;'
    this.pageHeader.pageTitle = 'Builder';
    this.initBuilder();
  }

  async initBuilder() {
    const container = document.querySelector<HTMLElement>('#builderContainer');
    if (container) {
      // acRegisterBootstrapBuilderElements();
      AcDataDictionary.registerDataDictionary({jsonData:actDataDictionary});
      acRegisterDataDictionaryBuilderElements();
      this.builder = new AcBuilder();
      this.builderApi = this.builder.builderApi;
      container.append(this.builder.element);
      this.builderApi.hooks.subscribeAllHooks({
        callback: (hook: string, args: any) => {
          // console.log(hook);
          // console.log(args);
        }
      });
      // this.builderApi.addElement({
      //   element: {
      //     category: 'New Test Category',
      //     name: 'test-element',
      //     tag: 'test',
      //     title: 'Test Element',
      //   }
      // })
      const state = {
        "extensionStates": {},
        "components": [
          {
            "name": "default",
            "elements": {
              "container1": {
                "instanceName": "container1",
                "name": "container",
                "events": {
                  "click": {
                    "name": "click",
                    "functionName": "handleContainer1Click"
                  },
                  "doubleClick": {
                    "name": "doubleClick",
                    "functionName": "handleContainer1DoubleClick"
                  }
                },
                "properties": {
                  "instanceName": {
                    "name": "instanceName",
                    "value": "container1"
                  }
                }
              }
            },
            "html": "<body><div id=\"idoa\" ac-builder-element-instance-name=\"container1\">Container Element</div></body>",
            "script": "class DefaultPageScript {\n\n    handleContainer1Click() {\n        console.log(\"Container 1 Click\");\n    }\n\n    handleContainer1DoubleClick() {\n        alert(\"Container 1 Double Click\");\n    }\n\n}",
            "className": "DefaultPageScript"
          }
        ]
      };
      setTimeout(() => {
        this.builderApi.fromJson(state);
      }, 500);
    }
  }
}
