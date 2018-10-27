import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFormPhotosComponent } from './trip-form-photos.component';

describe('TripFormPhotosComponent', () => {
  let component: TripFormPhotosComponent;
  let fixture: ComponentFixture<TripFormPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripFormPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripFormPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
