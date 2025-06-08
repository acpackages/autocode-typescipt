import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcDatagridColumnComponent } from './ac-datagrid-column.component';

describe('AcDatagridColumnComponent', () => {
  let component: AcDatagridColumnComponent;
  let fixture: ComponentFixture<AcDatagridColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcDatagridColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcDatagridColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
