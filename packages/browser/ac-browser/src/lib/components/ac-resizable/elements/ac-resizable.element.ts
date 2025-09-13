import { AcEvents } from "@autocode-ts/autocode";
import { AcEnumResizeDirection } from "../enums/ac-enum-resize-direction.enum";

export class AcResizable {
  private element: HTMLElement;
  private handles: Record<any, HTMLDivElement> = {} as any;
  events:AcEvents = new AcEvents();

  constructor({element}:{element: HTMLElement}) {
    this.element = element;
    this.element.style.position = 'relative';
    this.element.style.overflow = 'hidden';

    this.createHandles();
  }

  private createHandles() {
    const directions: any[] = Object.values(AcEnumResizeDirection);

    directions.forEach((dir) => {
      const handle = document.createElement('div');
      handle.classList.add('ac-resize-handle', `ac-resize-${dir}`);
      this.styleHandle(handle, dir);
      handle.addEventListener('mousedown', (e) => this.startResize(e, dir));
      this.element.appendChild(handle);
      this.handles[dir] = handle;
    });
  }

  private styleHandle(handle: HTMLDivElement, dir: AcEnumResizeDirection) {
    const size = '8px';
    handle.style.position = 'absolute';
    handle.style.background = 'transparent'; // change for visibility
    handle.style.zIndex = '10';

    switch (dir) {
      case AcEnumResizeDirection.Top:
        Object.assign(handle.style, {
          top: '0',
          left: '0',
          right: '0',
          height: size,
          cursor: 'ns-resize'
        });
        break;
      case AcEnumResizeDirection.Bottom:
        Object.assign(handle.style, {
          bottom: '0',
          left: '0',
          right: '0',
          height: size,
          cursor: 'ns-resize'
        });
        break;
      case AcEnumResizeDirection.Left:
        Object.assign(handle.style, {
          top: '0',
          bottom: '0',
          left: '0',
          width: size,
          cursor: 'ew-resize'
        });
        break;
      case AcEnumResizeDirection.Right:
        Object.assign(handle.style, {
          top: '0',
          bottom: '0',
          right: '0',
          width: size,
          cursor: 'ew-resize'
        });
        break;
      case AcEnumResizeDirection.TopLeft:
        Object.assign(handle.style, {
          top: '0',
          left: '0',
          width: size,
          height: size,
          cursor: 'nwse-resize'
        });
        break;
      case AcEnumResizeDirection.TopRight:
        Object.assign(handle.style, {
          top: '0',
          right: '0',
          width: size,
          height: size,
          cursor: 'nesw-resize'
        });
        break;
      case AcEnumResizeDirection.BottomLeft:
        Object.assign(handle.style, {
          bottom: '0',
          left: '0',
          width: size,
          height: size,
          cursor: 'nesw-resize'
        });
        break;
      case AcEnumResizeDirection.BottomRight:
        Object.assign(handle.style, {
          bottom: '0',
          right: '0',
          width: size,
          height: size,
          cursor: 'nwse-resize'
        });
        break;
    }
  }

  private startResize(event: MouseEvent, dir: AcEnumResizeDirection) {
    event.preventDefault();

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = this.element.offsetWidth;
    const startHeight = this.element.offsetHeight;
    const startTop = this.element.offsetTop;
    const startLeft = this.element.offsetLeft;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (dir.includes('right')) {
        this.element.style.width = `${startWidth + dx}px`;
      }
      if (dir.includes('left')) {
        this.element.style.width = `${startWidth - dx}px`;
        this.element.style.left = `${startLeft + dx}px`;
      }
      if (dir.includes('bottom')) {
        this.element.style.height = `${startHeight + dy}px`;
      }
      if (dir.includes('top')) {
        this.element.style.height = `${startHeight - dy}px`;
        this.element.style.top = `${startTop + dy}px`;
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}
