import type { _ModuleWithApi, _ModuleWithoutApi, _RowGroupingGridApi } from 'ag-grid-community';
import { _ColumnFilterModule, _PopupModule } from 'ag-grid-community';

import { EnterpriseCoreModule } from '../agGridEnterpriseModule';
import { AggregationModule, SharedAggregationModule } from '../aggregation/aggregationModule';
import {
    ClientSideRowModelHierarchyModule,
    GroupColumnModule,
    StickyRowModule,
} from '../rowHierarchy/rowHierarchyModule';
import { VERSION } from '../version';
import { AgGridHeaderDropZonesSelector } from './columnDropZones/agGridHeaderDropZones';
import { GroupFilter } from './groupFilter/groupFilter';
import { GroupFloatingFilterComp } from './groupFilter/groupFloatingFilter';
import { GroupStrategy } from './groupStrategy/groupStrategy';
import {
    addRowGroupColumns,
    getRowGroupColumns,
    moveRowGroupColumn,
    removeRowGroupColumns,
    setRowGroupColumns,
} from './rowGroupingApi';

/**
 * @internal
 */
export const SharedRowGroupingModule: _ModuleWithApi<_RowGroupingGridApi> = {
    moduleName: 'SharedRowGrouping',
    version: VERSION,
    apiFunctions: {
        setRowGroupColumns,
        removeRowGroupColumns,
        addRowGroupColumns,
        getRowGroupColumns,
        moveRowGroupColumn,
    },
    dependsOn: [EnterpriseCoreModule, SharedAggregationModule, GroupColumnModule, StickyRowModule],
};

/**
 * @feature Row Grouping
 * @colDef enableRowGroup, rowGroup, rowGroupIndex
 */
export const RowGroupingModule: _ModuleWithoutApi = {
    moduleName: 'RowGrouping',
    version: VERSION,
    dynamicBeans: { groupStrategy: GroupStrategy },
    rowModels: ['clientSide'],
    dependsOn: [SharedRowGroupingModule, AggregationModule, ClientSideRowModelHierarchyModule],
};

/**
 * @feature Row Grouping -> Row Group Panel
 */
export const RowGroupingPanelModule: _ModuleWithoutApi = {
    moduleName: 'RowGroupingPanel',
    version: VERSION,
    selectors: [AgGridHeaderDropZonesSelector],
    icons: {
        // identifies the pivot drop zone
        pivotPanel: 'pivot',
        // "Row groups" drop zone in column tool panel
        rowGroupPanel: 'group',
        // separator between column 'pills' when you add multiple columns to the header drop zone
        panelDelimiter: 'small-right',
        // version of panelDelimiter used in RTL mode
        panelDelimiterRtl: 'small-left',
    },
    dependsOn: [EnterpriseCoreModule, _PopupModule],
};

/**
 * @feature Row Grouping -> Filtering
 */
export const GroupFilterModule: _ModuleWithoutApi = {
    moduleName: 'GroupFilter',
    version: VERSION,
    userComponents: { agGroupColumnFilter: GroupFilter, agGroupColumnFloatingFilter: GroupFloatingFilterComp },
    dependsOn: [EnterpriseCoreModule, _ColumnFilterModule],
};
