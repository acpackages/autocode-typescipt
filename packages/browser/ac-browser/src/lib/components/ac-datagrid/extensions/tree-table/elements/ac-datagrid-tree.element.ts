/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcEnumCollapseEvent } from "../../../../ac-collapse/_ac-collapse.export";
import { AcCollapse } from "../../../../ac-collapse/elements/ac-collapse.element";
import { acAddClassToElement } from "../../../../../utils/ac-element-functions";
import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridRowElement } from "../../../elements/ac-datagrid-row.element";
import { AcDatagridRow } from "../../../models/ac-datagrid-row.model";
import { AcDatagridTreeTableCssClassName } from "../consts/ac-datagrid-tree-table-css-class-name.const";
import { AcDatagridTreeTableDefaultConfig } from "../consts/ac-datagrid-tree-table-default-config.const";

export class AcDatagridTree {
  collapse?:AcCollapse;
  datagridApi: AcDatagridApi;
  datagridRow!: AcDatagridRow;
  element: HTMLElement = document.createElement('div');
  hasChildren:boolean = false;
  isOpen:boolean = false;
  treeDatagridContainer: HTMLElement = document.createElement('div');

  constructor({ datagridApi, datagridRow }: { datagridApi: AcDatagridApi, datagridRow: AcDatagridRow }) {
    this.datagridRow = datagridRow;
    this.datagridApi = datagridApi;
    this.initElement();
  }

  close(){
    this.isOpen = false;
  }

  initElement() {
    acAddClassToElement({ cssClass: AcDatagridTreeTableCssClassName.acDatagridTree, element: this.element });
    acAddClassToElement({ cssClass: AcDatagridTreeTableCssClassName.acDatagridTreeChildrenContainer, element: this.treeDatagridContainer });
    this.treeDatagridContainer.style.paddingLeft = `${AcDatagridTreeTableDefaultConfig.treeChildPadding}px`;
    this.element.append(this.treeDatagridContainer);
    this.setTreeChildrenRows();
    this.collapse = new AcCollapse({element:this.element});
    this.collapse.on({event:AcEnumCollapseEvent.Toggle,callback:()=>{
      if(this.collapse){
        this.isOpen = this.collapse.isOpen;
      }
      if(this.datagridRow.instance){
        // if(this.datagridRow.instance.datagridTreeChildrenToggle){
        //   this.datagridRow.instance.datagridTreeChildrenToggle.render();
        // }
      }
    }});
  }

  open(){
    this.isOpen = true;
  }

  setToggleElement({element}:{element:HTMLElement}){
    if(this.collapse){
      this.collapse.setToggleElement({element:element});
    }
  }

  setTreeChildrenRows(){
    this.hasChildren = false;
    // if(this.datagridApi.isTreeData && this.datagridApi.treeDataParentKey){
    //   this.treeDatagridContainer.innerHTML = "";
    //   const parentValue = this.datagridRow.data[this.datagridApi.treeDataParentKey];
    //   const treeChildrenDatagridRows =this.datagridApi.dataSource.getTreeChildrenDatagridRows({parentValue:parentValue});
    //   this.hasChildren = treeChildrenDatagridRows.length > 0;
    //   for(const treeChild of treeChildrenDatagridRows){
    //     // treeChild.treeDepth = this.datagridRow.treeDepth + 1;
    //     const datagridRow = new AcDatagridRowElement({ datagridApi: this.datagridApi, datagridRow: treeChild });
    //     this.treeDatagridContainer.append(datagridRow.rowWrapper);
    //   }
    // }
  }

  toggle(){
    if(this.isOpen){
      this.close();
    }
    else{
      this.open();
    }
  }

}
