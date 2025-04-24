import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcSelectTableFieldInputComponent } from './ac-select-table-field-input.component';

describe('AcSelectTableFieldInputComponent', () => {
  let component: AcSelectTableFieldInputComponent;
  let fixture: ComponentFixture<AcSelectTableFieldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcSelectTableFieldInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcSelectTableFieldInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
