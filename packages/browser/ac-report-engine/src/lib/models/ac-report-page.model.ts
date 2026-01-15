import { AcReport } from "./ac-report.model";

/* eslint-disable @typescript-eslint/no-inferrable-types */
export class AcReportPage {
  element: HTMLElement;
  index: number;
  report: AcReport;
  isFixedHeight: boolean = true;

  get isContentOverflow(): boolean {
    let result: boolean = false;
    if (this.isFixedHeight) {
      if (this.element) {
        const pageHeight = this.element.getBoundingClientRect().height;
        console.log(pageHeight,this.report.pageHeight);
        result = pageHeight > this.report.pageHeight
      }
    }
    console.log(result);
    return result;
  }

  get pageHeight(): number {
    let result: number = 0;
    if (this.element) {
      result = this.element.getBoundingClientRect().height;
    }
    return result;
  }

  get pageNumber(): number {
    let result: number = 0;
    if (this.index) {
      result = this.index;
    }
    return result + 1;
  }

  constructor({ element, index, report, isFixedHeight = true }: { element: HTMLElement, index: number, report: AcReport, isFixedHeight?: boolean }) {
    this.report = report;
    this.element = element;
    this.index = index;
    this.isFixedHeight = isFixedHeight;
  }

  toJson(){
    return {
      index:this.index,number:this.pageNumber
    };
  }

}
