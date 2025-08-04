import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridCellEditorComponent } from './ag-grid-cell-editor.component';

describe('AgGridCellEditorComponent', () => {
  let component: AgGridCellEditorComponent;
  let fixture: ComponentFixture<AgGridCellEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridCellEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgGridCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
