import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XLSXDataBridgeComponent } from './xlsx-data-bridge.component';

describe('XLSXDataBridgeComponent', () => {
  let component: XLSXDataBridgeComponent;
  let fixture: ComponentFixture<XLSXDataBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XLSXDataBridgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XLSXDataBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
