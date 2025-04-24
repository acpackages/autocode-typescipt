import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcPropertyInputComponent } from './ac-property-input.component';

describe('AcPropertyInputComponent', () => {
  let component: AcPropertyInputComponent;
  let fixture: ComponentFixture<AcPropertyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcPropertyInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcPropertyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
