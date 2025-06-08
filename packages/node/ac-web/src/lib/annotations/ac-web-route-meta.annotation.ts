import 'reflect-metadata';
interface AcWebRouteMetaOptions {
  summary?: string;
  description?: string;
  parameters?: any[];
  tags?: any[];
}

function AcWebRouteMeta(options: AcWebRouteMetaOptions = {}) {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const defaultOptions: AcWebRouteMetaOptions = {
      summary: '',
      description: '',
      parameters: [],
      tags: [],
    };

    const meta = { ...defaultOptions, ...options };
    Reflect.defineMetadata('ac:web:route:meta', meta, target, propertyKey);
  };
}
