import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcNodeConnectionComponent } from './ac-node-connection.component';

describe('AcNodeConnectionComponent', () => {
  let component: AcNodeConnectionComponent;
  let fixture: ComponentFixture<AcNodeConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcNodeConnectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcNodeConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
