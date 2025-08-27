/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AcBaseInput } from '../../_base/ac-base-input.component';
import { IAcFileUploadParams } from '../interfaces/ac-file-upload-params.interface';
import { IAcFileErrorEvent } from '../interfaces/ac-file-error-event.interface';
import { AcEnumFileErrorType } from '../enums/ac-file-error-types.enum';

@Component({
  selector: 'ac-files',
  templateUrl: './ac-files.component.html',
  styleUrl: './ac-files.component.css',
  standalone:false
})
export class AcFilesComponent extends AcBaseInput {
  @ViewChild("input") input!: ElementRef;
  @Input() accept:string = '*/*';
  @Input() autoUpload: boolean = true;
  @Input() maxFileSize: number = 3;
  @Input() multiple: boolean = true;
  @Input() uploadFunction: Function|undefined;
  @Input() files:any[] = [];
  @Output() onError = new EventEmitter<IAcFileErrorEvent>();

  override async handleChange(event: any) {
    if (event.target.files) {
      const files = event.target.files;
      for (const file of files) {
        if (this.validateFileSize(file)) {
          if (this.autoUpload && this.uploadFunction) {
            const uploadParams:IAcFileUploadParams = {
              event:event,
              file:file,
              instance:this
            };
            await this.uploadFunction(uploadParams);
          }
          else {
            this.files.push(file);
          }
        }
      }
    }
  }

  validateFileSize(file: any) {
    const maxSizeAllowed = this.maxFileSize * 1000000;
    const uploadedFileSize = file.size;
    const valid = uploadedFileSize < maxSizeAllowed;
    if (!valid) {
      const eventDetails:IAcFileErrorEvent = {
        instance:this,
        file:file,
        errorType:AcEnumFileErrorType.fileSize
      }
      this.onError.emit(eventDetails);
      this.events.execute({event:'error',args:eventDetails});
    }
    return valid;
  }
}
