/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-ts/autocode";
import { AcDataDictionary } from "../..";
// import { AcDataDictionary } from "./ac-data-dictionary.model";

export class AcDDRelationship {
  static readonly KeyCascadeDeleteDestination = "cascade_delete_destination";
  static readonly KeyCascadeDeleteSource = "cascade_delete_source";
  static readonly KeyDestinationColumn = "destination_column";
  static readonly KeyDestinationTable = "destination_table";
  static readonly KeySourceColumn = "source_column";
  static readonly KeySourceTable = "source_table";

  @AcBindJsonProperty({ key: AcDDRelationship.KeyCascadeDeleteDestination })
  cascadeDeleteDestination: boolean = false;

  @AcBindJsonProperty({ key: AcDDRelationship.KeyCascadeDeleteSource })
  cascadeDeleteSource: boolean = false;

  @AcBindJsonProperty({ key: AcDDRelationship.KeyDestinationColumn })
  destinationColumn: string = "";

  @AcBindJsonProperty({ key: AcDDRelationship.KeyDestinationTable })
  destinationTable: string = "";

  @AcBindJsonProperty({ key: AcDDRelationship.KeySourceColumn })
  sourceColumn: string = "";

  @AcBindJsonProperty({ key: AcDDRelationship.KeySourceTable })
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

  getCreateRelationshipStatement({ databaseType = AcEnumSqlDatabaseType.Unknown }: { databaseType?: string } = {}): string {
    return `ALTER Table ${this.destinationTable} ADD FOREIGN KEY (${this.destinationColumn}) REFERENCES ${this.sourceTable}(${this.sourceColumn});`;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
