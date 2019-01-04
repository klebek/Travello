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

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    this.appUser = JSON.parse(localStorage.getItem('user'));
    console.log("ADMIN: " + this.appUser.admin)
  }

  logout(){
    this.auth.logout();
  }

}
