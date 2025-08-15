/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcJsonUtils } from "@autocode-ts/autocode";

export class AcSqlConnection {
  static readonly KeyConnectionPort = 'port';
  static readonly KeyConnectionHostname = 'hostname';
  static readonly KeyConnectionUsername = 'username';
  static readonly KeyConnectionPassword = 'password';
  static readonly KeyConnectionDatabase = 'database';
  static readonly KeyConnectionOptions = 'options';

  port: number = 0;
  hostname: string = '';
  username: string = '';
  password: string = '';
  database: string = '';
  options: any[] = [];


  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcSqlConnection {
    const instance = new AcSqlConnection();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData = {} }: { jsonData: Record<string, any> }): AcSqlConnection {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
