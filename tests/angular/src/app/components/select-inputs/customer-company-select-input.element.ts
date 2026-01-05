/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AppDatagridSelectInputBase } from "./_app-datagrid-select-input-base";
import { AcDataManager, IAcOnDemandRequestArgs } from "@autocode-ts/autocode";
import { customersData } from "tests/data/customers-data";

export class CustomerCompanySelectInput extends AppDatagridSelectInputBase {

  override init() {
    super.init();
    this.inputElement.placeholder = "Select Company";
    this.inputElement.labelKey = 'company';
    this.inputElement.valueKey = 'company';
    this.inputElement.columnDefinitions = [{
      title: 'Company',
      field: 'company'
    }];
    this.setOnDemandDataFun();
    this.setDatagridData();
  }

  private setOnDemandDataFun() {
    const onDemandProxyDataManager: AcDataManager = new AcDataManager();
    const data: any[] = [];
    const multiplier = 1;
    let index: number = 0;
    for (let i = 0; i < multiplier; i++) {
      for (const row of customersData) {
        index++;
        data.push({ index: index, ...row })
      }
    }
    onDemandProxyDataManager.data = data;

    this.onDemandFunction = async (args: IAcOnDemandRequestArgs) => {
      if (args.filterGroup) {
        onDemandProxyDataManager.filterGroup = args.filterGroup;
      }
      if (args.sortOrder) {
        onDemandProxyDataManager.sortOrder = args.sortOrder;
      }
      onDemandProxyDataManager.searchQuery = args.searchQuery ?? '';
      onDemandProxyDataManager.processRows();
      const totalCount = onDemandProxyDataManager.totalRows;
      const data = await onDemandProxyDataManager.getData({ startIndex: args.startIndex, rowsCount: 100 });
      const response = {
        totalCount,
        data
      };
      args.successCallback(response);
    };
  }
}

acRegisterCustomElement({ tag: 'customer-company-select-input', type: CustomerCompanySelectInput });
