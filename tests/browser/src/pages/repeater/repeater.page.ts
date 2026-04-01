/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable prefer-const */
import { AcRepeaterElement, AcEnumRepeaterHook, IAcRepeaterRowHookArgs, acInit } from '@autocode-ts/ac-browser';
import { customersData } from './../../../../data/customers-data';

export class RepeaterPage extends HTMLElement {
  public static observedAttributes = [];
  repeater?: AcRepeaterElement;

  async connectedCallback() {
    acInit();
     const html = `
      <div class="p-3">
        <h5>Repeater : Local Data</h5>
        <p class="text-muted">A simple list rendered using AcRepeater with virtual scrolling.</p>
        <ac-repeater style="height:80vh"></ac-repeater>
      </div>
    `;
    this.innerHTML = html;

    this.repeater = this.querySelector('ac-repeater') as any;

    if(this.repeater && this.repeater.repeaterApi){
      this.repeater.repeaterApi.usePagination = true;
      console.log(this.repeater.repeaterApi);
      this.repeater.repeaterApi.hooks.subscribe({
      hook: AcEnumRepeaterHook.RowRender,
      callback: (args: IAcRepeaterRowHookArgs) => {
        const data = args.repeaterRow.data;
        const element = args.repeaterRow.instance!.element;

        element.style.padding = '15px';
        element.style.borderBottom = '1px solid #eee';
        element.style.display = 'flex';
        element.style.flexDirection = 'column';
        element.style.gap = '5px';

        element.innerHTML = `
          <div style="font-weight: bold; color: #333;">${data.first_name} ${data.last_name}</div>
          <div style="font-size: 0.9rem; color: #666;">
            <span style="margin-right: 15px;"><i class="fa fa-building"></i> ${data.company}</span>
            <span><i class="fa fa-envelope"></i> ${data.email}</span>
          </div>
          <div style="font-size: 0.8rem; color: #999;">
            <i class="fa fa-map-marker"></i> ${data.city}, ${data.country}
          </div>
        `;
      }
    });

    // Append to container

    // Set data
    const data = customersData.slice(0, 100);
    this.repeater.repeaterApi.data = data;

    // Explicitly set displayed rows to show all data
    this.repeater.repeaterApi.dataManager.setDisplayedRows({
      startIndex: 0,
      rowsCount: data
      .length
    });
    }
    // Custom row rendering

  }
}
