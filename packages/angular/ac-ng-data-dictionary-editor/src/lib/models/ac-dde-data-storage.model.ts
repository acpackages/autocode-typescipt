/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { AcDDEDataDictionary } from "./ac-dde-data-dictionary.model";
import { AcDDEFunction } from "./ac-dde-function.model";
import { AcDDERelationship } from "./ac-dde-relationship.model";
import { AcDDEStoredProcedure } from "./ac-dde-stored-procedure.model";
import { AcDDETableColumn } from "./ac-dde-table-column.model";
import { AcDDETrigger } from "./ac-dde-trigger.model";
import { AcDDEViewColumn } from "./ac-dde-view-column.model";
import { AcDDEView } from "./ac-dde-view.model";
import { AcDDETable } from "./ac-dde-table.model";

export class AcDDEDataStorage {
  static readonly KeyDataDictionaries = "data_dictionaries";
  static readonly KeyFunctions = "functions";
  static readonly KeyRelationships = "relationships";
  static readonly KeyStoredProcedures = "stored_procedures";
  static readonly KeyTableColumns = "table_columns";
  static readonly KeyTables = "tables";
  static readonly KeyTriggers = "triggers";
  static readonly KeyViewColumns = "columns";
  static readonly KeyViews = "views";

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyDataDictionaries })
  dataDictionaries: Record<string, AcDDEDataDictionary> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyFunctions })
  functions: Record<string, AcDDEFunction> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyRelationships })
  relationships: Record<string, AcDDERelationship> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyStoredProcedures })
  storedProcedures: Record<string, AcDDEStoredProcedure> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTableColumns })
  tableColumns: Record<string, AcDDETableColumn> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTables })
  tables: Record<string, AcDDETable> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTriggers })
  triggers: Record<string, AcDDETrigger> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViewColumns })
  viewColumns: Record<string, AcDDEViewColumn> = {};

  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViews })
  views: Record<string, AcDDEView> = {};

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}

export const acDDEDataStorage = new AcDDEDataStorage();
