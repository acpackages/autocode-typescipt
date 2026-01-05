import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridSimpleComponent } from './datagrid-simple.component';

describe('DatagridSimpleComponent', () => {
  let component: DatagridSimpleComponent;
  let fixture: ComponentFixture<DatagridSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatagridSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatagridSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
