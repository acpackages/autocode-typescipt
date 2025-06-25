import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcInputComponent } from './ac-input/ac-input.component';
import { AcOptionComponent } from './ac-option/ac-option.component';
import { AcSelectComponent } from './ac-select/ac-select.component';
import { AcTextareaComponent } from './ac-textarea/ac-textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcBaseInput } from '../_base/ac-base-input.component';
import { AcSelectOptionComponent } from './ac-select/ac-select-option/ac-select-option.component';
import { AcArrayValuesComponent } from './ac-array-values/ac-array-values.component';
import { AcArrayValueItemComponent } from './ac-array-values/ac-array-value-item/ac-array-value-item.component';
import { AcArrayValueItemsComponent } from './ac-array-values/ac-array-value-items/ac-array-value-items.component';
import { AcFilePreviewComponent } from './ac-files/ac-file-preview/ac-file-preview.component';
import { AcFilesComponent } from './ac-files/ac-files.component';
import { AcAngularModule } from '../ac-angular.module';

@NgModule({
  declarations: [
    AcArrayValueItemComponent,
    AcArrayValueItemsComponent,
    AcArrayValuesComponent,
    AcBaseInput,
    AcFilePreviewComponent,
    AcFilesComponent,
    AcInputComponent,
    AcOptionComponent,
    AcSelectComponent,
    AcSelectOptionComponent,
    AcTextareaComponent
  ],
  exports: [
    AcArrayValueItemsComponent,
    AcArrayValuesComponent,
    AcBaseInput,
    AcFilePreviewComponent,
    AcFilesComponent,
    AcInputComponent,
    AcOptionComponent,
    AcSelectComponent,
    AcSelectOptionComponent,
    AcTextareaComponent
  ],
  imports: [
    AcAngularModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AcInputsModule { }
