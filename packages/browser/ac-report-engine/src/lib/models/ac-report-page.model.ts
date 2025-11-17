import { AcReport } from "./ac-report.model";

/* eslint-disable @typescript-eslint/no-inferrable-types */
export class AcReportPage {
  element:HTMLElement;
  index:number;
  report:AcReport

  get isContentOverflow():boolean{
    let result:boolean = false;
    if(this.element){
      const pageHeight = this.element.getBoundingClientRect().height;
      result = pageHeight > this.report.pageHeight
    }
    return result;
  }

  get pageHeight():number{
    let result:number = 0;
    if(this.element){
      result = this.element.getBoundingClientRect().height;
    }
    return result;
  }

  constructor({element,index,report}:{element:HTMLElement,index:number,report:AcReport}){
    this.report = report;
    this.element = element;
    this.index = index;
  }

}
