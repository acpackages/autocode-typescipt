import type {
    AgColumn,
    AgColumnGroup,
    BeanCollection,
    ColumnModel,
    ColumnNameService,
    NamedBean,
    RowNode,
    ValueService,
} from 'ag-grid-community';
import { BeanStub, _getRowNode, _warn } from 'ag-grid-community';

export class AcDGChartColumnService extends BeanStub implements NamedBean {
    beanName = 'chartColSvc' as const;

    private colModel: ColumnModel;
    private colNames: ColumnNameService;
    private valueSvc: ValueService;

    public wireBeans(beans: BeanCollection): void {
        this.colModel = beans.colModel;
        this.colNames = beans.colNames;
        this.valueSvc = beans.valueSvc;
    }

    private valueColsWithoutSeriesType: Set<string> = new Set();

    public postConstruct(): void {
        const clearValueCols = () => this.valueColsWithoutSeriesType.clear();
        this.addManagedEventListeners({
            newColumnsLoaded: clearValueCols,
            rowDataUpdated: clearValueCols,
        });
    }

    public getColumn(colId: string): AgColumn | null {
        return this.colModel.getColDefCol(colId);
    }

    public getAllDisplayedColumns(): AgColumn[] {
        return this.beans.visibleCols.allCols;
    }

    public getColDisplayName(col: AgColumn, includePath?: boolean): string | null {
        const headerLocation = 'chart';
        const columnDisplayName = this.colNames.getDisplayNameForColumn(col, headerLocation);
        if (includePath) {
            const displayNames = [columnDisplayName];
            const getDisplayName = (colGroup: AgColumnGroup | null) => {
                if (!colGroup) {
                    return;
                }
                const colGroupName = this.colNames.getDisplayNameForColumnGroup(colGroup, headerLocation);
                if (colGroupName?.length) {
                    displayNames.unshift(colGroupName);
                    getDisplayName(colGroup.getParent());
                }
            };
            getDisplayName(col.getParent());
            return displayNames.join(' - ');
        }
        return columnDisplayName;
    }

    public getRowGroupColumns(): AgColumn[] {
        return this.beans.rowGroupColsSvc?.columns ?? [];
    }

    public getGroupDisplayColumns(): AgColumn[] {
        return this.beans.showRowGroupCols?.getShowRowGroupCols() ?? [];
    }

    public isPivotMode(): boolean {
        return this.colModel.isPivotMode();
    }

    public isPivotActive(): boolean {
        return this.colModel.isPivotActive();
    }

    public getChartColumns(): { dimensionCols: Set<AgColumn>; valueCols: Set<AgColumn> } {
        const gridCols = this.colModel.getCols();

        const dimensionCols = new Set<AgColumn>();
        const valueCols = new Set<AgColumn>();

        gridCols.forEach((col) => {
            const colDef = col.getColDef();
            const chartDataType = colDef.chartDataType;

            if (chartDataType) {
                // chart data type was specified explicitly
                switch (chartDataType) {
                    case 'category':
                    case 'time':
                        dimensionCols.add(col);
                        return;
                    case 'series':
                        valueCols.add(col);
                        return;
                    case 'excluded':
                        return;
                    default:
                        _warn(153, { chartDataType });
                        break;
                }
            }

            if (colDef.colId === 'ag-Grid-AutoColumn') {
                dimensionCols.add(col);
                return;
            }

            if (!col.isPrimary()) {
                valueCols.add(col);
                return;
            }

            // if 'chartDataType' is not provided then infer type based data contained in first row
            (this.isInferredValueCol(col) ? valueCols : dimensionCols).add(col);
        });

        return { dimensionCols, valueCols };
    }

    private isInferredValueCol(col: AgColumn): boolean {
        const colId = col.getColId();
        if (colId === 'ag-Grid-AutoColumn') {
            return false;
        }

        const row = _getRowNode(this.beans, { rowIndex: 0, rowPinned: null });

        if (!row) {
            return this.valueColsWithoutSeriesType.has(colId);
        }

        let cellValue = this.valueSvc.getValue(col, row);

        if (cellValue == null) {
            cellValue = this.extractLeafData(row, col);
        }

        if (cellValue != null) {
            // unwrap value objects if present
            if (typeof cellValue.toNumber === 'function') {
                cellValue = cellValue.toNumber();
            } else if (typeof cellValue.value === 'number') {
                cellValue = cellValue.value;
            }
        }

        const isNumber =
            typeof cellValue === 'number' ||
            col.colDef.cellDataType === 'number' ||
            ['series', 'time'].includes(col.colDef.chartDataType as string);

        if (isNumber) {
            this.valueColsWithoutSeriesType.add(colId);
        } else if (cellValue == null && col.colDef.cellDataType !== 'number') {
            _warn(265, { colId });
        }

        return isNumber;
    }

    private extractLeafData(row: RowNode, col: AgColumn): any {
        if (!row.allLeafChildren) {
            return null;
        }

        for (let i = 0; i < row.allLeafChildren.length; i++) {
            const childRow = row.allLeafChildren[i];
            const value = this.valueSvc.getValue(col, childRow);

            if (value != null) {
                return value;
            }
        }

        return null;
    }

    public override destroy(): void {
        this.valueColsWithoutSeriesType.clear();
        super.destroy();
    }
}
