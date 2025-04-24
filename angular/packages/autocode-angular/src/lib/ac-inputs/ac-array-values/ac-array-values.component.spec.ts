import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcArrayValuesComponent } from './ac-array-values.component';

describe('AcArrayValuesComponent', () => {
  let component: AcArrayValuesComponent;
  let fixture: ComponentFixture<AcArrayValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcArrayValuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcArrayValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
