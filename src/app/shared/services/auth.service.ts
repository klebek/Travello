import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly root = 'https://localhost:9000/api';

  user$: Observable<AppUser>;
  errorLogin;
  errorRegister;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private route: ActivatedRoute) {}

  userAuthentication(username, password) {
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const header =
      new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + btoa("my-trusted-client:secret") });

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.http.post( 'http://localhost:9000/oauth/token', data, {headers : header}).subscribe((data : any)=>{
        localStorage.setItem('userToken', data.access_token);
        console.log(data.access_token)
      },
      (err : HttpErrorResponse)=>{
        console.log(err)
      });

  }

  registerUsernamePassword(formRegister, username, password) {
    let confirmPassword = formRegister.value.confirmPassword;
    let name = formRegister.value.name;

    let data = {
      "username": formRegister.value.username,
      "password": formRegister.value.password,
      "email": formRegister.value.email,
      "business": false,
      "admin": false
    };
    let body = JSON.stringify(data);
    const header = new HttpHeaders({ 'Content-Type' : 'application/json', 'No-Auth': 'True' });

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.http.post(this.root + '/account/register', body, {headers: header})
  }

  logout() {
    localStorage.removeItem('token');
  }

  getAllUsers() {
    return this.http.get(this.root + '/account/all');
}

  // get appUser$() : Observable<AppUser> {
  //   return this.user$
  //   .switchMap(user => {
  //    // if (user) return this.userService.get(user.name);
  //
  //     return Observable.of(null);
  //   });
  // }

}
