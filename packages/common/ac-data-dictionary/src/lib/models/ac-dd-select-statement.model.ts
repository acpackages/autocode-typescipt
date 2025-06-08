/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-ts/autocode";
import { AcDataDictionary, AcDDCondition, AcDDConditionGroup, AcDDTableColumn, AcEnumDDColumnType, AcEnumDDConditionOperator, AcEnumDDLogicalOperator } from "../..";

export class AcDDSelectStatement {
  static readonly KEY_CONDITION = "condition";
  static readonly KEY_CONDITION_GROUP = "condition_group";
  static readonly KEY_DATABASE_TYPE = "database_type";
  static readonly KEY_DATA_DICTIONARY_NAME = "data_dictionary_name";
  static readonly KEY_EXCLUDE_COLUMNS = "exclude_columns";
  static readonly KEY_INCLUDE_COLUMNS = "include_columns";
  static readonly KEY_ORDER_BY = "order_by";
  static readonly KEY_PAGE_NUMBER = "page_number";
  static readonly KEY_PAGE_SIZE = "page_size";
  static readonly KEY_PARAMETERS = "parameters";
  static readonly KEY_SELECT_STATEMENT = "select_statement";
  static readonly KEY_SQL_STATEMENT = "sql_statement";
  static readonly KEY_TABLE_NAME = "table_name";

  condition: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KEY_CONDITION_GROUP })
  conditionGroup!: AcDDConditionGroup;

  @AcBindJsonProperty({ key: AcDDSelectStatement.KEY_DATABASE_TYPE })
  databaseType: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KEY_DATA_DICTIONARY_NAME })
  dataDictionaryName: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KEY_EXCLUDE_COLUMNS })
  excludeColumns: string[] = [];

  groupStack: AcDDConditionGroup[] = [];

  @AcBindJsonProperty({ key: AcDDSelectStatement.KEY_INCLUDE_COLUMNS })
  includeColumns: string[] = [];

  @AcBindJsonProperty({ key: AcDDSelectStatement.KEY_ORDER_BY })
  orderBy: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KEY_PAGE_NUMBER })
  pageNumber: number = 0;

  @AcBindJsonProperty({ key: AcDDSelectStatement.KEY_PAGE_SIZE })
  pageSize: number = 0;

  parameters: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcDDSelectStatement.KEY_SELECT_STATEMENT })
  selectStatement: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KEY_SQL_STATEMENT })
  sqlStatement: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KEY_TABLE_NAME })
  tableName: string = "";

  constructor({ tableName = "", dataDictionaryName = "default" }: { tableName?: string, dataDictionaryName?: string } = {}) {
    this.tableName = tableName;
    this.dataDictionaryName = dataDictionaryName;
    this.conditionGroup = new AcDDConditionGroup();
    this.conditionGroup.operator = AcEnumDDLogicalOperator.AND;
    this.groupStack.push(this.conditionGroup);
  }

  static generateSqlStatement({
    selectStatement = "",
    condition = "",
    orderBy = "",
    pageNumber = 0,
    pageSize = 0,
    databaseType = AcEnumSqlDatabaseType.UNKNOWN
  }: {
    selectStatement?: string,
    condition?: string,
    orderBy?: string,
    pageNumber?: number,
    pageSize?: number,
    databaseType?: string
  }): string {
    let sql = selectStatement ?? "";
    if (condition && condition.length > 0) {
      sql += ` WHERE ${condition}`;
    }
    if (orderBy && orderBy.length > 0) {
      sql += ` ORDER BY ${orderBy}`;
    }
    if (pageSize > 0 && pageNumber > 0) {
      sql += ` LIMIT ${(pageNumber - 1) * pageSize},${pageSize}`;
    }
    return sql;
  }

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDSelectStatement {
    const instance = new AcDDSelectStatement();
    instance.fromJson({ jsonData });
    return instance;
  }

  addCondition({ columnName, operator, value }: { columnName: string, operator: string, value: any }): this {
    this.groupStack[this.groupStack.length - 1].addCondition({ columnName, operator, value });
    return this;
  }

  addConditionGroup({ conditions, operator = AcEnumDDLogicalOperator.AND }: { conditions: any[], operator?: string }): this {
    this.groupStack[this.groupStack.length - 1].addConditionGroup({ conditions, operator });
    return this;
  }

  endGroup(): this {
    if (this.groupStack.length > 1) {
      this.groupStack[this.groupStack.length - 2].conditions.push(this.groupStack.pop()!);
    }
    return this;
  }

  fromJson({ jsonData }: { jsonData: any }): void {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
  }

  getSqlStatement({ skipCondition = false, skipSelectStatement = false, skipLimit = false }: { skipCondition?: boolean, skipSelectStatement?: boolean, skipLimit?: boolean } = {}): string {
    if (!skipSelectStatement) {
      const table = AcDataDictionary.getTable({
        tableName: this.tableName,
        dataDictionaryName: this.dataDictionaryName
      });
      let columns: string[] = [];

      if (this.includeColumns.length === 0 && this.excludeColumns.length === 0) {
        columns.push("*");
      } else if (this.includeColumns.length > 0) {
        columns = this.includeColumns;
      } else if (this.excludeColumns.length > 0 && table) {
        for (const col of table.getColumnNames()) {
          if (!this.excludeColumns.includes(col)) {
            columns.push(col);
          }
        }
      }

      this.selectStatement = `SELECT ${columns.join(",")} FROM ${this.tableName}`;
    }

    if (!skipCondition) {
      this.condition = "";
      this.parameters = {};
      this.setSqlConditionGroup({ acDDConditionGroup: this.conditionGroup, includeParenthesis: false });
    }

    this.sqlStatement = AcDDSelectStatement.generateSqlStatement({
      selectStatement: this.selectStatement,
      condition: this.condition,
      orderBy: this.orderBy,
      pageNumber: skipLimit ? 0 : this.pageNumber,
      pageSize: skipLimit ? 0 : this.pageSize,
      databaseType: this.databaseType
    });

    return this.sqlStatement;
  }

  setConditionsFromFilters({ filters }: { filters: Record<string, any> }): this {
    if (filters.hasOwnProperty(AcDDConditionGroup.KEY_CONDITIONS)) {
      const operator = filters[AcDDConditionGroup.KEY_OPERATOR] ?? AcEnumDDLogicalOperator.AND;
      this.addConditionGroup({
        conditions: filters[AcDDConditionGroup.KEY_CONDITIONS],
        operator
      });
    }
    return this;
  }

  setSqlCondition({ acDDCondition }: { acDDCondition: AcDDCondition }): this {
    let parameterName = "";
    const colName = acDDCondition.columnName;

    const newParam = (value: any) => {
      const key = `@parameter${Object.keys(this.parameters).length}`;
      this.parameters[key] = value;
      return key;
    };

    switch (acDDCondition.operator) {
      case AcEnumDDConditionOperator.BETWEEN:
        if (Array.isArray(acDDCondition.value) && acDDCondition.value.length === 2) {
          const p1 = newParam(acDDCondition.value[0]);
          this.condition += `${colName} BETWEEN ${p1}`;
          const p2 = newParam(acDDCondition.value[1]);
          this.condition += ` AND ${p2}`;
        }
        break;
      case AcEnumDDConditionOperator.CONTAINS:
        return this.setSqlLikeStringCondition({ acDDCondition });
      case AcEnumDDConditionOperator.ENDS_WITH:
        return this.setSqlLikeStringCondition({ acDDCondition, includeInBetween: false, includeStart: false });
      case AcEnumDDConditionOperator.STARTS_WITH:
        return this.setSqlLikeStringCondition({ acDDCondition, includeInBetween: false, includeEnd: false });
      case AcEnumDDConditionOperator.EQUAL_TO:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} = ${parameterName}`;
        break;
      case AcEnumDDConditionOperator.NOT_EQUAL_TO:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} != ${parameterName}`;
        break;
      case AcEnumDDConditionOperator.GREATER_THAN:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} > ${parameterName}`;
        break;
      case AcEnumDDConditionOperator.GREATER_THAN_EQUAL_TO:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} >= ${parameterName}`;
        break;
      case AcEnumDDConditionOperator.LESS_THAN:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} < ${parameterName}`;
        break;
      case AcEnumDDConditionOperator.LESS_THAN_EQUAL_TO:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} <= ${parameterName}`;
        break;
      case AcEnumDDConditionOperator.IN:
      case AcEnumDDConditionOperator.NOT_IN:
        parameterName = newParam(
          typeof acDDCondition.value === "string" ? acDDCondition.value.split(",") : acDDCondition.value
        );
        this.condition += `${colName} ${acDDCondition.operator === AcEnumDDConditionOperator.NOT_IN ? "NOT " : ""}IN (${parameterName})`;
        break;
      case AcEnumDDConditionOperator.IS_NULL:
        this.condition += `${colName} IS NULL`;
        break;
      case AcEnumDDConditionOperator.IS_NOT_NULL:
        this.condition += `${colName} IS NOT NULL`;
        break;
      case AcEnumDDConditionOperator.IS_EMPTY:
        this.condition += `${colName} = ''`;
        break;
      default:
        break;
    }
    return this;
  }

  setSqlConditionGroup({ acDDConditionGroup, includeParenthesis = true }: { acDDConditionGroup: AcDDConditionGroup, includeParenthesis?: boolean }): this {
    acDDConditionGroup.conditions.forEach((cond, index) => {
      if (index > 0) {
        this.condition += ` ${acDDConditionGroup.operator} `;
      }
      if (cond instanceof AcDDConditionGroup) {
        if (includeParenthesis) this.condition += "(";
        this.setSqlConditionGroup({ acDDConditionGroup: cond, includeParenthesis });
        if (includeParenthesis) this.condition += ")";
      } else if (cond instanceof AcDDCondition) {
        this.setSqlCondition({ acDDCondition: cond });
      }
    });
    return this;
  }

  setSqlLikeStringCondition({ acDDCondition, includeEnd = true, includeInBetween = true, includeStart = true }: {
    acDDCondition: AcDDCondition,
    includeEnd?: boolean,
    includeInBetween?: boolean,
    includeStart?: boolean
  }): this {
    const tableColumn: AcDDTableColumn = AcDataDictionary.getTableColumn({
      tableName: this.tableName,
      columnName: acDDCondition.columnName,
      dataDictionaryName: this.dataDictionaryName
    })!;

    const colCheck = `LOWER(${acDDCondition.columnName})`;
    const likeValue = acDDCondition.value.toLowerCase();
    const jsonCol = "value";
    const parts: string[] = [];

    const addCondition = (pattern: string) => {
      const param = `@parameter${Object.keys(this.parameters).length}`;
      this.parameters[param] = pattern;
      parts.push(`${colCheck} LIKE ${param}`);
    };

    if (tableColumn.columnType === AcEnumDDColumnType.JSON) {
      if (includeStart) addCondition(`%"${jsonCol}":"${likeValue}%"%`);
      if (includeInBetween) addCondition(`%"${jsonCol}":"%${likeValue}%"%`);
      if (includeEnd) addCondition(`%"${jsonCol}":"%${likeValue}"%`);
    } else {
      if (includeStart) addCondition(`${likeValue}%`);
      if (includeInBetween) addCondition(`%${likeValue}%`);
      if (includeEnd) addCondition(`${likeValue}%`);
    }

    if (parts.length) {
      this.condition += `(${parts.join(" OR ")})`;
    }

    return this;
  }

  startGroup({ operator = "AND" }: { operator?: string } = {}): this {
    const group = new AcDDConditionGroup();
    group.operator = operator;
    this.groupStack.push(group);
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
