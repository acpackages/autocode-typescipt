/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { AcEnumConditionOperator, AcEnumLogicalOperator, acEvaluateFilterGroup, Autocode, IAcFilterGroup } from "@autocode-ts/autocode";

class EntityWorker {
  private worker: AcDataBridgeWorker;
  logMessages: boolean = false;
  entity?: IAcDataBridgeEntity;
  progress?: IAcDataBridgeProgress;
  processedRows: IAcDataBridgeProcesedRow[] = [];
  templateDef?: IAcDataBridgeEntityTemplateDef;
  private dataKeys: string[] = [];

  get primaryKeyFieldName(): string | undefined {
    let result: any;
    if (this.templateDef) {
      const primaryField = this.templateDef.templateFields.find((field) => {
        return field.isDestinationPrimaryKey
      });
      if (primaryField) {
        result = primaryField.destinationFieldName;
      }
    }
    return result;
  }

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
    let primaryKeyValue: any;
    let primaryKeyField: any;
    let templateUniqueKeyField: string | undefined;
    let sourceUniqueValue: string = '';
    const saveRow: any = { ...row };
    if (this.templateDef) {
      for (const field of this.templateDef.templateFields) {
        if (field.isDestinationPrimaryKey && field.destinationFieldName && field.destinationName == this.templateDef.destinationName) {
          primaryKeyField = field.destinationFieldName;
          if (saveRow[field.destinationFieldName]) {
            primaryKeyValue = saveRow[field.destinationFieldName];
          }
        }
        if (field.isTemplatePrimaryKey && field.templateFieldName) {
          templateUniqueKeyField = field.templateFieldName;
        }
      }
    }
    if (primaryKeyValue == undefined || primaryKeyValue == null) {
      primaryKeyValue = Autocode.uuid();
    }
    if (primaryKeyField) {
      saveRow[primaryKeyField] = primaryKeyValue;
    }
    if (templateUniqueKeyField) {
      if (sourceRow[templateUniqueKeyField]) {
        sourceUniqueValue = sourceRow[templateUniqueKeyField];
      }
    }
    for (const key of Object.keys(saveRow)) {
      if (!this.dataKeys.includes(key)) {
        this.dataKeys.push(key);
      }
    }
    this.processedRows.push({ data: saveRow, operation: 'INSERT', rowId: primaryKeyValue, sourceRow, sourceRowId: sourceUniqueValue, status: 'PENDING' });
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

  getDestinationEntity(): IAcDataBridgeEntity {
    const processedRows: Record<string, IAcDataBridgeProcesedRow> = {};
    for (const row of this.processedRows) {
      processedRows[row.rowId] = row;
    }
    const fields: IAcDataBridgeField[] = [];
    for (const field of this.templateDef!.templateFields) {
      if (field.destinationName && field.destinationFieldName && field.destinationName == this.templateDef?.destinationName && this.dataKeys.includes(field.destinationFieldName)) {
        fields.push(field);
      }
    }
    return {
      destinationName: this.templateDef!.destinationName,
      rows: [],
      fields: fields,
      processedCount: 0,
      completedCount: 0,
      errorCount: 0,
      rowsCount: this.processedRows.length,
      templateName: this.templateDef!.templateName,
      sourceName: '',
      processedRows
    }
  }

  async getRows({ sourceRowId, rowId, rowFilters, sourceRowFilters }: { sourceRowId?: string, rowId?: string, rowFilters?: IAcFilterGroup, sourceRowFilters?: IAcFilterGroup }): Promise<any[]> {
    let result: any[] = [];
    for (const processedRow of this.processedRows) {
      if (rowId && processedRow.rowId == rowId) {
        result.push(processedRow.data);
      }
      else if (sourceRowId && processedRow.sourceRowId == sourceRowId) {
        result.push(processedRow.data);
      }
      else if (rowFilters) {
        if (acEvaluateFilterGroup({ group: rowFilters, data: processedRow.data })) {
          result.push(processedRow.data);
        }
      }
      else if (sourceRowFilters) {
        if (acEvaluateFilterGroup({ group: sourceRowFilters, data: processedRow.sourceRow })) {
          result.push(processedRow.data);
        }
      }
    }
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

  async processRows() {
    if (this.entity && this.templateDef) {
      // console.warn(`Processing rows for template : ${this.templateDef.templateName}`)
      let previousRow: any;
      let originalRow: any;
      let uniqueCheckKeys: string[] = [];
      if (this.progress) {
        this.progress.completedCount++;
      }
      if (this.worker.taskProgress) {
        this.worker.taskProgress.completedCount++;
      }
      const setValueInTargetDestinationField: Function = ({ target, destination, key, value }: { target: any, destination: string, key: string, value: any }) => {
        if (!target[destination]) {
          target[destination] = {};
        }
        target[destination][key] = value;
      };
      for (const row of this.entity.rows) {
        if (!this.checkRowIsEmpty({ row })) {
          const destinationsRow: any = {};
          const isDuplicate: boolean = this.checkRowValuesMatch({ previousRow, originalRow, row, keys: uniqueCheckKeys });
          if (!isDuplicate) {
            for (const field of this.entity.fields) {
              if (field.templateFieldName) {
                const value = row[field.templateFieldName];
                if (value) {
                  if (field.foreignKeyTemplateName && field.foreignKeyTemplateFieldName) {
                    // console.log(`Found foreign key template ${field.foreignKeyTemplateName} and field ${field.foreignKeyTemplateFieldName} with value : ${value}`);
                    const referencingTemplate = this.worker.templateEntities.find((templateEntity) => {
                      return templateEntity.templateName == field.foreignKeyTemplateName;
                    });
                    if (referencingTemplate && referencingTemplate.destinationName) {
                      // console.log(`Found referencing template for ${field.foreignKeyTemplateName} and field ${field.foreignKeyTemplateFieldName}`)
                      if (this.worker.entityWorkers.has(referencingTemplate.destinationName)) {
                        // console.log(`Worker for referencing template destination ${referencingTemplate.destinationName} found`);
                        const referencingWorker: EntityWorker = this.worker.entityWorkers.get(referencingTemplate.destinationName)!;
                        const getRowParams = {
                          sourceRowFilters: {
                            operator: AcEnumLogicalOperator.And, filters: [
                              { key: field.foreignKeyTemplateFieldName, operator: AcEnumConditionOperator.EqualTo, value: value }
                            ]
                          }
                        };
                        const referenceRows = await referencingWorker.getRows(getRowParams);
                        // console.log(`Referencing rows count for field ${field.foreignKeyTemplateFieldName} with value ${value} = ${referenceRows.length}`);
                        if (referenceRows.length > 0) {
                          const referenceData = referenceRows[0];
                          if (referenceData) {
                            // console.log(referenceData);
                            let lookupDestinationField: string | undefined;
                            const primaryKeyFieldName = referencingWorker.primaryKeyFieldName;
                            if (primaryKeyFieldName) {
                              lookupDestinationField = referencingWorker.primaryKeyFieldName;
                            }
                            if (field.isLookupTemplateField && field.lookupForTemplateField && field.lookupForTemplateField != '') {
                              lookupDestinationField = "";
                              const lookupField = this.templateDef.templateFields.find((templateField) => {
                                return templateField.templateFieldName == field.lookupForTemplateField;
                              });
                              if (lookupField) {
                                lookupDestinationField = lookupField.destinationFieldName;
                              }
                            }
                            if (lookupDestinationField && lookupDestinationField != "" && primaryKeyFieldName) {
                              setValueInTargetDestinationField({ target: destinationsRow, destination: this.templateDef.destinationName, key: lookupDestinationField, value: referenceData[primaryKeyFieldName] });
                            }
                          }
                          else {
                            // console.log(getRowParams,referenceData);
                          }
                        }
                      }
                    }
                  }
                  else if (field.destinationName && field.destinationFieldName && field.templateFieldName) {
                    setValueInTargetDestinationField({ target: destinationsRow, destination: field.destinationName, key: field.destinationFieldName, value: row[field.templateFieldName] });
                  }
                }
              }
            }
          }
          for (const key of Object.keys(destinationsRow)) {
            if (this.worker.entityWorkers.has(key)) {
              const entityWorker = this.worker.entityWorkers.get(key);
              // console.log(`Adding row in worker ${key}`);
              entityWorker?.addRow({ row: destinationsRow[key], sourceRow: row });
            }
          }
          originalRow = row;
        }
        previousRow = row;
        if (this.progress) {
          this.progress.completedCount++;
          this.progress.percentage = Math.round((this.progress.completedCount / this.progress.totalCount) * 100);
          if (this.worker.taskProgress) {
            this.worker.taskProgress.completedCount++;
            this.worker.taskProgress.percentage = Math.round((this.worker.taskProgress.completedCount / this.worker.taskProgress.totalCount) * 100)
          }
          this.worker.notifyProgress();
        }
      }
      this.worker.notifyProgress(true);
    }
  }
}

export class AcDataBridgeWorker {
  private data?: Uint8Array;
  private progressCallback?: (progress: IAcDataBridgeProgress) => void;
  private destinationEntities: Record<string, IAcDataBridgeEntity> = {};
  private processingEntities: IAcDataBridgeEntity[] = [];
  private sourceEntities: IAcDataBridgeEntity[] = [];
  private existingEntities: IAcDataBridgeExistingEntity[] = [];
  private dataDictionary?: AcDataDictionary;
  private lastNotificationTime: number = Date.now();

  entityWorkers: Map<string, EntityWorker> = new Map();
  taskProgress?: IAcDataBridgeProgress;
  templateEntities: IAcDataBridgeEntityTemplateDef[] = [];

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

  notifyProgress(force: boolean = false) {
    if (this.progressCallback && this.taskProgress) {
      if (Date.now() - this.lastNotificationTime >= 500 || force) {
        this.lastNotificationTime = Date.now();
        this.progressCallback(this.taskProgress);
      }
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
            if (field.destinationName) {
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
            worker.templateDef = this.templateEntities.find((templateEntity) => {
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
        worker.templateDef = this.templateEntities.find((templateEntity) => {
          return templateEntity.destinationName == destination;
        });
        this.entityWorkers.set(destination, worker);
      }
    }
    return this.processingEntities;
  }

  async processEntities(): Promise<Record<string, IAcDataBridgeEntity>> {
    let totalCount: number = 0;
    const entityWorkers: EntityWorker[] = [];
    const subTasksProgress: IAcDataBridgeProgress[] = [];
    for (const worker of this.entityWorkers.values()) {
      if (worker.entity) {
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
      totalCount: totalCount,
      percentage: 0,
      title: `Processing ${this.sourceEntities.length} worksheets`,
      description: `Processing ${totalCount} rows across ${this.sourceEntities.length} worksheets`,
      subTasksProgress: subTasksProgress
    };
    this.notifyProgress(true);
    for (const worker of this.entityWorkers.values()) {
      if (worker.entity) {
        await worker.processRows();
      }
    }
    this.notifyProgress(true);
    let convertingRows: number = 0;
    for (const worker of this.entityWorkers.values()) {
      const destinationEntity = worker.getDestinationEntity();
      if (destinationEntity.rowsCount > 0) {
        convertingRows += destinationEntity.rowsCount;
        this.destinationEntities[destinationEntity.templateName!] = destinationEntity;
      }
    }
    this.taskProgress = {
      id: 'convertEntities',
      completedCount: 0,
      totalCount: convertingRows,
      percentage: 0,
      title: `Data ready to convert`,
      description: `${convertingRows} data rows across ${Object.keys(this.destinationEntities).length} templates are ready to convert`,
    };
    this.notifyProgress(true);
    return this.destinationEntities;
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
    this.notifyProgress(true);
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
      percentage: 100,
      description: `Reading worksheets...`,
      title: 'Extracting data'
    };
    this.setSourceEntities();
    this.notifyProgress(true);
    return this.sourceEntities;
  }

  async setTemplateEntities({ entities }: { entities: IAcDataBridgeEntityTemplateDef[] }) {
    this.templateEntities = entities;
  }

}
