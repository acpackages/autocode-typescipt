import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocodeInputOnNgselectComponent } from './autocode-input-on-ngselect.component';

describe('AutocodeInputOnNgselectComponent', () => {
  let component: AutocodeInputOnNgselectComponent;
  let fixture: ComponentFixture<AutocodeInputOnNgselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocodeInputOnNgselectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocodeInputOnNgselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
