import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcFilePreviewComponent } from './ac-file-preview.component';

describe('AcFilePreviewComponent', () => {
  let component: AcFilePreviewComponent;
  let fixture: ComponentFixture<AcFilePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcFilePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcFilePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
