import type { AgLabelParams, LabelAlignment } from '../interfaces/agFieldParams';
import { _setAriaRole } from '../utils/aria';
import type { ElementParams } from '../utils/dom';
import { _clearElement, _setDisabled, _setDisplayed, _setElementWidth } from '../utils/dom';
import { agAbstractLabelCSS } from './agAbstractLabel.css-GENERATED';
import type { ComponentEvent, ComponentSelector } from './component';
import { Component } from './component';

export type AgAbstractLabelEvent = ComponentEvent;
export abstract class AcDataGridAbstractLabel<
    TConfig extends AgLabelParams = AgLabelParams,
    TEventType extends string = AgAbstractLabelEvent,
> extends Component<TEventType | AgAbstractLabelEvent> {
    protected abstract eLabel: HTMLElement;

    protected readonly config: TConfig;
    protected labelSeparator: string = '';
    protected labelAlignment: LabelAlignment = 'left';
    protected disabled: boolean = false;
    private label: HTMLElement | string = '';

    constructor(config?: TConfig, template?: string | ElementParams, components?: ComponentSelector[]) {
        super(template, components);

        this.config = config || ({} as any);
        this.registerCSS(agAbstractLabelCSS);
    }

    public postConstruct() {
        this.addCss('ag-labeled');
        this.eLabel.classList.add('ag-label');

        const { labelSeparator, label, labelWidth, labelAlignment, disabled } = this.config;

        if (disabled != null) {
            this.setDisabled(disabled);
        }

        if (labelSeparator != null) {
            this.setLabelSeparator(labelSeparator);
        }

        if (label != null) {
            this.setLabel(label);
        }

        if (labelWidth != null) {
            this.setLabelWidth(labelWidth);
        }

        this.setLabelAlignment(labelAlignment || this.labelAlignment);
        this.refreshLabel();
    }

    protected refreshLabel() {
        const { label, eLabel } = this;
        _clearElement(eLabel);

        if (typeof label === 'string') {
            // eslint-disable-next-line no-restricted-properties -- Could swap to textContent, but could be a breaking change
            eLabel.innerText = label + this.labelSeparator;
        } else if (label) {
            eLabel.appendChild(label);
        }

        if (label === '') {
            _setDisplayed(eLabel, false);
            _setAriaRole(eLabel, 'presentation');
        } else {
            _setDisplayed(eLabel, true);
            _setAriaRole(eLabel, null);
        }
    }

    public setLabelSeparator(labelSeparator: string): this {
        if (this.labelSeparator === labelSeparator) {
            return this;
        }

        this.labelSeparator = labelSeparator;

        if (this.label != null) {
            this.refreshLabel();
        }

        return this;
    }

    public getLabelId(): string {
        const eLabel = this.eLabel;
        eLabel.id = eLabel.id || `ag-${this.getCompId()}-label`;

        return eLabel.id;
    }

    public getLabel(): HTMLElement | string {
        return this.label;
    }

    public setLabel(label: HTMLElement | string): this {
        if (this.label === label) {
            return this;
        }

        this.label = label;

        this.refreshLabel();

        return this;
    }

    public setLabelAlignment(alignment: LabelAlignment): this {
        const eGui = this.getGui();
        const eGuiClassList = eGui.classList;

        eGuiClassList.toggle('ag-label-align-left', alignment === 'left');
        eGuiClassList.toggle('ag-label-align-right', alignment === 'right');
        eGuiClassList.toggle('ag-label-align-top', alignment === 'top');

        return this;
    }

    public setLabelEllipsis(hasEllipsis: boolean): this {
        this.eLabel.classList.toggle('ag-label-ellipsis', hasEllipsis);

        return this;
    }

    public setLabelWidth(width: number | 'flex'): this {
        if (this.label == null) {
            return this;
        }

        _setElementWidth(this.eLabel, width);

        return this;
    }

    public setDisabled(disabled: boolean): this {
        disabled = !!disabled;

        const element = this.getGui();

        _setDisabled(element, disabled);
        element.classList.toggle('ag-disabled', disabled);

        this.disabled = disabled;

        return this;
    }

    public isDisabled(): boolean {
        return !!this.disabled;
    }
}
