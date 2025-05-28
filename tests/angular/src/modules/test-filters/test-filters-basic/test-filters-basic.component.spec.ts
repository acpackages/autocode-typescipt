import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFiltersBasicComponent } from './test-filters-basic.component';

describe('TestFiltersBasicComponent', () => {
  let component: TestFiltersBasicComponent;
  let fixture: ComponentFixture<TestFiltersBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFiltersBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFiltersBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
