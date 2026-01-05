/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, ElementRef,forwardRef, Input, ViewChild } from '@angular/core';
// import { AcBaseInput, AutocodeService, IAcDataGridColumn, IAcDataGridDataOnDemandParams, IAcDataGridDataOnDemandResponse } from 'packages/angular/ac-angular/src';
import { ActionColumnComponent } from '../action-column/action-column.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AcDatagridDropdownOnAgGrid } from 'packages/angular/ac-ng-datagrid-on-aggrid/src/lib/components/ac-datagrid-dropdown-on-aggrid/ac-datagrid-dropdown-on-aggrid.component';

@Component({
    selector: 'select-account-input',
    templateUrl: './select-account-input.component.html',
    styleUrl: './select-account-input.component.scss'
})
export class SelectAccountInputComponent {
//
}
