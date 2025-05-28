import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDatagridBasicComponent } from './test-datagrid-basic.component';

describe('TestDatagridBasicComponent', () => {
  let component: TestDatagridBasicComponent;
  let fixture: ComponentFixture<TestDatagridBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDatagridBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDatagridBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
