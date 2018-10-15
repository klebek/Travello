import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'dropdown-menus',
  templateUrl: './dropdown-menus.component.html',
  styleUrls: ['./dropdown-menus.component.css']
})
export class DropdownMenusComponent {

  @Input('appUser') appUser;
  @Input('hamburger') hamburger = false;
  @Input('cart') cart;

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

}
