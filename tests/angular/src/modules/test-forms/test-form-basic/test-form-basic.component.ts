/* eslint-disable @angular-eslint/prefer-standalone */
import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
@Component({
  selector: 'app-test-form-basic',
  templateUrl: './test-form-basic.component.html',
  styleUrl: './test-form-basic.component.scss',
  standalone: false
})
export class TestFormBasicComponent {
  record: any = {
    "first_name": "John",
    "account_id":"1727675470511",
    "middle_name": "Parser",
    "last_name": "Maclain",
    "gender": "MALE",
    "dob":"2025-05-05 18:15:17",
    "about": "Background Artist in one of most famous hollywood movie that majority of people does not know.",
    "maritial_status":"Married",
    "meal_preferences":["Indian","Chinese"],
    "phone": [
      { "label": "Home", "value": "026813549888" },
      { "label": "Mobile", "value": "9173314413" }
    ],
    "email": [
      { "label": "Personal", "value": "personal@email.com" },
      { "label": "Office", "value": "office@email.com" }
    ],
    "website": [
      { "label": "Personal", "value": "personalwebsite.com" },
      { "label": "Corporate", "value": "corporatewebsite.com" }
    ],
  };
  maritialStatuses:string[] = ["Single","Engaged","Married","Divorced","Widowed","Other"];
  mealPreferences:string[] = ["Chinese","Indian","Italian","Punjabi","South Indian","Rajasthani","Gujarati"];
  constructor() {
    setTimeout(() => {
      this.setRecordValues();
    }, 5500);
  }

  handleSubmit() {
    console.log(this.record, this);
  }

  setRecordValues() {
    this.record = {
      "first_name": "Jenny",
      "middle_name": "Teresa",
      "last_name": "Parker",
      "gender": "FEMALE",
      "account_id":"1727675470634",
      "about": "Background Artist in one of most famous hollywood movie that majority of people does not know.",
      "meal_preferences":["Punjabi","South Indian"],
      "phone": [
        { "label": "Mobile", "value": "9173314413" },
        { "label": "Home", "value": "026813549888" }
      ],
      "email": [
        { "label": "Office", "value": "office@email.com" },
        { "label": "Personal", "value": "personal@email.com" }
      ],
      "website": [
        { "label": "Corporate", "value": "corporatewebsite.com" },
        { "label": "Personal", "value": "personalwebsite.com" }
      ],
    };
    console.log("Record Set");
  }

  public countryColumnDefs: ColDef[] = [
    { headerName: "Country", field: "name", sortable: true, filter: true, flex: 2 },
    { headerName: "Code", field: "code", sortable: true, filter: true, flex: 1 },
    { headerName: "Capital", field: "capital", sortable: true, filter: true, flex: 2 }
  ];

  public countryRowData = [
    { name: "United States", code: "US", capital: "Washington, D.C." },
    { name: "United Kingdom", code: "GB", capital: "London" },
    { name: "Canada", code: "CA", capital: "Ottawa" },
    { name: "Australia", code: "AU", capital: "Canberra" },
    { name: "Japan", code: "JP", capital: "Tokyo" },
    { name: "Germany", code: "DE", capital: "Berlin" },
    { name: "France", code: "FR", capital: "Paris" }
  ];

  onCountrySelected(country: any) {
    console.log('Selected Country:', country);
    // You can now handle the selected country object here
  }

}
