import type {
    BeanCollection,
    DetailGridInfo,
    Environment,
    FullWidthRowFocusedEvent,
    GridApi,
    GridOptions,
    IDetailCellRenderer,
    IDetailCellRendererCtrl,
    IDetailCellRendererParams,
    RowNode,
    RowSelectedEvent,
} from 'ag-grid-community';
import { BeanStub, _addGridCommonParams, _focusInto, _isSameRow, _missing, _warn } from 'ag-grid-community';

export class AcDGDetailCellRendererCtrl extends BeanStub implements IDetailCellRendererCtrl {
    private params: IDetailCellRendererParams;

    private comp: IDetailCellRenderer;

    private loadRowDataVersion = 0;

    private refreshStrategy: 'rows' | 'everything' | 'nothing';

    private environment: Environment;

    public wireBeans(beans: BeanCollection): void {
        this.environment = beans.environment;
    }

    public init(comp: IDetailCellRenderer, params: IDetailCellRendererParams): void {
        this.params = params;
        this.comp = comp;

        const doNothingBecauseInsidePinnedSection = params.pinned != null;
        if (doNothingBecauseInsidePinnedSection) {
            return;
        }

        this.setAutoHeightClasses();
        this.setupRefreshStrategy();
        this.createDetailGrid();
        this.loadRowData();

        this.addManagedEventListeners({ fullWidthRowFocused: this.onFullWidthRowFocused.bind(this) });
    }

    private onFullWidthRowFocused(e: FullWidthRowFocusedEvent): void {
        const params = this.params;
        const row = { rowIndex: params.node.rowIndex!, rowPinned: params.node.rowPinned! };
        const eventRow = { rowIndex: e.rowIndex!, rowPinned: e.rowPinned! };
        const isSameRow = _isSameRow(row, eventRow);

        if (!isSameRow) {
            return;
        }

        _focusInto(this.comp.getGui(), e.fromBelow);
    }

    private setAutoHeightClasses(): void {
        const autoHeight = this.gos.get('detailRowAutoHeight');

        const parentClass = autoHeight ? 'ag-details-row-auto-height' : 'ag-details-row-fixed-height';
        const detailClass = autoHeight ? 'ag-details-grid-auto-height' : 'ag-details-grid-fixed-height';

        const comp = this.comp;
        comp.toggleCss(parentClass, true);
        comp.toggleDetailGridCss(detailClass, true);
    }

    private setupRefreshStrategy(): void {
        const providedStrategy = this.params.refreshStrategy;

        const validSelection =
            providedStrategy == 'everything' || providedStrategy == 'nothing' || providedStrategy == 'rows';
        if (validSelection) {
            this.refreshStrategy = providedStrategy;
            return;
        }

        if (providedStrategy != null) {
            _warn(170, { providedStrategy });
        }

        this.refreshStrategy = 'rows';
    }

    private createDetailGrid(): void {
        const { params, gos } = this;
        if (_missing(params.detailGridOptions)) {
            _warn(171);
            return;
        }

        const masterTheme = gos.get('theme');
        const detailTheme = params.detailGridOptions.theme;
        if (detailTheme && detailTheme !== masterTheme) {
            _warn(267);
        }

        const gridOptions: GridOptions = {
            themeStyleContainer: this.environment.eStyleContainer,
            ...params.detailGridOptions,
            theme: masterTheme,
        };

        const autoHeight = gos.get('detailRowAutoHeight');
        if (autoHeight) {
            gridOptions.domLayout = 'autoHeight';
        }

        this.comp.setDetailGrid(gridOptions);
    }

    public registerDetailWithMaster(api: GridApi): void {
        const {
            params,
            beans: { selectionSvc, findSvc },
        } = this;
        const rowId = params.node.id!;
        const masterGridApi = params.api;

        const gridInfo: DetailGridInfo = {
            id: rowId,
            api,
        };

        const rowNode = params.node as RowNode;

        // register with api if the master api is still alive
        if (masterGridApi.isDestroyed()) {
            return;
        }
        masterGridApi.addDetailGridInfo(rowId, gridInfo);

        // register with node
        rowNode.detailGridInfo = gridInfo;

        const masterNode = rowNode.parent!;

        findSvc?.registerDetailGrid(rowNode, api);

        function onDetailSelectionChanged() {
            if (masterNode) {
                selectionSvc?.refreshMasterNodeState(masterNode);
            }
        }

        function onMasterRowSelected({ node, source }: RowSelectedEvent) {
            if (node !== masterNode || source === 'masterDetail' || api.isDestroyed()) {
                return;
            }

            selectionSvc?.setDetailSelectionState(masterNode, params.detailGridOptions, api);
        }

        // initialise selection state
        api.addEventListener('firstDataRendered', () => {
            if (api.isDestroyed() || masterGridApi.isDestroyed()) return;

            selectionSvc?.setDetailSelectionState(masterNode, params.detailGridOptions, api);

            api.addEventListener('selectionChanged', onDetailSelectionChanged);
            masterGridApi.addEventListener('rowSelected', onMasterRowSelected);
        });

        this.addDestroyFunc(() => {
            // the gridInfo can be stale if a refresh happens and
            // a new row is created before the old one is destroyed.
            if (rowNode.detailGridInfo !== gridInfo) {
                return;
            }
            if (!masterGridApi.isDestroyed()) {
                masterGridApi.removeDetailGridInfo(rowId); // unregister from api
            }
            rowNode.detailGridInfo = null; // unregister from node
        });
    }

    private loadRowData(): void {
        // in case a refresh happens before the last refresh completes (as we depend on async
        // application logic) we keep track on what the latest call was.
        this.loadRowDataVersion++;
        const versionThisCall = this.loadRowDataVersion;

        const params = this.params;
        if (params.detailGridOptions?.rowModelType === 'serverSide') {
            const node = params.node as RowNode;
            node.detailGridInfo?.api?.refreshServerSide({ purge: true });
            return;
        }

        const userFunc = params.getDetailRowData;
        if (!userFunc) {
            _warn(172);
            return;
        }

        const successCallback = (rowData: any[]) => {
            const mostRecentCall = this.loadRowDataVersion === versionThisCall;
            if (mostRecentCall) {
                this.comp.setRowData(rowData);
            }
        };

        const funcParams = {
            node: params.node,
            // we take data from node, rather than params.data
            // as the data could have been updated with new instance
            data: params.node.data,
            successCallback: successCallback,
            context: _addGridCommonParams(this.gos, {}).context,
        };
        userFunc(funcParams);
    }

    public refresh(): boolean {
        const GET_GRID_TO_REFRESH = false;
        const GET_GRID_TO_DO_NOTHING = true;

        switch (this.refreshStrategy) {
            // ignore this refresh, make grid think we've refreshed but do nothing
            case 'nothing':
                return GET_GRID_TO_DO_NOTHING;
            // grid will destroy and recreate the cell
            case 'everything':
                return GET_GRID_TO_REFRESH;
        }

        // do the refresh here, and tell the grid to do nothing
        this.loadRowData();
        return GET_GRID_TO_DO_NOTHING;
    }
}
