/* eslint-disable @nx/enforce-module-boundaries */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcNgDataBridgeUiComponent } from './ac-ng-data-bridge-ui.component';

describe('AcNgDataBridgeUiComponent', () => {
  let component: AcNgDataBridgeUiComponent;
  let fixture: ComponentFixture<AcNgDataBridgeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcNgDataBridgeUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcNgDataBridgeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
