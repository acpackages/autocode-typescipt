import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcDatagridRowComponent } from './ac-datagrid-row.component';

describe('AcDatagridRowComponent', () => {
  let component: AcDatagridRowComponent;
  let fixture: ComponentFixture<AcDatagridRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcDatagridRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcDatagridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
