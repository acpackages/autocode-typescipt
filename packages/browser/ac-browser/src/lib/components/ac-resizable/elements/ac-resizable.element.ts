import { AcEnumResizeDirection } from "../enums/ac-enum-resize-direction.enum";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_RESIZABLE_TAG } from "../_ac-resizable.export";
import { AcElementBase } from "../../../core/ac-element-base";

export class AcResizable extends AcElementBase{
  private handles: Record<any, HTMLDivElement> = {} as any;

  constructor() {
    super();
    this.style.position = 'relative';
    this.style.overflow = 'hidden';

    this.createHandles();
  }

  private createHandles() {
    const directions: any[] = Object.values(AcEnumResizeDirection);

    directions.forEach((dir) => {
      const handle = document.createElement('div');
      handle.classList.add('ac-resize-handle', `ac-resize-${dir}`);
      this.styleHandle(handle, dir);
      handle.addEventListener('mousedown', (e) => this.startResize(e, dir));
      this.appendChild(handle);
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
    const startWidth = this.offsetWidth;
    const startHeight = this.offsetHeight;
    const startTop = this.offsetTop;
    const startLeft = this.offsetLeft;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (dir.includes('right')) {
        this.style.width = `${startWidth + dx}px`;
      }
      if (dir.includes('left')) {
        this.style.width = `${startWidth - dx}px`;
        this.style.left = `${startLeft + dx}px`;
      }
      if (dir.includes('bottom')) {
        this.style.height = `${startHeight + dy}px`;
      }
      if (dir.includes('top')) {
        this.style.height = `${startHeight - dy}px`;
        this.style.top = `${startTop + dy}px`;
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

acRegisterCustomElement({tag:AC_RESIZABLE_TAG.resizable,type:AcResizable});
