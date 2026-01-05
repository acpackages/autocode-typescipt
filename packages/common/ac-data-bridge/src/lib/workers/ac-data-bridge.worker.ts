/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @nx/enforce-module-boundaries */
import * as XLSX from "xlsx";
import { AcDataDictionary } from "@autocode-ts/ac-data-dictionary";
import { IAcDataBridgeProgress } from "../interfaces/ac-data-bridge-progress.interface";
import { IAcDataBridgeEntity } from "../interfaces/ac-data-bridge-entity.interface";
import { IAcDataBridgeExistingEntity } from "../interfaces/ac-data-bridge-existing-entity.interface";
import { IAcDataBridgeField } from "../interfaces/ac-data-bridge-field.interface";
import { IAcDataBridgeEntityTemplateDef } from "../interfaces/ac-data-bridge-entity-template-def.interface";
import { AC_DATA_BRIDGE_DEFAULTS, IAcDataBridgeProcesedRow } from "@autocode-ts/ac-data-bridge";
import { Autocode } from "@autocode-ts/autocode";

class EntityWorker {
  private worker: AcDataBridgeWorker;
  logMessages: boolean = false;
  entity?: IAcDataBridgeEntity;
  progress?: IAcDataBridgeProgress;
  processedRows:IAcDataBridgeProcesedRow[] = [];
  templateDef?:IAcDataBridgeEntityTemplateDef;

  constructor({ worker }: { worker: AcDataBridgeWorker }) {
    this.worker = worker;
    // this.convertedData = { rows: [], title: 'Product Categories', keys: [], name: Tables.ActProductCategories };
    // this.worker.convertedData[Tables.ActProductCategories] = this.convertedData;

    // this.appImportSheetDef = IMPORT_SHEET_DEFINITIONS.find((sheetDef) => {
    //   return sheetDef.name === Tables.ActProductCategories
    // });
    // if (this.appImportSheetDef) {
    //   this.appImportSheetDefColumns = this.appImportSheetDef.columns;
    // }
  }

  addRow({ row, sourceRow }: { row: any, sourceRow?: any }): any {
    let primaryKeyValue:any;
    let primaryKeyField:any;
    let templateUniqueKeyField:string|undefined;
    let sourceUniqueValue:string = '';
    const saveRow:any = {...row};
    if(this.templateDef){
      for(const field of this.templateDef.templateFields){
        if(field.isDestinationPrimaryKey && field.destinationFieldName && field.destinationName == this.templateDef.destinationName){
          primaryKeyField = field.destinationFieldName;
          if(saveRow[field.destinationFieldName]){
            primaryKeyValue = saveRow[field.destinationFieldName];
          }
        }
        if(field.isTemplatePrimaryKey && field.templateFieldName){
          templateUniqueKeyField = field.templateFieldName;
        }
      }
    }
    if(primaryKeyValue == undefined || primaryKeyValue == null){
      primaryKeyValue = Autocode.uuid();
    }
    if(primaryKeyField){
      saveRow[primaryKeyField] = primaryKeyValue;
    }
    if(templateUniqueKeyField){
      if(sourceRow[templateUniqueKeyField]){
        sourceUniqueValue = sourceRow[templateUniqueKeyField];
      }
    }
    this.processedRows.push({data:saveRow,operation:'INSERT',rowId:primaryKeyValue,sourceRow,sourceRowId:sourceUniqueValue,status:'PENDING'});
  }

  checkRowIsEmpty({ row }: { row: any }) {
    // console.log("Checking if row is empty:", row);
    let result: boolean = true;
    if (row) {
      for (const key of Object.keys(row)) {
        if (row[key] != undefined && row[key] != '') {
          result = false;
          break;
        }
      }
    }
    // console.log("Row is empty:", result);
    return result;
  }

  checkRowValuesMatch({ previousRow, originalRow, row, keys }: { previousRow: any, originalRow: any, row: any, keys: string[] }): boolean {
    // console.log("Checking row values match with previousRow:", previousRow, "keys:", keys);
    let result: boolean = false;
    if (previousRow) {
      for (const key of keys) {
        if (row[key] == '') {
          result = true;
        }
        else if (row[key] == previousRow[key]) {
          result = true;
        }
      }
    }
    // console.log("Values match:", result);
    return result;
  }

  getTableRowFromMappedColumn({ row, tableName, skipTempValueKey = false }: { row: any, tableName: string, skipTempValueKey?: boolean },) {
    const result: any = {};
    // for (const col of sheetDefinition.sheetColumns) {
      // const appColumn = appDefinition.columns.find((appDefCol) => { return appDefCol?.title == col.defColumnTitle });
      // if (appColumn) {
      //   if (appColumn.dbColumnName && appColumn.dbTableName && appColumn.dbTableName == tableName) {
      //     const value = row[col.sheetColumnName];
      //     if (value != null && value != undefined) {
      //       result[appColumn.dbColumnName] = value;
      //     }
      //   }
      // }
      // if (row[CUSTOM_UNIQUE_FIELD_TITLE] && !skipTempValueKey) {
      //   result[TEMP_UNIQUE_VALUE_KEY] = row[CUSTOM_UNIQUE_FIELD_TITLE];
      // }
    // }
    return result
  }

  processRows(){
    if(this.entity){
      let previousRow: any;
      let originalRow: any;
      let uniqueCheckKeys:string[] = [];
      for (const row of this.entity.rows) {
        if (!this.checkRowIsEmpty({ row })) {
          const destinationsRow:any = {};
          const isDuplicate: boolean = this.checkRowValuesMatch({ previousRow, originalRow, row, keys: uniqueCheckKeys });
          if (!isDuplicate) {
            for(const field of this.entity.fields){
              if(field.destinationName && field.destinationFieldName && field.templateFieldName){
                const value = row[field.templateFieldName];
                if(value){
                  if(!destinationsRow[field.destinationName]){
                    destinationsRow[field.destinationName] = {};
                  }
                  destinationsRow[field.destinationName][field.destinationFieldName] = row[field.templateFieldName];
                }
              }
            }
            for(const key of Object.keys(destinationsRow)){
              if(this.worker.entityWorkers.has(key)){
                const entityWorker = this.worker.entityWorkers.get(key);
                entityWorker?.addRow({row:destinationsRow[key],sourceRow:row});
              }
            }
            originalRow = row;
          }
          previousRow = row;
        }
        if(this.progress){
          this.progress.completedCount++;
        }
      }
    }
  }

  // addRow({ row, sheetRow }: { row: any, sheetRow?: any }): any {
  //   const uniqueIds: any[] = [];
  //   if (row[TEMP_UNIQUE_VALUE_KEY]) {
  //     uniqueIds.push(row[TEMP_UNIQUE_VALUE_KEY]);
  //   }
  //   const existingConvertedRow = this.worker.convertedData[Tables.ActProductCategories]?.rows.find((r) => {
  //     return stringEqualsIgnoreCase(r.data[TblActProductCategories.ProductCategoryName], row[TblActProductCategories.ProductCategoryName]!);
  //   });
  //   if(existingConvertedRow){
  //     row = existingConvertedRow.data;
  //     existingConvertedRow.uniqueIds = [...existingConvertedRow.uniqueIds,...uniqueIds];
  //   }
  //   else{

  //   let existingRow: any;
  //   if (this.worker.existingData && this.worker.existingData[Tables.ActProductCategories]) {
  //     existingRow = this.worker.existingData[Tables.ActProductCategories].find((r: any) => {
  //       return stringEqualsIgnoreCase(r[TblActProductCategories.ProductCategoryName], row[TblActProductCategories.ProductCategoryName]);
  //     });
  //   }
  //   if (!existingRow) {
  //     row[TblActProductCategories.ProductCategoryId] = Autocode.uuid();
  //     const rowKeys = Object.keys(row);
  //     if (!rowKeys.includes(TblActProductCategories.AccounteeId)) {
  //       row[TblActProductCategories.AccounteeId] = this.worker.accounteeId;
  //     }
  //     this.worker.convertedData[Tables.ActProductCategories]?.rows.push({ data: row, operation: 'INSERT', sheetRow, uniqueIds });
  //   }
  //   else {
  //     row = existingRow;
  //     this.worker.convertedData[Tables.ActProductCategories]?.rows.push({ data: row, operation: 'SKIP', sheetRow, uniqueIds });
  //   }
  //   this.setKeys({ row });
  // }
  //   return row;
  // }

  // getRow(args: { [TblActProductCategories.ProductCategoryName]?: string, sheetUniqueId?: string }): any {
  //   let row = this.worker.convertedData[Tables.ActProductCategories]?.rows.find((r) => {
  //     if (args[TblActProductCategories.ProductCategoryName]) {
  //       return stringEqualsIgnoreCase(r.data[TblActProductCategories.ProductCategoryName], args[TblActProductCategories.ProductCategoryName]!);
  //     }
  //     else if (args.sheetUniqueId) {
  //       return r.uniqueIds.includes(args.sheetUniqueId);
  //     }
  //     return false;
  //   });
  //   if (!row) {
  //     let existingRow: any;
  //     if (this.worker.existingData && this.worker.existingData[Tables.ActProductCategories]) {
  //       existingRow = this.worker.existingData[Tables.ActProductCategories].find((row: any) => {
  //         if (args[TblActProductCategories.ProductCategoryName]) {
  //           return stringEqualsIgnoreCase(row[TblActProductCategories.ProductCategoryName], args[TblActProductCategories.ProductCategoryName]!);
  //         }
  //         return false;
  //       });
  //     }
  //     if (existingRow) {
  //       row = existingRow;
  //     }
  //     else {
  //       if (args[TblActProductCategories.ProductCategoryName]) {
  //         row = this.addRow({
  //           row: {
  //             [TblActProductCategories.ProductCategoryName]: args[TblActProductCategories.ProductCategoryName]
  //           }
  //         });
  //       }
  //     }
  //   }
  //   else {
  //     row = row.data
  //   }
  //   return row;
  // }

  // notifyProgress() {
  //   if (this.userSheetMapping && this.worker.sheetProgress && this.worker.sheetProgress.tasks) {
  //     this.worker.sheetProgress.tasks[this.appImportSheetDef!.name].totalCount = this.totalRows;
  //     this.worker.sheetProgress.tasks[this.appImportSheetDef!.name].completedCount = this.processedRows;
  //   }
  //   this.worker.notifyProgress();
  // }

  // processSheetRows() {
  //   if (this.appImportSheetDef && this.userSheetMapping) {
  //     console.log("Found productCategoriesSheet");
  //     let uniqueCheckKeys = [];
  //     const uniqueColumn = this.userSheetColumns.find((sheetCol) => {
  //       return sheetCol.defColumnTitle === CUSTOM_UNIQUE_FIELD_TITLE
  //     });
  //     console.log("Unique column for categories:", uniqueColumn);
  //     if (uniqueColumn) {
  //       uniqueCheckKeys.push(CUSTOM_UNIQUE_FIELD_TITLE);
  //     }
  //     else {
  //       uniqueCheckKeys.push(TblActProductCategories.ProductCategoryName);
  //     }
  //     console.log("Unique check keys for ProductCategories:", uniqueCheckKeys);
  //     console.log("Initialized convertedData for ProductCategories");

  //     let previousRow: any
  //     let originalRow: any;
  //     console.log("Starting row processing loop for ProductCategories, total rows:", this.userSheetMapping.rows.length);

  //     for (const row of this.userSheetMapping.rows) {
  //       if (!this.worker.checkRowIsEmpty({ row })) {
  //         const isDuplicate: boolean = this.worker.checkRowValuesMatch({ previousRow, originalRow, row, keys: uniqueCheckKeys });
  //         console.log(`Row is not duplicate`);
  //         if (!isDuplicate) {
  //           console.log(`Adding row to converted data`);
  //           const tableRow = this.worker.getTableRowFromMappedColumn({ tableName: Tables.ActProductCategories, row, appDefinition: this.appImportSheetDef, sheetDefinition: this.userSheetMapping });
  //           this.addRow({ row: tableRow, sheetRow: row });
  //           originalRow = row;
  //         }
  //         previousRow = row;
  //       }
  //       this.processedRows++;
  //     }
  //     const convertedRows = (this.worker.convertedData as any)[Tables.ActProductCategories].rows;
  //     this.totalRows++;
  //     for (const row of convertedRows) {
  //       if (row.operation != 'SKIP') {
  //         const data = row.data;
  //         let parentCategoryId;
  //         if (data[CUSTOM_COLUMN_TITLES[Tables.ActProductCategories].parentCategoryUniqueId]) {
  //           const parentRow = this.getRow({ sheetUniqueId: data[CUSTOM_COLUMN_TITLES[Tables.ActProductCategories].parentCategoryUniqueId] });
  //           if (parentRow) {
  //             parentCategoryId = parentRow[TblActProductCategories.ProductCategoryId];
  //           }
  //         }
  //         else if (data[CUSTOM_COLUMN_TITLES[Tables.ActProductCategories].parentCategoryName]) {
  //           const parentRow = this.getRow({ sheetUniqueId: data[CUSTOM_COLUMN_TITLES[Tables.ActProductCategories].parentCategoryName] });
  //           if (parentRow) {
  //             parentCategoryId = parentRow[TblActProductCategories.ProductCategoryId];
  //           }
  //         }
  //         if (parentCategoryId) {
  //           row.data[TblActProductCategories.ProductCategoryName] = parentCategoryId;
  //         }
  //       }
  //     }
  //     this.totalRows--;
  //   } else {
  //     console.log("No productCategoriesSheet found");
  //   }
  // }

  // setWorksheetMapping() {
  //   if (this.appImportSheetDef) {
  //     this.userSheetMapping = this.worker.sheets.find((sheet: ISheetMapping) => {
  //       return sheet.appDefTitle === this.appImportSheetDef!.title;
  //     });
  //     if (this.userSheetMapping) {
  //       this.totalRows = this.userSheetMapping!.rows.length;
  //       this.processedRows = 0;
  //       this.userSheetColumns = this.userSheetMapping.sheetColumns;
  //       if (this.worker && this.worker.sheetProgress.tasks) {
  //         this.worker.sheetProgress.tasks[this.appImportSheetDef!.name].title = this.userSheetMapping.sheetName;
  //       }
  //     }
  //   }
  // }

  // setKeys({ row, additionalName, convertedData }: { row: any, convertedData?: IConvertedDataDetails, additionalName?: string }) {
  //   if (!convertedData) {
  //     convertedData = this.convertedData;
  //   }
  //   if (convertedData) {
  //     const rowKeys = Object.keys(row);
  //     const setKeysInArray: Function = (arr: string[]) => {
  //       for (const key of rowKeys) {
  //         if (!arr.includes(key)) {
  //           arr.push(key);
  //         }
  //       }
  //     }
  //     if (additionalName) {
  //       if (!convertedData.additionalRowKeys) {
  //         convertedData.additionalRowKeys = {};
  //       }
  //       if (!convertedData.additionalRowKeys[additionalName]) {
  //         convertedData.additionalRowKeys[additionalName] = [];
  //       }
  //       setKeysInArray(convertedData.additionalRowKeys[additionalName]);
  //     }
  //     else {
  //       setKeysInArray(convertedData.keys);
  //     }
  //   }

  // }
}

export class AcDataBridgeWorker {
  private data?: Uint8Array;
  private progressCallback?: (progress: IAcDataBridgeProgress) => void;
  private destinationEntities: IAcDataBridgeEntity[] = [];
  private processingEntities: IAcDataBridgeEntity[] = [];
  private sourceEntities: IAcDataBridgeEntity[] = [];
  private templateEntities: IAcDataBridgeEntityTemplateDef[] = []
  private existingEntities: IAcDataBridgeExistingEntity[] = [];

  private taskProgress?: IAcDataBridgeProgress;
  private dataDictionary?: AcDataDictionary;
  private notifyInterval:any;
  entityWorkers: Map<string, EntityWorker> = new Map();

  constructor() {
    //
  }

  async getTemplateFieldsList({ templateName }: { templateName: string }): Promise<{ label: string, value: string }[]> {
    const result: { label: string, value: string }[] = [];
    const templateEntity = this.templateEntities.find((entity) => {
      return entity.templateName == templateName;
    });
    if (templateEntity) {
      for (const field of templateEntity.templateFields) {
        if (field.templateFieldName) {
          result.push({ value: field.templateFieldName, label: field.templateFieldName });
        }
      }
    }
    return result;
  }

  async getTemplatesList(): Promise<{ label: string, value: string }[]> {
    const result: { label: string, value: string }[] = [];
    for (const entity of this.templateEntities) {
      if (entity.templateName) {
        result.push({ value: entity.templateName, label: entity.templateName });
      }
    }
    return result;
  }

  private notifyProgress() {
    if (this.progressCallback && this.taskProgress) {
      this.progressCallback(this.taskProgress);
    }
  }

  async orderEntitiesForProcessing(): Promise<IAcDataBridgeEntity[]> {
    let pendingEntities: IAcDataBridgeEntity[] = [...this.sourceEntities];
    this.processingEntities = [];
    let destinations: string[] = [];
    const maxIteration: number = 10;
    let currentIteration: number = 0;
    // console.log("Ordering entities for processing");
    while (pendingEntities.length > 0 && currentIteration < maxIteration) {
      // console.log(`Processing ${pendingEntities.length} pending entities! Iteration ${currentIteration}`);
      for (const entity of pendingEntities) {
        if (entity.templateName) {
          let pendingReferencedTemplate: boolean = false;
          // console.log(`Checking ${entity.templateName} for foreign key refereneces...`);
          for (const field of entity.fields) {
            if(field.destinationName){
                if (!destinations.includes(field.destinationName)) {
                  destinations.push(field.destinationName);
                }
              }
            if (field.foreignKeyTemplateName && field.foreignKeyTemplateName != '' && field.foreignKeyTemplateFieldName && field.foreignKeyTemplateFieldName != '') {
              const templateName = field.foreignKeyTemplateName;
              // console.log(`Foreign key template found ${templateName} for field ${field.templateFieldName}`);
              const finalizedTemplateEntity = this.processingEntities.find((entity) => {
                return entity.templateName == templateName
              });
              if (!finalizedTemplateEntity) {
                // console.log(`Referencing template ${templateName} for field ${field.templateFieldName} is not finalzied yed`);
                const pendingTemplateEntity = pendingEntities.find((entity) => {
                  return entity.templateName == templateName
                });
                if (pendingTemplateEntity) {
                  pendingReferencedTemplate = true;
                }
              }
            }
          }
          if (!pendingReferencedTemplate) {
            // console.log("Finalized entity",entity);
            this.processingEntities.push(entity);
            const worker = new EntityWorker({ worker: this });
            worker.entity = entity;
            worker.templateDef = this.templateEntities.find((templateEntity)=>{
              return templateEntity.destinationName == entity.destinationName;
            });
            this.entityWorkers.set(entity.destinationName, worker);
          }
        }

      }
      // console.log(`Removing finalized entitities for next iteration`);
      pendingEntities = pendingEntities.filter((pendingEntity) => {
        let isFinalized: boolean = false;
        for (const finalizedEntity of this.processingEntities) {
          // console.log(`Entity ${finalizedEntity.templateName} is finalized so removing from pending list`);
          if (finalizedEntity.templateName == pendingEntity.templateName) {
            isFinalized = true;
          }
        }
        return !isFinalized;
      });
      // console.log(`New iteration has ${pendingEntities.length} pending entities`);
      currentIteration++;
    }

    for (const destination of destinations) {
      if (!this.entityWorkers.has(destination)) {
        const worker = new EntityWorker({ worker: this });
            worker.templateDef = this.templateEntities.find((templateEntity)=>{
              return templateEntity.destinationName == destination;
            });
        this.entityWorkers.set(destination, worker);
      }
    }
    return this.processingEntities;
  }

  async processEntities() {
    let totalCount: number = 0;
    const entityWorkers: EntityWorker[] = [];
    const subTasksProgress: IAcDataBridgeProgress[] = [];
    for (const worker of this.entityWorkers.values()) {
      if(worker.entity){
        totalCount += worker.entity.rowsCount;
        worker.progress = {
          id: `${worker.entity.destinationName}Worker`,
          completedCount: 0,
          totalCount: worker.entity.rowsCount,
          description: '',
          percentage: 0,
          title: `${worker.entity.sourceName}`,
        };
        subTasksProgress.push(worker.progress);
      }
    }
    this.taskProgress = {
      id: 'processEntities',
      completedCount: 0,
      totalCount: 0,
      percentage: 0,
      title: `Processing ${this.sourceEntities.length} worksheets`,
      description: `Processing ${totalCount} rows across ${this.sourceEntities.length} worksheets`,
      subTasksProgress: subTasksProgress
    };
    this.notifyInterval = setInterval(()=>{this.notifyProgress();},500);
    for (const worker of this.entityWorkers.values()) {
      if(worker.entity){
        await worker.processRows();
      }
    }
    clearInterval(this.notifyInterval);
    this.notifyProgress();
  }

  registerProgressCallback(cb: (progress: IAcDataBridgeProgress) => void) {
    this.progressCallback = cb;
  }

  async setDataDictionary({ dataDictionaryJson }: { dataDictionaryJson: any }) {
    this.dataDictionary = new AcDataDictionary();
    this.dataDictionary.fromJson({ jsonData: dataDictionaryJson });
  }

  private setDefaultMappings() {
    for (const entity of this.sourceEntities) {
      const templateEntity: IAcDataBridgeEntityTemplateDef | undefined = this.templateEntities.find((templateEntity: IAcDataBridgeEntityTemplateDef) => {
        return templateEntity.templateName == entity.sourceName;
      });
      if (templateEntity) {
        entity.templateName = templateEntity.templateName;
        entity.destinationName = templateEntity.destinationName ?? '';
        for (const col of entity.fields) {
          const templateField = templateEntity.templateFields.find((templateCol: IAcDataBridgeField) => {
            return templateCol.templateFieldName == col.sourceFieldName;
          });
          if (templateField) {
            col.destinationFieldName = templateField.destinationFieldName;
            col.destinationName = templateField.destinationName;
            col.templateFieldName = templateField.templateFieldName;
            col.isTemplatePrimaryKey = templateField.isTemplatePrimaryKey;
            col.foreignKeyTemplateFieldName = templateField.foreignKeyTemplateFieldName;
            col.foreignKeyTemplateName = templateField.foreignKeyTemplateName;
            col.templateName = entity.templateName;

          }
          else if (col.sourceFieldName == AC_DATA_BRIDGE_DEFAULTS.sourceColumnUidLabel) {
            // col.destinationFieldName = AC_DATA_BRIDGE_DEFAULTS.sourceColumnUidName;
          }
        }
      } else {
        //
      }
    }
  }

  async setSourceEntities() {
    if (!this.data) {
      this.notifyProgress();
      return;
    }
    const workbook = XLSX.read(this.data, { type: "array", });
    const totalSheets = workbook.SheetNames.length;
    let sheetIndex = 0;
    this.taskProgress = {
      id: 'setEntities',
      completedCount: 0,
      percentage: 0,
      totalCount: workbook.SheetNames.length,
      description: `Getting worksheet details...`,
      title: 'Processing worksheets'
    };

    workbook.SheetNames.forEach((sheetName, index) => {
      sheetIndex++;
      const taskPercent = Math.round((sheetIndex / totalSheets) * 100);
      const worksheet = workbook.Sheets[sheetName];
      const json: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = (json[0] as string[]) || [];
      const rows: any[] = [];
      let foundHeaders: boolean = false;
      for (const row of json) {
        if (foundHeaders) {
          const data: any = {};
          let index = 0;
          for (const key of headers) {
            if (key) {
              data[key] = row[index];
            }
            index++;
          }
          rows.push(data);
        }
        else {
          foundHeaders = true;
        }
      }

      const cleanHeaders = headers
        .map((h) => (h ?? "").toString().trim())
        .filter((h) => h);

      const columns: IAcDataBridgeField[] = [];
      for (const col of cleanHeaders) {
        columns.push({ sourceFieldName: col, sourceName: sheetName, templateName: '', templateFieldName: '' });
      }

      this.sourceEntities.push({
        sourceName: sheetName,
        destinationName: '',
        fields: [...columns],
        rowsCount: json.length,
        rows: rows,
        processedCount: 0,
        completedCount: 0,
        errorCount: 0
      });
    });
    this.setDefaultMappings();
  }

  async setExistingEntities({ sourceEntities }: { sourceEntities: IAcDataBridgeExistingEntity[] }) {
    this.existingEntities = sourceEntities;
  }

  async setData({ buffer }: { buffer: ArrayBuffer }): Promise<IAcDataBridgeEntity[]> {
    this.taskProgress = {
      id: 'setData',
      completedCount: 0,
      totalCount: 0,
      percentage: 0,
      description: `0% completed`,
      title: 'Reading file'
    };
    const totalSize = buffer.byteLength;
    const chunkSize = 256 * 1024;
    let offset = 0;
    const chunks: Uint8Array[] = [];
    const fullData = new Uint8Array(buffer);
    const totalChunks = Math.ceil(totalSize / chunkSize);
    this.taskProgress.totalCount = totalChunks;
    let chunkCount = 0;
    while (offset < totalSize) {
      const end = Math.min(offset + chunkSize, totalSize);
      const chunk = fullData.slice(offset, end);
      chunks.push(chunk);
      offset = end;
      chunkCount++;
      const taskPercent = Math.round((chunkCount / totalChunks) * 100);
      this.taskProgress.completedCount = chunkCount;
      this.taskProgress.description = `${taskPercent} completed`;
      this.taskProgress.percentage = taskPercent;
      this.notifyProgress();
    }
    this.data = fullData;
    this.taskProgress = {
      id: 'setData',
      completedCount: 100,
      totalCount: 100,
      percentage: 1000,
      description: `Reading worksheets...`,
      title: 'Extracting data'
    };
    this.notifyProgress();
    this.setSourceEntities();
    return this.sourceEntities;
  }

  async setTemplateEntities({ entities }: { entities: IAcDataBridgeEntityTemplateDef[] }) {
    this.templateEntities = entities;
    console.log(this);
  }

}
