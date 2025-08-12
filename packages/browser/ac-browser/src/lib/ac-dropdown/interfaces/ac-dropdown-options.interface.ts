import { AcEnumDropdownPosition } from "../enums/ac-enum-dropdown-position.enum";

export interface IAcDropdownOptions {
  menu: HTMLElement;
  position?: AcEnumDropdownPosition;
  offset?: number;
  hover?: boolean; // extra: allow hover trigger
}
