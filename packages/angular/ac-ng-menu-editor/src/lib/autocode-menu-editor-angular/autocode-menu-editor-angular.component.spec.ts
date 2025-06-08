import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocodeMenuEditorAngularComponent } from './ac-ng-menu-editor.component';

describe('AutocodeMenuEditorAngularComponent', () => {
  let component: AutocodeMenuEditorAngularComponent;
  let fixture: ComponentFixture<AutocodeMenuEditorAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocodeMenuEditorAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocodeMenuEditorAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
