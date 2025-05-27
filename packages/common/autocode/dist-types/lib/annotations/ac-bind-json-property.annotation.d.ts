import 'reflect-metadata';
export interface AcBindJsonPropertyOptions {
    key?: string;
    skipInToJson?: boolean;
    skipInFromJson?: boolean;
    arrayType?: () => new () => any;
}
export declare function AcBindJsonProperty(options?: AcBindJsonPropertyOptions): (target: any, propertyKey: string) => void;
export declare function getAcBindJsonMetadata(instance: any): Map<string, AcBindJsonPropertyOptions>;
