import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAgGridOnDemandDataComponent } from './test-ag-grid-on-demand-data.component';

describe('TestAgGridOnDemandDataComponent', () => {
  let component: TestAgGridOnDemandDataComponent;
  let fixture: ComponentFixture<TestAgGridOnDemandDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAgGridOnDemandDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAgGridOnDemandDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
