import { Component, ViewEncapsulation } from '@angular/core';
import { dataDictionaryJson } from '../../data/data_dictionary';
import { acWatchForChanges } from '../../../../packages/ac-data-dictionary-designer/src/lib/utilities/ac-watch';
@Component({
  selector: 'app-test-datagrid',
  templateUrl: './test-datagrid.component.html',
  styleUrl: './test-datagrid.component.scss',
  standalone:false,
  encapsulation:ViewEncapsulation.None
})
export class TestDatagridComponent {
  dataDictionary = dataDictionaryJson;
  data:any = {};
  ngOnInit(){
    acWatchForChanges(this.data);
    this.data.on("change", (changes: any) => {
      console.log("changes", changes);
    });

    this.data.test = 1;   // { type: "add", key: "test", value: 1 }
    this.data.test = 2;   // { type: "update", key: "test", value: 2 }
    this.data.welcome = 2; // { type: "add", key: "welcome", value: 2 }

    // this.data.list.push(5); // { type: "array", method: "push", args: [5] }
    delete this.data.test;  //
    console.log(this.data);
  }
}
