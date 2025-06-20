import type { AgPickerFieldParams, ComponentSelector } from 'ag-grid-community';
import { AgPickerField, _createElement } from 'ag-grid-community';

import { AgDialog } from '../../widgets/agDialog';
import type { AgChartsExports } from '../agChartsExports';
import { AgColorPanel } from './agColorPanel';

export interface IAcDataGridColorPickerParams
    extends Omit<AgPickerFieldParams, 'pickerType' | 'pickerAriaLabelKey' | 'pickerAriaLabelValue'> {
    pickerType?: string;
    pickerAriaLabelKey?: string;
    pickerAriaLabelValue?: string;
}

export class AcDataGridColorPicker extends AgPickerField<string, AgColorPickerParams & AgPickerFieldParams, string, AgDialog> {
    private isDestroyingPicker: boolean;
    private eDisplayFieldColor: HTMLElement;
    private eDisplayFieldText: HTMLElement;

    constructor(config?: AgColorPickerParams) {
        super({
            pickerAriaLabelKey: 'ariaLabelColorPicker',
            pickerAriaLabelValue: 'Color Picker',
            pickerType: 'ag-list',
            className: 'ag-color-picker',
            pickerIcon: 'chartsColorPicker',
            ...config,
        });
    }

    public override postConstruct() {
        this.eDisplayFieldColor = _createElement({
            tag: 'span',
            cls: 'ag-color-picker-color',
        });
        this.eDisplayFieldText = _createElement({
            tag: 'span',
            cls: 'ag-color-picker-value',
        });

        this.eDisplayField.append(this.eDisplayFieldColor, this.eDisplayFieldText);

        super.postConstruct();

        if (this.value) {
            this.setValue(this.value);
        }
    }

    protected createPickerComponent() {
        const eGuiRect = this.eWrapper.getBoundingClientRect();
        const parentRect = this.beans.popupSvc!.getParentRect();

        const colorDialog = this.createBean(
            new AgDialog({
                closable: false,
                modal: true,
                hideTitleBar: true,
                minWidth: 190,
                width: 190,
                height: 250,
                x: eGuiRect.right - parentRect.left - 190,
                y: eGuiRect.top - parentRect.top - 250 - (this.config.pickerGap ?? 0),
                postProcessPopupParams: {
                    type: 'colorPicker',
                    eventSource: this.eWrapper,
                },
            })
        );

        return colorDialog;
    }

    protected override renderAndPositionPicker(): () => void {
        const pickerComponent = this.pickerComponent!;
        const colorPanel = this.createBean(new AgColorPanel({ picker: this }));

        pickerComponent.addCss('ag-color-dialog');

        colorPanel.addDestroyFunc(() => {
            if (pickerComponent.isAlive()) {
                this.destroyBean(pickerComponent);
            }
        });

        pickerComponent.setParentComponent(this);
        pickerComponent.setBodyComponent(colorPanel);
        colorPanel.setValue(this.getValue());
        colorPanel.getGui().focus();

        pickerComponent.addDestroyFunc(() => {
            // here we check if the picker was already being
            // destroyed to avoid a stack overflow
            if (!this.isDestroyingPicker) {
                this.beforeHidePicker();
                this.isDestroyingPicker = true;

                if (colorPanel.isAlive()) {
                    this.destroyBean(colorPanel);
                }

                if (this.isAlive()) {
                    this.getFocusableElement().focus();
                }
            } else {
                this.isDestroyingPicker = false;
            }
        });

        return () => this.pickerComponent?.close();
    }

    public override setValue(color: string): this {
        if (this.value === color) {
            return this;
        }

        this.eDisplayFieldColor.style.backgroundColor = color;
        this.eDisplayFieldText.textContent = (this.beans.agChartsExports as AgChartsExports)._Util.Color.fromString(
            color
        )
            .toHexString()
            .toUpperCase();

        return super.setValue(color);
    }

    public override getValue(): string {
        return this.value;
    }
}

export const AgColorPickerSelector: ComponentSelector = {
    selector: 'AG-COLOR-PICKER',
    component: AgColorPicker,
};
