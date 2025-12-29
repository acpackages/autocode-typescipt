/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/prefer-inject */
import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Makes any custom HTML element that exposes a `value` property
 * and fires `input` / `change` events compatible with [(ngModel)].
 */
@Directive({
  // Matches any element with both ngModel and a value property
  selector: '[ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcNgValueAccessorDirective),
      multi: true,
    },
  ],
})
export class AcNgValueAccessorDirective implements ControlValueAccessor {
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };
  private _tempValue:any;

  constructor(private el: ElementRef<HTMLElement>) {
    //
  }

  /** Angular → Element */
  writeValue(value: any): void {
    const el: any = this.el.nativeElement;
    if ('value' in el) {
      el.value = value;
    } else {
      el.setAttribute('value', value);
    }
  }

  /** Register callbacks */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const el: any = this.el.nativeElement;
    if ('disabled' in el) el.disabled = isDisabled;
    else el.setAttribute('disabled', isDisabled ? '' : null);
  }

  @HostListener('input', ['$event'])
  @HostListener('change', ['$event'])
  handleInput(event: Event) {
    const target = this.el.nativeElement as any;
    const value = target?.value ?? target?.getAttribute?.('value');
    if(this._tempValue != value){
      this.onChange(value);
    }
    this._tempValue = value;
  }

  @HostListener('blur')
  handleBlur() {
    this.onTouched();
  }
}
