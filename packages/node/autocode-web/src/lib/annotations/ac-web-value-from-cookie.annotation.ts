import 'reflect-metadata';
function AcWebValueFromCookie(key: string) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const metadataKey = 'ac:web:value-from-cookie';

    // Retrieve existing metadata or initialize
    const existingParams: Record<number, string> =
      Reflect.getOwnMetadata(metadataKey, target, propertyKey) || {};

    // Associate the parameter index with the cookie key
    existingParams[parameterIndex] = key;

    Reflect.defineMetadata(metadataKey, existingParams, target, propertyKey);
  };
}
