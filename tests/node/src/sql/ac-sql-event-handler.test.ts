import 'reflect-metadata';
import { AcDataDictionary, AcEnumDDRowEvent } from "@autocode-ts/ac-data-dictionary";
import { 
  AcSqlDbTable, 
  AcSqlEventHandler, 
  AcSqlEventCallback, 
  AcSqlEventHandlersRegistry, 
  AcSqlEventHandlerDefinition,
  AcSqlEventArgs,
  AcSqlEventResult
} from "@autocode-ts/ac-sql";
import { AcResult, AcLogger } from "@autocode-ts/autocode";
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Define a test handler
@AcSqlEventHandler({ tableName: 'test_table' })
class TestTableHandler {
  @AcSqlEventCallback({ event: AcEnumDDRowEvent.BeforeInsert })
  async onBeforeInsert({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    if (args.row) {
      args.row['before_triggered'] = true;
    }
    return result.setSuccess();
  }

  @AcSqlEventCallback({ event: AcEnumDDRowEvent.AfterInsert })
  async onAfterInsert({ args }: { args: AcSqlEventArgs }): Promise<AcSqlEventResult> {
    const result = new AcSqlEventResult();
    if (args.row) {
      args.row['after_triggered'] = true;
    }
    return result.setSuccess();
  }
}

describe('AcSqlEventHandler Integration', () => {
  beforeEach(() => {
    AcDataDictionary.dataDictionaries = {};
    const jsonData = {
      name: 'Test DD',
      tables: {
        test_table: {
          tableName: 'test_table',
          tableColumns: {
            id: { columnName: 'id', columnType: 'UUID', columnProperties: { PRIMARY_KEY: { propertyValue: true } } },
            name: { columnName: 'name', columnType: 'STRING' },
            before_triggered: { columnName: 'before_triggered', columnType: 'BOOLEAN' },
            after_triggered: { columnName: 'after_triggered', columnType: 'BOOLEAN' }
          }
        }
      }
    };
    AcDataDictionary.registerDataDictionary({ jsonData });
  });

  it('should trigger BeforeInsert and AfterInsert events (manual)', async () => {
    const mockDao = {
      insertRow: vi.fn().mockResolvedValue(new AcResult().setSuccess()),
      getRows: vi.fn().mockResolvedValue({ isSuccess: () => true, rows: [] })
    };

    const table = new AcSqlDbTable({ tableName: 'test_table' });
    table.dao = mockDao as any;
    table.logger = new AcLogger();

    const def = new AcSqlEventHandlerDefinition();
    def.handler = TestTableHandler;
    def.registerEventHandlerMethod({ event: AcEnumDDRowEvent.BeforeInsert, methodName: 'onBeforeInsert' });
    def.registerEventHandlerMethod({ event: AcEnumDDRowEvent.AfterInsert, methodName: 'onAfterInsert' });
    AcSqlEventHandlersRegistry['test_table'] = def;

    const row = { id: '123', name: 'Test' };
    await table.insertRow({ row });

    expect(row).toHaveProperty('before_triggered', true);
    expect(row).toHaveProperty('after_triggered', true);
  });

  it('should trigger BeforeInsert and AfterInsert events (decorator)', async () => {
    const mockDao = {
      insertRow: vi.fn().mockResolvedValue(new AcResult().setSuccess()),
      getRows: vi.fn().mockResolvedValue({ isSuccess: () => true, rows: [] })
    };

    const table = new AcSqlDbTable({ tableName: 'test_table' });
    table.dao = mockDao as any;
    table.logger = new AcLogger();

    const row = { id: '123', name: 'Test' };
    await table.insertRow({ row });

    expect(row).toHaveProperty('before_triggered', true);
    expect(row).toHaveProperty('after_triggered', true);
  });
});
