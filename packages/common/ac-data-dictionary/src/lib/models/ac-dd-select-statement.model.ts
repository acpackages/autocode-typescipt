/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils, AcEnumLogicalOperator, AcEnumConditionOperator } from "@autocode-ts/autocode";
import { AcDataDictionary, AcDDCondition, AcDDConditionGroup, AcDDTableColumn, AcEnumDDColumnType } from "../..";
// import { AcDDConditionGroup } from "./ac-dd-condition-group.model";
// import { AcDataDictionary } from "./ac-data-dictionary.model";
// import { AcDDCondition } from "./ac-dd-condition.model";
// import { AcDDTableColumn } from "./ac-dd-table-column.model";
// import { AcEnumDDColumnType } from "../enums/ac-enum-dd-column-type.enum";

export class AcDDSelectStatement {
  static readonly KeyCondition = "condition";
  static readonly KeyConditionGroup = "condition_group";
  static readonly KeyDatabaseType = "database_type";
  static readonly KeyDataDictionaryName = "data_dictionary_name";
  static readonly KeyExcludeColumns = "exclude_columns";
  static readonly KeyIncludeColumns = "include_columns";
  static readonly KeyOrderBy = "order_by";
  static readonly KeyPageNumber = "page_number";
  static readonly KeyPageSize = "page_size";
  static readonly KeyParameters = "parameters";
  static readonly KeySelectStatement = "select_statement";
  static readonly KeySqlStatement = "sql_statement";
  static readonly KeyTableName = "table_name";

  condition: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KeyConditionGroup })
  conditionGroup!: AcDDConditionGroup;

  @AcBindJsonProperty({ key: AcDDSelectStatement.KeyDatabaseType })
  databaseType: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KeyDataDictionaryName })
  dataDictionaryName: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KeyExcludeColumns })
  excludeColumns: string[] = [];

  groupStack: AcDDConditionGroup[] = [];

  @AcBindJsonProperty({ key: AcDDSelectStatement.KeyIncludeColumns })
  includeColumns: string[] = [];

  @AcBindJsonProperty({ key: AcDDSelectStatement.KeyOrderBy })
  orderBy: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KeyPageNumber })
  pageNumber: number = 0;

  @AcBindJsonProperty({ key: AcDDSelectStatement.KeyPageSize })
  pageSize: number = 0;

  parameters: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcDDSelectStatement.KeySelectStatement })
  selectStatement: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KeySqlStatement })
  sqlStatement: string = "";

  @AcBindJsonProperty({ key: AcDDSelectStatement.KeyTableName })
  tableName: string = "";

  constructor({ tableName = "", dataDictionaryName = "default" }: { tableName?: string, dataDictionaryName?: string } = {}) {
    this.tableName = tableName;
    this.dataDictionaryName = dataDictionaryName;
    this.conditionGroup = new AcDDConditionGroup();
    this.conditionGroup.operator = AcEnumLogicalOperator.And;
    this.groupStack.push(this.conditionGroup);
  }

  static generateSqlStatement({
    selectStatement = "",
    condition = "",
    orderBy = "",
    pageNumber = 0,
    pageSize = 0,
    databaseType = AcEnumSqlDatabaseType.Unknown
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

  addConditionGroup({ conditions, operator = AcEnumLogicalOperator.And }: { conditions: any[], operator?: string }): this {
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
    if (filters.hasOwnProperty(AcDDConditionGroup.KeyConditions)) {
      const operator = filters[AcDDConditionGroup.KeyOperator] ?? AcEnumLogicalOperator.And;
      this.addConditionGroup({
        conditions: filters[AcDDConditionGroup.KeyConditions],
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
      case AcEnumConditionOperator.Between:
        if (Array.isArray(acDDCondition.value) && acDDCondition.value.length === 2) {
          const p1 = newParam(acDDCondition.value[0]);
          this.condition += `${colName} BETWEEN ${p1}`;
          const p2 = newParam(acDDCondition.value[1]);
          this.condition += ` AND ${p2}`;
        }
        break;
      case AcEnumConditionOperator.Contains:
        return this.setSqlLikeStringCondition({ acDDCondition });
      case AcEnumConditionOperator.EndsWith:
        return this.setSqlLikeStringCondition({ acDDCondition, includeInBetween: false, includeStart: false });
      case AcEnumConditionOperator.StartsWith:
        return this.setSqlLikeStringCondition({ acDDCondition, includeInBetween: false, includeEnd: false });
      case AcEnumConditionOperator.EqualTo:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} = ${parameterName}`;
        break;
      case AcEnumConditionOperator.NotEqualTo:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} != ${parameterName}`;
        break;
      case AcEnumConditionOperator.GreaterThan:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} > ${parameterName}`;
        break;
      case AcEnumConditionOperator.GreaterThanEqualTo:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} >= ${parameterName}`;
        break;
      case AcEnumConditionOperator.LessThan:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} < ${parameterName}`;
        break;
      case AcEnumConditionOperator.LessThanEqualTo:
        parameterName = newParam(acDDCondition.value);
        this.condition += `${colName} <= ${parameterName}`;
        break;
      case AcEnumConditionOperator.In:
      case AcEnumConditionOperator.NotIn:
        parameterName = newParam(
          typeof acDDCondition.value === "string" ? acDDCondition.value.split(",") : acDDCondition.value
        );
        this.condition += `${colName} ${acDDCondition.operator === AcEnumConditionOperator.NotIn ? "NOT " : ""}IN (${parameterName})`;
        break;
      case AcEnumConditionOperator.IsNull:
        this.condition += `${colName} IS NULL`;
        break;
      case AcEnumConditionOperator.IsNotNull:
        this.condition += `${colName} IS NOT NULL`;
        break;
      case AcEnumConditionOperator.IsEmpty:
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

    if (tableColumn.columnType === AcEnumDDColumnType.Json) {
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
