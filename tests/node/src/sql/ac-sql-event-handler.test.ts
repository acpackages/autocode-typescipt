import 'reflect-metadata';
import { AcDataDictionary, AcEnumDDRowEvent } from "@autocode-ts/ac-data-dictionary";
import {
  AcSqlDbTable,
  AcSqlEventHandlersRegistry,
  AcSqlEventHandlerDefinition,
  AcSqlEventArgs,
  AcSqlEventResult
} from "@autocode-ts/ac-sql";
import { AcResult, AcLogger } from "@autocode-ts/autocode";
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Plain handler class — NO decorators, to avoid prototype scanning issues.
class TestTableHandler {
  async onBeforeInsert({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    if (args.row) {
      args.row['before_triggered'] = true;
    }
    return result.setSuccess();
  }

  async onAfterInsert({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    const daoResult = args.result as any;
    if (daoResult?.rows?.[0]) {
      daoResult.rows[0]['after_triggered'] = true;
    }
    return result.setSuccess();
  }

  async onBeforeUpdate({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    if (args.row) {
      args.row['before_update_triggered'] = true;
    }
    return result.setSuccess();
  }

  async onAfterUpdate({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    const daoResult = args.result as any;
    if (daoResult?.rows?.[0]) {
      daoResult.rows[0]['after_update_triggered'] = true;
    }
    return result.setSuccess();
  }

  async onBeforeDelete({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    (args.sqlDbTableInstance as any).before_delete_triggered = true;
    return result.setSuccess();
  }

  async onAfterDelete({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    (args.sqlDbTableInstance as any).after_delete_triggered = true;
    return result.setSuccess();
  }

  async onBeforeSave({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    if (args.row) {
      args.row['before_save_triggered'] = true;
    }
    return result.setSuccess();
  }

  async onAfterSave({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    const daoResult = args.result as any;
    if (daoResult?.rows?.[0]) {
      daoResult.rows[0]['after_save_triggered'] = true;
    }
    return result.setSuccess();
  }

  async onBeforeFormat({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    if (args.row) {
      args.row['before_format_triggered'] = true;
    }
    return result.setSuccess();
  }

  async onAfterFormat({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    if (args.row) {
      args.row['after_format_triggered'] = true;
    }
    return result.setSuccess();
  }
}

const TABLE_NAME = 'test_table';

function registerTestHandlers() {
  const definition = new AcSqlEventHandlerDefinition();
  definition.handler = TestTableHandler;
  definition.registerEventHandlerMethod({ event: AcEnumDDRowEvent.BeforeInsert, methodName: 'onBeforeInsert' });
  definition.registerEventHandlerMethod({ event: AcEnumDDRowEvent.AfterInsert, methodName: 'onAfterInsert' });
  definition.registerEventHandlerMethod({ event: AcEnumDDRowEvent.BeforeUpdate, methodName: 'onBeforeUpdate' });
  definition.registerEventHandlerMethod({ event: AcEnumDDRowEvent.AfterUpdate, methodName: 'onAfterUpdate' });
  definition.registerEventHandlerMethod({ event: AcEnumDDRowEvent.BeforeDelete, methodName: 'onBeforeDelete' });
  definition.registerEventHandlerMethod({ event: AcEnumDDRowEvent.AfterDelete, methodName: 'onAfterDelete' });
  definition.registerEventHandlerMethod({ event: AcEnumDDRowEvent.BeforeSave, methodName: 'onBeforeSave' });
  definition.registerEventHandlerMethod({ event: AcEnumDDRowEvent.AfterSave, methodName: 'onAfterSave' });
  definition.registerEventHandlerMethod({ event: AcEnumDDRowEvent.BeforeFormat, methodName: 'onBeforeFormat' });
  definition.registerEventHandlerMethod({ event: AcEnumDDRowEvent.AfterFormat, methodName: 'onAfterFormat' });
  AcSqlEventHandlersRegistry[TABLE_NAME] = definition;
}

describe('AcSqlEventHandler Integration', () => {
  beforeEach(() => {
    // Register a fresh data dictionary for every test.
    const jsonData = {
      name: 'Test DD',
      tables: {
        test_table: {
          tableName: TABLE_NAME,
          tableColumns: {
            id: { columnName: 'id', columnType: 'UUID', columnProperties: { PRIMARY_KEY: { propertyName: 'PRIMARY_KEY', propertyValue: true } } },
            name: { columnName: 'name', columnType: 'STRING' },
            before_triggered: { columnName: 'before_triggered', columnType: 'BOOLEAN' },
            after_triggered: { columnName: 'after_triggered', columnType: 'BOOLEAN' },
            before_update_triggered: { columnName: 'before_update_triggered', columnType: 'BOOLEAN' },
            after_update_triggered: { columnName: 'after_update_triggered', columnType: 'BOOLEAN' },
            before_save_triggered: { columnName: 'before_save_triggered', columnType: 'BOOLEAN' },
            after_save_triggered: { columnName: 'after_save_triggered', columnType: 'BOOLEAN' },
            before_format_triggered: { columnName: 'before_format_triggered', columnType: 'BOOLEAN' },
            after_format_triggered: { columnName: 'after_format_triggered', columnType: 'BOOLEAN' }
          }
        }
      },
      relationships: []
    };
    AcDataDictionary.dataDictionaries = {};
    AcDataDictionary.registerDataDictionary({ jsonData });
    registerTestHandlers();
  });

  afterEach(() => {
    delete AcSqlEventHandlersRegistry[TABLE_NAME];
  });

  function makeTable(): AcSqlDbTable {
    const table = new AcSqlDbTable({ tableName: TABLE_NAME });
    table.logger = new AcLogger();
    return table;
  }

  it('should trigger BeforeInsert and AfterInsert events', async () => {
    const insertedRow = { id: '123', name: 'Test' };
    const mockDao = {
      insertRow: vi.fn().mockResolvedValue(new AcResult().setSuccess()),
      getRows: vi.fn().mockResolvedValue({
        isSuccess: () => true,
        hasRows: () => true,
        rows: [{ ...insertedRow }]
      })
    };

    const table = makeTable();
    table.dao = mockDao as any;

    const result = await table.insertRow({ row: { ...insertedRow } });

    expect(result.isSuccess()).toBe(true);
    expect(result.rows[0]).toHaveProperty('before_triggered', true);
    expect(result.rows[0]).toHaveProperty('after_triggered', true);
  });

  it('should trigger BeforeUpdate and AfterUpdate events', async () => {
    const updatedRow = { id: '123', name: 'Updated' };
    const mockDao = {
      updateRow: vi.fn().mockResolvedValue(new AcResult().setSuccess()),
      getRows: vi.fn().mockResolvedValue({
        isSuccess: () => true,
        hasRows: () => true,
        rows: [{ ...updatedRow }]
      })
    };

    const table = makeTable();
    table.dao = mockDao as any;

    const result = await table.updateRow({ row: { ...updatedRow } });

    expect(result.isSuccess()).toBe(true);
    expect(result.rows[0]).toHaveProperty('before_update_triggered', true);
    expect(result.rows[0]).toHaveProperty('after_update_triggered', true);
  });

  it('should trigger BeforeDelete and AfterDelete events', async () => {
    const mockDao = {
      deleteRows: vi.fn().mockResolvedValue(new AcResult().setSuccess()),
      getRows: vi.fn().mockResolvedValue({
        isSuccess: () => true,
        hasRows: () => true,
        rows: [{ id: '123' }]
      }),
      executeStatement: vi.fn().mockResolvedValue(new AcResult().setSuccess())
    };

    const table = makeTable() as any;
    table.dao = mockDao as any;

    await table.deleteRows({ primaryKeyValue: '123' });

    expect(table.before_delete_triggered).toBe(true);
    expect(table.after_delete_triggered).toBe(true);
  });

  it('should trigger BeforeSave and AfterSave events', async () => {
    const savedRow = { id: '123', name: 'Saved' };
    const mockDao = {
      insertRow: vi.fn().mockResolvedValue(new AcResult().setSuccess()),
      getRows: vi.fn().mockResolvedValue({
        isSuccess: () => true,
        hasRows: () => false, // triggers insert path in saveRow
        rows: []
      })
    };
    // Override after-insert getRows call to return the saved row.
    mockDao.getRows
      .mockResolvedValueOnce({ isSuccess: () => true, hasRows: () => false, rows: [] }) // saveRow existence check
      .mockResolvedValue({ isSuccess: () => true, hasRows: () => true, rows: [{ ...savedRow }] }); // post-insert fetch

    const table = makeTable();
    table.dao = mockDao as any;

    const result = await table.saveRow({ row: { ...savedRow } });

    expect(result.isSuccess()).toBe(true);
    expect(result.rows[0]).toHaveProperty('before_save_triggered', true);
    expect(result.rows[0]).toHaveProperty('after_save_triggered', true);
  });

  it('should trigger BeforeFormat and AfterFormat events', async () => {
    const table = makeTable();

    const result = await table.formatValues({ row: { id: '123', name: 'Format' } });

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toHaveProperty('before_format_triggered', true);
    expect(result.value).toHaveProperty('after_format_triggered', true);
  });
});
