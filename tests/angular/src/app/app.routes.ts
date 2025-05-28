import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '', loadChildren: () => import('../modules/dashboard/dashboard.module').then(
      (m) => m.DashboardModule
    ),
  },
  {
    path: 'ag-grid', loadChildren: () => import('../modules/test-ag-grid/test-ag-grid.module').then(
      (m) => m.TestAgGridModule
    ),
  },
  // {
  //   path: 'data-dictionary-designer', loadChildren: () => import('../modules/test-data-dictionary-designer/test-data-dictionary-designer.module').then(
  //     (m) => m.TestDataDictionaryDesignerModule
  //   ),
  // },
  {
    path: 'datagrid', loadChildren: () => import('../modules/test-datagrid/test-datagrid.module').then(
      (m) => m.TestDatagridModule
    ),
  },
  {
    path: 'drawer', loadChildren: () => import('../modules/test-drawer/test-drawer.module').then(
      (m) => m.TestDrawerModule
    ),
  },
  {
    path: 'filters', loadChildren: () => import('../modules/test-filters/test-filters.module').then(
      (m) => m.TestFiltersModule
    ),
  },
  {
    path: 'forms', loadChildren: () => import('../modules/test-forms/test-forms.module').then(
      (m) => m.TestFormsModule
    ),
  },
  // {
  //   path: 'node-editor', loadChildren: () => import('../modules/test-node-editor/test-node-editor.module').then(
  //     (m) => m.TestNodeEditorModule
  //   ),
  // },
  {
    path: 'pagination', loadChildren: () => import('../modules/test-pagination/test-pagination.module').then(
      (m) => m.TestPaginationModule
    ),
  },
  {
    path: 'repeater', loadChildren: () => import('../modules/test-repeater/test-repeater.module').then(
      (m) => m.TestRepeaterModule
    ),
  },
  {
    path: 'sorting', loadChildren: () => import('../modules/test-sorting/test-sorting.module').then(
      (m) => m.TestSortingModule
    ),
  }
];
