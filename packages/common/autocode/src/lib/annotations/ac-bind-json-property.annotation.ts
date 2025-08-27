/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'reflect-metadata';
export interface AcBindJsonPropertyOptions {
  key?: string;
  skipInToJson?: boolean;
  skipInFromJson?: boolean;
  arrayType?: any;
}

const metadataStore = new WeakMap<any, Map<string, AcBindJsonPropertyOptions>>();

export function AcBindJsonProperty(options: AcBindJsonPropertyOptions = {}) {
  return function (target: any, propertyKey: string) {
    if (!metadataStore.has(target.constructor)) {
      metadataStore.set(target.constructor, new Map());
    }
    metadataStore.get(target.constructor)!.set(propertyKey, options);
  };
}

export function getAcBindJsonMetadata(instance: any): Map<string, AcBindJsonPropertyOptions> {
  return metadataStore.get(instance.constructor) || new Map();
}
