import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineRenderingComponent } from './inline-rendering.component';

describe('InlineRenderingComponent', () => {
  let component: InlineRenderingComponent;
  let fixture: ComponentFixture<InlineRenderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineRenderingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
