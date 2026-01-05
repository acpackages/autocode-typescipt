import { AcElementBase, acRegisterCustomElement } from '@autocode-ts/ac-browser';
import { AcMapSourceColumns } from './ac-map-source-columns.element';
export class AcDataBridgeUi extends AcElementBase{
  mapColumnsElement?:AcMapSourceColumns;

  override init(): void {
    super.init();
    console.dir(this);
    this.initMapSourceColumns();
  }

  private initMapSourceColumns(){
    const mapColumnsElement = new AcMapSourceColumns();
    this.innerHTML = '';
    this.appendChild(mapColumnsElement);
  }
}

acRegisterCustomElement({tag:'ac-data-bridge-ui',type:AcDataBridgeUi});
