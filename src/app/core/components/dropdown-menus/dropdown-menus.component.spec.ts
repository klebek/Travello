import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenusComponent } from './dropdown-menus.component';

describe('DropdownMenusComponent', () => {
  let component: DropdownMenusComponent;
  let fixture: ComponentFixture<DropdownMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
