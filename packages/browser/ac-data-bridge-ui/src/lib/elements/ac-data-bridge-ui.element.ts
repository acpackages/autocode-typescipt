import { AcDataBridge } from '@autocode-ts/ac-data-bridge';
import { ACI_SVG_SOLID } from '@autocode-ts/ac-icons';
import { AcElement, AcEventEmitter, AcInput, AcOutput } from '@autocode-ts/ac-runtime';
@AcElement({
  selector: 'ac-data-bridge-ui',
  template: `
  <!-- eslint-disable @angular-eslint/template/eqeqeq -->
  <ac-container ac:if="dataBridge.currentStage == 'COMPLETED'">
    <div class="completed-message">
      <div class="max-w-2xl mx-auto" style="cursor:pointer">

        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Data conversion completed!</h1>
          <p class="text-gray-600 mt-2">Data conversion process has been completed</p>
        </div>
        <div
          class="border-4 border-dashed border-gray-300 rounded-2xl p-16 text-center cursor-pointer transition-all duration-200 hover:border-gray-400">

          <label for="excel-input" class="cursor-pointer text-success">
            <ac-svg-icon style="height: 150px;width:auto;" ac:bind:svg-code="ACI_SVG_SOLID.checkToSlot"></ac-svg-icon>
          </label>
          <div class="mb-5">
            <!-- - or - -->
          </div>
          <div>
            <!-- <button type="button" class="btn btn-dark">Download JSON of SQL Operations</button> -->
          </div>
        </div>
      </div>
    </div>
  </ac-container>
  <ac-container ac:if="dataBridge.currentStage == 'ERROR'">
    <div class="completed-message">
      <div class="max-w-2xl mx-auto" style="cursor:pointer">

        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800">Error converting data!</h1>
          <p class="text-gray-600 mt-2">There was error converting data! Please try again!</p>
        </div>
        <div
          class="border-4 border-dashed border-gray-300 rounded-2xl p-16 text-center cursor-pointer transition-all duration-200 hover:border-gray-400">

          <label for="excel-input" class="cursor-pointer text-danger">
            <ac-svg-icon style="height: 150px;width:auto;" ac:bind:svg-code="ACI_SVG_SOLID.triangleExclamation"></ac-svg-icon>
          </label>
          <div class="mb-5">
            <!-- - or - -->
          </div>
          <div>
            <!-- <button type="button" class="btn btn-dark">Download JSON of SQL Operations</button> -->
          </div>
        </div>
      </div>
    </div>
  </ac-container>
  <ac-container ac:if="dataBridge.currentStage == 'NONE'">
    <upload-file [dataBridge]="dataBridge" (downloadTemplate)="handleDownloadTemplate()"></upload-file>
  </ac-container>
  <ac-container ac:if="dataBridge.currentStage == 'DATA_SET'">
    <source-destination-mapping [dataBridge]="dataBridge"></source-destination-mapping>
  </ac-container>
  <ac-container ac:if="dataBridge.currentStage == 'PROCESSING'">
    <data-processing [dataBridge]="dataBridge"></data-processing>
  </ac-container>
  <ac-container ac:if="['READY_TO_CONVERT','CONVERTING'].includes(dataBridge.currentStage)">
    <convert-to-destination [dataBridge]="dataBridge"
      (convertedOutput)="handleConvertedOutput($event)"></convert-to-destination>
  </ac-container>

  `,
  styles: `
  :host{
    height: 100%;
    display: block;
  }
  .completed-message{
    display: flex;
    height: 100%;
    align-items: center;
  }
  `
})
export class AcDatabridgeUIElement {
  @AcInput() dataBridge?: AcDataBridge;
  @AcOutput() downloadTemplate: AcEventEmitter<any> = new AcEventEmitter();
  @AcOutput() convertedOutput: AcEventEmitter<any> = new AcEventEmitter();

  ACI_SVG_SOLID = ACI_SVG_SOLID;

  get currentStage(): string {
    let result = '';
    if (this.dataBridge) {
      result = this.dataBridge.currentStage;
    }
    return result;
  }

  handleConvertedOutput(data: any) {
    this.convertedOutput.emit(data);
  }

  handleDownloadTemplate() {
    this.downloadTemplate.emit();
  }
}
