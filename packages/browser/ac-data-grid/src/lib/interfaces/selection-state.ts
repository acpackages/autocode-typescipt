export interface IAcDGServerSideRowSelectionState {
    /** Whether the majority of rows are selected or not */
    selectAll: boolean;
    /** All rows that have the opposite selection state to `selectAll` */
    toggledNodes: string[];
}

export interface IAcDGServerSideRowGroupSelectionState {
    nodeId?: string;
    selectAllChildren?: boolean;
    toggledNodes?: ServerSideRowGroupSelectionState[];
}
