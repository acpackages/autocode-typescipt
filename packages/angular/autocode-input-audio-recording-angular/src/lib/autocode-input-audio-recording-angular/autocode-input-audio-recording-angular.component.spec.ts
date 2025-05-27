import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocodeInputAudioRecordingAngularComponent } from './autocode-input-audio-recording-angular.component';

describe('AutocodeInputAudioRecordingAngularComponent', () => {
  let component: AutocodeInputAudioRecordingAngularComponent;
  let fixture: ComponentFixture<AutocodeInputAudioRecordingAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocodeInputAudioRecordingAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      AutocodeInputAudioRecordingAngularComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
