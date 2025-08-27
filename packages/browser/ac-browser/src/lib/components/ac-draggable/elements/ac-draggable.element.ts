import { Autocode } from "@autocode-ts/autocode";
import { AcDraggableApi } from "../core/ac-draggable-api";
import { AcDraggableAttributeName } from "../_ac-draggable.export";

type AcDragGroup = {
  name: string;
  accept?: string[];
};

export class AcDraggable {
  draggableApi:AcDraggableApi = new AcDraggableApi({instance:this});
  element: HTMLElement;
  groups: Map<string, AcDragGroup> = new Map();
  id:string = Autocode.uuid();
  private mutationObserver!: MutationObserver;
  originalUserSelect: any;

  constructor({element}:{element: HTMLElement}) {
    this.element = element;
    this.observeDOM();
    this.initElement();
  }

  private observeDOM(): void {
    this.mutationObserver = new MutationObserver(() => {
      this.initElement();
    });
    this.mutationObserver.observe(this.element, { childList: true, subtree: true });
  }

  private initElement(): void {
    if (!this.element.hasAttribute(AcDraggableAttributeName.acDraggable)){
      this.element.setAttribute(AcDraggableAttributeName.acDraggable,"");
    }

    const draggables = this.element.querySelectorAll(`[${AcDraggableAttributeName.acDraggableElement}]`);
    const targets = this.element.querySelectorAll(`[${AcDraggableAttributeName.acDraggableTarget}]`);
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
