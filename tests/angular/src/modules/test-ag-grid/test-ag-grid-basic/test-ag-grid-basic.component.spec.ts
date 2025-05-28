import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAgGridBasicComponent } from './test-ag-grid-basic.component';

describe('TestAgGridBasicComponent', () => {
  let component: TestAgGridBasicComponent;
  let fixture: ComponentFixture<TestAgGridBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAgGridBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAgGridBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
