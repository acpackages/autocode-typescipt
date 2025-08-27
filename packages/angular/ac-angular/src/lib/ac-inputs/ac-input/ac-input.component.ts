/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AcBaseInput } from '../../_base/ac-base-input.component';
import { IAcInputEvent } from '../interfaces/ac-input-event.interface';

@Component({
  selector: 'ac-input',
  templateUrl: './ac-input.component.html',
  styleUrl: './ac-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AcInputComponent),
      multi: true
    }
  ],
  standalone: false
})
export class AcInputComponent extends AcBaseInput implements AfterViewInit {
  @ViewChild("input") input!: ElementRef;
  @Input() type: string = "text";
  @Output() onDoneTyping: EventEmitter<IAcInputEvent> = new EventEmitter();

  override handleKeyUp(event: any) {
    super.handleKeyUp(event);
    const eventDetails: IAcInputEvent = {
      event: event,
      instance: this
    };
    this.onDoneTyping.emit(eventDetails);
    this.events.execute({event:"doneTyping", args:eventDetails});
  }
}
