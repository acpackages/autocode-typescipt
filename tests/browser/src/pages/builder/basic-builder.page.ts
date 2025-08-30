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
                  "onclick":{"name":"onclick","functionName":"handleDiv1Onclick"}
                },
                "properties": {
                  "instanceName":{"name":"instanceName","value":"div1"}
                }
              }
            },
            "html": "<body><div ac-builder-element-id=\"div1\">Container Element</div></body>",
            "script":'class DefaultPageScript {\n\n\thandleDiv1Onclick() {\n\t}\n\n}',
            "scriptClassName":"DefaultPageScript"
          }
        ]
      };
      setTimeout(() => {
        this.builderApi.fromJson(state);
      }, 500);
    }
  }
}
