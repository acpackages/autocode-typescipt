import type { AgBubbleSeriesOptions, AgCartesianAxisOptions, AgScatterSeriesOptions } from 'ag-charts-types';

import { DEFAULT_CHART_CATEGORY } from '../../model/chartDataModel';
import type { FieldDefinition, UpdateParams } from '../chartProxy';
import { CartesianChartProxy } from './cartesianChartProxy';

interface IAcDGSeriesDefinition {
    xField: FieldDefinition;
    yField: FieldDefinition;
    sizeField?: FieldDefinition;
}

export class AcDGScatterChartProxy extends CartesianChartProxy<'scatter' | 'bubble'> {
    protected override getAxes(_params: UpdateParams): AgCartesianAxisOptions[] {
        return [
            {
                type: 'number',
                position: 'bottom',
            },
            {
                type: 'number',
                position: 'left',
            },
        ];
    }

    protected override getSeries(params: UpdateParams): (AgScatterSeriesOptions | AgBubbleSeriesOptions)[] {
        const [category] = params.categories;
        const paired = this.isPaired();
        const seriesDefinitions = this.getSeriesDefinitions(params.fields, paired);
        const labelFieldDefinition = category.id === DEFAULT_CHART_CATEGORY ? undefined : category;

        const series = seriesDefinitions.map((seriesDefinition) => {
            if (seriesDefinition?.sizeField) {
                const opts: AgBubbleSeriesOptions = {
                    type: 'bubble',
                    xKey: seriesDefinition!.xField.colId,
                    xName: seriesDefinition!.xField.displayName ?? undefined,
                    yKey: seriesDefinition!.yField.colId,
                    yName: seriesDefinition!.yField.displayName ?? undefined,
                    title: `${seriesDefinition!.yField.displayName} vs ${seriesDefinition!.xField.displayName}`,
                    sizeKey: seriesDefinition!.sizeField.colId,
                    sizeName: seriesDefinition!.sizeField.displayName ?? '',
                    labelKey: labelFieldDefinition ? labelFieldDefinition.id : seriesDefinition!.yField.colId,
                    labelName: labelFieldDefinition ? labelFieldDefinition.name : undefined,
                };
                return opts;
            }

            const opts: AgScatterSeriesOptions = {
                type: 'scatter',
                xKey: seriesDefinition!.xField.colId,
                xName: seriesDefinition!.xField.displayName ?? undefined,
                yKey: seriesDefinition!.yField.colId,
                yName: seriesDefinition!.yField.displayName ?? undefined,
                title: `${seriesDefinition!.yField.displayName} vs ${seriesDefinition!.xField.displayName}`,
                labelKey: labelFieldDefinition ? labelFieldDefinition.id : seriesDefinition!.yField.colId,
                labelName: labelFieldDefinition ? labelFieldDefinition.name : undefined,
            };
            return opts;
        });

        return this.crossFiltering ? this.extractCrossFilterSeries(series, params) : series;
    }

    private extractCrossFilterSeries(
        series: (AgScatterSeriesOptions | AgBubbleSeriesOptions)[],
        params: UpdateParams
    ): (AgScatterSeriesOptions | AgBubbleSeriesOptions)[] {
        const { data } = params;

        const filteredOutKey = (key: string) => `${key}-filtered-out`;

        const calcMarkerDomain = (data: any, sizeKey?: string) => {
            const markerDomain: [number, number] = [Infinity, -Infinity];
            if (sizeKey != null) {
                for (const datum of data) {
                    const value = datum[sizeKey] ?? datum[filteredOutKey(sizeKey)];
                    if (value < markerDomain[0]) {
                        markerDomain[0] = value;
                    }
                    if (value > markerDomain[1]) {
                        markerDomain[1] = value;
                    }
                }
            }
            if (markerDomain[0] <= markerDomain[1]) {
                return markerDomain;
            }
            return undefined;
        };

        const updatePrimarySeries = <T extends AgScatterSeriesOptions | AgBubbleSeriesOptions>(series: T): T => {
            let markerDomain: [number, number] | undefined = undefined;
            if (series.type === 'bubble') {
                const { sizeKey } = series;
                markerDomain = calcMarkerDomain(data, sizeKey);
            }

            return {
                ...series,
                domain: markerDomain,
                highlightStyle: { item: { fill: 'yellow' } },
                listeners: {
                    ...series.listeners,
                    seriesNodeClick: this.crossFilterCallback,
                },
            };
        };

        const updateFilteredOutSeries = <T extends AgScatterSeriesOptions | AgBubbleSeriesOptions>(series: T): T => {
            const { yKey, xKey } = series;

            let alteredSizeKey = {};
            if (series.type === 'bubble') {
                alteredSizeKey = { sizeKey: filteredOutKey(series.sizeKey!) };
            }

            return {
                ...series,
                ...alteredSizeKey,
                yKey: filteredOutKey(yKey!),
                xKey: filteredOutKey(xKey!),
                showInLegend: false,
                listeners: {
                    ...series.listeners,
                    seriesNodeClick: (e: any) => {
                        const value = e.datum[filteredOutKey(xKey!)];

                        // Need to remove the `-filtered-out` suffixes from the event so that
                        // upstream processing maps the event correctly onto grid column ids.
                        const filterableEvent = {
                            ...e,
                            xKey,
                            datum: { ...e.datum, [xKey!]: value },
                        };
                        this.crossFilterCallback(filterableEvent);
                    },
                },
            } as T;
        };

        const updatedSeries = series.map(updatePrimarySeries);
        return [...updatedSeries, ...updatedSeries.map(updateFilteredOutSeries)];
    }

    private getSeriesDefinitions(fields: FieldDefinition[], paired: boolean): (SeriesDefinition | null)[] {
        if (fields.length < 2) {
            return [];
        }

        const isBubbleChart = this.chartType === 'bubble';

        if (paired) {
            if (isBubbleChart) {
                return fields
                    .map((currentXField, i) =>
                        i % 3 === 0
                            ? {
                                  xField: currentXField,
                                  yField: fields[i + 1],
                                  sizeField: fields[i + 2],
                              }
                            : null
                    )
                    .filter((x) => x && x.yField && x.sizeField);
            }
            return fields
                .map((currentXField, i) =>
                    i % 2 === 0
                        ? {
                              xField: currentXField,
                              yField: fields[i + 1],
                          }
                        : null
                )
                .filter((x) => x && x.yField);
        }

        const xField = fields[0];

        if (isBubbleChart) {
            return fields
                .map((yField, i) =>
                    i % 2 === 1
                        ? {
                              xField,
                              yField,
                              sizeField: fields[i + 1],
                          }
                        : null
                )
                .filter((x) => x && x.sizeField);
        }

        return fields.filter((value, i) => i > 0).map((yField) => ({ xField, yField }));
    }
}
