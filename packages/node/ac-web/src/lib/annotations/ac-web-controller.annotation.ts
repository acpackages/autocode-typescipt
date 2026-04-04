import 'reflect-metadata';

export const acWebDetectedControllers: any[] = [];

export function AcWebController() {
  return function (target: any, context?: any) {
    const constructor = typeof context === 'object' && context.kind === 'class' ? target : target;
    Reflect.defineMetadata('ac:web:controller', true, constructor);
    if (!acWebDetectedControllers.includes(constructor)) {
      acWebDetectedControllers.push(constructor);
    }
  };
}
