/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcEnumDrawerEvent } from "../enums/ac-enum-drawer-event.enum";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_DRAWER_TAG } from "../consts/ac-drawer-tag.const";
import { AcElementBase } from "../../../core/ac-element-base";

export class AcDrawer extends AcElementBase{
  private backdropEl?: HTMLDivElement;
  private isOpen = false;
  get animationDuration():number{
    return parseInt(this.getAttribute('animation-duration')??"200");
  }
  set animationDuration(value:number){
    this.setAttribute('animation-duration',value.toString());
  }

  get suppressBackdropClose():boolean{
    return this.getAttribute('suppress-backdrop-close')!='true';
  }
  set suppressBackdropClose(value:boolean){
    this.setAttribute('suppress-backdrop-close',`${value}`);
  }

  get placement():string{
    return this.getAttribute('placement')??'left';
  }
  set placement(value:'left'|'right'|'top'|'bottom'){
    this.setAttribute('placement',value);
  }

  get showBackdrop():boolean{
    return this.getAttribute('show-backdrop')!='false';
  }
  set showBackdrop(value:boolean){
    this.setAttribute('show-backdrop',`${value}`);
  }

  override init() {
    super.init();
    const closeButton = this.querySelector('[ac-drawer-close]');
    if(closeButton ){
      closeButton.addEventListener('click',()=>{
        this.close();
      })
    }
    this.style.position = 'fixed';
    this.style.zIndex = '1050';
    this.style.transition = `transform ${this.animationDuration}ms ease`;
    this.style.willChange = 'transform';

    // Placement styles
    const placements: Record<string, () => void> = {
      left: () => {
        this.style.top = '0';
        this.style.left = '0';
        this.style.height = '100%';
        this.style.transform = 'translateX(-100%)';
      },
      right: () => {
        this.style.top = '0';
        this.style.right = '0';
        this.style.height = '100%';
        this.style.transform = 'translateX(100%)';
      },
      top: () => {
        this.style.top = '0';
        this.style.left = '0';
        this.style.width = '100%';
        this.style.transform = 'translateY(-100%)';
      },
      bottom: () => {
        this.style.bottom = '0';
        this.style.left = '0';
        this.style.width = '100%';
        this.style.transform = 'translateY(100%)';
      }
    };

    placements[this.placement]();

    if (this.showBackdrop) {
      this.backdropEl = document.createElement('div');
      this.backdropEl.style.position = 'fixed';
      this.backdropEl.style.top = '0';
      this.backdropEl.style.left = '0';
      this.backdropEl.style.width = '100%';
      this.backdropEl.style.height = '100%';
      this.backdropEl.style.backgroundColor = 'rgba(0,0,0,0.5)';
      this.backdropEl.style.opacity = '0';
      this.backdropEl.style.transition = `opacity ${this.animationDuration}ms ease`;
      this.backdropEl.style.zIndex = '1040';

      if (!this.suppressBackdropClose) {
        this.backdropEl.addEventListener('click', () => this.close());
      }
    }
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;

    if (this.showBackdrop && this.backdropEl) {
      this.ownerDocument.body.appendChild(this.backdropEl);
      setTimeout(() => {
        this.backdropEl!.style.opacity = '1';
      }, 10);
    }

    requestAnimationFrame(() => {
      this.style.transform = 'translate(0,0)';
    });
    this.events.execute({event:AcEnumDrawerEvent.Open});
    this.events.execute({event:AcEnumDrawerEvent.Toggle});
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;

    const placementsReset: Record<string, string> = {
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
      top: 'translateY(-100%)',
      bottom: 'translateY(100%)'
    };

    this.style.transform = placementsReset[this.placement];

    if (this.showBackdrop && this.backdropEl) {
      this.backdropEl.style.opacity = '0';
      setTimeout(() => {
        if (this.backdropEl && this.backdropEl.parentElement) {
          this.backdropEl.parentElement.removeChild(this.backdropEl);
        }
      }, this.animationDuration);
    }
    this.events.execute({event:AcEnumDrawerEvent.Close});
    this.events.execute({event:AcEnumDrawerEvent.Toggle});
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }
}

acRegisterCustomElement({tag:AC_DRAWER_TAG.drawer,type:AcDrawer})
