import type {
    IAcDataGridEvent,
    BeanCollection,
    Component,
    ComponentType,
    ElementParams,
    IComponent,
    IMenuActionParams,
    IMenuConfigParams,
    IMenuItemComp,
    IMenuItemParams,
    ITooltipCtrl,
    MenuItemDef,
    PopupService,
    Registry,
    TooltipFeature,
    UserCompDetails,
    UserComponentFactory,
    WithoutGridCommon,
} from 'ag-grid-community';
import {
    AgPromise,
    BeanStub,
    KeyCode,
    _addGridCommonParams,
    _createElement,
    _preserveRangesWhile,
    _setAriaDisabled,
    _setAriaExpanded,
    _setAriaHasPopup,
    _setAriaRole,
} from 'ag-grid-community';

import { AgMenuList } from './agMenuList';
import { AgMenuPanel } from './agMenuPanel';

export interface IAcDGCloseMenuEvent extends IAcDataGridEvent<'closeMenu'> {
    mouseEvent?: MouseEvent;
    keyboardEvent?: KeyboardEvent;
}

export interface IAcDGMenuItemActivatedEvent extends IAcDataGridEvent<'menuItemActivated'> {
    menuItem: AgMenuItemComponent;
}

interface IAcDataGridMenuItemComponentParams {
    menuItemDef: MenuItemDef;
    isAnotherSubMenuOpen: () => boolean;
    level: number;
    childComponent?: IComponent<any>;
    contextParams: WithoutGridCommon<IMenuActionParams>;
}

export type AgMenuItemComponentEvent = 'closeMenu' | 'menuItemActivated';

function getMenuItemCompDetails(
    userCompFactory: UserComponentFactory,
    def: MenuItemDef,
    params: IMenuItemParams
): UserCompDetails<IMenuItemComp> | undefined {
    return userCompFactory.getCompDetails(def, MenuItemComponent, 'agMenuItem', params, true);
}

const MenuItemComponent: ComponentType<IMenuItemComp> = {
    name: 'menuItem',
    optionalMethods: ['setActive', 'select', 'setExpanded', 'configureDefaults'],
};
const MenuItemElement: ElementParams = { tag: 'div', cls: 'ag-menu', role: 'presentation' };

export class AcDataGridMenuItemComponent extends BeanStub<AgMenuItemComponentEvent> {
    private popupSvc?: PopupService;
    private userCompFactory: UserComponentFactory;
    private registry: Registry;

    public wireBeans(beans: BeanCollection) {
        this.popupSvc = beans.popupSvc;
        this.userCompFactory = beans.userCompFactory;
        this.registry = beans.registry;
    }

    private ACTIVATION_DELAY = 80;

    private eGui?: HTMLElement;
    private params: MenuItemDef;
    private isAnotherSubMenuOpen: () => boolean;
    private level: number;
    private childComponent?: IComponent<any>;
    private contextParams: WithoutGridCommon<IMenuActionParams>;
    private menuItemComp: IMenuItemComp;
    private isActive = false;
    private hideSubMenu: (() => void) | null;
    private subMenuIsOpen = false;
    private subMenuIsOpening = false;
    private activateTimeoutId: number;
    private deactivateTimeoutId: number;
    private parentComponent?: Component<any>;
    private tooltip?: string;
    private tooltipFeature?: TooltipFeature;
    private suppressRootStyles: boolean = true;
    private suppressAria: boolean = true;
    private suppressFocus: boolean = true;
    private cssClassPrefix: string;
    private eSubMenuGui?: HTMLElement;

    public init(params: AgMenuItemComponentParams): AgPromise<void> {
        const { menuItemDef, isAnotherSubMenuOpen, level, childComponent, contextParams } = params;
        this.params = params.menuItemDef;
        this.level = level;
        this.isAnotherSubMenuOpen = isAnotherSubMenuOpen;
        this.childComponent = childComponent;
        this.contextParams = contextParams;
        this.cssClassPrefix = this.params.menuItemParams?.cssClassPrefix ?? 'ag-menu-option';
        const compDetails = getMenuItemCompDetails(
            this.userCompFactory,
            this.params,
            _addGridCommonParams(this.gos, {
                ...menuItemDef,
                level,
                isAnotherSubMenuOpen,
                openSubMenu: (activateFirstItem) => this.openSubMenu(activateFirstItem),
                closeSubMenu: () => this.closeSubMenu(),
                closeMenu: (event) => this.closeMenu(event),
                updateTooltip: (tooltip, shouldDisplayTooltip) => this.refreshTooltip(tooltip, shouldDisplayTooltip),
                onItemActivated: () => this.onItemActivated(),
            })
        );
        return (
            compDetails?.newAgStackInstance().then((comp: IMenuItemComp) => {
                this.menuItemComp = comp;
                const configureDefaults = comp.configureDefaults?.();
                if (configureDefaults) {
                    this.configureDefaults(configureDefaults === true ? undefined : configureDefaults);
                }
            }) ?? AgPromise.resolve()
        );
    }

    private addListeners(eGui: HTMLElement, params?: IMenuConfigParams): void {
        if (!params?.suppressClick) {
            this.addManagedElementListeners(eGui, { click: (e) => this.onItemSelected(e!) });
        }
        if (!params?.suppressKeyboardSelect) {
            this.addManagedElementListeners(eGui, {
                keydown: (e: KeyboardEvent) => {
                    if (e.key === KeyCode.ENTER || e.key === KeyCode.SPACE) {
                        e.preventDefault();
                        this.onItemSelected(e);
                    }
                },
            });
        }
        if (!params?.suppressMouseDown) {
            this.addManagedElementListeners(eGui, {
                mousedown: (e: MouseEvent) => {
                    // Prevent event bubbling to other event handlers such as PopupService triggering
                    // premature closing of any open sub-menu popup.
                    e.stopPropagation();
                    e.preventDefault();
                },
            });
        }
        if (!params?.suppressMouseOver) {
            this.addManagedElementListeners(eGui, {
                mouseenter: () => this.onMouseEnter(),
                mouseleave: () => this.onMouseLeave(),
            });
        }
    }

    public isDisabled(): boolean {
        return !!this.params.disabled;
    }

    public openSubMenu(activateFirstItem = false, event?: MouseEvent | KeyboardEvent): void {
        this.closeSubMenu();

        if (!this.params.subMenu) {
            return;
        }

        this.subMenuIsOpening = true;

        const ePopup = _createElement(MenuItemElement);
        this.eSubMenuGui = ePopup;
        let destroySubMenu: () => void;
        let afterGuiAttached = () => {
            this.subMenuIsOpening = false;
        };

        if (this.childComponent) {
            const menuPanel = this.createBean(new AgMenuPanel(this.childComponent));
            menuPanel.setParentComponent(this as any);

            const subMenuGui = menuPanel.getGui();
            const mouseEvent = 'mouseenter';
            const mouseEnterListener = () => this.cancelDeactivate();

            subMenuGui.addEventListener(mouseEvent, mouseEnterListener);

            destroySubMenu = () => {
                subMenuGui.removeEventListener(mouseEvent, mouseEnterListener);
                this.destroyBean(menuPanel);
            };

            ePopup.appendChild(subMenuGui);

            if ((this.childComponent as any).afterGuiAttached) {
                afterGuiAttached = () => {
                    (this.childComponent as any).afterGuiAttached!();
                    this.subMenuIsOpening = false;
                };
            }
        } else if (this.params.subMenu) {
            const childMenu = this.createBean(new AgMenuList(this.level + 1, this.contextParams));

            childMenu.setParentComponent(this as any);
            childMenu.addMenuItems(this.params.subMenu);
            ePopup.appendChild(childMenu.getGui());

            // bubble menu item selected events
            this.addManagedListeners(childMenu, { closeMenu: (e) => this.dispatchLocalEvent(e) });
            childMenu.addGuiEventListener('mouseenter', () => this.cancelDeactivate());

            destroySubMenu = () => this.destroyBean(childMenu);

            if (activateFirstItem) {
                afterGuiAttached = () => {
                    childMenu.activateFirstItem();
                    this.subMenuIsOpening = false;
                };
            }
        }

        const { popupSvc } = this;
        const positionCallback = () => {
            const eventSource = this.eGui!;
            const { column, node } = this.contextParams;
            popupSvc?.positionPopupForMenu({
                eventSource,
                ePopup,
                event: event instanceof MouseEvent ? event : undefined,
                column,
                node,
            });
        };

        const translate = this.getLocaleTextFunc();

        const addPopupRes = popupSvc?.addPopup({
            modal: true,
            eChild: ePopup,
            positionCallback,
            anchorToElement: this.eGui,
            ariaLabel: translate('ariaLabelSubMenu', 'SubMenu'),
            afterGuiAttached,
        });

        this.subMenuIsOpen = true;
        this.setAriaExpanded(true);

        this.hideSubMenu = () => {
            if (addPopupRes) {
                addPopupRes.hideFunc();
            }
            this.subMenuIsOpen = false;
            this.setAriaExpanded(false);
            destroySubMenu();
            this.menuItemComp.setExpanded?.(false);
            this.eSubMenuGui = undefined;
        };

        this.menuItemComp.setExpanded?.(true);
    }

    private setAriaExpanded(expanded: boolean): void {
        if (!this.suppressAria) {
            _setAriaExpanded(this.eGui!, expanded);
        }
    }

    public closeSubMenu(): void {
        if (!this.hideSubMenu) {
            return;
        }

        this.hideSubMenu();
        this.hideSubMenu = null;
        this.setAriaExpanded(false);
    }

    public isSubMenuOpen(): boolean {
        return this.subMenuIsOpen;
    }

    public isSubMenuOpening(): boolean {
        return this.subMenuIsOpening;
    }

    public activate(openSubMenu?: boolean, fromKeyNav?: boolean): void {
        this.cancelActivate();

        if (this.params.disabled && !fromKeyNav) {
            return;
        }

        this.isActive = true;
        if (!this.suppressRootStyles) {
            this.eGui!.classList.add(`${this.cssClassPrefix}-active`);
        }
        this.menuItemComp.setActive?.(true);
        if (!this.suppressFocus) {
            _preserveRangesWhile(this.beans, () => this.eGui!.focus({ preventScroll: !fromKeyNav }));
        }

        if (openSubMenu && this.params.subMenu) {
            window.setTimeout(() => {
                if (this.isAlive() && this.isActive) {
                    this.openSubMenu();
                }
            }, 300);
        }

        this.onItemActivated();
    }

    public deactivate() {
        this.cancelDeactivate();
        if (!this.suppressRootStyles) {
            this.eGui!.classList.remove(`${this.cssClassPrefix}-active`);
        }
        this.menuItemComp.setActive?.(false);
        this.isActive = false;

        if (this.subMenuIsOpen) {
            this.closeSubMenu();
        }
    }

    public getGui(): HTMLElement {
        return this.menuItemComp.getGui();
    }

    public getParentComponent(): Component | undefined {
        return this.parentComponent;
    }

    public setParentComponent(component: Component<any>): void {
        this.parentComponent = component;
    }

    public getSubMenuGui(): HTMLElement | undefined {
        return this.eSubMenuGui;
    }

    private onItemSelected(event: MouseEvent | KeyboardEvent): void {
        this.menuItemComp.select?.();
        if (this.params.action) {
            this.beans.frameworkOverrides.wrapOutgoing(() =>
                this.params.action!(
                    _addGridCommonParams(this.gos, {
                        ...this.contextParams,
                    })
                )
            );
        } else {
            this.openSubMenu(event && event.type === 'keydown', event);
        }

        if ((this.params.subMenu && !this.params.action) || this.params.suppressCloseOnSelect) {
            return;
        }

        this.closeMenu(event);
    }

    private closeMenu(event?: MouseEvent | KeyboardEvent): void {
        const e: CloseMenuEvent = {
            type: 'closeMenu',
        };

        if (event) {
            if (event instanceof MouseEvent) {
                e.mouseEvent = event;
            } else {
                e.keyboardEvent = event;
            }
        }

        this.dispatchLocalEvent(e);
    }

    private onItemActivated(): void {
        const event: MenuItemActivatedEvent = {
            type: 'menuItemActivated',
            menuItem: this,
        };

        this.dispatchLocalEvent(event);
    }

    private cancelActivate(): void {
        if (this.activateTimeoutId) {
            window.clearTimeout(this.activateTimeoutId);
            this.activateTimeoutId = 0;
        }
    }

    private cancelDeactivate(): void {
        if (this.deactivateTimeoutId) {
            window.clearTimeout(this.deactivateTimeoutId);
            this.deactivateTimeoutId = 0;
        }
    }

    private onMouseEnter(): void {
        this.cancelDeactivate();

        if (this.isAnotherSubMenuOpen()) {
            // wait to see if the user enters the open sub-menu
            this.activateTimeoutId = window.setTimeout(() => this.activate(true), this.ACTIVATION_DELAY);
        } else {
            // activate immediately
            this.activate(true);
        }
    }

    private onMouseLeave(): void {
        this.cancelActivate();

        if (this.isSubMenuOpen()) {
            // wait to see if the user enters the sub-menu
            this.deactivateTimeoutId = window.setTimeout(() => this.deactivate(), this.ACTIVATION_DELAY);
        } else {
            // de-activate immediately
            this.deactivate();
        }
    }

    private configureDefaults(params?: IMenuConfigParams): void {
        if (!this.menuItemComp) {
            // need to wait for init to complete
            setTimeout(() => this.configureDefaults(params));
            return;
        }

        let eGui = this.menuItemComp.getGui();
        const { suppressRootStyles, suppressTooltip, suppressAria, suppressTabIndex, suppressFocus } = params || {};

        // in some frameworks, `getGui` might be a framework element
        const rootElement = (this.menuItemComp as any).getRootElement?.() as HTMLElement | undefined;
        if (rootElement) {
            if (!suppressRootStyles) {
                eGui.classList.add('ag-menu-option-custom');
            }
            eGui = rootElement;
        }

        this.eGui = eGui;

        this.suppressRootStyles = !!suppressRootStyles;
        if (!this.suppressRootStyles) {
            eGui.classList.add(this.cssClassPrefix);
            this.params.cssClasses?.forEach((it) => eGui.classList.add(it));
            if (this.params.disabled) {
                eGui.classList.add(`${this.cssClassPrefix}-disabled`);
            }
        }

        if (!suppressTooltip) {
            this.refreshTooltip(this.params.tooltip);
        }

        this.suppressAria = !!suppressAria;

        if (!this.suppressAria) {
            _setAriaRole(eGui, 'menuitem');
            if (this.params.subMenu) {
                _setAriaHasPopup(eGui, this.params.subMenuRole ?? 'menu');
            }
            if (this.params.disabled) {
                _setAriaDisabled(eGui, true);
            }
        }

        if (!suppressTabIndex) {
            eGui.setAttribute('tabindex', '-1');
        }

        if (!this.params.disabled) {
            this.addListeners(eGui, params);
        }

        this.suppressFocus = !!suppressFocus;
    }

    private refreshTooltip(tooltip?: string, shouldDisplayTooltip?: () => boolean): void {
        this.tooltip = tooltip;

        this.tooltipFeature = this.destroyBean(this.tooltipFeature);

        if (!tooltip || !this.menuItemComp) {
            return;
        }

        const tooltipFeature = this.registry.createDynamicBean<TooltipFeature>('tooltipFeature', false, {
            getGui: () => this.getGui(),
            getTooltipValue: () => this.tooltip,
            getLocation: () => 'menu',
            shouldDisplayTooltip,
        } as ITooltipCtrl);

        if (tooltipFeature) {
            this.tooltipFeature = this.createBean(tooltipFeature);
        }
    }

    public override destroy(): void {
        this.tooltipFeature = this.destroyBean(this.tooltipFeature);
        this.menuItemComp?.destroy?.();
        super.destroy();
    }
}
