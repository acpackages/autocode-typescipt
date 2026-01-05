import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridTreeComponent } from './datagrid-tree.component';

describe('DatagridTreeComponent', () => {
  let component: DatagridTreeComponent;
  let fixture: ComponentFixture<DatagridTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatagridTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatagridTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
