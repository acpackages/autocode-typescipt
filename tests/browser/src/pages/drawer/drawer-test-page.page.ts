/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDrawer } from '@autocode-ts/ac-browser';

export class DrawerTestPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="container py-4">
        <h2 class="mb-4">AcDrawer Test Page</h2>
        <p>This page demonstrates <code>AcDrawer</code> behavior for all 4 supported placements.</p>

        ${this.renderTestBlock('Left Drawer', 'left')}
        ${this.renderTestBlock('Right Drawer', 'right')}
        ${this.renderTestBlock('Top Drawer', 'top')}
        ${this.renderTestBlock('Bottom Drawer', 'bottom')}

        <hr class="my-5">
        <p class="text-muted"><small>All drawers above are animated using JavaScript and AcDrawer's internal animation logic.</small></p>
      </div>

      <!-- Drawer Elements -->
      <div id="drawer-left" class="bg-white border p-4 shadow" style="width:300px;">
        <h5>Left Drawer Content</h5>
        <p>This is the left drawer.</p>
        <button class="btn btn-secondary btn-sm close-btn">Close</button>
      </div>
      <div id="drawer-right" class="bg-white border p-4 shadow" style="width:300px;">
        <h5>Right Drawer Content</h5>
        <p>This is the right drawer.</p>
        <button class="btn btn-secondary btn-sm close-btn">Close</button>
      </div>
      <div id="drawer-top" class="bg-white border p-4 shadow" style="height:200px;">
        <h5>Top Drawer Content</h5>
        <p>This is the top drawer.</p>
        <button class="btn btn-secondary btn-sm close-btn">Close</button>
      </div>
      <div id="drawer-bottom" class="bg-white border p-4 shadow" style="height:200px;">
        <h5>Bottom Drawer Content</h5>
        <p>This is the bottom drawer.</p>
        <button class="btn btn-secondary btn-sm close-btn">Close</button>
      </div>
    `;

    // Initialize drawers
    const drawers: Record<string, AcDrawer> = {
      left: new AcDrawer(this.querySelector('#drawer-left') as HTMLElement, { placement: 'left' }),
      right: new AcDrawer(this.querySelector('#drawer-right') as HTMLElement, { placement: 'right' }),
      top: new AcDrawer(this.querySelector('#drawer-top') as HTMLElement, { placement: 'top' }),
      bottom: new AcDrawer(this.querySelector('#drawer-bottom') as HTMLElement, { placement: 'bottom' }),
    };

    // Bind open buttons
    this.querySelectorAll('[data-open-drawer]').forEach(btn => {
      btn.addEventListener('click', () => {
        const placement = (btn as HTMLElement).dataset.openDrawer!;
        drawers[placement].open();
      });
    });

    // Bind close buttons inside drawers
    this.querySelectorAll('.close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        for (const drawer of Object.values(drawers)) {
          drawer.close();
        }
      });
    });
  }

  private renderTestBlock(title: string, placement: string): string {
    return `
      <div class="mb-4 border rounded p-3 bg-light">
        <h5>${title}</h5>
        <p><small class="text-muted">Opens from the ${placement} side.</small></p>
        <div class="mb-2">
          <button type="button" class="btn btn-primary btn-sm" data-open-drawer="${placement}">Open ${title}</button>
        </div>
      </div>
    `;
  }
}
