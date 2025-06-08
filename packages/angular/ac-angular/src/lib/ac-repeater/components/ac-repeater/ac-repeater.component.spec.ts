import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcRepeaterComponent } from './ac-repeater.component';

describe('AcRepeaterComponent', () => {
  let component: AcRepeaterComponent;
  let fixture: ComponentFixture<AcRepeaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcRepeaterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcRepeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
