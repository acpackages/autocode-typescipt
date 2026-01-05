import { AcElementBase, acRegisterCustomElement } from '@autocode-ts/ac-browser';
import { AcDataBridge } from '@autocode-ts/ac-data-bridge'
export class AcMapSourceColumns extends AcElementBase{
  dataBridge?:AcDataBridge;

  override init(): void {
    super.init();
    this.innerHTML = ` <p>Following worksheets has been extracted from the uploaded sheet and each sheet and its columns has been
          mapped. Check and verify the mapping to continue import process.</p>
        <div class="flex-fill">
          <div class="sheet-data">
            <ng-container *ngFor="let sheet of sheets">
              <ng-container *ngIf="sheet.sheetColumns.length > 0">
                <div class="card mb-4">
                  <div class="card-header px-2 py-1">
                    <div class="d-inline-block">
                      <b>{{ sheet.sheetName }} ({{ sheet.sheetColumns.length }} columns, {{ sheet.rowsCount }} rows)</b>
                      sheet will be
                      imported into
                    </div>
                    <div class="d-inline-block ms-2">
                      <select class="form-select py-1 fw-bold"
                        [(ngModel)]="sheet.appDefTitle">
                        <option value="" readonly>Select table</option>
                        <ng-container *ngFor="let item of destinationTables">
                          <option [attr.value]="item.title">{{item.title}}</option>
                        </ng-container>
                      </select>
                    </div>
                  </div>
                  <div class="card-body p-0">
                    <table class="table table-striped mb-0">
                      <thead>
                        <tr>
                          <th style="width:500px;">
                            Sheet column
                          </th>
                          <th>
                            Mapped to column
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr *ngFor="let col of sheet.sheetColumns">
                          <td class="pe-4 pt-2">{{col.sheetColumnName}}</td>
                          <td>
                            <div class="d-inline-block ms-0">
                              <select class="form-select py-1"
                                [(ngModel)]="col.defColumnTitle">
                                <ng-container *ngFor="let tableCol of sheet.tableColumnDefs">
                                  <option [attr.value]="tableCol.title">{{tableCol.title}}</option>
                                </ng-container>
                              </select>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </ng-container>
            </ng-container>
          </div>
        </div>
        <div class="pt-3">
          <button type="button" class="btn btn-dark" (click)="handleConvertData()">Confirm and Start Converting data for
            Accountea</button>
        </div>`;
    console.dir(this);
  }
}

acRegisterCustomElement({tag:'ac-map-source-columns',type:AcMapSourceColumns});
