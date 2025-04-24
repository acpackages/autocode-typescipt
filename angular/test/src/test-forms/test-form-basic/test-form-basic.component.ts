import { Component } from '@angular/core';
@Component({
  selector: 'app-test-form-basic',
  templateUrl: './test-form-basic.component.html',
  styleUrl: './test-form-basic.component.scss',
  standalone: false
})
export class TestFormBasicComponent {
  record: any = {
    "first_name": "John",
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
  mealPreferences:string[] = ["Chinese","Indian","Italian","Pujabi","South Indian","Rajasthani","Gujarati"];
  constructor() {
    setTimeout(() => {
      // this.setRecordValues();
    }, 3500);
  }

  handleSubmit() {
    console.log(this.record, this);
  }

  setRecordValues() {
    this.record = {
      "first_name": "John",
      "middle_name": "Parser",
      "last_name": "Maclain",
      "gender": "MALE",
      "about": "Background Artist in one of most famous hollywood movie that majority of people does not know.",
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
    console.log("Record Set");
  }
}
