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
  isAdmin : boolean;

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): boolean {
    this.principal = JSON.parse(localStorage.getItem('user'));
    if(this.principal !== null) {
      this.isAdmin = this.principal.admin;
      if(this.isAdmin) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
