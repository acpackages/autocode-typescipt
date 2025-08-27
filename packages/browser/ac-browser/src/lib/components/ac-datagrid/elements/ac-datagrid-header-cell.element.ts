/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcDatagridApi } from "../core/ac-datagrid-api";
import { acAddClassToElement, acSwapElementsWithAnimation } from "../../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcEnumSortOrder, AcFilter } from "@autocode-ts/autocode";
import { AcEnumDatagridEvent } from "../enums/ac-enum-datagrid-event.enum";
import { AcDatagridAttributeName } from "../consts/ac-datagrid-attribute-name.const";
import { AcDatagridHtmlPlaceholder } from "../consts/ac-datagrid-html-placeholder.const";
import { IAcDatagridColumnResizeEvent } from "../interfaces/event-args/ac-datagrid-column-resize-event.interface";
import { IAcDatagridColumnFilterChangeEvent } from "../interfaces/event-args/ac-datagrid-column-filter-change-event.interface";
import { IAcDatagridColumnSortChangeEvent } from "../interfaces/event-args/ac-datagrid-column-sort-change-event.interface";
import { IAcDatagridColumnPositionChangeEvent } from "../interfaces/event-args/ac-datagrid-column-position-change-event.interface";
import { AcEnumDatagridHook } from "../enums/ac-enum-datagrid-hooks.enum";
import { AcDatagridColumn } from "../models/ac-datagrid-column.model";


export class AcDatagridHeaderCellElement {
  cellContainer: HTMLElement = document.createElement('div');
  private datagridApi: AcDatagridApi;
  datagridColumn!: AcDatagridColumn;
  draggablePlaceholder?: HTMLElement;
  element: HTMLElement = document.createElement('div');
  filterElement: HTMLElement = document.createElement('button');
  isResizing: boolean = false;
  leftContainer: HTMLElement = document.createElement('div');
  resizeElement: HTMLElement = document.createElement('span');
  rightContainer: HTMLElement = document.createElement('div');
  sortElement: HTMLElement = document.createElement('button');
  startWidth: number = 0;
  startX = 0;
  swappingColumpPosition: boolean = false;
  titleElement: HTMLElement = document.createElement('div');

  constructor({ datagridApi, datagridColumn }: { datagridApi: AcDatagridApi, datagridColumn: AcDatagridColumn }) {
    this.datagridColumn = datagridColumn;
    this.datagridApi = datagridApi;
    this.datagridColumn.hooks.subscribe({
      hook: AcEnumDatagridHook.ColumnSortChange, callback: (event: IAcDatagridColumnSortChangeEvent) => {
        this.renderSort();
      }
    });
    this.datagridColumn.hooks.subscribe({
      hook: AcEnumDatagridHook.ColumnFilterChange, callback: (event: IAcDatagridColumnFilterChangeEvent) => {
        this.renderFilter();
      }
    });
    this.datagridColumn.hooks.subscribe({
      hook: AcEnumDatagridHook.ColumnWidthChange, callback: (event: IAcDatagridColumnResizeEvent) => {
        this.setCellWidth();
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.ColumnPositionChange, callback: (event: IAcDatagridColumnPositionChangeEvent) => {
        if (event.datagridColumn.acColumnId == this.datagridColumn.acColumnId && !this.swappingColumpPosition) {
          let element1: HTMLElement | undefined;
          let element2: HTMLElement | undefined;
          for (const headerCell of this.datagridApi.datagrid.datagridHeader.datagridHeaderCells) {
            if (headerCell.datagridColumn.acColumnId == event.datagridColumn.acColumnId) {
              element1 = headerCell.element;
            }
            else if (headerCell.datagridColumn.acColumnId == event.oldDatagridColumn.acColumnId) {
              element2 = headerCell.element;
            }
          }
          if (element1 && element2) {
            this.swappingColumpPosition = true;
            acSwapElementsWithAnimation({ element1: element1, element2: element2, duration: 300 });
            setTimeout(() => {
              this.swappingColumpPosition = false;
            }, 500);
          }
        }
      }
    });
    this.initElement();
  }

  initElement() {
    this.element.setAttribute(AcDatagridAttributeName.acDatagridColumnId, this.datagridColumn.acColumnId);
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridHeaderCellLeftContainer, element: this.leftContainer });
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridHeaderCellRightContainer, element: this.rightContainer });
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridHeaderCell, element: this.element });
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridHeaderCellContainer, element: this.cellContainer });
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridHeaderCellTitle, element: this.titleElement });
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridHeaderCellFilter, element: this.filterElement });
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridHeaderCellSort, element: this.sortElement });
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridHeaderCellResize, element: this.resizeElement });
    this.element.append(this.cellContainer);
    // this.cellContainer.setAttribute('draggable', 'true');
    this.cellContainer.append(this.leftContainer);
    this.cellContainer.append(this.rightContainer);
    this.leftContainer.append(this.titleElement);
    if (this.datagridColumn.allowSort == true) {
      this.leftContainer.append(this.sortElement);
    }
    this.rightContainer.append(this.resizeElement);
    if (this.datagridColumn.allowFilter == true) {
      this.rightContainer.append(this.filterElement);
    }
    this.resizeElement.style.height = "100%";
    this.resizeElement.innerHTML = AcDatagridHtmlPlaceholder.resize;
    this.renderFilter();
    this.renderSort();
    this.renderTitle();
    this.registerListeners();
    this.setCellWidth();
  }

  registerListeners() {
    // Filter button
    this.filterElement.addEventListener('click', () => {
      const filter = new AcFilter();
      this.datagridApi.setColumnFilter({ datagridColumn: this.datagridColumn, filter });
    });

    // Double-click for auto-resize
    this.resizeElement.addEventListener('dblclick', () => {
      this.datagridApi.autoResizeColumn({ datagridColumn: this.datagridColumn });
    });

    // Mouse down to start resizing
    this.resizeElement.addEventListener('mousedown', (event: MouseEvent) => {
      this.isResizing = true;
      this.startX = event.clientX;
      this.startWidth = this.datagridColumn.width;
    });

    // Sorting click
    this.sortElement.addEventListener('click', () => {
      const current = this.datagridColumn.sortOrder;
      const next = current === AcEnumSortOrder.None
        ? AcEnumSortOrder.Ascending
        : current === AcEnumSortOrder.Ascending
          ? AcEnumSortOrder.Descending
          : AcEnumSortOrder.None;

      this.datagridApi.setColumnSortOrder({ datagridColumn: this.datagridColumn, sortOrder: next });
    });

    // Resizing mouse events
    document.addEventListener('mousemove', (event: MouseEvent) => {
      if (this.isResizing) {
        const newWidth = this.startWidth + (event.clientX - this.startX);
        // this.datagridApi.setColumnWidth({ datagridColumn: this.datagridColumn, width: newWidth });
      }
    });

    document.addEventListener('mouseup', () => {
      if (this.isResizing) this.isResizing = false;
    });

    // this.registerDragEvents(); // Dragging logic extracted here
  }


  registerDragEvents() {
    // this.cellContainer.setAttribute('draggable', 'true');
    // this.cellContainer.addEventListener('dragstart', (event: DragEvent) => {
    //   if (this.draggablePlaceholder == undefined) {
    //     this.draggablePlaceholder = document.createElement('div');
    //     acAddClassToElement({
    //       cssClass: AcDatagridCssClassName.acDatagridColumnDraggingPlaceholder,
    //       element: this.draggablePlaceholder
    //     });
    //     const creatorArgs: IAcDatagridColumnDragPlaceholderCreatorArgs = {
    //       datagridColumn: this.datagridColumn,
    //       datagridApi: this.datagridApi
    //     }
    //     const placeholderElement: HTMLElement = this.datagridApi.columnDragPlaceholderElementCreator(creatorArgs);
    //     this.draggablePlaceholder.append(placeholderElement);
    //     this.draggablePlaceholder.style.position = 'fixed';
    //     this.draggablePlaceholder.style.top = '-1000px';
    //     this.draggablePlaceholder.style.top = '-1000px';
    //     this.draggablePlaceholder.style.pointerEvents = 'none';
    //     this.draggablePlaceholder.style.zIndex = '9999';
    //   }
    //   document.body.appendChild(this.draggablePlaceholder);
    //   event.dataTransfer?.setDragImage(this.draggablePlaceholder, 0, 0);
    //   this.datagridApi.draggingColumn = this.datagridColumn;
    //   this.datagridApi.datagrid.element.style.userSelect = 'none';
    //   const stopDragging = () => {
    //     document.removeEventListener('dragend', stopDragging);
    //     if (this.draggablePlaceholder) {
    //       this.draggablePlaceholder.remove();
    //       this.draggablePlaceholder = undefined;
    //     }
    //     this.datagridApi.draggingColumn = undefined;
    //     this.datagridApi.datagrid.element.style.userSelect = '';
    //   };
    //   document.addEventListener('dragend', stopDragging);
    // });
    // this.element.addEventListener('dragover', (event: DragEvent) => {
    //   event.preventDefault();
    //   if (this.datagridColumn && this.datagridApi.draggingColumn?.acColumnId !== this.datagridColumn.acColumnId && !this.swappingColumpPosition) {
    //     this.datagridApi.updateColumnPosition({ datagidColumn: this.datagridApi.draggingColumn!, oldDatagridColumn: this.datagridColumn });
    //   }
    // });
  }

  renderTitle() {
    this.titleElement.innerHTML = this.datagridColumn.title;
  }

  renderFilter() {
    if (this.datagridColumn.filterGroup.hasFilters()) {
      this.filterElement.innerHTML = AcDatagridHtmlPlaceholder.appliedFilter;
    }
    else {
      this.filterElement.innerHTML = AcDatagridHtmlPlaceholder.filter;
    }
  }

  renderSort() {
    if (this.datagridColumn.sortOrder == AcEnumSortOrder.Ascending) {
      this.sortElement.innerHTML = AcDatagridHtmlPlaceholder.sortAscending;
    }
    else if (this.datagridColumn.sortOrder == AcEnumSortOrder.Descending) {
      this.sortElement.innerHTML = AcDatagridHtmlPlaceholder.sortDescending;
    }
    else {
      this.sortElement.innerHTML = AcDatagridHtmlPlaceholder.sort;
    }
  }

  setCellWidth() {
    this.element.style.width = this.datagridColumn.width + "px";
  }
}
