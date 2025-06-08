import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcNodeSocketComponent } from './ac-node-socket.component';

describe('AcNodeSocketComponent', () => {
  let component: AcNodeSocketComponent;
  let fixture: ComponentFixture<AcNodeSocketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcNodeSocketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcNodeSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
