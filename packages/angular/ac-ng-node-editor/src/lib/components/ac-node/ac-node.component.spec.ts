import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcNodeComponent } from './ac-node.component';

describe('AcNodeComponent', () => {
  let component: AcNodeComponent;
  let fixture: ComponentFixture<AcNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
