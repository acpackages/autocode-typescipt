import 'reflect-metadata';
function AcWebInject() {
  return function (target: any, propertyKey: string | symbol, parameterIndex?: number) {
    const metadataKey = 'ac:web:inject';

    if (typeof parameterIndex === 'number') {
      // Constructor parameter injection
      const existingParams: number[] = Reflect.getOwnMetadata(metadataKey, target) || [];
      existingParams.push(parameterIndex);
      Reflect.defineMetadata(metadataKey, existingParams, target);
    } else {
      // Property injection
      Reflect.defineMetadata(metadataKey, true, target, propertyKey);
    }
  };
}
