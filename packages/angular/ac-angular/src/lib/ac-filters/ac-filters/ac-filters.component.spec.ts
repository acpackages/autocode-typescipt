import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcFiltersComponent } from './ac-filters.component';

describe('AcFiltersComponent', () => {
  let component: AcFiltersComponent;
  let fixture: ComponentFixture<AcFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
