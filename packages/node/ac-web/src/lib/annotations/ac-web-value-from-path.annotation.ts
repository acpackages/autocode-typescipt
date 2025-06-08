import 'reflect-metadata';
function AcWebValueFromPath(key: string) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const metadataKey = 'ac:web:value-from-path';

    // Retrieve existing metadata or initialize
    const existingParams: Record<number, string> =
      Reflect.getOwnMetadata(metadataKey, target, propertyKey) || {};

    // Map the parameter index to the path key
    existingParams[parameterIndex] = key;

    Reflect.defineMetadata(metadataKey, existingParams, target, propertyKey);
  };
}
