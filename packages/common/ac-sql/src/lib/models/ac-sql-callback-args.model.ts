/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcResult } from "@autocode-ts/autocode";

export class AcSqlCallbackArgs extends AcResult {
  static readonly KeyCompletedCount: string = 'completedCount';
  static readonly KeyTotalCount: string = 'totalCount';

  @AcBindJsonProperty({ key: AcSqlCallbackArgs.KeyCompletedCount })
  completedCount: number = 0;

  @AcBindJsonProperty({ key: AcSqlCallbackArgs.KeyTotalCount })
  totalCount: number = 0;

  get pendingCount(): number {
    return this.totalCount - this.completedCount;
  }

  constructor({ completedCount, totalCount }: { completedCount?: number; totalCount?: number } = {}) {
    super();
    if (completedCount !== undefined) {
      this.completedCount = completedCount;
    }
    if (totalCount !== undefined) {
      this.totalCount = totalCount;
    }
  }
}
