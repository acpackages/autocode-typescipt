import { Component, ViewChild } from '@angular/core';
import { IAcFilterField, IAcFilterGroup } from '../../../../packages/autocode-angular/src/lib/ac-filters/interfaces/ac-filter-field.interface';
import { AcEnumFilterComparisonOperator, AcEnumFilterLogicalOperator } from '../../../../packages/autocode-angular/src/lib/ac-filters/enums/ac-filter-operators.enum';
import { AcFiltersComponent } from '../../../../packages/autocode-angular/src/lib/ac-filters/ac-filters/ac-filters.component';

@Component({
    selector: 'app-test-filters-basic',
    templateUrl: './test-filters-basic.component.html',
    styleUrl: './test-filters-basic.component.scss',
    standalone: false
})
export class TestFiltersBasicComponent {
  @ViewChild(AcFiltersComponent)
  filtersComponent!: AcFiltersComponent;
  filters:IAcFilterGroup = {
    operator:AcEnumFilterLogicalOperator.and,
    filterGroups:[
      {
        operator:AcEnumFilterLogicalOperator.and,
        conditions:[
          {field:'name',operator:AcEnumFilterComparisonOperator.equals,value:'Sanket'},
          {field:'gender',operator:AcEnumFilterComparisonOperator.equals,value:'MALE'},
        ]
      },
      {
        operator:AcEnumFilterLogicalOperator.or,
        conditions:[
          {field:'name',operator:AcEnumFilterComparisonOperator.equals,value:'Sanket'},
          {field:'gender',operator:AcEnumFilterComparisonOperator.equals,value:'MALE'},
        ]
      }
    ]
  };
  fields:IAcFilterField[] = [
    {
      field:"id"
    },
    {
      field:"name"
    },
    {
      field:"gender"
    },
    {
      field:"dateOfBirth"
    },
    {
      field:"hobbies"
    },
    {
      field:"about"
    }
  ];

  handleGetFiltersObject(){
    console.log(this.filtersComponent.filters);
  }
}
