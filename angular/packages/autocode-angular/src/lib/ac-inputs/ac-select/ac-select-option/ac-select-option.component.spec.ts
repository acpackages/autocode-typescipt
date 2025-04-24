import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcSelectOptionComponent } from './ac-select-option.component';

describe('AcSelectOptionComponent', () => {
  let component: AcSelectOptionComponent;
  let fixture: ComponentFixture<AcSelectOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcSelectOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
