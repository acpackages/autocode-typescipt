export class AcExpression {
  static evaluate({expression,context}:{expression: string, context: any}): any {
    try{
      return new Function(...Object.keys(context), `return (${expression});`)(...Object.values(context));
    }
    catch(ex){
      console.error(ex);
    }
    return null;
  }
}
