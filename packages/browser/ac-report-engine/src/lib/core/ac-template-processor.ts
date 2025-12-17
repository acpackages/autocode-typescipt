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
  report: AcReport;
  constructor({ element, context, page }: { element: HTMLElement, context: any, page: AcReportPage }) {
    this.context = context;
    this.element = element;
    this.page = page;
    this.report = page.report;
  }

  async process() {
    await this.processDataBindings(this.element);
    await this.processLoops(this.element);
  }

  async processDataBindings(node: Node) {
    const el = node as HTMLElement;
    // console.log(el);
    if (node.nodeType === Node.ELEMENT_NODE) {
      const conBinding = new AcConditionBinding({ element: el, context: this.context, processor: this });
      await conBinding.apply();
      const dataBinding = new AcDataBinding({ element: el, context: this.context });
      await dataBinding.apply();
    }
    else if (node.nodeType == Node.TEXT_NODE) {
      if (node.nodeValue) {
        const original = node.nodeValue;
        const regex = /{{\s*(.*?)\s*}}/g; // match all {{ expression }}

        // Find all matches
        const matches: { fullMatch: string; expression: string; start: number; end: number }[] = [];
        let match;
        while ((match = regex.exec(original)) !== null) {
          matches.push({
            fullMatch: match[0],
            expression: match[1],
            start: match.index,
            end: regex.lastIndex,
          });
        }

        if (matches.length === 0) {
          return; // No expressions to evaluate
        }

        // Evaluate all expressions in parallel (async)
        const results = await Promise.all(
          matches.map(async ({ expression }) => {
            try {
              return await AcExpression.evaluate({
                expression,
                context: this.context,
              });
            } catch (e) {
              console.error("Expression error:", expression, e);
              return "";
            }
          })
        );

        // Build the final string by replacing matches
        let result = '';
        let lastIndex = 0;

        matches.forEach((match, i) => {
          // Add text before the match
          result += original.slice(lastIndex, match.start);
          // Add evaluated result
          result += results[i] ?? '';
          // Update cursor
          lastIndex = match.end;
        });

        // Add remaining text after last match
        result += original.slice(lastIndex);
        node.nodeValue = result;
      }
    }
    for(const subNode of Array.from(node.childNodes)){
      let continueOperation = true;
      if (subNode.nodeType === Node.ELEMENT_NODE) {
        const el: HTMLElement = subNode as HTMLElement;
        if (el.hasAttribute(AC_REPORT_ATTRIBUTE.templateFor)) {
          continueOperation = false;
        }
      }
      if (continueOperation) {
        await this.processDataBindings(subNode);
      }
    }
  }

  async processLoops(node: Node) {
    const el = node as HTMLElement;
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = el.tagName.toLowerCase();
      const loopBinding = new AcLoopBinding({ element: el, context: this.context, processor: this });
      await loopBinding.apply();
    }
    for(const child of Array.from(node.childNodes)){
     await this.processLoops(child as Node)
    }
  }
}
