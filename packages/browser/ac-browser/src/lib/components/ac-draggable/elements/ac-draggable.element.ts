import { Autocode } from "@autocode-ts/autocode";
import { AcDraggableApi } from "../core/ac-draggable-api";
import { AC_DRAGGABLE_TAG, AcDraggableAttributeName } from "../_ac-draggable.export";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcElementBase } from "../../../core/ac-element-base";
import { IAcDragGroup } from "../interfaces/ac-drag-group.interface";



export class AcDraggable extends AcElementBase {
  draggableApi:AcDraggableApi = new AcDraggableApi({instance:this});
  groups: Map<string, IAcDragGroup> = new Map();
  override id:string = Autocode.uuid();
  private observe(): void {
    this.observeMutationManaged(this, { childList: true, subtree: true }, () => {
      this.init();
    });
  }

  originalUserSelect: any;

  override connectedCallback() {
    super.connectedCallback();
    this.observe();
  }

  override init(): void {
    super.init();
    const draggables = this.querySelectorAll(`[${AcDraggableAttributeName.acDraggableElement}]`);
    const targets = this.querySelectorAll(`[${AcDraggableAttributeName.acDraggableTarget}]`);
    draggables.forEach((el) => {
      this.draggableApi.registerDraggableElement({element:el as HTMLElement});
    });
    targets.forEach((el) => {
      this.draggableApi.registerTargetElement({element:el as HTMLElement});
    });
  }

  public addDragGroup(name: string, accept: string[] = []): void {
    this.groups.set(name, { name, accept });
  }

  public removeDragGroup(name: string): void {
    this.groups.delete(name);
  }

  override destroy(): void {
    this.draggableApi.destroy();
    super.destroy();
  }
}

acRegisterCustomElement({tag:AC_DRAGGABLE_TAG.draggable,type:AcDraggable});
