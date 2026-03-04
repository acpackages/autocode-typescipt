import { AcDataBridge, IAcDataBridgeProgress } from '@autocode-ts/ac-data-bridge';
import { ACI_SVG_SOLID } from '@autocode-ts/ac-icons';
import { AcElement, AcInput } from '@autocode-ts/ac-runtime';
@AcElement({
  selector: 'ac-data-bridge-data-processing',
  template: `
  <ac-container ac:if="dataBridge && dataBridge.taskProgress">
    <div class="flex-fill">
      <ac-container ac:template:outlet="progressTemplate; context: { progress: dataBridge.taskProgress }"></ac-container>
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
                    ac:template:outlet="progressTemplate; context: { item: item, progress: item }"></ac-container>
                </div>
              </ac-container>
            </ac-container>
          </ac-container>
        </div>
      </div>
    </ac-template>
  </ac-container>
  `,
  styles: ``
})
export class DataProcessingElement {
  @AcInput() dataBridge?: AcDataBridge;

  ACI_SVG_SOLID = ACI_SVG_SOLID;
  Object = Object;

  getPercentage(progress: IAcDataBridgeProgress): number {
    return Math.round((progress.completedCount / progress.totalCount) * 100);
  }
}
