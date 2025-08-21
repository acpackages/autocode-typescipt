import { AcSqlConnection } from "@autocode-ts/ac-sql"
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-ts/autocode"

export class AcRemoteSqlConnection extends AcSqlConnection {
  static readonly KeyDatabaseType = 'database_type';

  @AcBindJsonProperty({ key: AcRemoteSqlConnection.KeyDatabaseType })
  databaseType: AcEnumSqlDatabaseType = AcEnumSqlDatabaseType.Unknown;

  static override instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcRemoteSqlConnection {
    const instance = new AcRemoteSqlConnection();
    return instance.fromJson({ jsonData });
  }

  override fromJson({ jsonData = {} }: { jsonData: Record<string, any> }): AcRemoteSqlConnection {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  override toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  override toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
