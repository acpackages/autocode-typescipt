import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcDatagridDropdownDatagridComponent } from './ac-datagrid-dropdown-datagrid.component';

describe('AcDatagridDropdownDatagridComponent', () => {
  let component: AcDatagridDropdownDatagridComponent;
  let fixture: ComponentFixture<AcDatagridDropdownDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcDatagridDropdownDatagridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcDatagridDropdownDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
