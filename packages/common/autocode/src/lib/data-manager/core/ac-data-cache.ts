/* eslint-disable @typescript-eslint/no-explicit-any */

import { AcEvents } from "../../core/ac-events";
import { AcHooks } from "../../core/ac-hooks";
import { AcLogger } from "../../core/ac-logger";
import { AcFilterGroup } from "../../models/ac-filter-group.model";
import { AcSortOrder } from "../../models/ac-sort-order.model";
import { IAcOnDemandRequestArgs } from "../interfaces/ac-on-demand-request-args.interface";
import { IAcOnDemandResponseArgs } from "../interfaces/ac-on-demand-response-args.interface";
import { AcDataCacheCollection } from "../models/ac-data-cache-collection.model";

export class AcDataCache {
  private _onDemandFunction?: ({ collection, args }: { collection: string, args: IAcOnDemandRequestArgs }) => void;
  get onDemandFunction(): (({ collection, args }: { collection: string, args: IAcOnDemandRequestArgs }) => void) | undefined {
    this.logger.log('Getting onDemandFunction');
    return this._onDemandFunction;
  }
  set onDemandFunction(value: ({ collection, args }: { collection: string, args: IAcOnDemandRequestArgs }) => void) {
    this.logger.log('Setting onDemandFunction', { valueProvided: !!value });
    if (value != this._onDemandFunction) {
      this._onDemandFunction = value;
      this.logger.log("Type switched to 'ondemand'");
    }
    this.logger.log("OnDemandFunction set complete");
  }

  private collections: Map<string, AcDataCacheCollection> = new Map();
  events: AcEvents = new AcEvents();
  hooks: AcHooks = new AcHooks();
  logger: AcLogger = new AcLogger();


  addRow({ collection, data }: { collection: string, data: any }): any {
    this.logger.log('Adding row to collection', { collection, dataProvided: !!data });
    const cacheCollection = this.collections.get(collection);
    if (!cacheCollection) {
      this.logger.log('Error: Collection not found', { collection });
      throw new Error(`Collection ${collection} not found`);
    }
    this.logger.log('Collection found, adding row');
    const result = cacheCollection.addRow({ data });
    this.logger.log('Row added successfully', { collection, resultProvided: !!result });
    return result;
  }

  deleteRow({ collection, key, value, rowId, data }: { collection: string, key?: string; value?: any; rowId?: string; data?: any }): any | undefined {
    this.logger.log('Deleting row from collection', { collection, rowId, key, valueProvided: !!value, dataProvided: !!data });
    const cacheCollection = this.collections.get(collection);
    if (!cacheCollection) {
      this.logger.log('Error: Collection not found', { collection });
      throw new Error(`Collection ${collection} not found`);
    }
    this.logger.log('Collection found, deleting row');
    const result = cacheCollection.deleteRow({ key, value, rowId, data });
    this.logger.log('Row deletion attempted', { collection, resultProvided: !!result });
    return result;
  }

  async getRows({ collection, filterGroup, sortOrder, searchQuery, startIndex, rowsCount, endIndex, pageNumber, pageSize }: {
    collection: string,
    filterGroup?: AcFilterGroup;
    sortOrder?: AcSortOrder;
    searchQuery?: string;
    startIndex?: number;
    rowsCount?: number;
    endIndex?: number;
    pageNumber?: number;
    pageSize?: number;
  }): Promise<{ rows: any[], totalCount: number }> {
    this.logger.log('Getting rows from collection', {
      collection,
      filterGroup: !!filterGroup,
      sortOrder: !!sortOrder,
      searchQuery,
      startIndex,
      rowsCount,
      endIndex,
      pageNumber,
      pageSize
    });
    const cacheCollection = this.collections.get(collection);
    if (!cacheCollection) {
      this.logger.log('Error: Collection not found', { collection });
      throw new Error(`Collection ${collection} not found`);
    }
    this.logger.log('Collection found, retrieving rows');
    const result = await cacheCollection.getRows({ filterGroup, sortOrder, searchQuery, startIndex, rowsCount, endIndex, pageNumber, pageSize });
    this.logger.log('Rows retrieved successfully', { collection, rowsCount: result.rows.length, totalCount: result.totalCount });
    return result;
  }

  hasCollection({ collection }: { collection: string }): boolean {
    this.logger.log('Checking if collection exists', { collection });
    const exists = this.collections.has(collection);
    this.logger.log('Collection existence check complete', { collection, exists });
    return exists;
  }

  async refreshCollection({ collection }: { collection: string }): Promise<void> {
    this.logger.log('Refreshing collection', { collection });
    const cacheCollection = this.collections.get(collection);
    if (!cacheCollection) {
      this.logger.log('Error: Collection not found', { collection });
      throw new Error(`Collection ${collection} not found`);
    }
    this.logger.log('Collection found, checking onDemandFunction');
    if (this.onDemandFunction) {
      this.logger.log('onDemandFunction available, clearing data and requesting refresh');
      cacheCollection.data = [];
      const requestArgs: IAcOnDemandRequestArgs = {
        successCallback: (response: IAcOnDemandResponseArgs) => {
          console.log(response);
          cacheCollection.data = response.data;
          this.logger.log('Data refreshed via onDemandFunction', { collection, newDataCount: response.data.length });
        }
      };
      this.onDemandFunction({ collection, args: requestArgs });
      this.logger.log('onDemandFunction called for refresh');
    } else {
      this.logger.log('No onDemandFunction available, skipping refresh');
    }
    this.logger.log('Collection refresh complete', { collection });
  }

  registerCollection({ collection, uniqueRowKey }: { collection: string, uniqueRowKey: string }) {
    this.logger.log('Registering collection', { collection, uniqueRowKey });
    if (this.collections.has(collection)) {
      this.logger.log('Error: Collection already exists', { collection });
      throw new Error(`Collection ${collection} already initialized`);
    }
    this.logger.log('Collection does not exist, creating new AcDataCacheCollection');
    const cacheCollection:AcDataCacheCollection = new AcDataCacheCollection({dataCache:this,name:collection,uniqueRowKey:uniqueRowKey});
    this.collections.set(collection, cacheCollection);
    this.logger.log('Collection registered in map', { collection });
    this.refreshCollection({collection:collection});
    this.logger.log('Collection registration complete');
    return cacheCollection;
  }

  updateRow({ collection, key, value, rowId, data, addIfMissing = true }: { collection: string, key?: string; value?: any; rowId?: string; data?: any, addIfMissing?: boolean }): any | undefined {
    this.logger.log('Updating row in collection', { collection, rowId, key, valueProvided: !!value, dataProvided: !!data, addIfMissing });
    const cacheCollection = this.collections.get(collection);
    if (!cacheCollection) {
      this.logger.log('Error: Collection not found', { collection });
      throw new Error(`Collection ${collection} not found`);
    }
    this.logger.log('Collection found, updating row');
    const result = cacheCollection.updateRow({key,value,rowId,data,addIfMissing});
    this.logger.log('Row update attempted', { collection, resultProvided: !!result });
    return result;
  }
}
