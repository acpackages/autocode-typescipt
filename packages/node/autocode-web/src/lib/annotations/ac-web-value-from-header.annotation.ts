import 'reflect-metadata';
function AcWebValueFromHeader(key: string) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const metadataKey = 'ac:web:value-from-header';

    // Retrieve existing metadata or initialize
    const existingParams: Record<number, string> =
      Reflect.getOwnMetadata(metadataKey, target, propertyKey) || {};

    // Map parameter index to the header key
    existingParams[parameterIndex] = key;

    Reflect.defineMetadata(metadataKey, existingParams, target, propertyKey);
  };
}
