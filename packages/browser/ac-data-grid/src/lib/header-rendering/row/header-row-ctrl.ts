import { setupCompBean } from '../../components/emptyBean';
import { BeanStub } from '../../context/beanStub';
import type { AgColumn } from '../../entities/agColumn';
import type { AgColumnGroup } from '../../entities/agColumnGroup';
import { _isDomLayout } from '../../gridOptionsUtils';
import type { BrandedType } from '../../interfaces/brandedType';
import type { ColumnPinnedType, HeaderColumnId } from '../../interfaces/iColumn';
import type { AbstractHeaderCellCtrl } from '../cells/abstractCell/abstractHeaderCellCtrl';
import { HeaderCellCtrl } from '../cells/column/headerCellCtrl';
import type { HeaderGroupCellCtrl } from '../cells/columnGroup/headerGroupCellCtrl';
import type { HeaderFilterCellCtrl } from '../cells/floatingFilter/headerFilterCellCtrl';
import { getColumnHeaderRowHeight, getFloatingFiltersHeight, getGroupRowsHeight } from '../headerUtils';
import type { HeaderRowType } from './headerRowComp';

export interface IHeaderRowComp {
    setTop(top: string): void;
    setHeight(height: string): void;
    setHeaderCtrls(ctrls: AbstractHeaderCellCtrl[], forceOrder: boolean, afterScroll: boolean): void;
    setWidth(width: string): void;
}

let instanceIdSequence = 0;
export type HeaderRowCtrlInstanceId = BrandedType<number, 'HeaderRowCtrlInstanceId'>;

export class AcDGHeaderRowCtrl extends BeanStub {
    public readonly instanceId: HeaderRowCtrlInstanceId = instanceIdSequence++ as HeaderRowCtrlInstanceId;

    private comp: IHeaderRowComp;
    public headerRowClass: string;

    // Maintain a map and corresponding array of the header cell ctrls for performance
    private ctrlsById: Map<HeaderColumnId, AbstractHeaderCellCtrl> | undefined;
    private allCtrls: AbstractHeaderCellCtrl[] = [];

    private isPrintLayout: boolean;
    private isEnsureDomOrder: boolean;

    constructor(
        public readonly rowIndex: number,
        public readonly pinned: ColumnPinnedType,
        public readonly type: HeaderRowType
    ) {
        super();

        const typeClass =
            type == 'group'
                ? `ag-header-row-column-group`
                : type == 'filter'
                  ? `ag-header-row-column-filter`
                  : `ag-header-row-column`;
        this.headerRowClass = `ag-header-row ${typeClass}`;
    }

    public postConstruct(): void {
        this.isPrintLayout = _isDomLayout(this.gos, 'print');
        this.isEnsureDomOrder = this.gos.get('ensureDomOrder');
    }

    /** Checks that every header cell that is currently visible has been rendered.
     * Can only be false under some circumstances when using React
     */
    public areCellsRendered(): boolean {
        if (!this.comp) {
            return false;
        }
        return this.allCtrls.every((ctrl) => ctrl.eGui != null);
    }

    /**
     *
     * @param comp Proxy to the actual component
     * @param initCompState Should the component be initialised with the current state of the controller. Default: true
     */
    public setComp(comp: IHeaderRowComp, compBean: BeanStub | undefined, initCompState: boolean = true): void {
        this.comp = comp;
        compBean = setupCompBean(this, this.beans.context, compBean);

        if (initCompState) {
            this.onRowHeightChanged();
            this.onVirtualColumnsChanged();
        }
        // width is managed directly regardless of framework and so is not included in initCompState
        this.setWidth();

        this.addEventListeners(compBean);
    }

    public getAriaRowIndex(): number {
        return this.rowIndex + 1;
    }

    private addEventListeners(compBean: BeanStub): void {
        const onHeightChanged = this.onRowHeightChanged.bind(this);
        const onDisplayedColumnsChanged = this.onDisplayedColumnsChanged.bind(this);
        compBean.addManagedEventListeners({
            columnResized: this.setWidth.bind(this),
            displayedColumnsChanged: onDisplayedColumnsChanged,
            virtualColumnsChanged: (params) => this.onVirtualColumnsChanged(params.afterScroll),
            columnGroupHeaderHeightChanged: onHeightChanged,
            columnHeaderHeightChanged: onHeightChanged,
            gridStylesChanged: onHeightChanged,
            advancedFilterEnabledChanged: onHeightChanged,
        });

        // when print layout changes, it changes what columns are in what section
        compBean.addManagedPropertyListener('domLayout', onDisplayedColumnsChanged);
        compBean.addManagedPropertyListener('ensureDomOrder', (e) => (this.isEnsureDomOrder = e.currentValue));

        compBean.addManagedPropertyListeners(
            [
                'headerHeight',
                'pivotHeaderHeight',
                'groupHeaderHeight',
                'pivotGroupHeaderHeight',
                'floatingFiltersHeight',
            ],
            onHeightChanged
        );
    }

    private onDisplayedColumnsChanged(): void {
        this.isPrintLayout = _isDomLayout(this.gos, 'print');
        this.onVirtualColumnsChanged();
        this.setWidth();
        this.onRowHeightChanged();
    }

    private setWidth(): void {
        const width = this.getWidthForRow();
        this.comp.setWidth(`${width}px`);
    }

    private getWidthForRow(): number {
        const { visibleCols } = this.beans;
        if (this.isPrintLayout) {
            const pinned = this.pinned != null;
            if (pinned) {
                return 0;
            }

            return (
                visibleCols.getContainerWidth('right') +
                visibleCols.getContainerWidth('left') +
                visibleCols.getContainerWidth(null)
            );
        }

        // if not printing, just return the width as normal
        return visibleCols.getContainerWidth(this.pinned);
    }

    private onRowHeightChanged(): void {
        const { topOffset, rowHeight } = this.getTopAndHeight();

        this.comp.setTop(topOffset + 'px');
        this.comp.setHeight(rowHeight + 'px');
    }

    public getTopAndHeight() {
        const { filterManager } = this.beans;
        const sizes: number[] = [];

        const groupHeadersHeight = getGroupRowsHeight(this.beans);
        const headerHeight = getColumnHeaderRowHeight(this.beans);

        sizes.push(...groupHeadersHeight);
        sizes.push(headerHeight);

        if (filterManager?.hasFloatingFilters()) {
            sizes.push(getFloatingFiltersHeight(this.beans) as number);
        }

        let topOffset = 0;

        for (let i = 0; i < this.rowIndex; i++) {
            topOffset += sizes[i];
        }

        const rowHeight = sizes[this.rowIndex];

        return { topOffset, rowHeight };
    }

    private onVirtualColumnsChanged(afterScroll: boolean = false): void {
        const ctrlsToDisplay = this.getUpdatedHeaderCtrls();
        const forceOrder = this.isEnsureDomOrder || this.isPrintLayout;
        this.comp.setHeaderCtrls(ctrlsToDisplay, forceOrder, afterScroll);
    }

    /**
     * Recycles the header cell ctrls and creates new ones for the columns in the viewport
     * @returns The updated header cell ctrls
     */
    public getUpdatedHeaderCtrls() {
        const oldCtrls = this.ctrlsById;
        this.ctrlsById = new Map();
        const columns = this.getColumnsInViewport();

        for (const child of columns) {
            this.recycleAndCreateHeaderCtrls(child, this.ctrlsById, oldCtrls);
        }

        // we want to keep columns that are focused, otherwise keyboard navigation breaks
        const isFocusedAndDisplayed = (ctrl: HeaderCellCtrl) => {
            const { focusSvc, visibleCols } = this.beans;

            const isFocused = focusSvc.isHeaderWrapperFocused(ctrl);
            if (!isFocused) {
                return false;
            }
            const isDisplayed = visibleCols.isVisible(ctrl.column);
            return isDisplayed;
        };

        if (oldCtrls) {
            for (const [id, oldCtrl] of oldCtrls) {
                const keepCtrl = isFocusedAndDisplayed(oldCtrl as HeaderCellCtrl);
                if (keepCtrl) {
                    this.ctrlsById.set(id, oldCtrl);
                } else {
                    this.destroyBean(oldCtrl);
                }
            }
        }

        this.allCtrls = Array.from(this.ctrlsById.values());
        return this.allCtrls;
    }

    /** Get the current header cell ctrls */
    public getHeaderCellCtrls(): AbstractHeaderCellCtrl[] {
        return this.allCtrls;
    }

    private recycleAndCreateHeaderCtrls(
        headerColumn: AgColumn | AgColumnGroup,
        currCtrls: Map<HeaderColumnId, AbstractHeaderCellCtrl>,
        oldCtrls?: Map<HeaderColumnId, AbstractHeaderCellCtrl>
    ): void {
        // skip groups that have no displayed children. this can happen when the group is broken,
        // and this section happens to have nothing to display for the open / closed state.
        // (a broken group is one that is split, ie columns in the group have a non-group column
        // in between them)
        if (headerColumn.isEmptyGroup()) {
            return;
        }

        const idOfChild = headerColumn.getUniqueId();

        // if we already have this cell rendered, do nothing
        let headerCtrl: AbstractHeaderCellCtrl | undefined;
        if (oldCtrls) {
            headerCtrl = oldCtrls.get(idOfChild);
            oldCtrls.delete(idOfChild);
        }

        // it's possible there is a new Column with the same ID, but it's for a different Column.
        // this is common with pivoting, where the pivot cols change, but the id's are still pivot_0,
        // pivot_1 etc. so if new col but same ID, need to remove the old col here first as we are
        // about to replace it in the this.headerComps map.
        const forOldColumn = headerCtrl && headerCtrl.column != headerColumn;
        if (forOldColumn) {
            this.destroyBean(headerCtrl);
            headerCtrl = undefined;
        }

        if (headerCtrl == null) {
            switch (this.type) {
                case 'filter': {
                    headerCtrl = this.createBean(
                        this.beans.registry.createDynamicBean<HeaderFilterCellCtrl>(
                            'headerFilterCellCtrl',
                            true,
                            headerColumn as AgColumn,
                            this
                        )!
                    );
                    break;
                }
                case 'group':
                    headerCtrl = this.createBean(
                        this.beans.registry.createDynamicBean<HeaderGroupCellCtrl>(
                            'headerGroupCellCtrl',
                            true,
                            headerColumn as AgColumnGroup,
                            this
                        )!
                    );
                    break;
                default:
                    headerCtrl = this.createBean(new HeaderCellCtrl(headerColumn as AgColumn, this));
                    break;
            }
        }
        currCtrls.set(idOfChild, headerCtrl);
    }

    private getColumnsInViewport(): (AgColumn | AgColumnGroup)[] {
        return this.isPrintLayout ? this.getColumnsInViewportPrintLayout() : this.getColumnsInViewportNormalLayout();
    }

    private getColumnsInViewportPrintLayout(): (AgColumn | AgColumnGroup)[] {
        // for print layout, we add all columns into the center
        if (this.pinned != null) {
            return [];
        }

        let viewportColumns: (AgColumn | AgColumnGroup)[] = [];
        const actualDepth = this.getActualDepth();
        const { colViewport } = this.beans;

        (['left', null, 'right'] as ColumnPinnedType[]).forEach((pinned) => {
            const items = colViewport.getHeadersToRender(pinned, actualDepth);
            viewportColumns = viewportColumns.concat(items);
        });

        return viewportColumns;
    }

    private getActualDepth(): number {
        return this.type == 'filter' ? this.rowIndex - 1 : this.rowIndex;
    }

    private getColumnsInViewportNormalLayout(): (AgColumn | AgColumnGroup)[] {
        // when in normal layout, we add the columns for that container only
        return this.beans.colViewport.getHeadersToRender(this.pinned, this.getActualDepth());
    }

    public focusHeader(column: AgColumn | AgColumnGroup, event?: KeyboardEvent): boolean {
        const ctrl = this.allCtrls.find((ctrl) => ctrl.column == column);

        if (!ctrl) {
            return false;
        }

        const focused = ctrl.focus(event);

        return focused;
    }

    public override destroy(): void {
        this.allCtrls = this.destroyBeans(this.allCtrls);
        this.ctrlsById = undefined;
        super.destroy();
    }
}
