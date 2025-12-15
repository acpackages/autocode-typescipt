/* eslint-disable @angular-eslint/prefer-standalone */
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AcNgMultiRouterComponent, IAcNgRouterOutlet } from '@autocode-ts/ac-angular';
import { acInit, AcWindowTabs } from '@autocode-ts/ac-browser';
import { AcDataDictionary } from '@autocode-ts/ac-data-dictionary';
import { dataDictionaryJson as actDataDictionary } from './../../../data/act-data-dictionary-v1';
import { AppInputFieldElement } from '../components/input-elements/app-input-field-element';
import { AcDDInputManager } from '@autocode-ts/ac-data-dictionary-components';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone:false
})
export class AppComponent implements AfterViewInit{
  @ViewChild('windowTabs', { static: true })
  windowTabsRef!: ElementRef<AcWindowTabs>;
  activeOutlet = 'outlet1';

  @ViewChild('multiRouter') multiRouter!:AcNgMultiRouterComponent;
  title = 'test-angular';
  windowsTabs?:AcWindowTabs;

  constructor(private router:Router){
    this.setDataGridConfig();
    AcDDInputManager.inputFieldElementClass = AppInputFieldElement;
    AcDataDictionary.registerDataDictionary({jsonData:actDataDictionary});
    acInit();
    console.log(this);
  }

  ngAfterViewInit(): void {
    this.windowsTabs = this.windowTabsRef.nativeElement as AcWindowTabs;
    // this.windowsTabs.addTab({ tab:{id: 'outlet1', title: 'Outlet 1', closeable: true, icon: '📘' }})
    // this.windowsTabs.addTab({ tab:{id: 'outlet2', title: 'Outlet 2', closeable: true, icon: '📘' }})
    // this.windowsTabs.addTab({ tab:{id: 'outlet3', title: 'Outlet 3', closeable: true, icon: '📘' }})
    // this.windowsTabs.selectTab({id:'outlet1'});
    this.windowsTabs.addEventListener('activeChange',(args:any)=>{
      // this.activeOutlet = args.detail.id;
      this.multiRouter.setActive({id:args.detail.id});
    });
    this.windowsTabs.addEventListener('remove',(args:any)=>{
      this.multiRouter.remove({id:args.detail.id});
    });
    this.windowsTabs.addEventListener('addNewClick',()=>{
      this.multiRouter.add({route:['datagrid']});
    });
  }

  handleNavigate(url){
    const id = this.multiRouter.activeRouterOutlet.id;
    // const id =this.activeOutlet;
    console.log(`id => ${id}, url => ${url}`);
    // this.router.navigate([{ outlets: { [id]: url } }]);
    this.router.navigate([url ]);
  }

  handleOnActiveRouterChange(event:IAcNgRouterOutlet){
    this.windowsTabs.selectTab({id:event.id});
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
