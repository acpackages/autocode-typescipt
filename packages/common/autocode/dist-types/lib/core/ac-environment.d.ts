import { AcEnumEnvironment } from "../enums/ac-enum-environment.enum";
export declare class AcEnvironment {
    static environment: AcEnumEnvironment;
    static config: {
        [key: string]: any;
    };
    static isDevelopment(): boolean;
    static isProduction(): boolean;
    static isStaging(): boolean;
}
