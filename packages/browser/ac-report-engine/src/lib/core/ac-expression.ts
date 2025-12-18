// ac-expression.ts
import { AcPipe } from "./ac-pipe";
import { AcReportEngine } from "./ac-report-engine";

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
      const trimmed = expression.trim();

      // Fast path: no pipes → just evaluate base expression
      if (!trimmed.includes('|')) {
        return this.evaluateBase({ expression: trimmed, context });
      }

      // Parse: base | pipe1:arg1 | pipe2:{opt:val}
      const pipeChain = this.parsePipeChain(trimmed);

      // Evaluate the base expression (sync)
      let value: any = this.evaluateBase({ expression: pipeChain.base, context });

      // Process each pipe sequentially
      for (const { name, args } of pipeChain.pipes) {
        const pipe = this.getPipe(name);
        if (!pipe) {
          AcReportEngine.logWarn(`Unknown pipe: ${name}`);
          continue;
        }

        // Evaluate all arguments (support nested {{ }} expressions → recursive async eval)
        const evaluatedArgs = await Promise.all(
          args.map(async (arg: any) => {
            if (typeof arg === 'string' && arg.startsWith('{{') && arg.endsWith('}}')) {
              const innerExpr = arg.slice(2, -2).trim();
              return await this.evaluate({ expression: innerExpr, context });
            }
            return arg;
          })
        );

        // Apply pipe — supports both sync and async transform
        const result = pipe.transform(value, ...evaluatedArgs);
        value = result instanceof Promise ? await result : result;
      }

      return value ?? '';
    } catch (ex) {
      AcReportEngine.logError(`Expression evaluation failed: "${expression}"`, ex);
      return '';
    }
  }

  /**
   * Evaluate raw base expression using safe Function constructor
   */
  private static evaluateBase({
    expression,
    context,
  }: {
    expression: string;
    context: any;
  }): any {
    if (!expression) return '';

    try {
      return new Function(...Object.keys(context), `return (${expression});`)(
        ...Object.values(context)
      );
    } catch (ex) {
      AcReportEngine.logError(`Base expression failed: "${expression}"`, ex);
      return '';
    }
  }

  /**
   * Get pipe from global registry
   */
  private static getPipe(name: string): AcPipe | undefined {
    const normalized = name.toLowerCase();
    return AcReportEngine.getPipe({ name: normalized });
  }

  /**
   * Robust pipe chain parser
   * Supports: data | uppercase | bwipqr:{scale:5} | default:'N/A'
   */
  private static parsePipeChain(
    expression: string
  ): { base: string; pipes: { name: string; args: any[] }[] } {
    const parts: string[] = [];
    let current = '';
    let depth = 0;
    let inString = false;
    let quoteChar = '';

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (inString) {
        current += char;
        if (char === quoteChar && expression[i - 1] !== '\\') {
          inString = false;
        }
        continue;
      }

      if (char === "'" || char === '"') {
        inString = true;
        quoteChar = char;
        current += char;
        continue;
      }

      if (char === '(' || char === '{' || char === '[') depth++;
      if (char === ')' || char === '}' || char === ']') depth--;

      if (char === '|' && depth === 0 && !inString) {
        parts.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    if (current.trim()) parts.push(current.trim());

    if (parts.length === 0) {
      return { base: expression, pipes: [] };
    }

    const base = parts[0];
    const pipes = parts.slice(1).map((part) => {
      const [pipeName, ...argStrs] = part.split(':').map((s) => s.trim());

      const args = argStrs.map((arg) => {
        // String literals
        if (
          (arg.startsWith("'") && arg.endsWith("'")) ||
          (arg.startsWith('"') && arg.endsWith('"'))
        ) {
          return arg.slice(1, -1);
        }

        // Literals
        if (arg === 'true') return true;
        if (arg === 'false') return false;
        if (arg === 'null') return null;
        if (arg === 'undefined') return undefined;

        // Numbers
        if (!isNaN(Number(arg)) && arg !== '') return Number(arg);

        // Nested expressions (will be evaluated async later)
        if (arg.startsWith('{{') && arg.endsWith('}}')) return arg;

        // Objects/arrays (raw string, will be parsed by pipe if needed)
        // Or plain identifier
        return arg;
      });

      return { name: pipeName, args };
    });

    return { base, pipes };
  }
}
