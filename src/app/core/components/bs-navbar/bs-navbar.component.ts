import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs/Observable';
import { AppUser } from 'shared/models/app-user';
import { TestBed } from '@angular/core/testing';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
  providers: [NgbDropdownConfig]
})

export class BsNavbarComponent implements OnInit {

  appUser;
  logged: boolean = false;

  user$: Observable<AppUser>;
  userLocal;

  userek;

  checkUser;
  showLogout = false;

  constructor(public auth: AuthService, protected localStorage: LocalStorage, private loginComponent: LoginComponent, config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
    this.checkUser = this.loginComponent.logged;
    // console.log("Check user: " + this.checkUser);
    this.auth.onMainEventLogged.subscribe((onMain) => { this.logged = onMain });
    this.auth.onMainEventUser.subscribe((onMain) => {
      this.userek = onMain 
      this.localStorage.setItem('user', this.userek).subscribe(() => {}, () => {});
    });
    this.localStorage.getItem('user').subscribe((user) => {
      if(user != null) this.userek = user;
    });
    this.userek = localStorage.getItem('user');
    // console.log("Userek: " + this.userek.username);
    // console.log("logged: " + this.logged)
  }

  ngOnInit() {
    this.userLocal = JSON.parse(localStorage.getItem('user'));
    if (this.userLocal != null) {
      this.logged = true;
      this.user$ = this.userLocal;
      this.localStorage.setItem('appUser', this.user$).subscribe(() => { })
      // console.log(this.user$)
      this.user$ = this.localStorage.getItem('appUser');
      // console.log("Userek: " + this.userek)
    }
    // .subscribe((appUser: AppUser) => {
    //   if (appUser != null) {
    //     console.log(appUser.username);
    //   }
    //   else console.log("No user");
    // }, () => { });

    // if(this.appUser$) this.showLogout = true;
    // else this.showLogout = false;
    // console.log("ADMIN: " + this.appUser.admin)
  }

  logout() {
    this.auth.logout();
    // window.location.reload();
    this.localStorage.removeItem('user').subscribe(() => { });
    localStorage.removeItem('user');
    this.user$ = null;
    this.logged = false;
  }

}
