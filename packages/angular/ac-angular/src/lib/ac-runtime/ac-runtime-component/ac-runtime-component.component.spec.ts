import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcBuilderRuntimeComponent } from './ac-builder-runtime-component.component';

describe('AcBuilderRuntimeComponent', () => {
  let component: AcBuilderRuntimeComponent;
  let fixture: ComponentFixture<AcBuilderRuntimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcBuilderRuntimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcBuilderRuntimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
