import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalActivitiesComponent } from './promotional-activities.component';

describe('PromotionalActivitiesComponent', () => {
  let component: PromotionalActivitiesComponent;
  let fixture: ComponentFixture<PromotionalActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
