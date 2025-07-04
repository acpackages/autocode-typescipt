import type {
    AgColumn,
    CellCtrl,
    CellPosition,
    CellRange,
    ElementParams,
    FillOperationParams,
    RowNode,
    RowPosition,
} from 'ag-grid-community';
import {
    _addGridCommonParams,
    _getCellByPosition,
    _getFillHandle,
    _getNormalisedMousePosition,
    _getRowAbove,
    _getRowBelow,
    _getRowNode,
    _isRowBefore,
    _isSameRow,
    _last,
    _toStringOrNull,
    _warn,
    isRowNumberCol,
} from 'ag-grid-community';

import { AbstractSelectionHandle, SelectionHandleType } from './abstractSelectionHandle';
import { findLineByLeastSquares } from './utils';

interface IAcDGFillValues {
    position: CellPosition;
    value: any;
}

interface IAcDGValueContext {
    value: any;
    column: AgColumn;
    rowNode: RowNode;
}

type FillDirection = 'x' | 'y';
const FillHandleElement: ElementParams = {
    tag: 'div',
    cls: 'ag-fill-handle',
};
export class AcDataGridFillHandle extends AbstractSelectionHandle {
    private initialPosition: CellPosition | undefined;
    private initialXY: { x: number; y: number } | null;
    private lastCellMarked: CellPosition | undefined;
    private markedCells: CellCtrl[] = [];
    private cellValues: FillValues[][] = [];

    private dragAxis: FillDirection;
    private isUp: boolean = false;
    private isLeft: boolean = false;
    private isReduce: boolean = false;

    protected type = SelectionHandleType.FILL;

    constructor() {
        super(FillHandleElement);
    }

    protected override updateValuesOnMove(e: MouseEvent) {
        super.updateValuesOnMove(e);

        if (!this.initialXY) {
            this.initialXY = _getNormalisedMousePosition(this.beans, e);
        }

        const { x, y } = this.initialXY;
        const { x: newX, y: newY } = _getNormalisedMousePosition(this.beans, e);
        const diffX = Math.abs(x - newX);
        const diffY = Math.abs(y - newY);
        const allowedDirection = this.getFillHandleDirection();
        let direction: FillDirection;

        if (allowedDirection === 'xy') {
            direction = diffX > diffY ? 'x' : 'y';
        } else {
            direction = allowedDirection;
        }

        if (direction !== this.dragAxis) {
            this.dragAxis = direction;
            this.changedCalculatedValues = true;
        }
    }

    protected override shouldSkipCell(cell: CellPosition): boolean {
        return isRowNumberCol(cell.column);
    }

    protected onDrag(_: MouseEvent) {
        if (!this.initialPosition) {
            const cellCtrl = this.cellCtrl;
            if (!cellCtrl) {
                return;
            }

            this.initialPosition = cellCtrl.cellPosition;
        }

        const lastCellHovered = this.getLastCellHovered();

        if (lastCellHovered) {
            this.markPathFrom(this.initialPosition, lastCellHovered);
        }
    }

    protected onDragEnd(e: MouseEvent) {
        this.initialXY = null;
        if (!this.markedCells.length) {
            return;
        }

        const isX = this.dragAxis === 'x';
        const { cellRange: initialRange, rangeStartRow, rangeEndRow, beans } = this;
        const colLen = initialRange.columns.length;

        let finalRange: CellRange | undefined;

        const { rangeSvc, eventSvc } = beans;

        if (!this.isUp && !this.isLeft) {
            finalRange = rangeSvc!.createCellRangeFromCellRangeParams({
                rowStartIndex: rangeStartRow.rowIndex,
                rowStartPinned: rangeStartRow.rowPinned,
                columnStart: initialRange.columns[0],
                rowEndIndex: isX ? rangeEndRow.rowIndex : this.lastCellMarked!.rowIndex,
                rowEndPinned: isX ? rangeEndRow.rowPinned : this.lastCellMarked!.rowPinned,
                columnEnd: isX ? this.lastCellMarked!.column : initialRange.columns[colLen - 1],
            });
        } else {
            const startRow = isX ? rangeStartRow : this.lastCellMarked;

            finalRange = rangeSvc!.createCellRangeFromCellRangeParams({
                rowStartIndex: startRow!.rowIndex,
                rowStartPinned: startRow!.rowPinned,
                columnStart: isX ? this.lastCellMarked!.column : initialRange.columns[0],
                rowEndIndex: rangeEndRow.rowIndex,
                rowEndPinned: rangeEndRow.rowPinned,
                columnEnd: initialRange.columns[colLen - 1],
            });
        }

        if (finalRange) {
            // raising fill events for undo / redo
            eventSvc.dispatchEvent({
                type: 'fillStart',
            });

            this.handleValueChanged(initialRange, finalRange, e);
            rangeSvc!.setCellRanges([finalRange]);

            eventSvc.dispatchEvent({
                type: 'fillEnd',
                initialRange: initialRange,
                finalRange: finalRange,
            });
        }
    }

    protected onDragCancel(): void {
        this.initialXY = null;
        if (!this.markedCells.length) {
            return;
        }

        this.clearMarkedPath();
    }

    private getFillHandleDirection(): 'x' | 'y' | 'xy' {
        const direction = _getFillHandle(this.gos)?.direction;

        if (!direction) {
            return 'xy';
        }

        if (direction !== 'x' && direction !== 'y' && direction !== 'xy') {
            _warn(177);
            return 'xy';
        }

        return direction;
    }

    private handleValueChanged(initialRange: CellRange, finalRange: CellRange, e: MouseEvent) {
        const { beans } = this;
        const { rangeSvc, gos, valueSvc } = beans;
        const initialRangeEndRow = rangeSvc!.getRangeEndRow(initialRange);
        const initialRangeStartRow = rangeSvc!.getRangeStartRow(initialRange);
        const finalRangeEndRow = rangeSvc!.getRangeEndRow(finalRange);
        const finalRangeStartRow = rangeSvc!.getRangeStartRow(finalRange);
        const isVertical = this.dragAxis === 'y';

        // if the range is being reduced in size, all we need to do is
        // clear the cells that are no longer part of the range
        if (this.isReduce && !_getFillHandle(gos)?.suppressClearOnFillReduction) {
            const columns = (
                isVertical
                    ? initialRange.columns
                    : initialRange.columns.filter((col) => finalRange.columns.indexOf(col) < 0)
            ) as AgColumn[];

            const startRow = isVertical ? _getRowBelow(beans, finalRangeEndRow) : finalRangeStartRow;

            if (startRow) {
                this.clearCellsInRange(startRow, initialRangeEndRow, columns);
            }
            return;
        }

        const values: ValueContext[] = [];
        const initialValues: any[] = [];
        const initialNonAggregatedValues: any[] = [];
        const initialFormattedValues: any[] = [];

        let withinInitialRange = true;
        let idx = 0;

        const resetValues = () => {
            values.length = 0;
            initialValues.length = 0;
            initialNonAggregatedValues.length = 0;
            initialFormattedValues.length = 0;
            idx = 0;
        };

        const iterateAcrossCells = (column?: AgColumn, columns?: AgColumn[]) => {
            let currentRow: RowPosition | undefined | null = this.isUp ? initialRangeEndRow : initialRangeStartRow;
            let finished = false;

            if (isVertical) {
                withinInitialRange = true;
                resetValues();
            }

            while (!finished && currentRow) {
                const rowNode = _getRowNode(beans, currentRow);
                if (!rowNode) {
                    break;
                }

                if (isVertical && column) {
                    fillValues(
                        values,
                        column,
                        rowNode,
                        () => !_isSameRow(currentRow!, this.isUp ? initialRangeStartRow : initialRangeEndRow)
                    );
                } else if (columns) {
                    withinInitialRange = true;
                    resetValues();
                    columns.forEach((col) =>
                        fillValues(
                            values,
                            col,
                            rowNode,
                            () => col !== (this.isLeft ? initialRange.columns[0] : _last(initialRange.columns))
                        )
                    );
                }

                finished = _isSameRow(currentRow, this.isUp ? finalRangeStartRow : finalRangeEndRow);

                currentRow = this.isUp ? _getRowAbove(this.beans, currentRow) : _getRowBelow(beans, currentRow);
            }
        };

        const fillValues = (
            currentValues: ValueContext[],
            col: AgColumn,
            rowNode: RowNode,
            updateInitialSet: () => boolean
        ) => {
            let currentValue: any;
            let skipValue: boolean = false;

            if (withinInitialRange) {
                currentValue = valueSvc.getValue(col, rowNode);
                initialValues.push(currentValue);
                initialNonAggregatedValues.push(valueSvc.getValue(col, rowNode, true));
                initialFormattedValues.push(valueSvc.formatValue(col, rowNode, currentValue));
                withinInitialRange = updateInitialSet();
            } else {
                const { value, fromUserFunction, sourceCol, sourceRowNode } = this.processValues({
                    event: e,
                    values: currentValues,
                    initialValues,
                    initialNonAggregatedValues,
                    initialFormattedValues,
                    col,
                    rowNode,
                    idx: idx++,
                });

                currentValue = value;
                if (col.isCellEditable(rowNode)) {
                    const cellValue = valueSvc.getValue(col, rowNode);

                    if (!fromUserFunction) {
                        if (sourceCol) {
                            const sourceColDef = sourceCol.getColDef();
                            if (sourceColDef.useValueFormatterForExport !== false && sourceColDef.valueFormatter) {
                                const formattedValue = valueSvc.formatValue(sourceCol, sourceRowNode!, currentValue);

                                if (formattedValue != null) {
                                    currentValue = formattedValue;
                                }
                            }
                        }
                        if (col.getColDef().useValueParserForImport !== false) {
                            currentValue = valueSvc.parseValue(
                                col,
                                rowNode,
                                // if no sourceCol, then currentValue is a number
                                sourceCol ? currentValue : _toStringOrNull(currentValue),
                                cellValue
                            );
                        }
                    }
                    if (!fromUserFunction || cellValue !== currentValue) {
                        rowNode.setDataValue(col, currentValue, 'rangeSvc');
                    } else {
                        skipValue = true;
                    }
                }
            }

            if (!skipValue) {
                currentValues.push({
                    value: currentValue,
                    column: col,
                    rowNode,
                });
            }
        };

        if (isVertical) {
            initialRange.columns.forEach((col: AgColumn) => {
                iterateAcrossCells(col);
            });
        } else {
            const columns = (this.isLeft ? [...finalRange.columns].reverse() : finalRange.columns) as AgColumn[];
            iterateAcrossCells(undefined, columns);
        }
    }

    private clearCellsInRange(startRow: RowPosition, endRow: RowPosition, columns: AgColumn[]) {
        const cellRange: CellRange = {
            startRow,
            endRow,
            columns,
            startColumn: columns[0],
        };
        this.beans.rangeSvc!.clearCellRangeCellValues({ cellRanges: [cellRange] });
    }

    private processValues(params: {
        event: MouseEvent;
        values: ValueContext[];
        initialValues: any[];
        initialNonAggregatedValues: any[];
        initialFormattedValues: any[];
        col: AgColumn;
        rowNode: RowNode;
        idx: number;
    }): { value: any; fromUserFunction: boolean; sourceCol?: AgColumn; sourceRowNode?: RowNode } {
        const { event, values, initialValues, initialNonAggregatedValues, initialFormattedValues, col, rowNode, idx } =
            params;

        const userFillOperation = _getFillHandle(this.gos)?.setFillValue;
        const isVertical = this.dragAxis === 'y';
        let direction: 'up' | 'down' | 'left' | 'right';

        if (isVertical) {
            direction = this.isUp ? 'up' : 'down';
        } else {
            direction = this.isLeft ? 'left' : 'right';
        }

        if (userFillOperation) {
            const params = _addGridCommonParams<FillOperationParams>(this.gos, {
                event,
                values: values.map(({ value }) => value),
                initialValues,
                initialNonAggregatedValues,
                initialFormattedValues,
                currentIndex: idx,
                currentCellValue: this.beans.valueSvc.getValue(col, rowNode),
                direction,
                column: col,
                rowNode: rowNode,
            });
            const userResult = userFillOperation(params);
            if (userResult !== false) {
                return { value: userResult, fromUserFunction: true };
            }
        }

        const allNumbers = !values.some(({ value }) => {
            const asFloat = parseFloat(value);
            return isNaN(asFloat) || asFloat.toString() !== value.toString();
        });

        // values should be copied in order if the alt key is pressed
        // or if the values contain strings and numbers
        // However, if we only have one initial value selected, and that
        // value is a number and we are also pressing alt, then we should
        // increment or decrement the value by 1 based on direction.
        if (event.altKey || !allNumbers) {
            if (allNumbers && initialValues.length === 1) {
                const multiplier = this.isUp || this.isLeft ? -1 : 1;
                return { value: parseFloat(_last(values).value) + 1 * multiplier, fromUserFunction: false };
            }
            const { value, column: sourceCol, rowNode: sourceRowNode } = values[idx % values.length];
            return { value, fromUserFunction: false, sourceCol, sourceRowNode };
        }

        return {
            value: _last(findLineByLeastSquares(values.map(({ value }) => Number(value)))),
            fromUserFunction: false,
        };
    }

    protected override clearValues() {
        this.clearMarkedPath();
        this.clearCellValues();

        this.lastCellMarked = undefined;

        super.clearValues();
    }

    private clearMarkedPath() {
        this.markedCells.forEach((cell) => {
            if (!cell.isAlive()) {
                return;
            }
            const { comp } = cell;
            comp.toggleCss('ag-selection-fill-top', false);
            comp.toggleCss('ag-selection-fill-right', false);
            comp.toggleCss('ag-selection-fill-bottom', false);
            comp.toggleCss('ag-selection-fill-left', false);
        });

        this.markedCells.length = 0;

        this.isUp = false;
        this.isLeft = false;
        this.isReduce = false;
    }

    private clearCellValues() {
        this.cellValues.length = 0;
    }

    private markPathFrom(initialPosition: CellPosition, currentPosition: CellPosition) {
        this.clearMarkedPath();
        this.clearCellValues();

        if (this.dragAxis === 'y') {
            if (_isSameRow(currentPosition, initialPosition)) {
                return;
            }

            const isBefore = _isRowBefore(currentPosition, initialPosition);
            const { rangeStartRow, rangeEndRow } = this;

            if (
                isBefore &&
                ((currentPosition.rowPinned == rangeStartRow.rowPinned &&
                    currentPosition.rowIndex >= rangeStartRow.rowIndex) ||
                    (rangeStartRow.rowPinned != rangeEndRow.rowPinned &&
                        currentPosition.rowPinned == rangeEndRow.rowPinned &&
                        currentPosition.rowIndex <= rangeEndRow.rowIndex))
            ) {
                this.reduceVertical(initialPosition, currentPosition);
                this.isReduce = true;
            } else {
                this.extendVertical(initialPosition, currentPosition, isBefore);
                this.isReduce = false;
            }
        } else {
            const initialColumn = initialPosition.column as AgColumn;
            const currentColumn = currentPosition.column as AgColumn;

            if (initialColumn === currentColumn) {
                return;
            }
            const displayedColumns = this.beans.visibleCols.allCols;
            const initialIndex = displayedColumns.indexOf(initialColumn);
            const currentIndex = displayedColumns.indexOf(currentColumn);

            if (
                currentIndex <= initialIndex &&
                currentIndex >= displayedColumns.indexOf(this.cellRange.columns[0] as AgColumn)
            ) {
                this.reduceHorizontal(initialPosition, currentPosition);
                this.isReduce = true;
            } else {
                this.extendHorizontal(initialPosition, currentPosition, currentIndex < initialIndex);
                this.isReduce = false;
            }
        }
        this.lastCellMarked = currentPosition;
    }

    private extendVertical(initialPosition: CellPosition, endPosition: CellPosition, isMovingUp?: boolean) {
        const beans = this.beans;
        const { rangeSvc } = beans;

        let row: RowPosition | null = initialPosition;

        do {
            const cellRange = this.cellRange;
            const colLen = cellRange.columns.length;

            for (let i = 0; i < colLen; i++) {
                const column = cellRange.columns[i];
                const rowPos = { rowIndex: row.rowIndex, rowPinned: row.rowPinned };
                const cellPos = { ...rowPos, column };
                const cellInRange = rangeSvc!.isCellInSpecificRange(cellPos, cellRange);
                const isInitialRow = _isSameRow(row, initialPosition);

                if (isMovingUp) {
                    this.isUp = true;
                }

                if (!isInitialRow) {
                    const cell = _getCellByPosition(beans, cellPos);

                    if (cell) {
                        this.markedCells.push(cell);
                        const cellComp = cell.comp;

                        if (!cellInRange) {
                            cellComp.toggleCss('ag-selection-fill-left', i === 0);
                            cellComp.toggleCss('ag-selection-fill-right', i === colLen - 1);
                        }

                        cellComp.toggleCss(
                            isMovingUp ? 'ag-selection-fill-top' : 'ag-selection-fill-bottom',
                            _isSameRow(row, endPosition)
                        );
                    }
                }
            }

            if (_isSameRow(row, endPosition)) {
                break;
            }
        } while (
            // tslint:disable-next-line
            (row = isMovingUp ? _getRowAbove(this.beans, row) : _getRowBelow(beans, row))
        );
    }

    private reduceVertical(initialPosition: CellPosition, endPosition: CellPosition) {
        let row: RowPosition | null = initialPosition;
        const beans = this.beans;

        do {
            const cellRange = this.cellRange;
            const colLen = cellRange.columns.length;
            const isLastRow = _isSameRow(row, endPosition);

            for (let i = 0; i < colLen; i++) {
                const rowPos = { rowIndex: row.rowIndex, rowPinned: row.rowPinned };
                const celPos = { ...rowPos, column: cellRange.columns[i] };
                const cell = _getCellByPosition(beans, celPos);

                if (cell) {
                    this.markedCells.push(cell);

                    cell.comp.toggleCss('ag-selection-fill-bottom', _isSameRow(row, endPosition));
                }
            }
            if (isLastRow) {
                break;
            }
            // tslint:disable-next-line
        } while ((row = _getRowAbove(beans, row)));
    }

    private extendHorizontal(initialPosition: CellPosition, endPosition: CellPosition, isMovingLeft?: boolean) {
        const beans = this.beans;
        const { visibleCols } = beans;
        const allCols = visibleCols.allCols;
        const startCol = allCols.indexOf((isMovingLeft ? endPosition.column : initialPosition.column) as AgColumn);
        const endCol = allCols.indexOf((isMovingLeft ? this.cellRange.columns[0] : endPosition.column) as AgColumn);
        const offset = isMovingLeft ? 0 : 1;

        const colsToMark = allCols.slice(startCol + offset, endCol + offset);
        const { rangeStartRow, rangeEndRow } = this;

        colsToMark.forEach((column) => {
            let row: RowPosition = rangeStartRow;
            let isLastRow = false;

            do {
                isLastRow = _isSameRow(row, rangeEndRow);
                const cell = _getCellByPosition(beans, {
                    rowIndex: row.rowIndex,
                    rowPinned: row.rowPinned,
                    column: column,
                });

                if (cell) {
                    this.markedCells.push(cell);
                    const cellComp = cell.comp;

                    cellComp.toggleCss('ag-selection-fill-top', _isSameRow(row, rangeStartRow));
                    cellComp.toggleCss('ag-selection-fill-bottom', _isSameRow(row, rangeEndRow));
                    if (isMovingLeft) {
                        this.isLeft = true;
                        cellComp.toggleCss('ag-selection-fill-left', column === colsToMark[0]);
                    } else {
                        cellComp.toggleCss('ag-selection-fill-right', column === _last(colsToMark));
                    }
                }

                row = _getRowBelow(beans, row)!;
            } while (!isLastRow);
        });
    }

    private reduceHorizontal(initialPosition: CellPosition, endPosition: CellPosition) {
        const beans = this.beans;
        const { visibleCols } = beans;
        const allCols = visibleCols.allCols;
        const startCol = allCols.indexOf(endPosition.column as AgColumn);
        const endCol = allCols.indexOf(initialPosition.column as AgColumn);

        const colsToMark = allCols.slice(startCol, endCol);
        const { rangeStartRow, rangeEndRow } = this;

        colsToMark.forEach((column) => {
            let row: RowPosition = rangeStartRow;
            let isLastRow: boolean = false;

            do {
                isLastRow = _isSameRow(row, rangeEndRow);
                const cell = _getCellByPosition(this.beans, {
                    rowIndex: row.rowIndex,
                    rowPinned: row.rowPinned,
                    column: column,
                });

                if (cell) {
                    this.markedCells.push(cell);
                    cell.comp.toggleCss('ag-selection-fill-right', column === colsToMark[0]);
                }

                row = _getRowBelow(beans, row)!;
            } while (!isLastRow);
        });
    }

    public override refresh(cellCtrl: CellCtrl) {
        const cellRange = this.beans.rangeSvc!.getCellRanges()[0];
        const isColumnRange = !cellRange.startRow || !cellRange.endRow;

        if (isColumnRange) {
            this.destroy();
            return;
        }

        super.refresh(cellCtrl);
    }
}
