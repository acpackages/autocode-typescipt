import 'reflect-metadata';
export function AcWebRepository() {
  return function (target: any) {
    Reflect.defineMetadata('ac:web:repository', true, target);
  };
}
