import type { ExcelFont, ExcelHeaderFooterImage, ExcelImage } from 'ag-grid-community';

export type ImageIdMap = Map</** imageId */ string, { type: 'jpg' | 'png' | 'gif'; index: number }>;
export type BorderProperty = string | undefined;

export interface IAcDGNumberFormat {
    formatCode: string;
    numFmtId: number;
}

export interface ImageColor {
    color: string;
    tint?: number;
    saturation?: number;
}

export interface ImageAnchor {
    row: number;
    col: number;
    offsetX: number;
    offsetY: number;
}

export interface ImageBoxSize {
    from: ImageAnchor;
    to: ImageAnchor;
    height: number;
    width: number;
}

export interface IAcDGBorder {
    style?: string;
    color?: string;
}

export interface IAcDGBorderSet {
    left?: Border;
    right?: Border;
    top?: Border;
    bottom?: Border;
    diagonal?: Border;
}

export interface IAcDGExcelThemeFont extends ExcelFont {
    colorTheme?: string;
    scheme?: string;
}

export interface IAcDGFill {
    patternType: string;
    fgTheme?: string;
    fgTint?: string;
    fgRgb?: string;
    bgIndexed?: string;
    bgRgb?: string;
}

type ExcelHeaderFooterSide = 'L' | 'C' | 'R';
type ExcelHeaderPosition = 'H';
type ExcelFooterPosition = 'F';
type ExcelHeaderFooterFirst = 'FIRST';
type ExcelHeaderFooterEven = 'EVEN';

export type ExcelHeaderFooterPosition =
    `${ExcelHeaderFooterSide}${ExcelHeaderPosition | ExcelFooterPosition}${ExcelHeaderFooterFirst | ExcelHeaderFooterEven | ''}`;

export interface IAcDGExcelHeaderFooterCalculatedImage extends ExcelHeaderFooterImage {
    headerFooterPosition: ExcelHeaderFooterPosition;
}

export interface IAcDGExcelCalculatedImage extends ExcelImage {
    totalWidth: number;
    totalHeight: number;
}

export interface IAcDGExcelDataTable {
    name: string;
    displayName: string;
    columns: string[];
    showFilterButtons: boolean[];
    rowRange: [number, number];
    showRowStripes: boolean;
    showColumnStripes: boolean;
    highlightFirstColumn: boolean;
    highlightLastColumn: boolean;
}
