import { AcEvents, AcLogger } from '@ac_packages/autocode';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AutocodeService } from '../services/autocode.service';
import { IAcInputValidation } from '../ac-inputs/interfaces/ac-input-validations.interface';
import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
import { AcCommentElementTagDirective } from '../directives/ac-comment-element-tag.directive';
import { IAcInputEvent } from '../ac-inputs/interfaces/ac-input-event.interface';
import { AcBase } from './ac-base.component';

@Component({
    selector: 'ac-base-for-input',
    template: '<span></span>',
    standalone: false
})
export class AcBaseInput extends AcBase implements OnChanges,ControlValueAccessor, Validator{
  @Input() autoFocus:boolean = false;
  @Input() class:string = "";
  @Input() defaultValue:any;
  @Input() disabled:boolean = false;
  @Input() field:string = "";
  @Input() name:string = "";
  @Input() placeholder:string = "";
  @Input() readonly:boolean = false;
  @Input() record:any = {};
  @Input() reflectingRecords:any = {};
  @Input() validation:IAcInputValidation = {};
  @Input() style:string = "";
  protected _value: any;
  get value(): any { return this._value; }

  @Input() set value(value: any) {
    let object = this; object.setValue(value); }

  @Output() onBlur:EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onChange:EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onClick:EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onDestroy:EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onFocus:EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onInit:EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onKeyDown:EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onKeyUp:EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onViewInit:EventEmitter<IAcInputEvent> = new EventEmitter();

  commentElementTag: boolean = true;
  hasValidationErrors: boolean = false;
  onChangeCallback: any = () => { };
  onTouchedCallback: any = () => { };
  validationErrors: any = {};

  constructor(public elementRef:ElementRef,public autocodeAngular:AutocodeService){
    super(elementRef,autocodeAngular);
    this.events.register("elementTagCommented",()=>{
      if(this.autoFocus){
        for(let child of this.elementChildren){
          child.focus();
        }
      }
    });
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["record"]){
      this.setValueFromRecord();
    }
  }

  handleBlur(event:any){
    let eventDetails:IAcInputEvent = {
      event:event,
      instance:this
    };
    this.onBlur.emit(eventDetails);
    this.events.execute("blur",eventDetails);
  }

  handleChange(event:any){
    let eventDetails:IAcInputEvent = {
      event:event,
      instance:this
    };
    this.onChange.emit(this.value);
    this.events.execute("change",this.value);
  }

  handleClick(event:any){
    let eventDetails:IAcInputEvent = {
      event:event,
      instance:this
    };
    this.onClick.emit(eventDetails);
    this.events.execute("click",eventDetails);
  }

  handleFocus(event:any){
    let eventDetails:IAcInputEvent = {
      event:event,
      instance:this
    };
    this.onFocus.emit(eventDetails);
    this.events.execute("focus",eventDetails);
  }

  handleKeyDown(event:any){
    let eventDetails:IAcInputEvent = {
      event:event,
      instance:this
    };
    this.onKeyDown.emit(eventDetails);
    this.events.execute("keyDown",eventDetails);
  }

  handleKeyUp(event:any){
    let eventDetails:IAcInputEvent = {
      event:event,
      instance:this
    };
    this.onKeyUp.emit(eventDetails);
    this.events.execute("keyUp",eventDetails);
  }

  setFormControlValue(value: any) {
    this.onChangeCallback(value);
    this.onTouchedCallback();
  }

  setValue(value: any) {
    this._value = value;
    if(this.record){
      this.record[this.field] = value;
    }
    this.setFormControlValue(value);
  }

  setValueFromRecord(){
    if(this.record){
      this.value = this.record[this.field];
    }
  }

  validateRequired() {
    return this.value == "" || this.value == null || this.value == undefined;
  }

  /* FUNCTIONS FOR NGFORM & FORM START */

  writeValue(value: any): void {
  }

  registerOnChange(fn: any): void {
    // this.handleChange(this.value);
    this.onChangeCallback = fn;
    this.onChangeCallback(this.value);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  updateValue(event: any): void {
  }

  validate(control: FormControl) {
    let object = this;
    let errors: any = {};
    if (this.validation.required) {
      let required = object.validateRequired();
      if (required) {
        errors['required'] = true;
      }
    }
    object.hasValidationErrors = Object.keys(errors).length > 0;
    object.validationErrors = errors;
    return null;
  }

  /* FUNCTIONS FOR NGFORM & FORM END */
}
