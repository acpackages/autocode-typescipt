import { AcDataDictionary } from "./ac-data-dictionary";

export class AcDDRelationship {
  static readonly keyCascadeDeleteDestination = "cascade_delete_destination";
  static readonly keyCascadeDeleteSource = "cascade_delete_source";
  static readonly keyDestinationField = "destination_field";
  static readonly keyDestinationTable = "destination_table";
  static readonly keySourceField = "source_field";
  static readonly keySourceTable = "source_table";

  cascadeDeleteDestination: boolean = false;
  cascadeDeleteSource: boolean = false;
  destinationField:string = "";
  destinationTable:string = "";
  sourceField:string = "";
  sourceTable:string = "";

  static fromJson(jsonData: { [key: string]: any }): AcDDRelationship {
    const instance = new AcDDRelationship();
    instance.setValuesFromJson(jsonData);
    return instance;
  }

  static getInstances({ destinationField, destinationTable, dataDictionaryName = "default" }: { destinationField: string; destinationTable: string; dataDictionaryName?: string; }): AcDDRelationship[] {
      let result: AcDDRelationship[] = [];
      let acDataDictionary: AcDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName: dataDictionaryName });
      if (acDataDictionary.relationships[destinationTable]) {
        let tableFields:any = acDataDictionary.relationships[destinationTable];
        if (tableFields[destinationField]) {
          let fieldRelationships:any = tableFields[destinationField];
          for(let sourceTable of Object.keys(fieldRelationships)){
            let sourceDetails:any = fieldRelationships[sourceTable];
            for(let sourceField of Object.keys(sourceDetails)){
              let relationshipDetails:any = sourceDetails[sourceField];
              let relationshipInstance = AcDDRelationship.fromJson(relationshipDetails);
              result.push(relationshipInstance);
            }
          }
        }
      }
      return result;
    }

  setValuesFromJson(jsonData: { [key: string]: any } = {}): void {
    if (jsonData.hasOwnProperty(AcDDRelationship.keyCascadeDeleteDestination)) {
      this.cascadeDeleteDestination = jsonData[AcDDRelationship.keyCascadeDeleteDestination];
    }
    if (jsonData.hasOwnProperty(AcDDRelationship.keyCascadeDeleteSource)) {
      this.cascadeDeleteSource = jsonData[AcDDRelationship.keyCascadeDeleteSource];
    }
    if (jsonData.hasOwnProperty(AcDDRelationship.keyDestinationField)) {
      this.destinationField = jsonData[AcDDRelationship.keyDestinationField];
    }
    if (jsonData.hasOwnProperty(AcDDRelationship.keyDestinationTable)) {
      this.destinationTable = jsonData[AcDDRelationship.keyDestinationTable];
    }
    if (jsonData.hasOwnProperty(AcDDRelationship.keySourceField)) {
      this.sourceField = jsonData[AcDDRelationship.keySourceField];
    }
    if (jsonData.hasOwnProperty(AcDDRelationship.keySourceTable)) {
      this.sourceTable = jsonData[AcDDRelationship.keySourceTable];
    }
  }
  
  toJson(): { [key: string]: any } {
    const result: { [key: string]: any } = {
      [AcDDRelationship.keyCascadeDeleteDestination]: this.cascadeDeleteDestination,
      [AcDDRelationship.keyCascadeDeleteSource]: this.cascadeDeleteSource,
      [AcDDRelationship.keyDestinationField]: this.destinationField,
      [AcDDRelationship.keyDestinationTable]: this.destinationTable,
      [AcDDRelationship.keySourceField]: this.sourceField,
      [AcDDRelationship.keySourceTable]: this.sourceTable,
      
    };
    return result;
  }

  toString(): string {
    return JSON.stringify(this.toJson());;
  }
}
