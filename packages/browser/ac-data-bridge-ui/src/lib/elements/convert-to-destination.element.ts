/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDataBridge, IAcDataBridgeEntity, IAcDataBridgeProcesedRow } from '@autocode-ts/ac-data-bridge';
import { ACI_SVG_SOLID } from '@autocode-ts/ac-icons';
import { AcElement, AcEventEmitter, AcInput, AcOutput } from '@autocode-ts/ac-runtime';
@AcElement({
  selector: 'ac-data-bridge-convert-to-destination',
  template: `
  <!-- eslint-disable @angular-eslint/template/eqeqeq -->
  <ac-container ac:if="dataBridge">
    <div class="d-flex flex-fill flex-column">
      <div>
        <ac-container ac:template:outlet="progressTemplate; context: { progress: dataBridge.taskProgress }"></ac-container>
      </div>
      <div class="flex-fill">
        <ac-container ac:if="dataBridge.destinationEntities">
          <ac-container ac:for="let importDetails of (Object.values(dataBridge.destinationEntities))">
            <div class="card my-4">
              <div class="card-header p-2">
                <ac-svg-icon
                  ac:bind:svg-code="showRows[importDetails.templateName]?ACI_SVG_SOLID.chevronDown:ACI_SVG_SOLID.chevronRight"
                  class="me-2 toggle-icon"
                  (click)="showRows[importDetails.templateName] = showRows[importDetails.templateName]?false:true"></ac-svg-icon><b>{{importDetails.templateName}}</b>
                <div class="import-table-progress float-right" ac:if="importDetails.rowsCount > 0">
                  {{importDetails.completedCount}} of {{importDetails.rowsCount}}
                  <ac-container ac:if="importDetails.errorCount > 0">
                    <b class="text-danger">{{importDetails.errorCount}} Errors</b>
                  </ac-container>
                  <ac-container ac:if="importDetails.percentage < 100">
                    <c-progress [animated]="true" [value]="importDetails.percentage" color="danger" variant="striped">
                      {{importDetails.percentage}}
                    </c-progress>
                  </ac-container>
                  <ac-container ac:if="importDetails.percentage >= 100">
                    <span class="badge bg-success text-white "><ac-svg-icon
                        ac:bind:svg-code="ACI_SVG_SOLID.check"></ac-svg-icon>
                      Completed</span>
                  </ac-container>
                </div>
              </div>
              <ac-container ac:if="showRows[importDetails.templateName]">
                <div class="card-body p-0">
                  <ac-container
                    ac:template:outlet="importRowsTemplate; context: { importDetails:importDetails,cssClass:'import-rows-container' }"></ac-container>
                </div>
              </ac-container>
            </div>
          </ac-container>
        </ac-container>
      </div>
      <span class="mb-4">
        <button type="button" class="btn btn-dark" (click)="handleStartConverting()">Start Converting</button>
      </span>
    </div>

    <ac-template let-progress="progress" #progressTemplate>
      <div class="card my-2">
        <div class="card-body p-2 progress-body">
          <h5 class="mb-0">{{progress.title}}</h5>
          <div>{{progress.description}}</div>
          <ac-container ac:if="progress.percentage<100">
            <div class="my-1">
              <c-progress [animated]="true" [value]="progress.percentage" color="danger" variant="striped">
                {{progress.percentage}}
              </c-progress>
            </div>
          </ac-container>
          <p class="mb-1">{{progress.completedCount}} of {{progress.totalCount}}</p>
          <ac-container ac:if="progress.percentage >= 100">
            <span class="badge bg-success text-white mb-1"><ac-svg-icon
                ac:bind:svg-code="ACI_SVG_SOLID.check"></ac-svg-icon>
              Completed</span>
          </ac-container>
          <ac-container ac:if="progress.subTasksProgress">
            <ac-container ac:for="let item of Object.values(progress.subTasksProgress)">
              <ac-container ac:if="item && item['title']">
                <div class="ms-4 mt-4">
                  <ac-container
                    ac:template:outlet="progressTemplate; context: { $implicit: item, progress: item }"></ac-container>
                </div>
              </ac-container>
            </ac-container>
          </ac-container>
        </div>
      </div>
    </ac-template>
  </ac-container>
  <ac-template #importRowsTemplate let-importDetails="importDetails" let-cssClass="cssClass">
    <div [attr.class]="cssClass" ac-ng-scrollable [items]="Object.values(importDetails.processedRows)">
      <table class="table table-striped">
        <thead>
          <tr>
            <th style="width:25px;"></th>
            <ac-container ac:for="let col of importDetails.fields">
              <th>{{col.templateFieldName}}</th>
            </ac-container>
          </tr>
        </thead>
        <tr>
          <td ac-ng-scrollable-top-spacer colspan="100" class="p-0"></td>
        </tr>
        <tbody ac-ng-scrollable-body>
          <ac-template let-row let-index>
            <tr>
              <ac-container ac:if="row.childTemplates && row.childTemplates.length>0 && importDetails">
                <ac-svg-icon
                  ac:bind:svg-code="showAdditionalRows[row.rowId]?ACI_SVG_SOLID.chevronDown:ACI_SVG_SOLID.chevronRight"
                  class="me-2 toggle-icon"
                  (click)="showAdditionalRows[row.rowId] = showAdditionalRows[row.rowId]?false:true"></ac-svg-icon>
              </ac-container>
              <td>
                <div class="import-status-div">
                  <ac-container ac:if="row.operation!='SKIP'">
                    <ac-container ac:if="row.status=='PENDING'||row.status == undefined">
                      <span class="badge text-white bg-primary">Pending</span>
                    </ac-container>
                    <ac-container ac:if="row.status=='UPLOADED'">
                      <span class="badge text-white bg-success">Imported</span>
                    </ac-container>
                    <ac-container ac:if="row.status=='STARTED'">
                      <span class="badge text-white bg-info">Importing</span>
                    </ac-container>
                    <ac-container ac:if="row.status=='ERROR'">
                      <span class="badge text-white bg-danger">Error</span>
                    </ac-container>
                  </ac-container>
                  <ac-container ac:if="row.operation=='SKIP'">
                    <span class="badge text-white bg-secondary">Skipping</span>
                  </ac-container>
                </div>
              </td>
              <ac-container ac:for="let field of importDetails.fields">
                <td>{{row.data[field.destinationFieldName]??''}}</td>
              </ac-container>
            </tr>
            <!-- Child Rows Start-->
            <ac-container ac:if="row.childTemplates && row.childTemplates.length>0 && showAdditionalRows[row.rowId]">
              <ac-container ac:for="let templateName of row .childTemplates">
                <tr style="display: none;">
                  <td colspan="100" class="p-0"></td>
                </tr>
                <tr>
                  <td colspan="100">
                    <div class="card my-1 ms-4">
                      <div class="card-header p-2"><b>{{templateName}}</b></div>
                      <div class="card-body p-0">
                        <ac-container
                          ac:template:outlet="importRowsTemplate; context: { importDetails: getChildTemplateDetails(templateName,row,importDetails),cssClas:'child-import-rows-container' }"></ac-container>
                      </div>
                    </div>
                  </td>
                </tr>
              </ac-container>
            </ac-container>

            <!-- Child Rows End -->
          </ac-template>
        </tbody>
        <tfoot>
          <tr>
            <td ac-ng-scrollable-bottom-spacer colspan="100" class="p-0"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </ac-template>
  `,
  styles: `
  .import-rows-container{
    height:90vh;
  }
  .child-import-rows-container{
    height:70px;
  }
  `
})
export class ConvertToDestinationElement {
  @AcInput() dataBridge?: AcDataBridge;

  @AcOutput() convertedOutput: AcEventEmitter<any> = new AcEventEmitter<any>();

  ACI_SVG_SOLID = ACI_SVG_SOLID;
  Object = Object;
  showRows: Record<string, boolean> = {};
  showAdditionalRows: Record<string, boolean> = {};

  getChildTemplateDetails(templateName: string, rowDetails: IAcDataBridgeProcesedRow, entityDetails: IAcDataBridgeEntity) {
    const destinationTemplate = this.dataBridge?.destinationEntities[templateName];
    const clonedTemplate = { ...destinationTemplate };
    clonedTemplate.completedCount = 0;
    clonedTemplate.rowsCount = 0;
    const processedRows: Record<string, IAcDataBridgeProcesedRow> = {};
    for (const row of Object.values(destinationTemplate!.processedRows!)) {
      if (row.parentRowId == rowDetails.rowId && row.parentTemplateName == entityDetails.templateName!) {
        processedRows[row.rowId] = row;
      }
    }
    clonedTemplate.processedRows = processedRows;
    return clonedTemplate;
  }

  async handleStartConverting() {
    if (this.dataBridge) {
      const result = await this.dataBridge.convertRowsForSqlOperations()
      // console.log(result);
      this.convertedOutput.emit(result);
    }
  }
}
