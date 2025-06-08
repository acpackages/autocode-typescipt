import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcPaginationComponent } from './ac-pagination.component';

describe('AcPaginationComponent', () => {
  let component: AcPaginationComponent;
  let fixture: ComponentFixture<AcPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
