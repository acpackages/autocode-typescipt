import type { IAcDataGridEvent, ComponentSelector, ElementParams, ToolPanelDef } from 'ag-grid-community';
import {
    Component,
    KeyCode,
    _clearElement,
    _focusNextGridCoreContainer,
    _stopPropagationForAgGrid,
} from 'ag-grid-community';

import { SideBarButtonComp } from './sideBarButtonComp';

export interface IAcDGSideBarButtonClickedEvent extends IAcDataGridEvent<'sideBarButtonClicked'> {
    toolPanelId: string;
}

export type AgSideBarButtonsEvent = 'sideBarButtonClicked';

const SideBarElement: ElementParams = { tag: 'div', cls: 'ag-side-buttons', role: 'tablist' };
export class AcDataGridSideBarButtons extends Component<AgSideBarButtonsEvent> {
    private buttonComps: SideBarButtonComp[] = [];

    constructor() {
        super(SideBarElement);
    }

    public postConstruct(): void {
        this.addManagedElementListeners(this.getFocusableElement(), { keydown: this.handleKeyDown.bind(this) });
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if (e.key !== KeyCode.TAB || !e.shiftKey) {
            return;
        }

        if (_focusNextGridCoreContainer(this.beans, true)) {
            e.preventDefault();
            return;
        }

        // Prevent the tab to go in an loop without exit inside the sidebar
        _stopPropagationForAgGrid(e);
    }

    public setActiveButton(id: string | undefined): void {
        this.buttonComps.forEach((comp) => {
            comp.setSelected(id === comp.getToolPanelId());
        });
    }

    public addButtonComp(def: ToolPanelDef): SideBarButtonComp {
        const buttonComp = this.createBean(new SideBarButtonComp(def));
        this.buttonComps.push(buttonComp);
        this.appendChild(buttonComp);

        buttonComp.addEventListener('toggleButtonClicked', () => {
            this.dispatchLocalEvent({
                type: 'sideBarButtonClicked',
                toolPanelId: def.id,
            });
        });

        return buttonComp;
    }

    public clearButtons(): void {
        this.buttonComps = this.destroyBeans(this.buttonComps);
        _clearElement(this.getGui());
        super.destroy();
    }

    public override destroy(): void {
        this.clearButtons();
        super.destroy();
    }
}

export const AgSideBarButtonsSelector: ComponentSelector = {
    selector: 'AG-SIDE-BAR-BUTTONS',
    component: AgSideBarButtons,
};
