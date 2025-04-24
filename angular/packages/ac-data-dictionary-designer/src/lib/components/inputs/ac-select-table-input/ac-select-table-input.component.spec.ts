import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcSelectTableInputComponent } from './ac-select-table-input.component';

describe('AcSelectTableInputComponent', () => {
  let component: AcSelectTableInputComponent;
  let fixture: ComponentFixture<AcSelectTableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcSelectTableInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcSelectTableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
