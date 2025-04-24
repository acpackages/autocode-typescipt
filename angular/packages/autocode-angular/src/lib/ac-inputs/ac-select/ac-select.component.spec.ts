import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcSelectComponent } from './ac-select.component';

describe('AcSelectComponent', () => {
  let component: AcSelectComponent;
  let fixture: ComponentFixture<AcSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
