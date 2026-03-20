/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcApiDoc } from '../models/ac-api-doc.model';
import { AcApiDocModel } from '../models/ac-api-doc-model.model';
import { AcApiDocPath } from '../models/ac-api-doc-path.model';

export class AcApiSwagger {
  acApiDoc!: AcApiDoc;

  constructor() {
    //
  }

  generateJson(): Record<string, any> {
    const result: Record<string, any> = {
      openapi: '3.0.4',
      components: { schemas: {} as Record<string, any> },
    };

    const docsJson = this.acApiDoc.toJson();

    if (docsJson[AcApiDoc.KEY_SERVERS]) {
      const servers = docsJson[AcApiDoc.KEY_SERVERS];
      if (Array.isArray(servers) && servers.length > 0) {
        result['servers'] = servers;
      }
    }

    if (docsJson[AcApiDoc.KEY_MODELS]) {
      const models = docsJson[AcApiDoc.KEY_MODELS];
      if (typeof models === 'object' && models !== null) {
        for (const model of Object.values(models) as any[]) {
          result['components']['schemas'][model[AcApiDocModel.KEY_NAME]] = {
            properties: model[AcApiDocModel.KEY_PROPERTIES],
          };
        }
      }
    }

    if (docsJson[AcApiDoc.KEY_PATHS]) {
      const paths = docsJson[AcApiDoc.KEY_PATHS];
      if (Array.isArray(paths) && paths.length > 0) {
        result['paths'] = {} as Record<string, any>;
        for (const path of paths) {
          const pathDetails = { ...path };
          const url = path[AcApiDocPath.KEY_URL];
          delete pathDetails[AcApiDocPath.KEY_URL];
          result['paths'][url] = pathDetails;
        }
      }
    }

    if (docsJson[AcApiDoc.KEY_TAGS]) {
      const tags = docsJson[AcApiDoc.KEY_TAGS];
      if (Array.isArray(tags) && tags.length > 0) {
        result['tags'] = tags;
      }
    }

    return result;
  }
}
