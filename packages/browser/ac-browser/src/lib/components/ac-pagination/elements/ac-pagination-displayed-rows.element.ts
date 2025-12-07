import { AcElementBase } from "../../../core/ac-element-base";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcPagination } from "./ac-pagination.element";

export class AcPaginationDisplayedRows extends AcElementBase{
  private _pagination?: AcPagination;
  get pagination():AcPagination|undefined{
    return this._pagination;
  }
  set pagination(value:AcPagination){
    this._pagination = value;
  }

  override init(){
    this.render();
  }

  render() {
    if (this.pagination) {
      this.innerHTML = `<b>${this.pagination.startRow}</b> to <b>${this.pagination.endRow}</b> of <b>${this.pagination.totalRows}</b>`;
    }
  }

}

acRegisterCustomElement({'tag':'ac-pagination-displayed-rows',type:AcPaginationDisplayedRows});
