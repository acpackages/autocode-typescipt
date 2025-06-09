import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSimpleNodeEditorComponent } from './test-simple-node-editor.component';

describe('TestSimpleNodeEditorComponent', () => {
  let component: TestSimpleNodeEditorComponent;
  let fixture: ComponentFixture<TestSimpleNodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSimpleNodeEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSimpleNodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
