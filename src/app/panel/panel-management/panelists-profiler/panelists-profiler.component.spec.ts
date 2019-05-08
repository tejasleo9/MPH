import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelistsProfilerComponent } from './panelists-profiler.component';

describe('PanelistsProfilerComponent', () => {
  let component: PanelistsProfilerComponent;
  let fixture: ComponentFixture<PanelistsProfilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelistsProfilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelistsProfilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
