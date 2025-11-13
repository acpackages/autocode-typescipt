import { TemplateRef } from '@angular/core';

// ✅ Augment the core interface by reopening its module
declare module '@autocode-ts/ac-browser' {
  export interface IAcDatagridColumnDefinition {
    /**
     * Angular-only: TemplateRef for a custom cell editor template.
     */
    cellEditorTemplateRef?: TemplateRef<any>;
    cellEditorComponent?: any;

    /**
     * Angular-only: TemplateRef for a custom cell renderer template.
     */
    cellRendererTemplateRef?: TemplateRef<any>;
    cellRendererComponent?: any;
  }
}
