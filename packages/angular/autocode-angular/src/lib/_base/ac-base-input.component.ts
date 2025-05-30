/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { AutocodeService } from '../services/autocode.service';
import { IAcInputValidation } from '../ac-inputs/interfaces/ac-input-validations.interface';
import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
import { IAcInputEvent } from '../ac-inputs/interfaces/ac-input-event.interface';
import { AcBase } from './ac-base.component';

@Component({
  selector: 'ac-base-for-input',
  template: '<span></span>',
  standalone: false
})
export class AcBaseInput extends AcBase implements ControlValueAccessor, Validator {
  @Input() autoFocus: boolean = false;
  @Input() class: string = "";
  @Input() defaultValue: any;
  @Input() disabled: boolean = false;
  @Input() name: string = "";
  @Input() placeholder: string = "";
  @Input() readonly: boolean = false;
  @Input() reflectingRecords: any = {};
  @Input() validation: IAcInputValidation = {};
  @Input() style: string = "";
  protected _value: any;
  get value(): any { return this._value; }

  @Input() set value(value: any) {
    const object = this; object.setValue(value);
    this.valueChange.emit(this._value);
  }

  @Output() onBlur: EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onChange: EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onClick: EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() override onDestroy: EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onFocus: EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() override onInit: EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onKeyDown: EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() onKeyUp: EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() override onViewInit: EventEmitter<IAcInputEvent> = new EventEmitter();
  @Output() valueChange = new EventEmitter<any>();

  override commentElementTag: boolean = true;
  hasValidationErrors: boolean = false;
  onChangeCallback: any = () => { };
  onTouchedCallback: any = () => { };
  validationErrors: any = {};

  constructor(public override elementRef: ElementRef, public override autocodeService: AutocodeService) {
    super(elementRef, autocodeService);
    this.events.subscribe({eventName:"viewInit",callback:() => {
      setTimeout(() => {
        if (this.autoFocus) {
          for (const child of this.elementChildren) {
            child.focus();
          }
        }
      }, 10);
    }
    });
  }

  handleBlur(event: any) {
    const eventDetails: IAcInputEvent = {
      event: event,
      instance: this
    };
    this.onBlur.emit(eventDetails);
    this.events.execute({eventName:"blur",args:eventDetails});
  }

  handleChange(event: any) {
    this.onChange.emit(this.value);
    this.events.execute({eventName:"change", args:this.value});
  }

  handleClick(event: any) {
    const eventDetails: IAcInputEvent = {
      event: event,
      instance: this
    };
    this.onClick.emit(eventDetails);
    this.events.execute({eventName:"click", args:eventDetails});
  }

  handleFocus(event: any) {
    const eventDetails: IAcInputEvent = {
      event: event,
      instance: this
    };
    this.onFocus.emit(eventDetails);
    this.events.execute({eventName:"focus", args:eventDetails});
  }

  handleKeyDown(event: any) {
    const eventDetails: IAcInputEvent = {
      event: event,
      instance: this
    };
    this.onKeyDown.emit(eventDetails);
    this.events.execute({eventName:"keyDown", args:eventDetails});
  }

  handleKeyUp(event: any) {
    const eventDetails: IAcInputEvent = {
      event: event,
      instance: this
    };
    this.onKeyUp.emit(eventDetails);
    this.events.execute({eventName:"keyUp", args:eventDetails});
  }

  setFormControlValue(value: any) {
    this.onChangeCallback(value);
    this.onTouchedCallback();
  }

  setValue(value: any) {
    this._value = value;
    this.setFormControlValue(value);
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
    const object = this;
    const errors: any = {};
    if (this.validation.required) {
      const required = object.validateRequired();
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
