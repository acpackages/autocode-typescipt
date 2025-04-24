import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcRuntimeComponentComponent } from './ac-runtime-component.component';

describe('AcRuntimeComponentComponent', () => {
  let component: AcRuntimeComponentComponent;
  let fixture: ComponentFixture<AcRuntimeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcRuntimeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcRuntimeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
