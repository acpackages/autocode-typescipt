import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBulkNodesInEditorComponent } from './test-bulk-nodes-in-editor.component';

describe('TestBulkNodesInEditorComponent', () => {
  let component: TestBulkNodesInEditorComponent;
  let fixture: ComponentFixture<TestBulkNodesInEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBulkNodesInEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestBulkNodesInEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
