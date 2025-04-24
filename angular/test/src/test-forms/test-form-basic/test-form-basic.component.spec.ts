import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFormBasicComponent } from './test-form-basic.component';

describe('TestFormBasicComponent', () => {
  let component: TestFormBasicComponent;
  let fixture: ComponentFixture<TestFormBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFormBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestFormBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
