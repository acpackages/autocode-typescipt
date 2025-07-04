import type { ResizeFeature } from '../../../columnResize/resizeFeature';
import { setupCompBean } from '../../../components/emptyBean';
import { _getHeaderCompDetails } from '../../../components/framework/userCompUtils';
import { KeyCode } from '../../../constants/keyCode';
import type { BeanStub } from '../../../context/beanStub';
import type { AgColumn } from '../../../entities/agColumn';
import type { HeaderClassParams, SortDirection } from '../../../entities/colDef';
import { _addGridCommonParams, _getActiveDomElement, _isLegacyMenuEnabled } from '../../../gridOptionsUtils';
import { ColumnHighlightPosition } from '../../../interfaces/iColumn';
import type { IHeader, IHeaderParams } from '../../../interfaces/iHeader';
import type { UserCompDetails } from '../../../interfaces/iUserCompDetails';
import { SetLeftFeature } from '../../../rendering/features/setLeftFeature';
import type { SelectAllFeature } from '../../../selection/selectAllFeature';
import type { TooltipFeature } from '../../../tooltip/tooltipFeature';
import type { ColumnSortState } from '../../../utils/aria';
import { _getAriaSortState } from '../../../utils/aria';
import { _setDisplayed } from '../../../utils/dom';
import { _isKeyboardMode } from '../../../utils/focus';
import { ManagedFocusFeature } from '../../../widgets/managedFocusFeature';
import { getColumnHeaderRowHeight, getGroupRowsHeight } from '../../headerUtils';
import type { IAbstractHeaderCellComp } from '../abstractCell/abstractHeaderCellCtrl';
import { AbstractHeaderCellCtrl } from '../abstractCell/abstractHeaderCellCtrl';
import { _getHeaderClassesFromColDef } from '../cssClassApplier';
import type { HeaderComp } from './headerComp';

export interface IHeaderCellComp extends IAbstractHeaderCellComp {
    setWidth(width: string): void;
    setAriaSort(sort?: ColumnSortState): void;
    setUserCompDetails(compDetails: UserCompDetails): void;
    getUserCompInstance(): IHeader | undefined;
}

type HeaderAriaDescriptionKey = 'filter' | 'menu' | 'sort' | 'selectAll' | 'filterButton';
type RefreshFunction =
    | 'updateSortable'
    | 'tooltip'
    | 'headerClasses'
    | 'headerStyles'
    | 'wrapText'
    | 'measuring'
    | 'resize';

export class AcDGHeaderCellCtrl extends AbstractHeaderCellCtrl<IHeaderCellComp, AgColumn, ResizeFeature> {
    private refreshFunctions: { [key in RefreshFunction]?: () => void } = {};
    private selectAllFeature?: SelectAllFeature;

    private sortable: boolean | null | undefined;
    private displayName: string | null;
    private draggable: boolean;
    private menuEnabled: boolean;
    private openFilterEnabled: boolean;
    private dragSourceElement: HTMLElement | undefined;

    private userCompDetails: UserCompDetails;

    private userHeaderClasses: Set<string> = new Set();
    private ariaDescriptionProperties = new Map<HeaderAriaDescriptionKey, string>();
    private tooltipFeature: TooltipFeature | undefined;

    public setComp(
        comp: IHeaderCellComp,
        eGui: HTMLElement,
        eResize: HTMLElement,
        eHeaderCompWrapper: HTMLElement,
        compBeanInput: BeanStub | undefined
    ): void {
        this.comp = comp;

        const { rowCtrl, column, beans } = this;
        const { colResize, context, colHover, rangeSvc } = beans;
        const compBean = setupCompBean(this, context, compBeanInput);

        this.setGui(eGui, compBean);
        this.updateState();
        this.setupWidth(compBean);
        this.setupMovingCss(compBean);
        this.setupMenuClass(compBean);
        this.setupSortableClass(compBean);
        this.setupWrapTextClass();
        this.refreshSpanHeaderHeight();

        this.setupAutoHeight({
            wrapperElement: eHeaderCompWrapper,
            checkMeasuringCallback: (checkMeasuring) => this.setRefreshFunction('measuring', checkMeasuring),
            compBean,
        });

        this.addColumnHoverListener(compBean);
        this.setupFilterClass(compBean);
        this.setupStylesFromColDef();
        this.setupClassesFromColDef();
        this.setupTooltip();
        this.addActiveHeaderMouseListeners(compBean);
        this.setupSelectAll(compBean);
        this.setupUserComp();
        this.refreshAria();

        if (colResize) {
            this.resizeFeature = compBean.createManagedBean(
                colResize.createResizeFeature(rowCtrl.pinned, column, eResize, comp, this)
            );
        } else {
            _setDisplayed(eResize, false);
        }
        colHover?.createHoverFeature(compBean, [column], eGui);
        rangeSvc?.createRangeHighlightFeature(compBean, column, comp);
        compBean.createManagedBean(new SetLeftFeature(column, eGui, beans));
        compBean.createManagedBean(
            new ManagedFocusFeature(eGui, {
                shouldStopEventPropagation: (e) => this.shouldStopEventPropagation(e),
                onTabKeyDown: () => null,
                handleKeyDown: this.handleKeyDown.bind(this),
                onFocusIn: this.onFocusIn.bind(this),
                onFocusOut: this.onFocusOut.bind(this),
            })
        );

        this.addResizeAndMoveKeyboardListeners(compBean);

        compBean.addManagedPropertyListeners(
            ['suppressMovableColumns', 'suppressMenuHide', 'suppressAggFuncInHeader', 'enableAdvancedFilter'],
            () => this.refresh()
        );
        compBean.addManagedListeners(column, { colDefChanged: () => this.refresh() });
        compBean.addManagedListeners(column, { headerHighlightChanged: this.onHeaderHighlightChanged.bind(this) });

        const listener = () => this.checkDisplayName();
        compBean.addManagedEventListeners({
            columnValueChanged: listener,
            columnRowGroupChanged: listener,
            columnPivotChanged: listener,
            headerHeightChanged: this.onHeaderHeightChanged.bind(this),
        });

        compBean.addDestroyFunc(() => {
            this.refreshFunctions = {};
            (this.selectAllFeature as any) = null;
            this.dragSourceElement = undefined;
            (this.userCompDetails as any) = null;
            this.userHeaderClasses.clear();
            this.ariaDescriptionProperties.clear();
            // Make sure this is the last destroy func as it clears the gui and comp
            this.clearComponent();
        });
    }

    protected resizeHeader(delta: number, shiftKey: boolean): void {
        this.beans.colResize?.resizeHeader(this.column, delta, shiftKey);
    }

    protected getHeaderClassParams(): HeaderClassParams {
        const { column, beans } = this;
        const colDef = column.colDef;

        return _addGridCommonParams(beans.gos, {
            colDef,
            column,
            floatingFilter: false,
        });
    }

    private setupUserComp(): void {
        const compDetails = this.lookupUserCompDetails();
        if (compDetails) {
            this.setCompDetails(compDetails);
        }
    }

    private setCompDetails(compDetails: UserCompDetails): void {
        this.userCompDetails = compDetails;
        this.comp.setUserCompDetails(compDetails);
    }

    private lookupUserCompDetails(): UserCompDetails | undefined {
        const params = this.createParams();
        const colDef = this.column.getColDef();
        return _getHeaderCompDetails(this.beans.userCompFactory, colDef, params)!;
    }

    private createParams(): IHeaderParams {
        const { menuSvc, sortSvc, colFilter, gos } = this.beans;
        const params: IHeaderParams = _addGridCommonParams(gos, {
            column: this.column,
            displayName: this.displayName!,
            enableSorting: this.column.isSortable(),
            enableMenu: this.menuEnabled,
            enableFilterButton: this.openFilterEnabled && !!menuSvc?.isHeaderFilterButtonEnabled(this.column),
            enableFilterIcon: !!colFilter && (!this.openFilterEnabled || _isLegacyMenuEnabled(this.gos)),
            showColumnMenu: (buttonElement: HTMLElement, onClosedCallback?: () => void) => {
                menuSvc?.showColumnMenu({
                    column: this.column,
                    buttonElement,
                    positionBy: 'button',
                    onClosedCallback,
                });
            },
            showColumnMenuAfterMouseClick: (mouseEvent: MouseEvent | Touch, onClosedCallback?: () => void) => {
                menuSvc?.showColumnMenu({
                    column: this.column,
                    mouseEvent,
                    positionBy: 'mouse',
                    onClosedCallback,
                });
            },
            showFilter: (buttonElement: HTMLElement) => {
                menuSvc?.showFilterMenu({
                    column: this.column,
                    buttonElement: buttonElement,
                    containerType: 'columnFilter',
                    positionBy: 'button',
                });
            },
            progressSort: (multiSort?: boolean) => {
                sortSvc?.progressSort(this.column, !!multiSort, 'uiColumnSorted');
            },
            setSort: (sort: SortDirection, multiSort?: boolean) => {
                sortSvc?.setSortForColumn(this.column, sort, !!multiSort, 'uiColumnSorted');
            },
            eGridHeader: this.eGui,
            setTooltip: (value: string, shouldDisplayTooltip: () => boolean) => {
                gos.assertModuleRegistered('Tooltip', 3);
                this.setupTooltip(value, shouldDisplayTooltip);
            },
        });

        return params;
    }

    private setupSelectAll(compBean: BeanStub): void {
        const { selectionSvc } = this.beans;
        if (!selectionSvc) {
            return;
        }
        this.selectAllFeature = compBean.createManagedBean(selectionSvc.createSelectAllFeature(this.column));
        this.selectAllFeature.setComp(this);
    }

    public getSelectAllGui(): HTMLElement | undefined {
        return this.selectAllFeature?.getCheckboxGui();
    }

    protected override handleKeyDown(e: KeyboardEvent): void {
        super.handleKeyDown(e);

        if (e.key === KeyCode.SPACE) {
            this.selectAllFeature?.onSpaceKeyDown(e);
        }
        if (e.key === KeyCode.ENTER) {
            this.onEnterKeyDown(e);
        }
        if (e.key === KeyCode.DOWN && e.altKey) {
            this.showMenuOnKeyPress(e, false);
        }
    }

    private onEnterKeyDown(e: KeyboardEvent): void {
        if (e.ctrlKey || e.metaKey) {
            this.showMenuOnKeyPress(e, true);
        } else if (this.sortable) {
            this.beans.sortSvc?.progressSort(this.column, e.shiftKey, 'uiColumnSorted');
        }
    }

    private showMenuOnKeyPress(e: KeyboardEvent, isFilterShortcut: boolean): void {
        const headerComp = this.comp.getUserCompInstance();
        if (!isHeaderComp(headerComp)) {
            return;
        }

        // the header comp knows what features are enabled, so let it handle the shortcut
        if (headerComp.onMenuKeyboardShortcut(isFilterShortcut)) {
            e.preventDefault();
        }
    }

    private onFocusIn(e: FocusEvent) {
        if (!this.eGui.contains(e.relatedTarget as HTMLElement)) {
            this.focusThis();
            this.announceAriaDescription();
        }

        if (_isKeyboardMode()) {
            this.setActiveHeader(true);
        }
    }

    private onFocusOut(e: FocusEvent) {
        if (this.eGui.contains(e.relatedTarget as HTMLElement)) {
            return;
        }

        this.setActiveHeader(false);
    }

    private setupTooltip(value?: string, shouldDisplayTooltip?: () => boolean): void {
        this.tooltipFeature = this.beans.tooltipSvc?.setupHeaderTooltip(
            this.tooltipFeature,
            this,
            value,
            shouldDisplayTooltip
        );
    }

    private setupStylesFromColDef(): void {
        this.setRefreshFunction('headerStyles', this.refreshHeaderStyles.bind(this));
        this.refreshHeaderStyles();
    }

    private setupClassesFromColDef(): void {
        const refreshHeaderClasses = () => {
            const colDef = this.column.getColDef();
            const classes = _getHeaderClassesFromColDef(colDef, this.gos, this.column, null);

            const oldClasses = this.userHeaderClasses;
            this.userHeaderClasses = new Set(classes);

            classes.forEach((c) => {
                if (oldClasses.has(c)) {
                    // class already added, no need to apply it, but remove from old set
                    oldClasses.delete(c);
                } else {
                    // class new since last time, so apply it
                    this.comp.toggleCss(c, true);
                }
            });

            // now old set only has classes that were applied last time, but not this time, so remove them
            oldClasses.forEach((c) => this.comp.toggleCss(c, false));
        };

        this.setRefreshFunction('headerClasses', refreshHeaderClasses);
        refreshHeaderClasses();
    }

    public setDragSource(eSource: HTMLElement | undefined): void {
        this.dragSourceElement = eSource;
        this.removeDragSource();

        if (!eSource || !this.draggable) {
            return;
        }

        this.dragSource = this.beans.colMoves?.setDragSourceForHeader(eSource, this.column, this.displayName) ?? null;
    }

    private updateState(): void {
        const { menuSvc } = this.beans;
        this.menuEnabled = !!menuSvc?.isColumnMenuInHeaderEnabled(this.column);
        this.openFilterEnabled = !!menuSvc?.isFilterMenuInHeaderEnabled(this.column);
        this.sortable = this.column.isSortable();
        this.displayName = this.calculateDisplayName();
        this.draggable = this.workOutDraggable();
    }

    public setRefreshFunction(name: RefreshFunction, func: () => void): void {
        this.refreshFunctions[name] = func;
    }

    private refresh(): void {
        this.updateState();
        this.refreshHeaderComp();
        this.refreshAria();
        Object.values(this.refreshFunctions).forEach((f) => f());
    }

    private refreshHeaderComp(): void {
        const newCompDetails = this.lookupUserCompDetails();
        if (!newCompDetails) {
            return;
        }

        const compInstance = this.comp.getUserCompInstance();

        // only try refresh if old comp exists adn it is the correct type
        const attemptRefresh =
            compInstance != null && this.userCompDetails.componentClass == newCompDetails.componentClass;

        const headerCompRefreshed = attemptRefresh ? this.attemptHeaderCompRefresh(newCompDetails.params) : false;

        if (headerCompRefreshed) {
            // we do this as a refresh happens after colDefs change, and it's possible the column has had it's
            // draggable property toggled. no need to call this if not refreshing, as setDragSource is done
            // as part of appendHeaderComp
            this.setDragSource(this.dragSourceElement);
        } else {
            this.setCompDetails(newCompDetails);
        }
    }

    private attemptHeaderCompRefresh(params: IHeaderParams): boolean {
        const headerComp = this.comp.getUserCompInstance();
        if (!headerComp) {
            return false;
        }

        // if no refresh method, then we want to replace the headerComp
        if (!headerComp.refresh) {
            return false;
        }

        const res = headerComp.refresh(params);

        return res;
    }

    private calculateDisplayName(): string | null {
        return this.beans.colNames.getDisplayNameForColumn(this.column, 'header', true);
    }

    private checkDisplayName(): void {
        // display name can change if aggFunc different, eg sum(Gold) is now max(Gold)
        if (this.displayName !== this.calculateDisplayName()) {
            this.refresh();
        }
    }

    private workOutDraggable(): boolean {
        const colDef = this.column.getColDef();
        const isSuppressMovableColumns = this.gos.get('suppressMovableColumns');

        const colCanMove = !isSuppressMovableColumns && !colDef.suppressMovable && !colDef.lockPosition;

        // we should still be allowed drag the column, even if it can't be moved, if the column
        // can be dragged to a rowGroup or pivot drop zone
        return !!colCanMove || !!colDef.enableRowGroup || !!colDef.enablePivot;
    }

    private setupWidth(compBean: BeanStub): void {
        const listener = () => {
            const columnWidth = this.column.getActualWidth();
            this.comp.setWidth(`${columnWidth}px`);
        };

        compBean.addManagedListeners(this.column, { widthChanged: listener });
        listener();
    }

    private setupMovingCss(compBean: BeanStub): void {
        const listener = () => {
            // this is what makes the header go dark when it is been moved (gives impression to
            // user that the column was picked up).
            this.comp.toggleCss('ag-header-cell-moving', this.column.isMoving());
        };

        compBean.addManagedListeners(this.column, { movingChanged: listener });
        listener();
    }

    private setupMenuClass(compBean: BeanStub): void {
        const listener = () => {
            this.comp?.toggleCss('ag-column-menu-visible', this.column.isMenuVisible());
        };

        compBean.addManagedListeners(this.column, { menuVisibleChanged: listener });
        listener();
    }

    private setupSortableClass(compBean: BeanStub): void {
        const updateSortableCssClass = () => {
            this.comp.toggleCss('ag-header-cell-sortable', !!this.sortable);
        };

        updateSortableCssClass();

        this.setRefreshFunction('updateSortable', updateSortableCssClass);
        compBean.addManagedEventListeners({ sortChanged: this.refreshAriaSort.bind(this) });
    }

    private setupFilterClass(compBean: BeanStub): void {
        const listener = () => {
            const isFilterActive = this.column.isFilterActive();
            this.comp.toggleCss('ag-header-cell-filtered', isFilterActive);
            this.refreshAria();
        };

        compBean.addManagedListeners(this.column, { filterActiveChanged: listener });
        listener();
    }

    private setupWrapTextClass() {
        const listener = () => {
            const wrapText = !!this.column.getColDef().wrapHeaderText;
            this.comp.toggleCss('ag-header-cell-wrap-text', wrapText);
        };
        listener();
        this.setRefreshFunction('wrapText', listener);
    }

    private onHeaderHighlightChanged(): void {
        const highlighted = this.column.getHighlighted();
        const beforeOn = highlighted === ColumnHighlightPosition.Before;
        const afterOn = highlighted === ColumnHighlightPosition.After;

        this.comp.toggleCss('ag-header-highlight-before', beforeOn);
        this.comp.toggleCss('ag-header-highlight-after', afterOn);
    }

    protected override onDisplayedColumnsChanged(): void {
        super.onDisplayedColumnsChanged();
        if (!this.isAlive()) {
            return;
        }
        this.onHeaderHeightChanged();
    }

    private onHeaderHeightChanged() {
        this.refreshSpanHeaderHeight();
    }

    private refreshSpanHeaderHeight() {
        const { eGui, column, comp, beans } = this;
        const groupHeaderHeight = getGroupRowsHeight(this.beans);
        const isZeroGroupHeight = groupHeaderHeight.reduce((total, next) => (total += next), 0) === 0;

        comp.toggleCss('ag-header-parent-hidden', isZeroGroupHeight);

        if (!column.isSpanHeaderHeight()) {
            eGui.style.removeProperty('top');
            eGui.style.removeProperty('height');
            comp.toggleCss('ag-header-span-height', false);
            comp.toggleCss('ag-header-span-total', false);
            return;
        }

        const { numberOfParents, isSpanningTotal } = this.column.getColumnGroupPaddingInfo();

        comp.toggleCss('ag-header-span-height', numberOfParents > 0);

        const headerHeight = getColumnHeaderRowHeight(beans);

        if (numberOfParents === 0) {
            // if spanning has stopped then need to reset these values.
            comp.toggleCss('ag-header-span-total', false);
            eGui.style.setProperty('top', `0px`);
            eGui.style.setProperty('height', `${headerHeight}px`);
            return;
        }

        comp.toggleCss('ag-header-span-total', isSpanningTotal);

        let extraHeight = 0;
        for (let i = 0; i < numberOfParents; i++) {
            extraHeight += groupHeaderHeight[groupHeaderHeight.length - 1 - i];
        }

        eGui.style.setProperty('top', `${-extraHeight}px`);
        eGui.style.setProperty('height', `${headerHeight + extraHeight}px`);
    }

    private refreshAriaSort(): void {
        if (this.sortable) {
            const translate = this.getLocaleTextFunc();
            const sort = this.beans.sortSvc?.getDisplaySortForColumn(this.column) || null;
            this.comp.setAriaSort(_getAriaSortState(sort));
            this.setAriaDescriptionProperty('sort', translate('ariaSortableColumn', 'Press ENTER to sort'));
        } else {
            this.comp.setAriaSort();
            this.setAriaDescriptionProperty('sort', null);
        }
    }

    private refreshAriaMenu(): void {
        if (this.menuEnabled) {
            const translate = this.getLocaleTextFunc();
            this.setAriaDescriptionProperty('menu', translate('ariaMenuColumn', 'Press ALT DOWN to open column menu'));
        } else {
            this.setAriaDescriptionProperty('menu', null);
        }
    }

    private refreshAriaFilterButton(): void {
        if (this.openFilterEnabled && !_isLegacyMenuEnabled(this.gos)) {
            const translate = this.getLocaleTextFunc();
            this.setAriaDescriptionProperty(
                'filterButton',
                translate('ariaFilterColumn', 'Press CTRL ENTER to open filter')
            );
        } else {
            this.setAriaDescriptionProperty('filterButton', null);
        }
    }

    private refreshAriaFiltered(): void {
        const translate = this.getLocaleTextFunc();
        const isFilterActive = this.column.isFilterActive();
        if (isFilterActive) {
            this.setAriaDescriptionProperty('filter', translate('ariaColumnFiltered', 'Column Filtered'));
        } else {
            this.setAriaDescriptionProperty('filter', null);
        }
    }

    public setAriaDescriptionProperty(property: HeaderAriaDescriptionKey, value: string | null): void {
        if (value != null) {
            this.ariaDescriptionProperties.set(property, value);
        } else {
            this.ariaDescriptionProperties.delete(property);
        }
    }

    public announceAriaDescription(): void {
        if (!this.eGui.contains(_getActiveDomElement(this.beans))) {
            return;
        }
        const ariaDescription = Array.from(this.ariaDescriptionProperties.keys())
            // always announce the filter description first
            .sort((a: string, b: string) => (a === 'filter' ? -1 : b.charCodeAt(0) - a.charCodeAt(0)))
            .map((key: HeaderAriaDescriptionKey) => this.ariaDescriptionProperties.get(key))
            .join('. ');

        this.beans.ariaAnnounce?.announceValue(ariaDescription, 'columnHeader');
    }

    private refreshAria(): void {
        this.refreshAriaSort();
        this.refreshAriaMenu();
        this.refreshAriaFilterButton();
        this.refreshAriaFiltered();
    }

    private addColumnHoverListener(compBean: BeanStub): void {
        this.beans.colHover?.addHeaderColumnHoverListener(compBean, this.comp, this.column);
    }

    private addActiveHeaderMouseListeners(compBean: BeanStub): void {
        const listener = (e: MouseEvent) => this.handleMouseOverChange(e.type === 'mouseenter');
        const clickListener = () => {
            this.setActiveHeader(true);
            this.dispatchColumnMouseEvent('columnHeaderClicked', this.column);
        };
        const contextMenuListener = (event: MouseEvent) =>
            this.handleContextMenuMouseEvent(event, undefined, this.column);

        compBean.addManagedListeners(this.eGui, {
            mouseenter: listener,
            mouseleave: listener,
            click: clickListener,
            contextmenu: contextMenuListener,
        });
    }

    private handleMouseOverChange(isMouseOver: boolean): void {
        this.setActiveHeader(isMouseOver);

        this.eventSvc.dispatchEvent({
            type: isMouseOver ? 'columnHeaderMouseOver' : 'columnHeaderMouseLeave',
            column: this.column,
        });
    }

    private setActiveHeader(active: boolean): void {
        this.comp.toggleCss('ag-header-active', active);
    }

    public getAnchorElementForMenu(isFilter?: boolean): HTMLElement {
        const headerComp = this.comp.getUserCompInstance();
        if (isHeaderComp(headerComp)) {
            return headerComp.getAnchorElementForMenu(isFilter);
        }
        return this.eGui;
    }

    public override destroy(): void {
        this.tooltipFeature = this.destroyBean(this.tooltipFeature);
        super.destroy();
    }
}

function isHeaderComp(headerComp: IHeader | undefined): headerComp is HeaderComp {
    // can't use `instanceof` here as it prevents tree shaking of `HeaderComp`
    return (
        typeof (headerComp as HeaderComp)?.getAnchorElementForMenu === 'function' &&
        typeof (headerComp as HeaderComp).onMenuKeyboardShortcut === 'function'
    );
}
