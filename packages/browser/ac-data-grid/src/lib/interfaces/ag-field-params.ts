import type { ElementParams } from '../utils/dom';
import type { ComponentSelector } from '../widgets/component';

export type LabelAlignment = 'left' | 'right' | 'top';

export interface IAcDataGridLabelParams {
    label?: HTMLElement | string;
    labelWidth?: number | 'flex';
    labelSeparator?: string;
    labelAlignment?: LabelAlignment;
    disabled?: boolean;
}

export interface IAcDataGridPickerFieldParams extends AgFieldParams {
    pickerType: string;
    pickerGap?: number;
    /**
     * If true, will set min-width and max-width (if present), and will set width to wrapper element width.
     * If false, will set min-width, max-width and width to maxPickerWidth or wrapper element width.
     */
    variableWidth?: boolean;
    minPickerWidth?: number | string;
    maxPickerWidth?: number | string;
    maxPickerHeight?: number | string;
    pickerAriaLabelKey: string;
    pickerAriaLabelValue: string;
    template?: ElementParams;
    agComponents?: ComponentSelector[];
    className?: string;
    pickerIcon?: string;
    ariaRole?: string;
    modalPicker?: boolean;
    inputWidth?: number | 'flex';
}

export interface IAcDataGridFieldParams extends AgLabelParams {
    value?: any;
    width?: number;
    onValueChange?: (value?: any) => void;
}

export interface IAcDataGridInputFieldParams extends AgFieldParams {
    inputName?: string;
    inputWidth?: number | 'flex';
    template?: ElementParams;
}

export interface IAcDataGridCheckboxParams extends AgInputFieldParams {
    readOnly?: boolean;
    passive?: boolean;
}
