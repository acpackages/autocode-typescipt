import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', loadChildren: () => import('../dashboard/dashboard.module').then(
      (m) => m.DashboardModule
    ),
  },
  {
    path: 'data-dictionary-designer', loadChildren: () => import('../test-data-dictionary-designer/test-data-dictionary-designer.module').then(
      (m) => m.TestDataDictionaryDesignerModule
    ),
  },
  {
    path: 'datagrid', loadChildren: () => import('../test-datagrid/test-datagrid.module').then(
      (m) => m.TestDatagridModule
    ),
  },
  {
    path: 'drawer', loadChildren: () => import('../test-drawer/test-drawer.module').then(
      (m) => m.TestDrawerModule
    ),
  },
  {
    path: 'filters', loadChildren: () => import('../test-filters/test-filters.module').then(
      (m) => m.TestFiltersModule
    ),
  },
  {
    path: 'forms', loadChildren: () => import('../test-forms/test-forms.module').then(
      (m) => m.TestFormsModule
    ),
  },
  {
    path: 'node-editor', loadChildren: () => import('../test-node-editor/test-node-editor.module').then(
      (m) => m.TestNodeEditorModule
    ),
  },
  {
    path: 'pagination', loadChildren: () => import('../test-pagination/test-pagination.module').then(
      (m) => m.TestPaginationModule
    ),
  },
  {
    path: 'repeater', loadChildren: () => import('../test-repeater/test-repeater.module').then(
      (m) => m.TestRepeaterModule
    ),
  },
  {
    path: 'sorting', loadChildren: () => import('../test-sorting/test-sorting.module').then(
      (m) => m.TestSortingModule
    ),
  }
];
