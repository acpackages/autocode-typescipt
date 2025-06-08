import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocodeDataDictionaryEditorAngularComponent } from './ac-ng-data-dictionary-editor.component';

describe('AutocodeDataDictionaryEditorAngularComponent', () => {
  let component: AutocodeDataDictionaryEditorAngularComponent;
  let fixture: ComponentFixture<AutocodeDataDictionaryEditorAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocodeDataDictionaryEditorAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AutocodeDataDictionaryEditorAngularComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
