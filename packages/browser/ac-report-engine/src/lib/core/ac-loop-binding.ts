/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AC_REPORT_ATTRIBUTE } from "../consts/ac-report-html-attributes.const";
import { AcReportPage } from "../models/ac-report-page.model";
import { AcReport } from "../models/ac-report.model";
import { AcExpression } from "./ac-expression";
import { AcReportEngine } from "./ac-report-engine";
import { AcTemplateProcessor } from "./ac-template-processor";
import { arrayRemove } from "@autocode-ts/ac-extensions";

export class AcLoopBinding {
  element: HTMLElement;
  context: any;
  processor: AcTemplateProcessor;
  report: AcReport;
  page: AcReportPage;

  constructor({ element, context, processor }: { element: HTMLElement, context: any, processor: AcTemplateProcessor }) {
    this.element = element;
    this.context = context;
    this.processor = processor;
    this.page = processor.page;
    this.report = processor.page.report;
  }

  async apply(): Promise<boolean> {
    return await this.processAcFor();
  }

  async processAcFor(): Promise<boolean> {
    try {
      const expr = this.element.getAttribute(AC_REPORT_ATTRIBUTE.templateFor);
      if (expr !== null) {
        let varKey = '';
        let indexKey = '';
        let contextKey = '';
        const context = this.context;
        let expression: string = expr.trim();
        while (expression.indexOf("  ") > 0) {
          expression = expression.replaceAll("  ", " ");
        }
        const exprSplit = expression.trim().split(";")
        const exprParts = exprSplit[0].trim().split(' ');
        if (exprParts.length == 4) {
          if (exprParts[0] == 'let' && exprParts[2] == "of") {
            varKey = exprParts[1];
            contextKey = exprParts[3];
          }
          else {
            AcReportEngine.logError('*acFor expression must start with let and include of : ' + expr);
          }
        }
        else {
          AcReportEngine.logError('*Invalid acFor expression : ' + expr);
        }
        if (exprSplit.length > 1) {
          const indexStr = exprSplit[1];
          const indexParts = indexStr.trim().split(' ');
          if (indexParts.length > 1) {
            if (indexParts[0] == 'let') {
              indexKey = indexParts[1]
            }
            else {
              AcReportEngine.logError('*acFor index expression must start with let : ' + expr);
            }
          }
        }
        const childClones: HTMLElement[] = [];
        for (const child of Array.from(this.element.children) as HTMLElement[]) {
          childClones.push(child.cloneNode(true) as HTMLElement);
        }
        this.element.innerHTML = '';
        const elementId = this.element.getAttribute(AC_REPORT_ATTRIBUTE.tempId)!;
        this.report.activeLoopElementIds.push(elementId)
        const iteratorData = await AcExpression.evaluate({ expression: contextKey, context: context });
        if (iteratorData != '' && Array.isArray(iteratorData)) {
          const iteratorValues = Object.values(iteratorData);

          for (let i = 0; i < iteratorValues.length; i++) {
            const itemContext = { ...this.context, [varKey]: iteratorValues[i] };
            if (indexKey) {
              itemContext[indexKey] = i;
            }
            for (const child of childClones) {
              const childEl = child.cloneNode(true) as HTMLElement;
              this.element.append(childEl);
              if (this.page.isContentOverflow) {
                childEl.remove();
                const newPage = this.report.addPage();
                if (newPage) {
                  this.page = newPage;
                  this.element = this.page.element.querySelector(`[${AC_REPORT_ATTRIBUTE.tempId}=${elementId}]`) as HTMLElement;
                  this.element.append(childEl);
                }
              }
              const processor = new AcTemplateProcessor({ context: itemContext, element: childEl, page: this.processor.page });
              await processor.process();
            }
          }
        }

        this.report.activeLoopElementIds = arrayRemove(this.report.activeLoopElementIds, elementId);
        return true;
      }
    }
    catch (ex) {
      AcReportEngine.logError(`Error processing for`, ex);
      return false;
    }
    return false;
  }
}
