import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripVisitorsComponent } from './trip-visitors.component';

describe('TripVisitorsComponent', () => {
  let component: TripVisitorsComponent;
  let fixture: ComponentFixture<TripVisitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripVisitorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
