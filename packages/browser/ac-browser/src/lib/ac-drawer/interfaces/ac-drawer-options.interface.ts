import { AcEnumDrawerPosition } from "../enums/ac-enum-drawer-position.enum";

export class IAcDrawerOptions {
  placement?: AcEnumDrawerPosition;
  backdrop?: boolean;
  closeOnBackdropClick?: boolean;
  animationDuration?: number;
}
