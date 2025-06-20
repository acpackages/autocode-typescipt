import type { NamedBean } from '../context/bean';
import { BeanStub } from '../context/beanStub';
import type { AgColumn } from '../entities/agColumn';
import type { RowNode } from '../entities/rowNode';
import { _isColumnsSortingCoupledToGroup, _isGroupUseEntireRow } from '../gridOptionsUtils';
import type { SortOption } from '../interfaces/iSortOption';
import { _defaultComparator } from '../utils/generic';

export interface IAcDGSortedRowNode {
    currentPos: number;
    rowNode: RowNode;
}

// this logic is used by both SSRM and CSRM

export class AcDGRowNodeSorter extends BeanStub implements NamedBean {
    beanName = 'rowNodeSorter' as const;

    private isAccentedSort: boolean;
    private primaryColumnsSortGroups: boolean;

    public postConstruct(): void {
        const { gos } = this;
        this.isAccentedSort = gos.get('accentedSort');
        this.primaryColumnsSortGroups = _isColumnsSortingCoupledToGroup(gos);

        this.addManagedPropertyListener(
            'accentedSort',
            (propChange) => (this.isAccentedSort = propChange.currentValue)
        );
        this.addManagedPropertyListener(
            'autoGroupColumnDef',
            () => (this.primaryColumnsSortGroups = _isColumnsSortingCoupledToGroup(gos))
        );
    }

    public doFullSort(rowNodes: RowNode[], sortOptions: SortOption[]): RowNode[] {
        const sortedRowNodes = rowNodes.map((rowNode, currentPos) => ({
            currentPos,
            rowNode,
        }));

        sortedRowNodes.sort(this.compareRowNodes.bind(this, sortOptions));

        return sortedRowNodes.map((item) => item.rowNode);
    }

    public compareRowNodes(sortOptions: SortOption[], sortedNodeA: SortedRowNode, sortedNodeB: SortedRowNode): number {
        const nodeA: RowNode = sortedNodeA.rowNode;
        const nodeB: RowNode = sortedNodeB.rowNode;

        // Iterate columns, return the first that doesn't match
        for (let i = 0, len = sortOptions.length; i < len; i++) {
            const sortOption = sortOptions[i];
            const isDescending = sortOption.sort === 'desc';

            const valueA = this.getValue(nodeA, sortOption.column as AgColumn);
            const valueB = this.getValue(nodeB, sortOption.column as AgColumn);

            let comparatorResult: number;
            const providedComparator = this.getComparator(sortOption, nodeA);
            if (providedComparator) {
                //if comparator provided, use it
                comparatorResult = providedComparator(valueA, valueB, nodeA, nodeB, isDescending);
            } else {
                //otherwise do our own comparison
                comparatorResult = _defaultComparator(valueA, valueB, this.isAccentedSort);
            }

            // user provided comparators can return 'NaN' if they don't correctly handle 'undefined' values, this
            // typically occurs when the comparator is used on a group row
            const validResult = !isNaN(comparatorResult);

            if (validResult && comparatorResult !== 0) {
                return sortOption.sort === 'asc' ? comparatorResult : comparatorResult * -1;
            }
        }
        // All matched, we make is so that the original sort order is kept:
        return sortedNodeA.currentPos - sortedNodeB.currentPos;
    }

    private getComparator(
        sortOption: SortOption,
        rowNode: RowNode
    ): ((valueA: any, valueB: any, nodeA: RowNode, nodeB: RowNode, isDescending: boolean) => number) | undefined {
        const column = sortOption.column;

        // comparator on col get preference over everything else
        const comparatorOnCol = column.getColDef().comparator;
        if (comparatorOnCol != null) {
            return comparatorOnCol;
        }

        if (!column.getColDef().showRowGroup) {
            return;
        }

        // if a 'field' is supplied on the autoGroupColumnDef we need to use the associated column comparator
        const groupLeafField = !rowNode.group && column.getColDef().field;
        if (!groupLeafField) {
            return;
        }

        const primaryColumn = this.beans.colModel.getColDefCol(groupLeafField);
        if (!primaryColumn) {
            return;
        }

        return primaryColumn.getColDef().comparator;
    }

    private getValue(node: RowNode, column: AgColumn): any {
        const { valueSvc, colModel, showRowGroupCols, gos } = this.beans;
        if (!this.primaryColumnsSortGroups) {
            return valueSvc.getValue(column, node, false);
        }

        const isNodeGroupedAtLevel = node.rowGroupColumn === column;
        if (isNodeGroupedAtLevel) {
            const isGroupRows = _isGroupUseEntireRow(gos, colModel.isPivotActive());
            // because they're group rows, no display cols exist, so groupData never populated.
            // instead delegate to getting value from leaf child.
            if (isGroupRows) {
                const leafChild = node.allLeafChildren?.[0];
                if (leafChild) {
                    return valueSvc.getValue(column, leafChild, false);
                }
                return undefined;
            }

            const displayCol = showRowGroupCols?.getShowRowGroupCol(column.getId());
            if (!displayCol) {
                return undefined;
            }
            return node.groupData?.[displayCol.getId()];
        }

        if (node.group && column.getColDef().showRowGroup) {
            return undefined;
        }

        return valueSvc.getValue(column, node, false);
    }
}
