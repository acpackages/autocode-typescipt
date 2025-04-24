import { AcLogger } from "@ac_packages/autocode";

export class AcSqlConnection {
    
  static keyConnectionPort: string = "port";
  static keyConnectionHostname: string = "hostname";
  static keyConnectionUsername: string = "username";
  static keyConnectionPassword: string = "password";
  static keyConnectionDatabase: string = "database";
  static keyConnectionOptions: any = "options";

  logger: AcLogger = new AcLogger();
  port: number = 0;
  hostname: string = "";
  username: string = "";
  password: string = "";
  database: string = "";
  options:any = {};



  static fromJson(jsonData: { [key: string]: any }): AcSqlConnection {
    const instance = new AcSqlConnection();
    instance.setValuesFromJson(jsonData);
    return instance;
  }

  setValuesFromJson(jsonData: { [key: string]: any } = {}): void {
    if (AcSqlConnection.keyConnectionPort in jsonData) {
      this.port = jsonData[AcSqlConnection.keyConnectionPort] as number;
    }

    if (AcSqlConnection.keyConnectionHostname in jsonData) {
      this.hostname = jsonData[AcSqlConnection.keyConnectionHostname] as string;
    }

    if (AcSqlConnection.keyConnectionUsername in jsonData) {
      this.username = jsonData[AcSqlConnection.keyConnectionUsername] as string;
    }

    if (AcSqlConnection.keyConnectionPassword in jsonData) {
      this.password = jsonData[AcSqlConnection.keyConnectionPassword] as string;
    }

    if (AcSqlConnection.keyConnectionDatabase in jsonData) {
      this.database = jsonData[AcSqlConnection.keyConnectionDatabase] as string;
    }

    if (AcSqlConnection.keyConnectionOptions in jsonData) {
      this.options = jsonData[AcSqlConnection.keyConnectionOptions] as any;
    }
  }

  toJson(): { [key: string]: any } {
    return {
      [AcSqlConnection.keyConnectionPort]: this.port,
      [AcSqlConnection.keyConnectionHostname]: this.hostname,
      [AcSqlConnection.keyConnectionUsername]: this.username,
      [AcSqlConnection.keyConnectionPassword]: this.password,
      [AcSqlConnection.keyConnectionDatabase]: this.database,
      [AcSqlConnection.keyConnectionOptions]: this.options
    };
  }
}
