import type { BeanCollection, ChartToolbarMenuItemOptions, IconName } from 'ag-grid-community';
import { Component, RefPlaceholder, _clearElement, _createElement, _createIconNoSpan } from 'ag-grid-community';

import type { ChartTranslationKey, ChartTranslationService } from '../services/chartTranslationService';

interface IAcDGChartToolbarButton {
    buttonName: ChartToolbarMenuItemOptions;
    iconName: IconName;
    callback: (eventSource: HTMLElement) => void;
}

export class AcDGChartToolbar extends Component {
    private chartTranslation: ChartTranslationService;

    public wireBeans(beans: BeanCollection): void {
        this.chartTranslation = beans.chartTranslation as ChartTranslationService;
    }

    private readonly eMenu: HTMLButtonElement = RefPlaceholder;

    private buttonListenersDestroyFuncs: ((() => null) | undefined)[] = [];

    constructor() {
        super(/* html */ `<div class="ag-chart-menu" data-ref="eMenu"></div>`);
    }

    public updateParams(params: { buttons: ChartToolbarButton[] }): void {
        const { buttons } = params;
        this.createButtons(buttons);
    }

    private createButtons(buttons: ChartToolbarButton[]): void {
        this.buttonListenersDestroyFuncs.forEach((func) => func?.());
        this.buttonListenersDestroyFuncs = [];

        const menuEl = this.eMenu;
        _clearElement(menuEl);

        buttons.forEach((buttonConfig) => {
            const { buttonName, iconName, callback } = buttonConfig;
            const buttonEl = this.createButton(iconName);

            const tooltipTitle = this.chartTranslation.translate(
                (buttonName + 'ToolbarTooltip') as ChartTranslationKey
            );
            if (tooltipTitle && buttonEl instanceof HTMLElement) {
                buttonEl.title = tooltipTitle;
            }

            this.buttonListenersDestroyFuncs.push(
                ...this.addManagedElementListeners(buttonEl, {
                    click: (event: MouseEvent) => callback(event.currentTarget as HTMLElement),
                })
            );

            menuEl.appendChild(buttonEl);
        });
    }

    private createButton(iconName: IconName): Element {
        const buttonEl = _createIconNoSpan(iconName, this.beans)!;
        buttonEl.classList.add('ag-chart-menu-icon');

        const wrapperEl = _createElement({
            tag: 'button',
            attrs: { type: 'button' },
            cls: 'ag-chart-menu-toolbar-button',
        });
        wrapperEl.appendChild(buttonEl);
        return wrapperEl;
    }

    public override destroy(): void {
        this.buttonListenersDestroyFuncs = [];
        super.destroy();
    }
}
