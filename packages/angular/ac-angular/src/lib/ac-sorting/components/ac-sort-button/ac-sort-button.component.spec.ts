import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcSortButtonComponent } from './ac-sort-button.component';

describe('AcSortButtonComponent', () => {
  let component: AcSortButtonComponent;
  let fixture: ComponentFixture<AcSortButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcSortButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcSortButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
