import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcRepeaterComponent } from './components/ac-repeater/ac-repeater.component';
import { AcRepeatingItemComponent } from './components/ac-repeating-item/ac-repeating-item.component';


@NgModule({
  declarations: [
    AcRepeaterComponent,
    AcRepeatingItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AcRepeaterModule { }
