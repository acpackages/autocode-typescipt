/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { AcDataBridge } from '@autocode-ts/ac-data-bridge';
import { ACI_SVG_SOLID } from '@autocode-ts/ac-icons';

@Component({
  selector: 'upload-file',
  standalone:false,
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
})
export class UploadFileComponent {
  @Input() dataBridge:AcDataBridge;

  @Output() downloadTemplate:EventEmitter<any> = new EventEmitter();

  ACI_SVG_SOLID = ACI_SVG_SOLID;
  isDragging = signal(false);

  handleDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  handleDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  handleFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  handleDownloadXlsxTemplate() {
    this.downloadTemplate.emit()
  }

   private async processFile(file: File) {
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      // AcMessage.error({ message: 'Please upload a valid Excel file (.xlsx or .xls)' });
      return;
    }
    try {
      // Read to transferable buffer in main thread
      const buffer = await file.arrayBuffer();
      const sheets = await this.dataBridge.setData({ buffer });
      // this.sheets = sheets;
    } catch (error) {
      // AcMessage.error({ message: 'Error processing file: ' + (error as Error).message });
    }
    // App.showLoader = false;
  }
}
