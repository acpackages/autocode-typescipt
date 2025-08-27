/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-ts/autocode";
import { AcDataDictionary, AcDDViewColumn } from "../..";
// import { AcDDViewColumn } from "./ac-dd-view-column.model";
// import { AcDataDictionary } from "./ac-data-dictionary.model";

export class AcDDView {
  static readonly KeyViewName = "viewName";
  static readonly KeyViewColumns = "viewColumns";
  static readonly KeyViewQuery = "viewQuery";

  @AcBindJsonProperty({ key: AcDDView.KeyViewName })
  viewName: string = "";

  @AcBindJsonProperty({ key: AcDDView.KeyViewQuery })
  viewQuery: string = "";

  @AcBindJsonProperty({ key: AcDDView.KeyViewColumns })
  viewColumns: Record<string, AcDDViewColumn> = {};

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDView {
    const instance = new AcDDView();
    instance.fromJson({ jsonData: jsonData });
    return instance;
  }

  static getInstance({viewName,dataDictionaryName = "default"}:{viewName: string, dataDictionaryName?: string }): AcDDView {
    const result = new AcDDView();
    const acDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName });

    if (acDataDictionary.views.hasOwnProperty(viewName)) {
      result.fromJson({ jsonData: acDataDictionary.views[viewName] });
    }

    return result;
  }

  fromJson({ jsonData }: { jsonData: any }): AcDDView {
    const json = { ...jsonData };
    if (json.hasOwnProperty(AcDDView.KeyViewColumns) && typeof json[AcDDView.KeyViewColumns] === 'object') {
      const columns = json[AcDDView.KeyViewColumns] as Record<string, any>;
      for (const columnName in columns) {
        if (columns.hasOwnProperty(columnName)) {
          this.viewColumns[columnName] = AcDDViewColumn.instanceFromJson({ jsonData: columns[columnName] });
        }
      }
      delete json[AcDDView.KeyViewColumns];
    }
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: json });
    return this;
  }

  static getDropViewStatement({viewName,databaseType=AcEnumSqlDatabaseType.Unknown}: { viewName: string; databaseType?: string }): string {
    return `DROP View IF EXISTS ${viewName};`;
  }

  getCreateViewStatement({databaseType=AcEnumSqlDatabaseType.Unknown}: { databaseType?: string } = {}): string {
    return `CREATE View ${this.viewName} AS ${this.viewQuery};`;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
