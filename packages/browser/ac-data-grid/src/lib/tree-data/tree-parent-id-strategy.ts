import type {
    IChangedRowNodes,
    IRowGroupingStrategy,
    IsGroupOpenByDefaultParams,
    RowNode,
    StageExecuteParams,
    WithoutGridCommon,
} from 'ag-grid-community';
import { BeanStub, _EmptyArray, _warn } from 'ag-grid-community';

import { setRowNodeGroup } from '../rowGrouping/rowGroupingUtils';
import type { DataFieldGetter } from './fieldAccess';
import { makeFieldPathGetter } from './fieldAccess';

const FLAG_CHANGED = 0x80000000;
const FLAG_CHILDREN_CHANGED = 0x40000000;
const FLAG_EXPANDED_INITIALIZED = 0x20000000;
const MASK_CHILDREN_LENGTH = 0x1fffffff; // This equates to 536,870,911 maximum children per parent (536 million rows)

type ParentIdGetter<TData> = DataFieldGetter<TData, string>;

export interface IAcDGTreeStrategyRow<TData = any> extends RowNode<TData> {
    parent: TreeStrategyRow<TData> | null;
    allLeafChildren: TreeStrategyRow<TData>[] | null;
    childrenAfterGroup: TreeStrategyRow<TData>[] | null;
    treeNode: TreeStrategyRow<TData> | null;
    treeNodeFlags: number;
    sibling: TreeStrategyRow<TData>;
    sourceRowIndex: number;
}

export class AcDGTreeParentIdStrategy<TData = any> extends BeanStub implements IRowGroupingStrategy<TData> {
    private parentIdGetter: ParentIdGetter<TData> | null = null;
    private oldGroupDisplayColIds: string | null = null;

    public override destroy(): void {
        super.destroy();
        this.parentIdGetter = null;
        this.oldGroupDisplayColIds = null;
    }

    public execute(params: StageExecuteParams<TData>) {
        // Instead of trying to optimize for immutable row update and transactions when a small portion of the tree changes
        // the decision here was to implement with two linear loops, first all nodes and then a tree traversal,
        // reducing allocations to the minimum possible.
        // We do not allocate new arrays for childrenAfterGroup and allLeafChildren, we just update the existing arrays.
        // This ensures a simpler code and less complexity, and also that enough speed for the vast majority of cases.
        // Consider that trying other approaches might be more complex and potentially not as fast,
        // as the user can always move an entire subtree by changing a single parentId.
        //
        // To further reduce allocations, we use treeNodeFlags to store both temporary flags,
        // the expanded initialized state and the future children count between the first loop and the tree traversal.
        // This avoid the needs to create complex data structures to store temporary data or add more fields to the row nodes.

        const rootNode = params.rowNode as TreeStrategyRow<TData>;

        let fullReload = !params.changedRowNodes && !params.changedPath?.active;
        let rootChildrenAfterGroup = rootNode.childrenAfterGroup;
        if (!rootChildrenAfterGroup || rootChildrenAfterGroup === rootNode.allLeafChildren) {
            fullReload = true;
            rootNode.childrenAfterGroup = rootChildrenAfterGroup = [];
        }

        let groupDisplayColIdsChanged = false;
        if (params.afterColumnsChanged || this.oldGroupDisplayColIds === null) {
            groupDisplayColIdsChanged = this.updateGroupDisplayColsIds();
        }

        const hasUpdates = flagUpdatedNodes(params.changedRowNodes);

        const renderEmpty = !this.gos.get('getRowId'); // If getRowId is not provided, we make an empty tree
        if (!renderEmpty) {
            if (fullReload || hasUpdates) {
                this.updateParents(params, fullReload);
            }

            // Loop all the nodes, and put the children in the right place, updating the parent and the children arrays
            preprocess(params);
        }

        rootChildrenAfterGroup.length = rootNode.treeNodeFlags & MASK_CHILDREN_LENGTH;
        rootNode.treeNodeFlags = 0;

        const expandByDefault = this.gos.get('groupDefaultExpanded');
        const isGroupOpenByDefault = this.gos.getCallback('isGroupOpenByDefault');
        const activeChangedPath = params.changedPath?.active ? params.changedPath : undefined;

        let processedNodesCount = 0;
        const processNode = (row: TreeStrategyRow<TData>, level: number): boolean => {
            ++processedNodesCount;

            let treeNodeFlags = row.treeNodeFlags;
            const childrenAfterGroup = (row.childrenAfterGroup ??= _EmptyArray);
            const childrenAfterGroupLen = treeNodeFlags & MASK_CHILDREN_LENGTH;

            let childrenChanged = (treeNodeFlags & FLAG_CHILDREN_CHANGED) !== 0;

            if (childrenAfterGroup.length !== childrenAfterGroupLen) {
                childrenAfterGroup.length = childrenAfterGroupLen;
                childrenChanged = true;
            }

            let changed = childrenChanged || (treeNodeFlags & FLAG_CHANGED) !== 0;
            let allLeafChildrenChanged = childrenChanged;

            row.treeNodeFlags = treeNodeFlags & FLAG_EXPANDED_INITIALIZED; // Keep only the expanded initialized flag
            row.level = level++;

            let allLeafChildrenLen = 0;
            for (let j = 0; j < childrenAfterGroupLen; ++j) {
                const child = childrenAfterGroup[j];
                if (processNode(child, level)) {
                    allLeafChildrenChanged = true;
                }
                allLeafChildrenLen += (child.allLeafChildren?.length ?? 0) + 1;
            }

            let allLeafChildren = row.allLeafChildren;
            if (allLeafChildren === childrenAfterGroup || allLeafChildren === undefined) {
                allLeafChildren = row.allLeafChildren = null;
            }
            if (allLeafChildrenChanged || (allLeafChildren?.length ?? 0) !== allLeafChildrenLen) {
                allLeafChildrenChanged = updateAllLeafChildren(row, allLeafChildren, allLeafChildrenLen);
            }

            const key = row.id!;
            if (row.key !== key || !row.groupData || groupDisplayColIdsChanged) {
                changed = true;
                row.key = key;
                this.setGroupData(row, key);
            }

            const oldGroup = row.group;
            const hasChildren = childrenAfterGroupLen > 0;
            if (oldGroup !== hasChildren) {
                changed = true;
                setRowNodeGroup(row, this.beans, hasChildren); // Internally calls updateHasChildren
                if (!hasChildren && !row.expanded) {
                    treeNodeFlags = row.treeNodeFlags &= ~FLAG_EXPANDED_INITIALIZED;
                }
            } else if (row.hasChildren() !== hasChildren) {
                changed = true;
                row.updateHasChildren();
            }
            if (hasChildren && (treeNodeFlags & FLAG_EXPANDED_INITIALIZED) === 0) {
                row.treeNodeFlags |= FLAG_EXPANDED_INITIALIZED;
                row.expanded = getExpandedInitialValue(isGroupOpenByDefault, expandByDefault, row);
            }

            if (childrenChanged || allLeafChildrenChanged || fullReload) {
                updateRowArrays(row, childrenAfterGroup);
            }

            if (changed) {
                activeChangedPath?.addParentNode(row);
            }

            return allLeafChildrenChanged;
        };

        //  Traverse the tree and update the children arrays length and the allLeafChildren array and propagate updates
        for (let i = 0, len = rootChildrenAfterGroup.length; i < len; ++i) {
            processNode(rootChildrenAfterGroup[i], 0);
        }

        if (fullReload) {
            updateRootArrays(rootNode, rootChildrenAfterGroup);
        }

        if (processedNodesCount !== rootNode.allLeafChildren!.length && !renderEmpty) {
            // We have unprocessed nodes, this means we have at least one cycle to fix
            handleCycles(rootNode, processNode);
        }
    }

    private updateGroupDisplayColsIds(): boolean {
        const newGroupDisplayColIds =
            this.beans.showRowGroupCols
                ?.getShowRowGroupCols()
                ?.map((c) => c.getId())
                .join('-') ?? '';
        if (this.oldGroupDisplayColIds !== newGroupDisplayColIds) {
            this.oldGroupDisplayColIds = newGroupDisplayColIds;
            return true;
        }
        return false;
    }

    private setGroupData(row: RowNode, key: string): void {
        const groupData: Record<string, string> = {};
        row.groupData = groupData;
        const groupDisplayCols = this.beans.showRowGroupCols?.getShowRowGroupCols();
        if (groupDisplayCols) {
            for (const col of groupDisplayCols) {
                groupData[col.getColId()] = key;
            }
        }
    }

    private updateParents = ({ rowNode }: StageExecuteParams<TData>, fullReload: boolean): void => {
        const rootNode = rowNode as TreeStrategyRow<TData>;
        const rootAllLeafChildren = rootNode.allLeafChildren!;
        const rowModel = this.beans.rowModel;

        let parentIdGetter = this.parentIdGetter;
        const parentIdField = this.gos.get('treeDataParentIdField') || null;
        if (parentIdGetter?.path !== parentIdField) {
            this.parentIdGetter = parentIdGetter = makeFieldPathGetter(parentIdField);
            fullReload = true;
        }

        for (let i = 0, len = rootAllLeafChildren.length; i < len; ++i) {
            const row = rootAllLeafChildren[i];
            if (fullReload || row.treeNodeFlags & FLAG_CHANGED) {
                let newParent: TreeStrategyRow<TData> | null | undefined;
                const parentId = parentIdGetter(row.data);
                if (parentId !== null && parentId !== undefined) {
                    newParent = rowModel.getRowNode(parentId) as TreeStrategyRow<TData>;
                    if (!newParent) {
                        _warn(271, { id: row.id!, parentId });
                    }
                }
                row.treeNode = newParent ?? rootNode;
            } else {
                row.treeNode ??= rootNode;
            }
        }
    };
}

type IsGroupOpenByDefaultCallback = ((params: WithoutGridCommon<IsGroupOpenByDefaultParams>) => boolean) | undefined;

const handleCycles = <TData>(
    rootNode: TreeStrategyRow<TData>,
    processNode: (row: TreeStrategyRow<TData>, level: number) => void
) => {
    // This is not optimal at all in terms of performance, and we don't care as this should never happen.
    const processedNodes = new Set<TreeStrategyRow<TData>>();
    const addProcessedNodes = (row: TreeStrategyRow<TData>) => {
        processedNodes.add(row);
        for (const child of row.childrenAfterGroup!) {
            addProcessedNodes(child);
        }
    };
    addProcessedNodes(rootNode);
    const rootChildrenAfterGroup = rootNode.childrenAfterGroup!;
    rootChildrenAfterGroup.length = 0;
    for (const row of rootNode.allLeafChildren!) {
        if (!processedNodes.has(row)) {
            const parent = row.parent!;
            _warn(270, { id: row.id!, parentId: parent.id! });
            parent.childrenAfterGroup = parent.childrenAfterGroup!.filter((x) => x !== row);
            parent.treeNodeFlags = (parent.treeNodeFlags - 1) | FLAG_CHILDREN_CHANGED | FLAG_CHANGED;
            row.parent = rootNode;
            processNode(row, 0);
            addProcessedNodes(row);
            rootChildrenAfterGroup.push(row);
        } else if (row.parent === rootNode) {
            rootChildrenAfterGroup.push(row);
        }
    }
};

const updateRootArrays = <TData>(
    rootNode: TreeStrategyRow<TData>,
    rootChildrenAfterGroup: TreeStrategyRow<TData>[]
) => {
    rootNode.childrenAfterFilter = rootChildrenAfterGroup;
    rootNode.childrenAfterAggFilter = rootChildrenAfterGroup;
    rootNode.childrenAfterSort = rootChildrenAfterGroup;
    const sibling = rootNode.sibling;
    if (sibling) {
        sibling.childrenAfterGroup = rootNode.childrenAfterGroup;
        sibling.childrenAfterAggFilter = rootNode.childrenAfterAggFilter;
        sibling.childrenAfterSort = rootNode.childrenAfterSort;
    }
};

const updateRowArrays = <TData>(row: TreeStrategyRow<TData>, childrenAfterGroup: TreeStrategyRow<TData>[]) => {
    row.allLeafChildren ??= null;
    row.childrenAfterFilter ??= childrenAfterGroup;
    row.childrenAfterAggFilter ??= childrenAfterGroup;
    row.childrenAfterSort ??= childrenAfterGroup;
    const sibling = row.sibling;
    if (sibling) {
        sibling.allLeafChildren = row.allLeafChildren;
        sibling.childrenAfterGroup = row.childrenAfterGroup;
        sibling.childrenAfterAggFilter = row.childrenAfterAggFilter;
        sibling.childrenAfterFilter = row.childrenAfterFilter;
        sibling.childrenAfterSort = row.childrenAfterSort;
    }
};

const updateAllLeafChildren = <TData>(
    row: TreeStrategyRow<TData>,
    allLeafChildren: TreeStrategyRow<TData>[] | null,
    newAllLeafChildrenLen: number
): boolean => {
    if (newAllLeafChildrenLen === 0) {
        if (allLeafChildren) {
            row.allLeafChildren = null;
            return !!allLeafChildren?.length;
        }
        return false;
    }

    let changed = false;
    if (!allLeafChildren) {
        allLeafChildren = row.allLeafChildren = new Array(newAllLeafChildrenLen);
        changed = true;
    } else if (allLeafChildren.length !== newAllLeafChildrenLen) {
        allLeafChildren.length = newAllLeafChildrenLen;
        changed = true;
    }

    let writeIdx = 0;
    const childrenAfterGroup = row.childrenAfterGroup;
    if (childrenAfterGroup) {
        for (const child of childrenAfterGroup) {
            changed ||= allLeafChildren[writeIdx] !== child;
            allLeafChildren[writeIdx++] = child;
            const childLeafChildren = child.allLeafChildren;
            if (childLeafChildren) {
                for (const leaf of childLeafChildren) {
                    changed ||= allLeafChildren[writeIdx] !== leaf;
                    allLeafChildren[writeIdx++] = leaf;
                }
            }
        }
    }
    return changed;
};

const getExpandedInitialValue = (
    isGroupOpenByDefault: IsGroupOpenByDefaultCallback,
    expandByDefault: number,
    row: RowNode
): boolean => {
    return isGroupOpenByDefault
        ? isGroupOpenByDefault({
              rowNode: row,
              field: row.field!,
              key: row.key!,
              level: row.level,
              rowGroupColumn: row.rowGroupColumn!,
          }) == true
        : expandByDefault === -1 || row.level < expandByDefault;
};

const flagUpdatedNodes = <TData>(changedRowNodes: IChangedRowNodes<TData> | undefined): boolean => {
    if (!changedRowNodes) {
        return false;
    }
    const { adds, updates } = changedRowNodes;
    let hasUpdates = false;
    if (updates.size > 0) {
        hasUpdates = true;
        for (const node of updates) {
            (node as TreeStrategyRow<TData>).treeNodeFlags |= FLAG_CHANGED;
        }
    }
    if (adds.size > 0) {
        hasUpdates = true;
        for (const node of adds) {
            (node as TreeStrategyRow<TData>).treeNodeFlags |= FLAG_CHANGED;
        }
    }
    return hasUpdates;
};

const preprocess = <TData>({ rowNode }: StageExecuteParams<TData>): void => {
    const rootNode = rowNode as TreeStrategyRow<TData>;
    const rootAllLeafChildren = rootNode.allLeafChildren!;
    const rootAllLeafChildrenLen = rootAllLeafChildren.length;

    for (let i = 0; i < rootAllLeafChildrenLen; ++i) {
        const row = rootAllLeafChildren[i];
        const oldParent = row.parent;
        const newParent: TreeStrategyRow<TData> = row.treeNode ?? rootNode;
        let parentFlags = newParent.treeNodeFlags ?? 0;
        const indexInParent = parentFlags & MASK_CHILDREN_LENGTH;
        parentFlags = (parentFlags & ~MASK_CHILDREN_LENGTH) | (indexInParent + 1);

        let parentChildren = newParent.childrenAfterGroup;
        if (!parentChildren || parentChildren === _EmptyArray) {
            newParent.childrenAfterGroup = parentChildren = [];
        }

        if (parentChildren.length <= indexInParent || parentChildren[indexInParent] !== row) {
            parentChildren[indexInParent] = row;
            parentFlags |= FLAG_CHILDREN_CHANGED;
        }

        if (oldParent !== newParent) {
            row.parent = newParent;
            parentFlags |= FLAG_CHANGED;
            if (oldParent) {
                oldParent.treeNodeFlags |= FLAG_CHANGED;
            }
        }

        newParent.treeNodeFlags = parentFlags;
    }
};
