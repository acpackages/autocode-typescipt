/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-typescript/autocode";
import { AcDDViewColumn } from "./ac-dd-view-column.model";
import { AcDataDictionary } from "./ac-data-dictionary.model";

export class AcDDView {
  static readonly KEY_VIEW_NAME = "view_name";
  static readonly KEY_VIEW_COLUMNS = "view_columns";
  static readonly KEY_VIEW_QUERY = "view_query";

  @AcBindJsonProperty({ key: AcDDView.KEY_VIEW_NAME })
  viewName: string = "";

  @AcBindJsonProperty({ key: AcDDView.KEY_VIEW_QUERY })
  viewQuery: string = "";

  @AcBindJsonProperty({ key: AcDDView.KEY_VIEW_COLUMNS })
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
    if (json.hasOwnProperty(AcDDView.KEY_VIEW_COLUMNS) && typeof json[AcDDView.KEY_VIEW_COLUMNS] === 'object') {
      const columns = json[AcDDView.KEY_VIEW_COLUMNS] as Record<string, any>;
      for (const columnName in columns) {
        if (columns.hasOwnProperty(columnName)) {
          this.viewColumns[columnName] = AcDDViewColumn.instanceFromJson({ jsonData: columns[columnName] });
        }
      }
      delete json[AcDDView.KEY_VIEW_COLUMNS];
    }
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: json });
    return this;
  }

  static getDropViewStatement({viewName,databaseType=AcEnumSqlDatabaseType.UNKNOWN}: { viewName: string; databaseType?: string }): string {
    return `DROP VIEW IF EXISTS ${viewName};`;
  }

  getCreateViewStatement({databaseType=AcEnumSqlDatabaseType.UNKNOWN}: { databaseType?: string } = {}): string {
    return `CREATE VIEW ${this.viewName} AS ${this.viewQuery};`;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
