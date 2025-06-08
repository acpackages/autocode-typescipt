import 'reflect-metadata';
interface AcWebRouteMetaParameterOptions {
  description?: string;
  name?: string;
  required?: string;
  explode?: string;
  schema?: any[];
}

function AcWebRouteMetaParameter(options: AcWebRouteMetaParameterOptions = {}) {
  return function (target: any, propertyKey: string | symbol, parameterIndex?: number) {
    // Store parameters metadata per method
    const metadataKey = 'ac:web:route:meta:parameters';

    // Read existing parameters metadata or initialize
    // eslint-disable-next-line prefer-const
    let existingParams: AcWebRouteMetaParameterOptions[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];

    if (typeof parameterIndex === 'number') {
      // If used on a parameter, store at parameter index position
      existingParams[parameterIndex] = options;
    } else {
      // Otherwise, push to list (for method-level usage)
      existingParams.push(options);
    }

    Reflect.defineMetadata(metadataKey, existingParams, target, propertyKey);
  };
}
