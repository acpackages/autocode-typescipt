import { TemplateRef } from '@angular/core';
import { IAcDatagridColumnDefinition } from '@autocode-ts/ac-browser';
export interface IAcNgDatagridColumnDefinition extends IAcDatagridColumnDefinition {
  /**
   * Angular-only: TemplateRef for a custom cell editor template.
   */
  cellEditorTemplateRef?: TemplateRef<any>;
  cellEditorComponent?: any;
  cellEditorComponentProperties?: any;

  /**
   * Angular-only: TemplateRef for a custom cell renderer template.
   */
  cellRendererTemplateRef?: TemplateRef<any>;
  cellRendererComponent?: any;
  cellRendererComponentProperties?: any;
}
