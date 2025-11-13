import { ComponentRef } from "@angular/core";
import { AcDataRow } from '@autocode-ts/autocode';

// ✅ Augment the core interface by reopening its module
declare module '@autocode-ts/ac-browser' {
  export class AcDatagridRow extends AcDataRow{
    editorComponentRefs?:Record<string,ComponentRef<IAcDatagridCellEditor>>;
    rendererComponentRefs?:Record<string,ComponentRef<IAcDatagridCellEditor>>;
  }
}
