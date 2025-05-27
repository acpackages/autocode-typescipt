import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocodeInputOnTinymceAngularComponent } from './autocode-input-on-tinymce-angular.component';

describe('AutocodeInputOnTinymceAngularComponent', () => {
  let component: AutocodeInputOnTinymceAngularComponent;
  let fixture: ComponentFixture<AutocodeInputOnTinymceAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocodeInputOnTinymceAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocodeInputOnTinymceAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
