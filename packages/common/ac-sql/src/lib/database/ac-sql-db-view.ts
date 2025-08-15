/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDataDictionary, AcDDView } from "@autocode-ts/ac-data-dictionary";
import { AcSqlDbBase } from "./ac-sql-db-base";

export class AcSqlDbView extends AcSqlDbBase {
  viewName: string = '';
  acDDView!: AcDDView;

  constructor({ viewName, dataDictionaryName = 'default' }: { viewName: string; dataDictionaryName?: string }) {
    super({ dataDictionaryName });
    this.viewName = viewName;
    const view = AcDataDictionary.getView({ viewName, dataDictionaryName });
    if (!view) {
      throw new Error(`View '${viewName}' not found in data dictionary '${dataDictionaryName}'`);
    }
    this.acDDView = view;
  }
}
