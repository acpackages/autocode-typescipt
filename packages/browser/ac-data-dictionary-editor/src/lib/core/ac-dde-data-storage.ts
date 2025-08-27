/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcHooks, AcJsonUtils, Autocode } from "@autocode-ts/autocode";
import { AcDDTableColumnProperty, AcDDTableProperty, AcEnumDDColumnProperty } from "@autocode-ts/ac-data-dictionary";
import { AcReactiveValueProxy } from "@autocode-ts/ac-template-engine";
import { AcDDEApi } from "./ac-dde-api";
import { IAcDDEDataDictionary } from "../interfaces/ac-dde-data-dictionary.inteface";
import { IAcDDEFunction } from "../interfaces/ac-dde-function.inteface";
import { IAcDDERelationship } from "../interfaces/ac-dde-relationship.inteface";
import { IAcDDEStoredProcedure } from "../interfaces/ac-dde-stored-procedure.inteface";
import { IAcDDETableColumn } from "../interfaces/ac-dde-table-column.inteface";
import { IAcDDETable } from "../interfaces/ac-dde-table.inteface";
import { IAcDDETrigger } from "../interfaces/ac-dde-trigger.inteface";
import { IAcDDEViewColumn } from "../interfaces/ac-dde-view-column.inteface";
import { IAcDDEView } from "../interfaces/ac-dde-view.inteface";
import { AcEnumDDEEntity } from "../enums/ac-enum-dde-entity.enum";
import { boolColumnProperties } from "../consts/ac-dde-column-property-groups.const";

export class AcDDEDataStorage {
  static readonly KeyDataDictionaries = "data_dictionaries";
  static readonly KeyFunctions = "functions";
  static readonly KeyRelationships = "relationships";
  static readonly KeyStoredProcedures = "stored_procedures";
  static readonly KeyTableColumns = "table_columns";
  static readonly KeyTables = "tables";
  static readonly KeyTriggers = "triggers";
  static readonly KeyViewColumns = "columns";
  static readonly KeyViews = "views";
  @AcBindJsonProperty({ skipInFromJson:true,skipInToJson:true })
  editorApi!: AcDDEApi;
  @AcBindJsonProperty({ skipInFromJson:true,skipInToJson:true })
  hooks:AcHooks = new AcHooks();

  private _dataDictionariesReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyDataDictionaries })
  private dataDictionaries: Record<string, IAcDDEDataDictionary> = this._dataDictionariesReactiveProxy.valueProxy as any;

  private _functionsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyFunctions })
  private functions: Record<string, IAcDDEFunction> = this._functionsReactiveProxy.valueProxy as any;

  private _relationshipsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyRelationships })
  private relationships: Record<string, IAcDDERelationship> = this._relationshipsReactiveProxy.valueProxy as any;

  private _storedProceduresReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyStoredProcedures })
  private storedProcedures: Record<string, IAcDDEStoredProcedure> = this._storedProceduresReactiveProxy.valueProxy as any;

  private _tableColumnsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTableColumns })
  private tableColumns: Record<string, IAcDDETableColumn> = this._tableColumnsReactiveProxy.valueProxy as any;

  private _tablesReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTables })
  private tables: Record<string, IAcDDETable> = this._tablesReactiveProxy.valueProxy as any;

  private _triggersReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyTriggers })
  private triggers: Record<string, IAcDDETrigger> = this._triggersReactiveProxy.valueProxy as any;

  private _viewColumnsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViewColumns })
  private viewColumns: Record<string, IAcDDEViewColumn> = this._viewColumnsReactiveProxy.valueProxy as any;

  private _viewsReactiveProxy = new AcReactiveValueProxy({});
  @AcBindJsonProperty({ key: AcDDEDataStorage.KeyViews })
  private views: Record<string, IAcDDEView> = this._viewsReactiveProxy.valueProxy as any;

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  addDataDictionary(data: Omit<IAcDDEDataDictionary, 'dataDictionaryId'>): IAcDDEDataDictionary {
    const row: IAcDDEDataDictionary = { dataDictionaryId: Autocode.uuid(), ...data };
    this.dataDictionaries[row.dataDictionaryId] = row;
    return row;
  }

  addFunction(data: Omit<IAcDDEFunction, 'functionId'>): IAcDDEFunction {
    const row: IAcDDEFunction = { functionId: Autocode.uuid(), ...data };
    this.functions[row.functionId] = row;
    return row;
  }

  addRelationship(data: Omit<IAcDDERelationship, 'relationshipId'>): IAcDDERelationship {
    const row: IAcDDERelationship = { relationshipId: Autocode.uuid(), ...data };
    this.relationships[row.relationshipId] = row;
    return row;
  }

  addStoredProcedure(data: Omit<IAcDDEStoredProcedure, 'storedProcedureId'>): IAcDDEStoredProcedure {
    const row: IAcDDEStoredProcedure = { storedProcedureId: Autocode.uuid(), ...data };
    this.storedProcedures[row.storedProcedureId] = row;
    return row;
  }

  addTableColumn(data: Omit<IAcDDETableColumn, 'columnId'>): IAcDDETableColumn {
    const rowData = data as IAcDDETableColumn;
    rowData.columnId = Autocode.uuid();
    const row: IAcDDETableColumn | any = rowData;
    this.tableColumns[row.columnId] = row;
    if (data.columnProperties) {
      const properties = data.columnProperties;
      for (const propertyKey of Object.keys(properties)) {
        row[propertyKey] = properties[propertyKey][AcDDTableColumnProperty.KeyPropertyValue];
      }
    }
    return row;
  }

  addTable(data: Omit<IAcDDETable, 'tableId'>): IAcDDETable {
    const row: IAcDDETable|any = { tableId: Autocode.uuid(), ...data };
    this.tables[row.tableId] = row;
    if (data.tableProperties) {
      const properties = data.tableProperties;
      for (const propertyKey of Object.keys(properties)) {
        row[propertyKey] = properties[propertyKey][AcDDTableProperty.KeyPropertyValue];
      }
    }
    return row;
  }

  addTrigger(data: Omit<IAcDDETrigger, 'triggerId'>): IAcDDETrigger {
    const row: IAcDDETrigger = { triggerId: Autocode.uuid(), ...data };
    this.triggers[row.triggerId] = row;
    return row;
  }

  addViewColumn(data: Omit<IAcDDEViewColumn, 'columnId'>): IAcDDEViewColumn {
    const row: IAcDDEViewColumn = { columnId: Autocode.uuid(), ...data };
    this.viewColumns[row.columnId] = row;
    return row;
  }

  addView(data: Omit<IAcDDEView, 'viewId'>): IAcDDEView {
    const row: IAcDDEView = { viewId: Autocode.uuid(), ...data };
    this.views[row.viewId] = row;
    return row;
  }

  deleteDataDictionary({ dataDictionaryId }: { dataDictionaryId: string }): IAcDDEDataDictionary|undefined {
    const row = this.dataDictionaries[dataDictionaryId];
    delete this.dataDictionaries[dataDictionaryId];
    return row;
  }

  deleteFunction({ functionId }: { functionId: string }): IAcDDEFunction|undefined {
    const row = this.functions[functionId];
    delete this.functions[functionId];
    return row;
  }

  deleteRelationship({ relationshipId }: { relationshipId: string }): IAcDDERelationship|undefined {
    const row = this.relationships[relationshipId];
    delete this.relationships[relationshipId];
    return row;
  }

  deleteStoredProcedure({ storedProcedureId }: { storedProcedureId: string }): IAcDDEStoredProcedure|undefined {
    const row = this.storedProcedures[storedProcedureId];
    delete this.storedProcedures[storedProcedureId];
    return row;
  }

  deleteTableColumn({ columnId }: { columnId: string }): IAcDDETableColumn|undefined {
    if(this.tableColumns[columnId]){
      const row = this.tableColumns[columnId];
      delete this.tableColumns[columnId];
      return row;
    }
    return undefined;
  }

  deleteTable({ tableId }: { tableId: string }): IAcDDETable|undefined {
    if(this.tables[tableId]){
      const row = this.tables[tableId];
      delete this.tables[tableId];
      return row;
    }
  }

  deleteTrigger({ triggerId }: { triggerId: string }): IAcDDETrigger|undefined {
    const row = this.triggers[triggerId];
    delete this.triggers[triggerId];
    return row;
  }

  deleteViewColumn({ columnId }: { columnId: string }): IAcDDEViewColumn|undefined {
    const row = this.viewColumns[columnId];
    delete this.viewColumns[columnId];
    return row;
  }

  deleteView({ viewId }: { viewId: string }): IAcDDEView|undefined {
    const row = this.views[viewId];
    delete this.views[viewId];
    return row;
  }

  getDataDictionaries({ dataDictionaryId, dataDictionaryName,filter }: { dataDictionaryId?: string, dataDictionaryName?: string,filter?:Function } = {}): IAcDDEDataDictionary[] {
    let result: IAcDDEDataDictionary[] = Object.values(this.dataDictionaries);
    if(dataDictionaryId || dataDictionaryName || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.dataDictionaryId;
        }
        if(dataDictionaryName && isValid){
          isValid = isValid && item.dataDictionaryName == dataDictionaryName;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getFunctions({ dataDictionaryId,functionId,filter }: { dataDictionaryId?: string,functionId?: string,filter?:Function } = {}): IAcDDEFunction[] {
    let result: IAcDDEFunction[] = Object.values(this.functions);
    if(dataDictionaryId || functionId || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.dataDictionaryId;
        }
        if(functionId && isValid){
          isValid = isValid && item.functionId == functionId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getRelationships({ dataDictionaryId,relationshipId,filter }: { dataDictionaryId?: string ,relationshipId?: string,filter?:Function } = {}): IAcDDERelationship[] {
    let result: IAcDDERelationship[] = Object.values(this.relationships);
    if(dataDictionaryId || relationshipId || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.dataDictionaryId;
        }
        if(relationshipId && isValid){
          isValid = isValid && item.relationshipId == relationshipId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getStoredProcedures({ dataDictionaryId, storedProcedureId,filter }: { dataDictionaryId?: string ,storedProcedureId?: string,filter?:Function } = {}): IAcDDEStoredProcedure[] {
    let result: IAcDDEStoredProcedure[] = Object.values(this.storedProcedures);
    if(dataDictionaryId || storedProcedureId || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.dataDictionaryId;
        }
        if(storedProcedureId && isValid){
          isValid = isValid && item.storedProcedureId == storedProcedureId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getTables({ tableId, tableName, dataDictionaryId,filter }: { tableId?:string, tableName?: string, dataDictionaryId?: string,filter?:Function } = {}): IAcDDETable[] {
    let result: IAcDDETable[] = Object.values(this.tables);
    if(tableName || dataDictionaryId || tableId || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.dataDictionaryId;
        }
        if(tableName && isValid){
          isValid = isValid && item.tableName == tableName;
        }
        if(tableId && isValid){
          isValid = isValid && item.tableId == tableId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getTableColumns({ tableId, columnId ,columnName, dataDictionaryId,filter }: { tableId?: string, columnId?: string, columnName?: string, dataDictionaryId?: string,filter?:Function } = {}): IAcDDETableColumn[] {
    let result: IAcDDETableColumn[] = Object.values(this.tableColumns);
    if(tableId || columnName || dataDictionaryId || columnId || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.dataDictionaryId;
        }
        if(tableId && isValid){
          isValid = isValid && item.tableId == tableId;
        }
        if(columnName && isValid){
          isValid = isValid && item.columnName == columnName;
        }
        if(columnId && isValid){
          isValid = isValid && item.columnId == columnId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getTriggers({ dataDictionaryId, triggerId,filter }: { dataDictionaryId?: string,triggerId?: string,filter?:Function } = {}): IAcDDETrigger[] {
    let result: IAcDDETrigger[] = Object.values(this.triggers);
    if(dataDictionaryId || triggerId || filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.dataDictionaryId;
        }
        if(triggerId && isValid){
          isValid = isValid && item.triggerId == triggerId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getViews({ dataDictionaryId,viewId,viewName,filter }: { dataDictionaryId?: string,viewId?:string,viewName?:string,filter?:Function } = {}): IAcDDEView[] {
    let result: IAcDDEView[] = Object.values(this.views);
    if(dataDictionaryId || viewId || viewName|| filter){
      result = result.filter((item) => {
        let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.dataDictionaryId;
        }
        if(viewId && isValid){
          isValid = isValid && item.viewId == viewId;
        }
        if(viewName && isValid){
          isValid = isValid && item.viewName == viewName;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  getViewColumns({ columnId,dataDictionaryId,viewId,filter }: { columnId?: string,dataDictionaryId?: string,viewId?:string,filter?:Function  } = {}): IAcDDEViewColumn[] {
    let result: IAcDDEViewColumn[] = Object.values(this.viewColumns);
    if(dataDictionaryId || viewId || filter){
      result = result.filter((item) => {
         let isValid = true;
        if(dataDictionaryId && isValid){
          isValid = isValid && dataDictionaryId == item.dataDictionaryId;
        }
        if(viewId && isValid){
          isValid = isValid && item.viewId == viewId;
        }
        if(columnId && isValid){
          isValid = isValid && item.columnId == columnId;
        }
        if(filter && isValid){
          isValid = filter(item);
        }
        return isValid;
      });
    }
    return result;
  }

  hasDataDictionaryWithId(dataDictionaryId:string): boolean {
    return this.dataDictionaries[dataDictionaryId] != undefined;
  }

  hasFunctionWithId(functionId:string): boolean {
    return this.functions[functionId] != undefined;
  }

  hasRelationshipWidthId(relationshipId:string): boolean {
    return this.relationships[relationshipId] != undefined;
  }

  hasStoredProcedureWithId(storedProcedureId:string): boolean {
    return this.storedProcedures[storedProcedureId] != undefined;
  }

  hasTableWithId(tableId:string): boolean {
    return this.tables[tableId] != undefined;
  }

  hasTableColumnWithId(tableColumnId:string): boolean {
    return this.tableColumns[tableColumnId] != undefined;
  }

  hasTriggerWithId(triggerId:string): boolean {
    return this.triggers[triggerId] != undefined;
  }

  hasViewWithId(viewId:string): boolean {
    return this.views[viewId] != undefined;
  }

  hasViewColumnWithId(viewColumnId:string): boolean {
    return this.viewColumns[viewColumnId] != undefined;
  }

  on(event: 'add' | 'delete' | 'update' | 'change', entity: AcEnumDDEEntity, callback: Function): string {
    let proxy: AcReactiveValueProxy | undefined;
    switch (entity) {
      case AcEnumDDEEntity.DataDictionary:
        proxy = this._dataDictionariesReactiveProxy;
        break;
      case AcEnumDDEEntity.Function:
        proxy = this._functionsReactiveProxy;
        break;
      case AcEnumDDEEntity.Relationship:
        proxy = this._relationshipsReactiveProxy;
        break;
      case AcEnumDDEEntity.StoredProcedure:
        proxy = this._storedProceduresReactiveProxy;
        break;
      case AcEnumDDEEntity.Table:
        proxy = this._tablesReactiveProxy;
        break;
      case AcEnumDDEEntity.TableColumn:
        proxy = this._tableColumnsReactiveProxy;
        break;
      case AcEnumDDEEntity.Trigger:
        proxy = this._triggersReactiveProxy;
        break;
      case AcEnumDDEEntity.View:
        proxy = this._viewsReactiveProxy;
        break;
      case AcEnumDDEEntity.ViewColumn:
        proxy = this._viewColumnsReactiveProxy;
        break;
    }
    return proxy.on(event, callback);
  }

  saveDataDictionary(data: Partial<IAcDDEDataDictionary>): IAcDDEDataDictionary {
    if(data.dataDictionaryId == undefined){
      data.dataDictionaryId = Autocode.uuid();
    }
    const row:any = data;
    this.dataDictionaries[data.dataDictionaryId] = row;
    return row;
  }

  saveFunction(data: Partial<IAcDDEFunction>): IAcDDEFunction {
    if(data.functionId == undefined){
      data.functionId = Autocode.uuid();
    }
    const row:any = data;
    this.functions[data.functionId] = row;
    return row;
  }

  saveRelationship(data: Partial<IAcDDERelationship>): IAcDDERelationship {
    if(data.relationshipId == undefined){
      data.relationshipId = Autocode.uuid();
    }
    const row:any = data;
    this.relationships[data.relationshipId] = row;
    return row;
  }

  saveStoredProcedure(data: Partial<IAcDDEStoredProcedure>): IAcDDEStoredProcedure {
    if(data.storedProcedureId == undefined){
      data.storedProcedureId = Autocode.uuid();
    }
    const row:any = data;
    this.storedProcedures[data.storedProcedureId] = row;
    return row;
  }

  saveTableColumn(data: Partial<IAcDDETableColumn>): IAcDDETableColumn {
    if(data.columnId == undefined){
      data.columnId = Autocode.uuid();
    }
    const row:any = data;
    if (data.columnProperties) {
      const properties = data.columnProperties;
      for (const propertyKey of Object.keys(properties)) {
        row[propertyKey] = properties[propertyKey][AcDDTableColumnProperty.KeyPropertyValue];
      }
    }
    this.tableColumns[data.columnId] = row;
    return row;
  }

  saveTable(data: Partial<IAcDDETable>): IAcDDETable {
    if(data.tableId == undefined){
      data.tableId = Autocode.uuid();
    }
    const row:any = data;
    if (data.tableProperties) {
      const properties = data.tableProperties;
      for (const propertyKey of Object.keys(properties)) {
        row[propertyKey] = properties[propertyKey][AcDDTableProperty.KeyPropertyValue];
      }
    }
    this.tables[data.tableId] = row;
    return row;
  }

  saveTrigger(data: Partial<IAcDDETrigger>): IAcDDETrigger {
    if(data.triggerId == undefined){
      data.triggerId = Autocode.uuid();
    }
    const row:any = data;
    this.triggers[data.triggerId] = row;
    return row;
  }

  saveViewColumn(data: Partial<IAcDDEViewColumn>): IAcDDEViewColumn {
    if(data.columnId == undefined){
      data.columnId = Autocode.uuid();
    }
    const row:any = data;
    this.viewColumns[data.columnId] = row;
    return row;
  }

  saveView(data: Partial<IAcDDEView>): IAcDDEView {
    if(data.viewId == undefined){
      data.viewId = Autocode.uuid();
    }
    const row:any = data;
    this.views[data.viewId] = row;
    return row;
  }


  setTableColumnProperties(column:IAcDDETableColumn){
    const properties:any = {};
    const columnRow:any =column;
    const setProperty:Function = (propertyName:any)=>{
      let propertyValue = columnRow[propertyName]
      if(propertyValue != undefined){
        let validPropertyValue = true;
        if(boolColumnProperties.includes(propertyName) && propertyValue!=true){
          validPropertyValue = false;
        }
        if(validPropertyValue){
          properties[propertyName] = {
            [AcDDTableColumnProperty.KeyPropertyName]: propertyName,
            [AcDDTableColumnProperty.KeyPropertyValue]: columnRow[propertyName]
          };
        }
      }
    };
    for(const propertyName of Object.values(AcEnumDDColumnProperty)){
      setProperty(propertyName);
    }
    column.columnProperties = properties;
  }
}
