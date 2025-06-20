import type { NamedBean } from '../context/bean';
import { BeanStub } from '../context/beanStub';
import type { AgColumn } from '../entities/agColumn';
import type { SortDirection } from '../entities/colDef';
import type { ColumnEventType, IAcDGSortChangedEvent } from '../events';
import { _isColumnsSortingCoupledToGroup } from '../gridOptionsUtils';
import type { WithoutGridCommon } from '../interfaces/iCommon';
import type { SortModelItem } from '../interfaces/iSortModelItem';
import type { SortOption } from '../interfaces/iSortOption';
import type { Component, ComponentSelector } from '../widgets/component';
import { SortIndicatorComp, SortIndicatorSelector } from './sortIndicatorComp';

export const DEFAULT_SORTING_ORDER: SortDirection[] = ['asc', 'desc', null];
export class AcDGSortService extends BeanStub implements NamedBean {
    beanName = 'sortSvc' as const;

    public progressSort(column: AgColumn, multiSort: boolean, source: ColumnEventType): void {
        const nextDirection = this.getNextSortDirection(column);
        this.setSortForColumn(column, nextDirection, multiSort, source);
    }

    public progressSortFromEvent(column: AgColumn, event: MouseEvent | KeyboardEvent): void {
        const sortUsingCtrl = this.gos.get('multiSortKey') === 'ctrl';
        const multiSort = sortUsingCtrl ? event.ctrlKey || event.metaKey : event.shiftKey;
        this.progressSort(column, multiSort, 'uiColumnSorted');
    }

    public setSortForColumn(column: AgColumn, sort: SortDirection, multiSort: boolean, source: ColumnEventType): void {
        // auto correct - if sort not legal value, then set it to 'no sort' (which is null)
        if (sort !== 'asc' && sort !== 'desc') {
            sort = null;
        }

        const { gos, showRowGroupCols } = this.beans;

        const isColumnsSortingCoupledToGroup = _isColumnsSortingCoupledToGroup(gos);
        let columnsToUpdate = [column];
        if (isColumnsSortingCoupledToGroup) {
            if (column.getColDef().showRowGroup) {
                const rowGroupColumns = showRowGroupCols?.getSourceColumnsForGroupColumn?.(column);
                const sortableRowGroupColumns = rowGroupColumns?.filter((col) => col.isSortable());

                if (sortableRowGroupColumns) {
                    columnsToUpdate = [column, ...sortableRowGroupColumns];
                }
            }
        }

        columnsToUpdate.forEach((col) => this.setColSort(col, sort, source));

        const doingMultiSort = (multiSort || gos.get('alwaysMultiSort')) && !gos.get('suppressMultiSort');

        // clear sort on all columns except those changed, and update the icons
        const updatedColumns: AgColumn[] = [];
        if (!doingMultiSort) {
            const clearedColumns = this.clearSortBarTheseColumns(columnsToUpdate, source);
            updatedColumns.push(...clearedColumns);
        }

        // sortIndex used for knowing order of cols when multi-col sort
        this.updateSortIndex(column);

        updatedColumns.push(...columnsToUpdate);
        this.dispatchSortChangedEvents(source, updatedColumns);
    }

    private updateSortIndex(lastColToChange: AgColumn) {
        const { gos, colModel, showRowGroupCols } = this.beans;
        const isCoupled = _isColumnsSortingCoupledToGroup(gos);
        const groupParent = showRowGroupCols?.getShowRowGroupCol(lastColToChange.getId());
        const lastSortIndexCol = isCoupled ? groupParent || lastColToChange : lastColToChange;

        const allSortedCols = this.getColumnsWithSortingOrdered();

        // reset sort index on everything
        colModel.forAllCols((col) => this.setColSortIndex(col, null));

        const allSortedColsWithoutChangesOrGroups = allSortedCols.filter((col) => {
            if (isCoupled && col.getColDef().showRowGroup) {
                return false;
            }
            return col !== lastSortIndexCol;
        });
        const sortedColsWithIndices = lastSortIndexCol.getSort()
            ? [...allSortedColsWithoutChangesOrGroups, lastSortIndexCol]
            : allSortedColsWithoutChangesOrGroups;
        sortedColsWithIndices.forEach((col, idx) => this.setColSortIndex(col, idx));
    }

    // gets called by API, so if data changes, use can call this, which will end up
    // working out the sort order again of the rows.
    public onSortChanged(source: string, columns?: AgColumn[]): void {
        this.dispatchSortChangedEvents(source, columns);
    }

    public isSortActive(): boolean {
        // pull out all the columns that have sorting set
        let isSorting = false;
        this.beans.colModel.forAllCols((col) => {
            if (col.getSort()) {
                isSorting = true;
            }
        });
        return isSorting;
    }

    public dispatchSortChangedEvents(source: string, columns?: AgColumn[]): void {
        const event: WithoutGridCommon<IAcDGSortChangedEvent> = {
            type: 'sortChanged',
            source,
        };

        if (columns) {
            event.columns = columns;
        }
        this.eventSvc.dispatchEvent(event);
    }

    private clearSortBarTheseColumns(columnsToSkip: AgColumn[], source: ColumnEventType): AgColumn[] {
        const clearedColumns: AgColumn[] = [];
        this.beans.colModel.forAllCols((columnToClear) => {
            // Do not clear if either holding shift, or if column in question was clicked
            if (!columnsToSkip.includes(columnToClear)) {
                // add to list of cleared cols when sort direction is set
                if (columnToClear.getSort()) {
                    clearedColumns.push(columnToClear);
                }

                // setting to 'undefined' as null means 'none' rather than cleared, otherwise issue will arise
                // if sort order is: ['desc', null , 'asc'], as it will start at null rather than 'desc'.
                this.setColSort(columnToClear, undefined, source);
            }
        });

        return clearedColumns;
    }

    private getNextSortDirection(column: AgColumn): SortDirection {
        const sortingOrder: SortDirection[] | null | undefined =
            column.getColDef().sortingOrder ?? this.gos.get('sortingOrder') ?? DEFAULT_SORTING_ORDER;

        const currentIndex = sortingOrder.indexOf(column.getSort()!);
        const notInArray = currentIndex < 0;
        const lastItemInArray = currentIndex == sortingOrder.length - 1;

        return notInArray || lastItemInArray ? sortingOrder[0] : sortingOrder[currentIndex + 1];
    }

    /**
     * @returns a map of sort indexes for every sorted column, if groups sort primaries then they will have equivalent indices
     */
    private getIndexedSortMap(): Map<AgColumn, number> {
        const { gos, colModel, showRowGroupCols, rowGroupColsSvc } = this.beans;
        // pull out all the columns that have sorting set
        let allSortedCols: AgColumn[] = [];
        colModel.forAllCols((col) => {
            if (col.getSort()) {
                allSortedCols.push(col);
            }
        });

        if (colModel.isPivotMode()) {
            const isSortingLinked = _isColumnsSortingCoupledToGroup(gos);
            allSortedCols = allSortedCols.filter((col) => {
                const isAggregated = !!col.getAggFunc();
                const isSecondary = !col.isPrimary();
                const isGroup = isSortingLinked
                    ? showRowGroupCols?.getShowRowGroupCol(col.getId())
                    : col.getColDef().showRowGroup;
                return isAggregated || isSecondary || isGroup;
            });
        }

        const sortedRowGroupCols = rowGroupColsSvc?.columns.filter((col) => !!col.getSort()) ?? [];

        // when both cols are missing sortIndex, we use the position of the col in all cols list.
        // this means if colDefs only have sort, but no sortIndex, we deterministically pick which
        // cols is sorted by first.
        const allColsIndexes: { [id: string]: number } = {};
        allSortedCols.forEach((col, index) => (allColsIndexes[col.getId()] = index));

        // put the columns in order of which one got sorted first
        allSortedCols.sort((a, b) => {
            const iA = a.getSortIndex();
            const iB = b.getSortIndex();
            if (iA != null && iB != null) {
                return iA - iB; // both present, normal comparison
            } else if (iA == null && iB == null) {
                // both missing, compare using column positions
                const posA = allColsIndexes[a.getId()];
                const posB = allColsIndexes[b.getId()];
                return posA > posB ? 1 : -1;
            } else if (iB == null) {
                return -1; // iB missing
            } else {
                return 1; // iA missing
            }
        });

        const isSortLinked = _isColumnsSortingCoupledToGroup(gos) && !!sortedRowGroupCols.length;
        if (isSortLinked) {
            allSortedCols = [
                ...new Set(
                    // if linked sorting, replace all columns with the display group column for index purposes, and ensure uniqueness
                    allSortedCols.map((col) => showRowGroupCols?.getShowRowGroupCol(col.getId()) ?? col)
                ),
            ];
        }

        const indexMap: Map<AgColumn, number> = new Map();

        allSortedCols.forEach((col, idx) => indexMap.set(col, idx));

        // add the row group cols back
        if (isSortLinked) {
            sortedRowGroupCols.forEach((col) => {
                const groupDisplayCol = showRowGroupCols!.getShowRowGroupCol(col.getId())!;
                indexMap.set(col, indexMap.get(groupDisplayCol)!);
            });
        }

        return indexMap;
    }

    public getColumnsWithSortingOrdered(): AgColumn[] {
        // pull out all the columns that have sorting set
        return [...this.getIndexedSortMap().entries()].sort(([, idx1], [, idx2]) => idx1 - idx2).map(([col]) => col);
    }

    // used by server side row models, to sent sort to server
    public getSortModel(): SortModelItem[] {
        return this.getColumnsWithSortingOrdered()
            .filter((column) => column.getSort())
            .map((column) => ({
                sort: column.getSort()!,
                colId: column.getId(),
            }));
    }

    public getSortOptions(): SortOption[] {
        return this.getColumnsWithSortingOrdered()
            .filter((column) => column.getSort())
            .map((column) => ({
                sort: column.getSort()!,
                column,
            }));
    }

    public canColumnDisplayMixedSort(column: AgColumn): boolean {
        const isColumnSortCouplingActive = _isColumnsSortingCoupledToGroup(this.gos);
        const isGroupDisplayColumn = !!column.getColDef().showRowGroup;
        return isColumnSortCouplingActive && isGroupDisplayColumn;
    }

    public getDisplaySortForColumn(column: AgColumn): SortDirection | 'mixed' | undefined {
        const linkedColumns = this.beans.showRowGroupCols?.getSourceColumnsForGroupColumn(column);
        if (!this.canColumnDisplayMixedSort(column) || !linkedColumns?.length) {
            return column.getSort();
        }

        // if column has unique data, its sorting is independent - but can still be mixed
        const columnHasUniqueData = column.getColDef().field != null || !!column.getColDef().valueGetter;
        const sortableColumns = columnHasUniqueData ? [column, ...linkedColumns] : linkedColumns;

        const firstSort = sortableColumns[0].getSort();
        // the == is intentional, as null and undefined both represent no sort, which means they are equivalent
        const allMatch = sortableColumns.every((col) => col.getSort() == firstSort);
        if (!allMatch) {
            return 'mixed';
        }
        return firstSort;
    }

    public getDisplaySortIndexForColumn(column: AgColumn): number | null | undefined {
        return this.getIndexedSortMap().get(column);
    }

    public setupHeader(comp: Component, column: AgColumn, clickElement?: HTMLElement): void {
        let lastMovingChanged = 0;

        // keep track of last time the moving changed flag was set
        comp.addManagedListeners(column, {
            movingChanged: () => {
                lastMovingChanged = Date.now();
            },
        });

        // add the event on the header, so when clicked, we do sorting
        if (clickElement) {
            comp.addManagedElementListeners(clickElement, {
                click: (event: MouseEvent) => {
                    // sometimes when moving a column via dragging, this was also firing a clicked event.
                    // here is issue raised by user: https://ag-grid.zendesk.com/agent/tickets/1076
                    // this check stops sort if a) column is moving or b) column moved less than 200ms ago (so caters for race condition)
                    const moving = column.isMoving();
                    const nowTime = Date.now();
                    // typically there is <2ms if moving flag was set recently, as it would be done in same VM turn
                    const movedRecently = nowTime - lastMovingChanged < 50;
                    const columnMoving = moving || movedRecently;

                    if (!columnMoving) {
                        this.progressSortFromEvent(column, event);
                    }
                },
            });
        }

        const onSortingChanged = () => {
            const sort = column.getSort();
            comp.toggleCss('ag-header-cell-sorted-asc', sort === 'asc');
            comp.toggleCss('ag-header-cell-sorted-desc', sort === 'desc');
            comp.toggleCss('ag-header-cell-sorted-none', !sort);

            if (column.getColDef().showRowGroup) {
                const sourceColumns = this.beans.showRowGroupCols?.getSourceColumnsForGroupColumn(column);
                // this == is intentional, as it allows null and undefined to match, which are both unsorted states
                const sortDirectionsMatch = sourceColumns?.every(
                    (sourceCol) => column.getSort() == sourceCol.getSort()
                );
                const isMultiSorting = !sortDirectionsMatch;

                comp.toggleCss('ag-header-cell-sorted-mixed', isMultiSorting);
            }
        };
        comp.addManagedEventListeners({
            sortChanged: onSortingChanged,
            columnRowGroupChanged: onSortingChanged,
        });
    }

    public initCol(column: AgColumn): void {
        const { sort, initialSort, sortIndex, initialSortIndex } = column.colDef;

        if (sort !== undefined) {
            if (sort === 'asc' || sort === 'desc') {
                column.sort = sort;
            }
        } else {
            if (initialSort === 'asc' || initialSort === 'desc') {
                column.sort = initialSort;
            }
        }

        if (sortIndex !== undefined) {
            if (sortIndex !== null) {
                column.sortIndex = sortIndex;
            }
        } else {
            if (initialSortIndex !== null) {
                column.sortIndex = initialSortIndex;
            }
        }
    }

    public updateColSort(column: AgColumn, sort: SortDirection | undefined, source: ColumnEventType): void {
        if (sort !== undefined) {
            if (sort === 'desc' || sort === 'asc') {
                this.setColSort(column, sort, source);
            } else {
                this.setColSort(column, undefined, source);
            }
        }
    }

    private setColSort(column: AgColumn, sort: SortDirection | undefined, source: ColumnEventType): void {
        if (column.sort !== sort) {
            column.sort = sort;
            column.dispatchColEvent('sortChanged', source);
        }
        column.dispatchStateUpdatedEvent('sort');
    }

    public setColSortIndex(column: AgColumn, sortOrder?: number | null): void {
        column.sortIndex = sortOrder;
        column.dispatchStateUpdatedEvent('sortIndex');
    }

    public createSortIndicator(skipTemplate?: boolean): SortIndicatorComp {
        return new SortIndicatorComp(skipTemplate);
    }

    public getSortIndicatorSelector(): ComponentSelector {
        return SortIndicatorSelector;
    }
}
