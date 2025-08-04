/* eslint-disable @typescript-eslint/no-inferrable-types */

export class AcDatagridInternalCellElement {
  // cellContainer: HTMLElement = document.createElement('div');
  // datagridApi: AcDatagridApi;
  // datagridInternalCell!: AcDatagridInternalCell;
  // datagridInternalColumn!: AcDatagridInternalColumn;
  // datagridRow!: AcDatagridRow;
  // element: HTMLElement = document.createElement('div');
  // isEditing: boolean = false;
  // swappingColumpPosition: boolean = false;

  // constructor({ datagridApi, datagridRow, datagridInternalColumn }: { datagridApi: AcDatagridApi, datagridRow: AcDatagridRow, datagridInternalColumn: AcDatagridInternalColumn }) {
  //   this.datagridRow = datagridRow;
  //   this.datagridInternalColumn = datagridInternalColumn;
  //   this.datagridApi = datagridApi;
  //   this.datagridInternalCell = {
  //     acCellId: Autocode.uuid(),
  //     acRowId: this.datagridRow.acRowId,
  //     acColumnId: this.datagridInternalColumn.acColumnId,
  //     datagridInternalColumn: datagridInternalColumn,
  //     datagridRow: datagridRow,
  //     instance: this
  //   };
  //   // this.cellRenderer = new AcDatagridCellRendererElement({ datagridApi: this.datagridApi, datagridCell: this.datagridCell });
  //   // this.datagridApi.on({
  //   //   eventName: AcEnumDatagridEvent.ColumnResize, callback: (event: IAcDatagridColumnResizeEvent) => {
  //   //     if (event.datagridColumn.acColumnId == this.datagridColumn.acColumnId) {
  //   //       this.setCellWidth();
  //   //     }
  //   //   }
  //   // });
  //   // this.datagridApi.on({
  //   //   eventName: AcEnumDatagridEvent.ColumnPositionChange, callback: (event: IAcDatagridColumnPositionChangeEvent) => {
  //   //     if (event.datagridColumn.acColumnId == this.datagridColumn.acColumnId && !this.swappingColumpPosition && this.datagridRow.instance && this.datagridRow.instance.datagridCells) {
  //   //       let element1: HTMLElement | undefined;
  //   //       let element2: HTMLElement | undefined;
  //   //       for (const datagridCell of this.datagridRow.instance.datagridCells) {
  //   //         if (datagridCell.datagridColumn.acColumnId == event.datagridColumn.acColumnId) {
  //   //           element1 = datagridCell.element;
  //   //         }
  //   //         else if (datagridCell.datagridColumn.acColumnId == event.oldDatagridColumn.acColumnId) {
  //   //           element2 = datagridCell.element;
  //   //         }
  //   //       }
  //   //       if (element1 && element2) {
  //   //         this.swappingColumpPosition = true;
  //   //         acSwapElementsWithAnimation({ element1: element1, element2: element2, duration: 300 });
  //   //         setTimeout(() => {
  //   //           this.swappingColumpPosition = false;
  //   //         }, 500);
  //   //       }
  //   //     }
  //   //   }
  //   // });
  //   this.initElement();
  // }


  // initElement() {
  //   this.element.setAttribute(AcDatagridAttributeName.acDatagridInternalCellId, this.datagridInternalCell.acCellId);
  //   this.element.setAttribute(AcDatagridAttributeName.acDatagridInternalColumnId, this.datagridInternalColumn.acColumnId);
  //   this.element.setAttribute(AcDatagridAttributeName.acDatagridRowId, this.datagridRow.acRowId);
  //   acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridCell, element: this.element });
  //   this.element.setAttribute('tabindex', "0");
  //   this.element.append(this.cellContainer);
  //   this.cellContainer.style.height = "100%";
  //   this.cellContainer.style.width = "max-content";
  //   this.setCellWidth();
  // }



  // setCellWidth() {
  //   let width = this.datagridInternalColumn.width;
  //   if (this.datagridApi.isTreeData && this.datagridInternalColumn.index == 0) {
  //     width = width - (AcDatagridDefaultRowConfig.treeChildPadding * this.datagridRow.treeDepth);
  //   }
  //   this.element.style.width = `${width}px`;
  // }

}
