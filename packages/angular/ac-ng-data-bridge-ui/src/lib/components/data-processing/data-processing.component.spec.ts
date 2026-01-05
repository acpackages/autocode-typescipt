/* eslint-disable @nx/enforce-module-boundaries */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataProccesingComponent } from './data-processing.component';

describe('DataProccesingComponent', () => {
  let component: DataProccesingComponent;
  let fixture: ComponentFixture<DataProccesingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataProccesingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataProccesingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
