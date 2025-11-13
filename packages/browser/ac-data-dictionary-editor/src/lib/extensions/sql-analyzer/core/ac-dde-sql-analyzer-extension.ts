/* eslint-disable @typescript-eslint/no-inferrable-types */

import { acAddClassToElement, acSetElementAttributes } from "@autocode-ts/ac-browser";
import { AcEnumDDEView, AcEnumDDEHook, IAcDDEDatagridCellInitHookArgs } from "../../../_ac-data-dictionary-editor.export";
import { AcDDEExtension } from "../../../core/ac-dde-extension";
import { AcDDEDatagridRowAction } from "../../../elements/shared/ac-dde-datagrid-row-action.element";
import { AcEnumDDEExtension } from "../../../enums/ac-enum-dde-extension.enum";
import { IAcDDEExtension } from "../../../interfaces/ac-dde-extension.interface";
import { IAcDDEDatagridBeforeColumnsSetInitHookArgs } from "../../../interfaces/hook-args/ac-dde-datagrid-before-columns-set-hook-args.interface";
import { AcDDESqlAnalyzer } from "./ac-dde-sql-analyzer";
import { AcSqlParser } from "@autocode-ts/ac-sql-parser";

export class AcDDESqlAnalyzerExtension extends AcDDEExtension {
  analyzer!: AcDDESqlAnalyzer;

  override init(): void {
    this.analyzer = new AcDDESqlAnalyzer({ extension: this });
  }

  override handleHook({ hook, args }: { hook: string; args: any; }): void {
    if (hook == AcEnumDDEHook.ViewsDatagridBeforeColumnsSet) {
      this.handleBeforeColumnDefinitionSet(args);
    }
    else if (hook == AcEnumDDEHook.ViewsDatagridCellRendererInit) {
      this.handleCellRendererInit(args);
    }

  }

  handleBeforeColumnDefinitionSet(args: IAcDDEDatagridBeforeColumnsSetInitHookArgs) {
    const actionColumnDef = args.columnDefinitions.find((def) => {
      return def.field == 'action'
    });
    if (actionColumnDef) {
      actionColumnDef.minWidth! += 90;
      actionColumnDef.width! += 70;
      actionColumnDef.maxWidth! += 70;
    }
  }

  handleCellRendererInit(args: IAcDDEDatagridCellInitHookArgs) {
    if (args.datagridCell.columnKey == 'action') {
      setTimeout(() => {
        const instance = args.datagridCell.element;
        const actionElement: AcDDEDatagridRowAction = instance!.cellRenderer as AcDDEDatagridRowAction;
        const analyzeButton = document.createElement('button');
        acAddClassToElement({ class_: 'btn btn-info btn-sm ms-1', element: analyzeButton });
        acSetElementAttributes({ attributes: { 'type': 'button' }, element: analyzeButton });
        analyzeButton.style.marginTop = '-5px';
        analyzeButton.innerHTML = 'Analyze';
        actionElement.element.appendChild(analyzeButton);
        analyzeButton.addEventListener('click',()=>{
          const query = args.datagridCell.datagridRow.data[AcEnumDDEView.ViewQuery];
          new AcSqlParser().parse({sql:query});
        });
      }, 10);
    }
  }
}

export const AcSqlAnalyzerDDEExtension: IAcDDEExtension = {
  extensionName: AcEnumDDEExtension.SqlAnalyzer,
  extensionClass: AcDDESqlAnalyzerExtension
}
