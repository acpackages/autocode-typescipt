/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @nx/enforce-module-boundaries */
import * as Comlink from 'comlink';
import { AcDataBridgeWorker } from "../workers/ac-data-bridge.worker";
import { AcEvents, acNullifyInstanceProperties } from '@autocode-ts/autocode';
import { IAcDataBridgeEntity } from '../interfaces/ac-data-bridge-entity.interface';
import { AcDataBridgeSocket } from './ac-data-bridge-socket';
import { IAcDataBridgeExistingEntity } from '../interfaces/ac-data-bridge-existing-entity.interface';
import { IAcDataBridgeEntityTemplateDef, IAcDataBridgeEntityTemplateExtend } from '../interfaces/ac-data-bridge-entity-template-def.interface';
import { IAcDataBridgeProgress } from '../interfaces/ac-data-bridge-progress.interface';
import { IAcDataBridgeField } from '@autocode-ts/ac-data-bridge';
import { IAcDataBridgeBeforeAddRequestArgs } from '../interfaces/ac-data-bridge-before-add-request-args.interface';
import { IAcDataBridgeBeforeAddResponse } from '../interfaces/ac-data-bridge-before-add-response.interface';
export type AcDataBridgeStage = 'NONE' | 'GETTING_EXISTING_DATA' | 'DATA_SET' | 'PROCESSING' | 'READY_TO_CONVERT' | 'CONVERTING' | 'COMPLETED' | 'ERROR' | 'SETTING_DATA' | 'GENERATING_FILE' | 'IMPORTING';

export class AcDataBridge {
  private _currentStage: AcDataBridgeStage = 'NONE';
  get currentStage(): AcDataBridgeStage {
    return this._currentStage;
  }
  set currentStage(val: AcDataBridgeStage) {
    if (val != this._currentStage) {
      this._currentStage = val;
      this.events.execute({ event: 'currentStageChange' });
    }
  }

  private _beforeAddEntityRow: ((args: IAcDataBridgeBeforeAddRequestArgs) => Promise<IAcDataBridgeBeforeAddResponse>) | undefined;
  get beforeAddEntityRow(): ((args: IAcDataBridgeBeforeAddRequestArgs) => Promise<IAcDataBridgeBeforeAddResponse>) | undefined {
    return this._beforeAddEntityRow;
  }
  set beforeAddEntityRow(val: ((args: IAcDataBridgeBeforeAddRequestArgs) => Promise<IAcDataBridgeBeforeAddResponse>) | undefined) {
    if (val != this._beforeAddEntityRow) {
      this._beforeAddEntityRow = val;
      this.api!.registerBeforeAddEntityRowCallback(Comlink.proxy(async (args: IAcDataBridgeBeforeAddRequestArgs): Promise<IAcDataBridgeBeforeAddResponse> => {
        return this._beforeAddEntityRow!(args);
      }));
    }
  }

  private worker: Worker;
  private api: AcDataBridgeWorker | any;
  socket: AcDataBridgeSocket = new AcDataBridgeSocket();

  sourceEntities: IAcDataBridgeEntity[] = [];
  templateEntities: Record<string, IAcDataBridgeEntityTemplateDef> = {};
  processingEntities: Record<string, IAcDataBridgeEntity> = {};
  destinationEntities: Record<string, IAcDataBridgeEntity> = {};
  events: AcEvents = new AcEvents();
  destinationTables: { label: string, value: string }[] = [];
  taskProgress?: IAcDataBridgeProgress;
  getExistingEntitiesDataFunction?: (({ destinations }: { destinations: string[] }) => Promise<Record<string, any[]>>);

  constructor({ worker }: { worker: Worker }) {
    this.worker = worker;
    this.api = Comlink.wrap(worker);
    this.socket.on('progress', (progress: IAcDataBridgeProgress): void => {
      this.setTaskProgress({progress});
    });
    this.api!.registerSocketCallback(Comlink.proxy((event: string, data: any): void => {
      this.socket.emit(event, data);
    }));
  }

  async convertRowsForSqlOperations(): Promise<any> {
    this.currentStage = 'CONVERTING';
    const result = await this.api.convertRowsForSqlOperations();
    this.currentStage = 'COMPLETED';
    return result;
  }

  destroy() {
    this.worker.terminate();
    this.events.destroy();
    this.socket.destroy();
    acNullifyInstanceProperties({ instance: this });
  }

  private downloadFile({ fileName, content, type }: { fileName: string, content: BlobPart, type: string }) {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }


  async generateSqlFile({ fileName = "data" }: { fileName?: string } = {}): Promise<void> {
    const previousState = this.currentStage;
    this.currentStage = 'GENERATING_FILE';
    const content = await this.api.generateSqlContent();
    this.downloadFile({ fileName: `${fileName}.sql`, content, type: 'text/sql' });
    this.currentStage = previousState;
  }

  async generateXlsxFile({ destinationName, fileName = "data" }: { destinationName?: string, fileName?: string } = {}): Promise<void> {
    const previousState = this.currentStage;
    this.currentStage = 'GENERATING_FILE';
    const content = await this.api.generateXlsxContent({ destinationName });
    const finalFileName = destinationName || fileName;
    this.downloadFile({ fileName: `${finalFileName}.xlsx`, content, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    this.currentStage = previousState;
  }

  async generateJsonFile({ fileName = "data" }: { fileName?: string } = {}): Promise<void> {
    const previousState = this.currentStage;
    this.currentStage = 'GENERATING_FILE';
    let content = '';
    let finalFileName = fileName;
    content = await this.api.generateAllJsonContent();
    this.downloadFile({ fileName: `${finalFileName}.json`, content, type: 'application/json' });
    this.currentStage = previousState;
  }

  async getSqlStatements({comments = false,newLine = false}:{comments?:boolean,newLine?:boolean} = {}): Promise<void> {
    const content = await this.api.generateSqlContent({comments,newLine});
    return content;
  }  

  emitSocket(event: string, data?: any) {
    this.api.emitSocketEvent(event, data);
  }

  async getTemplateFieldsList({ templateName }: { templateName: string }): Promise<{ label: string, value: string }[]> {
    return this.api.getTemplateFieldsList({ templateName });
  }

  async getTemplatesList(): Promise<{ label: string, value: string }[]> {
    return this.api.getTemplatesList();
  }

  handleDownloadXlsxTemplate() {
    // this.appService.openModal({ component: ImportColumnsSelectionComponent });
  }

  offSocket(event: string, callback: Function) {
    this.socket.off(event, callback);
  }

  on({ event, callback }: { event: string, callback: Function }) {
    return this.events.subscribe({ event, callback });
  }

  onSocket(event: string, callback: Function) {
    this.socket.on(event, callback);
  }

  async setData({ buffer }: { buffer: ArrayBuffer }) {
    this.currentStage = 'SETTING_DATA';
    this.sourceEntities = await this.api.setData({ buffer });
    this.currentStage = 'DATA_SET';
  }

  async setDataDictionary({ dataDictionaryJson }: { dataDictionaryJson: any }) {
    this.api.setDataDictionary({ dataDictionaryJson });
  }

  async setExistingEntities({ entities }: { entities: IAcDataBridgeExistingEntity[] }) {
    await this.api.setExistingEntities({ entities });
  }

  setTaskProgress({progress}:{progress: IAcDataBridgeProgress}){
    this.events.execute({ event: 'taskProgress', args: { progress, isRoot: true } });
      if (progress.subTasksProgress && progress.subTasksProgress.length > 0) {
        for (const subTaskProgress of progress.subTasksProgress!) {
          this.events.execute({ event: 'taskProgress', args: { progress: subTaskProgress, isRoot: false } });
        }
      }
      this.taskProgress = progress;
  }

  async setTemplateEntities({ entities }: { entities: IAcDataBridgeEntityTemplateDef[] }) {
    const resolveExtendedTemplateFields: Function = ({ extendDetails, entity, isChildTemplate = false, extensionTemplateHierarchy }: { extendDetails: IAcDataBridgeEntityTemplateExtend, entity: IAcDataBridgeEntity, isChildTemplate?: boolean, extensionTemplateHierarchy: string[] }): IAcDataBridgeField[] => {
      let extendingFields: IAcDataBridgeField[] = [];
      const templateName: string = extendDetails.templateName;
      const templateEntity = entities.find((entity) => {
        return entity.templateName == templateName;
      });
      if (templateEntity) {
        for (const templateField of templateEntity.templateFields) {
          if (templateField.templateFieldName) {
            let includeField: boolean = true;
            if (extendDetails.excludeFields && extendDetails.excludeFields.includes(templateField.templateFieldName)) {
              includeField = false;
            }
            else if (extendDetails.includeFields) {
              includeField = false;
              if (extendDetails.includeFields.includes(templateField.templateFieldName)) {
                includeField = true;
              }
            }
            if (includeField) {
              const field = { ...templateField, extensionTemplateHierarchy: [templateName, ...extensionTemplateHierarchy] };
              if (extendDetails.referencingFields && field.templateFieldName) {
                for (const referenceField of extendDetails.referencingFields) {
                  if (referenceField.extendingTemplateFieldName == field.templateFieldName) {
                    field.foreignKeyTemplateFieldName = field.templateFieldName;
                    field.foreignKeyTemplateName = templateEntity.templateName;
                    field.destinationName = entity.destinationName;
                    field.isDestinationPrimaryKey = undefined;
                    field.isTemplatePrimaryKey = undefined;
                    if (referenceField.templateDestinationFieldName) {
                      field.destinationFieldName = referenceField.templateDestinationFieldName;
                    }
                  }
                  else if (referenceField.lookupFields) {
                    if (referenceField.lookupFields.includes(field.templateFieldName)) {
                      field.foreignKeyTemplateFieldName = field.templateFieldName;
                      field.foreignKeyTemplateName = templateEntity.templateName;
                      field.isLookupTemplateField = true;
                      field.isDestinationPrimaryKey = undefined;
                      field.isTemplatePrimaryKey = undefined;
                      field.destinationName = entity.destinationName;
                      if (referenceField.templateDestinationFieldName) {
                        field.destinationFieldName = referenceField.templateDestinationFieldName;
                      }
                    }
                  }
                }
              }
              else {
                if (isChildTemplate) {
                  if (templateField.isTemplatePrimaryKey) {
                    includeField = false;
                  }
                }
              }
              if (includeField) {
                if (!field.destinationName || field.destinationName == "") {
                  if (!field.isTemplatePrimaryKey) {
                    field.destinationName = templateEntity.destinationName;
                  }
                }
                extendingFields.push(field);
              }
            }
          }
        }
        if (templateEntity.extendChildTemplates) {
          if (templateEntity.extendChildTemplates) {
            for (const templateExtendDetails of templateEntity.extendChildTemplates) {
              extendingFields = [...extendingFields, ...resolveExtendedTemplateFields({ extendDetails: templateExtendDetails, entity: templateEntity, isChildTemplate: true, extensionTemplateHierarchy: [templateEntity.templateName, ...extensionTemplateHierarchy] })];
            }
          }
        }
        if (templateEntity.extendParentTemplates) {
          if (templateEntity.extendParentTemplates) {
            for (const templateExtendDetails of templateEntity.extendParentTemplates) {
              extendingFields = [...extendingFields, ...resolveExtendedTemplateFields({ extendDetails: templateExtendDetails, entity: templateEntity, extensionTemplateHierarchy: [templateEntity.templateName, ...extensionTemplateHierarchy] })];
            }
          }
        }
      }
      return extendingFields;
    };
    for (const entity of entities) {
      const template: IAcDataBridgeEntityTemplateDef = {
        templateName: entity.templateName,
        destinationName: entity.destinationName,
        templateFields: [...entity.templateFields],
        extendChildTemplates: entity.extendChildTemplates,
        extendParentTemplates: entity.extendParentTemplates,
      };
      for (const templateField of template.templateFields) {
        if (!templateField.destinationName || templateField.destinationName == "") {
          if (!templateField.isTemplatePrimaryKey) {
            templateField.destinationName = entity.destinationName;
          }
        }
      }
      if (entity.extendChildTemplates) {
        for (const extendDetails of entity.extendChildTemplates) {
          template.templateFields = [...template.templateFields, ...resolveExtendedTemplateFields({ extendDetails, entity, isChildTemplate: true, extensionTemplateHierarchy: [entity.templateName] })];
        }
      }
      if (entity.extendParentTemplates) {
        for (const extendDetails of entity.extendParentTemplates) {
          template.templateFields = [...template.templateFields, ...resolveExtendedTemplateFields({ extendDetails, entity, extensionTemplateHierarchy: [entity.templateName] })];
        }
      }
      this.templateEntities[entity.destinationName] = template;
    }
    await this.api.setTemplateEntities({ entities: this.templateEntities });
  }

  async startProcessingEntities() {
    this.processingEntities = await this.api.orderEntitiesForProcessing();
    if (this.getExistingEntitiesDataFunction) {
      this.currentStage = 'GETTING_EXISTING_DATA';
      const existingEntitiesData = await this.getExistingEntitiesDataFunction({ destinations: await this.api.getWorkerEntityDestinations() });
      this.api.setExistingData({ data: existingEntitiesData });
    }
    this.currentStage = 'PROCESSING';
    this.destinationEntities = await this.api.processEntities();
    this.currentStage = 'READY_TO_CONVERT';
  }

}
