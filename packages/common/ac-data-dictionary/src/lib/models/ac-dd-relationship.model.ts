/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-ts/autocode";
import { AcDataDictionary } from "./ac-data-dictionary.model";

export class AcDDRelationship {
  static readonly KeyCascadeDeleteDestination = "cascadeDeleteDestination";
  static readonly KeyCascadeDeleteSource = "cascadeDeleteSource";
  static readonly KeyDestinationColumn = "destinationColumn";
  static readonly KeyDestinationTable = "destinationTable";
  static readonly KeySourceColumn = "sourceColumn";
  static readonly KeySourceTable = "sourceTable";

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
    for(const relationshipDetails of Object.values(acDataDictionary.relationships)){
      const relationship = AcDDRelationship.instanceFromJson({ jsonData: relationshipDetails })
      if(relationship.destinationColumn == destinationColumn && relationship.destinationTable == destinationTable){
        result.push(relationship);
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
