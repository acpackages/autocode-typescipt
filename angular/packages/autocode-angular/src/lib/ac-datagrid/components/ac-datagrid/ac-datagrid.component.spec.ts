import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcDatagridComponent } from './ac-datagrid.component';

describe('AcDatagridComponent', () => {
  let component: AcDatagridComponent;
  let fixture: ComponentFixture<AcDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcDatagridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
