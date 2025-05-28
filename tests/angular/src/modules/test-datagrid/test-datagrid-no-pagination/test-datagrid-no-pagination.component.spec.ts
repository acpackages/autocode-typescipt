import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDatagridNoPaginationComponent } from './test-datagrid-no-pagination.component';

describe('TestDatagridNoPaginationComponent', () => {
  let component: TestDatagridNoPaginationComponent;
  let fixture: ComponentFixture<TestDatagridNoPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDatagridNoPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDatagridNoPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
