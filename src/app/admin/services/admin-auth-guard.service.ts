import { UserService } from 'shared/services/user.service';
import { AuthService } from 'shared/services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  principal : any;
  admin : boolean;

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<any> {
    return this.principal
    .map(appUser => {
      return this.principal = appUser
    })
    .subscribe(x => console.log(x));

    // this.principal = JSON.parse(localStorage.getItem('user'));
    // this.admin = this.principal.admin;
    // console.log("admin: " + this.admin);
    // console.log("principal.admin: " + this.principal.admin);

    // if(this.admin) {
    //   return Observable.of(true);
    // } else {
    //   return Observable.of(false);
    // }

  }

}
