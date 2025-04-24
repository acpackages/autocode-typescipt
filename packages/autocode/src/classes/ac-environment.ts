import { AcEnumEnvironment } from "../enums/ac-enum-environment.enum";

export class AcEnvironment {
  static environment: AcEnumEnvironment = AcEnumEnvironment.development;
  static config: { [key: string]: any } = {};

  static isDevelopment(): boolean {
    return this.environment === AcEnumEnvironment.development;
  }

  static isProduction(): boolean {
    return this.environment === AcEnumEnvironment.production;
  }

  static isStaging(): boolean {
    return this.environment === AcEnumEnvironment.staging;
  }
}