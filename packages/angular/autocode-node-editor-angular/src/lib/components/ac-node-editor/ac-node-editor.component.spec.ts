import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcNodeEditorComponent } from './ac-node-editor.component';

describe('AcNodeEditorComponent', () => {
  let component: AcNodeEditorComponent;
  let fixture: ComponentFixture<AcNodeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcNodeEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcNodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
