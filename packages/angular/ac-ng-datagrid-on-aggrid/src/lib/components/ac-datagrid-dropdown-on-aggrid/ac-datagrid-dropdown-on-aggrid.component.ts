/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/prefer-standalone */
/* eslint-disable @angular-eslint/component-selector */
import { Component, ContentChild, ContentChildren, DOCUMENT, ElementRef, EventEmitter, forwardRef, HostListener, Inject, Input, Output, QueryList, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { AcBaseInput, AcDatagridColumnComponent, IAcDataGridColumn, IAcDataGridDataOnDemandParams, IAcDataGridDataOnDemandResponse, AcDatagridDropdownContentComponent, AutocodeService } from '@autocode-ts/ac-angular';
import { createPopper, Instance as PopperInstance } from '@popperjs/core';
import { AcDatagridOnAgGridComponent } from '../ac-datagrid-on-ag-grid/ac-datagrid-on-ag-grid.component';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ac-datagrid-dropdown-on-aggrid',
  standalone: false,
  templateUrl: './ac-datagrid-dropdown-on-aggrid.component.html',
  styleUrl: './ac-datagrid-dropdown-on-aggrid.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AcDatagridDropdownOnAgGrid),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AcDatagridDropdownOnAgGrid),
      multi: true
    }
  ],
})
export class AcDatagridDropdownOnAgGrid extends AcBaseInput {
  @ContentChildren(AcDatagridColumnComponent) columnComponents?: QueryList<AcDatagridColumnComponent>;
  @ContentChild(AcDatagridDropdownContentComponent) datagridDropdownContent?: AcDatagridDropdownContentComponent;
  @ViewChild('gridDropdown') dropdownElementRef!: ElementRef<HTMLDivElement>;
  @ViewChild('gridInput') inputElementRef!: ElementRef<HTMLInputElement>;
  @ViewChild('datagridTemplate') datagridTemplate: TemplateRef<any>;
  @Input() columns: IAcDataGridColumn[] = [];
  @Input() dataOnDemandFunction?: Function;
  @Input() defaultPageSize: number = 20;
  @Input() pagination: boolean = true;
  @Input() pageSizes: number[] = [20, 50, 100, 500, 100];
  @Input() labelKey = 'name';
  @Input() valueKey = 'name';
  @Input() defaultSelectedData: any;
  @Input() dropdownWidth: number = 500;
  @Input() dropdownHeight: number = 200;
  @Output() onDropdownHide: EventEmitter<any> = new EventEmitter();
  @Output() onDropdownResize: EventEmitter<any> = new EventEmitter();
  @Output() onDropdownShow: EventEmitter<any> = new EventEmitter();
  @Output() onDatagridStateUpdated: EventEmitter<any> = new EventEmitter();

  dataGrid?: AcDatagridOnAgGridComponent;
  private intersectionObserver: IntersectionObserver | null = null;
  protected isDropdownVisible = false;
  protected isInputVisible = true;
  private listeningForResizing = false;
  private notifyResizedTimeout: any;
  private popperInstance: PopperInstance | null = null;
  private resizeObserver!: ResizeObserver;
  selectedData: any;

  constructor(elementRef: ElementRef, autocodeService: AutocodeService, private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    super(elementRef, autocodeService);
  }

  override ngAfterViewInit() {
    this.resizeObserver = new ResizeObserver((entries: any) => {
      if (this.listeningForResizing) {
        if (this.notifyResizedTimeout) {
          clearTimeout(this.notifyResizedTimeout);
        }
        this.notifyResizedTimeout = setTimeout(() => {
          this.notifyDropdownResize();
        }, 500);
      }

    });
    if (this.dropdownElementRef) {
      this.resizeObserver.observe(this.dropdownElementRef.nativeElement);
    }
    this.checkAndSetDropdownContentComponent();
  }

  override ngOnDestroy() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  checkAndSetDropdownContentComponent() {
    let retry: boolean = false;
    if (this.datagridDropdownContent) {
      retry = true;
      if (this.datagridDropdownContent.datagridDropdownDatagrid && this.datagridTemplate) {
        this.datagridDropdownContent.datagridDropdownDatagrid.datagridTemplate = this.datagridTemplate;
        retry = false;
      }
    }
    if (retry) {
      setTimeout(() => {
        this.checkAndSetDropdownContentComponent();
      }, 100);
    }
  }

  override focus() {
    if (this.inputElementRef && this.inputElementRef.nativeElement) {
      this.inputElementRef.nativeElement.focus();
    }
    else {
      setTimeout(() => {
        this.focus();
      }, 100);
    }
  }

  getSelectedDataForValue(value: any) {
    let retry: boolean = true;
    if (this.value) {
      if (this.dataOnDemandFunction != undefined) {
        retry = false;
        const requestParams: IAcDataGridDataOnDemandParams = {};
        const successCallback: Function = (response: IAcDataGridDataOnDemandResponse) => {
          if (response.data) {
            if (response.data.length > 0) {
              this.setSelectedData(response.data[0]);
            }
          }

        };
        requestParams.successCallback = successCallback;
        requestParams.filterGroup = {
          'operator': 'and', 'conditions': [{
            column_name: this.valueKey,
            operator: 'equal_to',
            value: value
          }]
        };
        this.dataOnDemandFunction(requestParams);
      }
    }
    if (retry) {
      setTimeout(() => {
        this.getSelectedDataForValue(value);
      }, 100);
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const clickedInsideInput = this.inputElementRef.nativeElement.contains(event.target as Node);
    if (this.dropdownElementRef) {
      const clickedInsideDropdown = this.dropdownElementRef.nativeElement.contains(event.target as Node);
      if (!clickedInsideInput && !clickedInsideDropdown) {
        this.hideDropdown();
      }
    }
  }

  handleGridCellClicked(params: any) {
    if (params) {
      if (params.data) {
        this.setSelectedData(params.data);
      }
    }
  }

  handleGridCellKeyDown(params: any) {
    if (params.event) {
      if (params.event.code) {
        if (params.event.code.toUpperCase() == "ENTER") {
          this.setSelectedData(params.data);
        }
        else if (params.event.code.toUpperCase() == "ESCAPE") {
          this.inputElementRef.nativeElement.focus();
        }
      }
    }
  }

  handleGridStateUpdated(params:any){
    this.onDatagridStateUpdated.emit(params);
  }

  handleGridViewInit(event: any) {
    this.dataGrid = event.instance;
  }

  handleInputBlur(event: any) {
    super.handleBlur(event);
    setTimeout(() => {
      const activeEl = this.document.activeElement;
      const isFocusStillInside = this.inputElementRef.nativeElement.contains(activeEl) ||
        this.dropdownElementRef.nativeElement.contains(activeEl);

      if (!isFocusStillInside) {
        this.hideDropdown();
      }
    });
    // this.
    // if(this.dataGrid.agGridApi.isFoc)
  }

  handleInputChange(event: any) {
    if (this.dataGrid) {
      this.dataGrid.refreshData();
    }
  }

  handleInputFocus(event: any) {
    this.showDropdown();
    super.handleFocus(event);
  }

  handleInputKeyDown(event: any) {
    if (event) {
      if (event.code.toUpperCase() == "ARROWDOWN") {
        event.preventDefault();
        this.dataGrid.focusFirstRow();
      }
      else if (event.code.toUpperCase() == "ESCAPE") {
        event.preventDefault();
        this.setSelectedData(this.selectedData);
      }
    }
    super.handleKeyDown(event);
  }

  hideDropdown() {
    this.isDropdownVisible = false;
    this.listeningForResizing = false;
    const dropdownElement = this.dropdownElementRef.nativeElement;
    this.renderer.setStyle(dropdownElement, 'display', 'none');
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
    const event: any = {};
    this.onDropdownHide.emit(event);
    this.events.execute({ event: 'dropdownHide', args: event });
  }

  getDropdownSize() {
    const result: any = { width: 0, height: 0 };
    if (this.dropdownElementRef) {
      const dropdownContainer: HTMLElement = this.dropdownElementRef.nativeElement;
      result.width = dropdownContainer.offsetWidth;
      result.height = dropdownContainer.offsetHeight;
    }
    return result;
  }

  notifyDropdownResize() {
    const event = this.getDropdownSize();
    this.onDropdownResize.emit(event)
    this.events.execute({ event: 'dropdownResize', args: event });
  }

  setDropdownSize({ width, height }: { width: number, height: number }) {
    if (this.dropdownElementRef) {
      const dropdownContainer: HTMLElement = this.dropdownElementRef.nativeElement;
      dropdownContainer.style.height = height + "px";
      dropdownContainer.style.width = width + "px";
    }
    this.dropdownWidth = width;
    this.dropdownHeight = height;
  }

  setSelectedData(data: any) {
    if (data) {
      this.inputElementRef.nativeElement.value = data[this.labelKey];
      this.selectedData = data;
      const value = this.selectedData[this.valueKey];
      if (value != undefined) {
        if (value != this.value) {
          this.setValue(value);
        }
      }
    }
    this.hideDropdown();
  }

  private setupIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        // isIntersecting is true if the element is at least partially visible.
        if (!entries[0].isIntersecting) {
          this.isInputVisible = false;
        }
        else {
          this.isInputVisible = true;
        }
      },
      { threshold: 0 } // threshold: 0 means the callback fires as soon as the element is out of view.
    );

    this.intersectionObserver.observe(this.inputElementRef.nativeElement);
  }


  override setValue(value: any) {
    super.setValue(value);
    if (value != undefined) {
      let getData: boolean = false;
      if (this.selectedData == undefined) {
        getData = true;
      }
      else if (this.selectedData[this.valueKey] != value) {
        getData = true;
      }
      if (getData) {
        let foundOption: any;
        if (this.dataGrid) {
          for (const data of this.dataGrid.getAvailableData()) {
            if (data[this.valueKey] == value) {
              foundOption = data;
              break;
            }
          }
        }
        if (foundOption != undefined) {
          this.setSelectedData(foundOption);
        }
        else {
          getData = true;
        }
      }
      if (getData) {
        setTimeout(() => {
          if (this.defaultSelectedData != undefined) {
            if (this.defaultSelectedData[this.valueKey] == value) {
              getData = false;
              this.setSelectedData(this.defaultSelectedData);
            }
          }
          if (getData) {
            this.getSelectedDataForValue(value);
          }
        }, 100);

      }

    }
  }

  showDropdown() {
    if (this.isDropdownVisible) return;
    this.isDropdownVisible = true;
    setTimeout(() => {
      this.listeningForResizing = true;
    }, 100);
    const dropdownElement = this.dropdownElementRef.nativeElement;
      this.renderer.appendChild(this.document.body, dropdownElement);
      this.popperInstance = createPopper(this.inputElementRef.nativeElement, this.dropdownElementRef.nativeElement, {
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: { offset: [0, 8] }
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top-start', 'right-start', 'left-start'],
              padding: 10,
            },
          },
          {
            name: 'preventOverflow',
            options: {
              padding: 10,
            },
          },
        ],
      });
      this.renderer.setStyle(dropdownElement, 'display', 'block');
      this.setupIntersectionObserver();
    this.onDropdownShow.emit(event);
    this.events.execute({ event: 'dropdownShow', args: event });
  }

}
