/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcDatagridApi } from "../core/ac-datagrid-api";
import { acAddClassToElement, acRegisterCustomElement, acSwapElementsWithAnimation } from "../../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcEnumSortOrder, AcFilter } from "@autocode-ts/autocode";
import { AcEnumDatagridEvent } from "../enums/ac-enum-datagrid-event.enum";
import { AcDatagridAttributeName } from "../consts/ac-datagrid-attribute-name.const";
import { IAcDatagridColumnResizeEvent } from "../interfaces/event-args/ac-datagrid-column-resize-event.interface";
import { IAcDatagridColumnFilterChangeEvent } from "../interfaces/event-args/ac-datagrid-column-filter-change-event.interface";
import { IAcDatagridColumnSortChangeEvent } from "../interfaces/event-args/ac-datagrid-column-sort-change-event.interface";
import { IAcDatagridColumnPositionChangeEvent } from "../interfaces/event-args/ac-datagrid-column-position-change-event.interface";
import { AcEnumDatagridHook } from "../enums/ac-enum-datagrid-hooks.enum";
import { AcDatagridColumn } from "../models/ac-datagrid-column.model";
import { AcElementBase } from "../../../core/ac-element-base";
import { AC_DATAGRID_ICON_SVGS, AcSvgIcon } from "../../_components.export";


export class AcDatagridHeaderCellElement extends AcElementBase {
  private _datagridApi!: AcDatagridApi;
  get datagridApi(): AcDatagridApi {
    return this._datagridApi;
  }
  set datagridApi(value: AcDatagridApi) {
    this._datagridApi = value;
    value.on({
      event: AcEnumDatagridEvent.ColumnPositionChange, callback: (event: IAcDatagridColumnPositionChangeEvent) => {
        if (event.datagridColumn.acColumnId == this.datagridColumn.acColumnId && !this.swappingColumpPosition) {
          let element1: HTMLElement | undefined;
          let element2: HTMLElement | undefined;
          for (const headerCell of this.datagridApi.datagrid.datagridHeader.datagridHeaderCells) {
            if (headerCell.datagridColumn.acColumnId == event.datagridColumn.acColumnId) {
              element1 = headerCell;
            }
            else if (headerCell.datagridColumn.acColumnId == event.oldDatagridColumn.acColumnId) {
              element2 = headerCell;
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
  }

  private _datagridColumn!: AcDatagridColumn;
  get datagridColumn(): AcDatagridColumn {
    return this._datagridColumn;
  }
  set datagridColumn(value: AcDatagridColumn) {
    this._datagridColumn = value;
    value.hooks.subscribe({
      hook: AcEnumDatagridHook.ColumnSortChange, callback: (event: IAcDatagridColumnSortChangeEvent) => {
        this.renderSort();
      }
    });
    value.hooks.subscribe({
      hook: AcEnumDatagridHook.ColumnFilterChange, callback: (event: IAcDatagridColumnFilterChangeEvent) => {
        this.renderFilter();
      }
    });
    value.hooks.subscribe({
      hook: AcEnumDatagridHook.ColumnWidthChange, callback: (event: IAcDatagridColumnResizeEvent) => {
        this.setCellWidth();
      }
    });
    this.initHeaderCell();
  }

  container: HTMLElement = this.ownerDocument.createElement('div');
  draggablePlaceholder?: HTMLElement;
  filterElement: AcSvgIcon = new AcSvgIcon();
  isResizing: boolean = false;
  leftContainer: HTMLElement = this.ownerDocument.createElement('div');
  resizeElement: AcSvgIcon = new AcSvgIcon();
  rightContainer: HTMLElement = this.ownerDocument.createElement('div');
  sortElement: AcSvgIcon = new AcSvgIcon();
  startWidth: number = 0;
  startX = 0;
  swappingColumpPosition: boolean = false;
  titleElement: HTMLElement = this.ownerDocument.createElement('div');
  originalUserSelect: any;

  constructor() {
    super();
    this.style.display = "flex";
    this.style.flexDirection = "row";
    this.registerListeners();
  }

  initHeaderCell(){
    this.setAttribute(AcDatagridAttributeName.acDatagridColumnId, this.datagridColumn.acColumnId);
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridHeaderCellLeftContainer, element: this.leftContainer });
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridHeaderCellRightContainer, element: this.rightContainer });
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridHeaderCell, element: this });
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridHeaderCellContainer, element: this.container });
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridHeaderCellTitle, element: this.titleElement });
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridHeaderCellFilter, element: this.filterElement });
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridHeaderCellSort, element: this.sortElement });
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridHeaderCellResize, element: this.resizeElement });
    this.append(this.container);
    this.container.append(this.leftContainer);
    this.container.append(this.rightContainer);
    this.leftContainer.append(this.titleElement);
    if (this.datagridColumn.allowSort == true) {
      this.leftContainer.append(this.sortElement);
    }
    if (this.datagridColumn.allowFilter == true) {
      this.rightContainer.append(this.filterElement);
    }
    this.resizeElement.style.width = '5px';
    this.resizeElement.style.margin = 'auto';
    this.resizeElement.style.userSelect = 'none';
    this.resizeElement.style.minWidth = '5px';
    this.resizeElement.style.cursor = 'ew-resize';
    this.resizeElement.svgCode = AC_DATAGRID_ICON_SVGS.resize;
    this.renderFilter();
    this.renderSort();
    this.renderTitle();
    this.setCellWidth();
    this.append(this.resizeElement);
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
      this.originalUserSelect = this.ownerDocument.body.style.userSelect;
      this.ownerDocument.body.style.userSelect = 'none';
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


    document.addEventListener('mousemove', (event: MouseEvent) => {
      if (this.isResizing) {
        const newWidth = this.startWidth + (event.clientX - this.startX);
        this.datagridColumn.width = newWidth;
      }
    });

    document.addEventListener('mouseup', () => {
      if (this.isResizing) {
        this.isResizing = false;
        this.ownerDocument.body.style.userSelect = this.originalUserSelect;
        this.originalUserSelect = "";
      }
    });

  }

  registerDragEvents() {
    // this.container.setAttribute('draggable', 'true');
    // this.container.addEventListener('dragstart', (event: DragEvent) => {
    //   if (this.draggablePlaceholder == undefined) {
    //     this.draggablePlaceholder = this.ownerDocument.createElement('div');
    //     acAddClassToElement({
    //       class_: AcDatagridCssClassName.acDatagridColumnDraggingPlaceholder,
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
    // this.addEventListener('dragover', (event: DragEvent) => {
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
    this.filterElement.style.margin = 'auto';
    this.filterElement.style.cursor = 'pointer';
    if (this.datagridColumn.filterGroup.hasFilters()) {
      this.filterElement.svgCode = AC_DATAGRID_ICON_SVGS.appliedFilter;
    }
    else {
      this.filterElement.svgCode = AC_DATAGRID_ICON_SVGS.filter;
    }
  }

  renderSort() {
    this.sortElement.style.margin = 'auto';
    this.sortElement.style.cursor = 'pointer';
    if (this.datagridColumn.sortOrder == AcEnumSortOrder.Ascending) {
      this.sortElement.svgCode = AC_DATAGRID_ICON_SVGS.sortAscending;
    }
    else if (this.datagridColumn.sortOrder == AcEnumSortOrder.Descending) {
      this.sortElement.svgCode = AC_DATAGRID_ICON_SVGS.sortDescending;
    }
    else {
      this.sortElement.svgCode = AC_DATAGRID_ICON_SVGS.sort;
    }
  }

  setCellWidth() {
    const width = this.datagridColumn.width;
    this.style.width = `${width}px`;
    this.style.maxWidth = `${width}px`;
    this.style.minWidth = `${width}px`;
  }
}

acRegisterCustomElement({ tag: 'ac-datagrid-header-cell', type: AcDatagridHeaderCellElement });
