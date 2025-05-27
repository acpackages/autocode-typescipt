/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-typescript/autocode";
import { AcDataDictionary } from "./ac-data-dictionary.model";

export class AcDDRelationship {
  static readonly KEY_CASCADE_DELETE_DESTINATION = "cascade_delete_destination";
  static readonly KEY_CASCADE_DELETE_SOURCE = "cascade_delete_source";
  static readonly KEY_DESTINATION_COLUMN = "destination_column";
  static readonly KEY_DESTINATION_TABLE = "destination_table";
  static readonly KEY_SOURCE_COLUMN = "source_column";
  static readonly KEY_SOURCE_TABLE = "source_table";

  @AcBindJsonProperty({ key: AcDDRelationship.KEY_CASCADE_DELETE_DESTINATION })
  cascadeDeleteDestination: boolean = false;

  @AcBindJsonProperty({ key: AcDDRelationship.KEY_CASCADE_DELETE_SOURCE })
  cascadeDeleteSource: boolean = false;

  @AcBindJsonProperty({ key: AcDDRelationship.KEY_DESTINATION_COLUMN })
  destinationColumn: string = "";

  @AcBindJsonProperty({ key: AcDDRelationship.KEY_DESTINATION_TABLE })
  destinationTable: string = "";

  @AcBindJsonProperty({ key: AcDDRelationship.KEY_SOURCE_COLUMN })
  sourceColumn: string = "";

  @AcBindJsonProperty({ key: AcDDRelationship.KEY_SOURCE_TABLE })
  sourceTable: string = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDRelationship {
    const instance = new AcDDRelationship();
    instance.fromJson({ jsonData });
    return instance;
  }

  static getInstances({
    destinationColumn,
    destinationTable,
    dataDictionaryName = "default",
  }: {
    destinationColumn: string;
    destinationTable: string;
    dataDictionaryName?: string;
  }): AcDDRelationship[] {
    const result: AcDDRelationship[] = [];
    const acDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName });

    if (
      acDataDictionary.relationships.hasOwnProperty(destinationTable) &&
      acDataDictionary.relationships[destinationTable].hasOwnProperty(destinationColumn)
    ) {
      const sourceDetails = acDataDictionary.relationships[destinationTable][destinationColumn];
      for (const sourceTable in sourceDetails) {
        if (sourceDetails.hasOwnProperty(sourceTable)) {
          const sourceColumnDetails = sourceDetails[sourceTable];
          for (const sourceColumn in sourceColumnDetails) {
            if (sourceColumnDetails.hasOwnProperty(sourceColumn)) {
              const relationshipDetails = sourceColumnDetails[sourceColumn];
              result.push(AcDDRelationship.instanceFromJson({ jsonData: relationshipDetails }));
            }
          }
        }
      }
    }

    return result;
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  getCreateRelationshipStatement({ databaseType = AcEnumSqlDatabaseType.UNKNOWN }: { databaseType?: string } = {}): string {
    return `ALTER TABLE ${this.destinationTable} ADD FOREIGN KEY (${this.destinationColumn}) REFERENCES ${this.sourceTable}(${this.sourceColumn});`;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
