export interface IAcScrollableOptions {
  bufferCount?: number;
  topBufferCount?: number;
  bottomBufferCount?: number;
  bottomThreshold?: number;
  elementHeight?: number;
  itemSize?: number;
  enableFixedHeight?: boolean;
  itemTemplate?: (item: any, index: number) => HTMLElement;
}

