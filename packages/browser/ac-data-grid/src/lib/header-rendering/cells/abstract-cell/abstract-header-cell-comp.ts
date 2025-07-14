import type { ElementParams } from '../../../utils/dom';
import { Component } from '../../../widgets/component';
import type { AbstractHeaderCellCtrl } from './abstractHeaderCellCtrl';

export abstract class AcDGAbstractHeaderCellComp<T extends AbstractHeaderCellCtrl> extends Component {
    protected ctrl: T;

    constructor(template: ElementParams, ctrl: T) {
        super(template);
        this.ctrl = ctrl;
    }

    public getCtrl(): T {
        return this.ctrl;
    }
}
