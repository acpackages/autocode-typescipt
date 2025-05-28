import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcDatagridColumnHeadComponent } from './ac-datagrid-column-head.component';

describe('AcDatagridColumnHeadComponent', () => {
  let component: AcDatagridColumnHeadComponent;
  let fixture: ComponentFixture<AcDatagridColumnHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcDatagridColumnHeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcDatagridColumnHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
