import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridCellRenderComponent } from './ag-grid-cell-render.component';

describe('AgGridCellRenderComponent', () => {
  let component: AgGridCellRenderComponent;
  let fixture: ComponentFixture<AgGridCellRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridCellRenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgGridCellRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
