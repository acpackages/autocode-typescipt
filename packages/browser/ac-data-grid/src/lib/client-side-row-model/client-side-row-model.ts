import type { ColumnModel } from '../columns/columnModel';
import type { NamedBean } from '../context/bean';
import { BeanStub } from '../context/beanStub';
import type { BeanCollection } from '../context/context';
import type { GridOptions } from '../entities/gridOptions';
import type { RowHighlightPosition } from '../entities/rowNode';
import { ROW_ID_PREFIX_ROW_GROUP, RowNode } from '../entities/rowNode';
import type { CssVariablesChanged, IAcDGFilterChangedEvent } from '../events';
import {
    _getGroupSelectsDescendants,
    _getGroupingApproach,
    _getRowHeightForNode,
    _isAnimateRows,
    _isDomLayout,
} from '../gridOptionsUtils';
import type { IClientSideNodeManager } from '../interfaces/iClientSideNodeManager';
import type {
    ClientSideRowModelStage,
    IChangedRowNodes,
    IClientSideRowModel,
    RefreshModelParams,
} from '../interfaces/iClientSideRowModel';
import type { RowBounds, RowModelType } from '../interfaces/iRowModel';
import type { IRowNodeStage } from '../interfaces/iRowNodeStage';
import type { RowDataTransaction } from '../interfaces/rowDataTransaction';
import type { RowNodeTransaction } from '../interfaces/rowNodeTransaction';
import { _EmptyArray, _last } from '../utils/array';
import { ChangedPath } from '../utils/changedPath';
import { _debounce } from '../utils/function';
import { _warn } from '../validation/logging';
import type { ValueCache } from '../valueService/valueCache';
import { ChangedRowNodes } from './changedRowNodes';
import { updateRowNodeAfterFilter } from './filterStage';
import { updateRowNodeAfterSort } from './sortStage';

interface IAcDGClientSideRowModelRootNode extends RowNode {
    childrenAfterGroup: RowNode[] | null;
}

interface IAcDGBatchTransactionItem<TData = any> {
    rowDataTransaction: RowDataTransaction<TData>;
    callback: ((res: RowNodeTransaction<TData>) => void) | undefined;
}

export class AcDGClientSideRowModel extends BeanStub implements IClientSideRowModel, NamedBean {
    beanName = 'rowModel' as const;

    private colModel: ColumnModel;
    private valueCache?: ValueCache;

    // standard stages
    private filterStage?: IRowNodeStage;
    private sortStage?: IRowNodeStage;
    private flattenStage?: IRowNodeStage<RowNode[]>;

    // enterprise stages
    private groupStage?: IRowNodeStage;
    private aggStage?: IRowNodeStage;
    private pivotStage?: IRowNodeStage;
    private filterAggStage?: IRowNodeStage;

    public wireBeans(beans: BeanCollection): void {
        this.colModel = beans.colModel;
        this.valueCache = beans.valueCache;

        this.filterStage = beans.filterStage;
        this.sortStage = beans.sortStage;
        this.flattenStage = beans.flattenStage;

        this.groupStage = beans.groupStage;
        this.aggStage = beans.aggStage;
        this.pivotStage = beans.pivotStage;
        this.filterAggStage = beans.filterAggStage;
    }

    // top most node of the tree. the children are the user provided data.
    public rootNode: RowNode | null = null;

    private rowsToDisplay: RowNode[] = []; // the rows mapped to rows to display
    private nodeManager: IClientSideNodeManager<any>;
    private rowDataTransactionBatch: BatchTransactionItem[] | null;
    private lastHighlightedRow: RowNode | null = null;
    private applyAsyncTransactionsTimeout: number | undefined;
    /** Has the start method been called */
    private started: boolean = false;
    /**
     * This is to prevent refresh model being called when it's already being called.
     * E.g. the group stage can trigger initial state filter model to be applied. This fires onFilterChanged,
     * which then triggers the listener here that calls refresh model again but at the filter stage
     * (which is about to be run by the original call).
     */
    private isRefreshingModel: boolean = false;
    private rowNodesCountReady: boolean = false;
    private rowCountReady: boolean = false;
    private orderedStages: IRowNodeStage[];

    public postConstruct(): void {
        this.orderedStages = [
            this.groupStage,
            this.filterStage,
            this.pivotStage,
            this.aggStage,
            this.sortStage,
            this.filterAggStage,
            this.flattenStage,
        ].filter((stage) => !!stage) as IRowNodeStage[];
        const refreshEverythingFunc = this.refreshModel.bind(this, { step: 'group' });
        const refreshEverythingAfterColsChangedFunc = this.refreshModel.bind(this, {
            step: 'group', // after cols change, row grouping (the first stage) could of changed
            afterColumnsChanged: true,
            keepRenderedRows: true,
            // we want animations cos sorting or filtering could be applied
            animate: !this.gos.get('suppressAnimationFrame'),
        });

        this.addManagedEventListeners({
            newColumnsLoaded: refreshEverythingAfterColsChangedFunc,
            columnRowGroupChanged: refreshEverythingFunc,
            columnValueChanged: this.onValueChanged.bind(this),
            columnPivotChanged: this.refreshModel.bind(this, { step: 'pivot' }),
            filterChanged: this.onFilterChanged.bind(this),
            sortChanged: this.onSortChanged.bind(this),
            columnPivotModeChanged: refreshEverythingFunc,
            gridStylesChanged: this.onGridStylesChanges.bind(this),
            gridReady: this.onGridReady.bind(this),
        });

        // doesn't need done if doing full reset
        // Property listeners which call `refreshModel` at different stages
        this.addPropertyListeners();

        this.rootNode = new RowNode(this.beans);

        const nodeManager = this.getNewNodeManager();
        this.nodeManager = nodeManager;
        nodeManager.activate(this.rootNode);
    }

    private getNewNodeManager(): IClientSideNodeManager<any> {
        const { gos, beans } = this;
        switch (_getGroupingApproach(gos)) {
            case 'treeNested':
                return beans.csrmChildrenTreeNodeSvc ?? beans.csrmNodeSvc!;
            case 'treePath':
                return beans.csrmPathTreeNodeSvc ?? beans.csrmNodeSvc!;
            default:
                return beans.csrmNodeSvc!;
        }
    }

    private addPropertyListeners() {
        // Omitted Properties
        //
        // We do not act reactively on all functional properties, as it's possible the application is React and
        // has not memoised the property and it's getting set every render.
        //
        // ** LIST OF NON REACTIVE, NO ARGUMENT
        //
        // getDataPath, getRowId -- these are called once for each Node when the Node is created.
        //                       -- these are immutable Node properties (ie a Node ID cannot be changed)
        //
        // isRowMaster           -- called when masterDetail is true and the Node is created or the property was changed
        //
        // getRowHeight - this is called once when Node is created, if a new getRowHeight function is provided,
        //              - we do not revisit the heights of each node.
        //
        // pivotDefaultExpanded - relevant for initial pivot column creation, no impact on existing pivot columns.
        //
        // deltaSort - this changes the type of algorithm used only, it doesn't change the sort order. so no point
        //           - in doing the sort again as the same result will be got. the new Prop will be used next time we sort.
        //
        // ** LIST OF NON REACTIVE, SOME ARGUMENT
        // ** For these, they could be reactive, but not convinced the business argument is strong enough,
        // ** so leaving as non-reactive for now, and see if anyone complains.
        //
        // processPivotResultColDef, processPivotResultColGroupDef
        //                       - there is an argument for having these reactive, that if the application changes
        //                       - these props, we should re-create the Pivot Columns, however it's highly unlikely
        //                       - the application would change these functions, far more likely the functions were
        //                       - non memoised correctly.

        const allProps: (keyof GridOptions)[] = [
            'treeData',
            'treeDataChildrenField',
            ...this.orderedStages.flatMap(({ refreshProps }) => [...refreshProps]),
        ];

        this.addManagedPropertyListeners(allProps, (params) => {
            const properties = params.changeSet?.properties;
            if (properties) {
                this.onPropChange(properties);
            }
        });

        // TODO: HACK: rowData should be in the list of allProps instead of being registered separately.
        // but due to AG-13498, the columnModel will execute AFTER the previous listeners if properties
        // the column model listen to together with the previous listener are changed together.
        // So this is a temporary solution to make sure rowData is processed after the columnModel is ready.
        // Unfortunately this can result in double refresh when multiple properties are changed together, as it was before version 33.
        this.addManagedPropertyListener('rowData', () => this.onPropChange(['rowData']));

        this.addManagedPropertyListener('rowHeight', () => this.resetRowHeights());
    }

    public start(): void {
        this.started = true;
        if (this.rowNodesCountReady) {
            this.refreshModel({ step: 'group', rowDataUpdated: true, newData: true });
        } else {
            this.setInitialData();
        }
    }

    private setInitialData(): void {
        const rowData = this.gos.get('rowData');
        if (rowData) {
            this.onPropChange(['rowData']);
        }
    }

    public ensureRowHeightsValid(
        startPixel: number,
        endPixel: number,
        startLimitIndex: number,
        endLimitIndex: number
    ): boolean {
        let atLeastOneChange: boolean;
        let res = false;

        // we do this multiple times as changing the row heights can also change the first and last rows,
        // so the first pass can make lots of rows smaller, which means the second pass we end up changing
        // more rows.
        do {
            atLeastOneChange = false;

            const rowAtStartPixel = this.getRowIndexAtPixel(startPixel);
            const rowAtEndPixel = this.getRowIndexAtPixel(endPixel);

            // keep check to current page if doing pagination
            const firstRow = Math.max(rowAtStartPixel, startLimitIndex);
            const lastRow = Math.min(rowAtEndPixel, endLimitIndex);

            for (let rowIndex = firstRow; rowIndex <= lastRow; rowIndex++) {
                const rowNode = this.getRow(rowIndex);
                if (rowNode.rowHeightEstimated) {
                    const rowHeight = _getRowHeightForNode(this.beans, rowNode);
                    rowNode.setRowHeight(rowHeight.height);
                    atLeastOneChange = true;
                    res = true;
                }
            }

            if (atLeastOneChange) {
                this.setRowTopAndRowIndex();
            }
        } while (atLeastOneChange);

        return res;
    }

    private onPropChange(properties: (keyof GridOptions)[]): void {
        if (!this.rootNode) {
            return; // Destroyed.
        }

        const gos = this.gos;

        const changedProps = new Set(properties);
        const params: RefreshModelParams = {
            step: 'nothing',
            changedProps,
        };

        const rowDataChanged = changedProps.has('rowData');
        const oldNodeManager = this.nodeManager;
        const nodeManager = this.getNewNodeManager();

        const reset =
            oldNodeManager !== nodeManager ||
            (rowDataChanged && changedProps.has('treeData') && gos.get('treeData')) ||
            (changedProps.has('treeDataChildrenField') && gos.get('treeData'));

        let newRowData: any[] | null | undefined;

        if (reset || rowDataChanged) {
            newRowData = gos.get('rowData');

            if (newRowData != null && !Array.isArray(newRowData)) {
                newRowData = null;
                _warn(1);
            }
        }

        if (reset) {
            // If we are here, it means that the row manager need to be changed or fully reloaded
            if (!rowDataChanged) {
                // No new rowData was passed, so to include user executed transaction we need to extract
                // the row data from the node manager as it might be different from the original rowData
                newRowData = oldNodeManager?.extractRowData() ?? newRowData;
            }

            if (oldNodeManager !== nodeManager) {
                oldNodeManager?.deactivate();
                this.nodeManager = nodeManager;
            }
            nodeManager.activate(this.rootNode);
        }

        if (newRowData) {
            const immutable =
                !reset &&
                !this.isEmpty() &&
                newRowData.length > 0 &&
                gos.exists('getRowId') &&
                // this property is a backwards compatibility property, for those who want
                // the old behaviour of Row IDs but NOT Immutable Data.
                !gos.get('resetRowDataOnUpdate');

            if (immutable) {
                params.keepRenderedRows = true;
                params.animate = !this.gos.get('suppressAnimationFrame');
                params.changedRowNodes = new ChangedRowNodes();

                nodeManager.setImmutableRowData(params, newRowData);
            } else {
                params.rowDataUpdated = true;
                params.newData = true;

                // no need to invalidate cache, as the cache is stored on the rowNode,
                // so new rowNodes means the cache is wiped anyway.

                const { selectionSvc, pinnedRowModel } = this.beans;

                // - clears selection, done before we set row data to ensure it isn't readded via `selectionSvc.syncInOldRowNode`
                selectionSvc?.reset('rowDataChanged');

                // only clear pinned rows if using manual pinning
                if (pinnedRowModel?.isManual()) {
                    pinnedRowModel.reset();
                }

                this.rowNodesCountReady = true;
                nodeManager.setNewRowData(newRowData);
            }
        }

        if (params.rowDataUpdated) {
            params.step = 'group';
        } else if (params.step === 'nothing') {
            for (const { refreshProps, step } of this.orderedStages) {
                if (properties.some((prop) => refreshProps.has(prop))) {
                    params.step = step;
                    break;
                }
            }
        }

        if (params.step !== 'nothing') {
            this.refreshModel(params);
        }
    }

    private setRowTopAndRowIndex(): Set<string> {
        const { beans, rowsToDisplay } = this;
        const defaultRowHeight = beans.environment.getDefaultRowHeight();
        let nextRowTop = 0;

        // mapping displayed rows is not needed for this method, however it's used in
        // clearRowTopAndRowIndex(), and given we are looping through this.rowsToDisplay here,
        // we create the map here for performance reasons, so we don't loop a second time
        // in clearRowTopAndRowIndex()
        const displayedRowsMapped = new Set<string>();

        // we don't estimate if doing fullHeight or autoHeight, as all rows get rendered all the time
        // with these two layouts.
        const allowEstimate = _isDomLayout(this.gos, 'normal');

        for (let i = 0, len = rowsToDisplay.length; i < len; ++i) {
            const rowNode = rowsToDisplay[i];

            if (rowNode.id != null) {
                displayedRowsMapped.add(rowNode.id);
            }

            if (rowNode.rowHeight == null) {
                const rowHeight = _getRowHeightForNode(beans, rowNode, allowEstimate, defaultRowHeight);
                rowNode.setRowHeight(rowHeight.height, rowHeight.estimated);
            }

            rowNode.setRowTop(nextRowTop);
            rowNode.setRowIndex(i);
            nextRowTop += rowNode.rowHeight!;
        }

        return displayedRowsMapped;
    }

    private clearRowTopAndRowIndex(changedPath: ChangedPath, displayedRowsMapped: Set<string>): void {
        const changedPathActive = changedPath.active;

        const clearIfNotDisplayed = (rowNode?: RowNode) => {
            if (rowNode && rowNode.id != null && !displayedRowsMapped.has(rowNode.id)) {
                rowNode.clearRowTopAndRowIndex();
            }
        };

        const recurse = (rowNode: RowNode | null) => {
            if (rowNode === null) {
                return;
            }

            clearIfNotDisplayed(rowNode);
            clearIfNotDisplayed(rowNode.detailNode);
            clearIfNotDisplayed(rowNode.sibling);

            if (rowNode.hasChildren()) {
                if (rowNode.childrenAfterGroup) {
                    // if a changedPath is active, it means we are here because of a transaction update or
                    // a change detection. neither of these impacts the open/closed state of groups. so if
                    // a group is not open this time, it was not open last time. so we know all closed groups
                    // already have their top positions cleared. so there is no need to traverse all the way
                    // when changedPath is active and the rowNode is not expanded.
                    const isRootNode = rowNode.level == -1; // we need to give special consideration for root node,
                    // as expanded=undefined for root node
                    const skipChildren = changedPathActive && !isRootNode && !rowNode.expanded;
                    if (!skipChildren) {
                        rowNode.childrenAfterGroup.forEach(recurse);
                    }
                }
            }
        };

        recurse(this.rootNode);
    }

    public clearHighlight(): void {
        const last = this.lastHighlightedRow;
        if (last) {
            last.highlighted = null;
            last.dispatchRowEvent('rowHighlightChanged');
            this.lastHighlightedRow = null;
        }
    }

    public highlightRow(row: RowNode, highlight: RowHighlightPosition): void {
        const nodeChanged = row !== this.lastHighlightedRow;
        const highlightChanged = highlight !== row.highlighted;
        if (nodeChanged || highlightChanged) {
            if (nodeChanged) {
                this.clearHighlight();
            }
            row.highlighted = highlight;
            row.dispatchRowEvent('rowHighlightChanged');
            this.lastHighlightedRow = row;
        }
    }

    public getLastHighlightedRowNode(): RowNode | null {
        return this.lastHighlightedRow;
    }

    public isLastRowIndexKnown(): boolean {
        return true;
    }

    public getRowCount(): number {
        if (this.rowsToDisplay) {
            return this.rowsToDisplay.length;
        }

        return 0;
    }

    /**
     * Returns the number of rows with level === 1
     */
    public getTopLevelRowCount(): number {
        const rootNode = this.rootNode;
        if (!rootNode) {
            return 0;
        }

        if (this.rowsToDisplay.length === 0) {
            return 0;
        }

        // exception to func comment, if showing root node, then we return that
        const showingRootNode = this.rowsToDisplay && this.rowsToDisplay[0] === rootNode;
        if (showingRootNode) {
            return 1;
        }

        const filteredChildren = rootNode.childrenAfterAggFilter;
        const totalFooterInc = rootNode.sibling ? 1 : 0;
        return (filteredChildren ? filteredChildren.length : 0) + totalFooterInc;
    }

    /**
     * Get the row display index by the top level index
     * top level index is the index of rows with level === 1
     */
    public getTopLevelRowDisplayedIndex(topLevelIndex: number): number {
        const { rootNode, rowsToDisplay } = this;
        const showingRootNode = !rootNode || !rowsToDisplay.length || rowsToDisplay[0] === rootNode;

        // exception to function comment, if showing footer node (level === -1) return 0.
        if (showingRootNode) {
            return topLevelIndex;
        }

        const { childrenAfterSort } = rootNode;

        const getDefaultIndex = (adjustedIndex: number) => {
            let rowNode = childrenAfterSort![adjustedIndex];

            if (this.gos.get('groupHideOpenParents')) {
                // if hideOpenParents, then get lowest displayed descendent
                while (rowNode.expanded && rowNode.childrenAfterSort && rowNode.childrenAfterSort.length > 0) {
                    rowNode = rowNode.childrenAfterSort[0];
                }
            }

            return rowNode.rowIndex!;
        };

        const { footerSvc } = this.beans;
        if (footerSvc) {
            return footerSvc.getTopDisplayIndex(rowsToDisplay, topLevelIndex, childrenAfterSort!, getDefaultIndex);
        } else {
            return getDefaultIndex(topLevelIndex);
        }
    }

    /**
     * The opposite of `getTopLevelRowDisplayedIndex`
     */
    public getTopLevelIndexFromDisplayedIndex(displayedIndex: number): number {
        const { rootNode, rowsToDisplay } = this;
        const showingRootNode = !rootNode || !rowsToDisplay.length || rowsToDisplay[0] === rootNode;

        if (showingRootNode) {
            return displayedIndex;
        }

        let node = this.getRow(displayedIndex);

        if (node.footer) {
            node = node.sibling;
        }

        // find the top level node
        while (node.parent && node.parent !== rootNode) {
            node = node.parent;
        }

        const topLevelIndex = rootNode.childrenAfterSort?.findIndex((childNode) => childNode === node);

        return topLevelIndex === -1 ? displayedIndex : topLevelIndex ?? displayedIndex;
    }

    public getRowBounds(index: number): RowBounds | null {
        const rowNode = this.rowsToDisplay[index];

        if (rowNode) {
            return {
                rowTop: rowNode.rowTop!,
                rowHeight: rowNode.rowHeight!,
            };
        }

        return null;
    }

    public onRowGroupOpened(): void {
        const animate = _isAnimateRows(this.gos);
        this.refreshModel({ step: 'map', keepRenderedRows: true, animate: animate });
    }

    private onFilterChanged(event: IAcDGFilterChangedEvent): void {
        if (event.afterDataChange) {
            return;
        }
        const animate = _isAnimateRows(this.gos);

        const primaryOrQuickFilterChanged = event.columns.length === 0 || event.columns.some((col) => col.isPrimary());
        const step: ClientSideRowModelStage = primaryOrQuickFilterChanged ? 'filter' : 'filter_aggregates';
        this.refreshModel({ step: step, keepRenderedRows: true, animate: animate });
    }

    private onSortChanged(): void {
        const animate = _isAnimateRows(this.gos);
        this.refreshModel({
            step: 'sort',
            keepRenderedRows: true,
            animate: animate,
        });
    }

    public getType(): RowModelType {
        return 'clientSide';
    }

    private onValueChanged(): void {
        this.refreshModel({ step: this.colModel.isPivotActive() ? 'pivot' : 'aggregate' });
    }

    private createChangePath(enabled: boolean): ChangedPath {
        // for updates, if the row is updated at all, then we re-calc all the values
        // in that row. we could compare each value to each old value, however if we
        // did this, we would be calling the valueSvc twice, once on the old value
        // and once on the new value. so it's less valueGetter calls if we just assume
        // each column is different. that way the changedPath is used so that only
        // the impacted parent rows are recalculated, parents who's children have
        // not changed are not impacted.

        const changedPath = new ChangedPath(false, this.rootNode!);

        if (!enabled) {
            changedPath.active = false;
        }

        return changedPath;
    }

    private isSuppressModelUpdateAfterUpdateTransaction(params: RefreshModelParams): boolean {
        if (!this.gos.get('suppressModelUpdateAfterUpdateTransaction')) {
            return false; // Not suppressed
        }

        const { changedRowNodes, newData, rowDataUpdated } = params;

        if (!changedRowNodes || newData || !rowDataUpdated) {
            return false; // Not a transaction update
        }

        if (changedRowNodes.removals.size || changedRowNodes.adds.size) {
            return false; // There are added rows or removed rows, not just updates
        }

        return true; // Nothing changed, or only updates with no new rows and no removals
    }

    public refreshModel(params: RefreshModelParams): void {
        if (!this.rootNode) {
            return; // Destroyed
        }

        // this goes through the pipeline of stages. what's in my head is similar
        // to the diagram on this page:
        // http://commons.apache.org/sandbox/commons-pipeline/pipeline_basics.html
        // however we want to keep the results of each stage, hence we manually call
        // each step rather than have them chain each other.

        // fallthrough in below switch is on purpose,
        // eg if STEP_FILTER, then all steps below this
        // step get done
        // let start: number;
        // console.log('======= start =======');

        const changedPath = (params.changedPath ??= this.createChangePath(!params.newData && !!params.rowDataUpdated));

        this.nodeManager.refreshModel?.(params, this.started);

        this.eventSvc.dispatchEvent({ type: 'beforeRefreshModel', params });

        if (!this.started) {
            return; // Destroyed or not yet started
        }

        if (params.rowDataUpdated) {
            this.eventSvc.dispatchEvent({ type: 'rowDataUpdated' });
        }

        if (
            this.isRefreshingModel ||
            this.colModel.changeEventsDispatching ||
            this.isSuppressModelUpdateAfterUpdateTransaction(params)
        ) {
            return;
        }

        this.isRefreshingModel = true;

        switch (params.step) {
            case 'group': {
                this.doRowGrouping(
                    params.changedRowNodes,
                    changedPath,
                    !!params.rowNodesOrderChanged,
                    !!params.afterColumnsChanged
                );
            }
            /* eslint-disable no-fallthrough */
            case 'filter':
                this.doFilter(changedPath);
            case 'pivot':
                this.doPivot(changedPath);
            case 'aggregate': // depends on agg fields
                this.doAggregate(changedPath);
            case 'filter_aggregates':
                this.doFilterAggregates(changedPath);
            case 'sort':
                this.doSort(params.changedRowNodes, changedPath);
            case 'map':
                this.doRowsToDisplay();
            /* eslint-enable no-fallthrough */
        }

        // set all row tops to null, then set row tops on all visible rows. if we don't
        // do this, then the algorithm below only sets row tops, old row tops from old rows
        // will still lie around
        const displayedNodesMapped = this.setRowTopAndRowIndex();
        this.clearRowTopAndRowIndex(changedPath, displayedNodesMapped);

        this.isRefreshingModel = false;

        this.eventSvc.dispatchEvent({
            type: 'modelUpdated',
            animate: params.animate,
            keepRenderedRows: params.keepRenderedRows,
            newData: params.newData,
            newPage: false,
            keepUndoRedoStack: params.keepUndoRedoStack,
        });
    }

    public isEmpty(): boolean {
        return !this.rootNode?.allLeafChildren?.length || !this.colModel?.ready;
    }

    public isRowsToRender(): boolean {
        return this.rowsToDisplay.length > 0;
    }

    public getNodesInRangeForSelection(firstInRange: RowNode, lastInRange: RowNode): RowNode[] {
        let started = false;
        let finished = false;

        const result: RowNode[] = [];

        const groupsSelectChildren = _getGroupSelectsDescendants(this.gos);

        this.forEachNodeAfterFilterAndSort((rowNode) => {
            // range has been closed, skip till end
            if (finished) {
                return;
            }

            if (started) {
                if (rowNode === lastInRange || rowNode === firstInRange) {
                    // check if this is the last node we're going to be adding
                    finished = true;

                    // if the final node was a group node, and we're doing groupSelectsChildren
                    // make the exception to select all of it's descendants too
                    if (rowNode.group && groupsSelectChildren) {
                        result.push(...rowNode.allLeafChildren!);
                        return;
                    }
                }
            }

            if (!started) {
                if (rowNode !== lastInRange && rowNode !== firstInRange) {
                    // still haven't hit a boundary node, keep searching
                    return;
                }
                started = true;
            }

            // only select leaf nodes if groupsSelectChildren
            const includeThisNode = !rowNode.group || !groupsSelectChildren;
            if (includeThisNode) {
                result.push(rowNode);
                return;
            }
        });

        return result;
    }

    public getTopLevelNodes(): RowNode[] | null {
        return this.rootNode?.childrenAfterGroup ?? null;
    }

    public getRow(index: number): RowNode {
        return this.rowsToDisplay[index];
    }

    public isRowPresent(rowNode: RowNode): boolean {
        return this.rowsToDisplay.indexOf(rowNode) >= 0;
    }

    public getRowIndexAtPixel(pixelToMatch: number): number {
        const rowsToDisplay = this.rowsToDisplay;
        if (this.isEmpty() || rowsToDisplay.length === 0) {
            return -1;
        }

        // do binary search of tree
        // http://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/
        let bottomPointer = 0;
        let topPointer = rowsToDisplay.length - 1;

        // quick check, if the pixel is out of bounds, then return last row
        if (pixelToMatch <= 0) {
            // if pixel is less than or equal zero, it's always the first row
            return 0;
        }
        const lastNode = _last(rowsToDisplay);
        if (lastNode.rowTop! <= pixelToMatch) {
            return rowsToDisplay.length - 1;
        }

        let oldBottomPointer = -1;
        let oldTopPointer = -1;

        while (true) {
            const midPointer = Math.floor((bottomPointer + topPointer) / 2);
            const currentRowNode = rowsToDisplay[midPointer];

            if (this.isRowInPixel(currentRowNode, pixelToMatch)) {
                return midPointer;
            }

            if (currentRowNode.rowTop! < pixelToMatch) {
                bottomPointer = midPointer + 1;
            } else if (currentRowNode.rowTop! > pixelToMatch) {
                topPointer = midPointer - 1;
            }

            // infinite loops happen when there is space between rows. this can happen
            // when Auto Height is active, cos we re-calculate row tops asynchronously
            // when row heights change, which can temporarily result in gaps between rows.
            const caughtInInfiniteLoop = oldBottomPointer === bottomPointer && oldTopPointer === topPointer;
            if (caughtInInfiniteLoop) {
                return midPointer;
            }

            oldBottomPointer = bottomPointer;
            oldTopPointer = topPointer;
        }
    }

    private isRowInPixel(rowNode: RowNode, pixelToMatch: number): boolean {
        const topPixel = rowNode.rowTop;
        const bottomPixel = rowNode.rowTop! + rowNode.rowHeight!;
        const pixelInRow = topPixel! <= pixelToMatch && bottomPixel > pixelToMatch;
        return pixelInRow;
    }

    public forEachLeafNode(callback: (node: RowNode, index: number) => void): void {
        this.rootNode?.allLeafChildren?.forEach((rowNode, index) => callback(rowNode, index));
    }

    public forEachNode(callback: (node: RowNode, index: number) => void, includeFooterNodes: boolean = false): void {
        this.depthFirstSearchRowNodes(callback, includeFooterNodes);
    }

    public forEachDisplayedNode(callback: (rowNode: RowNode<any>, index: number) => void): void {
        this.rowsToDisplay.forEach(callback);
    }

    public forEachNodeAfterFilter(
        callback: (node: RowNode, index: number) => void,
        includeFooterNodes: boolean = false
    ): void {
        this.depthFirstSearchRowNodes(callback, includeFooterNodes, (node) => node.childrenAfterAggFilter);
    }

    public forEachNodeAfterFilterAndSort(
        callback: (node: RowNode, index: number) => void,
        includeFooterNodes: boolean = false
    ): void {
        this.depthFirstSearchRowNodes(callback, includeFooterNodes, (node) => node.childrenAfterSort);
    }

    public forEachPivotNode(
        callback: (node: RowNode, index: number) => void,
        includeFooterNodes: boolean = false,
        afterSort: boolean = false
    ): void {
        const { colModel, rowGroupColsSvc } = this.beans;
        if (!colModel.isPivotMode()) {
            return;
        }

        // if no row grouping, then only row is root node
        if (!rowGroupColsSvc?.columns.length) {
            callback(this.rootNode!, 0);
            return;
        }

        const childrenField = afterSort ? 'childrenAfterSort' : 'childrenAfterGroup';
        // for pivot, we don't go below leafGroup levels
        this.depthFirstSearchRowNodes(callback, includeFooterNodes, (node) =>
            !node.leafGroup ? node[childrenField] : null
        );
    }

    /**
     * Iterate through each node and all of its children
     * @param callback the function to execute for each node
     * @param includeFooterNodes whether to also iterate over footer nodes
     * @param nodes the nodes to start iterating over
     * @param getChildren a function to determine the recursion strategy
     * @param startIndex the index to start from
     * @returns the index ended at
     */
    private depthFirstSearchRowNodes(
        callback: (node: RowNode, index: number) => void,
        includeFooterNodes: boolean = false,
        getChildren: (node: RowNode) => RowNode[] | null = (node) => node.childrenAfterGroup,
        node: RowNode | null = this.rootNode,
        startIndex: number = 0
    ): number {
        let index = startIndex;
        if (!node) {
            return index;
        }

        const isRootNode = node === this.rootNode;
        if (!isRootNode) {
            callback(node, index++);
        }

        const { footerSvc } = this.beans;

        if (node.hasChildren() && !node.footer) {
            const children = getChildren(node);
            if (children) {
                index = footerSvc?.addTotalRows(index, node, callback, includeFooterNodes, isRootNode, 'top') ?? index;
                for (const node of children) {
                    index = this.depthFirstSearchRowNodes(callback, includeFooterNodes, getChildren, node, index);
                }
                return (
                    footerSvc?.addTotalRows(index, node, callback, includeFooterNodes, isRootNode, 'bottom') ?? index
                );
            }
        }
        return index;
    }

    // it's possible to recompute the aggregate without doing the other parts
    // + api.refreshClientSideRowModel('aggregate')
    public doAggregate(changedPath?: ChangedPath): void {
        const rootNode = this.rootNode;
        if (rootNode) {
            this.aggStage?.execute({ rowNode: rootNode, changedPath: changedPath });
        }
    }

    private doFilterAggregates(changedPath: ChangedPath): void {
        const rootNode = this.rootNode!;
        if (this.filterAggStage) {
            this.filterAggStage.execute({ rowNode: rootNode, changedPath: changedPath });
        } else {
            // If filterAggStage is undefined, then so is the grouping stage, so all children should be on the rootNode.
            rootNode.childrenAfterAggFilter = rootNode.childrenAfterFilter;
        }
    }

    private doSort(changedRowNodes: IChangedRowNodes | undefined, changedPath: ChangedPath) {
        if (this.sortStage) {
            this.sortStage.execute({
                rowNode: this.rootNode!,
                changedRowNodes,
                changedPath: changedPath,
            });
        } else {
            changedPath.forEachChangedNodeDepthFirst((rowNode) => {
                rowNode.childrenAfterSort = rowNode.childrenAfterAggFilter!.slice(0);

                updateRowNodeAfterSort(rowNode);
            });
        }
    }

    private doRowGrouping(
        changedRowNodes: IChangedRowNodes | undefined,
        changedPath: ChangedPath,
        rowNodesOrderChanged: boolean,
        afterColumnsChanged: boolean
    ) {
        const rootNode: ClientSideRowModelRootNode = this.rootNode!;

        const groupStageExecuted = this.groupStage?.execute({
            rowNode: rootNode,
            changedPath,
            changedRowNodes,
            rowNodesOrderChanged,
            afterColumnsChanged,
        });

        if (
            !groupStageExecuted &&
            !this.nodeManager.treeData // managed by the node manager
        ) {
            const sibling: ClientSideRowModelRootNode = rootNode.sibling;
            rootNode.childrenAfterGroup = rootNode.allLeafChildren;
            if (sibling) {
                sibling.childrenAfterGroup = rootNode.childrenAfterGroup;
            }
            rootNode.updateHasChildren();
        }

        if (this.rowNodesCountReady) {
            // only if row data has been set
            this.rowCountReady = true;
            this.eventSvc.dispatchEventOnce({ type: 'rowCountReady' });
        }
    }

    private doFilter(changedPath: ChangedPath) {
        if (this.filterStage) {
            this.filterStage.execute({ rowNode: this.rootNode!, changedPath: changedPath });
        } else {
            changedPath.forEachChangedNodeDepthFirst((rowNode) => {
                rowNode.childrenAfterFilter = rowNode.childrenAfterGroup;

                updateRowNodeAfterFilter(rowNode);
            }, true);
        }
    }

    private doPivot(changedPath: ChangedPath) {
        this.pivotStage?.execute({ rowNode: this.rootNode!, changedPath: changedPath });
    }

    public getRowNode(id: string): RowNode | undefined {
        // although id is typed a string, this could be called by the user, and they could have passed a number
        const idIsGroup = typeof id == 'string' && id.indexOf(ROW_ID_PREFIX_ROW_GROUP) == 0;

        if (idIsGroup) {
            // only one users complained about getRowNode not working for groups, after years of
            // this working for normal rows. so have done quick implementation. if users complain
            // about performance, then GroupStage should store / manage created groups in a map,
            // which is a chunk of work.
            let res: RowNode | undefined = undefined;
            this.forEachNode((node) => {
                if (node.id === id) {
                    res = node;
                }
            });
            return res;
        }

        return this.nodeManager.getRowNode(id);
    }

    public batchUpdateRowData(
        rowDataTransaction: RowDataTransaction,
        callback?: (res: RowNodeTransaction) => void
    ): void {
        if (this.applyAsyncTransactionsTimeout == null) {
            this.rowDataTransactionBatch = [];
            const waitMillis = this.gos.get('asyncTransactionWaitMillis');
            this.applyAsyncTransactionsTimeout = window.setTimeout(() => {
                if (this.isAlive()) {
                    // Handle case where grid is destroyed before timeout is triggered
                    this.executeBatchUpdateRowData();
                }
            }, waitMillis);
        }
        this.rowDataTransactionBatch!.push({ rowDataTransaction: rowDataTransaction, callback });
    }

    public flushAsyncTransactions(): void {
        if (this.applyAsyncTransactionsTimeout != null) {
            clearTimeout(this.applyAsyncTransactionsTimeout);
            this.executeBatchUpdateRowData();
        }
    }

    private executeBatchUpdateRowData(): void {
        this.valueCache?.onDataChanged();

        const callbackFuncsBound: ((...args: any[]) => any)[] = [];
        const rowNodeTrans: RowNodeTransaction[] = [];

        const changedRowNodes = new ChangedRowNodes();
        let orderChanged = false;
        this.rowDataTransactionBatch?.forEach((tranItem) => {
            this.rowNodesCountReady = true;
            const { rowNodeTransaction, rowsInserted } = this.nodeManager.updateRowData(
                tranItem.rowDataTransaction,
                changedRowNodes
            );
            if (rowsInserted) {
                orderChanged = true;
            }
            rowNodeTrans.push(rowNodeTransaction);
            if (tranItem.callback) {
                callbackFuncsBound.push(tranItem.callback.bind(null, rowNodeTransaction));
            }
        });

        this.commitTransactions(orderChanged, changedRowNodes);

        // do callbacks in next VM turn so it's async
        if (callbackFuncsBound.length > 0) {
            window.setTimeout(() => {
                callbackFuncsBound.forEach((func) => func());
            }, 0);
        }

        if (rowNodeTrans.length > 0) {
            this.eventSvc.dispatchEvent({
                type: 'asyncTransactionsFlushed',
                results: rowNodeTrans,
            });
        }

        this.rowDataTransactionBatch = null;
        this.applyAsyncTransactionsTimeout = undefined;
    }

    /**
     * Used to apply transaction changes.
     * Called by gridApi & rowDragFeature
     */
    public updateRowData(rowDataTran: RowDataTransaction): RowNodeTransaction | null {
        this.valueCache?.onDataChanged();

        this.rowNodesCountReady = true;
        const changedRowNodes = new ChangedRowNodes();
        const { rowNodeTransaction, rowsInserted } = this.nodeManager.updateRowData(rowDataTran, changedRowNodes);

        this.commitTransactions(rowsInserted, changedRowNodes);

        return rowNodeTransaction;
    }

    /**
     * Common to:
     * - executeBatchUpdateRowData (batch transactions)
     * - updateRowData (single transaction)
     * - setImmutableRowData (generated transaction)
     *
     * @param rowNodeTrans - the transactions to apply
     * @param orderChanged - whether the order of the rows has changed, either via generated transaction or user provided addIndex
     */
    private commitTransactions(rowNodesOrderChanged: boolean, changedRowNodes: IChangedRowNodes): void {
        this.refreshModel({
            step: 'group',
            rowDataUpdated: true,
            rowNodesOrderChanged,
            keepRenderedRows: true,
            animate: !this.gos.get('suppressAnimationFrame'),
            changedRowNodes,
            changedPath: this.createChangePath(true),
        });
    }

    private doRowsToDisplay() {
        const { flattenStage, rootNode } = this;
        let rowsToDisplay: RowNode[];
        if (flattenStage) {
            rowsToDisplay = flattenStage.execute({ rowNode: rootNode! });
        } else {
            rowsToDisplay = rootNode?.childrenAfterSort ?? [];
            for (const row of rowsToDisplay) {
                row.setUiLevel(0);
            }
        }
        this.rowsToDisplay = rowsToDisplay;
    }

    public onRowHeightChanged(): void {
        this.refreshModel({
            step: 'map',
            keepRenderedRows: true,
            keepUndoRedoStack: true,
        });
    }

    public resetRowHeights(): void {
        const rootNode = this.rootNode;
        if (!rootNode) {
            return;
        }

        const atLeastOne = this.resetRowHeightsForAllRowNodes();

        rootNode.setRowHeight(rootNode.rowHeight, true);
        if (rootNode.sibling) {
            rootNode.sibling.setRowHeight(rootNode.sibling.rowHeight, true);
        }

        // when pivotMode but pivot not active, root node is displayed on its own
        // because it's only ever displayed alone, refreshing the model (onRowHeightChanged) is not required
        if (atLeastOne) {
            this.onRowHeightChanged();
        }
    }

    private resetRowHeightsForAllRowNodes(): boolean {
        let atLeastOne = false;
        this.forEachNode((rowNode) => {
            rowNode.setRowHeight(rowNode.rowHeight, true);
            // we keep the height each row is at, however we set estimated=true rather than clear the height.
            // this means the grid will not reset the row heights back to defaults, rather it will re-calc
            // the height for each row as the row is displayed. otherwise the scroll will jump when heights are reset.
            const detailNode = rowNode.detailNode;
            if (detailNode) {
                detailNode.setRowHeight(detailNode.rowHeight, true);
            }

            if (rowNode.sibling) {
                rowNode.sibling.setRowHeight(rowNode.sibling.rowHeight, true);
            }
            atLeastOne = true;
        });

        return atLeastOne;
    }

    private onGridStylesChanges(e: CssVariablesChanged) {
        if (e.rowHeightChanged) {
            if (this.beans.rowAutoHeight?.active) {
                return;
            }

            this.resetRowHeights();
        }
    }

    private onGridReady(): void {
        if (!this.started) {
            // App can start using API to add transactions, so need to add data into the node manager if not started
            this.setInitialData();
        }
    }

    public isRowDataLoaded(): boolean {
        return this.rowCountReady;
    }

    public override destroy(): void {
        super.destroy();

        // Forcefully deallocate memory
        this.clearHighlight();
        this.started = false;
        this.rootNode = null;
        this.nodeManager = null!;
        this.rowDataTransactionBatch = null;
        this.orderedStages = _EmptyArray;
        this.rowsToDisplay = _EmptyArray;
    }

    private onRowHeightChanged_debounced = _debounce(this, this.onRowHeightChanged.bind(this), 100);
    /**
     * @deprecated v33.1
     */
    public onRowHeightChangedDebounced(): void {
        this.onRowHeightChanged_debounced();
    }
}
