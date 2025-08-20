import { AcDropdown } from "@autocode-ts/ac-browser";

export class AcDDEDropdown {
  element:HTMLElement = document.createElement('div');
  // connectedCallback() {
  //   this.innerHTML = `
  //     <div class="container py-4">
  //       <h2 class="mb-4">AcDropdown Test Page</h2>
  //       <p>This page demonstrates <code>AcDropdown</code> behavior for:</p>
  //       <ul>
  //         <li>All 4 placements</li>
  //         <li>Keyboard navigation</li>
  //         <li>Hover trigger</li>
  //         <li>ARIA attributes</li>
  //         <li>Auto-flip positioning</li>
  //       </ul>

  //       ${this.renderTestBlock('Bottom Dropdown', 'bottom')}
  //       ${this.renderTestBlock('Top Dropdown', 'top')}
  //       ${this.renderTestBlock('Left Dropdown', 'left')}
  //       ${this.renderTestBlock('Right Dropdown', 'right')}
  //       ${this.renderTestBlock('Hover Dropdown (bottom)', 'hover-bottom', true)}

  //       <hr class="my-5">
  //       <p class="text-muted"><small>All dropdowns above are positioned using JavaScript and <code>AcDropdown</code> internal logic with extra Bootstrap-like behavior.</small></p>
  //     </div>

  //     <!-- Dropdown Menus -->
  //     ${this.renderMenu('menu-bottom', ['Action 1', 'Action 2', 'Action 3'])}
  //     ${this.renderMenu('menu-top', ['Item A', 'Item B', 'Item C'])}
  //     ${this.renderMenu('menu-left', ['Option X', 'Option Y', 'Option Z'])}
  //     ${this.renderMenu('menu-right', ['Alpha', 'Beta', 'Gamma'])}
  //     ${this.renderMenu('menu-hover-bottom', ['Hover A', 'Hover B', 'Hover C'])}
  //   `;

  //   // CSS styling for demo
  //   const style = document.createElement('style');
  //   style.textContent = `
  //     .dropdown-menu-test {
  //       background: white;
  //       border: 1px solid #ccc;
  //       min-width: 150px;
  //       box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  //     }
  //     .dropdown-menu-test a {
  //       display: block;
  //       padding: 5px 10px;
  //       color: #333;
  //       text-decoration: none;
  //     }
  //     .dropdown-menu-test a:hover,
  //     .dropdown-menu-test a:focus {
  //       background-color: #f0f0f0;
  //       outline: none;
  //     }
  //   `;
  //   document.head.appendChild(style);

  //   // Initialize dropdowns
  //   const dropdowns: Record<string, AcDropdown> = {
  //     bottom: new AcDropdown(this.querySelector('[data-trigger="bottom"]') as HTMLElement, {
  //       menu: this.querySelector('#menu-bottom') as HTMLElement,
  //       placement: 'bottom',
  //     }),
  //     top: new AcDropdown(this.querySelector('[data-trigger="top"]') as HTMLElement, {
  //       menu: this.querySelector('#menu-top') as HTMLElement,
  //       placement: 'top',
  //     }),
  //     left: new AcDropdown(this.querySelector('[data-trigger="left"]') as HTMLElement, {
  //       menu: this.querySelector('#menu-left') as HTMLElement,
  //       placement: 'left',
  //     }),
  //     right: new AcDropdown(this.querySelector('[data-trigger="right"]') as HTMLElement, {
  //       menu: this.querySelector('#menu-right') as HTMLElement,
  //       placement: 'right',
  //     }),
  //     hoverBottom: new AcDropdown(this.querySelector('[data-trigger="hover-bottom"]') as HTMLElement, {
  //       menu: this.querySelector('#menu-hover-bottom') as HTMLElement,
  //       placement: 'bottom',
  //       hover: true
  //     }),
  //   };

  //   console.log('Dropdowns initialized:', dropdowns);
  // }

  // private renderTestBlock(title: string, placement: string, hover: boolean = false): string {
  //   return `
  //     <div class="mb-4">
  //       <h5>${title}</h5>
  //       <button type="button" class="btn btn-primary" data-trigger="${placement}">
  //         ${hover ? 'Hover ' : 'Toggle '} ${title}
  //       </button>
  //     </div>
  //   `;
  // }

  // private renderMenu(id: string, items: string[]): string {
  //   return `
  //     <div id="${id}" class="dropdown-menu-test" role="menu">
  //       <ul class="list-unstyled m-0 p-2">
  //         ${items.map(text => `<li><a href="#" role="menuitem" tabindex="-1">${text}</a></li>`).join('')}
  //       </ul>
  //     </div>
  //   `;
  // }
}
