import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocodeAngularComponent } from './autocode-angular.component';

describe('AutocodeAngularComponent', () => {
  let component: AutocodeAngularComponent;
  let fixture: ComponentFixture<AutocodeAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocodeAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocodeAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
