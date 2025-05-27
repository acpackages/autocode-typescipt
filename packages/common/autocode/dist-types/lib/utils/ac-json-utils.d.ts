export declare class AcJsonUtils {
    static getJsonDataFromInstance({ instance }: {
        instance: any;
    }): Record<string, any>;
    static _getJsonForPropertyValue(value: any): any;
    static instanceToJson({ instance }: {
        instance: any;
    }): Record<string, any>;
    static prettyEncode(object: any): string;
    static setInstancePropertiesFromJsonData({ instance, jsonData, }: {
        instance: any;
        jsonData: Record<string, any>;
    }): void;
    static _setInstancePropertyValueFromJson({ instance, key, jsonData, attr, }: {
        instance: any;
        key: string;
        jsonData: Record<string, any>;
        attr?: {
            key?: string;
            skipInFromJson?: boolean;
            arrayType?: () => new () => any;
        };
    }): void;
}
