import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridHeaderCellComponent } from './ag-grid-header-cell.component';

describe('AgGridHeaderCellComponent', () => {
  let component: AgGridHeaderCellComponent;
  let fixture: ComponentFixture<AgGridHeaderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridHeaderCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgGridHeaderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
