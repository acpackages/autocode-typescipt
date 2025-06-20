import type { CellPosition, CellRange } from 'ag-grid-community';
import { CellRangeType, _isSameRow, _last } from 'ag-grid-community';

import { AbstractSelectionHandle, SelectionHandleType } from './abstractSelectionHandle';

export class AcDataGridRangeHandle extends AbstractSelectionHandle {
    protected type = SelectionHandleType.RANGE;
    private endPosition: CellPosition;
    private rangeFixed: boolean = false;

    constructor() {
        super({ tag: 'div', cls: 'ag-range-handle' });
    }

    protected onDrag(_: MouseEvent) {
        const lastCellHovered = this.getLastCellHovered();

        if (!lastCellHovered) {
            return;
        }

        const rangeSvc = this.beans.rangeSvc!;
        const cellRanges = rangeSvc.getCellRanges();
        const lastRange = _last(cellRanges);

        if (!this.rangeFixed) {
            this.fixRangeStartEnd(lastRange);
            this.rangeFixed = true;
        }

        this.endPosition = {
            rowIndex: lastCellHovered.rowIndex,
            rowPinned: lastCellHovered.rowPinned,
            column: lastCellHovered.column,
        };

        // check if the cell ranges are for a chart
        if (
            cellRanges.length === 2 &&
            cellRanges[0].type === CellRangeType.DIMENSION &&
            lastRange.type === CellRangeType.VALUE
        ) {
            const rowChanged = !_isSameRow(this.endPosition, rangeSvc.getRangeEndRow(lastRange));

            if (rowChanged) {
                // ensure the dimension range is kept in sync with the value range (which has the handle)
                rangeSvc.updateRangeEnd(
                    cellRanges[0],
                    {
                        ...this.endPosition,
                        column: cellRanges[0].columns[0],
                    },
                    true
                );
            }
        }

        rangeSvc.extendLatestRangeToCell(this.endPosition);
    }

    protected override shouldSkipCell(_: CellPosition): boolean {
        return false;
    }

    protected onDragEnd(_: MouseEvent) {
        const cellRange = _last(this.beans.rangeSvc!.getCellRanges())!;

        this.fixRangeStartEnd(cellRange);
        this.rangeFixed = false;
    }

    protected onDragCancel(): void {
        this.rangeFixed = false;
    }

    private fixRangeStartEnd(cellRange: CellRange): void {
        const rangeSvc = this.beans.rangeSvc!;
        const startRow = rangeSvc.getRangeStartRow(cellRange);
        const endRow = rangeSvc.getRangeEndRow(cellRange);
        const column = cellRange.columns[0];

        cellRange.startRow = startRow;
        cellRange.endRow = endRow;
        cellRange.startColumn = column;
    }
}
