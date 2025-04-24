import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IAcFilterCondition, IAcFilterField, IAcFilterGroup } from '../interfaces/ac-filter-field.interface';
import { AcEnumFilterComparisonOperator, AcEnumFilterLogicalOperator } from '../enums/ac-filter-operators.enum';
import { Autocode } from '@ac_packages/autocode';
import { AcBase } from '../../_base/ac-base.component';
import { AcDataController } from '../../utilities/ac-data-controller';

@Component({
  selector: 'ac-filters',
  templateUrl: './ac-filters.component.html',
  styleUrl: './ac-filters.component.css',
  standalone: false
})
export class AcFiltersComponent extends AcBase implements OnChanges{
  private _dataController:AcDataController  = new AcDataController();
  get dataController(): AcDataController { return this._dataController; }
  @Input() set dataController(value: AcDataController) {
    this._dataController = value;
  }
  @Input() fields: IAcFilterField[] = [];
  AcEnumFilterComparisonOperator = AcEnumFilterComparisonOperator;
  filterFields: any[] = [];
  get filters(): IAcFilterGroup {
    let result: IAcFilterGroup = this.getFilterGroupObject();
    return result;
  };
  conditions: IAcFilterCondition[] = [
  ];
  comparisonOperatorsWithoutValues: AcEnumFilterComparisonOperator[] = [
    AcEnumFilterComparisonOperator.isEmpty,
    AcEnumFilterComparisonOperator.isNull,
    AcEnumFilterComparisonOperator.isNotNull
  ];
  comparisonOperators: any[] = [];
  logicalOperators: any[] = [];

  ngOnChanges(changes:SimpleChanges){
    console.log(changes);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setComparisonOperators();
    this.setFields();
    this.setLogicalOperators();
  }

  applyFilter(){
    this.dataController.applyDataFilter();
  }

  getFilterGroupObject(): IAcFilterGroup {
    let result: IAcFilterGroup = { operator: AcEnumFilterLogicalOperator.and, conditions: [] };
    for (let condition of this.conditions) {
      if (Autocode.validValue(condition.field) && Autocode.validValue(condition.operator)) {
        if(Autocode.validValue(condition.value) || this.comparisonOperatorsWithoutValues.includes(condition.operator))
        result.conditions!.push({ ...condition });
      }
    }
    return result;
  }

  setComparisonOperators(): void {
    this.comparisonOperators = [];
    let comparisonOperators: any = Autocode.enumToObject(AcEnumFilterComparisonOperator);
    for (let key of Object.keys(comparisonOperators)) {
      this.comparisonOperators.push({ "label": key, "value": comparisonOperators[key] });
    }
  }

  setDataManager(){

  }

  setFields(): void {
    if(this.fields.length > 0){
      this.filterFields = [];
      for (let field of this.fields) {
        let option: any = {
          'label': field.field,
          'value': field.field
        };
        if (field.title) {
          option["label"] = field.title;
        }
        this.filterFields.push(option);
      }
    }
    else{
      setTimeout(() => {
        this.setFields();
      }, 500);
    }
  }

  setLogicalOperators(): void {
    this.logicalOperators = [];
    let logicalOperators: any = Autocode.enumToObject(AcEnumFilterLogicalOperator);
    for (let key of Object.keys(logicalOperators)) {
      this.logicalOperators.push({ "label": key, "value": logicalOperators[key] });
    }
  }



}
