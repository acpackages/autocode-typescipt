/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, OnInit, ViewContainerRef, ViewChild, Output, EventEmitter, ComponentRef, ElementRef, OnDestroy } from '@angular/core';
import { IAcNgRouterOutlet } from '../../_ac-ng-mutli-router.export';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { acNullifyInstanceProperties, Autocode } from '@autocode-ts/autocode';
import { AcRuntimeService } from '@autocode-ts/ac-ng-runtime';
import { AcNgRouterComponent } from '../ac-ng-router/ac-ng-router.component';

@Component({
  selector: 'ac-ng-multi-router',
  standalone: false,
  template: ` <router-outlet (activate)="handleActivate($event)"></router-outlet><ng-container #panels></ng-container>`,
  styles: [``]
})
export class AcNgMultiRouterComponent implements OnInit,OnDestroy {
  @ViewChild('panels', { read: ViewContainerRef }) panels!: ViewContainerRef;
  @ViewChild(RouterOutlet) routerOutlet!: RouterOutlet;

  routerOutlets: IAcNgRouterOutlet[] = [];
  activeRouterOutlet: IAcNgRouterOutlet | null = null;
  private sub = new Subscription();

  @Output() onActiveChange: EventEmitter<any> = new EventEmitter();
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  @Output() onRemove: EventEmitter<any> = new EventEmitter();

  activateTimeout:any;
  addTimeout:any;

  constructor(private elementRef: ElementRef, private router: Router, private runtimeService: AcRuntimeService) { }

  ngOnDestroy(): void {
    clearTimeout(this.activateTimeout);
    clearTimeout(this.addTimeout);
    this.sub.unsubscribe();

    this.panels?.clear();

    this.routerOutlets.forEach(o => {
      o.routerComponentRef?.destroy();
      o.routerComponent = undefined;
      o.routerComponentRef = undefined;
    });

    this.routerOutlets = [];
    acNullifyInstanceProperties({instance:this});
  }

  ngOnInit() {
    this.sub.add(this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => this.loadCurrentRoute()));
    this.loadCurrentRoute();
  }

  add({ route, title = 'New Tab' }: { route: string, title?: string }) {
    const id = Autocode.uuid();
    const newRouter: IAcNgRouterOutlet = { id, title, route, isActive: false };
    this.routerOutlets.push(newRouter);
    const componentRef: ComponentRef<AcNgRouterComponent> = this.panels.createComponent(AcNgRouterComponent);
    newRouter.routerComponentRef = componentRef;
    newRouter.routerComponent = componentRef.instance;
    componentRef.instance.id = id;
    this.onAdd.emit(newRouter);
    this.setActive({ id });
    this.router.navigateByUrl(route);
    this.addTimeout = setTimeout(() => {
      if (!this.activeRouterOutlet.routerComponent.componentRef) {
        if (this.routerOutlet && this.routerOutlet.activatedRoute) {
          this.activeRouterOutlet.routerComponent.createComponent(this.routerOutlet.component.constructor);
        }
      }
    }, 50);
    return newRouter;
  }

  handleActivate(event: any) {
    if (this.routerOutlet && this.activeRouterOutlet) {
      this.activeRouterOutlet.routerComponent.createComponent(event.constructor);
    }
    else {
      this.activateTimeout = setTimeout(() => {
        this.handleActivate(event);
      }, 1);
    }
    if (this.routerOutlet) {
      (this.routerOutlet as any).location.clear();
    }
  }

  private loadCurrentRoute() {
    if (this.routerOutlets.length > 0) return;

    const urlTree = this.router.parseUrl(this.router.url);
    const primary = urlTree.root.children['primary'];
    if (!primary?.segments?.length) {
      return;
    }
    const segments = primary.segments.map(s => s.path);
    this.add({ route: this.router.url });
  }

  setActive({ id }: { id: string }) {
    const targetRouter = this.routerOutlets.find((router: IAcNgRouterOutlet) => router.id === id);
    if (!targetRouter || targetRouter.isActive) return;
    if (this.activeRouterOutlet) {
      this.activeRouterOutlet.isActive = false;
      this.activeRouterOutlet.routerComponent.visible = false;
    }
    this.activeRouterOutlet = targetRouter;
    targetRouter.isActive = true;
    this.activeRouterOutlet.routerComponent.visible = true;
    this.onActiveChange.emit(targetRouter);
  }

  remove({ id }: { id: string }) {
    const removedRouter = this.routerOutlets.find(t => t.id === id);
    if (!removedRouter) return;
    if (removedRouter.routerComponentRef) {
      removedRouter.routerComponentRef.destroy();
    }
    removedRouter.routerComponent = undefined;
    removedRouter.routerComponentRef = undefined;

    this.router.navigate([{ outlets: { [id]: null } }]);
    this.routerOutlets = this.routerOutlets.filter(t => t.id !== id);
    if (this.activeRouterOutlet?.id === id && this.routerOutlets.length > 0) {
      const last = this.routerOutlets[this.routerOutlets.length - 1];
      this.setActive({ id: last.id });
    }
    this.onRemove.emit(removedRouter);
  }

}
