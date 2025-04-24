import { Component, ContentChild, forwardRef, Input } from '@angular/core';
import { AcBaseInput } from '../../_base/ac-base-input.component';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AcArrayValueItemsComponent } from './ac-array-value-items/ac-array-value-items.component';

@Component({
    selector: 'ac-array-values',
    templateUrl: './ac-array-values.component.html',
    styleUrl: './ac-array-values.component.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AcArrayValuesComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AcArrayValuesComponent),
            multi: true
        }
    ],
    standalone: false
})
export class AcArrayValuesComponent extends AcBaseInput{
  @ContentChild(AcArrayValueItemsComponent) arrayValueItems?:AcArrayValueItemsComponent;
  @Input() items:any[] = [];

  override ngOnInit(): void {
    super.ngOnInit();
    this.initArrayValueItem();
  }

  override ngAfterViewInit(): void {
    this.registerInputActions();
  }

  public appendItem(item:any = {}) {
    this.items.push(item);
  }

  public appendItems(items:any[] = []) {
    for(let item of items){
      this.appendItem(item);
    }
  }

  public clearItems() {
    while(this.items.length > 0){
      this.items.splice(this.items.length-1,1);
    }
  }

  initArrayValueItem(){
    if(this.arrayValueItems){
      this.arrayValueItems.arrayValuesComponent = this;
    }
    else{
      setTimeout(() => {
        this.initArrayValueItem();
      }, 100);
    }
  }

  public prependItem(item = {}) {
    this.items.unshift(item);
  }

  registerInputActions(){
    let object = this;
    let nativeElement:Element = this.elementRef.nativeElement;
    let elementsAppend = nativeElement.querySelectorAll('[ac-array-value-append]');
    for(let element of elementsAppend ){
      element.addEventListener("click",function(e:any){
        object.appendItem({});
      });
    }
    let elementsPrepend = nativeElement.querySelectorAll('[ac-array-value-prepend]');
    for(let element of elementsPrepend ){
      element.addEventListener("click",function(e:any){
        object.prependItem({});
      });
    }
  }

  public removeItem(item:any){
    let object=this;
    console.log("Removing Item",item);
    let index=object.items.indexOf(item);
    if(index>=0){
      object.removeItemAtIndex(index);
    }
  }

  public removeItemAtIndex(index:number){
    let item = this.items[index];
    let removedDetails = {
      index: index,
      data: item,
    };
    this.items.splice(index,1);
  }

  override setValueFromRecord(): void {
    if(this.record && this.field){
      this.clearItems();
      this.appendItems(this.record[this.field]);
    }
  }

  updateValueInRecord(){
    if(this.record && this.field){
      this.record[this.field] = this.items;
    }
  }
}
