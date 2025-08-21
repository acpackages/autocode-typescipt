/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcCollapse, AcAccordion } from "@autocode-ts/ac-browser";

export class AccordionTestPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container py-4">
        <h2 class="mb-4">AcAccordion Test Page</h2>
        <p>This page demonstrates <code>&lt;AcAccordion&gt;</code> behavior with multiple collapses.</p>

        ${this.renderAccordionBlock('Accordion 1', [
          { title: 'Section A', content: 'Content for section A', open: true },
          { title: 'Section B', content: 'Content for section B', open: false },
          { title: 'Section C', content: 'Content for section C', open: false },
        ])}

        <hr class="my-5">
        <p class="text-muted"><small>All sections above are managed by AcAccordion. Opening one section closes the others automatically.</small></p>
      </div>
    `;

    // Initialize all accordions automatically
    this.querySelectorAll('[ac-accordion]').forEach(el => {
      new AcAccordion({ element: el as HTMLElement });
    });
  }

  renderAccordionBlock(title: string, sections: { title: string; content: string; open: boolean }[]): string {
    const accordionId = title.toLowerCase().replace(/\s+/g, '-');

    const sectionsHtml = sections.map((section, index) => `
      <div ac-collapse ${section.open ? 'ac-collapse-open' : ''} class="mb-2 border rounded p-2">
        <div class="collapse-header" ac-collapse-toggle>${section.title}</div>
        <div ac-collapse-content class="collapse-content border bg-white p-3" style="overflow:hidden; height:auto;">
          <p>${section.content}</p>
          <p>Click the header to toggle this section.</p>
        </div>
      </div>
    `).join('');

    return `
      <div ac-accordion id="${accordionId}" class="mb-4">
        <h5 class="mb-2">${title}</h5>
        ${sectionsHtml}
      </div>
    `;
  }
}

// Usage:
// customElements.define('accordion-test-page', AccordionTestPage);
// <accordion-test-page></accordion-test-page>
