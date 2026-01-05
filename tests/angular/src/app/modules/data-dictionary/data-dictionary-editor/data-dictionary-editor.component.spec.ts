import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDictionaryEditorComponent } from './data-dictionary-editor.component';

describe('DataDictionaryEditorComponent', () => {
  let component: DataDictionaryEditorComponent;
  let fixture: ComponentFixture<DataDictionaryEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDictionaryEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDictionaryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
