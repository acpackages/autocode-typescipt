import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";
import { AC_BUILDER_ICON_SVGS } from "../consts/ac-builder-icon-svgs.consts";
import { AC_BASIC_PROPERTIES, AC_MOUSE_EVENTS, AC_POINTER_EVENTS, AC_TABLE_PROPERTIES, AC_TOUCH_EVENTS } from "../consts/ac-element-properties-events.consts";
import { AcBuilderElement } from "../core/ac-builder-element";
import { IAcBuilderElementProperty } from "../interfaces/ac-builder-element-property.interface";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";
import { IAcBuilderElementInitArgs } from "../interfaces/callback-args/ac-builder-element-init-args.interface";

export class AcTableElement extends AcBuilderElement{
  override init({ args }: { args: IAcBuilderElementInitArgs; }): void {
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
    this.element.classList.add('contenteditable');
    this.registerListeners();
  }

  override handleCommand({command,args}:{command:string,args:any}){
    console.log(command);
    if(command == 'addRow'){
      const body = this.element.querySelector('tbody');
      const row = document.createElement('tr');
      row.innerHTML = `<td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>`;
      body?.append(row);
    }

  }

  private registerListeners(){
    this.element.addEventListener('click',(event:MouseEvent)=>{
      this.events.execute({event:'click',args:event});
    });
    this.element.addEventListener('dblclick',(event:MouseEvent)=>{
      this.events.execute({event:'doubleClick',args:event});
    });
  }
}

export const AC_BUILDER_TABLE_ELEMENT:IAcBuilderElement = {
  category:'Table',
  name:'table',
  tag:'table',
  title:'Table',
  events:[
    ...Object.values(AC_MOUSE_EVENTS),
    ...Object.values(AC_POINTER_EVENTS),
    ...Object.values(AC_TOUCH_EVENTS)
  ],
  properties:[
    AC_TABLE_PROPERTIES.border as IAcBuilderElementProperty,
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
  ],
  mediaSvg:AC_BUILDER_ICON_SVGS.table,
  instanceClass:AcTableElement,
  commands:[
    {name:'addRow',title:'Add Row',iconSvg:ACI_SVG_SOLID.plus}
  ]
}
