import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcFilesComponent } from './ac-files.component';

describe('AcFilesComponent', () => {
  let component: AcFilesComponent;
  let fixture: ComponentFixture<AcFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
