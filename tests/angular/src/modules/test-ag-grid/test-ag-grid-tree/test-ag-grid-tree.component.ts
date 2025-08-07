/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, ViewChild } from '@angular/core';
import { IAcDataGridColumn } from 'packages/angular/ac-angular/src';
import { ActionColumnComponent } from 'tests/angular/src/components/action-column/action-column.component';
import { AcDatagridOnAgGridComponent } from 'packages/angular/ac-ng-datagrid-on-aggrid/src/lib/components/ac-datagrid-on-ag-grid/ac-datagrid-on-ag-grid.component';
import { developmentTaskData } from '../../data/development-tasks';

@Component({
  selector: 'app-test-ag-grid-tree',
  standalone: false,
  templateUrl: './test-ag-grid-tree.component.html',
  styleUrl: './test-ag-grid-tree.component.scss'
})
export class TestAgGridTreeComponent {
  @ViewChild("dataGrid") dataGrid: AcDatagridOnAgGridComponent;
  columns: IAcDataGridColumn[] = [
    {
      field: "title",
      title: "Title",
      allowRowDrag: true,
      allowSort: false,
      allowFilter: false,
      allowSelect: true,
      showGroupChildCount: true
    },
    {
      field: "assignee",
      title: "Assignee",
      allowSort: false,
      allowFilter: false
    },
    {
      field: "action",
      title: "Action",
      component: ActionColumnComponent
    },
  ];
  data: any[] = [];

  ngOnInit() {
    console.log(this);
    setTimeout(() => {
      this.data = developmentTaskData;
    }, 10);
  }

  handleActiveRowChange(event: any) {
    console.log("Active Row Change", event);
  }

  handleCellFocused(event: any) {
    console.log("Cell Focused", event);
  }

  handleCellRenderComponentInit(event: any) {
    if (event.component) {
      if (event.component == ActionColumnComponent) {
        if (event.componentInstance) {
          event.componentInstance.onDelete.subscribe(params => {
            this.handleDeleteRow(event.data);
          });
          event.componentInstance.onEdit.subscribe(params => {
            this.handleEditRow(event.data);
          });
        }
      }
    }
  }

  handleCellValueChanged(event: any) {
    console.log("Cell Value Changed", event);
  }

  handleDeleteRow(data: any) {
    ;
    this.dataGrid.deleteRow({ data: data });
  }

  handleEditRow(data: any) {
    ;
    const updatedData: any = { ...data, title: 'Updated Name : ' + data['title'] };
    this.dataGrid.updateRow({ data: updatedData, key: 'id' });
  }

  handleGetGroupedData(){
    console.log(this.dataGrid.getGroupedData());
  }

  handleRowAdded(event: any) {
    console.log("Row Added", event);
  }

  handleRowDataModified(event: any) {
    console.log("Row Data Modified", event);
  }

  handleRowDeleted(event: any) {
    console.log("Row Deleted", event);
  }

  handleRowDragStart(event: any) {
    console.log("Row Drag Start", event);
  }

  handleRowDragEnd(event: any) {
    console.log("Row Drag End", event);
  }

  handleRowFocus(event: any) {
    console.log("Row Focused", event);
  }

  handleRowSelected(event: any) {
    console.log("Row Selected", event);
  }

  handleRowUpdated(event: any) {
    console.log("Row Updated", event);
  }

  handleSearchUpdated() {
    console.log("Search Updated");
  }
}
