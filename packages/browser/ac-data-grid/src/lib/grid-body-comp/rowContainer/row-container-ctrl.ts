import { BeanStub } from '../../context/beanStub';
import type { StickyTopOffsetChangedEvent } from '../../events';
import { _isDomLayout } from '../../gridOptionsUtils';
import type { ColumnPinnedType } from '../../interfaces/iColumn';
import type { RowCtrl } from '../../rendering/row/rowCtrl';
import type { RowRenderer } from '../../rendering/rowRenderer';
import type { SpannedRowRenderer } from '../../rendering/spanning/spannedRowRenderer';
import {
    _getInnerWidth,
    _getScrollLeft,
    _isHorizontalScrollShowing,
    _isInDOM,
    _observeResize,
    _setScrollLeft,
} from '../../utils/dom';
import { CenterWidthFeature } from '../centerWidthFeature';
import type { ScrollPartner } from '../gridBodyScrollFeature';
import { ViewportSizeFeature } from '../viewportSizeFeature';
import { RowContainerEventsFeature } from './rowContainerEventsFeature';
import { SetHeightFeature } from './setHeightFeature';
import type { SetPinnedWidthFeature } from './setPinnedWidthFeature';

export type RowContainerName =
    | 'left'
    | 'right'
    | 'center'
    | 'fullWidth'
    | 'topLeft'
    | 'topRight'
    | 'topCenter'
    | 'topFullWidth'
    | 'stickyTopLeft'
    | 'stickyTopRight'
    | 'stickyTopCenter'
    | 'stickyTopFullWidth'
    | 'stickyBottomLeft'
    | 'stickyBottomRight'
    | 'stickyBottomCenter'
    | 'stickyBottomFullWidth'
    | 'bottomLeft'
    | 'bottomRight'
    | 'bottomCenter'
    | 'bottomFullWidth';

export type RowContainerType = 'left' | 'right' | 'center' | 'fullWidth';

type GetRowCtrls = (renderer: RowRenderer) => RowCtrl[];
type GetSpannedRowCtrls = (renderer: SpannedRowRenderer) => RowCtrl[];
export type RowContainerOptions = {
    type: RowContainerType;
    name: string;
    container?: `ag-${string}`;
    pinnedType?: ColumnPinnedType;
    fullWidth?: boolean;
    getRowCtrls: GetRowCtrls;
    getSpannedRowCtrls?: GetSpannedRowCtrls;
};

const getTopRowCtrls: GetRowCtrls = (r) => r.topRowCtrls;
const getStickyTopRowCtrls: GetRowCtrls = (r) => r.getStickyTopRowCtrls();
const getStickyBottomRowCtrls: GetRowCtrls = (r) => r.getStickyBottomRowCtrls();
const getBottomRowCtrls: GetRowCtrls = (r) => r.bottomRowCtrls;
const getCentreRowCtrls: GetRowCtrls = (r) => r.allRowCtrls;

const getSpannedTopRowCtrls: GetSpannedRowCtrls = (r) => r.getCtrls('top');
const getSpannedCenterRowCtrls: GetSpannedRowCtrls = (r) => r.getCtrls('center');
const getSpannedBottomRowCtrls: GetSpannedRowCtrls = (r) => r.getCtrls('bottom');

const ContainerCssClasses: Record<RowContainerName, RowContainerOptions> = {
    center: {
        type: 'center',
        name: 'center-cols',
        getRowCtrls: getCentreRowCtrls,
        getSpannedRowCtrls: getSpannedCenterRowCtrls,
    },
    left: {
        type: 'left',
        name: 'pinned-left-cols',
        pinnedType: 'left',
        getRowCtrls: getCentreRowCtrls,
        getSpannedRowCtrls: getSpannedCenterRowCtrls,
    },
    right: {
        type: 'right',
        name: 'pinned-right-cols',
        pinnedType: 'right',
        getRowCtrls: getCentreRowCtrls,
        getSpannedRowCtrls: getSpannedCenterRowCtrls,
    },
    fullWidth: {
        type: 'fullWidth',
        name: 'full-width',
        fullWidth: true,
        getRowCtrls: getCentreRowCtrls,
    },

    topCenter: {
        type: 'center',
        name: 'floating-top',
        getRowCtrls: getTopRowCtrls,
        getSpannedRowCtrls: getSpannedTopRowCtrls,
    },
    topLeft: {
        type: 'left',
        name: 'pinned-left-floating',
        container: 'ag-pinned-left-floating-top',
        pinnedType: 'left',
        getRowCtrls: getTopRowCtrls,
        getSpannedRowCtrls: getSpannedTopRowCtrls,
    },
    topRight: {
        type: 'right',
        name: 'pinned-right-floating',
        container: 'ag-pinned-right-floating-top',
        pinnedType: 'right',
        getRowCtrls: getTopRowCtrls,
        getSpannedRowCtrls: getSpannedTopRowCtrls,
    },
    topFullWidth: {
        type: 'fullWidth',
        name: 'floating-top-full-width',
        fullWidth: true,
        getRowCtrls: getTopRowCtrls,
    },

    stickyTopCenter: {
        type: 'center',
        name: 'sticky-top',
        getRowCtrls: getStickyTopRowCtrls,
    },
    stickyTopLeft: {
        type: 'left',
        name: 'pinned-left-sticky-top',
        container: 'ag-pinned-left-sticky-top',
        pinnedType: 'left',
        getRowCtrls: getStickyTopRowCtrls,
    },
    stickyTopRight: {
        type: 'right',
        name: 'pinned-right-sticky-top',
        container: 'ag-pinned-right-sticky-top',
        pinnedType: 'right',
        getRowCtrls: getStickyTopRowCtrls,
    },
    stickyTopFullWidth: {
        type: 'fullWidth',
        name: 'sticky-top-full-width',
        fullWidth: true,
        getRowCtrls: getStickyTopRowCtrls,
    },

    stickyBottomCenter: {
        type: 'center',
        name: 'sticky-bottom',
        getRowCtrls: getStickyBottomRowCtrls,
    },
    stickyBottomLeft: {
        type: 'left',
        name: 'pinned-left-sticky-bottom',
        container: 'ag-pinned-left-sticky-bottom',
        pinnedType: 'left',
        getRowCtrls: getStickyBottomRowCtrls,
    },
    stickyBottomRight: {
        type: 'right',
        name: 'pinned-right-sticky-bottom',
        container: 'ag-pinned-right-sticky-bottom',
        pinnedType: 'right',
        getRowCtrls: getStickyBottomRowCtrls,
    },
    stickyBottomFullWidth: {
        type: 'fullWidth',
        name: 'sticky-bottom-full-width',
        fullWidth: true,
        getRowCtrls: getStickyBottomRowCtrls,
    },

    bottomCenter: {
        type: 'center',
        name: 'floating-bottom',
        getRowCtrls: getBottomRowCtrls,
        getSpannedRowCtrls: getSpannedBottomRowCtrls,
    },
    bottomLeft: {
        type: 'left',
        name: 'pinned-left-floating-bottom',
        container: 'ag-pinned-left-floating-bottom',
        pinnedType: 'left',
        getRowCtrls: getBottomRowCtrls,
        getSpannedRowCtrls: getSpannedBottomRowCtrls,
    },
    bottomRight: {
        type: 'right',
        name: 'pinned-right-floating-bottom',
        container: 'ag-pinned-right-floating-bottom',
        pinnedType: 'right',
        getRowCtrls: getBottomRowCtrls,
        getSpannedRowCtrls: getSpannedBottomRowCtrls,
    },
    bottomFullWidth: {
        type: 'fullWidth',
        name: 'floating-bottom-full-width',
        fullWidth: true,
        getRowCtrls: getBottomRowCtrls,
    },
};
export function _getRowViewportClass(name: RowContainerName): `ag-${string}-viewport` {
    const options = _getRowContainerOptions(name);
    return `ag-${options.name}-viewport`;
}
export function _getRowContainerClass(name: RowContainerName): `ag-${string}` {
    const options = _getRowContainerOptions(name);
    return options.container ?? `ag-${options.name}-container`;
}
export function _getRowSpanContainerClass(name: RowContainerName): `ag-${string}-spanned-cells-container` {
    const options = _getRowContainerOptions(name);
    return `ag-${options.name}-spanned-cells-container`;
}
export function _getRowContainerOptions(name: RowContainerName): RowContainerOptions {
    return ContainerCssClasses[name];
}

const allTopNoFW: RowContainerName[] = ['topCenter', 'topLeft', 'topRight'];
const allBottomNoFW: RowContainerName[] = ['bottomCenter', 'bottomLeft', 'bottomRight'];
const allMiddleNoFW: RowContainerName[] = ['center', 'left', 'right'];

const allMiddle: RowContainerName[] = ['center', 'left', 'right', 'fullWidth'];
const allCenter: RowContainerName[] = ['stickyTopCenter', 'stickyBottomCenter', 'center', 'topCenter', 'bottomCenter'];
const allLeft: RowContainerName[] = ['left', 'bottomLeft', 'topLeft', 'stickyTopLeft', 'stickyBottomLeft'];
const allRight: RowContainerName[] = ['right', 'bottomRight', 'topRight', 'stickyTopRight', 'stickyBottomRight'];

// sticky section must show rows in set order
const allStickyTopNoFW: RowContainerName[] = ['stickyTopCenter', 'stickyTopLeft', 'stickyTopRight'];
const allStickyBottomNoFW: RowContainerName[] = ['stickyBottomCenter', 'stickyBottomLeft', 'stickyBottomRight'];
const allStickyContainers: RowContainerName[] = [
    ...allStickyTopNoFW,
    'stickyTopFullWidth',
    ...allStickyBottomNoFW,
    'stickyBottomFullWidth',
];
const allNoFW: RowContainerName[] = [
    ...allTopNoFW,
    ...allBottomNoFW,
    ...allMiddleNoFW,
    ...allStickyTopNoFW,
    ...allStickyBottomNoFW,
];

export interface IRowContainerComp {
    setViewportHeight(height: string): void;
    setHorizontalScroll(offset: number): void;
    setRowCtrls(params: { rowCtrls: RowCtrl[]; useFlushSync?: boolean }): void;
    setSpannedRowCtrls(rowCtrls: RowCtrl[], useFlushSync: boolean): void;
    setDomOrder(domOrder: boolean): void;
    setContainerWidth(width: string): void;
    setOffsetTop(offset: string): void;
}

export class AcDGRowContainerCtrl extends BeanStub implements ScrollPartner {
    private readonly options: RowContainerOptions;

    private comp: IRowContainerComp;
    public eContainer: HTMLElement;
    private eSpannedContainer: HTMLElement | undefined;
    public eViewport: HTMLElement;
    private enableRtl: boolean;

    public viewportSizeFeature: ViewportSizeFeature | undefined; // only center has this
    private pinnedWidthFeature: SetPinnedWidthFeature | undefined;
    private visible: boolean = true;
    // Maintaining a constant reference enables optimization in React.
    private EMPTY_CTRLS = [];

    constructor(private readonly name: RowContainerName) {
        super();
        this.options = _getRowContainerOptions(name);
    }

    public postConstruct(): void {
        this.enableRtl = this.gos.get('enableRtl');

        this.forContainers(['center'], () => {
            this.viewportSizeFeature = this.createManagedBean(new ViewportSizeFeature(this));
            this.addManagedEventListeners({
                stickyTopOffsetChanged: this.onStickyTopOffsetChanged.bind(this),
            });
        });
    }

    private onStickyTopOffsetChanged(event: StickyTopOffsetChangedEvent): void {
        this.comp.setOffsetTop(`${event.offset}px`);
    }

    private registerWithCtrlsService(): void {
        // we don't register full width containers
        if (this.options.fullWidth) return;
        this.beans.ctrlsSvc.register(this.name as any, this);
    }

    private forContainers(names: RowContainerName[], callback: () => void): void {
        if (names.indexOf(this.name) >= 0) {
            callback();
        }
    }

    public setComp(
        view: IRowContainerComp,
        eContainer: HTMLElement,
        eSpannedContainer: HTMLElement | undefined,
        eViewport: HTMLElement
    ): void {
        this.comp = view;
        this.eContainer = eContainer;
        this.eSpannedContainer = eSpannedContainer;
        this.eViewport = eViewport;

        this.createManagedBean(new RowContainerEventsFeature(this.eViewport ?? this.eContainer));
        this.addPreventScrollWhileDragging();
        this.listenOnDomOrder();

        const { pinnedCols, rangeSvc } = this.beans;

        const pinnedWidthChanged = () => this.onPinnedWidthChanged();
        this.forContainers(allLeft, () => {
            this.pinnedWidthFeature = this.createOptionalManagedBean(
                pinnedCols?.createPinnedWidthFeature(true, this.eContainer, this.eSpannedContainer)
            );
            this.addManagedEventListeners({ leftPinnedWidthChanged: pinnedWidthChanged });
        });
        this.forContainers(allRight, () => {
            this.pinnedWidthFeature = this.createOptionalManagedBean(
                pinnedCols?.createPinnedWidthFeature(false, this.eContainer, this.eSpannedContainer)
            );
            this.addManagedEventListeners({ rightPinnedWidthChanged: pinnedWidthChanged });
        });
        this.forContainers(allMiddle, () =>
            this.createManagedBean(
                new SetHeightFeature(this.eContainer, this.name === 'center' ? eViewport : undefined)
            )
        );
        if (rangeSvc) {
            this.forContainers(allNoFW, () =>
                this.createManagedBean(rangeSvc.createDragListenerFeature(this.eContainer))
            );
        }

        this.forContainers(allCenter, () =>
            this.createManagedBean(new CenterWidthFeature((width) => this.comp.setContainerWidth(`${width}px`)))
        );

        // Set the initial visibility of the container to avoid extra rendering
        this.visible = this.isContainerVisible();
        this.addListeners();
        this.registerWithCtrlsService();
    }

    public onScrollCallback(fn: () => void): void {
        this.addManagedElementListeners(this.eViewport, { scroll: fn });
    }

    private addListeners(): void {
        const { spannedRowRenderer, gos } = this.beans;
        const onDisplayedColumnsChanged = this.onDisplayedColumnsChanged.bind(this);
        this.addManagedEventListeners({
            displayedColumnsChanged: onDisplayedColumnsChanged,
            displayedColumnsWidthChanged: onDisplayedColumnsChanged,
            displayedRowsChanged: (params) => this.onDisplayedRowsChanged(params.afterScroll),
        });

        onDisplayedColumnsChanged();
        this.onDisplayedRowsChanged();

        if (spannedRowRenderer && this.options.getSpannedRowCtrls && gos.get('enableCellSpan')) {
            this.addManagedListeners(spannedRowRenderer, {
                spannedRowsUpdated: () => {
                    const spannedCtrls = this.options.getSpannedRowCtrls!(spannedRowRenderer!);
                    if (!spannedCtrls) {
                        return;
                    }

                    this.comp.setSpannedRowCtrls(spannedCtrls, false);
                },
            });
        }
    }

    private listenOnDomOrder(): void {
        const isStickContainer = allStickyContainers.indexOf(this.name) >= 0;
        if (isStickContainer) {
            this.comp.setDomOrder(true);
            return;
        }

        const listener = () => {
            const isEnsureDomOrder = this.gos.get('ensureDomOrder');
            const isPrintLayout = _isDomLayout(this.gos, 'print');
            this.comp.setDomOrder(isEnsureDomOrder || isPrintLayout);
        };

        this.addManagedPropertyListener('domLayout', listener);
        listener();
    }

    public onDisplayedColumnsChanged(): void {
        this.forContainers(['center'], () => this.onHorizontalViewportChanged());
    }

    // this methods prevents the grid views from being scrolled while the dragService is being used
    // eg. the view should not scroll up and down while dragging rows using the rowDragComp.
    private addPreventScrollWhileDragging(): void {
        const { dragSvc } = this.beans;
        if (!dragSvc) {
            return;
        }
        const preventScroll = (e: TouchEvent) => {
            if (dragSvc!.dragging) {
                if (e.cancelable) {
                    e.preventDefault();
                }
            }
        };

        this.eContainer.addEventListener('touchmove', preventScroll, { passive: false });
        this.addDestroyFunc(() => this.eContainer.removeEventListener('touchmove', preventScroll));
    }

    // this gets called whenever a change in the viewport, so we can inform column controller it has to work
    // out the virtual columns again. gets called from following locations:
    // + ensureColVisible, scroll, init, layoutChanged, displayedColumnsChanged
    public onHorizontalViewportChanged(afterScroll: boolean = false): void {
        const scrollWidth = this.getCenterWidth();
        const scrollPosition = this.getCenterViewportScrollLeft();

        this.beans.colViewport.setScrollPosition(scrollWidth, scrollPosition, afterScroll);
    }

    public hasHorizontalScrollGap(): boolean {
        return this.eContainer.clientWidth - this.eViewport.clientWidth < 0;
    }

    public hasVerticalScrollGap(): boolean {
        return this.eContainer.clientHeight - this.eViewport.clientHeight < 0;
    }

    public getCenterWidth(): number {
        return _getInnerWidth(this.eViewport);
    }

    public getCenterViewportScrollLeft(): number {
        // we defer to a util, as how you calculated scrollLeft when doing RTL depends on the browser
        return _getScrollLeft(this.eViewport, this.enableRtl);
    }

    public registerViewportResizeListener(listener: () => void) {
        const unsubscribeFromResize = _observeResize(this.beans, this.eViewport, listener);
        this.addDestroyFunc(() => unsubscribeFromResize());
    }

    public isViewportInTheDOMTree(): boolean {
        return _isInDOM(this.eViewport);
    }

    public getViewportScrollLeft(): number {
        return _getScrollLeft(this.eViewport, this.enableRtl);
    }

    public isHorizontalScrollShowing(): boolean {
        const isAlwaysShowHorizontalScroll = this.gos.get('alwaysShowHorizontalScroll');
        return isAlwaysShowHorizontalScroll || _isHorizontalScrollShowing(this.eViewport);
    }

    public setHorizontalScroll(offset: number): void {
        this.comp.setHorizontalScroll(offset);
    }

    public getHScrollPosition(): { left: number; right: number } {
        const res = {
            left: this.eViewport.scrollLeft,
            right: this.eViewport.scrollLeft + this.eViewport.offsetWidth,
        };
        return res;
    }

    public setCenterViewportScrollLeft(value: number): void {
        // we defer to a util, as how you calculated scrollLeft when doing RTL depends on the browser
        _setScrollLeft(this.eViewport, value, this.enableRtl);
    }

    private isContainerVisible(): boolean {
        const pinned = this.options.pinnedType != null;
        return !pinned || (!!this.pinnedWidthFeature && this.pinnedWidthFeature.getWidth() > 0);
    }

    private onPinnedWidthChanged(): void {
        const visible = this.isContainerVisible();
        if (this.visible != visible) {
            this.visible = visible;
            this.onDisplayedRowsChanged();
        }
    }

    private onDisplayedRowsChanged(afterScroll: boolean = false): void {
        const rows = this.options.getRowCtrls(this.beans.rowRenderer);
        if (!this.visible || rows.length === 0) {
            this.comp.setRowCtrls({ rowCtrls: this.EMPTY_CTRLS });
            return;
        }

        const printLayout = _isDomLayout(this.gos, 'print');
        const embedFullWidthRows = this.gos.get('embedFullWidthRows');
        const embedFW = embedFullWidthRows || printLayout;

        // this list contains either all pinned top, center or pinned bottom rows
        // this filters out rows not for this container, eg if it's a full with row, but we are not full with container
        const rowsThisContainer = rows.filter((rowCtrl) => {
            // this just justifies if the ctrl is in the correct place, this will be fed with zombie rows by the
            // row renderer, so should not block them as they still need to animate -  the row renderer
            // will clean these up when they finish animating
            const fullWidthRow = rowCtrl.isFullWidth();

            const match = this.options.fullWidth ? !embedFW && fullWidthRow : embedFW || !fullWidthRow;

            return match;
        });

        this.comp.setRowCtrls({ rowCtrls: rowsThisContainer, useFlushSync: afterScroll });
    }
}
