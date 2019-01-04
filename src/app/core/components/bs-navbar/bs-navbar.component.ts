import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  providers: [NgbDropdownConfig]
})
export class BsNavbarComponent implements OnInit {

  appUser: any;
  logged;

  showLogout = false;

  constructor(public auth: AuthService) {
  }

  async ngOnInit() {
    this.appUser = JSON.parse(localStorage.getItem('user'));
    if(this.appUser) this.showLogout = true;
    else this.showLogout = false;
    // console.log("ADMIN: " + this.appUser.admin)
  }

  logout(){
    this.auth.logout();
    // window.location.reload();
    localStorage.removeItem('user');
  }

}
