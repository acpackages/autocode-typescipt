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
  private mutationObserver!: MutationObserver;
  originalUserSelect: any;

  constructor() {
    super();
    this.observeDOM();
    this.initElement();
  }

  private observeDOM(): void {
    this.mutationObserver = new MutationObserver(() => {
      this.initElement();
    });
    this.mutationObserver.observe(this, { childList: true, subtree: true });
  }

  private initElement(): void {
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

  public destroy(): void {
    this.mutationObserver.disconnect();
  }
}

acRegisterCustomElement({tag:AC_DRAGGABLE_TAG.draggable,type:AcDraggable});
