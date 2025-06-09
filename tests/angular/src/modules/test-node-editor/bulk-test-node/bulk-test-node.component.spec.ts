import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BulkTestNodeComponent } from './bulk-test-node.component';

describe('BulkTestNodeComponent', () => {
  let component: BulkTestNodeComponent;
  let fixture: ComponentFixture<BulkTestNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkTestNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkTestNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
