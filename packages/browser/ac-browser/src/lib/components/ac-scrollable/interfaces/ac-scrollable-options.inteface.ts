export interface IAcScrollableOptions {
  bufferCount?: number;
  elementHeight?: number;
  itemSize?: number;
  enableFixedHeight?: boolean;
  itemTemplate?: (item: any, index: number) => HTMLElement;
}
