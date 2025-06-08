import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcInputComponent } from './ac-input.component';

describe('AcInputComponent', () => {
  let component: AcInputComponent;
  let fixture: ComponentFixture<AcInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
