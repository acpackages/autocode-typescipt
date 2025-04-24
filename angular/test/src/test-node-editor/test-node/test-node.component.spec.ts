import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNodeComponent } from './test-node.component';

describe('TestNodeComponent', () => {
  let component: TestNodeComponent;
  let fixture: ComponentFixture<TestNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
