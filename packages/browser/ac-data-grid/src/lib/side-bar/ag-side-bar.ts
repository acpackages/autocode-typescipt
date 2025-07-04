import type {
    ComponentSelector,
    ElementParams,
    ISideBar,
    IToolPanel,
    IToolPanelParams,
    SideBarDef,
    SideBarState,
    ToolPanelDef,
} from 'ag-grid-community';
import {
    Component,
    KeyCode,
    ManagedFocusFeature,
    RefPlaceholder,
    _addFocusableContainerListener,
    _addGridCommonParams,
    _findNextFocusableElement,
    _focusInto,
    _focusNextGridCoreContainer,
    _getActiveDomElement,
    _removeFromParent,
    _setAriaControls,
    _warn,
} from 'ag-grid-community';

import { findFocusableElementBeforeTabGuard, isTargetUnderManagedComponent } from '../misc/enterpriseFocusUtils';
import { agSideBarCSS } from './agSideBar.css-GENERATED';
import type { AgSideBarButtons, SideBarButtonClickedEvent } from './agSideBarButtons';
import { AgSideBarButtonsSelector } from './agSideBarButtons';
import { parseSideBarDef } from './sideBarDefParser';
import type { SideBarService } from './sideBarService';
import { ToolPanelWrapper } from './toolPanelWrapper';

const AgSideBarElement: ElementParams = {
    tag: 'div',
    cls: 'ag-side-bar ag-unselectable',
    children: [
        {
            tag: 'ag-side-bar-buttons',
            ref: 'sideBarButtons',
        },
    ],
};
export class AcDataGridSideBar extends Component implements ISideBar {
    private readonly sideBarButtons: AgSideBarButtons = RefPlaceholder;

    private toolPanelWrappers: ToolPanelWrapper[] = [];
    private sideBar: SideBarDef | undefined;
    private position: 'left' | 'right';

    constructor() {
        super(AgSideBarElement, [AgSideBarButtonsSelector]);
        this.registerCSS(agSideBarCSS);
    }

    public postConstruct(): void {
        this.sideBarButtons.addEventListener('sideBarButtonClicked', this.onToolPanelButtonClicked.bind(this));
        const { beans, gos } = this;
        const { sideBar: sideBarState } = gos.get('initialState') ?? {};
        this.setSideBarDef({
            sideBarDef: parseSideBarDef(gos.get('sideBar')),
            sideBarState,
        });

        this.addManagedPropertyListener('sideBar', () => this.updateSideBar());

        (beans.sideBar as SideBarService).comp = this;
        const eGui = this.getFocusableElement();
        this.createManagedBean(
            new ManagedFocusFeature(eGui, {
                onTabKeyDown: this.onTabKeyDown.bind(this),
                handleKeyDown: this.handleKeyDown.bind(this),
            })
        );

        _addFocusableContainerListener(beans, this, eGui);
    }

    protected onTabKeyDown(e: KeyboardEvent) {
        if (e.defaultPrevented) {
            return;
        }

        const { beans, sideBarButtons } = this;
        const eGui = this.getGui();
        const sideBarGui = sideBarButtons.getGui();
        const activeElement = _getActiveDomElement(beans) as HTMLElement;
        const openPanel = eGui.querySelector('.ag-tool-panel-wrapper:not(.ag-hidden)') as HTMLElement;
        const target = e.target as HTMLElement;
        const backwards = e.shiftKey;

        if (!openPanel) {
            if (_focusNextGridCoreContainer(beans, backwards)) {
                e.preventDefault();
                return true;
            }
            return _focusNextGridCoreContainer(beans, backwards, true);
        }

        if (sideBarGui.contains(activeElement)) {
            if (_focusInto(openPanel, backwards)) {
                e.preventDefault();
            }
            return;
        }

        // only handle backwards focus to target the sideBar buttons
        if (!backwards) {
            return;
        }

        let nextEl: HTMLElement | null = null;

        if (openPanel.contains(activeElement)) {
            nextEl = _findNextFocusableElement(beans, openPanel, undefined, true);
        } else if (isTargetUnderManagedComponent(openPanel, target) && backwards) {
            nextEl = findFocusableElementBeforeTabGuard(openPanel, target);
        }

        if (!nextEl) {
            nextEl = sideBarGui.querySelector('.ag-selected button') as HTMLElement;
        }

        if (nextEl && nextEl !== e.target) {
            e.preventDefault();
            nextEl.focus();
        }
    }

    protected handleKeyDown(e: KeyboardEvent): void {
        const currentButton = _getActiveDomElement(this.beans);

        const sideBarButtons = this.sideBarButtons;
        if (!sideBarButtons.getGui().contains(currentButton)) {
            return;
        }

        const sideBarGui = sideBarButtons.getGui();
        const buttons: HTMLElement[] = Array.prototype.slice.call(sideBarGui.querySelectorAll('.ag-side-button'));

        const currentPos = buttons.findIndex((button) => button.contains(currentButton));
        let nextPos: number | null = null;

        switch (e.key) {
            case KeyCode.LEFT:
            case KeyCode.UP:
                nextPos = Math.max(0, currentPos - 1);
                break;
            case KeyCode.RIGHT:
            case KeyCode.DOWN:
                nextPos = Math.min(currentPos + 1, buttons.length - 1);
                break;
        }

        if (nextPos === null) {
            return;
        }

        const innerButton = buttons[nextPos].querySelector('button');

        if (innerButton) {
            innerButton.focus();
            e.preventDefault();
        }
    }

    private onToolPanelButtonClicked(event: SideBarButtonClickedEvent): void {
        const id = event.toolPanelId;
        const openedItem = this.openedItem();

        // if item was already open, we close it
        if (openedItem === id) {
            this.openToolPanel(undefined, 'sideBarButtonClicked'); // passing undefined closes
        } else {
            this.openToolPanel(id, 'sideBarButtonClicked');
        }
    }

    private clearDownUi(): void {
        this.sideBarButtons.clearButtons();
        this.destroyToolPanelWrappers();
    }

    private setSideBarDef({
        sideBarDef,
        sideBarState,
        existingToolPanelWrappers,
    }: {
        sideBarDef?: SideBarDef;
        sideBarState?: SideBarState;
        existingToolPanelWrappers?: { [id: string]: ToolPanelWrapper };
    }): void {
        // initially hide side bar
        this.setDisplayed(false);

        this.sideBar = sideBarDef;

        if (!!sideBarDef && !!sideBarDef.toolPanels) {
            const toolPanelDefs = sideBarDef.toolPanels as ToolPanelDef[];
            this.createToolPanelsAndSideButtons(toolPanelDefs, sideBarState, existingToolPanelWrappers);
            if (!this.toolPanelWrappers.length) {
                return;
            }

            const shouldDisplaySideBar = sideBarState ? sideBarState.visible : !sideBarDef.hiddenByDefault;
            this.setDisplayed(shouldDisplaySideBar);

            this.setSideBarPosition(sideBarState ? sideBarState.position : sideBarDef.position);

            if (shouldDisplaySideBar) {
                if (sideBarState) {
                    const { openToolPanel } = sideBarState;
                    if (openToolPanel) {
                        this.openToolPanel(openToolPanel, 'sideBarInitializing');
                    }
                } else {
                    this.openToolPanel(sideBarDef.defaultToolPanel, 'sideBarInitializing');
                }
            }
        }
    }

    public getDef() {
        return this.sideBar;
    }

    public setSideBarPosition(position?: 'left' | 'right'): this {
        if (!position) {
            position = 'right';
        }

        this.position = position;

        const isLeft = position === 'left';
        const resizerSide = isLeft ? 'right' : 'left';

        this.toggleCss('ag-side-bar-left', isLeft);
        this.toggleCss('ag-side-bar-right', !isLeft);

        this.toolPanelWrappers.forEach((wrapper) => {
            wrapper.setResizerSizerSide(resizerSide);
        });

        this.dispatchSideBarUpdated();

        return this;
    }

    public override setDisplayed(
        displayed: boolean,
        options?: { skipAriaHidden?: boolean | undefined } | undefined
    ): void {
        super.setDisplayed(displayed, options);
        this.dispatchSideBarUpdated();
    }

    public getState(): SideBarState {
        const toolPanels: { [id: string]: any } = {};
        this.toolPanelWrappers.forEach((wrapper) => {
            toolPanels[wrapper.getToolPanelId()] = wrapper.getToolPanelInstance()?.getState?.();
        });
        return {
            visible: this.isDisplayed(),
            position: this.position,
            openToolPanel: this.openedItem(),
            toolPanels,
        };
    }

    private createToolPanelsAndSideButtons(
        defs: ToolPanelDef[],
        sideBarState?: SideBarState,
        existingToolPanelWrappers?: { [id: string]: ToolPanelWrapper }
    ): void {
        for (const def of defs) {
            this.createToolPanelAndSideButton(
                def,
                sideBarState?.toolPanels?.[def.id],
                existingToolPanelWrappers?.[def.id]
            );
        }
    }

    private validateDef(def: ToolPanelDef): boolean {
        if (def.id == null) {
            _warn(212);
            return false;
        }

        if (def.toolPanel === 'agFiltersToolPanel') {
            if (this.beans.filterManager?.isAdvFilterEnabled()) {
                _warn(213);
                return false;
            }
        }

        return true;
    }

    private createToolPanelAndSideButton(
        def: ToolPanelDef,
        initialState?: any,
        existingToolPanelWrapper?: ToolPanelWrapper
    ): void {
        if (!this.validateDef(def)) {
            return;
        }
        let wrapper: ToolPanelWrapper;
        if (existingToolPanelWrapper) {
            wrapper = existingToolPanelWrapper;
        } else {
            wrapper = this.createBean(new ToolPanelWrapper());

            const created = wrapper.setToolPanelDef(
                def,
                _addGridCommonParams<IToolPanelParams>(this.gos, {
                    initialState,
                    onStateUpdated: () => this.dispatchSideBarUpdated(),
                })
            );
            if (!created) {
                return;
            }
        }
        wrapper.setDisplayed(false);

        const wrapperGui = wrapper.getGui();
        this.appendChild(wrapperGui);

        this.toolPanelWrappers.push(wrapper);

        const button = this.sideBarButtons.addButtonComp(def);

        _setAriaControls(button.eToggleButton, wrapperGui);
    }

    public refresh(): void {
        this.toolPanelWrappers.forEach((wrapper) => wrapper.refresh());
    }

    public openToolPanel(
        key: string | undefined,
        source: 'sideBarButtonClicked' | 'sideBarInitializing' | 'api' = 'api'
    ): void {
        const currentlyOpenedKey = this.openedItem();
        if (currentlyOpenedKey === key) {
            return;
        }

        this.toolPanelWrappers.forEach((wrapper) => {
            const show = key === wrapper.getToolPanelId();
            wrapper.setDisplayed(show);
        });

        const newlyOpenedKey = this.openedItem();
        const openToolPanelChanged = currentlyOpenedKey !== newlyOpenedKey;
        if (openToolPanelChanged) {
            this.sideBarButtons.setActiveButton(key);
            this.raiseToolPanelVisibleEvent(key, currentlyOpenedKey ?? undefined, source);
        }
    }

    public getToolPanelInstance(key: string): IToolPanel | undefined {
        const toolPanelWrapper = this.toolPanelWrappers.filter((toolPanel) => toolPanel.getToolPanelId() === key)[0];

        if (!toolPanelWrapper) {
            _warn(214, { key });
            return;
        }

        return toolPanelWrapper.getToolPanelInstance();
    }

    private raiseToolPanelVisibleEvent(
        key: string | undefined,
        previousKey: string | undefined,
        source: 'sideBarButtonClicked' | 'sideBarInitializing' | 'api'
    ): void {
        const switchingToolPanel = !!key && !!previousKey;
        const eventSvc = this.eventSvc;
        if (previousKey) {
            eventSvc.dispatchEvent({
                type: 'toolPanelVisibleChanged',
                source,
                key: previousKey,
                visible: false,
                switchingToolPanel,
            });
        }
        if (key) {
            eventSvc.dispatchEvent({
                type: 'toolPanelVisibleChanged',
                source,
                key,
                visible: true,
                switchingToolPanel,
            });
        }
    }

    public close(source: 'sideBarButtonClicked' | 'sideBarInitializing' | 'api' = 'api'): void {
        this.openToolPanel(undefined, source);
    }

    public isToolPanelShowing(): boolean {
        return !!this.openedItem();
    }

    public openedItem(): string | null {
        let activeToolPanel: string | null = null;
        this.toolPanelWrappers.forEach((wrapper) => {
            if (wrapper.isDisplayed()) {
                activeToolPanel = wrapper.getToolPanelId();
            }
        });
        return activeToolPanel;
    }

    public setState(state: SideBarState): void {
        this.updateSideBar(state);
    }

    private updateSideBar(sideBarState?: SideBarState): void {
        const sideBarDef = parseSideBarDef(this.gos.get('sideBar'));

        const existingToolPanelWrappers: { [id: string]: ToolPanelWrapper } = {};
        if (sideBarDef && this.sideBar) {
            sideBarDef.toolPanels?.forEach((toolPanelDef: ToolPanelDef) => {
                const { id } = toolPanelDef;
                if (!id) {
                    return;
                }
                const existingToolPanelDef = this.sideBar!.toolPanels?.find(
                    (toolPanelDefToCheck: ToolPanelDef) => toolPanelDefToCheck.id === id
                ) as ToolPanelDef | undefined;
                if (!existingToolPanelDef || toolPanelDef.toolPanel !== existingToolPanelDef.toolPanel) {
                    return;
                }
                const toolPanelWrapper = this.toolPanelWrappers.find((toolPanel) => toolPanel.getToolPanelId() === id);
                if (!toolPanelWrapper) {
                    return;
                }
                const params = _addGridCommonParams<IToolPanelParams>(this.gos, {
                    ...(toolPanelDef.toolPanelParams ?? {}),
                    onStateUpdated: () => this.dispatchSideBarUpdated(),
                });
                const hasRefreshed = toolPanelWrapper.getToolPanelInstance()?.refresh(params);
                if (hasRefreshed !== true) {
                    return;
                }
                this.toolPanelWrappers = this.toolPanelWrappers.filter((toolPanel) => toolPanel !== toolPanelWrapper);
                _removeFromParent(toolPanelWrapper.getGui());
                existingToolPanelWrappers[id] = toolPanelWrapper;
            });
        }

        this.clearDownUi();

        // don't re-assign initial state
        this.setSideBarDef({ sideBarDef, sideBarState, existingToolPanelWrappers });
    }

    private dispatchSideBarUpdated(): void {
        this.eventSvc.dispatchEvent({ type: 'sideBarUpdated' });
    }

    private destroyToolPanelWrappers(): void {
        this.toolPanelWrappers.forEach((wrapper) => {
            _removeFromParent(wrapper.getGui());
            this.destroyBean(wrapper);
        });
        this.toolPanelWrappers.length = 0;
    }

    public override destroy(): void {
        this.destroyToolPanelWrappers();
        super.destroy();
    }
}

export const AgSideBarSelector: ComponentSelector = {
    selector: 'AG-SIDE-BAR',
    component: AgSideBar,
};
