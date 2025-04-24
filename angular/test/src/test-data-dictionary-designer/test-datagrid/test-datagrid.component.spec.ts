import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDatagridComponent } from './test-datagrid.component';

describe('TestDatagridComponent', () => {
  let component: TestDatagridComponent;
  let fixture: ComponentFixture<TestDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDatagridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
