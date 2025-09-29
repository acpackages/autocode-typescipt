/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-builder/src/lib/css/ac-builder.css';
import { AcBuilder, AcBuilderApi, AcBuilderRuntimeComponent, IAcBuilderComponent, AcBuilderElementsManager } from '@autocode-ts/ac-builder';
import { PageHeader } from '../../components/page-header/page-header.component';
import { AcDataDictionary } from '@autocode-ts/ac-data-dictionary';
import { dataDictionaryJson as actDataDictionary } from './../../../../data/act-data-dictionary-v1';
import { acRegisterDataDictionaryBuilderElements } from '@autocode-ts/ac-dd-builder-elements';

export class RuntimeComponentPage extends HTMLElement {
  builder!: AcBuilder;
  builderApi!: AcBuilderApi;
  pageHeader: PageHeader = new PageHeader();
  async connectedCallback() {
    this.style.display = "contents";
    const html = `
      Runtime Component Rendered :
    `;
    this.innerHTML = html;
    this.pageHeader.pageTitle = 'Builder';
    AcBuilderElementsManager.init();
    this.initRuntimeComponent();
  }

  async initRuntimeComponent() {
    AcDataDictionary.registerDataDictionary({jsonData:actDataDictionary});
          acRegisterDataDictionaryBuilderElements();
    // const component: IAcBuilderComponent = {
    //   name: 'testComponent',
    //   elements: {
    //     "container1": {
    //       "instanceName": "container1",
    //       "name": "container",
    //       "events": {
    //         "click": {
    //           "name": "click",
    //           "functionName": "handleContainer1Click"
    //         },
    //         "doubleClick": {
    //           "name": "doubleClick",
    //           "functionName": "handleContainer1DoubleClick"
    //         }
    //       },
    //       "properties": {
    //         "instanceName": {
    //           "name": "instanceName",
    //           "value": "container1"
    //         }
    //       }
    //     }
    //   },
    //   html: '<body><div id="idoa" ac-builder-element-instance-name="container1">Container Element</div><ac-dd-datagrid></ac-dd-datagrid></body>',
    //   script: `class DefaultPageScript extends AcBuilderComponent {\n\n    handleContainer1Click() {\n        console.log("Container 1 Click");\n    }\n\n    handleContainer1DoubleClick() {\n        alert("Container 1 Double Click");\n    }\n\n}`,
    //   className: 'DefaultPageScript'
    // };
    const component: IAcBuilderComponent = {
      "name": "default",
      "elements": {
        "dddatagrid1": {
          "instanceName": "dddatagrid1",
          "name": "ddDatagrid",
          "events": {},
          "properties": {
            "instanceName": {
              "name": "instanceName",
              "value": "dddatagrid1",
              "valueType": "VALUE"
            },
            "sourceType": {
              "name": "sourceType",
              "value": "TABLE",
              "valueType": "VALUE"
            },
            "sourceValue": {
              "name": "sourceValue",
              "value": "act_customers",
              "valueType": "VALUE"
            },
            "onDemandFunction": {
              "name": "onDemandFunction",
              "value": "onDemandFunction",
              "valueType": "CLASS_PROPERTY_REFERENCE"
            }
          }
        }
      },
      "html": "<div ac-builder-element-instance-name=\"dddatagrid1\"></div>",
      "script": "class DefaultPageScript extends AcBuilderComponent {\n  onDemandFunction: Function = async (requestArgs: IAcDatagridOnDemandRequestArgs) => {\n    console.log('Getting records in onDemandFunction');\n const pageSize: number = requestArgs.rowsCount;\n    const pageNumber: number = (requestArgs.startIndex / pageSize) + 1;\n    const res = await fetch(`http://localhost:8081/api/act_customers/get?page_size=${pageSize}&page_number=${pageNumber}`);\n    if (res.ok) {\n      const response = await res.json();\n      const callbackResponse: IAcDatagridOnDemandResponseArgs = {\n        data: response.rows,\n        totalCount: response.total_rows\n      };\n      requestArgs.successCallback(callbackResponse);\n      // this.datagridApi.data = response.rows;\n    }\n  }\n}",
      "className": "DefaultPageScript"
    };
    const runtimeComponent: AcBuilderRuntimeComponent = new AcBuilderRuntimeComponent({ component });
    await runtimeComponent.render();
    console.log(runtimeComponent);
    const instance = runtimeComponent.componentInstance;
    this.append(instance.element)
  }

}
