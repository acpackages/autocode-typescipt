import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcTextareaComponent } from './ac-textarea.component';

describe('AcTextareaComponent', () => {
  let component: AcTextareaComponent;
  let fixture: ComponentFixture<AcTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
