/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AcArrayValuesComponent } from '../ac-array-values.component';
import { AcCommentElementTagDirective } from '../../../directives/ac-comment-element-tag.directive';

@Component({
  selector: 'ac-array-value-item',
  templateUrl: './ac-array-value-item.component.html',
  styleUrl: './ac-array-value-item.component.css',
  standalone: false
})
export class AcArrayValueItemComponent extends AcCommentElementTagDirective implements AfterViewInit, OnInit {
  @Input() arrayValuesComponent!: AcArrayValuesComponent;
  @Input() index: number = -1;
  @Input() item: any = {};
  @Input() template!: TemplateRef<any>;
  @Output() onItemChange:EventEmitter<any> = new EventEmitter();
  notifiedChanged: boolean = false;
  previousItem: any = {};


  override ngOnInit(){
    this.previousItem = {...this.item};
    super.ngOnInit();
  }

  override ngAfterViewInit(): void {
    this.checkChanged();
    super.ngAfterViewInit();
  }

  checkChanged() {
    if (!this.checkIsSame()) {
      this.notifiedChanged = true;
      this.previousItem = { ...this.item };
      this.onItemChange.emit();
      // this.arrayValuesComponent.updateValueInRecord();
    }
    setTimeout(() => {
      this.checkChanged();
    }, 100);
  }

  checkIsSame() {
    let result = true;
    const objectA: any = this.item;
    const compareObject: any = this.previousItem;
    const objectAKeys = Object.keys(objectA);
    const objectBKeys = Object.keys(compareObject);
    objectAKeys.forEach(key => {
      if (JSON.stringify(objectA[key]) != JSON.stringify(compareObject[key])) {
        result = false;
      }
    });
    objectBKeys.forEach(key => {
      if (JSON.stringify(compareObject[key]) != JSON.stringify(objectA[key])) {
        result = false;
      }
    });
    return result;
  }
}
