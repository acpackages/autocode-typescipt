import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocodeDatagridOnAggridAngularComponent } from './autocode-datagrid-on-aggrid-angular.component';

describe('AutocodeDatagridOnAggridAngularComponent', () => {
  let component: AutocodeDatagridOnAggridAngularComponent;
  let fixture: ComponentFixture<AutocodeDatagridOnAggridAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocodeDatagridOnAggridAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocodeDatagridOnAggridAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
