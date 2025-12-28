/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AC_PAGE_SIZES, AcEvents, AcHooks, AcLogger, Autocode, IAcPageSizeDetails } from '@autocode-ts/autocode';
import { AcReportPage } from "./ac-report-page.model";
import { AC_REPORT_ATTRIBUTE } from '../consts/ac-report-html-attributes.const';
import { AcEnumPageOrientation } from '../enums/ac-enum-page-orientations.enum';
import { AcTemplateProcessor } from '../core/ac-template-processor';
import { AcReportEngine } from '../core/ac-report-engine';

export class AcReport {
  reportElClone!: HTMLElement;
  pageElClone?: HTMLElement;
  element!: HTMLElement;
  activePage?: AcReportPage;
  pageOrientation: AcEnumPageOrientation = AcEnumPageOrientation.Portrait;
  pageSize: IAcPageSizeDetails = AC_PAGE_SIZES['A4'];
  pageHeight: number = 0;
  pageWidth: number = 0;
  pages: AcReportPage[] = [];
  evets: AcEvents = new AcEvents();
  hooks: AcHooks = new AcHooks();
  logger: AcLogger = new AcLogger();
  activeLoopElementIds: string[] = [];

  constructor({ element }: { element: HTMLElement }) {
    AcReportEngine.init();
    this.setTempIdsToElement({ element: element });
    this.reportElClone = element.cloneNode(true) as HTMLElement;
    this.element = element;

    if (this.reportElClone.querySelector(`[${AC_REPORT_ATTRIBUTE.page}]`)) {
      this.pageElClone = (this.reportElClone.querySelector(`[${AC_REPORT_ATTRIBUTE.page}]`) as HTMLElement).cloneNode(true) as HTMLElement;
      if (this.pageElClone.hasAttribute(AC_REPORT_ATTRIBUTE.pageSize)) {
        const size = this.pageElClone.getAttribute(AC_REPORT_ATTRIBUTE.pageSize)!.toUpperCase();
        if (AC_PAGE_SIZES[size]) {
          this.pageSize = AC_PAGE_SIZES[size];
        }
      }
      if (this.pageElClone.hasAttribute(AC_REPORT_ATTRIBUTE.pageOrientation)) {
        const orientation: any = this.pageElClone.getAttribute(AC_REPORT_ATTRIBUTE.pageOrientation)!.toUpperCase();
        if (Object.values(AcEnumPageOrientation).includes(orientation)) {
          this.pageOrientation = orientation;
        }
      }
      this.setPageHeightWidth();
      this.element.querySelector(`[${AC_REPORT_ATTRIBUTE.page}]`)?.remove();
    }
    else{
      const page = new AcReportPage({ element: this.element, index: this.pages.length, report: this });
      this.pages.push(page);
      this.activePage = page;
    }
  }

  addPage() {
    if (this.pages.length > 0) {
      const lastPageEl = this.pages[this.pages.length - 1].element as HTMLElement;
      const cloneEl = lastPageEl.cloneNode(true) as HTMLElement;
      const page = new AcReportPage({ element: cloneEl, index: this.pages.length, report: this });
      this.pages.push(page);
      this.activePage = page;
      this.element.append(cloneEl);
      if(this.activeLoopElementIds.length > 0){
        for(let i=0;i<this.activeLoopElementIds.length ;i++){
          const tempId = this.activeLoopElementIds[i];
          const loopEl = cloneEl.querySelector(`[${AC_REPORT_ATTRIBUTE.tempId}=${tempId}]`);
          if(loopEl){
            if(i<this.activeLoopElementIds.length-1){
              const subLoopId = this.activeLoopElementIds[i+1] ;
              const subLoopEl = loopEl.querySelector(`[${AC_REPORT_ATTRIBUTE.tempId}=${subLoopId}]`);
              if(subLoopEl){
                const clone = subLoopEl.cloneNode(true);
                loopEl.innerHTML = '';
                loopEl.append(clone);
              }
              else{
                loopEl.innerHTML = '';
              }
            }
            else{
              loopEl.innerHTML = '';
            }
          }
        }
      }
      return this.activePage;
    }
    else{
      const page = new AcReportPage({ element: this.pageElClone!.cloneNode(true) as HTMLElement, index: this.pages.length, report: this });
      this.element.append(page.element);
      this.pages.push(page);
      this.activePage = page;
      return this.activePage;
    }
  }

  clearTempIdsFromElement({ element }: { element: HTMLElement }) {
    element.removeAttribute('ac-temp-id');
    for (const child of Array.from(element.children) as HTMLElement[]) {
      this.clearTempIdsFromElement({ element: child });
    }
  }

  setTempIdsToElement({ element }: { element: HTMLElement }) {
    element.setAttribute('ac-temp-id', Autocode.uuid());
    for (const child of Array.from(element.children) as HTMLElement[]) {
      this.setTempIdsToElement({ element: child });
    }
  }

  finalizePages() {
    for (const page of Array.from(this.element.querySelectorAll(`[${AC_REPORT_ATTRIBUTE.page}]`)) as HTMLElement[]) {
      page.style.maxHeight = `${this.pageHeight}px`;
      page.style.minHeight = `${this.pageHeight}px`;
      page.style.height = `${this.pageHeight}px`;

      page.style.maxWidth = `${this.pageWidth}px`;
      page.style.minWidth = `${this.pageWidth}px`;
      page.style.width = `${this.pageWidth}px`;
    }
    this.clearTempIdsFromElement({element:this.element});
  }

  async generate({ data }: { data: any }) {
    if(this.pageElClone){
      this.addPage();
    }
    const context = { data: data, report: {}, page: {} };
    const processor = new AcTemplateProcessor({ context: context, element: this.element, page: this.activePage! });
    await processor.process();
    this.finalizePages();
  }

  setPageHeightWidth() {
    if (this.pageElClone) {
      const measureElement = this.pageElClone.cloneNode(true) as HTMLElement;
      measureElement.style.visibility = 'none';
      if (this.pageOrientation == AcEnumPageOrientation.Portrait) {
        measureElement.style.maxHeight = `${this.pageSize.heightMm}mm`;
        measureElement.style.minHeight = `${this.pageSize.heightMm}mm`;
        measureElement.style.height = `${this.pageSize.heightMm}mm`;

        measureElement.style.maxWidth = `${this.pageSize.widthMm}mm`;
        measureElement.style.minWidth = `${this.pageSize.widthMm}mm`;
        measureElement.style.width = `${this.pageSize.widthMm}mm`;
      }
      else {
        measureElement.style.maxHeight = `${this.pageSize.widthMm}mm`;
        measureElement.style.minHeight = `${this.pageSize.widthMm}mm`;
        measureElement.style.height = `${this.pageSize.widthMm}mm`;

        measureElement.style.maxWidth = `${this.pageSize.heightMm}mm`;
        measureElement.style.minWidth = `${this.pageSize.heightMm}mm`;
        measureElement.style.width = `${this.pageSize.heightMm}mm`;
      }
      (this.element.ownerDocument.querySelector('body') as HTMLElement).append(measureElement);
      this.pageHeight = measureElement.getBoundingClientRect().height;
      this.pageWidth = measureElement.getBoundingClientRect().width;
      measureElement.remove();
    }
  }
}
