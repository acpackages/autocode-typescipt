import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcArrayValueItemsComponent } from './ac-array-value-items.component';

describe('AcArrayValueItemsComponent', () => {
  let component: AcArrayValueItemsComponent;
  let fixture: ComponentFixture<AcArrayValueItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcArrayValueItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcArrayValueItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
