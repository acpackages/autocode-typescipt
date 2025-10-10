/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Output } from '@angular/core';
import { AcBase } from '../../../_base/ac-base.component';
import { AcEnumSort } from '../../enums/ac-sort.enum';
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";

@Component({
  selector: 'ac-sort-button',
  templateUrl: './ac-sort-button.component.html',
  styleUrl: './ac-sort-button.component.css',
  standalone: false
})
export class AcSortButtonComponent extends AcBase{
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  protected sortHtml:any = `<ac-svg-icon>${ACI_SVG_SOLID.sort}</ac-svg-icon>`;
  private sortOptions:any={
    [AcEnumSort.asc]:`<ac-svg-icon>${ACI_SVG_SOLID.arrowDownShortWide}</ac-svg-icon>`,
    [AcEnumSort.desc]:`<ac-svg-icon>${ACI_SVG_SOLID.arrowDownWideShort}</ac-svg-icon>`,
    [AcEnumSort.none]:`<ac-svg-icon>${ACI_SVG_SOLID.sort}</ac-svg-icon>`
  }

  private value:AcEnumSort = AcEnumSort.none;
  get(){
    return this.value;
  }

  set(value:AcEnumSort){
    this.value=value;
    this.sortHtml=this.sortOptions[this.value];
    const eventData = {"sort":this.value};
    this.onChange.emit(eventData);
    this.events.execute({event:'change',args:eventData})
  }

  toggleSort(){
    if(this.value==AcEnumSort.asc){
      this.set(AcEnumSort.desc);
    }
    else if(this.value==AcEnumSort.desc){
      this.set(AcEnumSort.none);
    }
    else if(this.value==AcEnumSort.none){
      this.set(AcEnumSort.asc);
    }
  }
}
