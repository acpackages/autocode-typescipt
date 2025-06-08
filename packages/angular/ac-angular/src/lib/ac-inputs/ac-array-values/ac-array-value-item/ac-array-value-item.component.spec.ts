import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcArrayValueItemComponent } from './ac-array-value-item.component';

describe('AcArrayValueItemComponent', () => {
  let component: AcArrayValueItemComponent;
  let fixture: ComponentFixture<AcArrayValueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcArrayValueItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcArrayValueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
