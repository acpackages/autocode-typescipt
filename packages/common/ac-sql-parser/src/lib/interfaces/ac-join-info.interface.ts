import { IAcTableReference } from "./ac-table-reference.interface";

export interface IAcJoinInfo {
  type: string;
  right: IAcTableReference;
  on?: string | null;
  using?: string[] | null;
  raw?: string;
}
