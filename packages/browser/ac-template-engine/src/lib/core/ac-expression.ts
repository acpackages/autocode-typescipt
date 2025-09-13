export class AcExpression {
  static evaluate({expression,context}:{expression: string, context: any}): any {
    try{
      return new Function(...Object.keys(context), `return (${expression});`)(...Object.values(context));
    }
    catch(ex){
      console.error(ex);
      // console.error(expression);
      // console.error(context);
      // console.trace();
    }
    return null;
  }
}
