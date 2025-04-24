import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcPropertySelectOptionsInputComponent } from './ac-property-select-options-input.component';

describe('AcPropertySelectOptionsInputComponent', () => {
  let component: AcPropertySelectOptionsInputComponent;
  let fixture: ComponentFixture<AcPropertySelectOptionsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcPropertySelectOptionsInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcPropertySelectOptionsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
