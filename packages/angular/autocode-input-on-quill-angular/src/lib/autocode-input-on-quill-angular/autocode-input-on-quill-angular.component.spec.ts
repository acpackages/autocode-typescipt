import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocodeInputOnQuillAngularComponent } from './autocode-input-on-quill-angular.component';

describe('AutocodeInputOnQuillAngularComponent', () => {
  let component: AutocodeInputOnQuillAngularComponent;
  let fixture: ComponentFixture<AutocodeInputOnQuillAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocodeInputOnQuillAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocodeInputOnQuillAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
