/* eslint-disable @nx/enforce-module-boundaries */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SourceDestinationMappingComponent } from './source-destination-mapping.component';

describe('SourceDestinationMappingComponent', () => {
  let component: SourceDestinationMappingComponent;
  let fixture: ComponentFixture<SourceDestinationMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceDestinationMappingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SourceDestinationMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
