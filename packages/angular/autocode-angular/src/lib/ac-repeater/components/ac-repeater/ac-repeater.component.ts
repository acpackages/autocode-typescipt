/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { AcBaseRepeater } from '../../../_base/ac-base-repeater.component';

@Component({
    selector: 'ac-repeater',
    templateUrl: './ac-repeater.component.html',
    styleUrl: './ac-repeater.component.css',
    standalone: false
})
export class AcRepeaterComponent extends AcBaseRepeater{

}
