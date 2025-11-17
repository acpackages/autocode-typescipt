import { AC_REPORT_ATTRIBUTE } from "../consts/ac-report-html-attributes.const";
import { AcReportPage } from "../models/ac-report-page.model";
import { AcReport } from "../models/ac-report.model";
import { AcConditionBinding } from "./ac-condition-binding";
import { AcDataBinding } from "./ac-data-binding";
import { AcExpression } from "./ac-expression";
import { AcLoopBinding } from "./ac-loop-binding";

export class AcTemplateProcessor {
  context: any = {};
  element: HTMLElement;
  page: AcReportPage;
  report:AcReport;
  constructor({ element, context, page }: { element: HTMLElement, context: any, page: AcReportPage }) {
    this.context = context;
    this.element = element;
    this.page = page;
    this.report = page.report;
  }

  process() {
    this.processDataBindings(this.element);
    this.processLoops(this.element);
  }

  processDataBindings(node: Node) {
    const el = node as HTMLElement;
    // console.log(el);
    if (node.nodeType === Node.ELEMENT_NODE) {
      new AcConditionBinding({ element: el, context: this.context,processor:this });
      new AcDataBinding({ element: el, context: this.context });
    }
    else if (node.nodeType == Node.TEXT_NODE) {
      if (node.nodeValue) {
        const original = node.nodeValue;
        const regex = /{{\s*(.*?)\s*}}/g; // match all {{ expression }}

        const value = original.replace(regex, (_match, expression) => {
          try {
            return AcExpression.evaluate({
              expression,
              context: this.context
            });
          } catch (e) {
            console.error("Expression error:", expression, e);
            return "";
          }
        });
        node.nodeValue = value;
      }
    }
    node.childNodes.forEach((subNode)=>{
      let continueOperation = true;
      if (subNode.nodeType === Node.ELEMENT_NODE) {
        const el:HTMLElement = subNode as HTMLElement;
        if(el.hasAttribute(AC_REPORT_ATTRIBUTE.templateFor)){
          continueOperation = false;
        }
      }
      if(continueOperation){
        this.processDataBindings(subNode);
      }
    });
  }

  processLoops(node: Node) {
    const el = node as HTMLElement;
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = el.tagName.toLowerCase();
      new AcLoopBinding({ element: el, context: this.context,processor:this });
    }
    Array.from(node.childNodes).forEach(
      child => this.processLoops(child as Node)
    );
  }
}
