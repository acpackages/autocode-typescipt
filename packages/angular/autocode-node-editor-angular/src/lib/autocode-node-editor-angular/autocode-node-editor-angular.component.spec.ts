import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocodeNodeEditorAngularComponent } from './autocode-node-editor-angular.component';

describe('AutocodeNodeEditorAngularComponent', () => {
  let component: AutocodeNodeEditorAngularComponent;
  let fixture: ComponentFixture<AutocodeNodeEditorAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocodeNodeEditorAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocodeNodeEditorAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
