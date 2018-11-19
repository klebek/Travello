import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFormCardComponent } from './trip-form-card.component';

describe('TripFormCardComponent', () => {
  let component: TripFormCardComponent;
  let fixture: ComponentFixture<TripFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
