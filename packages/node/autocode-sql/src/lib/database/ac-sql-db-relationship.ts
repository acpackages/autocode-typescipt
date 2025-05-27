import { AcDDRelationship } from "@autocode-typescript/autocode-data-dictionary";
import { AcSqlDbBase } from "./ac-sql-db-base";

export class AcSqlDbRelationship extends AcSqlDbBase {
  acDDRelationship!: AcDDRelationship;

  constructor({
    acDDRelationship,
    dataDictionaryName = 'default',
  }: {
    acDDRelationship: AcDDRelationship;
    dataDictionaryName?: string;
  }) {
    super({ dataDictionaryName });
    this.acDDRelationship = acDDRelationship;
  }
}
