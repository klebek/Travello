import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPhotosComponent } from './country-photos.component';

describe('CountryPhotosComponent', () => {
  let component: CountryPhotosComponent;
  let fixture: ComponentFixture<CountryPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
