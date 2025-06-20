import type {
    AgColumn,
    AggregationStatusPanelAggFunc,
    AggregationStatusPanelParams,
    ElementParams,
    IStatusPanelComp,
    LocaleTextFunc,
    RowPosition,
} from 'ag-grid-community';
import {
    Component,
    RefPlaceholder,
    _createCellId,
    _exists,
    _formatNumberCommas,
    _getRowBelow,
    _getRowNode,
    _isClientSideRowModel,
    _isRowBefore,
    _isServerSideRowModel,
    _missing,
    _warn,
} from 'ag-grid-community';

import type { AgNameValue } from './agNameValue';
import { AgNameValueSelector } from './agNameValue';
import { _getTotalRowCount } from './utils';

function _formatNumberTwoDecimalPlacesAndCommas(value: number | null, getLocaleTextFunc: () => LocaleTextFunc): string {
    if (typeof value !== 'number') {
        return '';
    }

    return _formatNumberCommas(Math.round(value * 100) / 100, getLocaleTextFunc);
}

const AggregationCompElement: ElementParams = {
    tag: 'div',
    cls: 'ag-status-panel ag-status-panel-aggregations',
    children: [
        {
            tag: 'ag-name-value',
            ref: 'avgAggregationComp',
        },
        {
            tag: 'ag-name-value',
            ref: 'countAggregationComp',
        },
        {
            tag: 'ag-name-value',
            ref: 'minAggregationComp',
        },
        {
            tag: 'ag-name-value',
            ref: 'maxAggregationComp',
        },
        {
            tag: 'ag-name-value',
            ref: 'sumAggregationComp',
        },
    ],
};
export class AcDGAggregationComp extends Component implements IStatusPanelComp {
    private readonly sumAggregationComp: AgNameValue = RefPlaceholder;
    private readonly countAggregationComp: AgNameValue = RefPlaceholder;
    private readonly minAggregationComp: AgNameValue = RefPlaceholder;
    private readonly maxAggregationComp: AgNameValue = RefPlaceholder;
    private readonly avgAggregationComp: AgNameValue = RefPlaceholder;

    private params!: AggregationStatusPanelParams;

    constructor() {
        super(AggregationCompElement, [AgNameValueSelector]);
    }

    public postConstruct(): void {
        if (!_isClientSideRowModel(this.gos) && !_isServerSideRowModel(this.gos)) {
            _warn(221);
            return;
        }

        this.avgAggregationComp.setLabel('avg', 'Average');
        this.countAggregationComp.setLabel('count', 'Count');
        this.minAggregationComp.setLabel('min', 'Min');
        this.maxAggregationComp.setLabel('max', 'Max');
        this.sumAggregationComp.setLabel('sum', 'Sum');

        this.addManagedEventListeners({
            cellSelectionChanged: this.onCellSelectionChanged.bind(this),
            modelUpdated: this.onCellSelectionChanged.bind(this),
        });
    }

    public init(params: AggregationStatusPanelParams) {
        this.refresh(params);
    }

    public refresh(params: AggregationStatusPanelParams): boolean {
        this.params = params;

        const valueFormatter =
            params.valueFormatter ??
            (({ value }) => _formatNumberTwoDecimalPlacesAndCommas(value, this.getLocaleTextFunc.bind(this)));

        const aggFuncNames: AggregationStatusPanelAggFunc[] = ['avg', 'count', 'min', 'max', 'sum'];
        for (const key of aggFuncNames) {
            const comp = this.getAllowedAggregationValueComponent(key);

            if (comp) {
                comp.key = key;
                comp.valueFormatter = valueFormatter.bind(this);
            }
        }

        this.onCellSelectionChanged();
        return true;
    }

    private setAggregationComponentValue(
        aggFuncName: AggregationStatusPanelAggFunc,
        value: number | null,
        visible: boolean
    ) {
        const statusBarValueComponent = this.getAllowedAggregationValueComponent(aggFuncName);
        const totalRow = _getTotalRowCount(this.beans.rowModel);
        if (_exists(statusBarValueComponent) && statusBarValueComponent) {
            statusBarValueComponent.setValue(value!, totalRow);
            statusBarValueComponent.setDisplayed(visible);
        } else {
            // might have previously been visible, so hide now
            this.getAggregationValueComponent(aggFuncName)?.setDisplayed(false);
        }
    }

    private getAllowedAggregationValueComponent(aggFuncName: AggregationStatusPanelAggFunc): AgNameValue | null {
        // if the user has specified the agAggregationPanelComp but no aggFuncs we show the all
        // if the user has specified the agAggregationPanelComp and aggFuncs, then we only show the aggFuncs listed
        const { aggFuncs } = this.params;
        if (!aggFuncs || aggFuncs.includes(aggFuncName)) {
            return this.getAggregationValueComponent(aggFuncName);
        }

        // either we can't find it (which would indicate a typo or similar user side), or the user has deliberately
        // not listed the component in aggFuncs
        return null;
    }

    private getAggregationValueComponent(aggFuncName: AggregationStatusPanelAggFunc): AgNameValue {
        // converts user supplied agg name to our reference - eg: sum => sumAggregationComp
        const refComponentName = `${aggFuncName}AggregationComp`;
        return (this as any)[refComponentName];
    }

    private onCellSelectionChanged(): void {
        const beans = this.beans;
        const { rangeSvc, valueSvc } = beans;
        const cellRanges = rangeSvc?.getCellRanges();

        let sum = 0;
        let count = 0;
        let numberCount = 0;
        let min: number | null = null;
        let max: number | null = null;

        const cellsSoFar: any = {};

        if (cellRanges?.length && rangeSvc) {
            for (let i = 0; i < cellRanges.length; i++) {
                const cellRange = cellRanges[i];

                let currentRow: RowPosition | null = rangeSvc.getRangeStartRow(cellRange);
                const lastRow = rangeSvc.getRangeEndRow(cellRange);

                while (true) {
                    const finishedAllRows = _missing(currentRow) || !currentRow || _isRowBefore(lastRow, currentRow);
                    if (finishedAllRows || !currentRow || !cellRange.columns) {
                        break;
                    }

                    cellRange.columns.forEach((col: AgColumn) => {
                        if (currentRow === null) {
                            return;
                        }

                        // we only want to include each cell once, in case a cell is in multiple ranges
                        const cellId = _createCellId({
                            rowPinned: currentRow.rowPinned,
                            column: col,
                            rowIndex: currentRow.rowIndex,
                        });
                        if (cellsSoFar[cellId]) {
                            return;
                        }
                        cellsSoFar[cellId] = true;

                        const rowNode = _getRowNode(beans, currentRow);
                        if (_missing(rowNode)) {
                            return;
                        }

                        let value = valueSvc.getValue(col, rowNode);

                        // if empty cell, skip it, doesn't impact count or anything
                        if (_missing(value) || value === '') {
                            return;
                        }

                        count++;

                        // see if value is wrapped, can happen when doing count() or avg() functions
                        if (typeof value === 'object' && 'value' in value) {
                            value = value.value;

                            // ensure that the new value wouldn't have been skipped by the previous check
                            if (value === '') {
                                return;
                            }
                        }

                        if (typeof value === 'string') {
                            value = Number(value);
                        }

                        if (typeof value === 'number' && !isNaN(value)) {
                            sum += value;

                            if (max === null || value > max) {
                                max = value;
                            }

                            if (min === null || value < min) {
                                min = value;
                            }

                            numberCount++;
                        }
                    });

                    currentRow = _getRowBelow(beans, currentRow);
                }
            }
        }

        const gotResult = count > 1;
        const gotNumberResult = numberCount > 1;

        // we show count even if no numbers
        this.setAggregationComponentValue('count', count, gotResult);

        // show if numbers found
        this.setAggregationComponentValue('sum', sum, gotNumberResult);
        this.setAggregationComponentValue('min', min, gotNumberResult);
        this.setAggregationComponentValue('max', max, gotNumberResult);
        this.setAggregationComponentValue('avg', sum / numberCount, gotNumberResult);
    }
}
