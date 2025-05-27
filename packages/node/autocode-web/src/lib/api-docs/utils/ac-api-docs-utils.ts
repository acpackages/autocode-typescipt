import {
  AcEnumApiDataFormat,
  AcEnumApiDataType,
  AcEnumHttpResponseCode,
  AcApiDoc,
  AcApiDocModel,
  AcApiDocContent,
  AcApiDocResponse,
} from 'autocode_web';
import { AcEnumDDColumnType, AcDDTable } from 'autocode_data_dictionary';

export class AcApiDocUtils {
  static getApiDataFormatFromDataDictionaryDataType({
    dataType,
  }: {
    dataType: string;
  }): string {
    if (
      dataType === AcEnumDDColumnType.AUTO_INCREMENT ||
      dataType === AcEnumDDColumnType.INTEGER
    ) {
      return AcEnumApiDataFormat.INT64;
    } else if (dataType === AcEnumDDColumnType.DOUBLE) {
      return AcEnumApiDataFormat.DOUBLE;
    } else if (dataType === AcEnumDDColumnType.DATE) {
      return AcEnumApiDataFormat.DATE;
    } else if (dataType === AcEnumDDColumnType.DATETIME) {
      return AcEnumApiDataFormat.DATETIME;
    } else if (dataType === AcEnumDDColumnType.PASSWORD) {
      return AcEnumApiDataFormat.PASSWORD;
    }
    return '';
  }

  static getApiDataTypeFromDataDictionaryDataType({
    dataType,
  }: {
    dataType: string;
  }): string {
    if (
      dataType === AcEnumDDColumnType.AUTO_INCREMENT ||
      dataType === AcEnumDDColumnType.INTEGER
    ) {
      return AcEnumApiDataType.INTEGER;
    } else if (
      dataType === AcEnumDDColumnType.JSON ||
      dataType === AcEnumDDColumnType.MEDIA_JSON
    ) {
      return AcEnumApiDataType.OBJECT;
    } else if (dataType === AcEnumDDColumnType.DOUBLE) {
      return AcEnumApiDataType.NUMBER;
    }
    return AcEnumApiDataType.STRING;
  }

  static getApiModelRefFromAcDDTable({
    acDDTable,
    acApiDoc,
  }: {
    acDDTable: AcDDTable;
    acApiDoc: AcApiDoc;
  }): Record<string, any> {
    const existingModel = acApiDoc.models[acDDTable.tableName];
    if (existingModel) {
      return {
        $ref: `#/components/schemas/${existingModel.name}`,
      };
    }

    const acApiDocModel = new AcApiDocModel();
    acApiDocModel.name = acDDTable.tableName;

    const model: Record<string, any> = {};
    for (const column of acDDTable.tableColumns) {
      const columnType = this.getApiDataTypeFromDataDictionaryDataType({
        dataType: column.columnType,
      });
      const columnFormat = this.getApiDataFormatFromDataDictionaryDataType({
        dataType: column.columnType,
      });

      model[column.columnName] = { type: columnType };
      if (columnFormat) {
        model[column.columnName].format = columnFormat;
      }
    }

    acApiDocModel.properties = model;
    acApiDoc.addModel({ model: acApiDocModel });

    return {
      $ref: `#/components/schemas/${acApiDoc.models[acDDTable.tableName].name}`,
    };
  }

  static getApiModelRefFromClass({
    clazz,
    acApiDoc,
  }: {
    clazz: any;
    acApiDoc: AcApiDoc;
  }): Record<string, any> {
    const schemaName = clazz.name;

    if (acApiDoc.models[schemaName]) {
      return {
        $ref: `#/components/schemas/${acApiDoc.models[schemaName].name}`,
      };
    }

    const acApiDocModel = new AcApiDocModel();
    acApiDocModel.name = schemaName;
    acApiDocModel.properties = {};

    const prototype = clazz.prototype;
    const instance = new clazz();

    for (const key of Object.keys(instance)) {
      const value = instance[key];
      const typeName = typeof value;
      const propSchema: Record<string, any> = {};

      switch (typeName) {
        case 'number':
          propSchema.type = Number.isInteger(value) ? 'integer' : 'number';
          break;
        case 'boolean':
          propSchema.type = 'boolean';
          break;
        case 'string':
          propSchema.type = 'string';
          break;
        case 'object':
          if (Array.isArray(value)) {
            propSchema.type = 'array';
            propSchema.items = { type: 'object' }; // Default
          } else {
            propSchema['$ref'] = `#/components/schemas/${value?.constructor?.name || 'object'}`;
          }
          break;
        default:
          propSchema.type = 'string';
          break;
      }

      acApiDocModel.properties[key] = propSchema;
    }

    acApiDoc.addModel({ model: acApiDocModel });

    return {
      $ref: `#/components/schemas/${schemaName}`,
    };
  }

  static getApiDocRouteResponsesForOperation({
    operation,
    acDDTable,
    acApiDoc,
  }: {
    operation: string;
    acDDTable: AcDDTable;
    acApiDoc: AcApiDoc;
  }): AcApiDocResponse[] {
    const schema = this.getApiModelRefFromAcDDTable({
      acDDTable,
      acApiDoc,
    });

    const content = new AcApiDocContent();
    content.encoding = 'application/json';
    content.schema = {
      type: AcEnumApiDataType.OBJECT,
      properties: {
        code: {
          type: AcEnumApiDataType.INTEGER,
          enum: [1, 2, 3],
        },
        status: {
          type: AcEnumApiDataType.STRING,
          enum: ['success', 'failure'],
        },
        message: {
          type: AcEnumApiDataType.STRING,
        },
        rows: {
          type: AcEnumApiDataType.ARRAY,
          items: schema,
        },
      },
    };

    const response = new AcApiDocResponse();
    response.code = AcEnumHttpResponseCode.OK;
    response.description = 'Successful operation';
    response.addContent({ content });

    return [response];
  }
}
