/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

export class AcSqlConfig {
  static readonly KeyCascadeDeleteDestinationRows: string = 'cascadeDeleteDestinationRows';
  static readonly KeyCascadeDeleteSourceRows: string = 'cascadeDeleteSourceRows';
  static readonly KeySqliteConfig: string = 'sqliteConfig';

  @AcBindJsonProperty({ key: AcSqlConfig.KeyCascadeDeleteDestinationRows })
  cascadeDeleteDestinationRows: boolean = false;

  @AcBindJsonProperty({ key: AcSqlConfig.KeyCascadeDeleteSourceRows })
  cascadeDeleteSourceRows: boolean = false;

  @AcBindJsonProperty({ key: AcSqlConfig.KeySqliteConfig })
  sqliteConfig: AcSqliteConfig = new AcSqliteConfig();

  constructor({
    cascadeDeleteDestinationRows = false,
    cascadeDeleteSourceRows = false,
    sqliteConfig,
  }: {
    cascadeDeleteDestinationRows?: boolean;
    cascadeDeleteSourceRows?: boolean;
    sqliteConfig?: AcSqliteConfig;
  } = {}) {
    this.cascadeDeleteDestinationRows = cascadeDeleteDestinationRows;
    this.cascadeDeleteSourceRows = cascadeDeleteSourceRows;
    if (sqliteConfig) {
      this.sqliteConfig = sqliteConfig;
    }
  }

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcSqlConfig {
    const instance = new AcSqlConfig();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData = {} }: { jsonData: Record<string, any> }): AcSqlConfig {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}

export class AcSqliteConfig {
  static readonly KeyForeignKeys: string = 'foreignKeys';
  static readonly KeyJournalMode: string = 'journalMode';
  static readonly KeySynchronous: string = 'synchronous';
  static readonly KeyTempStore: string = 'tempStore';
  static readonly KeyCacheSize: string = 'cacheSize';
  static readonly KeyBusyTimeout: string = 'busyTimeout';
  static readonly KeyAutoVacuum: string = 'autoVacuum';
  static readonly KeyRecursiveTriggers: string = 'recursiveTriggers';
  static readonly KeyCaseSensitiveLike: string = 'caseSensitiveLike';
  static readonly KeySecureDelete: string = 'secureDelete';
  static readonly KeyLockingMode: string = 'lockingMode';
  static readonly KeyWalAutoCheckpoint: string = 'walAutoCheckpoint';
  static readonly KeyJournalSizeLimit: string = 'journalSizeLimit';

  @AcBindJsonProperty({ key: AcSqliteConfig.KeyForeignKeys })
  foreignKeys: boolean = true;

  @AcBindJsonProperty({ key: AcSqliteConfig.KeyJournalMode })
  journalMode: string = 'WAL';

  @AcBindJsonProperty({ key: AcSqliteConfig.KeySynchronous })
  synchronous: string = 'NORMAL';

  @AcBindJsonProperty({ key: AcSqliteConfig.KeyTempStore })
  tempStore: string = 'MEMORY';

  @AcBindJsonProperty({ key: AcSqliteConfig.KeyCacheSize })
  cacheSize: number = -131072;

  @AcBindJsonProperty({ key: AcSqliteConfig.KeyBusyTimeout })
  busyTimeout: number = 5000;

  @AcBindJsonProperty({ key: AcSqliteConfig.KeyAutoVacuum })
  autoVacuum: string = 'NONE';

  @AcBindJsonProperty({ key: AcSqliteConfig.KeyRecursiveTriggers })
  recursiveTriggers: boolean = true;

  @AcBindJsonProperty({ key: AcSqliteConfig.KeyCaseSensitiveLike })
  caseSensitiveLike: boolean = false;

  @AcBindJsonProperty({ key: AcSqliteConfig.KeySecureDelete })
  secureDelete: boolean = false;

  @AcBindJsonProperty({ key: AcSqliteConfig.KeyLockingMode })
  lockingMode: string = 'NORMAL';

  @AcBindJsonProperty({ key: AcSqliteConfig.KeyWalAutoCheckpoint })
  walAutoCheckpoint: number = 20000;

  @AcBindJsonProperty({ key: AcSqliteConfig.KeyJournalSizeLimit })
  journalSizeLimit: number = 67108864;

  constructor({
    foreignKeys = true,
    journalMode = 'WAL',
    synchronous = 'NORMAL',
    tempStore = 'MEMORY',
    cacheSize = -131072,
    busyTimeout = 5000,
    autoVacuum = 'NONE',
    recursiveTriggers = true,
    caseSensitiveLike = false,
    secureDelete = false,
    lockingMode = 'NORMAL',
    walAutoCheckpoint = 20000,
    journalSizeLimit = 67108864,
  }: {
    foreignKeys?: boolean;
    journalMode?: string;
    synchronous?: string;
    tempStore?: string;
    cacheSize?: number;
    busyTimeout?: number;
    autoVacuum?: string;
    recursiveTriggers?: boolean;
    caseSensitiveLike?: boolean;
    secureDelete?: boolean;
    lockingMode?: string;
    walAutoCheckpoint?: number;
    journalSizeLimit?: number;
  } = {}) {
    this.foreignKeys = foreignKeys;
    this.journalMode = journalMode;
    this.synchronous = synchronous;
    this.tempStore = tempStore;
    this.cacheSize = cacheSize;
    this.busyTimeout = busyTimeout;
    this.autoVacuum = autoVacuum;
    this.recursiveTriggers = recursiveTriggers;
    this.caseSensitiveLike = caseSensitiveLike;
    this.secureDelete = secureDelete;
    this.lockingMode = lockingMode;
    this.walAutoCheckpoint = walAutoCheckpoint;
    this.journalSizeLimit = journalSizeLimit;
  }

  static instanceFromJson({ jsonData }: { jsonData: Record<string, any> }): AcSqliteConfig {
    const instance = new AcSqliteConfig();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData = {} }: { jsonData: Record<string, any> }): AcSqliteConfig {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }

  toPragmaStatements(): string[] {
    return [
      `PRAGMA foreign_keys = ${this.foreignKeys ? 'ON' : 'OFF'};`,
      `PRAGMA journal_mode = ${this.journalMode};`,
      `PRAGMA synchronous = ${this.synchronous};`,
      `PRAGMA temp_store = ${this.tempStore};`,
      `PRAGMA cache_size = ${this.cacheSize};`,
      `PRAGMA busy_timeout = ${this.busyTimeout};`,
      `PRAGMA auto_vacuum = ${this.autoVacuum};`,
      `PRAGMA recursive_triggers = ${this.recursiveTriggers ? 'ON' : 'OFF'};`,
      `PRAGMA case_sensitive_like = ${this.caseSensitiveLike ? 'ON' : 'OFF'};`,
      `PRAGMA secure_delete = ${this.secureDelete ? 'ON' : 'OFF'};`,
      `PRAGMA locking_mode = ${this.lockingMode};`,
      `PRAGMA wal_autocheckpoint = ${this.walAutoCheckpoint};`,
      `PRAGMA journal_size_limit = ${this.journalSizeLimit};`,
    ];
  }
}
