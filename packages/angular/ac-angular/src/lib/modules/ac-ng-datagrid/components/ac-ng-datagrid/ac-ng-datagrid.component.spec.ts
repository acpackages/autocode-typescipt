import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcNgDatagridComponent } from './ac-ng-datagrid.component';

describe('AcNgDatagridComponent', () => {
  let component: AcNgDatagridComponent;
  let fixture: ComponentFixture<AcNgDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcNgDatagridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcNgDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
