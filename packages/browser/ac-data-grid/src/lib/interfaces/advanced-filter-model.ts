export type AdvancedFilterModel = JoinAdvancedFilterModel | ColumnAdvancedFilterModel;

/** Represents a series of filter conditions joined together. */
export interface IAcDGJoinAdvancedFilterModel {
    filterType: 'join';
    /** How the conditions are joined together */
    type: 'AND' | 'OR';
    /** The filter conditions that are joined by the `type` */
    conditions: AdvancedFilterModel[];
}

/** Represents a single filter condition on a column */
export type ColumnAdvancedFilterModel =
    | TextAdvancedFilterModel
    | NumberAdvancedFilterModel
    | BooleanAdvancedFilterModel
    | DateAdvancedFilterModel
    | DateStringAdvancedFilterModel
    | ObjectAdvancedFilterModel;

export type TextAdvancedFilterModelType =
    | 'equals'
    | 'notEqual'
    | 'contains'
    | 'notContains'
    | 'startsWith'
    | 'endsWith'
    | 'blank'
    | 'notBlank';

export type ScalarAdvancedFilterModelType =
    | 'equals'
    | 'notEqual'
    | 'lessThan'
    | 'lessThanOrEqual'
    | 'greaterThan'
    | 'greaterThanOrEqual'
    | 'blank'
    | 'notBlank';

export type BooleanAdvancedFilterModelType = 'true' | 'false';

/** Represents a single filter condition for a text column */
export interface IAcDGTextAdvancedFilterModel {
    filterType: 'text';
    /** The ID of the column being filtered. */
    colId: string;
    /** The filter option that is being applied. */
    type: TextAdvancedFilterModelType;
    /** The value to filter on. This is the same value as displayed in the input. */
    filter?: string;
}

/** Represents a single filter condition for a number column */
export interface IAcDGNumberAdvancedFilterModel {
    filterType: 'number';
    /** The ID of the column being filtered. */
    colId: string;
    /** The filter option that is being applied. */
    type: ScalarAdvancedFilterModelType;
    /** The value to filter on. */
    filter?: number;
}

/** Represents a single filter condition for a date column */
export interface IAcDGDateAdvancedFilterModel {
    filterType: 'date';
    /** The ID of the column being filtered. */
    colId: string;
    /** The filter option that is being applied. */
    type: ScalarAdvancedFilterModelType;
    /** The value to filter on. This is in format `YYYY-MM-DD`. */
    filter?: string;
}

/** Represents a single filter condition for a date string column */
export interface IAcDGDateStringAdvancedFilterModel {
    filterType: 'dateString';
    /** The ID of the column being filtered. */
    colId: string;
    /** The filter option that is being applied. */
    type: ScalarAdvancedFilterModelType;
    /** The value to filter on. This is in format `YYYY-MM-DD`. */
    filter?: string;
}

/** Represents a single filter condition for a boolean column */
export interface IAcDGBooleanAdvancedFilterModel {
    filterType: 'boolean';
    /** The ID of the column being filtered. */
    colId: string;
    /** The filter option that is being applied. */
    type: BooleanAdvancedFilterModelType;
}

/** Represents a single filter condition for an object column */
export interface IAcDGObjectAdvancedFilterModel {
    filterType: 'object';
    /** The ID of the column being filtered. */
    colId: string;
    /** The filter option that is being applied. */
    type: TextAdvancedFilterModelType;
    /** The value to filter on. This is the same value as displayed in the input. */
    filter?: string;
}
