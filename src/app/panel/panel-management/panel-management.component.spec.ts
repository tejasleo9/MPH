import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelManagementComponent } from './panel-management.component';

describe('PanelManagementComponent', () => {
  let component: PanelManagementComponent;
  let fixture: ComponentFixture<PanelManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
