import 'reflect-metadata';

export function AcWebUseInterceptor({ names }: { names: string[] }) {
  return function (target: any, propertyKey?: string | any, descriptor?: PropertyDescriptor | any) {
    const metadataKey = 'ac:web:use-interceptor';
    
    // Check if being executed as a TS 5.0 Standard Decorator
    const isStandardDecorator = typeof propertyKey === 'object' && propertyKey !== null && 'kind' in propertyKey;
    let actualPropertyKey: string | undefined;

    if (isStandardDecorator) {
      const context = propertyKey as any;
      if (context.kind === 'class') {
         Reflect.defineMetadata(metadataKey, names, target);
         return;
      } else if (context.kind === 'method') {
         const actualPropertyKey = String(context.name);
         context.addInitializer(function(this: any) {
           Reflect.defineMetadata(metadataKey, names, this, actualPropertyKey);
         });
         return;
      }
    } else {
      // Experimental Decorators
      const actualPropertyKey = propertyKey as string | undefined;
      
      if (actualPropertyKey) {
        Reflect.defineMetadata(metadataKey, names, target, actualPropertyKey);
      } else {
        Reflect.defineMetadata(metadataKey, names, target);
      }
    }
  };
}
