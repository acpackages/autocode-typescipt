import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";

const BS_EVENTS: IAcBuilderElementEvent[] = [];

const BS_PROPS: IAcBuilderElementProperty[] = [];

const basicProperty : IAcBuilderElementProperty[] = [
  AC_BASIC_PROPERTIES.id as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.title as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.hidden as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.lang as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.dir as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.translate as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.tabindex as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.accesskey as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.draggable as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.part as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.inert as IAcBuilderElementProperty
];

const ariaProperties : IAcBuilderElementProperty[] = [
  AC_ARIA_PROPERTIES["aria-label"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-describedby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-sort"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-colindex"] as IAcBuilderElementProperty,
];

export class AcBsTable extends AcBuilderElement {
  override initBuilder({ args }: { args?: IAcBuilderElementInitArgs; }): void {
     // Basic placeholder HTML for Table
    this.element.innerHTML = `
      <thead contenteditable>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody contenteditable>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
        </tr>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
        </tr>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
        </tr>
      </tbody>
    `;
    this.element.classList.add('table');
  }

  override init({ args }: { args: IAcBuilderElementInitArgs }): void {

    this.registerDomEvents();
    this.registerBsEvents();
  }

  private registerDomEvents(): void {
    // Wire common DOM events to builder events where applicable
    this.element.addEventListener('click', (event: MouseEvent) => {
      this.events.execute({ event: 'click', args: event });
    });
  }

  override handleCommand({command,args}:{command:string,args:any}){
    if(command == 'addRow'){
      const body = this.element.querySelector('tbody');
      const columnCount = this.element.querySelectorAll('thead th').length;
      const row = document.createElement('tr');
      row.innerHTML = Array.from({length: columnCount}, (_, i) => `<td>New Data</td>`).join('');
      body?.append(row);
    }else if(command == 'addColumn'){
      const header = this.element.querySelector('thead tr');
      const bodyRows = this.element.querySelectorAll('tbody tr');
      const th = document.createElement('th');
      th.textContent = 'New Header';
      header?.appendChild(th);
      bodyRows.forEach(row=>{
        const td = document.createElement('td');
        td.textContent = 'New Data';
        row.appendChild(td);
      });
    }
  }

  private registerBsEvents(): void {
    BS_EVENTS.forEach((ev:any) => {
      try {
        if (ev.htmlEventName && typeof ev.htmlEventName === 'string') {
          this.element.addEventListener(ev.htmlEventName, (event: Event) => {
            this.events.execute({ event: ev.name, args: event });
          });
        }
      } catch (e) {
        // ignore registration errors in builder preview
      }
    });
  }
}

export const AC_BUILDER_BS_TABLE_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bsTable",
  tag: "table",
  title: "Table",
  events: [ ...BS_EVENTS ],
  properties: [
    ...basicProperty,
    ...ariaProperties,
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.table,
  instanceClass: AcBsTable,
  commands:[
    {name:'addRow',title:'Add Row',iconSvg:ACI_SVG_SOLID.tableRows},
    {name:'addColumn',title:'Add Column',iconSvg:ACI_SVG_SOLID.tableColumns}
  ]
};
