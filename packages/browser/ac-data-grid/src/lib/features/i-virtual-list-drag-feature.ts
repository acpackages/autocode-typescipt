import type { IAcDataGridEvent, Component, DragSourceType, IEventEmitter } from 'ag-grid-community';

export interface IAcDGVirtualListDragItem<R extends Component<any>> {
    rowIndex: number;
    position: 'top' | 'bottom';
    component: R;
}

export interface IAcDGVirtualListDragParams<C extends Component, R extends Component, V, E extends IAcDataGridEvent> {
    eventSource: Window | HTMLElement | IEventEmitter<any>;
    listItemDragStartEvent: 'columnPanelItemDragStart' | 'advancedFilterBuilderDragStarted';
    listItemDragEndEvent: 'columnPanelItemDragEnd' | 'advancedFilterBuilderDragEnded';
    dragSourceType: DragSourceType;
    getCurrentDragValue: (listItemDragStartEvent: E) => V;
    isMoveBlocked: (currentDragValue: V | null) => boolean;
    getNumRows: (comp: C) => number;
    moveItem: (currentDragValue: V | null, lastHoveredListItem: VirtualListDragItem<R> | null) => void;
}
