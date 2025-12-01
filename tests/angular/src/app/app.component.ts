/* eslint-disable @angular-eslint/prefer-standalone */
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AcNgMultiRouterComponent, IAcNgRouterOutlet } from '@autocode-ts/ac-angular';
import { acInit, AcWindowTabs } from '@autocode-ts/ac-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:false
})
export class AppComponent implements AfterViewInit{
  @ViewChild('windowTabs', { static: true })
  windowTabsRef!: ElementRef<AcWindowTabs>;

  @ViewChild('router') router!:AcNgMultiRouterComponent;
  title = 'test-angular';
  windowsTabs?:AcWindowTabs;

  constructor(){
    this.setDataGridConfig();
    acInit();
    console.log(this);
  }

  ngAfterViewInit(): void {
    this.windowsTabs = this.windowTabsRef.nativeElement as AcWindowTabs;
    this.windowsTabs.addEventListener('activeChange',(args:any)=>{
      this.router.setActive({id:args.detail.id});
    });
    this.windowsTabs.addEventListener('remove',(args:any)=>{
      this.router.remove({id:args.detail.id});
    });
    this.windowsTabs.addEventListener('addNewClick',()=>{
      this.router.add({route:['datagrid']});
    });
  }

  handleOnActiveRouterChange(event:IAcNgRouterOutlet){
    // this.windowsTabs.addTab({ tab:{id: event.id, title: event.title, closeable: true, icon: '📘' }})
  }

  handleOnAddRouter(event:any){
    if(this.windowsTabs){
      this.windowsTabs.addTab({ tab:{id: event.id, title: event.title, closeable: true, icon: '📘' }})
    }
    else{
      setTimeout(() => {
        this.handleOnAddRouter(event);
      }, 50);
    }
  }

  handleOnRemoveRouter(event:any){
    console.log(event);
  }

  setDataGridConfig(){
    // AcDataGrid.filterButtonHtml = '<i class="fa fa-filter"></i>';
    // AcDataGrid.filterButtonAppliedHtml = '<i class="fa-solid fa-filter-circle-xmark"></i>';
    // AcDataGrid.sortButtonHtml = '<i class="fa fa-sort"></i>';
    // AcDataGrid.sortButtonAscHtml = '<i class="fa fa-arrow-down-short-wide"></i>';
    // AcDataGrid.sortButtonDescHtml = '<i class="fa fa-arrow-down-wide-short"></i>';
  }
}
