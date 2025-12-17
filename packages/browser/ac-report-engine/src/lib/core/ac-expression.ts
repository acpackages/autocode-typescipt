import { AcPipe } from "./ac-pipe";
import { AcReportEngine } from "./ac-report-engine";

export class AcExpression {

  static evaluate({ expression, context }: { expression: string; context: any }): any {
    try {
      const trimmed = expression.trim();
      if (!trimmed.includes('|')) {
        return AcExpression.evaluateBase({expression:trimmed, context});
      }

      const pipeChain = AcExpression.parsePipeChain(trimmed);
      let value = AcExpression.evaluateBase({expression:pipeChain.base, context});

      for (const { name, args } of pipeChain.pipes) {
        if (name.toLowerCase() === 'async') continue; // skip in sync mode

        const pipe = AcExpression.getPipe(name);
        console.log(pipe);
        if (!pipe) {
          console.warn(`Unknown pipe: ${name}`);
          continue;
        }

        const evaluatedArgs = args.map((arg) =>
          typeof arg === 'string' && arg.startsWith('{{') && arg.endsWith('}}')
            ? this.evaluate({ expression: arg.slice(2, -2).trim(), context })
            : arg
        );

        value = pipe.transform(value, ...evaluatedArgs);
      }

      return value ?? '';
    } catch (ex) {
      console.error(`Sync expression failed: "${expression}"`, ex);
      return '';
    }
  }

  static async evaluateAsync({ expression, context }: { expression: string; context: any }): Promise<any> {
    try {
      const trimmed = expression.trim();
      if (!trimmed.includes('|')) {
        // Fast path: no pipes
        return AcExpression.evaluateBase({expression:trimmed, context});
      }

      const pipeChain = AcExpression.parsePipeChain(trimmed);
      let value: any = await AcExpression.evaluateBase({expression:pipeChain.base, context});

      for (const { name, args } of pipeChain.pipes) {
        const pipe = AcExpression.getPipe(name);
        if (!pipe) {
          console.warn(`Unknown pipe: ${name}`);
          continue;
        }

        const evaluatedArgs = await Promise.all(
          args.map(async (arg) => {
            if (typeof arg === 'string' && arg.startsWith('{{') && arg.endsWith('}}')) {
              return this.evaluate({
                expression: arg.slice(2, -2).trim(),
                context,
              });
            }
            return arg;
          })
        );

        // Handle async pipes
        const result = pipe.transform(value, ...evaluatedArgs);
        value = result instanceof Promise ? await result : result;
      }

      // Final async pipe support (optional: apply at end if needed)
      // You can also use | async explicitly
      if (pipeChain.pipes.some(p => p.name.toLowerCase() === 'async')) {
        value = value instanceof Promise ? await value : value;
      }

      return value ?? '';
    } catch (ex) {
      console.error(`Expression evaluation failed: "${expression}"`, ex);
      return '';
    }
  }

  static evaluateBase({expression,context}:{expression: string, context: any}): any {
    try{
      return new Function(...Object.keys(context), `return (${expression});`)(...Object.values(context));
    }
    catch(ex){
      console.error(expression,context);
      console.error(ex);
      // console.error(expression);
      // console.error(context);
      // console.trace();
    }
    return '';
  }

  private static getPipe(name: string): AcPipe | undefined {
    const normalized = name.toLowerCase();
    console.log(`Resolving pipe : ${normalized}`);
    return AcReportEngine.getPipe({name:normalized});
    ;
  }

  private static parsePipeChain(expression: string): { base: string; pipes: { name: string; args: any[] }[] } {
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
          quoteChar = '';
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

      if (char === '|' && depth === 0) {
        parts.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    if (current.trim()) parts.push(current.trim());

    if (parts.length === 0) return { base: expression, pipes: [] };

    const base = parts[0];
    const pipes = parts.slice(1).map((part) => {
      const [pipeName, ...argStrs] = part.split(':').map((s) => s.trim());

      const args = argStrs.map((arg) => {
        if ((arg.startsWith("'") && arg.endsWith("'")) || (arg.startsWith('"') && arg.endsWith('"'))) {
          return arg.slice(1, -1);
        }
        if (arg === 'true') return true;
        if (arg === 'false') return false;
        if (arg === 'null') return null;
        if (arg === 'undefined') return undefined;
        if (!isNaN(Number(arg)) && arg !== '') return Number(arg);
        if (arg.startsWith('{{') && arg.endsWith('}}')) return arg; // dynamic
        return arg;
      });

      return { name: pipeName, args };
    });

    return { base, pipes };
  }
}
