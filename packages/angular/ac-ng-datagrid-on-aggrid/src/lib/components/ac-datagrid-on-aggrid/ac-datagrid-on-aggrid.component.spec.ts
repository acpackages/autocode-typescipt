import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcDatagridOnAgGridComponent } from './ac-datagrid-on-aggrid.component';

describe('AcDatagridOnAgGridComponent', () => {
  let component: AcDatagridOnAgGridComponent;
  let fixture: ComponentFixture<AcDatagridOnAgGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcDatagridOnAgGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcDatagridOnAgGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
