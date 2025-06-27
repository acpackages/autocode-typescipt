import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcDatagridDropdownContentComponent } from './ac-datagrid-dropdown-content.component';

describe('AcDatagridDropdownContentComponent', () => {
  let component: AcDatagridDropdownContentComponent;
  let fixture: ComponentFixture<AcDatagridDropdownContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcDatagridDropdownContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcDatagridDropdownContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
