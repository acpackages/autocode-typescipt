/* eslint-disable @nx/enforce-module-boundaries */
import './../../../../../packages/browser/ac-builder/src/lib/css/ac-builder.css';
import { AcBuilder, AcBuilderApi } from '@autocode-ts/ac-builder';
import { PageHeader } from '../../components/page-header/page-header.component';

export class BasicBuilderPage  extends HTMLElement {
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
      this.builder.init();
      this.builderApi = this.builder.builderApi;
      container.append(this.builder.element);
    }
  }
}
