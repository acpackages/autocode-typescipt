/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import { Component, OnInit, ViewContainerRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { IAcNgRouterOutlet } from '../../_ac-ng-mutli-router.export';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Autocode } from '@autocode-ts/autocode';

@Component({
  selector: 'ac-ng-multi-router',
  standalone: false,
  templateUrl: `./ac-ng-multi-router.component.html`,
  styles: [``]
})
export class AcNgMultiRouterComponent implements OnInit{
  routers: IAcNgRouterOutlet[] = [];
  activeRouterOutlet: IAcNgRouterOutlet | null = null;
  private sub = new Subscription();

  @Output() onActiveChange:EventEmitter<any> = new EventEmitter();
  @Output() onAdd:EventEmitter<any> = new EventEmitter();
  @Output() onRemove:EventEmitter<any> = new EventEmitter();

  @ViewChild('panels', { read: ViewContainerRef }) panels!: ViewContainerRef;

  constructor(private router: Router) {}

  ngOnInit() {
    this.sub.add(this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => this.loadCurrentRoute()));
    setTimeout(() => this.loadCurrentRoute());
  }

  private loadCurrentRoute() {
    if (this.routers.length > 0) return;

    const urlTree = this.router.parseUrl(this.router.url);
    const primary = urlTree.root.children['primary'];

    if (!primary?.segments?.length) {
      return;
    }
    const segments = primary.segments.map(s => s.path);
    this.add({route:segments});
  }

  add({route,title = 'New Tab'}:{route: any[], title?: string}) {
    const id = Autocode.uuid();
    const newRouter: IAcNgRouterOutlet = { id, title,route,isActive: true };
    this.routers = this.routers.map(t => ({ ...t, isActive: false }));
    this.routers.push(newRouter);

    this.onAdd.emit(newRouter);

    this.setActive({id});
    this.router.navigate(route);
    return newRouter;
  }

  setActive({id}:{id:string}) {
    if(this.activeRouterOutlet){
      this.activeRouterOutlet.isActive = false;
    }
    this.activeRouterOutlet = this.routers.find((router:IAcNgRouterOutlet)=>{
      return router.id == id;
    });
    this.activeRouterOutlet.isActive =true;
    this.onActiveChange.emit(this.activeRouterOutlet);
  }

  remove({id}:{id:string}) {

    const removedRouter = this.routers.find(t => t.id !== id);
    this.router.navigate([{ outlets: { [id]: null } }]);

    this.routers = this.routers.filter(t => t.id !== id);
    if (this.activeRouterOutlet?.id === id && this.routers.length > 0) {
      const last = this.routers[this.routers.length - 1];
      this.setActive({id:last.id});
    }
    this.onRemove.emit(removedRouter);
  }

}
