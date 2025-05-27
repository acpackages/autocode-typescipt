/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcJsonUtils } from "@autocode-typescript/autocode";

export class AcSqlConnection {
  static readonly KEY_CONNECTION_PORT = 'port';
  static readonly KEY_CONNECTION_HOSTNAME = 'hostname';
  static readonly KEY_CONNECTION_USERNAME = 'username';
  static readonly KEY_CONNECTION_PASSWORD = 'password';
  static readonly KEY_CONNECTION_DATABASE = 'database';
  static readonly KEY_CONNECTION_OPTIONS = 'options';

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
