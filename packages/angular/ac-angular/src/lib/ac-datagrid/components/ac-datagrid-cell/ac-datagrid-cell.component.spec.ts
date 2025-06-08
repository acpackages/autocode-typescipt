import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcDatagridCellComponent } from './ac-datagrid-cell.component';

describe('AcDatagridCellComponent', () => {
  let component: AcDatagridCellComponent;
  let fixture: ComponentFixture<AcDatagridCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcDatagridCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcDatagridCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
