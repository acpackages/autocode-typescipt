export interface IAcDGFocusableContainer {
    getGui(): HTMLElement;
    setAllowFocus?(allowFocus: boolean): void;
}
