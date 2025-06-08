import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocodeMediaLibraryAngularComponent } from './ac-ng-media-library.component';

describe('AutocodeMediaLibraryAngularComponent', () => {
  let component: AutocodeMediaLibraryAngularComponent;
  let fixture: ComponentFixture<AutocodeMediaLibraryAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocodeMediaLibraryAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocodeMediaLibraryAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
