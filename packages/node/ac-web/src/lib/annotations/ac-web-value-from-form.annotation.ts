import 'reflect-metadata';
function AcWebValueFromForm(key: string) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const metadataKey = 'ac:web:value-from-form';

    // Retrieve existing metadata or initialize
    const existingParams: Record<number, string> =
      Reflect.getOwnMetadata(metadataKey, target, propertyKey) || {};

    // Associate the parameter index with the form key
    existingParams[parameterIndex] = key;

    Reflect.defineMetadata(metadataKey, existingParams, target, propertyKey);
  };
}
