import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcRepeatingItemComponent } from './ac-repeating-item.component';

describe('AcRepeatingItemComponent', () => {
  let component: AcRepeatingItemComponent;
  let fixture: ComponentFixture<AcRepeatingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcRepeatingItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcRepeatingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
