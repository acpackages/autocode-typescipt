/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
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
    for(const item of items){
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
    const object = this;
    const nativeElement:Element = this.elementRef.nativeElement;
    const elementsAppend:any = nativeElement.querySelectorAll('[ac-array-value-append]');
    for(const element of elementsAppend ){
      element.addEventListener("click",function(e:any){
        object.appendItem({});
      });
    }
    const elementsPrepend:any = nativeElement.querySelectorAll('[ac-array-value-prepend]');
    for(const element of elementsPrepend ){
      element.addEventListener("click",function(e:any){
        object.prependItem({});
      });
    }
  }

  public removeItem(item:any){
    const object=this;
    console.log("Removing Item",item);
    const index=object.items.indexOf(item);
    if(index>=0){
      object.removeItemAtIndex(index);
    }
  }

  public removeItemAtIndex(index:number){
    const item = this.items[index];
    const removedDetails = {
      index: index,
      data: item,
    };
    this.items.splice(index,1);
  }

  override setValue(value: any): void {
    if(value==undefined){
      value = [];
    }
    this._value = value;
    this.items = value;
  }

}
