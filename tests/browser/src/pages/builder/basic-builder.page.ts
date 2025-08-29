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
              "f2fcdf28-7eb6-42e3-87d3-7ed51f65c209": {
                "id": "f2fcdf28-7eb6-42e3-87d3-7ed51f65c209",
                "name": "div",
                "events": [],
                "properties": []
              }
            },
            "html": "<body id=\"i0zi\"><div ac-builder-element-id=\"f2fcdf28-7eb6-42e3-87d3-7ed51f65c209\">Container Element</div></body>"
          }
        ]
      };
      setTimeout(() => {
        this.builderApi.fromJson(state);
      }, 500);
    }
  }
}
