/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-prototype-builtins */
import { AcDataDictionary, AcDDSelectStatement, AcDDTable, AcEnumDDColumnFormat, AcEnumDDColumnType, AcEnumDDRowEvent, AcEnumDDRowOperation, AcEnumDDSelectMode } from "@autocode-typescript/autocode-data-dictionary";
import { AcSqlDbTableColumn } from "./ac-sql-db-table-column";
import '@autocode-typescript/autocode-extensions';
import { AcSqlDbBase } from "./ac-sql-db-base";
import { AcEncryption, AcEnumSqlDatabaseType, AcResult, Autocode } from "@autocode-typescript/autocode";
import { AcSqlDaoResult } from "../models/ac-sql-dao-result.model";
import { AcSqlDbRowEvent } from "./ac-sql-db-row-event";

export class AcSqlDbTable extends AcSqlDbBase {
  tableName: string;
  acDDTable: AcDDTable;

  constructor({ tableName, dataDictionaryName = "default" }: { tableName: string, dataDictionaryName?: string }) {
    super({ dataDictionaryName });
    this.tableName = tableName;
    this.acDDTable = AcDDTable.getInstance({ tableName, dataDictionaryName });
  }

  async cascadeDeleteRows({ rows }: { rows: Array<Record<string, any>> }): Promise<AcResult> {
    const result = new AcResult();
    try {
      this.logger.log(`Checking cascade delete for table ${this.tableName}`);
      const tableRelationships = AcDataDictionary.getTableRelationships({ tableName: this.tableName });
      this.logger.log(["Table relationships : ", tableRelationships]);

      for (const row of rows) {
        this.logger.log(["Checking cascade delete for table row :", row]);
        for (const acRelationship of tableRelationships) {
          let deleteTableName = "";
          let deleteColumnName = "";
          let deleteColumnValue: any;
          this.logger.log(["Checking cascade delete for relationship : ", acRelationship]);

          if (acRelationship.sourceTable === this.tableName && acRelationship.cascadeDeleteDestination) {
            deleteTableName = acRelationship.destinationTable;
            deleteColumnName = acRelationship.destinationColumn;
            deleteColumnValue = row[acRelationship.sourceColumn];
          }
          if (acRelationship.destinationTable === this.tableName && acRelationship.cascadeDeleteSource) {
            deleteTableName = acRelationship.sourceTable;
            deleteColumnName = acRelationship.sourceColumn;
            deleteColumnValue = row[acRelationship.destinationColumn];
          }

          this.logger.log(`Performing cascade delete with related table ${deleteTableName} and column ${deleteColumnName} with value ${deleteColumnValue}`);
          if (deleteTableName && deleteColumnName) {
            if (Autocode.validPrimaryKey({value:deleteColumnValue})) {
              this.logger.log(`Deleting related rows for primary key value : ${deleteColumnValue}`);
              const deleteCondition = `${deleteColumnName} = :deleteColumnValue`;
              const deleteAcTable = new AcSqlDbTable({ tableName: deleteTableName, dataDictionaryName: this.dataDictionaryName });
              const deleteResult = await deleteAcTable.deleteRows({
                condition: deleteCondition,
                parameters: { ":deleteColumnValue": deleteColumnValue }
              });
              if (deleteResult.isSuccess()) {
                this.logger.log(`Cascade delete successful for ${deleteTableName}`);
              } else {
                return result.setFromResult({ result: deleteResult, message: `Error in cascade delete: ${deleteResult.message}`, logger:this.logger });
              }
            } else {
              this.logger.log("No value for cascade delete records");
            }
          } else {
            this.logger.log("No table & column for cascade delete records");
          }
        }
      }

      result.setSuccess();
    } catch (ex: any) {
      result.setException({ exception: ex, stackTrace: ex.stack, logger: this.logger, logException: true });
    }
    return result;
  }

  async checkAndSetAutoNumberValues({ row }: { row: Record<string, any> }): Promise<AcResult> {
    const result = new AcResult();
    try {
      const checkColumns: string[] = [];
      const autoNumberColumns: Record<string, Record<string, any>> = {};

      for (const tableColumn of this.acDDTable.tableColumns) {
        let setAutoNumber = true;
        if (tableColumn.isAutoNumber()) {
          if (row.hasOwnProperty(tableColumn.columnName) && row[tableColumn.columnName] !== null && row[tableColumn.columnName].toString() !== "") {
            setAutoNumber = false;
          }
          if (setAutoNumber) {
            autoNumberColumns[tableColumn.columnName] = {
              prefix: tableColumn.getAutoNumberPrefix(),
              length: tableColumn.getAutoNumberLength(),
              prefix_length: tableColumn.getAutoNumberPrefixLength()
            };
          }
        }
        if (tableColumn.checkInAutoNumber() || tableColumn.checkInModify()) {
          checkColumns.push(tableColumn.columnName);
        }
      }

      if (Object.keys(autoNumberColumns).length > 0) {
        const selectColumnsList = Object.keys(autoNumberColumns);
        let checkCondition = "";
        const checkConditionValues: Record<string, any> = {};

        if (checkColumns.length > 0) {
          for (const checkColumn of checkColumns) {
            checkCondition += ` AND ${checkColumn} = @checkColumn${checkColumn}`;
            if (row.hasOwnProperty(checkColumn)) {
              checkConditionValues[`@checkColumn${checkColumn}`] = row[checkColumn];
            }
          }
        }

        const getRowsStatements: string[] = [];
        for (const name of selectColumnsList) {
          let columnGetRows = "";
          if (this.databaseType === AcEnumSqlDatabaseType.MYSQL) {
            const meta = autoNumberColumns[name];
            columnGetRows =
              `SELECT CONCAT('{"${name}':',IF(MAX(CAST(SUBSTRING(${name}, ${meta["prefix_length"]} + 1) AS UNSIGNED)) IS NULL,0,MAX(CAST(SUBSTRING(${name}, ${meta["prefix_length"]} + 1) AS UNSIGNED))),'}') AS max_json FROM ${this.tableName} WHERE ${name} LIKE '${meta["prefix"]}%' ${checkCondition}`;
          }
          if (columnGetRows) {
            getRowsStatements.push(columnGetRows);
          }
        }

        if (getRowsStatements.length > 0) {
          const getRows = getRowsStatements.join(" UNION ");
          const selectResponse = await this.dao!.getRows({ statement: getRows, parameters: checkConditionValues });

          if (selectResponse.isSuccess()) {
            const rows = selectResponse.rows;
            for (const rowData of rows) {
              const maxJson = JSON.parse(rowData["max_json"]);
              const name = Object.keys(maxJson)[0];
              let lastRecordId = maxJson[name] ?? 0;
              lastRecordId++;
              const meta = autoNumberColumns[name];
              const autoNumberValue = meta["prefix"] + this.updateValueLengthWithChars({ value: lastRecordId.toString(), char: "0", length: meta["length"] });
              row[name] = autoNumberValue;
            }
          } else {
            return result.setFromResult({ result: selectResponse });
          }
        }
      }

      result.setSuccess({ value: row });
    } catch (ex: any) {
      result.setException({ exception: ex, stackTrace: ex.stack, logger: this.logger, logException: true });
    }
    return result;
  }

  async checkUniqueValues({ row }: { row: Record<string, any> }): Promise<AcResult> {
    const result = new AcResult();
    try {
      const parameters: Record<string, any> = {};
      const conditions: string[] = [];
      const modifyConditions: string[] = [];
      const uniqueConditions: string[] = [];
      const uniqueColumns: string[] = [];
      const primaryKeyColumnName = this.acDDTable.getPrimaryKeyColumnName();

      if (primaryKeyColumnName) {
        if (row.hasOwnProperty(primaryKeyColumnName) && Autocode.validPrimaryKey({value:row[primaryKeyColumnName]})) {
          conditions.push(`${primaryKeyColumnName} != @primaryKeyValue`);
          parameters["@primaryKeyValue"] = row[primaryKeyColumnName];
        }
      }

      for (const tableColumn of this.acDDTable.tableColumns) {
        const value = row[tableColumn.columnName];
        if (tableColumn.checkInModify()) {
          modifyConditions.push(`${tableColumn.columnName} = @modify_${tableColumn.columnName}`);
          parameters[`@modify_${tableColumn.columnName}`] = value;
        }
        if (tableColumn.isUniqueKey()) {
          uniqueConditions.push(`${tableColumn.columnName} = @unique_${tableColumn.columnName}`);
          parameters[`@unique_${tableColumn.columnName}`] = value;
          uniqueColumns.push(tableColumn.columnName);
        }
      }

      if (uniqueConditions.length > 0) {
        if (modifyConditions.length > 0) {
          conditions.push(...modifyConditions);
        }
        conditions.push(`(${uniqueConditions.join(" OR ")})`);
        if (conditions.length > 0) {
          this.logger.log("Searching for Unique Records getting Repeated");
          const selectResponse = await this.getRows({
            condition: conditions.join(" AND "),
            parameters:parameters,
            mode: AcEnumDDSelectMode.COUNT
          });
          if (selectResponse.isSuccess()) {
            const rowsCount = selectResponse.rowsCount();
            if (rowsCount > 0) {
              result.setFailure({ value: { unique_columns: uniqueColumns }, message: "Unique key violated" });
            } else {
              result.setSuccess();
            }
          } else {
            result.setFromResult({ result: selectResponse });
          }
        } else {
          result.setSuccess();
        }
      } else {
        this.logger.log("No unique conditions found");
        result.setSuccess();
      }
    } catch (ex: any) {
      result.setException({ exception: ex, stackTrace: ex.stack, logger:this.logger, logException: true });
    }
    return result;
  }

  async deleteRows({ condition = '', primaryKeyValue = '', parameters = {}, executeAfterEvent = true, executeBeforeEvent = true }: { condition?: string, primaryKeyValue?: string, parameters?: Record<string, any>, executeAfterEvent?: boolean, executeBeforeEvent?: boolean }): Promise<AcSqlDaoResult> {
    this.logger.log(`Deleting row with condition : ${condition} & primaryKeyValue ${primaryKeyValue}`);
    let result = new AcSqlDaoResult({ operation: AcEnumDDRowOperation.DELETE });

    try {
      let continueOperation = true;
      const primaryKeyColumnName = this.acDDTable.getPrimaryKeyColumnName();

      if (condition === '') {
        if (primaryKeyValue && primaryKeyColumnName) {
          condition = `${primaryKeyColumnName} = :primaryKeyValue`;
          parameters = { ':primaryKeyValue': primaryKeyValue };
        } else {
          continueOperation = false;
          result.setFailure({ message: 'Primary key column or column value is missing' });
        }
      } else {
        condition = `${primaryKeyColumnName} IN (SELECT ${primaryKeyColumnName} FROM ${this.tableName} WHERE ${condition})`;
      }

      if (continueOperation && executeBeforeEvent) {
        const rowEvent = new AcSqlDbRowEvent({ tableName: this.tableName, dataDictionaryName: this.dataDictionaryName });
        rowEvent.condition = condition;
        rowEvent.parameters = parameters;
        rowEvent.eventType = AcEnumDDRowEvent.BEFORE_DELETE;

        const eventResult = await rowEvent.execute();
        if (eventResult.isSuccess()) {
          condition = rowEvent.condition;
          parameters = rowEvent.parameters;
        } else {
          continueOperation = false;
          result.setFromResult({ result: eventResult, message: "Aborted from before delete row events" });
        }
      }

      if (continueOperation) {
        this.logger.log([
          '',
          '',
          `Performing delete operation on table ${this.tableName} with condition : ${condition} and parameters : `,
          parameters,
          '',
          ''
        ]);

        const getResult = await this.getRows({ condition, parameters });
        if (getResult.isSuccess()) {
          result.rows = getResult.rows;

          const setNullResult = await this.setValuesNullBeforeDelete({ condition, parameters });
          if (setNullResult.isFailure()) {
            this.logger.error(['Error setting null before delete', setNullResult]);
            continueOperation = false;
            result.setFromResult({ result: setNullResult });
          }

          if (continueOperation) {
            const cascadeDeleteResult = await this.cascadeDeleteRows({ rows: result.rows });
            if (cascadeDeleteResult.isFailure()) {
              this.logger.error(['Error cascade deleting row', cascadeDeleteResult]);
              continueOperation = false;
              result.setFromResult({ result: setNullResult, logger: this.logger });
            } else {
              this.logger.log(['Cascade delete result', cascadeDeleteResult]);
            }
          }

          if (continueOperation) {
            const deleteResult = await this.dao!.deleteRows({ tableName: this.tableName, condition, parameters });
            if (deleteResult.isSuccess()) {
              result.affectedRowsCount = deleteResult.affectedRowsCount;
              result.setSuccess({ message: `${deleteResult.affectedRowsCount} row(s) deleted successfully` });
            } else {
              result.setFromResult({ result: deleteResult });
              if (deleteResult.message.includes('foreign key')) {
                result.message = 'Cannot delete row! Foreign key constraint is preventing from deleting rows!';
              }
            }
          }
        } else {
          result.setFromResult({ result: getResult, logger: this.logger });
        }
      }

      if (continueOperation && executeAfterEvent) {
        const rowEvent = new AcSqlDbRowEvent({ tableName: this.tableName, dataDictionaryName: this.dataDictionaryName });
        rowEvent.eventType = AcEnumDDRowEvent.AFTER_DELETE;
        rowEvent.condition = condition;
        rowEvent.parameters = parameters;
        rowEvent.result = result;

        const eventResult = await rowEvent.execute();
        if (eventResult.isSuccess()) {
          result = rowEvent.result;
        } else {
          result.setFromResult({ result: eventResult });
        }
      }
    } catch (ex: any) {
      result.setException({ exception: ex, stackTrace: ex.stack, logger: this.logger, logException: true });
    }

    return result;
  }

  async formatValues({
    row,
    insertMode = false
  }: {
    row: Record<string, any>;
    insertMode?: boolean;
  }): Promise<AcResult> {
    const result = new AcResult();
    let continueOperation = true;

    const rowEvent = new AcSqlDbRowEvent({ tableName:this.tableName, dataDictionaryName:this.dataDictionaryName });
    rowEvent.row = row;
    rowEvent.eventType = AcEnumDDRowEvent.BEFORE_FORMAT;

    const eventResult = await rowEvent.execute();
    if (eventResult.isSuccess()) {
      row = rowEvent.row;
    } else {
      result.setFromResult({ result: eventResult });
      continueOperation = false;
    }

    if (continueOperation) {
      for (const column of this.acDDTable.tableColumns) {
        if (row.hasOwnProperty(column.columnName) || insertMode) {
          let setColumnValue = row.hasOwnProperty(column.columnName);
          const formats = column.getColumnFormats();
          const type:any = column.columnType;
          let value = row[column.columnName] ?? "";

          if (value === "" && column.getDefaultValue() !== null && insertMode) {
            value = column.getDefaultValue();
            setColumnValue = true;
          }

          if (setColumnValue) {
            if ([AcEnumDDColumnType.DATE, AcEnumDDColumnType.DATETIME, AcEnumDDColumnType.STRING].includes(type)) {
              value = String(value).trim();

              if (type === AcEnumDDColumnType.STRING) {
                if (formats.includes(AcEnumDDColumnFormat.LOWERCASE)) {
                  value = value.toLowerCase();
                }
                if (formats.includes(AcEnumDDColumnFormat.UPPERCASE)) {
                  value = value.toUpperCase();
                }
                if (formats.includes(AcEnumDDColumnFormat.ENCRYPT)) {
                  value = AcEncryption.encrypt({ plainText: value });
                }
              } else if ([AcEnumDDColumnType.DATETIME, AcEnumDDColumnType.DATE].includes(type) && value !== "") {
                try {
                  const date = new Date(value);
                  const format = type === AcEnumDDColumnType.DATETIME ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd';
                  value = date.format(format); // You must implement `formatDate()`
                } catch (ex) {
                  this.logger.warn(`Error while setting dateTimeValue for ${column.columnName} in table ${this.tableName} with value: ${value}`);
                }
              }
            } else if ([AcEnumDDColumnType.JSON, AcEnumDDColumnType.MEDIA_JSON].includes(type)) {
              value = typeof value === 'string' ? value : JSON.stringify(value);
            } else if (type === AcEnumDDColumnType.PASSWORD) {
              value = AcEncryption.encrypt({ plainText: value });
            }

            row[column.columnName] = value;
          }
        }
      }
    }

    if (continueOperation) {
      const rowEvent = new AcSqlDbRowEvent({ tableName:this.tableName, dataDictionaryName:this.dataDictionaryName });
      rowEvent.row = row;
      rowEvent.eventType = AcEnumDDRowEvent.AFTER_FORMAT;

      const eventResult = await rowEvent.execute();
      if (eventResult.isSuccess()) {
        row = rowEvent.row;
      } else {
        result.setFromResult({ result: eventResult });
        continueOperation = false;
      }
    }

    if (continueOperation) {
      result.setSuccess({ value: row });
    }

    return result;
  }

  getColumnFormats({ getPasswordColumns = false }: { getPasswordColumns?: boolean } = {}): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    for (const column of this.acDDTable.tableColumns) {
      const formats: string[] = [];

      if ([AcEnumDDColumnType.JSON, AcEnumDDColumnType.MEDIA_JSON].includes(column.columnType as any)) {
        formats.push(AcEnumDDColumnFormat.JSON);
      } else if (column.columnType === AcEnumDDColumnType.DATE) {
        formats.push(AcEnumDDColumnFormat.DATE);
      } else if (column.columnType === AcEnumDDColumnType.PASSWORD && !getPasswordColumns) {
        formats.push(AcEnumDDColumnFormat.HIDE_COLUMN);
      } else if (column.columnType === AcEnumDDColumnType.ENCRYPTED) {
        formats.push(AcEnumDDColumnFormat.ENCRYPT);
      }

      if (formats.length > 0) {
        result[column.columnName] = formats;
      }
    }

    return result;
  }

  getSelectStatement(includeColumns: string[] = [], excludeColumns: string[] = []): string {
    let result = `SELECT * FROM ${this.tableName}`;
    let columns: string[] = [];

    if (includeColumns.length === 0 && excludeColumns.length === 0) {
      columns = ['*'];
    } else {
      if (includeColumns.length > 0) {
        columns = includeColumns;
      } else if (excludeColumns.length > 0) {
        columns = excludeColumns; // same logic as provided
      }
    }

    result = `SELECT ${columns.join(', ')} FROM ${this.tableName}`;
    return result;
  }

  async getDistinctColumnValues({
    columnName,
    condition = '',
    orderBy = '',
    mode = AcEnumDDSelectMode.LIST,
    pageNumber = -1,
    pageSize = -1,
    parameters = {}
  }: {
    columnName: string,
    condition?: string,
    orderBy?: string,
    mode?: AcEnumDDSelectMode,
    pageNumber?: number,
    pageSize?: number,
    parameters?: Record<string, any>
  }): Promise<AcSqlDaoResult> {
    let result = new AcSqlDaoResult({ operation: AcEnumDDRowOperation.SELECT });

    try {
      const actualOrderBy = orderBy !== '' ? orderBy : columnName;
      let selectStatement = this.getSelectStatement();
      selectStatement = `SELECT DISTINCT ${columnName} FROM (${selectStatement}) AS recordsList`;

      if (condition !== '') {
        condition += ` AND ${columnName} IS NOT NULL AND ${columnName} != ''`;
      } else {
        condition = `${columnName} IS NOT NULL AND ${columnName} != ''`;
      }

      this.logger.log(['', '', 'Executing getDistinctColumnValues select statement']);

      const sqlStatement = AcDDSelectStatement.generateSqlStatement({
        selectStatement,
        condition,
        orderBy: actualOrderBy,
        pageNumber,
        pageSize,
        databaseType: this.databaseType
      });

      result = await this.dao!.getRows({
        statement: sqlStatement,
        parameters,
        mode
      });

    } catch (ex) {
      const error = ex as Error;
      result.setException({
        exception: error,
        stackTrace: error.stack,
        logger: this.logger,
        logException: true
      });
    }

    return result;
  }

  getColumnDefinitionForStatement(columnName: string): string {
    let result = '';
    const acDDTableColumn = this.acDDTable.getColumn({columnName})!;
    let columnType = acDDTableColumn.columnType;
    const defaultValue = acDDTableColumn.getDefaultValue();
    let size = acDDTableColumn.getSize();

    let isAutoIncrementSet = false;
    let isPrimaryKeySet = false;

    if (this.databaseType === AcEnumSqlDatabaseType.MYSQL) {
      columnType = 'TEXT';

      switch (acDDTableColumn.columnType) {
        case AcEnumDDColumnType.AUTO_INCREMENT:
          columnType = 'INT AUTO_INCREMENT PRIMARY KEY';
          isAutoIncrementSet = true;
          isPrimaryKeySet = true;
          break;
        case AcEnumDDColumnType.BLOB:
          if (size > 0) {
            if (size <= 255) columnType = 'TINYBLOB';
            else if (size <= 65535) columnType = 'BLOB';
            else if (size <= 16777215) columnType = 'MEDIUMBLOB';
          } else {
            columnType = 'LONGBLOB';
          }
          break;
        case AcEnumDDColumnType.DATE:
          columnType = 'DATE';
          break;
        case AcEnumDDColumnType.DATETIME:
          columnType = 'DATETIME';
          break;
        case AcEnumDDColumnType.DOUBLE:
          columnType = 'DOUBLE';
          break;
        case AcEnumDDColumnType.UUID:
          columnType = 'CHAR(36)';
          break;
        case AcEnumDDColumnType.INTEGER:
          if (size > 0) {
            if (size <= 255) columnType = 'TINYINT';
            else if (size <= 65535) columnType = 'SMALLINT';
            else if (size <= 16777215) columnType = 'MEDIUMINT';
          } else {
            columnType = 'INT';
          }
          break;
        case AcEnumDDColumnType.JSON:
          columnType = 'LONGTEXT';
          break;
        case AcEnumDDColumnType.STRING:
          if (size === 0) size = 255;
          columnType = `VARCHAR(${size})`;
          break;
        case AcEnumDDColumnType.TEXT:
          if (size > 0) {
            if (size <= 255) columnType = 'TINYTEXT';
            else if (size <= 65535) columnType = 'TEXT';
            else if (size <= 16777215) columnType = 'MEDIUMTEXT';
          } else {
            columnType = 'LONGTEXT';
          }
          break;
        case AcEnumDDColumnType.TIME:
          columnType = 'TIME';
          break;
        case AcEnumDDColumnType.TIMESTAMP:
          columnType = 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP';
          break;
      }

      result = `${columnName} ${columnType}`;
      if (acDDTableColumn.isAutoIncrement() && !isAutoIncrementSet) result += ' AUTO_INCREMENT';
      if (acDDTableColumn.isPrimaryKey() && !isPrimaryKeySet) result += ' PRIMARY KEY';
      if (acDDTableColumn.isUniqueKey()) result += ' UNIQUE';
      if (acDDTableColumn.isNotNull()) result += ' NOT NULL';
      // if (defaultValue != null) result += ` DEFAULT ${defaultValue}`;
    }

    else if (this.databaseType === AcEnumSqlDatabaseType.SQLITE) {
      switch (acDDTableColumn.columnType) {
        case AcEnumDDColumnType.AUTO_INCREMENT:
          columnType = 'INTEGER PRIMARY KEY AUTOINCREMENT';
          isAutoIncrementSet = true;
          isPrimaryKeySet = true;
          break;
        case AcEnumDDColumnType.DOUBLE:
          columnType = 'REAL';
          break;
        case AcEnumDDColumnType.BLOB:
          columnType = 'BLOB';
          break;
        case AcEnumDDColumnType.INTEGER:
          columnType = 'INTEGER';
          break;
        default:
          columnType = 'TEXT';
          break;
      }

      result = `${columnName} ${columnType}`;
      if (acDDTableColumn.isAutoIncrement() && !isAutoIncrementSet) result += ' AUTOINCREMENT';
      if (acDDTableColumn.isPrimaryKey() && !isPrimaryKeySet) result += ' PRIMARY KEY';
      if (acDDTableColumn.isUniqueKey()) result += ' UNIQUE';
      if (acDDTableColumn.isNotNull()) result += ' NOT NULL';
      // if (defaultValue != null) result += ` DEFAULT ${defaultValue}`;
    }

    return result;
  }

  async getRows({
    selectStatement = "",
    condition = "",
    orderBy = "",
    mode = AcEnumDDSelectMode.LIST,
    pageNumber = -1,
    pageSize = -1,
    parameters = {},
  }: {
    selectStatement?: string;
    condition?: string;
    orderBy?: string;
    mode?: AcEnumDDSelectMode;
    pageNumber?: number;
    pageSize?: number;
    parameters?: { [key: string]: any };
  }): Promise<AcSqlDaoResult> {
    let result = new AcSqlDaoResult({ operation: AcEnumDDRowOperation.SELECT });
    try {
      const actualSelectStatement = selectStatement !== "" ? selectStatement : this.getSelectStatement();
      const sqlStatement = AcDDSelectStatement.generateSqlStatement({
        selectStatement: actualSelectStatement,
        condition,
        orderBy,
        pageNumber,
        pageSize,
        databaseType: this.databaseType,
      });
      result = await this.dao!.getRows({
        statement: sqlStatement,
        parameters,
        mode,
        columnFormats: this.getColumnFormats(),
      });
    } catch (ex: any) {
      result.setException({
        exception: ex,
        stackTrace: ex.stack,
        logger: this.logger,
        logException: true,
      });
    }
    return result;
  }

  async getRowsFromAcDDStatement({
    acDDSelectStatement,
  }: {
    acDDSelectStatement: AcDDSelectStatement;
  }): Promise<AcSqlDaoResult> {
    let result = new AcSqlDaoResult({ operation: AcEnumDDRowOperation.SELECT });
    try {
      const sqlStatement = acDDSelectStatement.getSqlStatement();
      const sqlParameters = acDDSelectStatement.parameters;

      result = await this.dao!.getRows({
        statement: sqlStatement,
        parameters: sqlParameters,
        columnFormats: this.getColumnFormats(),
      });

      if (result.rows.length > 0) {
        const countSqlStatement = acDDSelectStatement.getSqlStatement({skipLimit:true}); // skipLimit = true
        const countResult = await this.dao!.getRows({
          statement: countSqlStatement,
          parameters: sqlParameters,
        });
        if (countResult.isSuccess()) {
          result.totalRows = countResult.totalRows;
        }
      } else {
        result.totalRows = 0;
      }
    } catch (ex: any) {
      result.setException({
        exception: ex,
        stackTrace: ex.stack,
        logger: this.logger,
        logException: true,
      });
    }
    return result;
  }

  async insertRow({
    row,
    validateResult,
    executeAfterEvent = true,
    executeBeforeEvent = true,
  }: {
    row: Record<string, any>,
    validateResult?: AcResult,
    executeAfterEvent?: boolean,
    executeBeforeEvent?: boolean,
  }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult({ operation: AcEnumDDRowOperation.INSERT });
    try {
      this.logger.log(["Inserting row with data : ", row]);
      let continueOperation = true;
      validateResult = validateResult ?? await this.validateValues({ row, isInsert: true });
      this.logger.log(["Validation result : ", validateResult]);
      if (validateResult.isSuccess()) {
        for (const column of this.acDDTable.tableColumns) {
          if (
            (column.columnType === AcEnumDDColumnType.UUID ||
              (column.columnType === AcEnumDDColumnType.STRING && column.isPrimaryKey())) &&
            !(column.columnName in row)
          ) {
            row[column.columnName] = Autocode.uuid();
          }
        }

        const primaryKeyColumn = this.acDDTable.getPrimaryKeyColumnName();
        let primaryKeyValue = row[primaryKeyColumn];

        if (Object.keys(row).length > 0) {
          if (continueOperation && executeBeforeEvent) {
            this.logger.log("Executing before insert event");
            const rowEvent = new AcSqlDbRowEvent({
              tableName: this.tableName,
              dataDictionaryName: this.dataDictionaryName
            });
            rowEvent.row = row;
            rowEvent.eventType = AcEnumDDRowEvent.BEFORE_INSERT;
            const eventResult = await rowEvent.execute();
            this.logger.log(["Before insert result", eventResult]);
            if (eventResult.isSuccess()) {
              row = rowEvent.row;
            } else {
              continueOperation = false;
              result.setFromResult({
                result: eventResult,
                message: "Aborted from before insert row events"
              });
            }
          }

          if (continueOperation) {
            this.logger.log(["Inserting data : ", row]);
            const insertResult = await this.dao!.insertRow({ tableName: this.tableName, row });
            if (insertResult.isSuccess()) {
              this.logger.log(insertResult.toString());
              result.setSuccess({ message: "Row inserted successfully" });
              result.primaryKeyColumn = primaryKeyColumn;
              result.primaryKeyValue = primaryKeyValue;
              if (primaryKeyColumn.length > 0) {
                if (!Autocode.validPrimaryKey({value:primaryKeyValue}) && Autocode.validPrimaryKey({value:insertResult.lastInsertedId})) {
                  primaryKeyValue = insertResult.lastInsertedId;
                }
              }
              result.lastInsertedId = primaryKeyValue;

              this.logger.log("Getting inserted row from database");
              const condition = `${primaryKeyColumn} = :primaryKeyValue`;
              const parameters = { ":primaryKeyValue": primaryKeyValue };
              this.logger.log(["Select condition", condition, parameters]);

              const selectResult = await this.getRows({ condition, parameters });
              if (selectResult.isSuccess()) {
                if (selectResult.hasRows()) {
                  result.rows = selectResult.rows;
                }
              } else {
                result.message = `Error getting inserted row : ${selectResult.message}`;
              }

              if (continueOperation && executeAfterEvent) {
                const rowEvent = new AcSqlDbRowEvent({
                  tableName: this.tableName,
                  dataDictionaryName: this.dataDictionaryName
                });
                rowEvent.eventType = AcEnumDDRowEvent.AFTER_INSERT;
                rowEvent.result = result;
                const eventResult = await rowEvent.execute();
                if (!eventResult.isSuccess()) {
                  result.setFromResult({ result: eventResult });
                }
              }
            } else {
              result.setFromResult({ result: insertResult });
            }
          }
        } else {
          result.message = 'No values for new row';
        }
      } else {
        result.setFromResult({ result: validateResult });
      }
    } catch (ex: any) {
      result.setException({
        exception: ex,
        stackTrace: ex.stack,
        logger: this.logger,
        logException: true
      });
    }
    return result;
  }

  async insertRows({
    rows,
    executeAfterEvent = true,
    executeBeforeEvent = true,
  }: {
    rows: Record<string, any>[],
    executeAfterEvent?: boolean,
    executeBeforeEvent?: boolean,
  }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult({ operation: AcEnumDDRowOperation.INSERT });
    try {
      this.logger.log(["Inserting rows : ", rows]);
      let continueOperation = true;
      const rowsToInsert: Record<string, any>[] = [];
      const primaryKeyValues: any[] = [];
      const primaryKeyColumn = this.acDDTable.getPrimaryKeyColumnName();

      for (let row of rows) {
        if (continueOperation) {
          const validateResult = await this.validateValues({ row, isInsert: true });
          if (validateResult.isSuccess()) {
            for (const column of this.acDDTable.tableColumns) {
              if (
                (column.columnType === AcEnumDDColumnType.UUID ||
                  (column.columnType === AcEnumDDColumnType.STRING && column.isPrimaryKey())) &&
                !(column.columnName in row)
              ) {
                row[column.columnName] = Autocode.uuid();
              }
            }
            if (primaryKeyColumn in row) {
              primaryKeyValues.push(row[primaryKeyColumn]);
            }

            if (Object.keys(row).length > 0) {
              if (continueOperation && executeBeforeEvent) {
                this.logger.log("Executing before insert event");
                const rowEvent = new AcSqlDbRowEvent({
                  tableName: this.tableName,
                  dataDictionaryName: this.dataDictionaryName
                });
                rowEvent.row = row;
                rowEvent.eventType = AcEnumDDRowEvent.BEFORE_INSERT;
                const eventResult = await rowEvent.execute();
                this.logger.log(["Before insert result", eventResult]);
                if (eventResult.isSuccess()) {
                  row = rowEvent.row;
                } else {
                  continueOperation = false;
                  result.setFromResult({
                    result: eventResult,
                    message: "Aborted from before insert row events"
                  });
                }
              }
              if (continueOperation) {
                rowsToInsert.push(row);
              }
            } else {
              result.message = 'No values for new row';
            }
          } else {
            result.setFromResult({ result: validateResult });
          }
        }
      }

      if (continueOperation) {
        this.logger.log(`Inserting ${rows.length} rows`);
        const insertResult = await this.dao!.insertRows({
          tableName: this.tableName,
          rows: rowsToInsert,
        });
        if (insertResult.isSuccess()) {
          this.logger.log(insertResult.toString());
          result.lastInsertedIds = primaryKeyValues;

          this.logger.log("Getting inserted rows from database");
          const condition = `${primaryKeyColumn} IN (:primaryKeyValue)`;
          const parameters = { ":primaryKeyValue": primaryKeyValues };
          this.logger.log(["Select condition", condition, parameters]);

          const selectResult = await this.getRows({ condition, parameters });
          if (selectResult.isSuccess()) {
            if (selectResult.hasRows()) {
              result.rows = selectResult.rows;
            }
          } else {
            result.message = `Error getting inserted rows : ${selectResult.message}`;
          }

          if (continueOperation && executeAfterEvent) {
            for (const row of result.rows) {
              const rowEvent = new AcSqlDbRowEvent({
                tableName: this.tableName,
                dataDictionaryName: this.dataDictionaryName
              });
              rowEvent.eventType = AcEnumDDRowEvent.AFTER_INSERT;
              rowEvent.result = result;
              rowEvent.row = row;
              const eventResult = await rowEvent.execute();
              if (!eventResult.isSuccess()) {
                continueOperation = false;
                result.setFromResult({ result: eventResult });
                break;
              }
            }
          }
        } else {
          continueOperation = false;
          result.setFromResult({ result: insertResult });
        }
      }

      if (continueOperation) {
        result.setSuccess({ message: "Rows inserted successfully" });
      }
    } catch (ex: any) {
      result.setException({
        exception: ex,
        stackTrace: ex.stack,
        logger: this.logger,
        logException: true
      });
    }

    return result;
  }

  async saveRow({
    row,
    executeAfterEvent = true,
    executeBeforeEvent = true,
  }: {
    row: Record<string, any>,
    executeAfterEvent?: boolean,
    executeBeforeEvent?: boolean
  }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult({operation:AcEnumDDRowOperation.UNKNOWN});
    try {
      let continueOperation = true;
      let operation:AcEnumDDRowOperation = AcEnumDDRowOperation.UNKNOWN;
      const primaryKeyColumn = this.acDDTable.getPrimaryKeyColumnName();
      let primaryKeyValue = row[primaryKeyColumn];
      let condition = "";
      let conditionParameters: Record<string, any> = {};

      if (Autocode.validPrimaryKey({value:primaryKeyValue})) {
        this.logger.log("Found primary key value so primary key value will be used");
        condition = `${primaryKeyColumn} = :primaryKeyValue`;
        conditionParameters[":primaryKeyValue"] = primaryKeyValue;
      } else {
        const checkInSaveColumns: Record<string, any> = {};
        for (const column of this.acDDTable.tableColumns) {
          if (column.checkInSave()) {
            checkInSaveColumns[column.columnName] = row[column.columnName];
          }
        }
        this.logger.log("Not found primary key value so checking for columns while saving");
        if (Object.keys(checkInSaveColumns).length > 0) {
          const checkConditions: string[] = [];
          conditionParameters = {};
          for (const key in checkInSaveColumns) {
            checkConditions.push(`${key} = :${key}`);
            conditionParameters[`:${key}`] = checkInSaveColumns[key];
          }
          condition = checkConditions.join(" AND ");
        } else {
          continueOperation = false;
          result.setFailure({value:"No values to check in save", logger:this.logger});
        }
      }

      if (condition) {
        const getResult = await this.getRows({ condition, parameters: conditionParameters });
        if (getResult.isSuccess()) {
          if (getResult.hasRows()) {
            const existingRecord = getResult.rows[0];
            if (primaryKeyColumn in existingRecord) {
              primaryKeyValue = existingRecord[primaryKeyColumn];
              row[primaryKeyColumn] = primaryKeyValue;
              operation = AcEnumDDRowOperation.UPDATE;
            } else {
              continueOperation = false;
              result.message = "Row does not have primary key value";
            }
          } else {
            operation = AcEnumDDRowOperation.INSERT;
          }
        } else {
          continueOperation = false;
          result.setFromResult({ result: getResult });
        }
      } else {
        operation = AcEnumDDRowOperation.INSERT;
      }

      if (![AcEnumDDRowOperation.INSERT, AcEnumDDRowOperation.UPDATE].includes(operation as any)) {
        result.message = "Invalid Operation";
        continueOperation = false;
      }

      if (continueOperation) {
        this.logger.log(`Executing operation ${operation} in save.`);
        if (executeBeforeEvent) {
          const rowEvent = new AcSqlDbRowEvent({tableName:this.tableName,dataDictionaryName:this.dataDictionaryName});
          rowEvent.row = row;
          rowEvent.eventType = AcEnumDDRowEvent.BEFORE_SAVE;
          const eventResult = await rowEvent.execute();
          if (eventResult.isSuccess()) {
            row = rowEvent.row;
          } else {
            continueOperation = false;
            result.setFromResult({
              result: eventResult,
              message: "Aborted from before update row events",
              logger: this.logger,
            });
          }
        }

        if (operation === AcEnumDDRowOperation.INSERT) {
          result.setFromResult({ result: await this.insertRow({ row }) });
        } else if (operation === AcEnumDDRowOperation.UPDATE) {
          result.setFromResult({ result: await this.updateRow({ row }) });
        }

        if (continueOperation && executeAfterEvent) {
          const rowEvent = new AcSqlDbRowEvent({tableName:this.tableName, dataDictionaryName:this.dataDictionaryName});
          rowEvent.eventType = AcEnumDDRowEvent.AFTER_SAVE;
          rowEvent.result = result;
          const eventResult = await rowEvent.execute();
          if (!eventResult.isSuccess()) {
            result.setFromResult({ result: eventResult });
          }
        }
      }
    } catch (ex) {
      result.setException({ exception: ex, logger: this.logger, logException: true });
    }
    return result;
  }

  async saveRows({
    rows,
    executeAfterEvent = true,
    executeBeforeEvent = true,
  }: {
    rows: Record<string, any>[],
    executeAfterEvent?: boolean,
    executeBeforeEvent?: boolean
  }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult({operation:AcEnumDDRowOperation.UNKNOWN});
    try {
      let continueOperation = true;
      const primaryKeyColumn = this.acDDTable.getPrimaryKeyColumnName();
      const rowsToInsert: Record<string, any>[] = [];
      const rowsToUpdate: Record<string, any>[] = [];

      for (const row of rows) {
        if (!continueOperation) break;
        let primaryKeyValue = row[primaryKeyColumn];
        let condition = "";
        let conditionParameters: Record<string, any> = {};

        if (Autocode.validPrimaryKey({value:primaryKeyValue})) {
          this.logger.log("Found primary key value so primary key value will be used");
          condition = `${primaryKeyColumn} = :primaryKeyValue`;
          conditionParameters[":primaryKeyValue"] = primaryKeyValue;
        } else {
          const checkInSaveColumns: Record<string, any> = {};
          for (const column of this.acDDTable.tableColumns) {
            if (column.checkInSave()) {
              checkInSaveColumns[column.columnName] = row[column.columnName];
            }
          }
          this.logger.log("Not found primary key value so checking for columns while saving");
          if (Object.keys(checkInSaveColumns).length > 0) {
            const checkConditions: string[] = [];
            conditionParameters = {};
            for (const key in checkInSaveColumns) {
              checkConditions.push(`${key} = :${key}`);
              conditionParameters[`:${key}`] = checkInSaveColumns[key];
            }
            condition = checkConditions.join(" AND ");
          } else {
            continueOperation = false;
            result.setFailure({value:"No values to check in save", logger:this.logger});
          }
        }

        if (condition) {
          const getResult = await this.getRows({ condition, parameters: conditionParameters });
          if (getResult.isSuccess()) {
            if (getResult.hasRows()) {
              const existingRecord = getResult.rows[0];
              if (primaryKeyColumn in existingRecord) {
                primaryKeyValue = existingRecord[primaryKeyColumn];
                row[primaryKeyColumn] = primaryKeyValue;
                rowsToUpdate.push(row);
              } else {
                continueOperation = false;
                result.message = "Row does not have primary key value";
              }
            } else {
              rowsToInsert.push(row);
            }
          } else {
            continueOperation = false;
            result.setFromResult({ result: getResult });
          }
        } else {
          rowsToInsert.push(row);
        }
      }

      if (continueOperation && executeBeforeEvent) {
        for (const row of [...rowsToInsert, ...rowsToUpdate]) {
          const rowEvent = new AcSqlDbRowEvent({tableName:this.tableName,dataDictionaryName: this.dataDictionaryName});
          rowEvent.row = row;
          rowEvent.eventType = AcEnumDDRowEvent.BEFORE_SAVE;
          const eventResult = await rowEvent.execute();
          if (eventResult.isSuccess()) {
            Object.assign(row, rowEvent.row);
          } else {
            continueOperation = false;
            result.setFromResult({
              result: eventResult,
              message: "Aborted from before save row events",
              logger: this.logger,
            });
            break;
          }
        }
      }

      const combinedRows: Record<string, any>[] = [];
      if (continueOperation) {
        const insertResult = await this.insertRows({ rows: rowsToInsert });
        if (insertResult.isFailure()) {
          continueOperation = false;
          result.setFromResult({ result: insertResult });
        } else {
          combinedRows.push(...insertResult.rows);
        }
      }

      if (continueOperation) {
        const updateResult = await this.updateRows({ rows: rowsToUpdate });
        if (updateResult.isFailure()) {
          continueOperation = false;
          result.setFromResult({ result: updateResult });
        } else {
          combinedRows.push(...updateResult.rows);
        }
      }

      if (continueOperation) {
        result.setSuccess({message:"Rows saved successfully"});
        if (result.rows.length > 0) {
          combinedRows.push(...result.rows);
        }
        result.rows = combinedRows;
      }
    } catch (ex) {
      result.setException({ exception: ex, logger: this.logger, logException: true });
    }
    return result;
  }

  async setValuesNullBeforeDelete({
    condition,
    parameters = {},
  }: {
    condition: string;
    parameters?: { [key: string]: any };
  }): Promise<AcResult> {
    const result = new AcResult();
    try {
      let continueOperation = true;
      this.logger.log(`Checking cascade delete for table ${this.tableName}`);
      const tableRelationships = AcDataDictionary.getTableRelationships({
        tableName: this.tableName,
        dataDictionaryName: this.dataDictionaryName,
      });

      for (const acRelationship of tableRelationships) {
        if (continueOperation) {
          if (acRelationship.destinationTable === this.tableName) {
            const column = this.acDDTable.getColumn({columnName:acRelationship.destinationColumn});
            if (column && column.isSetValuesNullBeforeDelete()) {
              const setNullStatement = `UPDATE ${acRelationship.sourceTable} SET ${acRelationship.sourceColumn} = NULL WHERE ${acRelationship.sourceColumn} IN (SELECT ${acRelationship.destinationColumn} FROM ${this.tableName} WHERE ${condition})`;
              this.logger.log(["Executing set null statement", setNullStatement]);
              const setNullResult = await this.dao!.executeStatement({
                statement: setNullStatement,
                parameters,
              });
              if (setNullResult.isSuccess()) {
                this.logger.success(setNullResult.toJson());
              } else {
                continueOperation = false;
                result.setFromResult({ result: setNullResult });
              }
            }
          }
        }
      }

      if (continueOperation) {
        result.setSuccess();
      }
    } catch (ex: any) {
      result.setException({ exception: ex, stackTrace: ex.stack, logger: this.logger, logException: true });
    }
    return result;
  }

  async updateRow({
    row,
    condition = "",
    parameters = {},
    validateResult,
    executeAfterEvent = true,
    executeBeforeEvent = true,
  }: {
    row: { [key: string]: any };
    condition?: string;
    parameters?: { [key: string]: any };
    validateResult?: AcResult;
    executeAfterEvent?: boolean;
    executeBeforeEvent?: boolean;
  }): Promise<AcSqlDaoResult> {
    this.logger.log(["Updating row with data : ", row]);
    const result = new AcSqlDaoResult({operation:AcEnumDDRowOperation.UPDATE});
    try {
      let continueOperation = true;
      validateResult ??= await this.validateValues({ row, isInsert: false });

      if (validateResult.isSuccess() && continueOperation) {
        this.logger.log(["Validation result : ", validateResult]);
        const primaryKeyColumn = this.acDDTable.getPrimaryKeyColumnName();
        const primaryKeyValue = row[primaryKeyColumn];

        const formatResult = await this.formatValues({ row });
        if (formatResult.isSuccess()) {
          row = formatResult.value;
        } else {
          continueOperation = false;
        }
        this.logger.log(["Formatted data : ", row]);

        if (!condition && Autocode.validPrimaryKey({value:primaryKeyValue})) {
          condition = `${primaryKeyColumn} = :primaryKeyValue`;
          parameters = { ":primaryKeyValue": primaryKeyValue };
        }
        this.logger.log(["Update condition : " + condition, parameters]);

        if (Object.keys(row).length > 0) {
          if (continueOperation && executeBeforeEvent) {
            this.logger.log("Executing before update event");
            const rowEvent = new AcSqlDbRowEvent({tableName:this.tableName,dataDictionaryName: this.dataDictionaryName});
            rowEvent.row = row;
            rowEvent.eventType = AcEnumDDRowEvent.BEFORE_UPDATE;
            const eventResult = await rowEvent.execute();
            if (eventResult.isSuccess()) {
              this.logger.log(["Before event result", eventResult]);
              row = rowEvent.row!;
            } else {
              this.logger.error(["Before event result", eventResult]);
              continueOperation = false;
              result.setFromResult({ result: eventResult, message: "Aborted from before update row events" });
            }
          } else {
            this.logger.log("Skipping before update event");
          }

          if (continueOperation) {
            const updateResult = await this.dao!.updateRow({
              tableName: this.tableName,
              row,
              condition,
              parameters,
            });

            if (updateResult.isSuccess()) {
              result.setSuccess({ message: "Row updated successfully", logger: this.logger });
              result.primaryKeyColumn = primaryKeyColumn;
              result.primaryKeyValue = primaryKeyValue;

              const selectResult = await this.getRows({ condition, parameters });
              if (selectResult.isSuccess()) {
                result.rows = selectResult.rows;
              } else {
                this.logger.error([`Error getting updated row : ${selectResult.message}`, selectResult]);
                result.message = `Error getting updated row : ${selectResult.message}`;
              }

              if (continueOperation && executeAfterEvent) {
                const rowEvent = new AcSqlDbRowEvent({tableName:this.tableName, dataDictionaryName:this.dataDictionaryName});
                rowEvent.eventType = AcEnumDDRowEvent.AFTER_UPDATE;
                rowEvent.result = result;
                const eventResult = await rowEvent.execute();
                if (eventResult.isSuccess()) {
                  this.logger.log(["After event result", eventResult]);
                } else {
                  this.logger.error(["After event result", eventResult]);
                  result.setFromResult({ result: eventResult });
                }
              }
            } else {
              result.setFromResult({ result: updateResult, logger: this.logger });
            }
          }
        } else {
          this.logger.log("No data to update");
          result.message = 'No values to update row';
        }
      } else {
        this.logger.error(["Validation result : ", validateResult]);
        result.setFromResult({ result: validateResult! });
      }
    } catch (ex: any) {
      result.setException({ exception: ex, stackTrace: ex.stack, logger: this.logger, logException: true });
    }
    return result;
  }

  async updateRows({
    rows,
    executeAfterEvent = true,
    executeBeforeEvent = true,
  }: {
    rows: { [key: string]: any }[];
    executeAfterEvent?: boolean;
    executeBeforeEvent?: boolean;
  }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult({operation:AcEnumDDRowOperation.UPDATE});
    try {
      let continueOperation = true;
      const rowsWithConditions: {
        row: { [key: string]: any };
        condition: string;
        parameters: { [key: string]: any };
      }[] = [];
      const primaryKeyValues: any[] = [];
      const primaryKeyColumn = this.acDDTable.getPrimaryKeyColumnName();

      for (let index = 0; index < rows.length && continueOperation; index++) {
        let row = rows[index];
        this.logger.log(["Updating row with data : ", row]);

        const validateResult = await this.validateValues({ row, isInsert: false });
        if (validateResult.isSuccess()) {
          this.logger.log(["Validation result : ", validateResult]);
          const primaryKeyValue = row[primaryKeyColumn];
          const formatResult = await this.formatValues({ row });

          if (formatResult.isSuccess()) {
            row = formatResult.value;
          } else {
            continueOperation = false;
            break;
          }

          this.logger.log(["Formatted data : ", row]);

          if (Object.keys(row).length > 0 && Autocode.validPrimaryKey({value:primaryKeyValue})) {
            const condition = `${primaryKeyColumn} = :primaryKeyValue${index}`;
            const parameters = { [`:primaryKeyValue${index}`]: primaryKeyValue };
            primaryKeyValues.push(primaryKeyValue);
            rowsWithConditions.push({ row, condition, parameters });
          }
        } else {
          this.logger.error(["Validation result : ", validateResult]);
          result.setFromResult({ result: validateResult });
          continueOperation = false;
          break;
        }
      }

      if (continueOperation && rowsWithConditions.length > 0) {
        if (executeBeforeEvent) {
          for (const rowDetails of rowsWithConditions) {
            this.logger.log("Executing before update event");
            const rowEvent = new AcSqlDbRowEvent({tableName:this.tableName, dataDictionaryName:this.dataDictionaryName});
            rowEvent.row = rowDetails.row;
            rowEvent.condition = rowDetails.condition;
            rowEvent.parameters = rowDetails.parameters;
            rowEvent.eventType = AcEnumDDRowEvent.BEFORE_UPDATE;
            const eventResult = await rowEvent.execute();
            if (!eventResult.isSuccess()) {
              this.logger.error(["Before event result", eventResult]);
              result.setFromResult({ result: eventResult, message: "Aborted from before update row events" });
              continueOperation = false;
              break;
            }
          }
        } else {
          this.logger.log("Skipping before update event");
        }

        if (continueOperation) {
          const updateResult = await this.dao!.updateRows({
            tableName: this.tableName,
            rowsWithConditions,
          });

          if (updateResult.isSuccess()) {
            result.setSuccess({ message: "Rows updated successfully", logger: this.logger });

            const selectResult = await this.getRows({
              condition: `${primaryKeyColumn} IN (@primaryKeyValues)`,
              parameters: { "@primaryKeyValues": primaryKeyValues },
            });

            if (selectResult.isSuccess()) {
              result.rows = selectResult.rows;
            } else {
              this.logger.error([`Error getting updated row : ${selectResult.message}`, selectResult]);
              result.message = `Error getting updated row : ${selectResult.message}`;
              continueOperation = false;
            }

            if (continueOperation && executeAfterEvent) {
              const rowEvent = new AcSqlDbRowEvent({tableName:this.tableName, dataDictionaryName:this.dataDictionaryName});
              rowEvent.eventType = AcEnumDDRowEvent.AFTER_UPDATE;
              rowEvent.result = result;
              const eventResult = await rowEvent.execute();
              if (!eventResult.isSuccess()) {
                this.logger.error(["After event result", eventResult]);
                result.setFromResult({ result: eventResult });
              } else {
                this.logger.log(["After event result", eventResult]);
              }
            }
          } else {
            result.setFromResult({ result: updateResult, logger: this.logger });
          }
        }
      } else if (rowsWithConditions.length === 0) {
        result.message = "Nothing to update";
      }
    } catch (ex: any) {
      result.setException({ exception: ex, stackTrace: ex.stack, logger: this.logger, logException: true });
    }
    return result;
  }



  async updateValueLengthWithChars({
    value,
    char,
    length,
  }: {
    value: string;
    char: string;
    length: number;
  }): Promise<string> {
    let result = value;
    if (length > 0) {
      const currentLength = value.length;
      if (currentLength < length) {
        result = char.repeat(length - currentLength) + value;
      }
    }
    return result;
  }

  async validateValues({
    row,
    isInsert = false,
  }: {
    row: { [key: string]: any };
    isInsert?: boolean;
  }): Promise<AcResult> {
    const result = new AcResult();
    try {
      let continueOperation = true;

      for (const column of this.acDDTable.tableColumns) {
        const value = row[column.columnName];
        if (continueOperation && column.isRequired()) {
          let validRequired = true;
          if (!row.hasOwnProperty(column.columnName) && isInsert) {
            validRequired = false;
          } else if ((typeof value === "string" && value.trim() === "") || value == null) {
            validRequired = false;
          }
          if (!validRequired) {
            continueOperation = false;
            result.setFailure({ message: "Required column value is missing" });
          }
        }

        if (continueOperation) {
          if (column.columnType === AcEnumDDColumnType.INTEGER || column.columnType === AcEnumDDColumnType.DOUBLE) {
            if (value != null && typeof value !== "number") {
              result.setFailure({ message: `Invalid numeric value for column : ${column.columnName}` });
              break;
            }
          } else if (
            column.columnType === AcEnumDDColumnType.DATE ||
            column.columnType === AcEnumDDColumnType.DATETIME ||
            column.columnType === AcEnumDDColumnType.TIME
          ) {
            if (value != null && value !== "NOW") {
              try {
                new Date(value);
              } catch (ex: any) {
                result.setException({
                  message: `Invalid datetime value for column : ${column.columnName}`,
                  exception: ex,
                  stackTrace: ex.stack,
                });
                break;
              }
            }
          }
        }
      }

      if (continueOperation) {
        const checkResponse = await this.checkUniqueValues({ row });
        if (checkResponse.isFailure()) {
          continueOperation = false;
          result.setFromResult({ result: checkResponse });
        }
      }

      if (continueOperation) {
        result.setSuccess();
      }
    } catch (ex: any) {
      result.setException({ exception: ex, stackTrace: ex.stack, logger: this.logger, logException: true });
    }
    return result;
  }


}
