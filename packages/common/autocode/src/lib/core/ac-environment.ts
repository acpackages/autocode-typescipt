import { AcEnumEnvironment } from "../..";


export class AcEnvironment {
  static environment: AcEnumEnvironment = AcEnumEnvironment.DEVELOPMENT;
  static config: { [key: string]: any } = {};

  static isDevelopment(): boolean {
    return this.environment === AcEnumEnvironment.DEVELOPMENT;
  }

  static isProduction(): boolean {
    return this.environment === AcEnumEnvironment.PRODUCTION;
  }

  static isStaging(): boolean {
    return this.environment === AcEnumEnvironment.STAGING;
  }
}
