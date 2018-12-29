import { Observable } from 'rxjs/internal/Observable';
import { AppUser } from 'shared/models/app-user';
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

  appUser: AppUser;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    // this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout(){
    this.auth.logout();
  }
         
}
