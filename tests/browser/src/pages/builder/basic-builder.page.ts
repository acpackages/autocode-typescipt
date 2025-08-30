/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-builder/src/lib/css/ac-builder.css';
import { AcBuilder, AcBuilderApi } from '@autocode-ts/ac-builder';
import { PageHeader } from '../../components/page-header/page-header.component';

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
      this.builder = new AcBuilder();
      this.builderApi = this.builder.builderApi;
      container.append(this.builder.element);
      this.builderApi.hooks.subscribeAllHooks({
        callback: (hook: string, args: any) => {
          console.log(hook);
          console.log(args);
        }
      });
      this.builderApi.addElement({element:{
        category:'New Test Category',
        name:'test-element',
        tag:'test',
        title:'Test Element',
      }})
      const state = {
  "extensionStates": {},
  "pages": [
    {
      "name": "default",
      "elements": {
        "div1": {
          "id": "div1",
          "name": "div",
          "events": {
            "onclick": {
              "name": "onclick",
              "functionName": "handleDiv1Onclick"
            },
            "ondblclick": {
              "name": "ondblclick",
              "functionName": "handleDiv1Ondblclick"
            },
            "onmouseover": {
              "name": "onmouseover",
              "functionName": "handleDiv1Onmouseover"
            },
            "onmouseout": {
              "name": "onmouseout",
              "functionName": "handleDiv1Onmouseout"
            },
            "onchange": {
              "name": "onchange",
              "functionName": "handleDiv1Onchange"
            },
            "oninput": {
              "name": "oninput",
              "functionName": "handleDiv1Oninput"
            },
            "onsubmit": {
              "name": "onsubmit",
              "functionName": "handleDiv1Onsubmit"
            }
          },
          "properties": {
            "instanceName": {
              "name": "instanceName",
              "value": "div1"
            }
          }
        },
        "div2": {
          "id": "div2",
          "name": "div",
          "events": {
            "onclick": {
              "name": "onclick",
              "functionName": "handleDiv2Onclick"
            },
            "ondblclick": {
              "name": "ondblclick",
              "functionName": "handleDiv2Ondblclick"
            },
            "onmouseover": {
              "name": "onmouseover",
              "functionName": "handleDiv2Onmouseover"
            },
            "onmouseout": {
              "name": "onmouseout",
              "functionName": "handleDiv2Onmouseout"
            },
            "onchange": {
              "name": "onchange",
              "functionName": "handleDiv2Onchange"
            },
            "oninput": {
              "name": "oninput",
              "functionName": "handleDiv2Oninput"
            },
            "onsubmit": {
              "name": "onsubmit",
              "functionName": "handleDiv2Onsubmit"
            }
          },
          "properties": {
            "instanceName": {
              "name": "instanceName",
              "value": "div2"
            }
          }
        }
      },
      "html": "<body><div ac-builder-element-id=\"div1\" id=\"iytt\">Container Element 1</div><div id=\"i0ki\" ac-builder-element-id=\"div2\">Container Element 2</div></body>",
      "script": "class DefaultPageScript {\n\n    handleDiv1Onclick() {\n    }\n\n    handleDiv1Ondblclick() {\n    }\n\n    handleDiv1Onmouseover() {\n    }\n\n    handleDiv1Onmouseout() {\n    }\n\n    handleDiv1Onchange() {\n    }\n\n    handleDiv1Oninput() {\n    }\n\n    handleDiv1Onsubmit() {\n    }\n\n    handleDiv2Onclick() {\n    }\n\n    handleDiv2Ondblclick() {\n    }\n\n    handleDiv2Onmouseover() {\n    }\n\n    handleDiv2Onmouseout() {\n    }\n\n    handleDiv2Onchange() {\n    }\n\n    handleDiv2Oninput() {\n    }\n\n    handleDiv2Onsubmit() {\n    }\n\n}",
      "scriptClassName": "DefaultPageScript"
    }
  ]
};
      setTimeout(() => {
        this.builderApi.fromJson(state);
      }, 500);
    }
  }
}
