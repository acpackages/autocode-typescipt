import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcIframeContentComponent } from './ac-iframe-content.component';

describe('AcIframeContentComponent', () => {
  let component: AcIframeContentComponent;
  let fixture: ComponentFixture<AcIframeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcIframeContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcIframeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
