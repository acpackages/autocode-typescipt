import 'reflect-metadata';
function AcWebValueFromQuery(key: string) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const metadataKey = 'ac:web:value-from-query';

    // Retrieve existing metadata or initialize
    const existingParams: Record<number, string> =
      Reflect.getOwnMetadata(metadataKey, target, propertyKey) || {};

    // Map parameter index to the query key
    existingParams[parameterIndex] = key;

    Reflect.defineMetadata(metadataKey, existingParams, target, propertyKey);
  };
}
