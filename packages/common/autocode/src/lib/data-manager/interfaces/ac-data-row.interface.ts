export interface IAcDataRow {
  rowId: string;
  data: any;
  originalIndex: number;
  index: number;
  extensionData?: Record<string, any>;
  isPlaceholder?: boolean;
}
