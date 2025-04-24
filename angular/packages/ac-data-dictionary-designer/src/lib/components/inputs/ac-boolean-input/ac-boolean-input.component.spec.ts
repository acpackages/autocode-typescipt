import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcBooleanInputComponent } from './ac-boolean-input.component';

describe('AcBooleanInputComponent', () => {
  let component: AcBooleanInputComponent;
  let fixture: ComponentFixture<AcBooleanInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcBooleanInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcBooleanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
