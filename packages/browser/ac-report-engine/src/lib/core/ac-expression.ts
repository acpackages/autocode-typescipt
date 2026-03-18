// ac-expression.ts
import { AcReportEngine } from "./ac-report-engine";
import { evaluateAcPipeExpression } from '@autocode-ts/ac-pipes';

export class AcExpression {
  /**
   * Evaluate an expression with full async pipe support
   */
  static async evaluate({
    expression,
    context,
  }: {
    expression: string;
    context: any;
  }): Promise<any> {
    try {
      return await evaluateAcPipeExpression({ expression, context,evaluateFunction:({expression,context,}: {expression: string;context: any;})=>{
        return new Function(...Object.keys(context), `return (${expression});`)(
        ...Object.values(context)
      );
      } });
    } catch (ex) {
      AcReportEngine.logError(`Expression evaluation failed: "${expression}"`, ex);
      return '';
    }
  }
}
