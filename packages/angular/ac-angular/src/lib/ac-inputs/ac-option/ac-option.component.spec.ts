import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcOptionComponent } from './ac-option.component';

describe('AcOptionComponent', () => {
  let component: AcOptionComponent;
  let fixture: ComponentFixture<AcOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
