import type {
    ChangedPath,
    InitialGroupOrderComparatorParams,
    IsGroupOpenByDefaultParams,
    RefreshModelParams,
    WithoutGridCommon,
} from 'ag-grid-community';
import { AbstractClientSideNodeManager, RowNode, _ROW_ID_PREFIX_ROW_GROUP, _warn } from 'ag-grid-community';

import { setRowNodeGroup } from '../rowGrouping/rowGroupingUtils';
import { TreeNode } from './treeNode';
import type { TreeRow } from './treeRow';
import {
    clearTreeRowFlags,
    isTreeRowCommitted,
    isTreeRowExpandedInitialized,
    isTreeRowKeyChanged,
    isTreeRowPathChanged,
    isTreeRowUpdated,
    markTreeRowCommitted,
    markTreeRowPathChanged,
    setTreeRowExpandedInitialized,
    setTreeRowKeyChanged,
    setTreeRowUpdated,
} from './treeRow';

interface IAcDGTreeCommitDetails<TData = any> {
    rootNode: AbstractClientSideNodeManager.RootNode<TData>;
    activeChangedPath: ChangedPath | null;
    treeData: boolean;
    expandByDefault: number;
    isGroupOpenByDefault: IsGroupOpenByDefaultCallback;
}

const getExpandedInitialValue = (details: TreeCommitDetails, oldRow: RowNode | null, row: RowNode): boolean => {
    if (
        oldRow !== row &&
        oldRow !== null &&
        oldRow.group &&
        isTreeRowExpandedInitialized(oldRow) &&
        !details.isGroupOpenByDefault // If we have a callback, we use that instead
    ) {
        // When removing a group and so it gets replaced by a filler or new node, its expanded state is retained. See AG-12591
        return oldRow.expanded;
    }

    const userCallback = details.isGroupOpenByDefault;
    return userCallback
        ? userCallback({
              rowNode: row,
              field: row.field!,
              key: row.key!,
              level: row.level,
              rowGroupColumn: row.rowGroupColumn!,
          }) == true
        : details.expandByDefault === -1 || row.level < details.expandByDefault;
};

export type IsGroupOpenByDefaultCallback =
    | ((params: WithoutGridCommon<IsGroupOpenByDefaultParams>) => boolean)
    | undefined;

export type InitialGroupOrderComparatorCallback =
    | ((params: WithoutGridCommon<InitialGroupOrderComparatorParams>) => number)
    | undefined;

export abstract class AcDGAbstractClientSideTreeNodeManager<TData> extends AbstractClientSideNodeManager<TData> {
    private oldGroupDisplayColIds: string = '';

    /** Rows that are pending deletion, this.commitDeletedRows() will finalize removal. */
    private rowsPendingDestruction: Set<TreeRow> | null = null;

    protected treeCommitPending = true;

    /** The root node of the tree. */
    public treeRoot: TreeNode | null = null;

    public override activate(rootNode: RowNode<TData>): void {
        super.activate(rootNode);
        this.treeSetRootNode(rootNode);
        this.treeCommitPending = true;
    }

    protected treeSetRootNode(rootNode: RowNode<TData>): void {
        let treeRoot = this.treeRoot;
        if (!treeRoot) {
            treeRoot = new TreeNode(null, '');
            treeRoot.childrenChanged = true;
            this.treeRoot = treeRoot;
        }
        treeRoot.row = rootNode;
        (rootNode as TreeRow).treeNode = treeRoot;
    }

    public override destroy(): void {
        super.destroy();

        // Forcefully deallocate memory
        this.treeRoot = null;
        this.rowsPendingDestruction = null;
        this.oldGroupDisplayColIds = '';
    }

    public override deactivate(): void {
        const { treeRoot, rootNode } = this;
        if (treeRoot) {
            if (rootNode) {
                treeRoot.removeRow(rootNode);
            }
            this.treeDestroy(treeRoot);
            treeRoot.destroy();
        }
        if (rootNode) {
            clearTreeRowFlags(rootNode);
        }
        this.commitDestroyedRows();
        super.deactivate();
        this.treeRoot = null;
        this.oldGroupDisplayColIds = '';
    }

    /** Add or updates the row to a non-root node, preparing the tree correctly for the commit. */
    protected treeSetRow(node: TreeNode, newRow: RowNode, created: boolean): boolean {
        const oldRow = node.row;
        if (node === this.treeRoot) {
            return false; // Cannot overwrite the root row
        }

        let invalidate = false;
        if (oldRow !== newRow) {
            const prevNode = newRow.treeNode as TreeNode | null;
            if (prevNode !== null && prevNode !== node) {
                // The new row is somewhere else in the tree, we need to move it.
                prevNode.removeRow(newRow);
                prevNode.invalidate();
            }

            if (oldRow === null) {
                // No previous row, just set the new row.
                node.setRow(newRow);
                invalidate = true;
            } else if (!oldRow.data) {
                // We are replacing a filler row with a real row.
                node.setRow(newRow);
                this.destroyRow(oldRow, true); // Delete the filler node
                invalidate = true;
            } else {
                // We have a new non-filler row, but we had already one, this is a duplicate
                if (node.addDuplicateRow(newRow)) {
                    invalidate = true;
                }
            }
        }

        if (!created && !isTreeRowUpdated(newRow)) {
            setTreeRowUpdated(newRow);
            invalidate = true;
        }

        if (invalidate) {
            node.invalidate();
        }

        this.rowsPendingDestruction?.delete(newRow); // This row is not deleted.

        return invalidate;
    }

    /**
     * Overwrites the row property of a non-root node to null.
     * @returns The previous row, if any, that was overwritten.
     */
    protected treeRemove(node: TreeNode, oldRow: RowNode): void {
        if (node === this.treeRoot) {
            return; // Cannot overwrite a null node or the root row
        }

        let invalidate = false;

        if (node.removeRow(oldRow)) {
            const parent = node.parent;
            if (parent) {
                parent.childrenChanged = true;
            }
            this.destroyRow(oldRow, !oldRow.data);
            invalidate = true;
        }

        if (invalidate) {
            node.invalidate();
        }
    }

    /** Commit the changes performed to the tree */
    private treeCommit(changedPath: ChangedPath | undefined): void {
        const { treeRoot, rootNode } = this;
        if (!treeRoot || !rootNode) {
            return;
        }

        this.treeCommitPending = false;
        const treeData = this.treeData;
        const activeChangedPath = changedPath?.active ? changedPath : null;

        const details: TreeCommitDetails<TData> = {
            rootNode,
            activeChangedPath,
            treeData,
            expandByDefault: this.gos.get('groupDefaultExpanded'),
            isGroupOpenByDefault: this.gos.getCallback('isGroupOpenByDefault'),
        };

        this.treeCommitChildren(details, treeRoot, false, 0);

        const rootRow = treeRoot.row;
        if (rootRow) {
            if (treeData) {
                rootRow.leafGroup = false; // no pivoting with tree data
            }

            if (treeRoot.childrenChanged) {
                if (treeRoot.updateChildrenAfterGroup(treeData, true)) {
                    markTreeRowPathChanged(rootRow);
                }
            }

            if (treeData || !activeChangedPath) {
                rootRow.childrenAfterGroup = treeRoot.childrenAfterGroup;
            }

            if (activeChangedPath && isTreeRowPathChanged(rootRow)) {
                activeChangedPath.addParentNode(rootRow);
            }

            markTreeRowCommitted(rootRow);

            rootRow.updateHasChildren();
        }

        this.commitDestroyedRows();

        if (treeData) {
            this.beans.selectionSvc?.updateSelectableAfterGrouping(changedPath);
        }
    }

    /** Calls commitChild for each invalidated child, recursively. We commit only the invalidated paths. */
    private treeCommitChildren(
        details: TreeCommitDetails,
        parent: TreeNode,
        collapsed: boolean,
        childrenLevel: number
    ): void {
        while (true) {
            const child = parent.dequeueInvalidated();
            if (child === null) {
                break;
            }
            if (child.parent === parent) {
                this.treeCommitChild(details, child, collapsed || !(parent.row?.expanded ?? true), childrenLevel);
            }
        }

        // Ensure the childrenAfterGroup array is up to date with treeData flag
        parent.childrenChanged ||= (details.treeData ? parent.size : 0) !== parent.row!.childrenAfterGroup?.length;
    }

    /** Commit the changes performed to a node and its children */
    private treeCommitChild(details: TreeCommitDetails, node: TreeNode, collapsed: boolean, level: number): void {
        if (node.isEmptyFillerNode()) {
            this.treeClear(node);
            return; // Removed. No need to process children.
        }

        this.treeCommitPreOrder(details, node, level);
        this.treeCommitChildren(details, node, collapsed, level + 1);

        if (node.isEmptyFillerNode()) {
            this.treeClear(node);
            return; // Removed. No need to process further
        }

        this.treeCommitPostOrder(details, node, collapsed);
    }

    private treeCommitPreOrder(details: TreeCommitDetails, node: TreeNode, level: number): void {
        let row = node.row;

        if (row === null) {
            row = this.createFillerRow(node, level);
            node.setRow(row);
        } else {
            row = node.sortFirstDuplicateRow()!; // The main row must have the smallest sourceRowIndex of duplicates

            if (row.allChildrenCount === undefined) {
                row.allChildrenCount = null; // initialize to null if this field wasn't initialized yet
            }
        }

        if (details.treeData) {
            row.level = level;
            row.parent = node.parent!.row;
            if (node.oldRow !== row) {
                // We need to update children rows parents, as the row changed
                for (const child of node.enumChildren()) {
                    const childRow = child.row;
                    if (childRow !== null) {
                        childRow.parent = row;
                    }
                }
            }

            const key = node.key;
            if (row.key !== key) {
                row.key = key;
                setTreeRowKeyChanged(row);
                this.setGroupData(row, key);
            } else if (!row.groupData) {
                this.setGroupData(row, key);
            }
        } else if (!details.activeChangedPath) {
            row.level = 0;
            row.parent = details.rootNode;
            row.key = node.key;
        }
    }

    private treeCommitPostOrder(details: TreeCommitDetails, node: TreeNode, collapsed: boolean): void {
        const parent = node.parent!;
        const row = node.row!;
        const oldRow = node.oldRow;
        const oldGroup = row.group;

        if (node.childrenChanged) {
            if (node.updateChildrenAfterGroup(details.treeData, false)) {
                markTreeRowPathChanged(row);
            }
        }

        if (node.leafChildrenChanged) {
            node.updateAllLeafChildren();
        }

        if (details.treeData || !details.activeChangedPath) {
            row.childrenAfterGroup = node.childrenAfterGroup;
            row.allLeafChildren = node.allLeafChildren;
            const hasChildren = node.childrenAfterGroup.length > 0;
            const group = hasChildren || !row.data;

            if (oldGroup !== group) {
                markTreeRowPathChanged(row);
                setRowNodeGroup(row, this.beans, group); // Internally calls updateHasChildren
                if (!group && !row.expanded) {
                    setTreeRowExpandedInitialized(row, false);
                }
            } else if (row.hasChildren() !== hasChildren) {
                markTreeRowPathChanged(row);
                row.updateHasChildren();
            }

            if (group && !isTreeRowExpandedInitialized(row)) {
                row.expanded = getExpandedInitialValue(details, oldRow, row);
                setTreeRowExpandedInitialized(row, true);
            }

            if (isTreeRowUpdated(row)) {
                markTreeRowPathChanged(parent.row);

                if (isTreeRowKeyChanged(row)) {
                    // hack - if we didn't do this, then renaming a tree item (ie changing rowNode.key) wouldn't get
                    // refreshed into the gui.
                    // this is needed to kick off the event that rowComp listens to for refresh. this in turn
                    // then will get each cell in the row to refresh - which is what we need as we don't know which
                    // columns will be displaying the rowNode.key info.
                    row.setData(row.data);
                }
            }
        }

        if (oldRow !== row) {
            node.oldRow = row;
            if (oldRow !== null && (oldGroup || node.size !== 0)) {
                markTreeRowPathChanged(row);
            }
            parent.childrenChanged = true;
            markTreeRowPathChanged(parent.row);
        }

        if (isTreeRowPathChanged(row)) {
            if (this.treeData) {
                details.activeChangedPath?.addParentNode(row);
            } else {
                markTreeRowPathChanged(details.rootNode);
            }
        }

        markTreeRowCommitted(row);

        if (node.duplicateRows?.size && !node.duplicateRowsWarned) {
            node.duplicateRowsWarned = true;
            _warn(186, {
                rowId: row.id,
                rowData: row.data,
                duplicateRowsData: Array.from(node.duplicateRows).map((r) => r.data),
            });
        }

        if (collapsed && row.rowIndex !== null) {
            row.clearRowTopAndRowIndex(); // Hidden.
        }

        const sourceIdx = node.getNewSourceIdx();
        const prevRowIdx = node.sourceRowIndex;
        if (prevRowIdx !== sourceIdx) {
            node.sourceRowIndex = sourceIdx;
            if (prevRowIdx !== -1) {
                // TODO: this is not optimal, it has false positives.
                // we could optimize it if we have a way to know if a node
                // is out of order, we could do this by using a linked list instead of a map, so
                // we can directly know if a node is out of order in O(1)
                parent.childrenChanged = true; // The order of children in parent might have changed
            }
        }
    }

    private createFillerRow(node: TreeNode, level: number): RowNode {
        const row = new RowNode(this.beans); // Create a filler node
        row.key = node.key;
        row.group = true;
        row.field = null;
        row.leafGroup = false;
        row.rowGroupIndex = null;
        row.allChildrenCount = null;

        // Generate a unique id for the filler row
        let id = level + '-' + node.key;
        let p = node.parent;
        while (p !== null) {
            const parent = p.parent;
            if (parent === null) {
                break;
            }
            --level;
            id = `${level}-${p.key}-${id}`;
            p = parent;
        }
        row.id = _ROW_ID_PREFIX_ROW_GROUP + id;

        return row;
    }

    private setGroupData(row: RowNode, key: string): void {
        // set group value for full width rows.
        row.groupValue = key;

        const groupData: Record<string, string> = {};
        row.groupData = groupData;
        const groupDisplayCols = this.beans.showRowGroupCols?.getShowRowGroupCols();
        if (groupDisplayCols) {
            for (const col of groupDisplayCols) {
                // newGroup.rowGroupColumn=null when working off GroupInfo, and we always display the group in the group column
                // if rowGroupColumn is present, then it's grid row grouping and we only include if configuration says so
                groupData[col.getColId()] = key;
            }
        }
    }

    /** Called to clear a subtree. */
    public treeClear(node: TreeNode): void {
        const { parent, oldRow } = node;
        if (parent !== null && oldRow !== null) {
            parent.childrenChanged = true;
            if (parent.row !== null) {
                markTreeRowPathChanged(parent.row);
            }
        }
        if (node !== this.treeRoot) {
            let row = node.row;
            while (row !== null && node.removeRow(row)) {
                this.destroyRow(row, !row.data);
                row = node.row;
            }
        }
        for (const child of node.enumChildren()) {
            this.treeClear(child);
        }
        node.destroy();
    }

    /** Called by the deactivate, to destroy the whole tree. */
    private treeDestroy(node: TreeNode): void {
        const { row, duplicateRows } = node;
        if (row) {
            if (node !== this.treeRoot && !row.data) {
                this.destroyRow(row, true); // Delete the filler node
            } else {
                clearTreeRowFlags(row); // Just clear the flags
            }
        }
        if (duplicateRows) {
            for (const row of duplicateRows) {
                if (node !== this.treeRoot && !row.data) {
                    this.destroyRow(row, true); // Delete filler nodes
                } else {
                    clearTreeRowFlags(row); // Just clear the flags
                }
            }
        }
        for (const child of node.enumChildren()) {
            this.treeDestroy(child);
        }
        node.destroy();
    }

    /**
     * Finalizes the deletion of a row.
     * @param immediate If true, the row is deleted immediately.
     * If false, the row is marked for deletion, and will be deleted later with this.deleteDeletedRows()
     */
    private destroyRow(row: RowNode, immediate: boolean): void {
        if (row.isSelected()) {
            immediate = false; // Need to be deleted later as we need to unselect it first
        } else if (!isTreeRowCommitted(row)) {
            clearTreeRowFlags(row);
            return; // Never committed, or already deleted, and not selected. Nothing to do.
        }

        if (!immediate) {
            (this.rowsPendingDestruction ??= new Set()).add(row);
            return; // We will delete it later with commitDeletedRows
        }

        clearTreeRowFlags(row);

        // We execute this only if the row was committed at least once before, and not already deleted.
        // this is important for transition, see rowComp removeFirstPassFuncs. when doing animation and
        // remove, if rowTop is still present, the rowComp thinks it's just moved position.
        row.clearRowTopAndRowIndex();

        row.groupData = null;
    }

    /**
     * destroyRow can defer the deletion to the end of the commit stage.
     * This method finalizes the deletion of rows that were marked for deletion.
     */
    private commitDestroyedRows() {
        const { rowsPendingDestruction } = this;
        let nodesToUnselect: RowNode[] | null = null;
        if (rowsPendingDestruction !== null) {
            for (const row of rowsPendingDestruction) {
                this.destroyRow(row, true);
                if (row.isSelected()) {
                    (nodesToUnselect ??= []).push(row);
                }
            }
            this.rowsPendingDestruction = null;
        }
        if (nodesToUnselect) {
            this.deselectNodes(nodesToUnselect);
        }
    }

    public refreshModel(params: RefreshModelParams<TData>, started: boolean): void {
        if (started && this.treeCommitPending) {
            this.treeCommit(params.changedPath);
        }

        if (!params.afterColumnsChanged) {
            return; // nothing to do
        }

        // Check if group data need to be recomputed due to group columns change

        if (this.treeData) {
            const newGroupDisplayColIds =
                this.beans.showRowGroupCols
                    ?.getShowRowGroupCols()
                    ?.map((c) => c.getId())
                    .join('-') ?? '';

            // if the group display cols have changed, then we need to update rowNode.groupData
            // (regardless of tree data or row grouping)
            if (this.oldGroupDisplayColIds !== newGroupDisplayColIds) {
                this.oldGroupDisplayColIds = newGroupDisplayColIds;
                const rowNodes = this.rootNode?.childrenAfterGroup;
                if (rowNodes) {
                    for (let i = 0, len = rowNodes.length ?? 0; i < len; ++i) {
                        const rowNode = rowNodes[i];
                        const treeNode = rowNode.treeNode as TreeNode | null;
                        if (treeNode) {
                            this.setGroupData(rowNode, treeNode.key);
                        }
                    }
                }
            }
        } else {
            this.oldGroupDisplayColIds = '';
        }
    }
}
