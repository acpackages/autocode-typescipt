import type {
    AgColumn,
    AllEventsWithoutGridCommon,
    ColDef,
    ColumnEventType,
    ColumnStateParams,
    IColsService,
    NamedBean,
} from 'ag-grid-community';
import { BaseColsService, _removeFromArray, _shouldUpdateColVisibilityAfterGroup } from 'ag-grid-community';

export class AcDGRowGroupColsSvc extends BaseColsService implements NamedBean, IColsService {
    beanName = 'rowGroupColsSvc' as const;
    eventName = 'columnRowGroupChanged' as const;

    override columnProcessors = {
        set: (column: AgColumn, added: boolean, source: ColumnEventType) => this.setActive(added, column, source),
        add: (column: AgColumn, added: boolean, source: ColumnEventType) => this.setActive(true, column, source),
        remove: (column: AgColumn, added: boolean, source: ColumnEventType) => this.setActive(false, column, source),
    } as const;

    override columnOrdering = {
        enableProp: 'rowGroup',
        initialEnableProp: 'initialRowGroup',
        indexProp: 'rowGroupIndex',
        initialIndexProp: 'initialRowGroupIndex',
    } as const;

    override columnExtractors = {
        setFlagFunc: (col: AgColumn, flag: boolean, source: ColumnEventType) =>
            this.setColRowGroupActive(col, flag, source),
        getIndexFunc: (colDef: ColDef) => colDef.rowGroupIndex,
        getInitialIndexFunc: (colDef: ColDef) => colDef.initialRowGroupIndex,
        getValueFunc: (colDef: ColDef) => colDef.rowGroup,
        getInitialValueFunc: (colDef: ColDef) => colDef.initialRowGroup,
    } as const;

    private modifyColumnsNoEventsCallbacks = {
        addCol: (column: AgColumn) => this.columns.push(column),
        removeCol: (column: AgColumn) => _removeFromArray(this.columns, column),
    };

    public moveColumn(fromIndex: number, toIndex: number, source: ColumnEventType): void {
        if (this.columns.length === 0) {
            return;
        }

        const column = this.columns[fromIndex];

        const impactedColumns = this.columns.slice(fromIndex, toIndex);
        this.columns.splice(fromIndex, 1);
        this.columns.splice(toIndex, 0, column);

        this.updateIndexMap();

        this.eventSvc.dispatchEvent({
            type: this.eventName,
            columns: impactedColumns,
            column: impactedColumns.length === 1 ? impactedColumns[0] : null,
            source,
        } as AllEventsWithoutGridCommon);
    }

    public syncColumnWithState(
        column: AgColumn,
        source: ColumnEventType,
        getValue: <U extends keyof ColumnStateParams, S extends keyof ColumnStateParams>(
            key1: U,
            key2?: S
        ) => { value1: ColumnStateParams[U] | undefined; value2: ColumnStateParams[S] | undefined },
        rowIndex: { [key: string]: number } | null
    ): void {
        const { value1: rowGroup, value2: rowGroupIndex } = getValue('rowGroup', 'rowGroupIndex');
        if (rowGroup !== undefined || rowGroupIndex !== undefined) {
            if (typeof rowGroupIndex === 'number' || rowGroup) {
                if (!column.isRowGroupActive()) {
                    this.setColRowGroupActive(column, true, source);
                    this.modifyColumnsNoEventsCallbacks.addCol(column);
                }
                if (rowIndex && typeof rowGroupIndex === 'number') {
                    rowIndex[column.getId()] = rowGroupIndex;
                }
            } else {
                if (column.isRowGroupActive()) {
                    this.setColRowGroupActive(column, false, source);
                    this.modifyColumnsNoEventsCallbacks.removeCol(column);
                }
            }
        }
    }

    private setActive(active: boolean, column: AgColumn, source: ColumnEventType): void {
        if (active === column.isRowGroupActive()) {
            return;
        }

        this.setColRowGroupActive(column, active, source);

        if (_shouldUpdateColVisibilityAfterGroup(this.gos, active)) {
            this.colModel.setColsVisible([column], !active, source);
        }
    }

    private setColRowGroupActive(column: AgColumn, rowGroup: boolean, source: ColumnEventType): void {
        if (column.rowGroupActive !== rowGroup) {
            column.rowGroupActive = rowGroup;
            column.dispatchColEvent('columnRowGroupChanged', source);
        }
        column.dispatchStateUpdatedEvent('rowGroup');
    }
}
