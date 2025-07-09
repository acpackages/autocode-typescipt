/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/prefer-standalone */
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'action-column',
    templateUrl: './action-column.component.html',
    styleUrl: './action-column.component.scss',
    standalone: false
})
export class ActionColumnComponent {
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  context:any = {}

  constructor(){
    // console.log(this);
    console.log(this);
  }

  handleDelete(event:any){
    event.preventDefault();
    alert("On Delete Clicked");
    this.onDelete.emit();
  }

  handleEdit(event:any){
    event.preventDefault();
    alert("On Edit Clicked");
    this.onEdit.emit();
  }
}
