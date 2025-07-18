import type { ColumnModel } from '../columns/columnModel';
import { isColumnGroupAutoCol, isColumnSelectionCol, isRowNumberCol } from '../columns/columnUtils';
import { GroupInstanceIdCreator } from '../columns/groupInstanceIdCreator';
import type { VisibleColsService } from '../columns/visibleColsService';
import type { NamedBean } from '../context/bean';
import { BeanStub } from '../context/beanStub';
import type { BeanCollection } from '../context/context';
import type { AgColumn } from '../entities/agColumn';
import type { AgColumnGroup } from '../entities/agColumnGroup';
import { isColumnGroup } from '../entities/agColumnGroup';
import type { RowNode } from '../entities/rowNode';
import {
    _addGridCommonParams,
    _canSkipShowingRowGroup,
    _isClientSideRowModel,
    _isServerSideRowModel,
} from '../gridOptionsUtils';
import type {
    ExportParams,
    ProcessGroupHeaderForExportParams,
    ShouldRowBeSkippedParams,
} from '../interfaces/exportParams';
import type { IPinnedRowModel } from '../interfaces/iPinnedRowModel';
import type { IRowModel } from '../interfaces/iRowModel';
import { _last } from '../utils/array';
import type { GridSerializingSession, RowAccumulator, RowSpanningAccumulator } from './iGridSerializer';

type ProcessGroupHeaderCallback = (params: ProcessGroupHeaderForExportParams) => string;

export class AcDGGridSerializer extends BeanStub implements NamedBean {
    beanName = 'gridSerializer' as const;

    private visibleCols: VisibleColsService;
    private colModel: ColumnModel;
    private rowModel: IRowModel;
    private pinnedRowModel?: IPinnedRowModel;

    public wireBeans(beans: BeanCollection): void {
        this.visibleCols = beans.visibleCols;
        this.colModel = beans.colModel;
        this.rowModel = beans.rowModel;
        this.pinnedRowModel = beans.pinnedRowModel;
    }

    public serialize<T>(gridSerializingSession: GridSerializingSession<T>, params: ExportParams<T> = {}): string {
        const { allColumns, columnKeys, skipRowGroups, exportRowNumbers } = params;
        const columnsToExport = this.getColumnsToExport({
            allColumns,
            skipRowGroups,
            columnKeys: columnKeys as (string | AgColumn)[] | undefined,
            exportRowNumbers,
        });

        return [
            // first pass, put in the header names of the cols
            this.prepareSession(columnsToExport),
            this.prependContent(params),
            this.exportColumnGroups(params, columnsToExport),
            this.exportHeaders(params, columnsToExport),
            this.processPinnedTopRows(params, columnsToExport),
            this.processRows(params, columnsToExport),
            this.processPinnedBottomRows(params, columnsToExport),
            this.appendContent(params),
        ]
            .reduce((composed, f) => f(composed), gridSerializingSession)
            .parse();
    }

    private processRow<T>(
        gridSerializingSession: GridSerializingSession<T>,
        params: ExportParams<T>,
        columnsToExport: AgColumn[],
        node: RowNode
    ): void {
        const rowSkipper: (params: ShouldRowBeSkippedParams) => boolean = params.shouldRowBeSkipped || (() => false);
        // if onlySelected, we ignore groupHideOpenParents as the user has explicitly selected the rows they wish to export.
        // similarly, if specific rowNodes are provided we do the same. (the clipboard service uses rowNodes to define which rows to export)
        const isClipboardExport = params.rowPositions != null;
        const isExplicitExportSelection = isClipboardExport || !!params.onlySelected;
        const hideOpenParents = this.gos.get('groupHideOpenParents') && !isExplicitExportSelection;
        const isLeafNode = this.colModel.isPivotMode() ? node.leafGroup : !node.group;
        const isFooter = !!node.footer;
        const shouldSkipCurrentGroup =
            node.allChildrenCount === 1 &&
            node.childrenAfterGroup?.length === 1 &&
            _canSkipShowingRowGroup(this.gos, node);

        if (
            (!isLeafNode && !isFooter && (params.skipRowGroups || shouldSkipCurrentGroup || hideOpenParents)) ||
            (params.onlySelected && !node.isSelected()) ||
            (params.skipPinnedTop && node.rowPinned === 'top') ||
            (params.skipPinnedBottom && node.rowPinned === 'bottom') ||
            node.stub // skip SSRM stub/loading rows
        ) {
            return;
        }

        // if we are in pivotMode, then the grid will show the root node only
        // if it's not a leaf group
        const nodeIsRootNode = node.level === -1;

        if (nodeIsRootNode && !isLeafNode && !isFooter) {
            return;
        }

        const shouldRowBeSkipped = rowSkipper(_addGridCommonParams(this.gos, { node }));

        if (shouldRowBeSkipped) {
            return;
        }

        const rowAccumulator: RowAccumulator = gridSerializingSession.onNewBodyRow(node);
        columnsToExport.forEach((column: AgColumn, index: number) => {
            rowAccumulator.onColumn(column, index, node);
        });

        if (params.getCustomContentBelowRow) {
            const content = params.getCustomContentBelowRow(_addGridCommonParams(this.gos, { node }));
            if (content) {
                gridSerializingSession.addCustomContent(content);
            }
        }
    }

    private appendContent<T>(
        params: ExportParams<T>
    ): (gridSerializingSession: GridSerializingSession<T>) => GridSerializingSession<T> {
        return (gridSerializingSession: GridSerializingSession<T>) => {
            const appendContent = params.appendContent;
            if (appendContent) {
                gridSerializingSession.addCustomContent(appendContent);
            }
            return gridSerializingSession;
        };
    }

    private prependContent<T>(
        params: ExportParams<T>
    ): (gridSerializingSession: GridSerializingSession<T>) => GridSerializingSession<T> {
        return (gridSerializingSession: GridSerializingSession<T>) => {
            const prependContent = params.prependContent;
            if (prependContent) {
                gridSerializingSession.addCustomContent(prependContent);
            }
            return gridSerializingSession;
        };
    }

    private prepareSession<T>(
        columnsToExport: AgColumn[]
    ): (gridSerializingSession: GridSerializingSession<T>) => GridSerializingSession<T> {
        return (gridSerializingSession) => {
            gridSerializingSession.prepare(columnsToExport);
            return gridSerializingSession;
        };
    }

    private exportColumnGroups<T>(
        params: ExportParams<T>,
        columnsToExport: AgColumn[]
    ): (gridSerializingSession: GridSerializingSession<T>) => GridSerializingSession<T> {
        return (gridSerializingSession) => {
            if (!params.skipColumnGroupHeaders) {
                const idCreator: GroupInstanceIdCreator = new GroupInstanceIdCreator();
                const { colGroupSvc } = this.beans;
                const displayedGroups: (AgColumn | AgColumnGroup)[] = colGroupSvc
                    ? colGroupSvc.createColumnGroups({
                          columns: columnsToExport,
                          idCreator,
                          pinned: null,
                          isStandaloneStructure: true,
                      })
                    : columnsToExport;

                this.recursivelyAddHeaderGroups(
                    displayedGroups,
                    gridSerializingSession,
                    params.processGroupHeaderCallback
                );
            }
            return gridSerializingSession;
        };
    }

    private exportHeaders<T>(
        params: ExportParams<T>,
        columnsToExport: AgColumn[]
    ): (gridSerializingSession: GridSerializingSession<T>) => GridSerializingSession<T> {
        return (gridSerializingSession) => {
            if (!params.skipColumnHeaders) {
                const gridRowIterator = gridSerializingSession.onNewHeaderRow();
                columnsToExport.forEach((column, index) => {
                    gridRowIterator.onColumn(column, index, undefined);
                });
            }
            return gridSerializingSession;
        };
    }

    private processPinnedTopRows<T>(
        params: ExportParams<T>,
        columnsToExport: AgColumn[]
    ): (gridSerializingSession: GridSerializingSession<T>) => GridSerializingSession<T> {
        return (gridSerializingSession) => {
            const processRow = this.processRow.bind(this, gridSerializingSession, params, columnsToExport);

            if (params.rowPositions) {
                params.rowPositions
                    // only pinnedTop rows, other models are processed by `processRows` and `processPinnedBottomsRows`
                    .filter((position) => position.rowPinned === 'top')
                    .sort((a, b) => a.rowIndex - b.rowIndex)
                    .map((position) => this.pinnedRowModel?.getPinnedTopRow(position.rowIndex))
                    .forEach(processRow);
            } else if (!this.pinnedRowModel?.isManual()) {
                // only process pinned rows if they are statically pinned
                this.pinnedRowModel?.forEachPinnedRow('top', processRow);
            }
            return gridSerializingSession;
        };
    }

    private processRows<T>(
        params: ExportParams<T>,
        columnsToExport: AgColumn[]
    ): (gridSerializingSession: GridSerializingSession<T>) => GridSerializingSession<T> {
        return (gridSerializingSession) => {
            // when in pivot mode, we always render cols on screen, never 'all columns'
            const rowModel = this.rowModel;
            const usingCsrm = _isClientSideRowModel(this.gos, rowModel);
            const usingSsrm = _isServerSideRowModel(this.gos, rowModel);
            const onlySelectedNonStandardModel = !usingCsrm && params.onlySelected;
            const processRow = this.processRow.bind(this, gridSerializingSession, params, columnsToExport);
            const { exportedRows = 'filteredAndSorted' } = params;

            if (params.rowPositions) {
                params.rowPositions
                    // pinnedRows are processed by `processPinnedTopRows` and `processPinnedBottomsRows`
                    .filter((position) => position.rowPinned == null)
                    .sort((a, b) => a.rowIndex - b.rowIndex)
                    .map((position) => rowModel.getRow(position.rowIndex))
                    .forEach(processRow);

                return gridSerializingSession;
            }

            if (this.colModel.isPivotMode()) {
                if (usingCsrm) {
                    rowModel.forEachPivotNode(processRow, true, exportedRows === 'filteredAndSorted');
                } else if (usingSsrm) {
                    rowModel.forEachNodeAfterFilterAndSort(processRow, true);
                } else {
                    // must be enterprise, so we can just loop through all the nodes
                    rowModel.forEachNode(processRow);
                }

                return gridSerializingSession;
            }

            // onlySelectedAllPages: user doing pagination and wants selected items from
            // other pages, so cannot use the standard row model as it won't have rows from
            // other pages.
            // onlySelectedNonStandardModel: if user wants selected in non standard row model
            // (eg viewport) then again RowModel cannot be used, so need to use selected instead.
            if (params.onlySelectedAllPages || onlySelectedNonStandardModel) {
                const selectedNodes = this.beans.selectionSvc?.getSelectedNodes() ?? [];
                this.replicateSortedOrder(selectedNodes);
                // serialize each node
                selectedNodes.forEach(processRow);
            } else {
                // here is everything else - including standard row model and selected. we don't use
                // the selection model even when just using selected, so that the result is the order
                // of the rows appearing on the screen.
                if (exportedRows === 'all') {
                    rowModel.forEachNode(processRow);
                } else if (usingCsrm || usingSsrm) {
                    rowModel.forEachNodeAfterFilterAndSort(processRow, true);
                } else {
                    rowModel.forEachNode(processRow);
                }
            }

            return gridSerializingSession;
        };
    }

    private replicateSortedOrder(rows: RowNode[]) {
        const { sortSvc, rowNodeSorter } = this.beans;
        if (!sortSvc || !rowNodeSorter) {
            return;
        }
        const sortOptions = sortSvc.getSortOptions();
        const compareNodes = (rowA: RowNode, rowB: RowNode): number => {
            if (rowA.rowIndex != null && rowB.rowIndex != null) {
                // if the rows have rowIndexes, this is the easiest way to compare,
                // as they're already ordered
                return rowA.rowIndex - rowB.rowIndex;
            }

            // if the level is the same, compare these nodes, or their parents
            if (rowA.level === rowB.level) {
                if (rowA.parent?.id === rowB.parent?.id) {
                    return rowNodeSorter!.compareRowNodes(
                        sortOptions,
                        {
                            rowNode: rowA,
                            currentPos: rowA.rowIndex ?? -1,
                        },
                        {
                            rowNode: rowB,
                            currentPos: rowB.rowIndex ?? -1,
                        }
                    );
                }

                // level is same, but parent isn't, compare parents
                return compareNodes(rowA.parent!, rowB.parent!);
            }

            // if level is different, match levels
            if (rowA.level > rowB.level) {
                return compareNodes(rowA.parent!, rowB);
            }
            return compareNodes(rowA, rowB.parent!);
        };

        // sort the nodes either by existing row index or compare them
        rows.sort(compareNodes);
    }

    private processPinnedBottomRows<T>(
        params: ExportParams<T>,
        columnsToExport: AgColumn[]
    ): (gridSerializingSession: GridSerializingSession<T>) => GridSerializingSession<T> {
        return (gridSerializingSession) => {
            const processRow = this.processRow.bind(this, gridSerializingSession, params, columnsToExport);

            if (params.rowPositions) {
                params.rowPositions
                    // only pinnedBottom rows, other models are processed by `processRows` and `processPinnedTopRows`
                    .filter((position) => position.rowPinned === 'bottom')
                    .sort((a, b) => a.rowIndex - b.rowIndex)
                    .map((position) => this.pinnedRowModel?.getPinnedBottomRow(position.rowIndex))
                    .forEach(processRow);
            } else if (!this.pinnedRowModel?.isManual()) {
                // only process pinned rows if they are statically pinned
                this.pinnedRowModel?.forEachPinnedRow('bottom', processRow);
            }
            return gridSerializingSession;
        };
    }

    private getColumnsToExport(params: {
        allColumns?: boolean;
        skipRowGroups?: boolean;
        exportRowNumbers?: boolean;
        columnKeys?: (string | AgColumn)[];
    }): AgColumn[] {
        const { allColumns = false, skipRowGroups = false, exportRowNumbers = false, columnKeys } = params;
        const { colModel, gos, visibleCols } = this;
        const isPivotMode = colModel.isPivotMode();

        const filterSpecialColumns = (col: AgColumn) => {
            if (isColumnSelectionCol(col)) {
                return false;
            }

            return !isRowNumberCol(col) || exportRowNumbers;
        };

        if (columnKeys && columnKeys.length) {
            return colModel.getColsForKeys(columnKeys).filter(filterSpecialColumns);
        }

        const isTreeData = gos.get('treeData');

        let columnsToExport: AgColumn[] = [];

        if (allColumns && !isPivotMode) {
            columnsToExport = colModel.getCols();
        } else {
            columnsToExport = visibleCols.allCols;
        }

        columnsToExport = columnsToExport.filter(
            (column) =>
                filterSpecialColumns(column) && (skipRowGroups && !isTreeData ? !isColumnGroupAutoCol(column) : true)
        );

        return columnsToExport;
    }

    private recursivelyAddHeaderGroups<T>(
        displayedGroups: (AgColumn | AgColumnGroup)[],
        gridSerializingSession: GridSerializingSession<T>,
        processGroupHeaderCallback: ProcessGroupHeaderCallback | undefined
    ): void {
        const directChildrenHeaderGroups: (AgColumn | AgColumnGroup)[] = [];
        displayedGroups.forEach((columnGroupChild) => {
            const columnGroup = columnGroupChild as AgColumnGroup;
            if (!columnGroup.getChildren) {
                return;
            }
            columnGroup.getChildren()!.forEach((it) => directChildrenHeaderGroups.push(it));
        });

        if (displayedGroups.length > 0 && isColumnGroup(displayedGroups[0])) {
            this.doAddHeaderHeader(gridSerializingSession, displayedGroups, processGroupHeaderCallback);
        }

        if (directChildrenHeaderGroups && directChildrenHeaderGroups.length > 0) {
            this.recursivelyAddHeaderGroups(
                directChildrenHeaderGroups,
                gridSerializingSession,
                processGroupHeaderCallback
            );
        }
    }

    private doAddHeaderHeader<T>(
        gridSerializingSession: GridSerializingSession<T>,
        displayedGroups: (AgColumn | AgColumnGroup)[],
        processGroupHeaderCallback: ProcessGroupHeaderCallback | undefined
    ) {
        const gridRowIterator: RowSpanningAccumulator = gridSerializingSession.onNewHeaderGroupingRow();
        let columnIndex: number = 0;
        displayedGroups.forEach((columnGroupChild) => {
            const columnGroup: AgColumnGroup = columnGroupChild as AgColumnGroup;

            let name: string;
            if (processGroupHeaderCallback) {
                name = processGroupHeaderCallback(
                    _addGridCommonParams(this.gos, {
                        columnGroup: columnGroup,
                    })
                );
            } else {
                name = this.beans.colNames.getDisplayNameForColumnGroup(columnGroup, 'header')!;
            }

            const collapsibleGroupRanges = columnGroup
                .getLeafColumns()
                .reduce((collapsibleGroups: number[][], currentColumn, currentIdx, arr) => {
                    let lastGroup = _last(collapsibleGroups);
                    const groupShow = currentColumn.getColumnGroupShow() === 'open';

                    if (!groupShow) {
                        if (lastGroup && lastGroup[1] == null) {
                            lastGroup[1] = currentIdx - 1;
                        }
                    } else if (!lastGroup || lastGroup[1] != null) {
                        lastGroup = [currentIdx];
                        collapsibleGroups.push(lastGroup);
                    }

                    if (currentIdx === arr.length - 1 && lastGroup && lastGroup[1] == null) {
                        lastGroup[1] = currentIdx;
                    }

                    return collapsibleGroups;
                }, []);

            gridRowIterator.onColumn(
                columnGroup,
                name || '',
                columnIndex++,
                columnGroup.getLeafColumns().length - 1,
                collapsibleGroupRanges
            );
        });
    }
}
