/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-builder/src/lib/css/ac-builder.css';
import { AcBuilder, AcBuilderApi, AcBuilderRuntimeComponent, IAcBuilderComponent, AcBuilderElementsManager } from '@autocode-ts/ac-builder';
import { PageHeader } from '../../components/page-header/page-header.component';

export class RuntimeComponentPage extends HTMLElement {
  builder!: AcBuilder;
  builderApi!: AcBuilderApi;
  pageHeader: PageHeader = new PageHeader();
  async connectedCallback() {
    const html = `
      Runtime Component Rendered :
    `;
    this.innerHTML = html;
    this.style.height = '100vh;'
    this.pageHeader.pageTitle = 'Builder';
    AcBuilderElementsManager.init();
    this.initRuntimeComponent();
  }

  initRuntimeComponent() {
    const component: IAcBuilderComponent = {
      name: 'testComponent',
      elements: {
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
      html: '<body><div id="idoa" ac-builder-element-instance-name="container1">Container Element</div><ac-dd-datagrid></ac-dd-datagrid></body>',
      script: `class DefaultPageScript extends AcBuilderComponent {\n\n    handleContainer1Click() {\n        console.log("Container 1 Click");\n    }\n\n    handleContainer1DoubleClick() {\n        alert("Container 1 Double Click");\n    }\n\n}`,
      className: 'DefaultPageScript'
    };
    const runtimeComponent: AcBuilderRuntimeComponent = new AcBuilderRuntimeComponent({ component });
    runtimeComponent.render();
    const instance = runtimeComponent.componentInstance;
    this.append(instance.element)
  }

}
