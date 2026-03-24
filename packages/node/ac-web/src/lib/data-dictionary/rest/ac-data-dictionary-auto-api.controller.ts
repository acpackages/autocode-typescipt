/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDataDictionary, AcDDTable } from '@autocode-ts/ac-data-dictionary';
import { AcLogger, AcEnumLogType, AcResult } from '@autocode-ts/autocode';
import { AcSqlDbTable } from '@autocode-ts/ac-sql';
import { AcWeb } from '../../core/ac-web';
import { AcWebRequest } from '../../models/ac-web-request.model';
import { AcApiDocTag } from '../../api-docs/models/ac-api-doc-tag.model';
import { AcDataDictionaryAutoDelete } from './ac-data-dictionary-auto-delete.controller';
import { AcDataDictionaryAutoInsert } from './ac-data-dictionary-auto-insert.controller';
import { AcDataDictionaryAutoSave } from './ac-data-dictionary-auto-save.controller';
import { AcDataDictionaryAutoSelect } from './ac-data-dictionary-auto-select.controller';
import { AcDataDictionaryAutoSelectDistinct } from './ac-data-dictionary-auto-select-distinct.controller';
import { AcDataDictionaryAutoUpdate } from './ac-data-dictionary-auto-update.controller';

export class AcDataDictionaryAutoApi {
  acWeb: AcWeb;
  dataDictionaryName: string = 'default';
  excludeTables: Record<string, Record<string, boolean>> = {};
  includeTables: Record<string, Record<string, boolean>> = {};
  urlPrefix: string = '';
  acDataDictionary: AcDataDictionary;
  logger: AcLogger = new AcLogger({ logType: AcEnumLogType.Console, logMessages: true });

  getAcSqlDbTable: (args: { request: AcWebRequest, acDDTable: AcDDTable }) => Promise<AcResult> = async ({ acDDTable }) => {
    const result = new AcResult();
    result.setSuccess({ value: new AcSqlDbTable({ tableName: acDDTable.tableName }) });
    return result;
  };

  constructor({ acWeb, dataDictionaryName = 'default' }: { acWeb: AcWeb, dataDictionaryName?: string }) {
    this.acWeb = acWeb;
    this.dataDictionaryName = dataDictionaryName;
    this.acDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName });
  }

  excludeTable({
    tableName,
    delete: del,
    insert,
    save,
    select,
    selectDistinct,
    selectRow,
    update,
  }: {
    tableName: string;
    delete?: boolean;
    insert?: boolean;
    save?: boolean;
    select?: boolean;
    selectDistinct?: boolean;
    selectRow?: boolean;
    update?: boolean;
  }): this {
    if (del === undefined && insert === undefined && save === undefined && select === undefined && selectDistinct === undefined && selectRow === undefined && update === undefined) {
      del = insert = save = select = selectDistinct = selectRow = update = true;
    } else {
      del ??= false; insert ??= false; save ??= false; select ??= false; selectDistinct ??= false; selectRow ??= false; update ??= false;
    }
    this.excludeTables[tableName] = {
      delete: del!, insert: insert!, save: save!, select: select!, selectDistinct: selectDistinct!, selectRow: selectRow!, update: update!,
    };
    return this;
  }

  includeTable({
    tableName,
    delete: del,
    insert,
    save,
    select,
    selectDistinct,
    selectRow,
    update,
  }: {
    tableName: string;
    delete?: boolean;
    insert?: boolean;
    save?: boolean;
    select?: boolean;
    selectDistinct?: boolean;
    selectRow?: boolean;
    update?: boolean;
  }): this {
    if (del === undefined && insert === undefined && save === undefined && select === undefined && selectDistinct === undefined && selectRow === undefined && update === undefined) {
      del = insert = save = select = selectDistinct = selectRow = update = true;
    } else {
      del ??= false; insert ??= false; save ??= false; select ??= false; selectDistinct ??= false; selectRow ??= false; update ??= false;
    }
    this.includeTables[tableName] = {
      delete: del!, insert: insert!, save: save!, select: select!, selectDistinct: selectDistinct!, selectRow: selectRow!, update: update!,
    };
    return this;
  }

  generate({
    delete: del = true,
    insert = true,
    save = true,
    select = true,
    selectDistinct = true,
    selectRow = true,
    update = true,
  }: {
    delete?: boolean;
    insert?: boolean;
    save?: boolean;
    select?: boolean;
    selectDistinct?: boolean;
    selectRow?: boolean;
    update?: boolean;
  } = {}): this {
    this.logger.log(`Generating apis for tables in data dictionary ${this.dataDictionaryName}...`);

    const tables = AcDataDictionary.getTables({ dataDictionaryName: this.dataDictionaryName });
    for (const tableName of Object.keys(tables)) {
      const acDDTable = tables[tableName];
      let continueOperation = false;
      let generateDelete = true;
      let generateInsert = true;
      let generateSave = true;
      let generateSelect = true;
      let generateSelectDistinct = true;
      let generateSelectRow = true;
      let generateUpdate = true;

      if (Object.keys(this.includeTables).length === 0 && Object.keys(this.excludeTables).length === 0) {
        continueOperation = true;
      } else if (Object.keys(this.includeTables).length > 0) {
        if (this.includeTables[tableName]) {
          continueOperation = true;
          const options = this.includeTables[tableName];
          generateDelete = options.delete;
          generateInsert = options.insert;
          generateSave = options.save;
          generateSelect = options.select;
          generateSelectDistinct = options.selectDistinct;
          generateSelectRow = options.selectRow;
          generateUpdate = options.update;
        }
      } else if (!this.excludeTables[tableName]) {
        continueOperation = true;
      } else if (this.excludeTables[tableName]) {
        continueOperation = true;
        const options = this.excludeTables[tableName];
        generateDelete = !options.delete;
        generateInsert = !options.insert;
        generateSave = !options.save;
        generateSelect = !options.select;
        generateSelectDistinct = !options.selectDistinct;
        generateSelectRow = !options.selectRow;
        generateUpdate = !options.update;
      }

      if (continueOperation) {
        let apiAdded = false;

        if (generateDelete && del) {
          new AcDataDictionaryAutoDelete({ acDDTable, acDataDictionaryAutoApi: this });
          apiAdded = true;
        }
        if (generateInsert && insert) {
          new AcDataDictionaryAutoInsert({ acDDTable, acDataDictionaryAutoApi: this });
          apiAdded = true;
        }
        if (generateSave && save) {
          new AcDataDictionaryAutoSave({ acDDTable, acDataDictionaryAutoApi: this });
          apiAdded = true;
        }
        if (generateSelect && select) {
          new AcDataDictionaryAutoSelect({ acDDTable, acDataDictionaryAutoApi: this, includeSelectRow: generateSelectRow && selectRow });
          apiAdded = true;
        }
        if (generateSelectDistinct && selectDistinct) {
          for (const distinctColumn of acDDTable.getSelectDistinctColumns()) {
            new AcDataDictionaryAutoSelectDistinct({ acDDTable, acDDTableColumn: distinctColumn, acDataDictionaryAutoApi: this });
            apiAdded = true;
          }
        }
        if (generateUpdate && update) {
          new AcDataDictionaryAutoUpdate({ acDDTable, acDataDictionaryAutoApi: this });
          apiAdded = true;
        }

        if (apiAdded) {
          const tag = new AcApiDocTag();
          tag.name = acDDTable.tableName;
          tag.description = `Database operations for table ${acDDTable.tableName}`;
          this.acWeb.acApiDoc.addTag(tag);
        }
      }
    }
    return this;
  }
}
