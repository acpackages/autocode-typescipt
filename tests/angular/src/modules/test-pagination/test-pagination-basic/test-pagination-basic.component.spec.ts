import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPaginationBasicComponent } from './test-pagination-basic.component';

describe('TestPaginationBasicComponent', () => {
  let component: TestPaginationBasicComponent;
  let fixture: ComponentFixture<TestPaginationBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPaginationBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPaginationBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
