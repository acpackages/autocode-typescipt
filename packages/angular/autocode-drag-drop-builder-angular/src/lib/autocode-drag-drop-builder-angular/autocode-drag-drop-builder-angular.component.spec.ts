import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocodeDragDropBuilderAngularComponent } from './autocode-drag-drop-builder-angular.component';

describe('AutocodeDragDropBuilderAngularComponent', () => {
  let component: AutocodeDragDropBuilderAngularComponent;
  let fixture: ComponentFixture<AutocodeDragDropBuilderAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocodeDragDropBuilderAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocodeDragDropBuilderAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
