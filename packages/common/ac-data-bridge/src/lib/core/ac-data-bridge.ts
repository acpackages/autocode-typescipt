/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @nx/enforce-module-boundaries */
import * as Comlink from 'comlink';
import { AcDataBridgeWorker } from "../workers/ac-data-bridge.worker";
import { AcEvents, acNullifyInstanceProperties } from '@autocode-ts/autocode';
import { IAcDataBridgeEntity } from '../interfaces/ac-data-bridge-entity.interface';
import { IAcDataBridgeExistingEntity } from '../interfaces/ac-data-bridge-existing-entity.interface';
import { IAcDataBridgeEntityTemplateDef, IAcDataBridgeEntityTemplateExtend } from '../interfaces/ac-data-bridge-entity-template-def.interface';
import { IAcDataBridgeProgress } from '../interfaces/ac-data-bridge-progress.interface';
import { IAcDataBridgeField } from '@autocode-ts/ac-data-bridge';
export type AcDataBridgeStage = 'NONE' | 'DATA_SET' | 'PROCESSING'|'READY_TO_CONVERT'|'CONVERTING'|'COMPLETED';

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

  private worker: Worker;
  private api: AcDataBridgeWorker | any;

  sourceEntities: IAcDataBridgeEntity[] = [];
  templateEntities:IAcDataBridgeEntityTemplateDef[] = [];
  processingEntities: IAcDataBridgeEntity[] = [];
  destinationEntities: Record<string,IAcDataBridgeEntity> = {};
  events: AcEvents = new AcEvents();
  destinationTables: { label: string, value: string }[] = [];
  getExistingEntitiesFunction?: Function;
  taskProgress?: IAcDataBridgeProgress;

  constructor({ worker }: { worker: Worker }) {
    this.worker = worker;
    this.api = Comlink.wrap(worker);
    this.api!.registerProgressCallback(Comlink.proxy((progress: IAcDataBridgeProgress): void => {
      this.taskProgress = progress;
      // this.updateProgressThrottled(progress);
    }));
  }

  destroy() {
    this.worker.terminate();
    this.events.destroy();
    acNullifyInstanceProperties({ instance: this });
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



  async setData({ buffer }: { buffer: ArrayBuffer }) {
    this.sourceEntities = await this.api.setData({ buffer });
    this.currentStage = 'DATA_SET';
  }

  async setDataDictionary({ dataDictionaryJson }: { dataDictionaryJson: any }) {
    this.api.setDataDictionary({ dataDictionaryJson });
  }

  async setExistingEntities({ entities }: { entities: IAcDataBridgeExistingEntity[] }) {
    await this.api.setExistingEntities({ entities });
  }

  async setTemplateEntities({ entities }: { entities: IAcDataBridgeEntityTemplateDef[] }) {
    const templates: IAcDataBridgeEntityTemplateDef[] = [];
    const resolveExtendedTemplateFields: Function = ({ extendDetails, entity, isChildTemplate = false }: { extendDetails: IAcDataBridgeEntityTemplateExtend, entity: IAcDataBridgeEntity,isChildTemplate?:boolean }): IAcDataBridgeField[] => {
      let extendingFields: IAcDataBridgeField[] = [];
      // console.log(`Resolving extended fields for ${entity.templateName}`,extendDetails);
      const templateName: string = extendDetails.templateName;
      // console.log(`Looking for template ${templateName}`);
      const templateEntity = entities.find((entity) => {
        return entity.templateName == templateName;
      });
      if (templateEntity) {
        // console.log(`Found template entity for template ${templateName}`);
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
              const field = { ...templateField };
              if (extendDetails.referencingFields && field.templateFieldName) {
                for (const referenceField of extendDetails.referencingFields) {
                  if (referenceField.extendingTemplateFieldName == field.templateFieldName) {
                    // console.log("Found refernece field",referenceField);
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
                      // console.log("Found lookup field",referenceField);
                      field.foreignKeyTemplateFieldName = field.templateFieldName;
                      field.foreignKeyTemplateName = templateEntity.templateName;
                      field.isLookupTemplateField = true;
                      field.isDestinationPrimaryKey = undefined;
                      field.isTemplatePrimaryKey = undefined;
                      field.destinationName = undefined;
                      field.destinationFieldName = undefined;
                    }
                  }
                }
              }
              else{
                if(isChildTemplate){
                  if(templateField.isTemplatePrimaryKey){
                    includeField = false;
                  }
                }
              }
              if(includeField){
                extendingFields.push(field);
              }
            }
          }
        }
        if (templateEntity.extendChildTemplates) {
          if (templateEntity.extendChildTemplates) {
            for (const templateExtendDetails of templateEntity.extendChildTemplates) {
              extendingFields = [...extendingFields, ...resolveExtendedTemplateFields({ extendDetails: templateExtendDetails,entity:templateEntity,isChildTemplate:true })];
            }
          }
        }
        if (templateEntity.extendParentTemplates) {
          if (templateEntity.extendParentTemplates) {
            for (const templateExtendDetails of templateEntity.extendParentTemplates) {
              extendingFields = [...extendingFields, ...resolveExtendedTemplateFields({ extendDetails: templateExtendDetails,entity:templateEntity })];
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
        templateFields: [...entity.templateFields]
      };
      if (entity.extendChildTemplates) {
        for (const extendDetails of entity.extendChildTemplates) {
          template.templateFields = [...template.templateFields, ...resolveExtendedTemplateFields({ extendDetails, entity,isChildTemplate:true })];
        }
      }
      if (entity.extendParentTemplates) {
        for (const extendDetails of entity.extendParentTemplates) {
          template.templateFields = [...template.templateFields, ...resolveExtendedTemplateFields({ extendDetails, entity })];
        }
      }
      templates.push(template);
    }
    this.templateEntities = templates;
    await this.api.setTemplateEntities({ entities: templates });
  }

  async startProcessingEntities() {
    this.processingEntities = await this.api.orderEntitiesForProcessing();
    if (this.getExistingEntitiesFunction) {
      this.setExistingEntities({ entities: await this.getExistingEntitiesFunction() });
    }
    this.currentStage = 'PROCESSING';
    this.destinationEntities = await this.api.processEntities();
    this.currentStage = 'READY_TO_CONVERT';
  }

}
