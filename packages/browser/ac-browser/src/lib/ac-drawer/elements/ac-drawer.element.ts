/* eslint-disable @typescript-eslint/no-unused-expressions */
type AcDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

interface AcDrawerOptions {
  placement?: AcDrawerPlacement;
  backdrop?: boolean;
  closeOnBackdropClick?: boolean;
  animationDuration?: number; // in ms
}

export class AcDrawer {
  private element: HTMLElement;
  private options: Required<AcDrawerOptions>;
  private backdropEl?: HTMLDivElement;
  private isOpen = false;

  constructor(element: HTMLElement, options?: AcDrawerOptions) {
    this.element = element;
    this.options = {
      placement: options?.placement ?? 'right',
      backdrop: options?.backdrop ?? true,
      closeOnBackdropClick: options?.closeOnBackdropClick ?? true,
      animationDuration: options?.animationDuration ?? 300
    };

    this.init();
  }

  private init() {
    // Apply base styles
    this.element.style.position = 'fixed';
    this.element.style.zIndex = '1050';
    this.element.style.transition = `transform ${this.options.animationDuration}ms ease`;
    this.element.style.willChange = 'transform';

    // Placement styles
    const placements: Record<AcDrawerPlacement, () => void> = {
      left: () => {
        this.element.style.top = '0';
        this.element.style.left = '0';
        this.element.style.height = '100%';
        this.element.style.transform = 'translateX(-100%)';
      },
      right: () => {
        this.element.style.top = '0';
        this.element.style.right = '0';
        this.element.style.height = '100%';
        this.element.style.transform = 'translateX(100%)';
      },
      top: () => {
        this.element.style.top = '0';
        this.element.style.left = '0';
        this.element.style.width = '100%';
        this.element.style.transform = 'translateY(-100%)';
      },
      bottom: () => {
        this.element.style.bottom = '0';
        this.element.style.left = '0';
        this.element.style.width = '100%';
        this.element.style.transform = 'translateY(100%)';
      }
    };

    placements[this.options.placement]();

    if (this.options.backdrop) {
      this.backdropEl = document.createElement('div');
      this.backdropEl.style.position = 'fixed';
      this.backdropEl.style.top = '0';
      this.backdropEl.style.left = '0';
      this.backdropEl.style.width = '100%';
      this.backdropEl.style.height = '100%';
      this.backdropEl.style.backgroundColor = 'rgba(0,0,0,0.5)';
      this.backdropEl.style.opacity = '0';
      this.backdropEl.style.transition = `opacity ${this.options.animationDuration}ms ease`;
      this.backdropEl.style.zIndex = '1040';

      if (this.options.closeOnBackdropClick) {
        this.backdropEl.addEventListener('click', () => this.close());
      }
    }
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;

    if (this.options.backdrop && this.backdropEl) {
      document.body.appendChild(this.backdropEl);
      setTimeout(() => {
        this.backdropEl!.style.opacity = '1';
      }, 10);
    }

    requestAnimationFrame(() => {
      this.element.style.transform = 'translate(0,0)';
    });
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;

    const placementsReset: Record<AcDrawerPlacement, string> = {
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
      top: 'translateY(-100%)',
      bottom: 'translateY(100%)'
    };

    this.element.style.transform = placementsReset[this.options.placement];

    if (this.options.backdrop && this.backdropEl) {
      this.backdropEl.style.opacity = '0';
      setTimeout(() => {
        if (this.backdropEl && this.backdropEl.parentElement) {
          this.backdropEl.parentElement.removeChild(this.backdropEl);
        }
      }, this.options.animationDuration);
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }
}
