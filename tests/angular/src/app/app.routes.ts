import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(
      (m) => m.DashboardModule
    ),
  },
  {
    path: 'data-bridge-xlsx', loadComponent: () => import('./modules/data-bridge/xlsx-data-bridge/xlsx-data-bridge.component').then(
      (m) => m.XLSXDataBridgeComponent
    ),
  },
  {
    path: 'data-dictionary-editor', loadComponent: () => import('./modules/data-dictionary/data-dictionary-editor/data-dictionary-editor.component').then(
      (m) => m.DataDictionaryEditorComponent
    ),
  },
  {
    path: 'datagrid-simple', loadComponent: () => import('./modules/datagrid/datagrid-simple/datagrid-simple.component').then(
      (m) => m.DatagridSimpleComponent
    ),
  },
  {
    path: 'datagrid-tree', loadComponent: () => import('./modules/datagrid/datagrid-tree/datagrid-tree.component').then(
      (m) => m.DatagridTreeComponent
    ),
  },
  {
    path: 'inline-rendering', loadComponent: () => import('./modules/report-engine/inline-rendering/inline-rendering.component').then(
      (m) => m.InlineRenderingComponent
    ),
  },
  {
    path: 'inputs', loadComponent: () => import('./modules/inputs/inputs.component').then(
      (m) => m.InputsComponent
    ),
  },
  {
    path: 'scrollable', loadComponent: () => import('./modules/scrollable/scrollable.component').then(
      (m) => m.ScrollableComponent
    ),
  },
  // {
  //   path: 'ag-grid', loadChildren: () => import('./modules/test-ag-grid/test-ag-grid.module').then(
  //     (m) => m.TestAgGridModule
  //   ),
  // },
  // {
  //   path: 'data-dictionary-designer', loadChildren: () => import('./modules/test-data-dictionary-designer/test-data-dictionary-designer.module').then(
  //     (m) => m.TestDataDictionaryDesignerModule
  //   ),
  // },
  // {
  //   path: 'datagrid', loadChildren: () => import('./modules/test-datagrid/test-datagrid.module').then(
  //     (m) => m.TestDatagridModule
  //   ),
  // },
  // {
  //   path: 'drawer', loadChildren: () => import('./modules/test-drawer/test-drawer.module').then(
  //     (m) => m.TestDrawerModule
  //   ),
  // },
  // {
  //   path: 'filters', loadChildren: () => import('./modules/test-filters/test-filters.module').then(
  //     (m) => m.TestFiltersModule
  //   ),
  // },
  // {
  //   path: 'forms', loadChildren: () => import('./modules/test-forms/test-forms.module').then(
  //     (m) => m.TestFormsModule
  //   ),
  // },
  // {
  //   path: 'node-editor', loadChildren: () => import('./modules/test-node-editor/test-node-editor.module').then(
  //     (m) => m.TestNodeEditorModule
  //   ),
  // },
  // {
  //   path: 'pagination', loadChildren: () => import('./modules/test-pagination/test-pagination.module').then(
  //     (m) => m.TestPaginationModule
  //   ),
  // },
  // {
  //   path: 'repeater', loadChildren: () => import('./modules/test-repeater/test-repeater.module').then(
  //     (m) => m.TestRepeaterModule
  //   ),
  // },
  // {
  //   path: 'sorting', loadChildren: () => import('./modules/test-sorting/test-sorting.module').then(
  //     (m) => m.TestSortingModule
  //   ),
  // }
];
