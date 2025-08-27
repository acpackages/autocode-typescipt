export interface IAcDropdownOptions {
  menu: HTMLElement;
  position?: 'auto'|'bottom'|'left'|'right'|'top';
  offset?: number;
  autoClose?: "inside" | "outside" | "both" | "manual";
  triggerAction?:'click'|'hover';
}
