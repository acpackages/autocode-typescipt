import type { CtrlsService } from '../ctrlsService';
import type { ElementParams } from '../utils/dom';
import { _isVisible, _setFixedWidth } from '../utils/dom';
import type { ComponentSelector } from '../widgets/component';
import { AbstractFakeScrollComp } from './abstractFakeScrollComp';
import { SetHeightFeature } from './rowContainer/setHeightFeature';

const FakeVScrollElement: ElementParams = {
    tag: 'div',
    cls: 'ag-body-vertical-scroll',
    attrs: { 'aria-hidden': 'true' },
    children: [
        {
            tag: 'div',
            ref: 'eViewport',
            cls: 'ag-body-vertical-scroll-viewport',
            children: [{ tag: 'div', ref: 'eContainer', cls: 'ag-body-vertical-scroll-container' }],
        },
    ],
};
export class AcDGFakeVScrollComp extends AbstractFakeScrollComp {
    constructor() {
        super(FakeVScrollElement, 'vertical');
    }

    public override postConstruct(): void {
        super.postConstruct();

        this.createManagedBean(new SetHeightFeature(this.eContainer));
        const { ctrlsSvc } = this.beans;
        ctrlsSvc.register('fakeVScrollComp', this);

        this.addManagedEventListeners({
            rowContainerHeightChanged: this.onRowContainerHeightChanged.bind(this, ctrlsSvc),
        });
    }

    protected setScrollVisible(): void {
        const { scrollVisibleSvc } = this.beans;
        const vScrollShowing = scrollVisibleSvc.verticalScrollShowing;
        const invisibleScrollbar = this.invisibleScrollbar;

        const scrollbarWidth = vScrollShowing ? scrollVisibleSvc.getScrollbarWidth() || 0 : 0;
        const adjustedScrollbarWidth = scrollbarWidth === 0 && invisibleScrollbar ? 16 : scrollbarWidth;

        this.toggleCss('ag-scrollbar-invisible', invisibleScrollbar);
        _setFixedWidth(this.getGui(), adjustedScrollbarWidth);
        _setFixedWidth(this.eViewport, adjustedScrollbarWidth);
        _setFixedWidth(this.eContainer, adjustedScrollbarWidth);
        this.setDisplayed(vScrollShowing, { skipAriaHidden: true });
    }

    private onRowContainerHeightChanged(ctrlsSvc: CtrlsService): void {
        const gridBodyCtrl = ctrlsSvc.getGridBodyCtrl();
        const gridBodyViewportEl = gridBodyCtrl.eBodyViewport;

        const eViewportScrollTop = this.getScrollPosition();
        const gridBodyViewportScrollTop = gridBodyViewportEl.scrollTop;

        if (eViewportScrollTop != gridBodyViewportScrollTop) {
            this.setScrollPosition(gridBodyViewportScrollTop, true);
        }
    }

    public getScrollPosition(): number {
        return this.eViewport.scrollTop;
    }

    public setScrollPosition(value: number, force?: boolean): void {
        if (!force && !_isVisible(this.eViewport)) {
            this.attemptSettingScrollPosition(value);
        }
        this.eViewport.scrollTop = value;
    }
}

export const FakeVScrollSelector: ComponentSelector = {
    selector: 'AG-FAKE-VERTICAL-SCROLL',
    component: FakeVScrollComp,
};
