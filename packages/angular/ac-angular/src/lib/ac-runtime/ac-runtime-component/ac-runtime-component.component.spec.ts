import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcRuntimeComponent } from './ac-runtime-component.component';

describe('AcRuntimeComponent', () => {
  let component: AcRuntimeComponent;
  let fixture: ComponentFixture<AcRuntimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcRuntimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcRuntimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
