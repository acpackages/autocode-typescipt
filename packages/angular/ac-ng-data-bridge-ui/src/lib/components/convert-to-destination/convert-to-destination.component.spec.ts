/* eslint-disable @nx/enforce-module-boundaries */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConvertToDestinationComponent } from './convert-to-destination.component';

describe('ConvertToDestinationComponent', () => {
  let component: ConvertToDestinationComponent;
  let fixture: ComponentFixture<ConvertToDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertToDestinationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConvertToDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
