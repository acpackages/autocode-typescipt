import type {
    DragAndDropIcon,
    DragItem,
    DragSourceType,
    DraggingEvent,
    DropTarget,
    ElementParams,
} from 'ag-grid-community';
import {
    Component,
    KeyCode,
    ManagedFocusFeature,
    PositionableFeature,
    _areEqual,
    _clearElement,
    _createElement,
    _createIconNoSpan,
    _findFocusableElements,
    _findNextFocusableElement,
    _getActiveDomElement,
    _isKeyboardMode,
    _last,
    _setAriaHidden,
    _setAriaLabel,
    _setAriaPosInSet,
    _setAriaRole,
    _setAriaSetSize,
} from 'ag-grid-community';

import type { PillDragComp } from './pillDragComp';
import { pillDropZonePanelCSS } from './pillDropZonePanel.css-GENERATED';

export interface IAcDGPillDropZonePanelParams {
    emptyMessage?: string;
    title?: string;
    icon?: Element;
}

type PillState = 'notDragging' | 'newItemsIn' | 'rearrangeItems';

function _insertArrayIntoArray<T>(dest: T[], src: T[], toIndex: number) {
    if (dest == null || src == null) {
        return;
    }

    dest.splice(toIndex, 0, ...src);
}
const PillDropZonePanelElement: ElementParams = { tag: 'div', cls: 'ag-unselectable', role: 'presentation' };
export abstract class AcDGPillDropZonePanel<TPill extends PillDragComp<TItem>, TItem> extends Component {
    private state: PillState = 'notDragging';

    private dropTarget: DropTarget;

    // when we are considering a drop from a dnd event,
    // the items to be dropped go in here
    private potentialDndItems: TItem[];

    private guiDestroyFunctions: (() => void)[] = [];

    private params: PillDropZonePanelParams;

    private childPillComponents: TPill[] = [];
    private insertIndex: number;

    // when this component is refreshed, we rip out all DOM elements and build it up
    // again from scratch. one exception is ePillDropList, as we want to maintain the
    // scroll position between the refreshes, so we create one instance of it here and
    // reuse it.
    private ePillDropList: HTMLElement;

    private positionableFeature: PositionableFeature;
    private resizeEnabled: boolean = false;

    protected abstract isItemDroppable(item: TItem, draggingEvent: DraggingEvent): boolean;
    protected abstract updateItems(items: TItem[]): void;
    protected abstract getExistingItems(): TItem[];
    protected abstract getIconName(): DragAndDropIcon;
    protected abstract getAriaLabel(): string;
    protected abstract createPillComponent(
        item: TItem,
        dropTarget: DropTarget,
        ghost: boolean,
        horizontal: boolean
    ): TPill;
    protected abstract getItems(dragItem: DragItem<TItem>): TItem[];
    protected abstract isInterestedIn(type: DragSourceType): boolean;

    constructor(protected readonly horizontal: boolean) {
        super(PillDropZonePanelElement);
        this.addElementClasses(this.getGui());
        this.ePillDropList = _createElement({ tag: 'div' });
        this.addElementClasses(this.ePillDropList, 'list');
        this.registerCSS(pillDropZonePanelCSS);
    }

    public toggleResizable(resizable: boolean) {
        this.positionableFeature.setResizable(resizable ? { bottom: true } : false);
        this.resizeEnabled = resizable;
    }

    protected isSourceEventFromTarget(draggingEvent: DraggingEvent): boolean {
        const { dropZoneTarget, dragSource } = draggingEvent;
        return dropZoneTarget.contains(dragSource.eElement);
    }

    public override destroy(): void {
        this.destroyGui();
        super.destroy();
    }

    private destroyGui(): void {
        this.guiDestroyFunctions.forEach((func) => func());
        this.guiDestroyFunctions.length = 0;
        this.childPillComponents.length = 0;
        _clearElement(this.getGui());
        _clearElement(this.ePillDropList);
    }

    public init(params?: PillDropZonePanelParams): void {
        this.params = params ?? {};

        this.createManagedBean(
            new ManagedFocusFeature(this.getFocusableElement(), {
                onTabKeyDown: this.onTabKeyDown.bind(this),
                handleKeyDown: this.onKeyDown.bind(this),
            })
        );

        this.setupDropTarget();

        this.positionableFeature = new PositionableFeature(this.getGui());
        this.createManagedBean(this.positionableFeature);

        this.refreshGui();
        _setAriaLabel(this.ePillDropList, this.getAriaLabel());
    }

    private onTabKeyDown(e: KeyboardEvent): void {
        const focusableElements = _findFocusableElements(this.getFocusableElement(), null, true);
        const len = focusableElements.length;

        if (len === 0) {
            return;
        }

        const { shiftKey } = e;
        const activeEl = _getActiveDomElement(this.beans);

        const isFirstFocused = activeEl === focusableElements[0];
        const isLastFocused = activeEl === _last(focusableElements);
        const shouldAllowDefaultTab = len === 1 || (isFirstFocused && shiftKey) || (isLastFocused && !shiftKey);

        if (!shouldAllowDefaultTab) {
            focusableElements[shiftKey ? 0 : len - 1].focus();
        }
    }

    private onKeyDown(e: KeyboardEvent) {
        const { key } = e;
        const isVertical = !this.horizontal;

        let isNext = key === KeyCode.DOWN;
        let isPrevious = key === KeyCode.UP;

        if (!isVertical) {
            const isRtl = this.gos.get('enableRtl');
            isNext = (!isRtl && key === KeyCode.RIGHT) || (isRtl && key === KeyCode.LEFT);
            isPrevious = (!isRtl && key === KeyCode.LEFT) || (isRtl && key === KeyCode.RIGHT);
        }

        if (!isNext && !isPrevious) {
            return;
        }

        e.preventDefault();

        if (e.shiftKey) {
            this.moveFocusedItem(isPrevious);
        } else {
            const el = _findNextFocusableElement(this.beans, this.getFocusableElement(), false, isPrevious);

            if (el) {
                el.focus();
            }
        }
    }

    private moveFocusedItem(isPrevious: boolean): void {
        const currentItemIndex = this.getFocusedItem();

        if (currentItemIndex === -1) {
            return;
        }

        const diff = isPrevious ? -1 : 1;
        const changed = this.normalizeAndUpdateInsertIndex(currentItemIndex, currentItemIndex + diff);

        if (!changed) {
            return;
        }

        const comp = this.childPillComponents[currentItemIndex];

        if (!comp.isMovable()) {
            return;
        }

        const currentItem = comp.getItem();

        // this will focus the target position before we call rearrangeItems
        // rearrange items will then call refresh which will refocus the target index.
        this.focusItemAtIndex(this.insertIndex);
        this.rearrangeItems([currentItem], true);
    }

    protected addElementClasses(el: Element, suffix?: string) {
        suffix = suffix ? `-${suffix}` : '';
        const direction = this.horizontal ? 'horizontal' : 'vertical';
        el.classList.add(`ag-column-drop${suffix}`, `ag-column-drop-${direction}${suffix}`);
    }

    private setupDropTarget(): void {
        this.dropTarget = {
            getContainer: this.getGui.bind(this),
            getIconName: this.getIconName.bind(this),
            onDragging: this.onDragging.bind(this),
            onDragEnter: this.onDragEnter.bind(this),
            onDragLeave: this.onDragLeave.bind(this),
            onDragStop: this.onDragStop.bind(this),
            onDragCancel: this.onDragCancel.bind(this),
            isInterestedIn: this.isInterestedIn.bind(this),
        };

        this.beans.dragAndDrop?.addDropTarget(this.dropTarget);
    }

    protected minimumAllowedNewInsertIndex(): number {
        return 0;
    }

    private checkInsertIndex(draggingEvent: DraggingEvent): boolean {
        const newIndex = this.getNewInsertIndex(draggingEvent);

        // <0 happens when drag is no a direction we are interested in, eg drag is up/down but in horizontal panel
        if (newIndex < 0) {
            return false;
        }

        return this.normalizeAndUpdateInsertIndex(this.insertIndex, newIndex);
    }

    private normalizeAndUpdateInsertIndex(currentIndex: number, index: number): boolean {
        const minimumAllowedIndex = this.minimumAllowedNewInsertIndex();
        const newAdjustedIndex = Math.max(minimumAllowedIndex, index);

        const changed = newAdjustedIndex !== currentIndex;

        if (changed) {
            this.insertIndex = newAdjustedIndex;
        }

        return changed;
    }

    private getNewInsertIndex(draggingEvent: DraggingEvent): number {
        const mouseEvent = draggingEvent.event;
        const mouseLocation = this.horizontal ? mouseEvent.clientX : mouseEvent.clientY;

        const boundsList = this.childPillComponents.map((comp) => comp.getGui().getBoundingClientRect());
        // find the non-ghost component we're hovering
        const hoveredIndex = boundsList.findIndex((rect) =>
            this.horizontal
                ? rect.right > mouseLocation && rect.left < mouseLocation
                : rect.top < mouseLocation && rect.bottom > mouseLocation
        );

        // not hovering a non-ghost component
        if (hoveredIndex === -1) {
            const enableRtl = this.gos.get('enableRtl');

            // if mouse is below or right of all components then new index should be placed last
            const isLast = boundsList.every((rect) => mouseLocation > (this.horizontal ? rect.right : rect.bottom));

            if (isLast) {
                return enableRtl && this.horizontal ? 0 : this.childPillComponents.length;
            }

            // if mouse is above or left of all components, new index is first
            const isFirst = boundsList.every((rect) => mouseLocation < (this.horizontal ? rect.left : rect.top));

            if (isFirst) {
                return enableRtl && this.horizontal ? this.childPillComponents.length : 0;
            }

            // must be hovering a ghost, don't change the index
            return this.insertIndex;
        }

        // if the old index is equal to or less than the index of our new target
        // we need to shift right, to insert after rather than before
        if (this.insertIndex <= hoveredIndex) {
            return hoveredIndex + 1;
        }
        return hoveredIndex;
    }

    private checkDragStartedBySelf(draggingEvent: DraggingEvent): void {
        if (this.state !== 'notDragging') {
            return;
        }

        this.state = 'rearrangeItems';

        this.potentialDndItems = this.getItems(draggingEvent.dragSource.getDragItem());
        this.refreshGui();

        this.checkInsertIndex(draggingEvent);
        this.refreshGui();
    }

    private onDragging(draggingEvent: DraggingEvent): void {
        this.checkDragStartedBySelf(draggingEvent);

        if (this.checkInsertIndex(draggingEvent)) {
            this.refreshGui();
        }
    }

    protected handleDragEnterEnd(_: DraggingEvent): void {}

    private onDragEnter(draggingEvent: DraggingEvent): void {
        // this will contain all items that are potential drops
        const dragItems = this.getItems(draggingEvent.dragSource.getDragItem());
        this.state = 'newItemsIn';
        // take out items that are not droppable
        const goodDragItems = dragItems.filter((item) => this.isItemDroppable(item, draggingEvent));
        const alreadyPresent = goodDragItems.every(
            (item) => this.childPillComponents.map((cmp) => cmp.getItem()).indexOf(item) !== -1
        );

        if (goodDragItems.length === 0) {
            return;
        }

        this.potentialDndItems = goodDragItems;

        if (alreadyPresent) {
            this.state = 'notDragging';
            return;
        }

        this.handleDragEnterEnd(draggingEvent);

        this.checkInsertIndex(draggingEvent);
        this.refreshGui();
    }

    protected isPotentialDndItems(): boolean {
        return !!this.potentialDndItems?.length;
    }

    protected handleDragLeaveEnd(_: DraggingEvent): void {}

    private onDragLeave(draggingEvent: DraggingEvent): void {
        // if the dragging started from us, we remove the group, however if it started
        // some place else, then we don't, as it was only 'asking'

        if (this.state === 'rearrangeItems') {
            const items = this.getItems(draggingEvent.dragSource.getDragItem());
            this.removeItems(items);
        }

        if (this.isPotentialDndItems()) {
            this.handleDragLeaveEnd(draggingEvent);

            this.potentialDndItems = [];
            this.refreshGui();
        }

        this.state = 'notDragging';
    }

    private onDragCancel(draggingEvent: DraggingEvent): void {
        if (this.isPotentialDndItems()) {
            if (this.state === 'newItemsIn') {
                this.handleDragLeaveEnd(draggingEvent);
            }

            this.potentialDndItems = [];
            this.refreshGui();
        }

        this.state = 'notDragging';
    }

    private onDragStop(): void {
        if (this.isPotentialDndItems()) {
            if (this.state === 'newItemsIn') {
                this.addItems(this.potentialDndItems);
            } else {
                this.rearrangeItems(this.potentialDndItems);
            }

            this.potentialDndItems = [];
            this.refreshGui();
        }

        this.state = 'notDragging';
    }

    private removeItems(itemsToRemove: TItem[]): void {
        const newItemList = this.getExistingItems().filter((item) => !itemsToRemove.includes(item));
        this.updateItems(newItemList);
    }

    private addItems(itemsToAdd: TItem[]): void {
        if (!itemsToAdd) {
            return;
        }
        const newItemList = this.getExistingItems().slice();
        const itemsToAddNoDuplicates = itemsToAdd.filter((item) => newItemList.indexOf(item) < 0);
        _insertArrayIntoArray(newItemList, itemsToAddNoDuplicates, this.insertIndex);
        this.updateItems(newItemList);
    }

    public addItem(item: TItem): void {
        this.insertIndex = this.getExistingItems().length;
        this.addItems([item]);
        this.refreshGui();
    }

    private rearrangeItems(itemsToAdd: TItem[], fromKeyboard?: boolean): boolean {
        let newItemList: TItem[];

        if (!fromKeyboard) {
            newItemList = this.getNonGhostItems().slice();
        } else {
            newItemList = this.getExistingItems().filter((item) => itemsToAdd.indexOf(item) === -1);
        }

        _insertArrayIntoArray(newItemList, itemsToAdd, this.insertIndex);

        if (_areEqual(newItemList, this.getExistingItems())) {
            return false;
        }

        this.updateItems(newItemList);
        return true;
    }

    public refreshGui(): void {
        // we reset the scroll position after the refresh.
        // if we don't do this, then the list will always scroll to the top
        // each time we refresh it. this is because part of the refresh empties
        // out the list which sets scroll to zero. so the user could be just
        // reordering the list - we want to prevent the resetting of the scroll.
        // this is relevant for vertical display only (as horizontal has no scroll)
        let scrollTop = 0;

        if (!this.horizontal) {
            scrollTop = this.ePillDropList.scrollTop;
        }
        const resizeEnabled = this.resizeEnabled;
        const focusedIndex = this.getFocusedItem();

        const { eGridDiv } = this.beans;
        const isKeyboardMode = _isKeyboardMode();
        let alternateElement: HTMLElement | null = null;
        if (isKeyboardMode) {
            alternateElement =
                _findNextFocusableElement(this.beans, eGridDiv) ??
                _findNextFocusableElement(this.beans, eGridDiv, false, true);
        }

        this.toggleResizable(false);
        this.destroyGui();

        this.addIconAndTitleToGui();
        this.addEmptyMessageToGui();
        this.addItemsToGui();

        if (scrollTop !== 0) {
            this.ePillDropList.scrollTop = scrollTop;
        }

        if (resizeEnabled) {
            this.toggleResizable(resizeEnabled);
        }

        // focus should only be restored when keyboard mode
        // otherwise mouse clicks will cause containers to scroll
        // without no apparent reason.
        if (isKeyboardMode) {
            this.restoreFocus(focusedIndex, alternateElement!);
        }
    }

    private getFocusedItem(): number {
        const eGui = this.getGui();
        const activeElement = _getActiveDomElement(this.beans);

        if (!eGui.contains(activeElement)) {
            return -1;
        }

        const items = Array.from(eGui.querySelectorAll('.ag-column-drop-cell'));

        return items.indexOf(activeElement as HTMLElement);
    }

    private focusItemAtIndex(index: number): void {
        const eGui = this.getGui();
        const items = Array.from(eGui.querySelectorAll('.ag-column-drop-cell'));
        const item = items[index] as HTMLElement;

        if (!item) {
            return;
        }

        item.focus({ preventScroll: true });
    }

    private restoreFocus(index: number, alternateElement: HTMLElement): void {
        const eGui = this.getGui();
        const items = Array.from(eGui.querySelectorAll('.ag-column-drop-cell'));

        if (index === -1) {
            return;
        }

        if (items.length === 0) {
            alternateElement.focus();
        }

        const indexToFocus = Math.min(items.length - 1, index);
        const el = items[indexToFocus] as HTMLElement;

        if (el) {
            el.focus();
        }
    }

    public focusList(fromBottom?: boolean): void {
        const index = fromBottom ? this.childPillComponents.length - 1 : 0;
        this.restoreFocus(index, this.getFocusableElement());
    }

    private getNonGhostItems(): TItem[] {
        const existingItems = this.getExistingItems();

        if (this.isPotentialDndItems()) {
            return existingItems.filter((item) => !this.potentialDndItems.includes(item));
        }
        return existingItems;
    }

    private addItemsToGui(): void {
        const nonGhostItems = this.getNonGhostItems();
        const itemsToAddToGui: TPill[] = nonGhostItems.map((item) => this.createItemComponent(item, false));

        if (this.isPotentialDndItems()) {
            const dndItems = this.potentialDndItems.map((item) => this.createItemComponent(item, true));
            if (this.insertIndex >= itemsToAddToGui.length) {
                itemsToAddToGui.push(...dndItems);
            } else {
                itemsToAddToGui.splice(this.insertIndex, 0, ...dndItems);
            }
        }

        this.appendChild(this.ePillDropList);

        itemsToAddToGui.forEach((itemComponent, index) => {
            if (index > 0) {
                this.addArrow(this.ePillDropList);
            }

            this.ePillDropList.appendChild(itemComponent.getGui());
        });

        this.addAriaLabelsToComponents();
    }

    private addAriaLabelsToComponents(): void {
        const { childPillComponents, ePillDropList } = this;
        const len = childPillComponents.length;

        _setAriaRole(ePillDropList, len === 0 ? 'presentation' : 'listbox');

        for (let i = 0; i < len; i++) {
            const comp = childPillComponents[i];
            const eGui = comp.getGui();
            _setAriaPosInSet(eGui, i + 1);
            _setAriaSetSize(eGui, len);
        }
    }

    private createItemComponent(item: TItem, ghost: boolean): TPill {
        const itemComponent = this.createPillComponent(item, this.dropTarget, ghost, this.horizontal);
        itemComponent.addEventListener('columnRemove', this.removeItems.bind(this, [item]));

        this.createBean(itemComponent);
        this.guiDestroyFunctions.push(() => this.destroyBean(itemComponent));

        if (!ghost) {
            this.childPillComponents.push(itemComponent);
        }

        return itemComponent;
    }

    private addIconAndTitleToGui(): void {
        const { title, icon: eGroupIcon } = this.params;
        if (!title || !eGroupIcon) {
            return;
        }
        const eTitleBar = _createElement({ tag: 'div' });
        _setAriaHidden(eTitleBar, true);
        this.addElementClasses(eTitleBar, 'title-bar');
        this.addElementClasses(eGroupIcon, 'icon');
        this.toggleCss('ag-column-drop-empty', this.isExistingItemsEmpty());

        eTitleBar.appendChild(eGroupIcon);

        if (!this.horizontal) {
            const eTitle = _createElement({ tag: 'span' });
            this.addElementClasses(eTitle, 'title');
            eTitle.textContent = title;

            eTitleBar.appendChild(eTitle);
        }

        this.appendChild(eTitleBar);
    }

    private isExistingItemsEmpty(): boolean {
        return this.getExistingItems().length === 0;
    }

    private addEmptyMessageToGui(): void {
        const { emptyMessage } = this.params;
        if (!emptyMessage || !this.isExistingItemsEmpty() || this.isPotentialDndItems()) {
            return;
        }

        const eMessage = _createElement({ tag: 'span' });
        eMessage.textContent = emptyMessage;
        this.addElementClasses(eMessage, 'empty-message');
        this.ePillDropList.appendChild(eMessage);
    }

    private addArrow(eParent: HTMLElement): void {
        // only add the arrows if the layout is horizontal
        if (this.horizontal) {
            // for RTL it's a left arrow, otherwise it's a right arrow
            const enableRtl = this.gos.get('enableRtl');
            const icon = _createIconNoSpan(enableRtl ? 'panelDelimiterRtl' : 'panelDelimiter', this.beans)!;
            this.addElementClasses(icon, 'cell-separator');
            eParent.appendChild(icon);
        }
    }
}
