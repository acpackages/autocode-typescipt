import type { ElementParams, PositionableOptions, ResizableStructure } from 'ag-grid-community';
import {
    Component,
    PositionableFeature,
    RefPlaceholder,
    _createIconNoSpan,
    _getActiveDomElement,
    _getInnerHeight,
    _getInnerWidth,
    _isVisible,
    _setDisplayed,
} from 'ag-grid-community';

import { agPanelCSS } from './agPanel.css-GENERATED';

export interface IAcDGPanelOptions extends PositionableOptions {
    component?: Component<any>;
    hideTitleBar?: boolean | null;
    closable?: boolean | null;
    resizable?: boolean | ResizableStructure;
    title?: string | null;
    cssIdentifier?: string | null;
}
function getTemplate(config: PanelOptions): ElementParams {
    const cssIdentifier = config.cssIdentifier || 'default';
    return {
        tag: 'div',
        cls: `ag-panel ag-${cssIdentifier}-panel`,
        attrs: { tabindex: '-1' },
        children: [
            {
                tag: 'div',
                ref: 'eTitleBar',
                cls: `ag-panel-title-bar ag-${cssIdentifier}-panel-title-bar ag-unselectable`,
                children: [
                    {
                        tag: 'span',
                        ref: 'eTitle',
                        cls: `ag-panel-title-bar-title ag-${cssIdentifier}-panel-title-bar-title`,
                    },
                    {
                        tag: 'div',
                        ref: 'eTitleBarButtons',
                        cls: `ag-panel-title-bar-buttons ag-${cssIdentifier}-panel-title-bar-buttons`,
                    },
                ],
            },
            {
                tag: 'div',
                ref: 'eContentWrapper',
                cls: `ag-panel-content-wrapper ag-${cssIdentifier}-panel-content-wrapper`,
            },
        ],
    };
}

export class AcDataGridPanel<TConfig extends PanelOptions = PanelOptions> extends Component {
    protected closable = true;

    protected closeButtonComp: Component | undefined;
    protected positionableFeature: PositionableFeature;
    public close: () => void;

    protected readonly eContentWrapper: HTMLElement = RefPlaceholder;
    protected readonly eTitleBar: HTMLElement = RefPlaceholder;
    protected readonly eTitleBarButtons: HTMLElement = RefPlaceholder;
    protected readonly eTitle: HTMLElement = RefPlaceholder;

    constructor(protected readonly config: TConfig) {
        super(getTemplate(config));
        this.registerCSS(agPanelCSS);
    }

    public postConstruct() {
        const {
            component,
            closable,
            hideTitleBar,
            title,
            minWidth = 250,
            width,
            minHeight = 250,
            height,
            centered,
            popup,
            x,
            y,
        } = this.config;

        this.positionableFeature = new PositionableFeature(this.getGui(), {
            minWidth,
            width,
            minHeight,
            height,
            centered,
            x,
            y,
            popup,
            calculateTopBuffer: () => this.positionableFeature.getHeight()! - this.getBodyHeight(),
        });

        this.createManagedBean(this.positionableFeature);

        const eGui = this.getGui();

        if (component) {
            this.setBodyComponent(component);
        }

        if (!hideTitleBar) {
            if (title) {
                this.setTitle(title);
            }
            this.setClosable(closable != null ? closable : this.closable);
        } else {
            _setDisplayed(this.eTitleBar, false);
        }

        this.addManagedElementListeners(this.eTitleBar, {
            mousedown: (e: MouseEvent) => {
                if (
                    eGui.contains(e.relatedTarget as HTMLElement) ||
                    eGui.contains(_getActiveDomElement(this.beans)) ||
                    this.eTitleBarButtons.contains(e.target as HTMLElement)
                ) {
                    e.preventDefault();
                    return;
                }

                const focusEl = this.eContentWrapper.querySelector(
                    'button, [href], input, select, textarea, [tabindex]'
                );

                if (focusEl) {
                    (focusEl as HTMLElement).focus();
                }
            },
        });

        if (popup && this.positionableFeature.isPositioned()) {
            return;
        }

        if (this.renderComponent) {
            this.renderComponent();
        }

        this.positionableFeature.initialisePosition();
        this.eContentWrapper.style.height = '0';
    }

    protected renderComponent() {
        const eGui = this.getGui();
        eGui.focus();

        this.close = () => {
            eGui.parentElement!.removeChild(eGui);
            this.destroy();
        };
    }

    public getHeight(): number | undefined {
        return this.positionableFeature.getHeight();
    }

    public setHeight(height: number | string): void {
        this.positionableFeature.setHeight(height);
    }

    public getWidth(): number | undefined {
        return this.positionableFeature.getWidth();
    }

    public setWidth(width: number | string): void {
        this.positionableFeature.setWidth(width);
    }

    public setClosable(closable: boolean) {
        if (closable !== this.closable) {
            this.closable = closable;
        }

        if (closable) {
            const closeButtonComp = (this.closeButtonComp = new Component({ tag: 'div', cls: 'ag-button' }));
            this.createBean(closeButtonComp);

            const eGui = closeButtonComp.getGui();
            const child = _createIconNoSpan('close', this.beans)!;
            child.classList.add('ag-panel-title-bar-button-icon');
            eGui.appendChild(child);

            this.addTitleBarButton(closeButtonComp);
            closeButtonComp.addManagedElementListeners(eGui, { click: this.onBtClose.bind(this) });
        } else if (this.closeButtonComp) {
            const eGui = this.closeButtonComp.getGui();
            eGui.parentElement!.removeChild(eGui);

            this.closeButtonComp = this.destroyBean(this.closeButtonComp);
        }
    }

    public setBodyComponent(bodyComponent: Component<any>) {
        bodyComponent.setParentComponent(this);
        this.eContentWrapper.appendChild(bodyComponent.getGui());
    }

    public addTitleBarButton(button: Component, position?: number) {
        const eTitleBarButtons = this.eTitleBarButtons;
        const buttons = eTitleBarButtons.children;
        const len = buttons.length;

        if (position == null) {
            position = len;
        }

        position = Math.max(0, Math.min(position, len));

        button.addCss('ag-panel-title-bar-button');

        const eGui = button.getGui();

        if (position === 0) {
            eTitleBarButtons.insertAdjacentElement('afterbegin', eGui);
        } else if (position === len) {
            eTitleBarButtons.insertAdjacentElement('beforeend', eGui);
        } else {
            buttons[position - 1].insertAdjacentElement('afterend', eGui);
        }

        button.setParentComponent(this);
    }

    public getBodyHeight(): number {
        return _getInnerHeight(this.eContentWrapper);
    }

    public getBodyWidth(): number {
        return _getInnerWidth(this.eContentWrapper);
    }

    public setTitle(title: string) {
        // eslint-disable-next-line no-restricted-properties -- Could swap to textContent, but could be a breaking change
        this.eTitle.innerText = title;
    }

    // called when user hits the 'x' in the top right
    private onBtClose() {
        this.close();
    }

    public override destroy(): void {
        if (this.closeButtonComp) {
            this.closeButtonComp = this.destroyBean(this.closeButtonComp);
        }

        const eGui = this.getGui();

        if (eGui && _isVisible(eGui)) {
            this.close();
        }

        super.destroy();
    }
}
