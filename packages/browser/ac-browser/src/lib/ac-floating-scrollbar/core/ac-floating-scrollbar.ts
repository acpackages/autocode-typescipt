/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ClickScrollPlugin, OverlayScrollbars } from "overlayscrollbars";
export class AcFloatingScrollbar {
  element: HTMLElement;
  parentElement: HTMLElement;
  horizontalScrollbar?: HTMLElement;
  verticalScrollbar?: HTMLElement;
  timeoutShowVerticalSrollbar: any;
  constructor({ element, parentElement }: { element: HTMLElement, parentElement: HTMLElement }) {
    this.element = element;
    this.parentElement = parentElement;
    OverlayScrollbars.plugin(ClickScrollPlugin);
    setTimeout(() => {
      this.initScrollbar();
    }, 100);
    parentElement.addEventListener('scroll', (e: any) => {
      this.setVerticalSidebarPosition();
    });
    window.addEventListener('resize', () => {
      this.setVerticalSidebarPosition();
    });
  }

  setVerticalSidebarPosition() {
    this.verticalScrollbar!.style.display = "none";
    if (this.timeoutShowVerticalSrollbar) {
      clearTimeout(this.timeoutShowVerticalSrollbar);
    }
    this.timeoutShowVerticalSrollbar = setTimeout(() => {
      this.verticalScrollbar!.style.right = (this.parentElement.scrollWidth - this.parentElement.offsetWidth - this.parentElement.scrollLeft) + "px";
      this.verticalScrollbar!.style.display = "";
    }, 100);

  }

  handleElementScroll(event: any) {
    console.log(event);
    if (this.verticalScrollbar) {
      // this.verticalScrollbar.style.left = event.target:
    }
  }

  handleOverlayScrollbarInitialized(event: any) {
    this.horizontalScrollbar = this.element.getElementsByClassName('os-scrollbar os-scrollbar-vertical')[0] as HTMLElement;
    this.verticalScrollbar = this.element.getElementsByClassName('os-scrollbar os-scrollbar-vertical')[0] as HTMLElement;
    setTimeout(() => {
      this.setVerticalSidebarPosition();
    }, 100);
  }

  initScrollbar() {
    OverlayScrollbars(this.element,
      {
        scrollbars: {
          clickScroll: true,
        },
      },
      {
        initialized: (e: any) => {
          this.handleOverlayScrollbarInitialized(e);
        }
      }
    );
  }
}
