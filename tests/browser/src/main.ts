
import { AcDatagridHtmlPlaceholder, AcDatagridRowDraggingHtmlPlaceholder, AcDatagridTreeTableHtmlPlaceholder, AcPaginationHtmlPlaceholder, AcTabsCssClassName } from '@autocode-ts/ac-browser';
import { AcRouter } from './utils/ac-router';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { AggridLocalData } from './pages/ag-grid/local-data.page';
import { DatagridLocalData } from './pages/datagrid/local-data.page';
import { DatagridLocalDataTree } from './pages/datagrid/local-data-tree.page';
import { DraggableAxisLockPage } from './pages/draggable/axis-lock';
import { DraggableBasicPage } from './pages/draggable/basic';
import { DraggableCloneRevertPage } from './pages/draggable/clone-revert';
import { DraggableGroupedTestPage } from './pages/draggable/groupped';
import { DraggableSnapGridPage } from './pages/draggable/snap-grid';
import { DraggableSortablePage } from './pages/draggable/sortable';
import { InputBasicPage } from './pages/inputs/basic.page';
import { TemplateEnginePage } from './pages/template-engine/template-engine.page';
import { AggridLocalDataTree } from './pages/ag-grid/local-data-tree.page';
import { CollapseTestPage } from './pages/collapse/collapse-all-tests.page';
import { AggridOnDemandData } from './pages/ag-grid/on-demand-data.page';
import { DDEEditorDatagridPage } from './pages/data-dictionary-editor/datagrid.page';
import { ResizableTestPage } from './pages/resizable/resizable-test-page.page';
import { ResizablePanelsTestPage } from './pages/resizable/resizable-panels-test-page.page';
import { DrawerTestPage } from './pages/drawer/drawer-test-page.page';
import { DropdownTestPage } from './pages/dropdown/dropdown-test-page.page';
import { MessageTestPage } from './pages/message/message-test-page.page';
import { ModalTestPage } from './pages/modal/modal-test-page.page';
import { AnimatedModalTestPage } from './pages/modal/animated-modal-test-page.page';
import { PopoverTestPage } from './pages/popover/popover-test-page.page';
import { BasicScrollTrackTestPage } from './pages/scroll-track/basic-scroll-track-test.page';
import { SlidesBasicTestPage } from './pages/slides/slides-basic-test.page';
import { VirtualTestScrollPage } from './pages/scrollable/virtual-test-scroll.page';
import { VirtualScrollDirectDomTestPage } from './pages/scrollable/virtual-scroll-direct-dom-test.page';
import { SQLiteDaoTestPage } from './pages/dao/sqlite-dao-test-page.page';
import { AcSqliteDao } from '@autocode-ts/ac-sqlite-dao-browser';
import { AccordionTestPage } from './pages/collapse/accordion-test-page.page';
import { BasicBuilderPage } from './pages/builder/basic-builder.page';
import { TabsTestPage } from './pages/tabs/tabs-test-page.pages';

AcPaginationHtmlPlaceholder.first = `<i class="fa-solid fa-angles-left"></i>`;
AcPaginationHtmlPlaceholder.previous = `<i class="fa-solid fa-angle-left"></i>`;
AcPaginationHtmlPlaceholder.next = `<i class="fa-solid fa-angle-right"></i>`;
AcPaginationHtmlPlaceholder.last = `<i class="fa-solid fa-angles-right"></i>`;

AcDatagridHtmlPlaceholder.appliedFilter = `<i class="fa-solid fa-filter"></i>`;
AcDatagridHtmlPlaceholder.filter = `<i class="fa-solid fa-align-center" style='transform: rotate(179deg);'></i>`;
AcDatagridHtmlPlaceholder.sort = `<i class="fa-solid fa-sort"></i>`;
AcDatagridHtmlPlaceholder.resize = `&nbsp;`;
AcDatagridHtmlPlaceholder.sortAscending = `<i class="fa-solid fa-arrow-down-short-wide"></i>`;
AcDatagridHtmlPlaceholder.sortDescending = `<i class="fa-solid fa-arrow-down-wide-short"></i>`;

AcDatagridRowDraggingHtmlPlaceholder.drag = `<i class="fa-solid fa-grip-lines"></i>`;

AcDatagridTreeTableHtmlPlaceholder.treeClosed = `<i class="fa-solid fa-plus"></i>`;
AcDatagridTreeTableHtmlPlaceholder.treeOpen = `<i class="fa-solid fa-minus"></i>`;

AcTabsCssClassName.acTabActive += ' active';
AcTabsCssClassName.acTabPane += ' ';
AcTabsCssClassName.acTabPane += ' show active';

AcSqliteDao.wasmUrl = './assets/vendor/sql.js/sql-wasm.wasm';

window.addEventListener('DOMContentLoaded', () => {
  AcRouter.registerRoute({ label: 'Dashboard', path: '/', componentTag: 'dashboard-page', component: DashboardPage });
  AcRouter.registerRouteGroup({
    label: 'AGGrid',
    routes: [
      { label: 'Local Data', path: '/aggrid/local-data', componentTag: 'aggrid-local-data', component: AggridLocalData },
      { label: 'Local Data Tree', path: '/aggrid/local-data-tree', componentTag: 'aggrid-local-data-tree', component: AggridLocalDataTree },
      { label: 'On-Demand Data', path: '/aggrid/on-demand-data', componentTag: 'on-demand-data', component: AggridOnDemandData },
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Builder',
    routes: [
      { label: 'Basic', path: '/builder-basic', componentTag: 'builder-basic', component: BasicBuilderPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Collapse & Accordion',
    routes: [
      { label: 'Collapse', path: '/collapse/collapse', componentTag: 'collapse-test', component: CollapseTestPage },
      { label: 'Accordion', path: '/collapse/accordion', componentTag: 'accordion-test', component: AccordionTestPage },
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Dao',
    routes: [
      { label: 'Slite', path: '/dao/sqlite', componentTag: 'dao-sqlite', component: SQLiteDaoTestPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Data Dictionary',
    routes: [
      { label: 'Editor', path: '/data-dictionary/datagrid', componentTag: 'data-dictionary-editor', component: DDEEditorDatagridPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Datagrid',
    routes: [
      { label: 'Local Data', path: '/datagrid/local-data', componentTag: 'datagrid-local-data', component: DatagridLocalData },
      { label: 'Local Data Tree', path: '/datagrid/local-data-tree', componentTag: 'datagrid-local-data-tree', component: DatagridLocalDataTree },
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Drag/Drop',
    routes: [
      { label: 'Axis Lock', path: '/draggable/axis-lock', componentTag: 'draggable-axis-lock', component: DraggableAxisLockPage },
      { label: 'Basic', path: '/draggable/basic', componentTag: 'draggable-basic', component: DraggableBasicPage },
      { label: 'Clone/Revert', path: '/draggable/clone-revert', componentTag: 'draggable-clone-revert', component: DraggableCloneRevertPage },
      { label: 'Grouped', path: '/draggable/grouped', componentTag: 'draggable-grouped', component: DraggableGroupedTestPage },
      { label: 'Snap Grid', path: '/draggable/snap-grid', componentTag: 'draggable-snap-grid', component: DraggableSnapGridPage },
      { label: 'Sortable', path: '/draggable/sortable', componentTag: 'draggable-sortable', component: DraggableSortablePage },
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Drawer',
    routes: [
      { label: 'All Directions', path: '/drawer/all-directions', componentTag: 'drawer-all-directions', component: DrawerTestPage },
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Dropdown',
    routes: [
      { label: 'Basic', path: '/dropdown/basic', componentTag: 'dropdown-basic', component: DropdownTestPage },
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Inputs',
    routes: [
      { label: 'Basic', path: '/inputs/basic', componentTag: 'inputs-basic', component: InputBasicPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Message',
    routes: [
      { label: 'All', path: '/message/all', componentTag: 'message-all', component: MessageTestPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Modal',
    routes: [
      { label: 'Basic', path: '/modal/basic', componentTag: 'modal-basic', component: ModalTestPage },
      { label: 'Animated', path: '/modal/animated', componentTag: 'modal-animated', component: AnimatedModalTestPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Popover',
    routes: [
      { label: 'Basic', path: '/popover/basic', componentTag: 'popover-basic', component: PopoverTestPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Resizable',
    routes: [
      { label: 'Basic', path: '/resizable/basic', componentTag: 'resizable-basic', component: ResizableTestPage },
      { label: 'Resizable Panels', path: '/resizable/panels', componentTag: 'resizable-panels', component: ResizablePanelsTestPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Scroll Track',
    routes: [
      { label: 'Basic', path: '/scroll-track/basic', componentTag: 'scroll-track-basic', component: BasicScrollTrackTestPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Scrollable',
    routes: [
      { label: 'Virtual Using API', path: '/scrollable/virtual-api', componentTag: 'virtual-scroll-api', component: VirtualTestScrollPage },
      { label: 'Virtual through DOM', path: '/scrollable/virtual-dom', componentTag: 'virtual-scroll-dom', component: VirtualScrollDirectDomTestPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Slides',
    routes: [
      { label: 'Basic', path: '/slides/basic', componentTag: 'slides-basic', component: SlidesBasicTestPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Tabs',
    routes: [
      { label: 'Basic', path: '/tabs/basic', componentTag: 'tabs-basic', component: TabsTestPage }
    ]
  });
  AcRouter.registerRouteGroup({
    label: 'Template Engine',
    routes: [
      { label: 'Basic', path: '/template-engine', componentTag: 'template-engine', component: TemplateEnginePage }
    ]
  });
  window.addEventListener('popstate', () => AcRouter.loadRoute(location.pathname));
  AcRouter.loadRoute(location.pathname);
});
