export interface IAcDataRow {
  rowId: string;
  data: any;
  displayIndex?: number;
  index: number;
  extensionData?: Record<string, any>;
  isPlaceholder?: boolean;
}
