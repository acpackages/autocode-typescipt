import type { NamedBean } from '../context/bean';
import { BeanStub } from '../context/beanStub';
import type { BeanCollection } from '../context/context';
import type { AgColumn } from '../entities/agColumn';
import { _addGridCommonParams } from '../gridOptionsUtils';
import type { HeaderCellCtrl } from '../headerRendering/cells/column/headerCellCtrl';
import type { HeaderGroupCellCtrl } from '../headerRendering/cells/columnGroup/headerGroupCellCtrl';
import type { CellCtrl } from '../rendering/cell/cellCtrl';
import type { RowCtrl } from '../rendering/row/rowCtrl';
import { _exists } from '../utils/generic';
import { _getValueUsingField } from '../utils/object';
import type { ITooltipCtrl, TooltipFeature } from './tooltipFeature';
import { _isShowTooltipWhenTruncated, _shouldDisplayTooltip } from './tooltipFeature';

export class AcDGTooltipService extends BeanStub implements NamedBean {
    beanName = 'tooltipSvc' as const;

    public setupHeaderTooltip(
        existingTooltipFeature: TooltipFeature | undefined,
        ctrl: HeaderCellCtrl,
        value?: string,
        shouldDisplayTooltip?: () => boolean
    ): TooltipFeature | undefined {
        if (existingTooltipFeature) {
            ctrl.destroyBean(existingTooltipFeature);
        }

        const isTooltipWhenTruncated = _isShowTooltipWhenTruncated(this.gos);
        const { column, eGui } = ctrl;
        const colDef = column.getColDef();

        if (!shouldDisplayTooltip && isTooltipWhenTruncated && !colDef.headerComponent) {
            shouldDisplayTooltip = _shouldDisplayTooltip(
                () => eGui.querySelector('.ag-header-cell-text') as HTMLElement | undefined
            );
        }

        const tooltipCtrl: ITooltipCtrl = {
            getColumn: () => column,
            getColDef: () => column.getColDef(),
            getGui: () => eGui,
            getLocation: () => 'header',
            getTooltipValue: () => {
                if (value != null) {
                    return value;
                }

                const res = column.getColDef().headerTooltip;
                return res;
            },
            shouldDisplayTooltip,
        };

        let tooltipFeature = this.createTooltipFeature(tooltipCtrl);
        if (tooltipFeature) {
            tooltipFeature = ctrl.createBean(tooltipFeature);
            ctrl.setRefreshFunction('tooltip', () => tooltipFeature!.refreshTooltip());
        }
        return tooltipFeature;
    }

    public setupHeaderGroupTooltip(
        existingTooltipFeature: TooltipFeature | undefined,
        ctrl: HeaderGroupCellCtrl,
        value?: string,
        shouldDisplayTooltip?: () => boolean
    ): TooltipFeature | undefined {
        if (existingTooltipFeature) {
            ctrl.destroyBean(existingTooltipFeature);
        }

        const isTooltipWhenTruncated = _isShowTooltipWhenTruncated(this.gos);
        const { column, eGui } = ctrl;
        const colGroupDef = column.getColGroupDef();

        if (!shouldDisplayTooltip && isTooltipWhenTruncated && !colGroupDef?.headerGroupComponent) {
            shouldDisplayTooltip = _shouldDisplayTooltip(
                () => eGui.querySelector('.ag-header-group-text') as HTMLElement | undefined
            );
        }

        const tooltipCtrl: ITooltipCtrl = {
            getColumn: () => column,
            getGui: () => eGui,
            getLocation: () => 'headerGroup',
            getTooltipValue: () => value ?? (colGroupDef && colGroupDef.headerTooltip),
            shouldDisplayTooltip,
        };

        if (colGroupDef) {
            tooltipCtrl.getColDef = () => colGroupDef;
        }

        const tooltipFeature = this.createTooltipFeature(tooltipCtrl);
        return tooltipFeature ? ctrl.createBean(tooltipFeature) : tooltipFeature;
    }

    public enableCellTooltipFeature(
        ctrl: CellCtrl,
        value?: string,
        shouldDisplayTooltip?: () => boolean
    ): TooltipFeature | undefined {
        const { column, rowNode } = ctrl;

        const getTooltipValue = () => {
            const colDef = column.getColDef();
            const data = rowNode.data;

            if (colDef.tooltipField && _exists(data)) {
                return _getValueUsingField(data, colDef.tooltipField, column.isTooltipFieldContainsDots());
            }

            const valueGetter = colDef.tooltipValueGetter;

            if (valueGetter) {
                return valueGetter(
                    _addGridCommonParams(this.gos, {
                        location: 'cell',
                        colDef: column.getColDef(),
                        column: column,
                        rowIndex: ctrl.cellPosition.rowIndex,
                        node: rowNode,
                        data: rowNode.data,
                        value: ctrl.value,
                        valueFormatted: ctrl.valueFormatted,
                    })
                );
            }

            return null;
        };

        const isTooltipWhenTruncated = _isShowTooltipWhenTruncated(this.gos);

        if (!shouldDisplayTooltip && isTooltipWhenTruncated && !ctrl.isCellRenderer()) {
            shouldDisplayTooltip = _shouldDisplayTooltip(() => {
                const eCell = ctrl.eGui;
                return eCell.children.length === 0
                    ? eCell
                    : (eCell.querySelector('.ag-cell-value') as HTMLElement | undefined);
            });
        }

        const tooltipCtrl: ITooltipCtrl = {
            getColumn: () => column,
            getColDef: () => column.getColDef(),
            getRowIndex: () => ctrl.cellPosition.rowIndex,
            getRowNode: () => rowNode,
            getGui: () => ctrl.eGui,
            getLocation: () => 'cell',
            getTooltipValue: value != null ? () => value : getTooltipValue,

            // this makes no sense, why is the cell formatted value passed to the tooltip???
            getValueFormatted: () => ctrl.valueFormatted,
            shouldDisplayTooltip,
        };

        return this.createTooltipFeature(tooltipCtrl, this.beans);
    }

    public refreshRowTooltip(
        existingTooltipFeature: TooltipFeature | undefined,
        ctrl: RowCtrl,
        value: string,
        shouldDisplayTooltip?: () => boolean
    ): TooltipFeature | undefined {
        const tooltipParams: ITooltipCtrl = {
            getGui: () => ctrl.getFullWidthElement()!,
            getTooltipValue: () => value,
            getLocation: () => 'fullWidthRow',
            shouldDisplayTooltip,
        };

        const beans = this.beans;
        const context = beans.context;

        if (existingTooltipFeature) {
            ctrl.destroyBean(existingTooltipFeature, context);
        }

        const tooltipFeature = this.createTooltipFeature(tooltipParams, beans);

        return ctrl.createBean(tooltipFeature, context);
    }

    public initCol(column: AgColumn): void {
        const { colDef } = column;
        column.tooltipEnabled =
            _exists(colDef.tooltipField) || _exists(colDef.tooltipValueGetter) || _exists(colDef.tooltipComponent);
    }

    private createTooltipFeature(tooltipCtrl: ITooltipCtrl, beans?: BeanCollection): TooltipFeature | undefined {
        return this.beans.registry.createDynamicBean<TooltipFeature>('tooltipFeature', false, tooltipCtrl, beans);
    }
}
