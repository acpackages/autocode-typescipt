import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcDatagridDataDictionaryDesignerComponent } from './ac-datagrid-data-dictionary-designer.component';

describe('AcDatagridDataDictionaryDesignerComponent', () => {
  let component: AcDatagridDataDictionaryDesignerComponent;
  let fixture: ComponentFixture<AcDatagridDataDictionaryDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcDatagridDataDictionaryDesignerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcDatagridDataDictionaryDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
