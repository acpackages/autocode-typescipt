export interface IAcDGAutocompleteListParams {
    enabled: boolean;
    /** list will only get recreated if the type changes */
    type?: string;
    searchString?: string;
    entries?: AutocompleteEntry[];
}

export interface IAcDGAutocompleteEntry {
    key: string;
    displayValue?: string;
}
